const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const encryptPassword = require('../helpers/encryptPassword.js');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required to register your account'],
        unique: [true, 'This username is already exists']
    },
    email: {
        type: String,
        required: [true, 'Email is required to register your account'],
        unique: [true, 'This email is already exists']
    },
    password: {
        type: String,
        required: [true, 'Password is required to register your account'],
        minlength: [4, 'Minimum required characters for password is 4'],
        maxlength: [15, 'Maximum characters allowed for password is 10']
    },
    viaThirdParty: {
        type: Boolean,
        default: false
    },
    achievements: [{
        type: Schema.Types.ObjectId,
        ref: 'Achievement'
    }]
}, {
    timestamps: true
});

userSchema.pre('save', function(next) {
    this.password = encryptPassword(this.password);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;