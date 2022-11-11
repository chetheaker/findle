import './App.css';
import { firestore } from './fireBase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useEffect, useState } from 'react'

// import components
import Navbar from './components/Navbar/Navbar';
import CreateImage from './components/CreateImage/CreateImage';
import ImageFeed from './components/ImageFeed/ImageFeed';
import ImageCard from './components/ImageCard/ImageCard';

function App() {
  const [images, setImages] = useState([])
  const [contests, setContests] = useState([])

/*   const imagesRef = firestore.collection('images');
  const query = imagesRef.orderBy('createdAt', 'desc');
  const imagesArray = useCollectionData(query, { idField: 'id' });
  console.log(imagesArray) */

  const fetchImages = async () => {
    




    await firestore.collection('images').get().then((querySnapshot) =>{
      console.log(querySnapshot)
      querySnapshot.forEach(element => {
        let data = element.data();
        console.log('data is:', data)
        setImages(arr=> [...arr, data])
      })
    })
  };

 
  useEffect(()=> {
    fetchImages().catch(console.error);
  }, [])

  return (
    <div className="App">
      <Navbar/>
      <CreateImage fetchImages={fetchImages}></CreateImage>
      <ImageFeed>
        {images.map((image)=>(
          <ImageCard
          image={image}
          key={image.data.asset_id}
          />
        ))}
      </ImageFeed>
    </div>
  );
}

export default App;
