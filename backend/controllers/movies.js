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

module.exports = {
    getMovies,
    getMovieById,
    updateMovie
}
