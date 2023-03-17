import "./review.css";
// import React, { useState, useContext } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Myloader from "react-spinners/ClipLoader";

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
            <h1 className="this">{movieTitle}</h1>
            {movieTitle}
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
