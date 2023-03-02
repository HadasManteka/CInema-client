const mongoose = require('mongoose')
const { RequiredString, RequiredBool } = require('./common')
const Schema = mongoose.Schema

 
const user = new Schema({
    first_name: RequiredString,
    last_name: RequiredString,
    email: RequiredString,
    is_admin: RequiredBool
},{ collection : 'users' })
 
module.exports = mongoose.model('user', user)
user.id