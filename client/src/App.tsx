import './App.css';
import React from 'react';
import firebase from 'firebase/compat/app';
import { firestore } from './services/fireBaseInit';
import { auth } from './services/fireBaseInit';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { fetchImages } from './services/FireStore';

// import components
import Navbar from './components/Navbar/Navbar';
import CreateImage from './components/CreateImageDiv/CreateImageDiv';
import ImageFeed from './components/ImageFeed/ImageFeed';
import ImageCard from './components/ImageCard/ImageCard';
import SignOut from './components/SignOut/SignOut';
import SignIn from './components/SignIn/SignIn';

function App() {
  const [images, setImages] = useState<firebase.firestore.DocumentData[]>([]);
  const [user] = useAuthState(auth as any);
  const [contests, setContests] = useState<firebase.firestore.DocumentData[]>(
    []
  );

  // FETCH IMAGES
  useEffect(() => {
    fetchImages(setImages);
  }, []);


  //FETCH CONTESTS
  useEffect(() => {
    fetchContest().catch(console.error);
  }, []);

  const fetchContest = async () => {
    setContests([]);
    await firestore
      .collection('contests')
      .orderBy('createdAt', 'desc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          let data = element.data();
          data.contestId = element.id;
          setContests((arr) => [...arr, data]);
        });
      });
  };

  return (
    <div className="App">
      {/* <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
       </div> */}

      <Navbar></Navbar>

      <SignOut auth={auth}/>
      <h1 className="h1WC">
        Trinity generates 2 random words. <br></br>
        You create an AI-based image with a prompt. <br></br>
        (must include the words) <br></br>
        The coolest image wins! <br></br>
      </h1>
      <section className="section1">
        {user ? (
          <>
            <CreateImage
              setImages={setImages}
              contests={contests}
              user={user}
            ></CreateImage>
            {contests.map((contest) => (
              <ImageFeed key={contest.contestId} contest={contest}>
                {images.map((image) => {
                  if (image.contestIdRef === contest.contestId) {
                    return (
                      <ImageCard
                        user={user}
                        image={image}
                        key={image.data.asset_id}
                      ></ImageCard>
                    );
                  }
                  return <></>;
                })}
              </ImageFeed>
            ))}
          </>
        ) : (
          <SignIn auth={auth}/>
        )}
      </section>
    </div>
  );
}


export default App;
