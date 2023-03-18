import "./review.css";
import MainNav from "../../components/MainNavbar/MainNav";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Myloader from "react-spinners/ClipLoader";
import CheckIcon from '@mui/icons-material/Check';

const Review = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  let [color, setColor] = useState("grey");
  let autour = true;
  let newDescription = "";
  const movieTitle = useParams().movie;
  
  const fetchData = async () => {
      setIsLoading(true);
  };

  const saveDescription = () => {
    alert(newDescription);
    setEditMode(false);
  }
  
  useEffect(() => {
    window.scroll(0, 0);
    fetchData();
  }, [movieTitle]);

  return (
    <>
    <MainNav />
    {isLoading ? (
      <>
        <div>
          <div className="review_open__modal">
            <img
              className="poster__img"
              src="https://image.tmdb.org/t/p/w500/qi9r5xBgcc9KTxlOLjssEbDgO0J.jpg"
              alt=""
            />

            <div className="open__detailsPage">
                <h3>Plane
                {
                  (autour) ? 
                    (<b className="autour_buttons">
                      {
                        (!editMode) ?
                          ( <b>
                            <b className="review_button" onClick={ ()=> setEditMode(true) }><ModeEditIcon></ModeEditIcon></b>
                            <b className="review_button"><DeleteForeverIcon></DeleteForeverIcon></b>
                          </b>) :
                        (<b>
                          <b className="review_button"  onClick={saveDescription}><CheckIcon></CheckIcon></b>
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
                      "2023-01-12T00:00:00.000+00:00" ||
                      // content.release_date ||
                      "-----"
                    ).substring(0, 4)}{" "}
                    
                  </div>

                  <div className="other_lists">
                    <ul>
                      <li>
                        REVIEW BY: <b className="review_by">{"Noa"}</b>
                      </li>
                      
                      {
                        (!editMode) ?
                          ( <li className="review_description">
                            {"After a heroic job of successfully landing his storm-damaged aircraft in a war zone, a fearless pilot finds himself between the agendas of multiple militias planning to take the plane and its passengers hostage."}
                          </li>) :
                        (<div className="review_description">
                          <textarea className="description_input" type="text" onChange={(e) => {newDescription = (e.target.value)}}></textarea>
                          </div>) }

                      <li>
                        LAST UPDATED: <span>{"18/03/2023"}</span>
                      </li>
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