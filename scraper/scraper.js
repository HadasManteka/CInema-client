var api_key='b22a581397c355caa3bd3b728deaf018';

const axios = require('axios');
const Movie = require("./models/movies");

const mongoose = require("mongoose");
const { MongoBulkWriteError } = require('mongodb');
mongoose.connect("mongodb+srv://movies-atlas-db:yjP8NyM9kh4GX7H@cluster0.kdvj33y.mongodb.net/?retryWrites=true&w=majority");

[ ...Array(100) ].forEach((_, i) => axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=${++i}`)
  .then((response) => {
    response.data.results.forEach((movieData) => {
        
        axios.get(`https://api.themoviedb.org/3/movie/${movieData.id}/videos?api_key=${api_key}&language=en-US`)
            .then((trailerResponse) => {
                trailerResponse.data.results.forEach((trailerData) => {
                    if (trailerData.name.toLowerCase() == "official trailer") {
                        const newMovie = new Movie({
                            img_url: `https://image.tmdb.org/t/p/w500${movieData.poster_path}`,
                            name: movieData.title,
                            release_date: new Date(movieData.release_date),
                            rating: movieData.vote_average.toString(),
                            description: movieData.overview,
                            trailer_url: `https://www.youtube.com/watch?v=${trailerData.key}`
                        });

                        newMovie.save()
                            .then(() => {console.log(`New movie "${newMovie.name}" added successfully!`);})
                            .catch((err) => {console.error(err);});

                    }
                });
            })
            .catch((error) => console.log(error));
    });
  })
  .catch((error) => {
    console.log(error);
  }));
