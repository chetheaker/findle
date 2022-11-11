import './style.css';
import moment from "moment";
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { firestore } from '../../fireBase'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useState } from 'react'
import { openAIGeneration } from '../../generate'
import { upImageToCloudinary } from '../../cloudinary2'
import { randomWordAPI } from '../../randomWordAPI'

function CreateImage({fetchImages}) {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const imagesRef = firestore.collection('images');
  const contestsRef = firestore.collection('contests');
  const queryOfContests = contestsRef.orderBy('createdAt', 'desc');
  const contestsArray = useCollectionData(queryOfContests, {idField: 'id'});
  let currentContest;
  let latestContestDate;
  let latestContestExpDate;
/*   if (contestsArray[0]) console.log(contestsArray)
  if (contestsArray[0]) console.log(contestsArray[0][0].createdAt.toDate()) */
  
  if (contestsArray[0]) {
    currentContest = contestsArray[0][0]
    latestContestDate = contestsArray[0][0].createdAt.toDate()
    latestContestExpDate = moment(contestsArray[0][0].expirationDate)
    let currentDate = Date.now();
    console.log(moment((latestContestExpDate)))
    console.log(moment((latestContestExpDate)).fromNow())
    if(latestContestDate > currentDate) {
      console.log('date is in the past')
    } else console.log('selected date is in the future');
  
  }
  //let latestContestDate = 

  const createNewContest = async () => {
    if (latestContestExpDate < Date.now()) {
      let rand3Words = await randomWordAPI()
      let rand3WordsFlat = rand3Words.flat()
      console.log(rand3WordsFlat);
      await contestsRef.add({
        random3Words: rand3WordsFlat,
        expirationDate: firebase.firestore.Timestamp.now().toMillis() + 1.08e+7,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      console.log('new contest created successfully!')
    } else console.log('current contest still on game on');
  }
  createNewContest()
  
  const generateImage = async (event) => {
    event.preventDefault();
    // console.log(event.target.newPrompt.value)
    // openAIGeneration generates the image in OpenAI and returns its OpenAI URL
    let openAIURL = await openAIGeneration(event.target.newPrompt.value)
    let cloudinaryImgData = await upImageToCloudinary(openAIURL);
    console.log(cloudinaryImgData);
    //setUrl(url3);
    //console.log(url3);
    await imagesRef.add({
      usedPrompt: event.target.newPrompt.value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      url: cloudinaryImgData.secure_url,
      data: cloudinaryImgData
    })
    fetchImages()
    event.target.reset();
  };

  return (
    <>
      <div className='promptInput'>
        <h1 className='h1WC'> 
          Trinity generates 3 random words. <br></br>
          You create an AI-based image with a prompt (must include the words). <br></br> 
          The coolest image wins! <br></br>
        </h1>


        <div className='card2'>
          <div className='container2'>
            <h1> Current Contest </h1>
            {/* <h2>{currentContest.random3Words[0]} - {currentContest.random3Words[1]} - {currentContest.random3Words[2]}</h2> */}

           {/*  <h1>Contest will end {moment((latestContestExpDate)).fromNow()} </h1>
 */}


          </div>
          <form className='promptForm' onSubmit={generateImage}>
            <input name='newPrompt' placeholder='Write your promt here. Be creative.' type="text" required></input>
            <button>Create Image</button>
          </form>
        </div>
      </div>
    </>

  )
}
export default CreateImage;