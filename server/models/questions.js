const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    category : {
        type: Schema.Types.ObjectId, 
        ref: 'Category' 
    },
    author: {
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
    answers: [{
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    }]
}, {
    timestamps: true
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question