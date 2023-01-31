const Movie = require("../models/movies");

const getMovies = async () => {
    return await Movie.find(
      {},
      "id img_url name release_date rating discription trailer_url"
    );
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
                id: { year: "$release_date" },
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

module.exports = {
    getMovies,
    getMovieById,
    updateMovie,
    getMoviesGroupedByYear,
    getAverageReviewRatingsByMovie
}
