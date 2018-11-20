const {generateSalt, hashPassword, compare} = require('../helpers/helper')
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'user is empty']
    },
    email: {
        type: String,
        required: [true, 'email is empty']
    },
    password: {
        type: String,
        required: [true, 'password is empty']
    },
    image: {
        type: String,
        default: null
    }
}, {
    timestamps: true
})

userSchema.pre('save', function(next){
    console.log('test save', this.password)
    let salt = generateSalt(10)
    console.log(salt, '===salt===')
    let psswd = hashPassword(this.password, salt)
    console.log(psswd, '===passsssss======')
    this.password = psswd
    console.log(this, '===this ===')
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User