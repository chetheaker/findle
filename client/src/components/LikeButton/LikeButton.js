import { React, useState, useEffect } from 'react'
import './style.css';
import heart from '../../assets/heart-icon.png';
import { firestore } from '../../services/fireBaseInit'
//import a from "../../assets/heart-icon-png"
import { doc, FieldValue, setDoc, update, increment, arrayRemove, arrayUnion } from "firebase/firestore"; 
 
export default function LikeButton({image, user}) {
  const imagesRef = firestore.collection('images');
  const [counter, setCounter] = useState(image.likesReceived || 0);
  const [liked, setLiked] = useState(false);

  // Add a new document in collection "cities"
  const imageRef = firestore.collection('images').doc(`${image.imageId}`)

  useEffect(()=> {
    if (image.usersWhoLiked && image.usersWhoLiked.includes(user.uid)) {
      setLiked(true);
    };
  }, [])
  

  // when user is already in the array UsersWhoLiked
  const toggleLike1 = async () =>{
    if (!liked) {
      setLiked(true);
      setCounter(count => count + 1);
      await imageRef.update({
        likesReceived: increment(1),
        usersWhoLiked: arrayUnion(user.uid)
      })

    }
    if (liked) {
      setLiked(false);
      setCounter(count => count - 1);
      await imageRef.update({
        likesReceived: increment(-1),
        usersWhoLiked: arrayRemove(user.uid)
      })
    }
    

/*     if (!image.usersWhoLiked.includes(user.id)){
      if (!liked) {
        setLiked(true);
        setCounter(count => count + 1);
        await imageRef.update({
          likesReceived: FieldValue.increment(1),
          usersWhoLiked: FieldValue.arryUnion(user.uid)
        })

      }
      if (liked) {
        setLiked(false);
        setCounter(count => count - 1);
        await imageRef.update({
          likesReceived: FieldValue.increment(-1),
          usersWhoLiked: FieldValue.arrayRemove(user.uid)
        })
      }
    } */
  }





/*   const increaseIfUserNotFoundInArray = async () => {
    if (!image.userWhoLikeImg.includes(user.uid)) {
      if (liked) {
        await imagesRef.update
  

        // -1 in counter
      }
    }
  } */

 
  //increase counter
/*   const increase = async () => {
    if (!liked  ) {
      console.log(image);
      console.log(image.imageId);
      console.log(user.uid);
      console.log(user);
      
      setCounter(count => count + 1);
      setLiked(true);
    } else if (liked) {
    setCounter(count => count - 1);
    setLiked(false);
    }
  }; */
 

  return (
    <div className="counter">      
      <div className="likeContainer">
        <span className="counterOutput">{counter}</span>
        <img className='likeButton' alt='likeButton' src={heart} onClick={toggleLike1}></img>
      </div>
    </div>
  );
}