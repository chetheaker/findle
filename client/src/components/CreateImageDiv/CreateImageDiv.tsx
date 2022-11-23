import './style.css';
import 'firebase/compat/firestore';

import firebase from 'firebase/compat/app';
import { FormEvent, useState } from 'react';
import { firestore } from '../../services/fireBaseInit';
import { openAIGeneration } from '../../services/generateOpAI';
import { upload2Cloudinary } from '../../services/upload2Cloudinary';
import Spinner from '../Spinner/Spinner';

type CreateImageProps = {
  setImages: React.Dispatch<
    React.SetStateAction<firebase.firestore.DocumentData[]>
  >;
  contests: firebase.firestore.DocumentData[];
  user: any;
};

interface CloudinaryData {
  secure_url: string;
}

function CreateImage({ setImages, contests, user }: CreateImageProps) {
  const [isFetching, setIsFetching] = useState(false);
  const [promptInput, setPromptInput] = useState('');
  const imagesRef = firestore.collection('images');

  const generateImage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFetching(true);

    // CHECKS: IF PROMPT CONTAINS THE 2 REQUIRED WORDS
    if (
      promptInput
        .toLowerCase()
        .includes(contests[0].random2Words[0].toLowerCase()) &&
      promptInput
        .toLowerCase()
        .includes(contests[0].random2Words[1].toLowerCase())
    ) {
      // GETS IMAGE´S OPENAI URL, THEN UPLOAD IMAGE TO CLOUDINARY
      let openAIURL = (await openAIGeneration(promptInput)) as string;
      let cloudinaryImgData = (await upload2Cloudinary(
        openAIURL
      )) as CloudinaryData;
      console.log('img data', cloudinaryImgData);

      // UPLOADS: IMAGE AND IMAGE INFO TO FIREBASE
      try {
        await imagesRef.add({
          usedPrompt: promptInput,
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

      setPromptInput('');
      setIsFetching(false);
    } else {
      alert('you promt does not include the 2 words');
      setIsFetching(false);
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
                placeholder="Write your promt. Be creative."
                type="text"
                required
                onChange={(e) => setPromptInput(e.target.value)}
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
