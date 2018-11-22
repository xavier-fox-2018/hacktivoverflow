const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    upVoters : [{type:mongoose.Schema.Types.ObjectId, ref: 'User'}],
    downVoters: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    answers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}],
    status: {
        type: String,
        default: 'open'
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
    body: {
        type: String,
        minlength: 10
    }
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question