const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
    detail: String,
    questionID: { type: Schema.Types.ObjectId, ref: 'Question' },
    userID: { type: Schema.Types.ObjectId, ref: 'User' },
    upvote: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    downvote: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {timestamps: true}) 

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer;