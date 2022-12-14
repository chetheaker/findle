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
const { Bot } = require("grammy");

const bot = new Bot(String(process.env.TLGR_BOT_KEY));



exports.scheduledFunction = functions.pubsub
  .schedule('59 23 * * 1-7')
  .onRun(async (context: any) => {
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
      try {
        const QuerySnapshot = await pendingContestRef.limit(1).get();
        QuerySnapshot.forEach((element: { data: () => any; id: any }) => {
          let data = element.data();
          data.id = element.id;
          result.push(data);
          return data;
        });
      } catch (error) {
        console.log(error)
      }
      interface CloudinaryData {
        secure_url: string;
      }
      //GENERATE 5 IMAGES BASED ON PROMPT AND SAVE URLS INTO ARRAY
      let cdnImages: string[] = [];
      let prompt = result[0].solutionPrompt;
      let tries = 0;
      for (let i = 0; i < 5; i++) {
        try {
          let openAIURL = await openAIGeneration(prompt) as string;
          let cloudinaryImgData = await upload2Cloudinary(
            openAIURL
          ) as unknown as CloudinaryData;
          bot.api.sendMessage(Number(process.env.TLGR_GROUP_ID), `Created a new image @ ${cloudinaryImgData.secure_url}`)
          cdnImages.push(cloudinaryImgData.secure_url);
        } catch (error) {
          console.log(`Try ${tries}, error:\n `,error);
          i = i - 1;
          tries++
          if (tries >10) {
            bot.api.sendMessage(Number(process.env.TLGR_GROUP_ID), `Failed to create images. OpenAI failed to respond over 10 times.`);
            break;
          }
        }
      }
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
      await currentContestRef.add(newContest);
      const idToDelete = result[0].id;
      await finishedContestsRef.add(...currentResult);
      await currentContestRef.doc(currentResult[0].id).delete();
      await pendingContestRef.doc(idToDelete).delete();
      return null;
    }
    try {
      await contestGeneration();
    } catch (error) {
        console.log(error)
        bot.api.sendMessage(Number(process.env.TLGR_GROUP_ID), `Failed to create a new contest. Error: \n ${error}`);
    }
    return 1;
  });

//HTTP CONTEST GENERATOR THROUGH POST
exports.createContest = functions.https.onRequest(async (request: any, response: any) => {
  if (request.body.password === process.env.ADMIN_POST_PW) {
    const pendingContestsRef = firestore.collection('pendingContests');
    let images = ['', '', '', '', ''];
    try {
        await pendingContestsRef.add({
        expirationDate: Date.now() + 8.64e7,
        createdAt: Date.now(),
        images: images,
        solutionPrompt: request.body.prompt,
        keywords: request.body.keywords,
        uids: []
      });
      
      bot.api.sendMessage(Number(process.env.TLGR_GROUP_ID), `Successfully created a new contest with promp \n\n'${request.body.prompt}'\n\n and keywords \n\n'${request.body.keywords.map((e: any)=>{return e.word})}'`)
    } catch (error) {
      bot.api.sendMessage(Number(process.env.TLGR_GROUP_ID), `Error creating a new contest with promp \n\n'${request.body.prompt}'\n\n and keywords \n\n'${request.body.keywords.map((e: any)=>{return e.word})}'\n\n with error: \n\n'${error}'`)
    }
    response.send(true);
  } else {
    bot.api.sendMessage(Number(process.env.TLGR_GROUP_ID), `Creation of contest with promp '${request.body.prompt}' failed due to wrong password @ POST request`)
    response.send(false);
  }
});

//HTTP USER ID CHECKUP
exports.checkUID = functions.https.onRequest(async (request: any, response: any) => {
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
        bot.api.sendMessage(Number(process.env.TLGR_GROUP_ID), `User with UID ${request.body.uid} has successfully requested a unique image!`)
        response.send({ res: true });
      }
    }
    runSelf();
  });
});

//NFT MINTING
exports.nftMintReq = functions.https.onRequest(async (request: any, response: any) => {
  corsHandler(request, response, () => {
    async function runSelf() {
      response.set('Access-Control-Allow-Origin', '*');
      response.set('Access-Control-Allow-Methods', 'POST');
      // DATA EVAL
      if (request.body.uid && request.body.url && request.body.wallet) {
        //MINTING PROCESS
        bot.api.sendMessage(Number(process.env.TLGR_GROUP_ID), `User with UID ${request.body.uid} has successfully requested a minting of an NFT with image ${request.body.url} and wallet ${request.body.wallet}!`);
        try {
          await mintFN(request.body);
          response.send({ res: true });
        } catch (error) {
          console.log(error);
          bot.api.sendMessage(Number(process.env.TLGR_GROUP_ID), `User with UID ${request.body.uid} has failed to mint an NFT with image ${request.body.url} and wallet ${request.body.wallet}. Error: ${error}`);
          response.send({ res: false });
        }
      } else {
        response.send({ res: false });
      }
    }
    runSelf();
  });
});
