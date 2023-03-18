import "./userProfile.css";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import MainNav from "../../components/MainNavbar/MainNav";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../components/context/UserContext";
import Review from "../../components/reviewBox/reviewBox";
import Myloader from "react-spinners/PuffLoader";

const UserProfile = () => {
  // const {user} = useContext(AuthContext);
  const [user, setUser] = useState({email: "noa@gmail.com", password: "123", first_name: "noa", last_name: "bouba", id: "63da547b1a4bd6054082faf2"});
  const [allUserReviews, setAllUserReviews] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  let [color, setColor] = useState("grey");
  let newFirstName = user.first_name;
  let newLastName = user.last_name;
  let newEmail = user.email;

  // const getUser = () => {
  //   // return user;
  //   return {email: "noa@gmail.com", password: "123", first_name: "noa", last_name: "bouba", id: ""}
  // }
  
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

  const onSaveUser = async () => {
    setEditMode(false);
    alert(newFirstName)

    try {
        await axios.put(`http://localhost:4000/updateUser/${user.id}`,{first_name:newFirstName, last_name: newLastName, email: newEmail, is_admin: user.is_admin}).then(res => {
          setUser(res.data);
          console.log(res);
        })
    } catch (error) {
      if (error.response && error.response.status === 404) {
          history.replace("/error");
      }
    }
  }

  const history = useHistory()
  
  const navigateHome = () => {
    history.push("/");
  };

  useEffect(async () => {
    window.scroll(0, 0);

    await fetchReviews();
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
          {
            (!editMode) ? 
              (<div>
                <h1 className="userName">{user.first_name + " " + user.last_name}</h1>
                <h6 className="userEmail">{user.email}</h6>
                <button className="editButton" onClick={ ()=> setEditMode(true) }>Edit User</button>
              </div>) :
              (<div>
                <textarea rows={1} className="userFirstName_edit" defaultValue={user.first_name} onChange={(e) => {newFirstName = (e.target.value)}}></textarea>
                <textarea rows={1} className="userLastName_edit" defaultValue={user.last_name} onChange={(e) => {newLastName = (e.target.value)}}></textarea>
                <textarea className="userEmail_edit" defaultValue={user.email} onChange={(e) => {newEmail = (e.target.value)}}></textarea>
                <button className="editButton" onClick={onSaveUser}>Save User</button>
              </div>) 
          }
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
