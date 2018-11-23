const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const questionSchema = new Schema({ 
    title: String,
    detail: String,
    userID: { type: Schema.Types.ObjectId, ref: 'User' },
    upvote: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    downvote: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {timestamps: true}) 

const Question = mongoose.model('Question', questionSchema)

module.exports = Question;