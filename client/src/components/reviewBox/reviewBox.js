import "./reviewBox.css";
import axios from "axios";
import React from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useHistory } from "react-router-dom";

const ReviewBox = (props) => {
  let autour = true; 

  const history = useHistory()

  const navigateReview = (editMode) => {
    history.push({pathname: `/review/${props.movieId}/${props.reviewId}`, state: {editMode: editMode}});
  }
  
  const deleteReview = async() => {
    try {
      await axios.post("http://localhost:4000/deleteReview",{review: props.reviewId} ).then(res => {
        console.log(res);
        window.location.reload(false);
      })
    } catch (error) {
      if (error.response && error.response.status === 404) {
        history.replace("/error");
      }
    }
  }
  
  return (
    <>
      <div className="review__main">
        <div className="review_row">
            <img className="movie_logo" src={props.logo} onClick={() => navigateReview(false)}/>
            <div className="description" onClick={() => navigateReview(false)}>
                <h1 className="movie_title">{props.title}</h1>
                <h6 className="movie_description">{props.description}</h6>
            </div>
            {
              (autour) ? 
                (<div className="autour_boxes">
                  <div className="review_box_button" onClick={() => navigateReview(true)}><ModeEditIcon></ModeEditIcon></div>
                  <div className="review_box_button" onClick={deleteReview}><DeleteForeverIcon></DeleteForeverIcon></div>
                </div>) :
                (<div></div>) 
            }
            
        </div>
      </div>
    </>
  );
};

export default ReviewBox;
