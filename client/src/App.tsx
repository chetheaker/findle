import './App.css';
import React from 'react';
import firebase from 'firebase/compat/app';
import { firestore } from './services/fireBaseInit';
import { auth } from './services/fireBaseInit';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { fetchImages, fetchContest } from './services/FireStore';

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
  const [contests, setContest] = useState<firebase.firestore.DocumentData[]>(
    []
  );

  // FETCH IMAGES
  useEffect(() => {
    fetchImages(setImages);
  }, []);

  //FETCH CONTEST
  useEffect(() => {
    fetchContest(setContest);
  }, []);

  return (
    <div className="App">
      <Navbar/>
      <SignOut auth={auth}/>
      <h1 className="h1WC">
        Trinity generates an image using AI based on  <br></br>
        a specific prompt that includes 5 main keywords, then blurs it. <br></br>
        You try to guess the prompt used, and difficulty is reduced on each try. <br></br>
        Finally, you'll get the resulting image of the prompts you tried. <br></br>
        Good luck! <br></br>
      </h1>
      <section className="section1">
        {user ? (
          <>
            <CreateImage
              setImages={setImages}
              contests={contests}
              user={user}
            />
            {contests.map((contest) => (
              <ImageFeed key={contest.contestId} contest={contest}>
                {images.map((image) => {
                  if (image.contestIdRef === contest.contestId) {
                    return (
                      <ImageCard
                        user={user}
                        image={image}
                        key={image.data.asset_id}
                      />
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
