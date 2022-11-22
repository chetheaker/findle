import './MintModal.css';
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
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../services/fireBaseInit';
import SignIn from '../SignIn/SignIn';

// import { Connection, Keypair, PublicKey } from "@solana/web3.js";
// import { Metaplex, keypairIdentity, bundlrStorage, toMetaplexFile, toBigNumber } from "@metaplex-foundation/js";

// // const secret =  [];//require("./keypair.json");


// const QUICKNODE_RPC = 'https://warmhearted-winter-river.solana-devnet.discover.quiknode.pro/f0a750831d453a3e404bfcd2017bbe0f601242a3/';
// const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC);

// const WALLET = Keypair.fromSecretKey(new Uint8Array(secret));

// const METAPLEX = Metaplex.make(SOLANA_CONNECTION)
//   .use(keypairIdentity(WALLET))
//   .use(bundlrStorage({
//     address: 'https://devnet.bundlr.network',
//     providerUrl: QUICKNODE_RPC,
//     timeout: 60000,
//   }));

const got = require('got');



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

const MintModal = ({
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
  const [user] = useAuthState(auth as any);

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
        const userInput = JSON.parse(localStorage.getItem('inputs') as string)[
          type
        ];
        userPromptArray[i] = userInput;
      }
    }
    setUserPrompt(userPromptArray.join(' '));
    if (user && isGenerating) {
      generateUserImage(userPromptArray.join(' '));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complete, auth]);

  // async function uploadImage( imgUrl: string, imgName: string ): Promise<string>  {
  //   console.log(`Step 1 - Uploading Image`);
  //   const imgBuffer = await got( imgUrl, { responseType: 'buffer' });
  //   const imgMetaplexFile = toMetaplexFile(imgBuffer, imgName);
  //   const imgUri = await METAPLEX.storage().upload(imgMetaplexFile);
  //   console.log(`   Image URI:`, imgUri);
  //   return imgUri
  // }

  function mintBtn() { 
    console.log(`hellooooo`);
    // console.log( uploadImage( userImageUrl, 'test') )
  }

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
                  <div className="image-loading">
                    <h1>
                      We're generating your unique AI generated image. <br />
                      Sit tight...
                    </h1>
                    <Spinner />
                  </div>
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
          <button onClick={mintBtn} > MINT NFT </button>
          <div className="modal-time">Next [GAMENAME] in [TIME]</div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MintModal;
