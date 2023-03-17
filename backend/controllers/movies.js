const Movie = require("../models/movies");

const getMovies = async () => {
    return await Movie.find(
      {},
      "id img_url name release_date rating discription trailer_url"
    );
};

const getTopRatedMovies = async () => {
    return await Movie.find(
      {},
      "id img_url name release_date rating description trailer_url"
    ).sort({ rating: -1 }); // Sort by rating in descending order
};

const getMovieById = async (id) => {
    return await Movie.findById(id);
};

const updateMovie = async (user) => {
    const filter = { _id: movie.id };
    const update = { ...movie };
    const updatedMovie = await Movie.findOneAndUpdate(filter, update, {
        new: true,
    });
    return updatedMovie;
};

const getMoviesGroupedByYear = async () => {
    return await Movie.aggregate([
        {
            $group: {
                _id: { $year: "$release_date" },
                movies: { $push: "$$ROOT" },
                reviewsCount: { $sum: "$reviews.length" }
            }
        },
        {
            $sort: { "reviewsCount": -1 }
        }
    ]);
};

const getAverageReviewRatingsByMovie = async () => {
    const mapFunction = function() {
        this.reviews.forEach(review => {
            emit(this._id, review.rating);
        });
    };

    const reduceFunction = function(movieId, ratings) {
        const sum = Array.sum(ratings);
        return sum / ratings.length;
    };

    return await Movie.mapReduce(mapFunction, reduceFunction, {
        out: { inline: 1 }
    });
};

const createMovie = async (movie) => {
    return await Movie.create(movie);
};


module.exports = {
    getMovies,
    getTopRatedMovies,
    getMovieById,
    updateMovie,
    getMoviesGroupedByYear,
    getAverageReviewRatingsByMovie,
    createMovie
}
