import { Configuration, OpenAIApi } from "openai";
//import { writeFileSync } from 'fs';
import fetch from "node-fetch";
import { storage } from './fireBase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_API_KEY
});

  
const openai = new  OpenAIApi(configuration);

export const openAIGeneration = async (prompt) => {
  console.log(process.env.REACT_APP_API_KEY)
  console.log(prompt)
  const result = await openai.createImage({
    prompt,
    n:1,
    size: "1024x1024",
  });

  // url is the url from openAI
  console.log(result)
  const urlOpenAI = result.data.data[0].url;
  let finalUrl = ''

  console.log(urlOpenAI);
  // const imgResult = await fetch(urlOpenAI);
  // const blob = await imgResult.blob();
  // const buffer = Buffer.from( await blob.arrayBuffer());

  // next line uploads image to firestore:
  // const imageRef = ref(storage, 'urlOpenAI');
/*   uploadBytes(imageRef, blob).then(() =>{
    getDownloadURL(imageRef).then((url2) => {
      // finalUrl is the firebase url of the image
      finalUrl = url2;
    }).catch(error => {
      console.log('error getting the image url: ' + error)
    })
  }).catch(error=> {
    console.log('error uploading the image: ' + error)
  }) */
  console.log(finalUrl);
  return urlOpenAI

};
