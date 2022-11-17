import './style.css';

function ImageFeed (props) {


  return (
    <>
      <div className='feedContainer'>
        <div className='word3Container'>
                  <div className='word1'>{ props.contest.random2Words[0] }</div>
                  <div className='word2'>{ props.contest.random2Words[1] }</div>
                </div>      
        <div className='list_scroll'>
          {props.children}
        </div>
      </div>
    </>
  )
}

export default ImageFeed;
