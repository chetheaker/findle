import fetch from 'node-fetch';
import { Configuration, OpenAIApi } from 'openai';
const FormData = require('form-data')
import * as functions from 'firebase-functions';
const cors = require('cors')
require('firebase-functions/logger/compat');
import { DocumentData } from 'firebase/firestore';
import mintFN from './mint';
const admin = require('firebase-admin');
admin.initializeApp();
const firestore = admin.firestore();
const corsHandler = cors({ origin: true });



exports.scheduledFunction = functions.pubsub
  .schedule('59 23 * * 1-7')
  .onRun(async (context) => {
    //CLOUDINARY MODULE
    const upload2Cloudinary = async (aiUrl: string) => {
      const url = process.env.CLOUDINARY_URL as string;
      let cloudinaryImgData;
      const formData = new FormData();
      formData.append('file', aiUrl);
      formData.append('upload_preset', process.env.CLOUDINARY_KEY as string);
      const config = { method: 'POST', body: formData };
      await fetch(url, config)
        .then((response) => response.json())
        .then((data) => {
          cloudinaryImgData = data;
        });
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
      return urlOpenAI;
    };

    async function contestGeneration() {
      const currentContestRef = firestore.collection('currentContest');
      const pendingContestRef = firestore.collection('pendingContests');
      const finishedContestsRef = firestore.collection('finishedContests');

      const result: DocumentData[] = [];
      console.log("running2")
      try {
        const QuerySnapshot = await pendingContestRef.limit(1).get();
        console.log("running 2.5")
        QuerySnapshot.forEach((element: { data: () => any; id: any }) => {
          let data = element.data();
          data.id = element.id;
          result.push(data);
          return data;
        });
      } catch (error) {
        console.log(error)
      }
      console.log("running3")
      interface CloudinaryData {
        secure_url: string;
      }
      //GENERATE 5 IMAGES BASED ON PROMPT AND SAVE URLS INTO ARRAY
      let cdnImages: string[] = [];
      let prompt = result[0].solutionPrompt;
      console.log("running4")
      let tries = 0;
      for (let i = 0; i < 5; i++) {
        try {
          let openAIURL = await openAIGeneration(prompt) as string;
          console.log("downloaded from OAI")
          let cloudinaryImgData = await upload2Cloudinary(
            openAIURL
          ) as unknown as CloudinaryData;
          console.log("sent to CDNR")
          cdnImages.push(cloudinaryImgData.secure_url);
        } catch (error) {
          console.log(error)
          i = i - 1;
          tries++
          if (tries >10) break
        }
      }
      console.log("running5")

      const currentResult: DocumentData[] = [];
      const QuerySnapshot2 = await currentContestRef.limit(1).get();
      QuerySnapshot2.forEach((element: { data: () => any; id: any }) => {
        let data = element.data();
        data.id = element.id;
        currentResult.push(data);
        return data;
      });

      const newContest = {
        expirationDate: Date.now() + 8.64e7,
        createdAt: Date.now(),
        images: cdnImages,
        solutionPrompt: prompt,
        keywords: result[0].keywords,
        uids: []
      };
      console.log("running6")
      await currentContestRef.add(newContest);
      const idToDelete = result[0].id;

      await finishedContestsRef.add(...currentResult);
      await currentContestRef.doc(currentResult[0].id).delete();

      await pendingContestRef.doc(idToDelete).delete();
      console.log("running7")
      return null;
    }
    try {
      await contestGeneration();
    } catch (error) {
        console.log(error)
    }
    return 1;
  });

//HTTP CONTEST GENERATOR THROUGH POST
exports.createContest = functions.https.onRequest((request, response) => {
  if (request.body.password === process.env.ADMIN_POST_PW) {
    const pendingContestsRef = firestore.collection('pendingContests');
    let images = ['', '', '', '', ''];
    pendingContestsRef.add({
      expirationDate: Date.now() + 8.64e7,
      createdAt: Date.now(),
      images: images,
      solutionPrompt: request.body.prompt,
      keywords: request.body.keywords,
      uids: []
    });
    response.send(true);
  } else {
    response.send(false);
  }
});

//HTTP USER ID CHECKUP
exports.checkUID = functions.https.onRequest(async (request, response) => {
  corsHandler(request, response, () => {
    async function runSelf() {
      response.set('Access-Control-Allow-Origin', '*');
      response.set('Access-Control-Allow-Methods', 'POST');
      const currentResult: DocumentData[] = [];
      const currentContestRef = await firestore.collection('currentContest');
      const QuerySnapshot2 = await currentContestRef.limit(1).get();
      QuerySnapshot2.forEach((element: { data: () => any; id: any }) => {
        let data = element.data();
        data.id = element.id;
        currentResult.push(data);
      });
      const test = await currentContestRef
        .where('uids', 'array-contains', String(request.body.uid))
        .get();
      if (test._size !== 0) {
        response.send({ res: false });
      } else {
        await currentContestRef.doc(currentResult[0].id).update({
          uids: admin.firestore.FieldValue.arrayUnion(request.body.uid)
        });
        response.send({ res: true });
      }
    }
    runSelf();
  });
});

//NFT MINTING
exports.nftMintReq = functions.https.onRequest(async (request, response) => {
  corsHandler(request, response, () => {
    async function runSelf() {
      response.set('Access-Control-Allow-Origin', '*');
      response.set('Access-Control-Allow-Methods', 'POST');
      // DATA EVAL
      if (request.body.uid && request.body.url && request.body.wallet) {
        //MINTING PROCESS
        await mintFN(request.body);
        response.send({ res: true });
      } else {
        response.send({ res: false });
      }
    }
    runSelf();
  });
});
