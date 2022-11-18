import './ImageCard.css';
// import firebase from 'firebase/compat/app';
// import LikeButton from '../LikeButton/LikeButton';

type ImageCardProps = {
  imageUrl: string;
};

function ImageCard({ imageUrl }: ImageCardProps) {
  return (
    <div className="image-container">
      <img className="image" alt="to guess" src={imageUrl}></img>
      <h3 className="image-tag">Made by DALL-E, Open AI</h3>
    </div>
  );
}

export default ImageCard;
