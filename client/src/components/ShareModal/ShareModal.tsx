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
};

type CloudData = {
  secure_url: string;
};

const ShareModal = ({ onClose, isOpen }: ShareProps) => {
  const [userImageUrl, setUserImageUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(true);

  const generateUserImage = async () => {
    const prompt = 'USER PROMPT MADE FROM INPUTS ARRAY AND PROMPT STRING';
    console.log('generating');
    const aiUrl = await openAIGeneration(prompt);
    console.log('aiUrl', aiUrl);
    if (!aiUrl) return;
    const cloudData = (await upload2Cloudinary(aiUrl)) as CloudData;
    console.log('cloudUrl', cloudData.secure_url);
    setUserImageUrl(cloudData.secure_url);
    setIsGenerating(false);
  };

  useEffect(() => {
    generateUserImage();
  }, []);

  return (
    <Modal onClose={onClose} size="xl" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent bg="#121213" className="modal-content-results">
        <ModalHeader>
          <div className="results-box-container">
            <div className="box incorrect"></div>
            <div className="box correct"></div>
            <div className="box incorrect"></div>
            <div className="box incorrect"></div>
            <div className="box correct"></div>
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
                <h2>Prompt: [YOUR FINAL PROMPT GOES HERE]</h2>
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
