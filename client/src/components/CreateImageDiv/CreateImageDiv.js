import './style.css';
import 'firebase/compat/firestore';

import firebase from 'firebase/compat/app';
import { auth } from '../../services/fireBaseInit'
import { useAuthState } from 'react-firebase-hooks/auth';

import { useState, useEffect } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { firestore } from '../../services/fireBaseInit'
import { openAIGeneration } from '../../services/generateOpAI'
import { upload2Cloudinary } from '../../services/upload2Cloudinary'
import { randomWordAPI } from '../../services/randomWordAPI'
import { createNewContest1 } from '../../services/createNewContest';
import Spinner from '../Spinner/Spinner'

import Timer from '../Timer/Timer';

function CreateImage({fetchImages, contests, user}) {
  const [spinner, setSpinner] = useState(true);
  const imagesRef = firestore.collection('images');
  const contestsRef = firestore.collection('contests');

  const generateImage = async (event) => {
    event.preventDefault();

    // CHECKS: IF PROMPT CONTAINS THE 2 REQUIRED WORDS
    if (event.target.newPrompt.value.includes(contests[0].random2Words[0]) && event.target.newPrompt.value.includes(contests[0].random2Words[1])) {

    // GETS IMAGE´S OPENAI URL, THEN UPLOAD IMAGE TO CLOUDINARY
    let openAIURL = await openAIGeneration(event.target.newPrompt.value)
    let cloudinaryImgData = await upload2Cloudinary(openAIURL);
    
    // UPLOADS: IMAGE AND IMAGE INFO TO FIREBASE
    await imagesRef.add({
      usedPrompt: event.target.newPrompt.value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      url: cloudinaryImgData.secure_url,
      data: cloudinaryImgData,
      userName: user.displayName,
      userId: user.uid,
      contestIdRef: contests[0].contestId,
      contestWord1: contests[0].random2Words[0],
      contestWord2: contests[0].random2Words[1],
      likesReceived: 0,
      usersWhoLiked: []
    })

    fetchImages()
    event.target.reset();
  } else {
    alert('you promt does not include the 2 words')
  }
  };

  return (
    <>
     { !contests.length ? <Spinner /> : 
      <div className='promptInput'>
        <div className='card2'>
          <div className='container2'>
            <div className='card3'>
              <div className='timerDiv'>
                <h1>This contest will end in: <Timer expirationDate={ contests.length ? contests[0].expirationDate : 0} ></Timer> </h1>
              </div>
              <div className='word3Container'>
                <div className='word1'>{ contests.length ? contests[0].random2Words[0] : '' }</div>
                <div className='word2'>{ contests.length ? contests[0].random2Words[1] : '' }</div>
              </div>            
           </div>
          </div>
          <form className='promptForm' onSubmit={generateImage}>
            <input name='newPrompt' placeholder='Write your promt. Be creative.' type="text" required></input>
            <button>Create Image</button>
          </form>
        </div>
      </div>
      }
    </>

  )
}
export default CreateImage;
