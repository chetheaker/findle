import { useState, useEffect } from 'react';
import { fetchImages, fetchContest } from '../../services/FireStore';
import firebase from 'firebase/compat/app';

import ImageCard from '../ImageCard/ImageCard';
import PromptInput from '../PromptInput/PromptInput';

function Contest () {
  const [images, setImages] = useState<firebase.firestore.DocumentData[]>([]);
  const [contests, setContest] = useState<firebase.firestore.DocumentData[]>([]);

    // FETCH IMAGES AND CONTEST
    useEffect(() => {
      fetchImages(setImages);
      fetchContest(setContest);
    }, []);
  
  return (
  <>
    <ImageCard image={images[0].url}/>
    <PromptInput/>
  </>
  )
}

export default Contest;