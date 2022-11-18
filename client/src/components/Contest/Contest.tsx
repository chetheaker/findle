import './Contest.css';
import { useState, useEffect } from 'react';
import { fetchContest } from '../../services/FireStore';
import firebase from 'firebase/compat/app';

import ImageCard from '../ImageCard/ImageCard';
import Spinner from '../Spinner/Spinner';
import PromptsContainer from '../PromptsContainer/PromptsContainer';

function Contest() {
  const [isFetching, setIsFetching] = useState(true);
  const [contest, setContest] =
    useState<firebase.firestore.DocumentData | null>(null);

  // FETCH IMAGES AND CONTEST
  useEffect(() => {
    const fetchContestandImage = async () => {
      await fetchContest(setContest);
      setIsFetching(false);
    };

    fetchContestandImage();
  }, []);

  if (isFetching || !contest) return <Spinner />;

  return (
    <div className="contest">
      <ImageCard imageUrl={contest.images[0]} />
      <PromptsContainer
        prompt={contest.solutionPrompt}
        promptArray={contest.keywords}
      />
    </div>
  );
}

export default Contest;
