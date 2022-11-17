import Axios from 'axios';

export const upload2Cloudinary = async (aiUrl: string) => {
  const url: string = process.env.REACT_APP_CLOUDINARY_URL;
  let cloudinaryImgData = {};

  const formData = new FormData();
  formData.append('file', aiUrl);
  formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_KEY);

  await Axios.post(url, formData)
    .then((response) => {
      cloudinaryImgData = response.data;
    })
    .catch((e) => console.log('error', e));

  return cloudinaryImgData;
};

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
