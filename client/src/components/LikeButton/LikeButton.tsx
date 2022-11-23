import { useState, useEffect } from 'react';
import './style.css';
import { firestore } from '../../services/fireBaseInit';
import { increment, arrayRemove, arrayUnion } from 'firebase/firestore';
import { User } from 'firebase/auth'
import firebase from 'firebase/compat';

type Props = {
  user: User
  image: firebase.firestore.DocumentData
}
const LikeButton:React.FC<Props> = ({image, user}) => {
  const [counter, setCounter] = useState(image.likesReceived || 0);
  const [liked, setLiked] = useState(false);

  // Add a new document in collection "cities"
  const imageRef = firestore.collection('images').doc(`${image.imageId}`);
  useEffect(() => {
    if (image.usersWhoLiked && image.usersWhoLiked.includes(user.uid)) {
      setLiked(true);
    }
  }, [image.usersWhoLiked, user.uid]);

  // when user is already in the array UsersWhoLiked
  const toggleLike1 = async () => {
    if (!liked) {
      setLiked(true);
      setCounter((count: number) => count + 1);
      await imageRef.update({
        likesReceived: increment(1),
        usersWhoLiked: arrayUnion(user.uid)
      });
    }
    if (liked) {
      setLiked(false);
      setCounter((count: number) => count - 1);
      await imageRef.update({
        likesReceived: increment(-1),
        usersWhoLiked: arrayRemove(user.uid)
      });
    }
  };

  return (
    <div className="counter">
      <div className="likeContainer">
        <span className="counterOutput">{counter}</span>
        <img
          className="likeButton"
          alt="likeButton"
          src="../../assets/heart-icon.png"
          onClick={toggleLike1}
        ></img>
      </div>
    </div>
  );
}

export default LikeButton;