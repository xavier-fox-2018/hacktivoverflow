var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var answerSchema = new Schema({
    content: String,
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    downvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    shares: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    question_id: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    createdAt: Date,
    updatedAt: Date
})
var Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer