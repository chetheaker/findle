import './ShareModal.css';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Spinner
} from '@chakra-ui/react';
import ImageCard from '../ImageCard/ImageCard';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { openAIGeneration } from '../../services/generateOpAI';
import { upload2Cloudinary } from '../../services/upload2Cloudinary';
import React, { useEffect, useState, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../services/fireBaseInit';
import SignIn from '../SignIn/SignIn';
import Timer from '../Timer/Timer';
import {
  checkOrAddUIDToContest,
  updateUserStats
} from '../../services/FireStore';
import ProfileContext from '../../ProfileContext';
import { DocumentData } from 'firebase/firestore';
import MintButton from '../MintButton/MintButton';

type ShareProps = {
  isOpen: boolean;
  onClose: () => void;
  prompt: string;
  inputs: any;
  promptArray: Prompt[];
  complete: boolean;
  creationDate: number;
  score: number | 'x';
};

type Prompt = {
  type: string;
  word: string;
};

type CloudData = {
  secure_url: string;
};

const ShareModal = ({
  onClose,
  isOpen,
  prompt,
  inputs,
  promptArray,
  complete,
  creationDate,
  score
}: ShareProps) => {
  const [userImageUrl, setUserImageUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(true);
  const [userPrompt, setUserPrompt] = useState('');
  const [user] = useAuthState(auth as any);
  const [shouldGenerate, setShouldGenerate] = useState(false);
  const [fourthLayer, setFourthLayer] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setStats] =
    useContext<[DocumentData | boolean, React.Dispatch<any>]>(ProfileContext);

  const generateUserImage = async (promptToGenerate: string) => {
    const gen = await checkOrAddUIDToContest(user!.uid);
    setShouldGenerate(gen);
    setFourthLayer(false);
    if (gen) {
      if (!score) return;
      console.log('uid', user!.uid);
      updateUserStats(user!.uid, score);
      setStats((prev: any) => {
        const newScore = prev[score] + 1;
        return {
          ...prev,
          [score]: newScore
        };
      });
      const aiUrl = await openAIGeneration(promptToGenerate);
      if (!aiUrl) return;
      const cloudData = (await upload2Cloudinary(aiUrl)) as CloudData;
      setUserImageUrl(cloudData.secure_url);
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (!complete) return;
    let userPromptArray = prompt.split(' ');
    for (let i = 0; i < userPromptArray.length; i++) {
      if (!isNaN(+userPromptArray[i])) {
        const type: string = promptArray[+userPromptArray[i]].type;
        const userInputs =
          JSON.parse(localStorage.getItem('inputs') as string) ||
          JSON.parse(localStorage.getItem('answers') as string);
        const userInput = userInputs[type];
        userPromptArray[i] = userInput;
      }
    }
    setUserPrompt(userPromptArray.join(' '));
    if (user && isGenerating) {
      generateUserImage(userPromptArray.join(' '));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complete, auth]);

  return (
    <Modal onClose={onClose} size="xl" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent className="modal-content-results">
        <ModalHeader>
          <div className="results-box-container">
            {promptArray.map((result, index) => {
              if (inputs[result.type] === result.word) {
                return <div className="box correct" key={index}></div>;
              } else {
                return <div className="box incorrect" key={index}></div>;
              }
            })}
          </div>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="results-body">
            <div className="your-image">
              <h1>Your unique AI generated image</h1>
            </div>
            <div className="share-image">
              {user ? (
                isGenerating ? (
                  shouldGenerate ? (
                    <div className="image-loading">
                      <h1>
                        We're generating your unique AI generated image. <br />
                        Sit tight...
                      </h1>
                      <Spinner />
                    </div>
                  ) : (
                    <div className="image-loading">
                      {fourthLayer ? (
                        <Spinner />
                      ) : (
                        <h1>
                          You have already generated an image today, come back
                          tomorrow!
                        </h1>
                      )}
                    </div>
                  )
                ) : (
                  <ImageCard imageUrl={userImageUrl} />
                )
              ) : (
                <div className="image-loading">
                  <h1>
                    You must be signed in to get your unique AI generated
                    image...
                  </h1>
                  <SignIn />
                </div>
              )}
              <div className="bottom">
                <h2>{userPrompt}</h2>
              </div>
            </div>
          </div>
          <MintButton uid={String(user?.uid)} userImageUrl={userImageUrl} userPrompt={userPrompt} />
        </ModalBody>
        <ModalFooter justifyContent={'center'}>
          <Timer creationDate={creationDate} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ShareModal;
