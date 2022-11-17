import './style.css';
import firebase from 'firebase/compat/app';
import LikeButton from '../LikeButton/LikeButton';

type ImageCardProps = {
  image: firebase.firestore.DocumentData;
  user: any;
};

function ImageCard({ image, user }: ImageCardProps) {
  return (
    <div key={image.data.asset_id} className="movie_container">
      <h3 className="user">{image.userName} </h3>
      <img className="movie_img" alt={image.usedPrompt} src={image.url}></img>
      <LikeButton image={image} user={user}></LikeButton>
      <h3 className="movie_headline">{image.usedPrompt}</h3>
    </div>
  );
}

export default ImageCard;
