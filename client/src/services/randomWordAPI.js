import Axios from 'axios'

export const randomWordAPI = async () => {
  //const url = "https://random-word-api.herokuapp.com/word";
  let wordsArray = [];

  const character = allCharacters[Math.floor(Math.random()*allCharacters.length)]
  wordsArray.push(character);
  const mood = allMoods[Math.floor(Math.random()*allMoods.length)]
  wordsArray.push(mood);
  console.log(wordsArray); 
 
  return wordsArray;
}

const allCharacters = [
  // fictional characters
  "Super-Man",
  "Batman",
  "Hitler",
  "Harry Potter",
  "Iron Man",
  "Spider-Man",
  "Wonder Woman",
  "Gandalf",
  "Captain America",
  "Hercules",
  "Pegasus",
  "Mickey Mouse",
  "James Bond",
  "Bugs Bunny",
  "Peter Pan",
  "Indiana Jones",
  "Rocky Balboa",
  "Vito Corleone",
  "Homer Simpson",
  "King Kong",
  "Fredy Krueger",
  "Goku",



  // animals
  "Dog",
  "Cat",
  "Horse",
  "Mouse",
  "Hypo",
  "Lion",
  "Tiger",
  "Elephant",
  "Wolf",
  "Dolpin",
  "Octopus",
  "Shark",
  "Turtle",
  "Coyote",
  "Elk",
  "Snake",
  "Crocodile",
  "Racoon",
  "Bear",
  "Monkey",
  "Seahorse",
  "Rabbit",
  "Parrot",
  "Mouse",

  // generic subjects
  "Astronaut",
  "Artist",
  "Soccer Player",
  "Chef",
  "Detective",
  "Rock Star",
  "Pilot",
  "Scientist",
  "Teacher",
  "Doctor",
  "Soldier",
  "Police officer",
  "Firefighter",
  "Business man",
  "Veterinarian",
  "Plumber",
  "Dancer",
]

const allMoods = [
  "happy",
  "sad",
  "angry",
  "excited",
  "worried",
  "anxious",
  "scared",
  "mad",
  "bitter",
  "frustrated",
  "horrified",
  "offended",
  "surprised",
  "astonished",
  "relaxed",
  "pleased",
  "afraid",
  "depressed",
  "bored",
  "tired",
  "distracted",
  "interested",
  "pride",
  "guilt",
  "shame",
  "grief",
  "embarrased",
  "jelous",
  "agonizing",
  "loving",
  "arrogant",
  "cheerful",
  "confident",
  "confused",
  "demoralized",
  "suspicious",
  "vengeful",
  "weak",
  "strong",
  "silly",
  "sexy",
  "seductive",

]









/*   // random word 1
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
 */
