const mongoose = require('mongoose')

const answerSchema  = mongoose.Schema({
    body: {
        type: String,
        minglength: 10
    },
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    questionId: {type: mongoose.Schema.Types.ObjectId, ref: 'Question'},
    upVoters : [{type:mongoose.Schema.Types.ObjectId, ref: 'User'}],
    downVoters: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    accepted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer