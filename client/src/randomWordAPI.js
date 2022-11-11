import Axios from 'axios'



export const randomWordAPI = async () => {
  const url = "https://random-word-api.herokuapp.com/word";
  let wordsArray = [];
 
  // random word 1
  await Axios.get(url).then((response) => {
    wordsArray = [...wordsArray, response.data]
  })
  // random word 2
  await Axios.get(url).then((response) => {
    wordsArray = [...wordsArray, response.data]
  })
  // random word 3
  await Axios.get(url).then((response) => {
    wordsArray = [...wordsArray, response.data]
  })

  return wordsArray;
}
