const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    comment: {
        type: String,
        required: [true, 'comment is empty']
    },
    question: {
        type: String,
        required: [true, 'questionId is empty']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    upVote:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    downVote: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
}, {
    timestamps: true
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment