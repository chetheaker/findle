import './ImageCard.css';

type ImageCardProps = {
  imageUrl: string;
};

function ImageCard({ imageUrl }: ImageCardProps) {
  return (
    <div className="image-container">
      <img className="image" alt="to guess" src={imageUrl}></img>
    </div>
  );
}

export default ImageCard;
