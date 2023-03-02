import "./review.css";
import React, { useState, useContext } from "react";

const Review = (props) => {
  
  return (
    <>
      <div className="review__main">
        <div className="review_row">
            <img className="movie_logo" src={props.logo}/>
            <div className="description">
                <h1 className="movie_title">{props.title}</h1>
                <h6 className="movie_description">{props.description}</h6>
            </div>
        </div>
      </div>
    </>
  );
};

export default Review;
