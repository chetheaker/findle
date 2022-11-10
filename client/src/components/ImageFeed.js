import { firestore } from '../fireBase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import ImageCard  from './ImageCard';

function ImageFeed (images, setImages) {
  const imagesRef = firestore.collection('images');
  const query = imagesRef.orderBy('createdAt', 'desc');
  const [imagesArray] = useCollectionData(query, { idField: 'id' });

  return (
    <>
    {imagesArray && imagesArray.map((eachImage)=>(
      <ImageCard eachImage={eachImage} setImages={setImages} key={eachImage.id} />
        
    ))}
    </>
  )
}

export default ImageFeed;
