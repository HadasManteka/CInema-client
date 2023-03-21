const mongoose = require('mongoose')
const { RequiredString, RequiredDate } = require('./common')
const Schema = mongoose.Schema
 
const movie = new Schema({
    img_url: RequiredString,
    name: RequiredString,
    release_date: RequiredDate,
    rating: RequiredString,
    description: String,
    trailer_url: String
},{ collection : 'movies' })
 
module.exports = mongoose.model('movie', movie)