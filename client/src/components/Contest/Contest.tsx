import './Contest.css';
import { useState, useEffect } from 'react';
import { fetchContest } from '../../services/FireStore';
import firebase from 'firebase/compat/app';
import Spinner from '../Spinner/Spinner';
import PromptsContainer from '../PromptsContainer/PromptsContainer';
import ImagesContainer from '../ImagesContainer/ImagesContainer';
import Timer from '../Timer/Timer';

// dev
import ShareModal from '../ShareModal/ShareModal';

function Contest() {
  const [isFetching, setIsFetching] = useState(true);
  const [contest, setContest] =
    useState<firebase.firestore.DocumentData | null>(null);

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
    <div className="contest">
      <ShareModal isOpen={false} onClose={() => { return 0}} prompt='test promt' inputs='' promptArray={[]} complete={true} />
      {contest.createdAt && <Timer creationDate={contest.createdAt} />}
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
