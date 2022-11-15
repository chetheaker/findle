import Axios from 'axios'

export const upload2Cloudinary = async (urlFromOpenAIParam) => {
  const url = "https://api.cloudinary.com/v1_1/ds7c3iooy/image/upload";
  let cloudinaryImgData = {};
 
  const formData = new FormData();
  formData.append('file', urlFromOpenAIParam);
  formData.append('upload_preset', 'xywexqzm')

  await Axios.post(url, formData).then((response) => {

    cloudinaryImgData = response.data
  })


  return cloudinaryImgData;
}





/* function Cloudinary2() {
  const [imageSelected, setImageSelected] = useState('');
  return (
    <div>
      <input
      type='file' onChange={(event) => {
        setImageSelected(event.target.files[0])
      }}
      />
      <button onClick={upImageToCloudinary}> Upload Image </button>

    </div>
  );
} */

// export default Cloudinary2;