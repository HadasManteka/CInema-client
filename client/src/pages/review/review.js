import "./review.css";
import axios from "axios";
import MainNav from "../../components/MainNavbar/MainNav";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import Myloader from "react-spinners/ClipLoader";
import CheckIcon from '@mui/icons-material/Check';
import { AuthContext } from "../../components/context/UserContext";

const Review = (props) => {

  const [content, setContent] = useState();
  const [currentReview, setCurrentReview] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isNewReview, setIsNewReview] = useState(false);
  const [reviewAuthor, setReviewAuthor] = useState({first_name: "Noa", last_name: "Bouba"});
  const {getCurrentUser} = useContext(AuthContext);
  let [color, setColor] = useState("grey");
  let newDescription = "";
  const movieId = useParams().movieId;
  const reviewId = useParams().reviewId;
  const history = useHistory();
  // let isNewReview = false;
  
  const fetchData = async () => {
    try {
        const { data } = await axios.get(`http://localhost:4000/getMovieById/${movieId}`);
        console.log(data)
        setContent(data);
        await getReviewDetails();
        setIsLoading(true);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            history.replace("/error");
        }
    }
  };

  const getReviewDetails = async () => {
    if(reviewId === "new") {
      setIsNewReview(true);
      setEditMode(true);
      setReviewAuthor({first_name: "Noa", last_name: "Bouba"});
      // setReviewAuthor(getCurrentUser());
    } else {
      try {
        const { data } = await axios.get(`http://localhost:4000/getReviewById/${reviewId}`);
        console.log(data)
        setCurrentReview(data);
        await getAuthorDetails();
      } catch (error) {
        if (error.response && error.response.status === 404) {
            history.replace("/error");
        }
      }
    }
  }

  const getAuthorDetails = async () => {
    if(reviewId != "new") {
      try {
        const { data } = await axios.get(`http://localhost:4000/getUserById/${currentReview.user_id}`);
        console.log(data)
        setReviewAuthor(data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
            history.replace("/error");
        }
      }
    }
  }

  const saveReview = async () => {
    setEditMode(false);

    try {
      (isNewReview) ?
        await axios.post("http://localhost:4000/createReview",{review: {user_id:"63da547b1a4bd6054082faf2", movie_id: movieId, review: newDescription}} ).then(res => {
          console.log(res);
          history.push(`/review/${movieId}/${res.data._id}`);
          window.location.reload(false);
        }) : 
        await axios.put(`http://localhost:4000/updateReview/${reviewId}`,{review: {user_id:"63da547b1a4bd6054082faf2", movie_id: movieId, review: newDescription}} ).then(res => {
          setCurrentReview(res.data);
          console.log(res);
        })
    } catch (error) {
      if (error.response && error.response.status === 404) {
          history.replace("/error");
      }
    }
  }
  
  useEffect(async () => {
    window.scroll(0, 0);
    await fetchData();
  }, []);

  return (
    <>
    <MainNav />
    {isLoading ? (
      <>
        <div>
          <div className="review_open__modal">
            <img
              className="poster__img"
              src={content.img_url}
              alt=""
            />

            <div className="open__detailsPage">
                <h3>{content.name}
                {
                  (true) ? 
                  // (getCurrentUser().id === reviewAuthor.id) ? 
                    (<b className="autour_buttons">
                      {
                        (!editMode) ?
                          ( <b>
                            <b className="review_button" onClick={ ()=> setEditMode(true) }><ModeEditIcon></ModeEditIcon></b>
                            <b className="review_button"><DeleteForeverIcon></DeleteForeverIcon></b>
                          </b>) :
                        (<b>
                          <b className="review_button"  onClick={saveReview}><CheckIcon></CheckIcon></b>
                        </b>) }
                      </b>) :
                    (<b></b>) 
                }</h3>
                
                  <div
                    style={{
                      zIndex: "1000",
                      textAlign: "left",
                    }}
                    className="year"
                  >
                    {(
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}{" "}
                    
                  </div>

                  <div className="other_lists">
                    <ul>
                      <li>
                        REVIEW BY: <b className="review_by">{reviewAuthor.first_name + " " + reviewAuthor.last_name}</b>
                      </li>
                      
                      {
                        (!editMode) ?
                          ( <li className="review_description">
                            {currentReview.review}
                          </li>) :
                        (<div className="review_description">
                          <textarea className="description_input" type="text" onChange={(e) => {newDescription = (e.target.value)}}></textarea>
                          </div>) }                      
                    </ul>
                  </div>
                </div>

          </div>
        </div>
      </> ) : (<div className="load_app" style={{ height: "500px" }}>
          <Myloader color={color} size={60} />
          <p
            className="pt-4 text-secondary text-loading"
            style={{ textTransform: "capitalize", fontSize: "1rem" }}
          >
            Loading Please Wait...
          </p>
        </div>)
    }
    </>
  );
};

export default Review;