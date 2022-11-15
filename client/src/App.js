import './App.css';
import React from 'react';
import firebase from 'firebase/compat/app';
import { firestore } from './services/fireBaseInit'
import { auth } from './services/fireBaseInit'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

// import components
import Navbar from './components/Navbar/Navbar';
import CreateImage from './components/CreateImageDiv/CreateImageDiv';
import ImageFeed from './components/ImageFeed/ImageFeed';
import ImageCard from './components/ImageCard/ImageCard';
import Spinner from './components/Spinner/Spinner'



function App() {
  const [images, setImages] = useState([]);
  const [user] = useAuthState(auth);
  const [contests, setContests] = useState([]);
  const [spinner, setSpinner] = useState(false);

  // FETCH IMAGES
  useEffect(()=> {
    fetchImages().catch(console.error);
  }, [])

  const fetchImages = async () => {
    setImages([])
    await firestore.collection('images').orderBy('likesReceived', 'desc').get().then((querySnapshot) =>{
      querySnapshot.forEach(element => {
        let data = element.data();
        data.imageId = element.id
        setImages(arr=> [...arr, data])
      })
    })
  };

  //FETCH CONTESTS
  useEffect(()=> {
    fetchContest().catch(console.error);
  }, [])

  const fetchContest = async () => {
    setContests([])
    await firestore.collection('contests').orderBy("createdAt", "desc").get().then((querySnapshot) =>{
      querySnapshot.forEach(element => {
        let data = element.data();
        data.contestId = element.id;
        setContests(arr=> [...arr, data])
      })
    })
  };

  return (
    
    <div className="App">
      {/* <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
       </div> */}
  
      <Navbar>
        {/* <SignOut /> */}
      </Navbar>
        

      <SignOut className="signOutButton" />
      <h1 className='h1WC'> 
          Trinity generates 2 random words. <br></br>
          You create an AI-based image with a prompt. <br></br> 
          (must include the words) <br></br> 
          The coolest image wins! <br></br>
      </h1>
      <section className='section1'>
      {user ?
      <>
        <CreateImage fetchImages={fetchImages} contests={contests} user={user}></CreateImage>
        {contests.map((contest)=>(
          <ImageFeed key={contest.contestId} contest={contest}>
          {images.map((image) => {
            if (image.contestIdRef === contest.contestId) {
              return <ImageCard
              user={user}
              image={image}
              key={image.data.asset_id}>
              </ImageCard>
            }
            })
          }
          </ImageFeed>
        ))
        }
      </>
        : <SignIn />
      }
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
      <div className='signInDiv'>
        <button className="signInButton" onClick={signInWithGoogle}> Sign in with Google </button>
      </div>
    </>
  )
}

function SignOut() {
  return auth.currentUser && (
      <button className="signOutButton" onClick={() => auth.signOut()}>SignOut</button>
  )
}

export default App;

   {/* 
          
       {/*  <h1>{contest.random2Words[0] + contest.random2Words[1]}</h1> */}


{/*         <ImageFeed>
          {images.map((image)=>(
            <ImageCard
            image={image}
            key={image.data.asset_id}
            />
          ))}
        </ImageFeed> */}