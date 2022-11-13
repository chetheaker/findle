import './style.css';
import 'firebase/compat/firestore';

import firebase from 'firebase/compat/app';

import { useState, useEffect } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { firestore } from '../../services/fireBaseInit'
import { openAIGeneration } from '../../services/generateOpAI'
import { upload2Cloudinary } from '../../services/upload2Cloudinary'
import { randomWordAPI } from '../../services/randomWordAPI'
import { createNewContest1 } from '../../services/createNewContest';

import Timer from '../Timer/Timer';

function CreateImage({fetchImages}, user) {
  const [contests, setContests] = useState([]);

  const imagesRef = firestore.collection('images');
  const contestsRef = firestore.collection('contests');
  let currentContest;
  let latestContestDate;
  let latestContestExpDate;

  console.log(user);

  useEffect(()=> {
    fetchContest().catch(console.error);
  }, [])

  const fetchContest = async () => {
    setContests([])
    await firestore.collection('contests').orderBy("createdAt", "desc").get().then((querySnapshot) =>{
      querySnapshot.forEach(element => {
        let data = element.data();
        setContests(arr=> [...arr, data])
      })
    })

  };
  currentContest = contests[0]
  console.log(currentContest)
  contests.length ? console.log(currentContest.expirationDate) : console.log("undefined ?")

/*   const createNewContest = async () => {
    if (contests[0] && contests[0].expirationDate < Date.now()) {
      let rand3Words = await randomWordAPI()
      let rand3WordsFlat = rand3Words.flat()
      console.log(rand3WordsFlat);
      await contestsRef.add({
        random3Words: rand3WordsFlat,
        expirationDate: firebase.firestore.Timestamp.now().toMillis() + 1.08e+7,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      console.log('new contest created successfully!')
      window.location.reload(false);
    } else {
      console.log('current contest still on game on');
    } 
  } */

  createNewContest1(contests)
  
  const generateImage = async (event) => {
    event.preventDefault();
    let openAIURL = await openAIGeneration(event.target.newPrompt.value)
    let cloudinaryImgData = await upload2Cloudinary(openAIURL);
    
    await imagesRef.add({
      usedPrompt: event.target.newPrompt.value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      url: cloudinaryImgData.secure_url,
      data: cloudinaryImgData,
      //user.uid,
    })
    fetchImages()
    event.target.reset();
  };

  return (
    <>
      <div className='promptInput'>
        <h1 className='h1WC'> 
          Trinity generates 3 random words. <br></br>
          You create an AI-based image with a prompt. <br></br> 
          (must include the words) <br></br> 
          The coolest image wins! <br></br>
        </h1>

        <div className='card2'>
          <div className='container2'>
            <div className='card3'>
              <div className='timerDiv'>
                <h1>This contest will end in </h1>
                <h1><Timer expirationDate={ contests.length ? contests[0].expirationDate : 0} ></Timer></h1>
              </div>
              <div className='word3Container'>
                <div className='word1'>{ contests.length ? contests[0].random3Words[0] : '' }</div>
                <div className='word2'>{ contests.length ? contests[0].random3Words[1] : '' }</div>
                <div className='word3'>{ contests.length ? contests[0].random3Words[2] : '' }</div>
              </div>            
           </div>
          </div>
          <form className='promptForm' onSubmit={generateImage}>
            <input name='newPrompt' placeholder='Write your promt here. Be creative.' type="text" required></input>
            <button>Create Image</button>
          </form>
        </div>
      </div>
    </>

  )
}
export default CreateImage;





  /*     if (contestsArray[0]) {
      setContest([])
      currentContest = contestsArray[0][0]
      console.log(currentContest)
      setContest([currentContest])
      console.log()
      latestContestDate = contestsArray[0][0].createdAt.toDate()
      latestContestExpDate = moment(contestsArray[0][0].expirationDate) 
    } */


    /*   useEffect(()=> {
    fetchImages().catch(console.error);
  }, [])

  const fetchContest = async () => {
    if (contestsArray[0]) {
      setContest([])
      currentContest = contestsArray[0][0]
      console.log(currentContest)
      setContest([currentContest])
      console.log()
      latestContestDate = contestsArray[0][0].createdAt.toDate()
      latestContestExpDate = moment(contestsArray[0][0].expirationDate) 
    }
  }; */