import axios from "axios";
import { useEffect, useState } from "react";
import SingleData from "../../components/SingleData/SingleData";
import "./Home.css";
import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import Navbar from "../../components/HomeNav/HomeNav";
import Myloader from "react-spinners/PuffLoader";

const Home = () => {
  const [allContent, setAllContent] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line
  let [color, setColor] = useState("grey");

  // const history = useHistory();
  const fetchPopularMovieApi = async () => {
    try {
      const { data } = await axios.get(` 
      http://localhost:4000/getMovies`);
      const filter = data.slice(0, 7);
      setAllContent(filter);
      setIsLoading(true);

      // eslint-disable-next-line
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTopRatedApi = async () => {
    try {
      const { data } = await axios.get(` 
      http://localhost:4000/getTopRatedMovies`);
      const alldata = data.results;
      const filter = data.slice(0, 7);
      setTopRated(filter);
      setIsLoading(true);

      // eslint-disable-next-line
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);

    fetchPopularMovieApi();
    fetchTopRatedApi();
    // eslint-disable-next-line
    return () => {
      setAllContent();
      // setTheTrailers();
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <div style={{ marginTop: "-10px" }} className="bg__home">
            <Navbar />
          </div>
          <div className="spacer"></div>
          <div className="TreadingHome3 pt-4">
            <div className="title__home">
              <div className="btn__home">
                <h6>
                  Movies On Air
                </h6>
              </div>
              <div className="view__more">
                <Link to="/all-movies" style={{ textDecoration: "none" }}>
                  <p>View more</p>
                </Link>
              </div>
            </div>

            <div className="ListContent2">
              {allContent &&
                allContent.map((n) => (
                  <SingleData key={n.id} {...n} mediaType="movie" />
                ))}
            </div>
          </div>
          <hr />
          <div className="TreadingHome3">
            <div className="title__home">
              <div className="btn__home" style={{ width: "125px" }}>
                <h6>
                  Top Rated
                </h6>
              </div>
              <div className="view__more">
                <Link to="/all-movies" style={{ textDecoration: "none" }}>
                  <p>View more</p>
                </Link>
              </div>
            </div>
            <div className="ListContent2">
              {topRated &&
                topRated.map((n) => (
                  <SingleData key={n.id} mediaType="movie" {...n} />
                ))}
            </div>
          </div>
        </>
      ) : (
        <div className="major" style={{ height: "600px" }}>
          <Myloader color={color} size={60} />
        </div>
      )}
    </>
  );
};

export default Home;
