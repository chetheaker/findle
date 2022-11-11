// import moment from "moment";
import './style.css';

function ImageCard (props){
 
  return (
    <div key={props.image.data.asset_id} className='movie_container'>
        <img className='movie_img' alt={props.usedPrompt} src={props.image.url} ></img>
        <h3 className="movie_headline">"{props.image.usedPrompt}"</h3>
      {/*   <p>Created On: {moment(topic.createdAt.toDate().toString()).format("MMM Do YY")}</p> */}
    </div>
  ) 
}


export default ImageCard;