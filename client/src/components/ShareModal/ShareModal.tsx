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
import { useEffect, useState } from 'react';

type ShareProps = {
  isOpen: boolean;
  onClose: () => void;
  prompt: string;
  inputs: any;
  promptArray: Prompt[];
  complete: boolean;
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
  complete
}: ShareProps) => {
  const [userImageUrl, setUserImageUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(true);
  const [userPrompt, setUserPrompt] = useState('');

  const generateUserImage = async (promptToGenerate: string) => {
    const aiUrl = await openAIGeneration(promptToGenerate);
    console.log('aiUrl', aiUrl);
    if (!aiUrl) return;
    const cloudData = (await upload2Cloudinary(aiUrl)) as CloudData;
    console.log('cloudUrl', cloudData.secure_url);
    setUserImageUrl(cloudData.secure_url);
    setIsGenerating(false);
  };

  useEffect(() => {
    if (!complete) return;
    let userPromptArray = prompt.split(' ');
    for (let i = 0; i < userPromptArray.length; i++) {
      if (!isNaN(+userPromptArray[i])) {
        const type: string = promptArray[+userPromptArray[i]].type;
        const userInput = inputs[type];
        userPromptArray[i] = userInput;
      }
    }
    setUserPrompt(userPromptArray.join(' '));
    // generateUserImage(userPromptArray.join(' '));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complete]);

  return (
    <Modal onClose={onClose} size="xl" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent bg="#121213" className="modal-content-results">
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
              {isGenerating ? (
                <div className="image-loading">
                  <h1>
                    We're generating your unique AI generated image. <br />
                    Sit tight...
                  </h1>
                  <Spinner />
                </div>
              ) : (
                <ImageCard imageUrl={userImageUrl} />
              )}
              <div className="bottom">
                <h2>Prompt: {userPrompt}</h2>
                <button className="share">
                  Share
                  <AiOutlineShareAlt />
                </button>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="modal-time">Next [GAMENAME] in [TIME]</div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ShareModal;
