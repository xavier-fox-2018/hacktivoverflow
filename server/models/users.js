var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var { isEmail } = require('validator');
var Helper = require('../helpers/index.js')
var userSchema = new Schema({
    name: String,
    email: {
        type: String,
        validate: [{
            isAsync: true,
            validator: function(v, cb) {
                User.findOne({
                    email: v
                }, function(err, data) {
                    cb(!data)
                })
            },
            message: 'Email is already taken'
        }, {
            validator: isEmail,
            message: 'Invalid Email Format',
            error_code: 'INVALID_EMAIL'
        }]
    },
    password: {
        type: String,
        required: [true, 'EMPTY_STRING']
    },
    oauth: Boolean,
    image: { type: String, default: 'http://semantic-ui-forest.com/static/kitchen-sink/images/wireframe/square-image.png' },
    salt: String
})
userSchema.pre('save', function(next) {
    let obj = Helper.cryptPass(this.password)
    this.password = obj.pass
    this.salt = obj.salt
    next();
});
var User = mongoose.model('User', userSchema)

module.exports = User