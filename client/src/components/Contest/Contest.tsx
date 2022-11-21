import './Contest.css';
import { useState, useEffect } from 'react';
import { fetchContest } from '../../services/FireStore';
import firebase from 'firebase/compat/app';

import Spinner from '../Spinner/Spinner';
import PromptsContainer from '../PromptsContainer/PromptsContainer';
import ImagesContainer from '../ImagesContainer/ImagesContainer';

function Contest() {
  const [isFetching, setIsFetching] = useState(true);
  const [contest, setContest] =
    useState<firebase.firestore.DocumentData | null>(null);

  const [guessCount, setGuessCount] = useState(0);
  const [complete, setComplete] = useState(false);

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
      <ImagesContainer
        images={contest.images}
        guessCount={guessCount}
        complete={complete}
      />
      <PromptsContainer
        prompt={contest.solutionPrompt}
        promptArray={contest.keywords}
        guessCount={guessCount}
        setGuessCount={setGuessCount}
        complete={complete}
        setComplete={setComplete}
      />
    </div>
  );
}

export default Contest;
