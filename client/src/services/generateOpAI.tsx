import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPEN_AI_API_KEY
});

const openai = new OpenAIApi(configuration);

export const openAIGeneration = async (prompt: string) => {
  const result = await openai.createImage({
    prompt,
    n: 1,
    size: '1024x1024'
  });
  const urlOpenAI = result.data.data[0].url;
  return urlOpenAI;
};
