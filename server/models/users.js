require('dotenv').config()
const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect(process.env.MLAB, { useNewUrlParser: true })
mongoose.set('useCreateIndex', true)

const UserSchema = new Schema ({
  name: {
    type: String,
    required: [true, "Please insert your name"]
  },
  email: {
    type: String,
    required: [true, "Please input your email"],
    trim: true,
    lowercase: true,
    unique: [true, "This email is already exist"],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String
  },
  salt: {
    type: String
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User
