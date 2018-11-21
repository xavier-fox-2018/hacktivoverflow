const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is empty']
    },
    description: {
        type: String,
        required: [true, 'desc is empty']
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

const Question = mongoose.model('Question', questionSchema)

module.exports = Question