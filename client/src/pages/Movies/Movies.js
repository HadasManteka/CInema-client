import axios from "axios";
import { useEffect, useState } from "react";
import SingleData from "../../components/SingleData/SingleData";
import "./Movies.css";

const Movies = () => {
    const [treadingContent, setTreadingContent] = useState([]);
    const [page, setPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState();
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    // eslint-disable-next-line
    const [color, setColor] = useState("grey");

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

    // const fetchSearchApi = async () => {
    //     if (searchTerm) {
    //         const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchTerm}&page=${page}&sort_by=popularity.desc&page=2`;
    //         const { data } = await axios.get(SEARCH_API);
    //         setTreadingContent(data.results);
    //         setNumOfPages(data.total_pages);
    //         setIsLoading(true);
    //     }
    // };

    useEffect(() => {
        window.scroll(0, 0);
        if (searchTerm) {
            // fetchSearchApi();
        } else {
            fetchMovieApi();
        }
        return () => {
            setTreadingContent();
        };
        // eslint-disable-next-line
    }, [page, isLoading]);

    return (
        <main className="all__movies">
            <div className="spacer"></div>
            <div className="ListContent">
                <>{renderContent()}</>
            </div>
        </main>
    );
};

export default Movies;