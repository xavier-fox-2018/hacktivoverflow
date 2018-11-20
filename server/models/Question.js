const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    question: {
        type: String,
        required: [true, 'question is empty']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    upVote: {
        type: Number,
        default: 0
    },
    downVote: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question