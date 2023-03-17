import "./review.css";
import React, { useState, useContext } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const Review = (props) => {
  let autour = true;
  // let autour = props.autour;
  
  return (
    <>
      <div className="review__main">
        <div className="review_row">
            <img className="movie_logo" src={props.logo}/>
            <div className="description">
                <h1 className="movie_title">{props.title}</h1>
                <h6 className="movie_description">{props.description}</h6>
            </div>
            <div className="autour_boxes">
              <div className="edit_review review_button"><ModeEditIcon></ModeEditIcon></div>
              <div className="delete_review review_button"><DeleteForeverIcon></DeleteForeverIcon></div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Review;
