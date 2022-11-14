import './style.css';

function ImageFeed (props) {

  return (
    <>
      <div className='list_title'>
        <h1>ALL IMAGES GALLERY:</h1>
      </div>
      <div className='list_scroll'>
        {props.children}
      </div>
    </>
  )
}

export default ImageFeed;
