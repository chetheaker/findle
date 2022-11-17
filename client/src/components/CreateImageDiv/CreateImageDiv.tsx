import './style.css';
import 'firebase/compat/firestore';

import firebase from 'firebase/compat/app';

import { useState } from 'react';
import { firestore } from '../../services/fireBaseInit';
import { openAIGeneration } from '../../services/generateOpAI';
import { upload2Cloudinary } from '../../services/upload2Cloudinary';
import Spinner from '../Spinner/Spinner';

import Timer from '../Timer/Timer';

type GenerateImage = {
  preventDefault: () => void;
  target: { newPrompt: { value: string | any[] }; reset: () => void };
};

function CreateImage({ fetchImages, contests, user }) {
  const [isFetching, setIsFetching] = useState(false);
  const imagesRef = firestore.collection('images');

  const generateImage = async (event: GenerateImage) => {
    event.preventDefault();
    setIsFetching(true);

    // CHECKS: IF PROMPT CONTAINS THE 2 REQUIRED WORDS
    if (
      event.target.newPrompt.value.includes(contests[0].random2Words[0]) &&
      event.target.newPrompt.value.includes(contests[0].random2Words[1])
    ) {
      // GETS IMAGE´S OPENAI URL, THEN UPLOAD IMAGE TO CLOUDINARY
      let openAIURL = await openAIGeneration(event.target.newPrompt.value);
      let cloudinaryImgData = await upload2Cloudinary(openAIURL);
      console.log('img data', cloudinaryImgData);

      // UPLOADS: IMAGE AND IMAGE INFO TO FIREBASE
      try {
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
        });
      } catch (e) {
        console.log('error', e);
      }

      fetchImages();
      event.target.reset();
      setIsFetching(false);
    } else {
      alert('you promt does not include the 2 words');
    }
  };

  return (
    <>
      {!contests ? (
        <Spinner />
      ) : (
        <div className="promptInput">
          <div className="card2">
            <div className="container2">
              <div className="card3">
                <div className="timerDiv">
                  <h1>
                    This contest will end in:{' '}
                    <Timer
                      expirationDate={
                        contests.length ? contests[0].expirationDate : 0
                      }
                    />
                  </h1>
                </div>
                <div className="word3Container">
                  <div className="word1">
                    {contests.length ? contests[0].random2Words[0] : ''}
                  </div>
                  <div className="word2">
                    {contests.length ? contests[0].random2Words[1] : ''}
                  </div>
                </div>
              </div>
            </div>
            <form className="promptForm" onSubmit={generateImage}>
              <input
                name="newPrompt"
                placeholder="Write your promt. Be creative."
                type="text"
                required
              ></input>
              <button>{isFetching ? <Spinner /> : 'Create Image'}</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
export default CreateImage;
