const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const UserSchema = new Schema({
    username : String,
    email : String,
    password : String,
})

module.exports =  Mongoose.model('User', UserSchema)