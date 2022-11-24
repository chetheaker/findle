import './Contest.css';
import { useState, useEffect } from 'react';
import { fetchContest } from '../../services/FireStore';
import firebase from 'firebase/compat/app';
import Spinner from '../Spinner/Spinner';
import PromptsContainer from '../PromptsContainer/PromptsContainer';
import ImagesContainer from '../ImagesContainer/ImagesContainer';

function Contest( user: any ) {

  const [isFetching, setIsFetching] = useState(true);
  const [contest, setContest] = useState<firebase.firestore.DocumentData | null>(null);

  const [guessCount, setGuessCount] = useState(
    Number(localStorage.getItem('guessCount')) || 0
  );
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
    <>
      <div className="imagecontainer">
        <ImagesContainer
          images={contest.images}
          guessCount={guessCount}
          complete={complete}
        />
      </div>
      <div className='promptscontainer'>
        <PromptsContainer
          prompt={contest.solutionPrompt}
          promptArray={contest.keywords}
          guessCount={guessCount}
          setGuessCount={setGuessCount}
          complete={complete}
          setComplete={setComplete}
          creationDate={contest.createdAt}
        />
      </div>
    </>
  );
}

export default Contest;
