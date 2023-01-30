const Review = require("../models/revies");

const getReview = async () => {
    return await Review.find(
      {},
      "id user_id movie_id review"
    );
};

const getReviewById = async (id) => {
    return await Review.findById(id);
};

const getReviewByUserId = async (user_id) => {
    return await Review.find({ user_id });
};

const getReviewByMovieId = async (movie_id) => {
    return await Review.find({ movie_id });
};

const updateReview = async (user) => {
    const filter = { _id: review._id };
    const update = { ...review };
    const updatedReview = await Review.findOneAndUpdate(filter, update, {
        new: true,
    });
    return updatedReview;
};

module.exports = {
    getReview,
    getReviewById,
    getReviewByUserId,
    getReviewByMovieId,
    updateReview
}
