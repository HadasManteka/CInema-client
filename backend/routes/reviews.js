var express = require('express');
const mongoose = require('mongoose');
const ReviewController = require('../controllers/reviews');
var router = express.Router();
var connectionString = "mongodb://mongo:secret@localhost:27017/";

mongoose.connect(connectionString)

router.get('/getReviews', (req, res) => {
    ReviewController.getReview().then(reviews => {
        res.send(reviews);
    }).catch(error => {
        res.status(500).send({error: error.message});
    });
});

router.get('/getReviewById/:id', (req, res) => {
    const id = req.params.id;
    ReviewController.getReviewById(id).then(review => {
        res.send(review);
    }).catch(error => {
        res.status(500).send({error: error.message});
    });
});

router.get('/getReviewByUserId/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    ReviewController.getReviewByUserId(user_id).then(reviews => {
        res.send(reviews);
    }).catch(error => {
        res.status(500).send({error: error.message});
    });
});

router.get('/getReviewByMovieId/:movie_id', (req, res) => {
    const movie_id = req.params.movie_id;
    ReviewController.getReviewByMovieId(movie_id).then(reviews => {
        res.send(reviews);
    }).catch(error => {
        res.status(500).send({error: error.message});
    });
});

router.put('/updateReview/:id', (req, res) => {
    const id = req.params.id;
    const review = req.body;
    review._id = id;
    ReviewController.updateReview(review).then(updatedReview => {
        res.send(updatedReview);
    }).catch(error => {
        res.status(500).send({error: error.message});
    });
});

module.exports = router;
