const mongoose = require('mongoose')
const Schema = mongoose.Schema
 
const user = new Schema({
    id: String,
    first_name: String,
    last_name: String,
    email: String,
    is_admin: String
},{ collection : 'users' })
 
module.exports = mongoose.model('user', user)