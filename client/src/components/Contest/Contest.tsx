import { useState, useEffect } from 'react';
import { fetchImages, fetchContest } from '../../services/FireStore';
import firebase from 'firebase/compat/app';

import ImageCard from '../ImageCard/ImageCard';
import PromptInput from '../PromptInput/PromptInput';
import Spinner from '../Spinner/Spinner';

function Contest() {
  const [isFetching, setIsFetching] = useState(true);
  const [images, setImages] = useState<firebase.firestore.DocumentData[]>([]);
  const [contests, setContest] = useState<firebase.firestore.DocumentData[]>(
    []
  );

  // FETCH IMAGES AND CONTEST
  useEffect(() => {
    const fetchContestandImage = async () => {
      await fetchImages(setImages);
      await fetchContest(setContest);
      setIsFetching(false);
    };

    fetchContestandImage();
  }, []);

  if (isFetching) return <Spinner />;

  return (
    <>
      <ImageCard imageUrl={images[0].url} />
      <PromptInput />
    </>
  );
}

export default Contest;
