import './ImagesContainer.css';
import { useState } from 'react';

import ImageCard from '../ImageCard/ImageCard';
import { BiLockAlt } from 'react-icons/bi';

type ImagesContainerProps = {
  images: string[];
  guessCount: number;
};

function ImagesContainer({ images, guessCount }: ImagesContainerProps) {
  const [active, setActive] = useState(images[0]);

  const handleClick = (url: string) => {
    setActive(url);
  };

  return (
    <div className="images-container">
      <div className="thumbnails">
        {images.map((image, index) => {
          return (
            <button
              className="thumbnail"
              onClick={() => {
                index < guessCount + 1 && handleClick(image);
              }}
              key={index}
            >
              <ImageCard imageUrl={image} />
              {index < guessCount + 1 || (
                <div className="overlay">
                  <BiLockAlt color="white" size="2em" className="lock" />
                </div>
              )}
            </button>
          );
        })}
      </div>
      <div className="image-cont">
        <ImageCard imageUrl={active} />
        <h3 className="image-tag">Made by DALL-E, Open AI</h3>
      </div>
    </div>
  );
}

export default ImagesContainer;
