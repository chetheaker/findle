import Axios from 'axios'

export const randomWordAPI = async () => {
  const url = "https://random-word-api.herokuapp.com/word";
  let wordsArray = [];
 
  // random word 1
  await Axios({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/randomword?type=noun',
    headers: { 'X-Api-Key': 'cj7dbHsyhK8jII1JrbcsRw==NQerittrwUauA8NG'},
    contentType: 'application/json',
    success: function(result) {
        console.log(result);
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
    
    }).then((response) => {
      wordsArray = [...wordsArray, response.data.word]
    })
   
  // random word 2
  await Axios({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/randomword?type=verb',
    headers: { 'X-Api-Key': 'cj7dbHsyhK8jII1JrbcsRw==NQerittrwUauA8NG'},
    contentType: 'application/json',
    success: function(result) {
        console.log(result);
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
    
    }).then((response) => {
      wordsArray = [...wordsArray, response.data.word]
    })

    
    
    // random word 3
    await Axios({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/randomword?type=adjective',
    headers: { 'X-Api-Key': 'cj7dbHsyhK8jII1JrbcsRw==NQerittrwUauA8NG'},
    contentType: 'application/json',
    success: function(result) {
        console.log(result);
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
    
    }).then((response) => {
      wordsArray = [...wordsArray, response.data.word]
    })


  return wordsArray;
}
