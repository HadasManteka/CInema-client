const mongoose = require('mongoose')
const Schema = mongoose.Schema
 
const review = new Schema({
    id: String,
    user_id: String,
    movie_id: String,
    review: String
},{ collection : 'reviews' })
 
module.exports = mongoose.model('review', review)