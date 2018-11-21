var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let userSchema = new Schema ({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    picture: String,
    following: [{type: Schema.Types.ObjectId, ref: 'User'}],
    interest: String
})

let User = mongoose.model('User', userSchema)

module.exports = User