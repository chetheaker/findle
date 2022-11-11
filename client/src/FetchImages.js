// import moment from "moment";
import './style.css';

function FetchImage (props){

/*   const imagesRef = firestore.collection('images');
  const query = imagesRef.orderBy('createdAt', 'desc');
  const imagesArray = useCollectionData(query, { idField: 'id' });
  console.log(imagesArray)
  */
  return (
    <div key={props.image.data.asset_id} className='movie_container'>
      
    </div>
  ) 
}


export default FetchImage;