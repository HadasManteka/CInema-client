import "./userProfile.css";
import React, { useState, useContext } from "react";
import MainNav from "../../components/MainNavbar/MainNav";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../components/context/UserContext";
import Review from "../../components/reviewBox/reviewBox";
import movieIcon from '../../images/MovieLogo.png'

const UserProfile = () => {
    const {user} = useContext(AuthContext);
    
    const getUser = () => {
      // return user;
      return {email: "noa@gmail.com", password: "123", name: "noa"}
    }
    
    // const {reviews} = useContext();
    
    const getReviews = () => {
      // return reviews;
      return [{logo: movieIcon, title: "best movie", description: "amazing movie"},{logo: movieIcon, title: "ok movie", description: "was ok"},
      {logo: movieIcon, title: "more movie", description: "lalsldskodspjihiug,dsvkbib  movie"}, {logo: movieIcon, title: "frozen", description: "ttttttttttttttttttttttttttttttttttttttttttttttttttttttt\newgduygiuytfyitdfytifiyt"}, {logo: movieIcon, title: "frozen", description: "ttttttttttttttttttttttttttttttttttttttttttttttttttttttt\newgduygiuytfyitdfytifiyt"},
      {logo: movieIcon, title: "best movie", description: "amazing movie"},{logo: movieIcon, title: "ok movie", description: "was ok"},
      {logo: movieIcon, title: "more movie", description: "lalsldskodspjihiug,dsvkbib  movie"}, {logo: movieIcon, title: "frozen", description: "ttttttttttttttttttttttttttttttttttttttttttttttttttttttt\newgduygiuytfyitdfytifiyt"}, {logo: movieIcon, title: "frozen", description: "ttttttttttttttttttttttttttttttttttttttttttttttttttttttt\newgduygiuytfyitdfytifiyt"}]
    }

  const history = useHistory()
  
  const navigateHome = () => {
    history.push("/");
  };

  return (
    <>
    <MainNav />
      <div className="user_profile__main">
        <div className="user_details">
          <h1 className="userName">{getUser().name}</h1>
          <h6 className="userEmail">{getUser().email}</h6>
          <button className="editButton">Edit User</button>
        </div>
        <div className="reviews">
          {
            getReviews().map((review) => {
              return <Review logo={review.logo} title={review.title} description={review.description}></Review>
            })
          }
          
        </div>
      </div>
    </>
  );
};

export default UserProfile;
