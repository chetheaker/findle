import './style.css';

function ImageFeed (props) {

  return (
    <>
      <div className='list_title'>
        <h1>3 words:</h1>
      </div>
      <div className='list_scroll'>
        {props.children}
  {/*         {images && images.map((eachImage)=>(
          <ImageCard eachImage={eachImage} setImages={setImages} key={eachImage.data.asset_id} />
        ))} */}
      </div>
    </>
  )
}

export default ImageFeed;
