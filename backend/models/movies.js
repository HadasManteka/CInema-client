const mongoose = require('mongoose')
const Schema = mongoose.Schema
 
const movie = new Schema({
    id: String,
    img_url: String,
    name: String,
    release_date: String,
    rating: String,
    discription: String,
    trailer_url: String
},{ collection : 'movies' })
 
module.exports = mongoose.model('movie', movie)