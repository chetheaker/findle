import { firestore } from '../../fireBase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import ImageCard  from '../ImageCard/ImageCard';
import './style.css';

function ImageFeed (props) {
  const imagesRef = firestore.collection('images');
  const query = imagesRef.orderBy('createdAt', 'desc');
  const [imagesArray] = useCollectionData(query, { idField: 'id' });
  // console.log(imagesArray);


  return (
    <>
      <div className='list_title'>
        <h1>3 words:</h1>
      </div>
      <div className='list_scroll'>
        {props.children}
{/*         {images && images.map((eachImage)=>(
          <ImageCard eachImage={eachImage} setImages={setImages} key={eachImage.data.asset_id} />
        ))} */}
      </div>
    </>
  )
}

export default ImageFeed;
