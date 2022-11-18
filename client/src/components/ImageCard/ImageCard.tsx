import './ImageCard.css';
import firebase from 'firebase/compat/app';
// import LikeButton from '../LikeButton/LikeButton';

type ImageCardProps = {
  image: firebase.firestore.DocumentData;
};

function ImageCard({ image }: ImageCardProps) {
  return (
    <div className="image-container">
      <img className="image" alt={image.usedPrompt} src={image.url}></img>
      <h3 className="image-tag">Made by DALL-E, Open AI</h3>
    </div>
  );
}

export default ImageCard;
