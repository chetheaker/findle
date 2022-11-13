import './App.css';
import firebase from 'firebase/compat/app';
import { firestore } from './services/fireBaseInit'
import { auth } from './services/fireBaseInit'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react'
import Axios from 'axios'

// import components
import Navbar from './components/Navbar/Navbar';
import CreateImage from './components/CreateImageDiv/CreateImageDiv';
import ImageFeed from './components/ImageFeed/ImageFeed';
import ImageCard from './components/ImageCard/ImageCard';


function App() {
  const [images, setImages] = useState([])
  const [user] = useAuthState(auth);
  console.log(user)

  useEffect(()=> {
    fetchImages().catch(console.error);
  }, [])

  const fetchImages = async () => {
    setImages([])
    await firestore.collection('images').get().then((querySnapshot) =>{
      querySnapshot.forEach(element => {
        let data = element.data();
        setImages(arr=> [...arr, data])
      })
    })
  };

  return (
    <div className="App">
      <Navbar>
        {/* <SignOut /> */}
      </Navbar>
      <SignOut className="signOutButton" />
      

      <section>
      {user ?
      <>
        <CreateImage fetchImages={fetchImages} user={user}></CreateImage>
        <ImageFeed>
          {images.map((image)=>(
            <ImageCard
            image={image}
            key={image.data.asset_id}
            />
          ))}
        </ImageFeed>
      </>
       : <SignIn />}

      </section>
    </div>
  );
}








function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <>
    <button className="sign-in" onClick={signInWithGoogle}> Sign in with Google </button>
    <p> Do not violate the community guidelines! </p>
    </>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button className="signOutButton" onClick={() => auth.signOut()}>SignOut</button>
  )
}

export default App;

















/*   const fetchImages = async()=> {
    setImages([])
    const response = firestore.collection('images');
    const data = await response.get();
    data.docs.forEach(item=> {
      setImages([...images, item.data])
    })
  } */

// import { useCollectionData } from 'react-firebase-hooks/firestore'
/*   const imagesRef = firestore.collection('images');
  const query = imagesRef.orderBy('createdAt', 'desc');
  const imagesArray = useCollectionData(query, { idField: 'id' });
  console.log(imagesArray) */
