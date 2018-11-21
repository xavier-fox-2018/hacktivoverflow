var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var questionSchema = new Schema({
    title: String,
    content: String,
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    downvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    shares: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    anom: String,
    createdAt: Date,
    updatedAt: Date
})
var Question = mongoose.model('Question', questionSchema)

module.exports = Question