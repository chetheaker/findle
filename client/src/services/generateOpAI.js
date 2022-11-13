import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OAI_API_KEY
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

  const urlOpenAI = result.data.data[0].url;
  let finalUrl = ''

  console.log(urlOpenAI);

  console.log(finalUrl);
  return urlOpenAI
};
