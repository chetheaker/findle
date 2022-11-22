import fetch from 'node-fetch';
import { Configuration, OpenAIApi } from 'openai';
import * as FormData from 'form-data';
import * as functions from "firebase-functions";
require("firebase-functions/logger/compat");
import { DocumentData } from 'firebase/firestore';
const admin = require('firebase-admin');
admin.initializeApp();
const firestore = admin.firestore();

// exports.writeToFirestore = functions.firestore
//   .document('tests/lRJ5ACFaE8sFUA0RyVeh')
//   .onWrite((change, context) => {
//     const contestsRef = db.collection('pendingContests');
//     contestsRef.add({
//       expirationDate: 123123,
//       createdAt: 123123,
//     });
//     //db.doc('tests/8SagYk5CTcYctNlppQO2').set({test:'accessed'});
//   });


  exports.scheduledFunction = functions.pubsub.schedule('59 23 * * 1-7')
  .onRun((context) => {
//CLOUDINARY MODULE
  const upload2Cloudinary = async (aiUrl: string) => {
    const url = process.env.CLOUDINARY_URL as string;
    let cloudinaryImgData;
    const formData = new FormData();
    formData.append('file', aiUrl);
    formData.append(
      'upload_preset',
      process.env.CLOUDINARY_KEY as string
    );
    const config = {method: "POST", body: formData}
    await fetch(url, config)
    .then((response) => response.json())
    .then((data) => {
      cloudinaryImgData = data;
    })
    return cloudinaryImgData;
};

//OPENAI MODULE
const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY
});
const openai = new OpenAIApi(configuration);
const openAIGeneration = async (prompt: string) => {
  const result2 = await openai.createImage({
    prompt,
    n: 1,
    size: '1024x1024'
  });
  const urlOpenAI = result2.data.data[0].url;
  console.log(urlOpenAI)
  return urlOpenAI;
};

  async function contestGeneration () {
    const currentContestRef = await firestore.collection('currentContest');
    const pendingContestRef = await firestore.collection('pendingContests');
    const finishedContestsRef = await firestore.collection('finishedContests');
    const result: DocumentData[] = [];
  
      const QuerySnapshot = await pendingContestRef.limit(1).get()
      QuerySnapshot.forEach((element: { data: () => any; id: any; }) => {
        let data = element.data();
        data.id = element.id;
        result.push(data)
        return data;
      })
    
    interface CloudinaryData {
      secure_url: string;
    }
    //GENERATE 5 IMAGES BASED ON PROMPT AND SAVE URLS INTO ARRAY
    let cdnImages: string[] = [];
    let prompt = result[0].solutionPrompt;
    
    for (let i = 0; i < 5; i++) {
      let openAIURL = (await openAIGeneration(prompt)) as string;
      let cloudinaryImgData = (await upload2Cloudinary(
        openAIURL
      )) as unknown as CloudinaryData;
      cdnImages.push(cloudinaryImgData.secure_url);
    }
    console.log("FINAL IMAGES ARRAY: ", cdnImages);
  
    const currentResult: DocumentData[] = [];
    const QuerySnapshot2 = await currentContestRef.limit(1).get()
    QuerySnapshot2.forEach((element: { data: () => any; id: any; }) => {
      let data = element.data();
      data.id = element.id;
      currentResult.push(data)
      return data;
    })
    
    console.log("currentResult: ", currentResult);

    const newContest = {
      expirationDate: Date.now() + 8.64e7,
      createdAt: Date.now(),
      images: cdnImages,
      solutionPrompt: prompt,
      keywords: result[0].keywords,
      uids: []
    }

    await currentContestRef.add(newContest);
    const idToDelete = result[0].id;

    await finishedContestsRef.add(...currentResult);
    await currentContestRef.doc(currentResult[0].id).delete();

    await pendingContestRef.doc(idToDelete).delete();
    return null;
  }
  contestGeneration();
  return 1;
  });


  //HTTP CONTEST GENERATOR THROUGH POST
  exports.createContest = functions.https.onRequest((request, response) => {
    if(request.body.password === process.env.ADMIN_POST_PW) {
      const pendingContestsRef = firestore.collection('pendingContests');
      let images = ['','','','',''];
      pendingContestsRef.add({
        expirationDate: Date.now() + 8.64e7,
        createdAt: Date.now(),
        images: images,
        solutionPrompt: request.body.prompt,
        keywords: request.body.keywords,
        uids: []
      });
      response.send(true);
    }
    else {
      response.send(false)
    }
      });
    
    //HTTP USER ID CHECKUP
    exports.checkUID = functions.https.onRequest((request, response) => {
      async function runSelf() {
        const currentResult: DocumentData[] = [];
        const currentContestRef = await firestore.collection('currentContest')
        const QuerySnapshot2 = await currentContestRef.limit(1).get();
        QuerySnapshot2.forEach((element: { data: () => any; id: any; }) => {
          let data = element.data();
          data.id = element.id;
          currentResult.push(data)
        })
        const test = await currentContestRef.where('uids', 'array-contains', String(request.body.uid)).get()
        console.log("size: ", test._size)

        if (test._size !== 0) {
          response.send(false);
        } else {
          await currentContestRef.doc(currentResult[0].id).update({
            uids: admin.firestore.FieldValue.arrayUnion(request.body.uid)
          });
          response.send(true);
        }
      }
      runSelf();
    });