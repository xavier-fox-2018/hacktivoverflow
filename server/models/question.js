const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const QuestionSchema = new Schema({
    title : String,
    content : String,
    date : {
        type : Date,
        default : new Date()
    },
    UserId : { type: Schema.Types.ObjectId, ref: 'User' },
    answer : [{ type: Schema.Types.ObjectId, ref: 'Answer' }]
}) 

module.exports =  Mongoose.model('Question', QuestionSchema)