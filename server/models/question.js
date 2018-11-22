const mongoose = require('mongoose')
const Answer = require('./answer.js')
const User = require('./user.js')

const Schema = mongoose.Schema
const questionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    answers: [{
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    op: { //Original Poster
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    votes: [{
        userId: {
                type: Schema.Types.ObjectId,
                ref: 'User'
        },
        vote: {
            type: Number,
        }
    }],
    createdDate: {
        type: String
    }
})

const Question = mongoose.model('Question', questionSchema, 'Questions')

module.exports = Question