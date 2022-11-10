import './App.css';
import { useState } from 'react'

// import components
import CreateImage from './components/CreateImage';
import ImageFeed from './components/ImageFeed';
import Cloudinary from './cloudinary';

function App() {
  const [images, setImages] = useState([])
  console.log(process.env.REACT_APP_API_KEY)
  //const [promt, setPromt] = useState({promtInput: ''})

  return (
    <div className="App">
      <CreateImage></CreateImage>
      <ImageFeed images={images} setImages={setImages}></ImageFeed>
    </div>
  );
}

export default App;
