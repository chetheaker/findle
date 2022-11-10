import { firestore } from '../fireBase'
import firebase from 'firebase/compat/app';
// import { storage } from '../fireBase'
import 'firebase/compat/firestore';
import { useState } from 'react'
//import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { openAIGeneration } from '../generate'
import { upImageToCloudinary } from '../cloudinary2'



function CreateImage() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const imagesRef = firestore.collection('images')

  const generateImage = async (event) => {
    event.preventDefault();
    console.log(event.target.newPrompt.value)

    // openAIGeneration generates the image in OpenAI and returns its OpenAI URL
    let openAIURL = await openAIGeneration(event.target.newPrompt.value)

    //TODO save the new image in cloudinary, and get the cloudinary URL to save it to firebase
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
    event.target.reset();


  };

  
/*   const addImage = async (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const imageRef = ref(storage, '2');
    uploadBytes(imageRef, image).then(() =>{
      getDownloadURL(imageRef).then((url) => {
        setUrl(url)
      }).catch(error=> {
        console.log('error getting the image url: ' + error)
      })
      setImage(null);
    }).catch(error=> {
      console.log('error uploading the image: ' + error)
    })
  } */

  return (
    <>
    <form onSubmit={generateImage}>
      {/* <input type="file" onChange={addImage}></input> */}
      <input name='newPrompt' placeholder='write your promt here' type="text" required></input>
      <button>Create Image</button>
    </form>

{/*     <div>
      <img src={url} alt='uploadedImage'></img>
    </div> */}
    </>

  )
}
export default CreateImage;