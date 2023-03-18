import "./review.css";
// import React, { useState, useContext } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Myloader from "react-spinners/ClipLoader";
import movieIcon from '../../images/MovieLogo.png'

const Review = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  let [color, setColor] = useState("grey");
  let autour = true;
  const movieTitle = useParams().movie;
  // let autour = props.autour;
  
  const fetchData = async () => {
    // try {
    //   const { data } = await axios.get(` 
    //   https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${process.env.REACT_APP_API_KEY}&page=1`);
    //   // eslint-disable-next-line
    //   setContent(data);
      setIsLoading(true);
    // } catch (error) {
    //   if (error.response && error.response.status === 404) {
    //     history.replace("/error");
    //   }
    // }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchData();
  }, [movieTitle]);

  return (
    <>
    {isLoading ? (
      <>
        <div>
          <div className="open__modal">

            <img
              className="poster__img"
              src="https://image.tmdb.org/t/p/w500/qi9r5xBgcc9KTxlOLjssEbDgO0J.jpg"
              alt=""
            />

            <div className="open__detailsPage">
                  <h3>Plane</h3>
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

                        <li>
                          {"After a heroic job of successfully landing his storm-damaged aircraft in a war zone, a fearless pilot finds himself between the agendas of multiple militias planning to take the plane and its passengers hostage."}
                        </li>

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
