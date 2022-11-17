import './style.css';
import firebase from 'firebase/compat/app';

type ImageFeedProps = {
  contest: firebase.firestore.DocumentData;
  children: any;
};

function ImageFeed({ contest, children }: ImageFeedProps) {
  return (
    <>
      <div className="feedContainer">
        <div className="word3Container">
          <div className="word1">{contest.random2Words[0]}</div>
          <div className="word2">{contest.random2Words[1]}</div>
        </div>
        <div className="list_scroll">{children}</div>
      </div>
    </>
  );
}

export default ImageFeed;
