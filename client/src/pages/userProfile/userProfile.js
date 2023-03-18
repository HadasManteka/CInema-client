import "./userProfile.css";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import MainNav from "../../components/MainNavbar/MainNav";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../components/context/UserContext";
import Review from "../../components/reviewBox/reviewBox";
import Myloader from "react-spinners/PuffLoader";

const UserProfile = () => {
    const {user} = useContext(AuthContext);
    const [allUserReviews, setAllUserReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let [color, setColor] = useState("grey");
  
    const getUser = () => {
      // return user;
      return {email: "noa@gmail.com", password: "123", name: "noa"}
    }
    
    const fetchReviews = async() => {      
      try {
        const { data } = await axios.get(` 
        http://localhost:4000/getMovies`);
        console.log(data.slice(0, 7));
        const filter = data.slice(0, 7);
        setAllUserReviews(filter);
        setIsLoading(false);

      } catch (error) {
        console.error(error);
      }
    }

  const history = useHistory()
  
  const navigateHome = () => {
    history.push("/");
  };

  useEffect(() => {
    window.scroll(0, 0);

    fetchReviews();
    return () => {
      setAllUserReviews();
    };
  }, []);

  return (
    <>
    <MainNav />
    
    {isLoading ? (
        <div className="major" style={{ height: "600px" }}>
          <Myloader color={color} size={60} />
        </div> ) : 
      (<div className="user_profile__main">
        <div className="user_details">
          <h1 className="userName">{getUser().name}</h1>
          <h6 className="userEmail">{getUser().email}</h6>
          <button className="editButton">Edit User</button>
        </div>
        <div className="reviews">
          {
            allUserReviews.map((review) => {
              return <Review logo={review.img_url} title={review.name} description={review.release_date}></Review>
            })
          }
          
        </div>
      </div>)}
    </>
  );
};

export default UserProfile;
