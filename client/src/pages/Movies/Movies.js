import { Checkbox } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import SingleData from "../../components/SingleData/SingleData";
import "./Movies.css";

const Movies = () => {
    const [treadingContent, setTreadingContent] = useState([]);
    const [page, setPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState();
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [rating, setRating] = useState(5);
    const [sortBy, setSortBy] = useState(false);
    const [lable, setLable] = useState("");
    // eslint-disable-next-line

    const chunkArray = (array, chunkSize) => {
        const results = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            results.push(array.slice(i, i + chunkSize));
        }
        return results;
    };
    
    const renderContent = () => {
        if (isLoading && treadingContent) {
            const chunkedContent = chunkArray(treadingContent, 8);
            return chunkedContent.map((chunk, chunkIndex) => (
                <div key={`chunk-${chunkIndex}`} className="ListContentRow">
                    {chunk.map((n) => (
                        <SingleData key={n.id} {...n} mediaType="movie" />
                    ))}
                </div>
            ));
        } else {
            return <div></div>;
        }
    };
    
    // fetch Movies from TMDB
    const fetchMovieApi = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:4000/getMovies`
            );
            setTreadingContent(data);
            setNumOfPages(100);
            setIsLoading(true);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchSearchApi = async () => {
        console.log(lable)
        const SEARCH_API = `http://localhost:4000/getMoviesWithFilter/${rating}?sort=${sortBy}&searchString=${lable}`;
        const { data } = await axios.get(SEARCH_API);
        setTreadingContent(data);
        setNumOfPages(data.total_pages);
        setIsLoading(true);
    };

    const handleChange = (event) => {
        setRating(event.target.value);
    };

    const handleChangeSoryBy = () => {
        setSortBy(!sortBy);
    };

    const handleChangeLable = (event) => {
        setLable(event.target.value);
    }
    useEffect(() => {
        window.scroll(0, 0);
        fetchMovieApi();
        return () => {
            setTreadingContent();
        };
        // eslint-disable-next-line
    }, [page, isLoading]);

    useEffect(() => {
        fetchSearchApi();
    }, [rating, sortBy, lable]);

    return (
        <main className="all__movies">
            <div className="spacer"></div>
            <div className="filter">
                <div className="filter_holder">
                    <Checkbox onChange={handleChangeSoryBy} className="checkbox_filter"/>
                    <label>Sort By Rating</label>
                </div>
                <div className="filter_holder">
                    <select
                        name="rating"
                        id="rating"
                        value={rating}
                        onChange={handleChange}
                        className="filter_obj"
                    >
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                    </select>
                    <label htmlFor="rating">Rating above</label>
                </div>
                <div className="filter_holder">
                    <input onChange={handleChangeLable}></input>
                </div>
            </div>
            <div className="ListContent">
                <>{renderContent()}</>
            </div>
        </main>
    );
};

export default Movies;