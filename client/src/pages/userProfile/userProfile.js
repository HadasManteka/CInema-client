import "./userProfile.css";
import React, { useState, useContext } from "react";
import MainNav from "../../components/MainNavbar/MainNav";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../components/context/UserContext";

const UserProfile = () => {
    const {user} = useContext(AuthContext);
    
    const getUser = () => {
      // return user;
      return {email: "noa@gmail.com", password: "123", name: "noa"}
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
      </div>
    </>
  );
};

export default UserProfile;
