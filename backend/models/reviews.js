const mongoose = require('mongoose')
const { RequiredString } = require('./common')
const Schema = mongoose.Schema
 
const review = new Schema({
    user_id: RequiredString,
    movie_id: RequiredString,
    review: RequiredString
},{ collection : 'reviews' })
 
module.exports = mongoose.model('review', review)