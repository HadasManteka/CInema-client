import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import SingleData from "../SingleData/SingleData";
import "./SinglePage.css";
import Myloader from "react-spinners/ClipLoader";
import { unavailable } from "../../api/config/DefaultImages";
import Review from "../../components/reviewBox/reviewBox";

import $ from "jquery";

const SinglePage = () => {
    $(function () {
        $(".ico").on("click", function () {
            $(".ico").toggleClass("press", 1000);
        });
    });
    const [content, setContent] = useState();
    const [similarMovies, setSimilarMovies] = useState();
    const [reviewBoxArray, setReviewBoxArray] = useState([]);
    const [video, setVideo] = useState();
    const [isLoading, setIsLoading] = useState(false);
    // eslint-disable-next-line
    const [color, setColor] = useState("grey");
    const history = useHistory();
    const { id, mediaType } = useParams();
    const handleClick = (url) => {
        if (url) {
            window.open(url, '_blank');
        }
    };
    
  const addReviewClick = () => {
    history.push({pathname: `/review/${id}/new`, state: {editMode: true}});
  };

    const fetchData = async () => {
        try {
            const { data } = await axios.get(`http://localhost:4000/getMovieById/${id}`);
            console.log(data)
            // eslint-disable-next-line
            setContent(data);
            setIsLoading(true);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                history.replace("/error");
            }
        }
    };

    const fetchVideos = async () => {
        try {
            const { data } = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`);
            setVideo(data.results[0].key);
            setIsLoading(true);
            // eslint-disable-next-line
        } catch (error) {
            console.error(error);
        }
    };
    
  const fetchReviews = async() => {
    try {
      console.log(id)
      const { data } = await axios.get(`http://localhost:4000/getReviewByMovieId/${id}`);
      data.map(async review => {
        await addMovieReviewToArray(review.movie_id, review);
      });

    } catch (error) {
      console.error(error);
    }
  }

    const addMovieReviewToArray = async(movieId, review) => {
        try {
        //   const { data } = await axios.get(`http://localhost:4000/getMovieById/${id}`);
        console.log(review)
          setReviewBoxArray(reviewBoxArray => [...reviewBoxArray, {description: review.review, logo: "", movieId: id, id, reviewId: review._id, authorId: review.user_id}]);
    
        } catch (error) {
          console.error(error);
        }
      }
      
  const getReviewAuthor = async(id) => {
    try {
      const { data } = await axios.get(`http://localhost:4000/getUserById/${id}`);
      return(data[0])
    } catch (error) {
      console.error(error);
    }
  }

    useEffect(() => {
        window.scroll(0, 0);

        fetchData();
        fetchVideos();
        fetchReviews();

        // eslint-disable-next-line
    }, [id, setContent]);
    return (
        <>
            {isLoading ? (
                <>
                    <div>
                        {content && (
                            <div
                                className="open__modal"
                                style={{
                                    backgroundImage: `url( ${content.img_url}`,
                                }}
                            >
                                <img
                                    className="poster__img"
                                    src={content.img_url}
                                    alt=""
                                />

                                <div className="open__detailsPage">
                                    <h3>{content.name}
                                        <b className="add_review_button" onClick={addReviewClick}>+</b>
                                    </h3>
                                    <div
                                        style={{
                                            zIndex: "1000",
                                            marginTop: "10px",
                                            textAlign: "left",
                                        }}
                                        className="year"
                                    >
                                        {(content.release_date).substring(0, 4)}{" "}
                                    </div>
                                    <div 
                                        style={{
                                            zIndex: "1000",
                                            marginTop: "5px",
                                            textAlign: "left",
                                        }}>

                                        <b className="vote_back">
                                            <b className="tmdb">TMDB:</b>
                                            <b className="vote_ave">{content.rating}</b>
                                        </b>
                                    </div>
                                    <h5
                                        style={{
                                            display: "flex",
                                            fontSize: "12px",
                                        }}
                                        className="genreList"
                                    >
                                    </h5>
                                    <div className="videopage" onClick={() => handleClick(content.trailer_url)}>

                                        <button
                                            className="youtube-button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleClick(content.trailer_url);
                                            }}
                                        >
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/7/75/YouTube_social_white_squircle_%282017%29.svg"
                                                alt="YouTube"
                                                width="30"
                                                height="30"
                                            />
                                        </button>
                                        <span>    Watch Trailer</span></div>
                                    <div className="overview">
                                        <p>{content.description}</p>
                                    </div>
                                    <div className="other_lists">
                                        <ul>
                                            <li>
                                                RELEASE DATE: <span>{content.release_date.substring(0, 10)}</span>
                                            </li>
                                        </ul>
                                        <div className="movieReviews">
                                        {
                                          reviewBoxArray.map((review) => {
                                            return <Review logo={review.img} title={review.title} description={review.description} movieId={review.movieId} reviewId={review.reviewId} authorId={review.authorId}></Review>
                                          })
                                        }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div className="load_app" style={{ height: "500px" }}>
                    <Myloader color={color} size={60} />
                    <p
                        className="pt-4 text-secondary text-loading"
                        style={{ textTransform: "capitalize", fontSize: "1rem" }}
                    >
                        Loading Please Wait...
                    </p>
                </div>
            )}
        </>
    );
};

export default SinglePage;