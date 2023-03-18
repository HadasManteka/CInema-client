import "./reviewBox.css";
import React, { useState, useContext } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useHistory } from "react-router-dom";

const ReviewBox = (props) => {
  let autour = true; 
  // let autour = props.autour;

  const history = useHistory()

  const navigateReview = () => {
    history.push("/review/best movie/123");
  }
  
  return (
    <>
      <div className="review__main">
        <div className="review_row" onClick={navigateReview}>
            <img className="movie_logo" src={props.logo}/>
            <div className="description">
                <h1 className="movie_title">{props.title}</h1>
                <h6 className="movie_description">{props.description}</h6>
            </div>
            {
              (autour) ? 
                (<div className="autour_boxes">
                  <div className="review_box_button"><ModeEditIcon></ModeEditIcon></div>
                  <div className="review_box_button"><DeleteForeverIcon></DeleteForeverIcon></div>
                </div>) :
                (<div></div>) 
            }
            
        </div>
      </div>
    </>
  );
};

export default ReviewBox;
