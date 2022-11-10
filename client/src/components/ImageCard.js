// import moment from "moment";



function ImageCard ({eachImage, setImages}){
 
  return (
    <div className='image'>
      <div className='container'>
        <p>{eachImage.usedPrompt}</p>
        <img alt={eachImage.usedPrompt} src={eachImage.url} ></img>
      {/*   <p>Created On: {moment(topic.createdAt.toDate().toString()).format("MMM Do YY")}</p> */}
      </div>
    </div>
  ) 
}


export default ImageCard;