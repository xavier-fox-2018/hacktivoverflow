const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const AnswerSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    date : {
        type : Date,
        default : new Date()
    },
    //UserId : { type: Schema.Types.ObjectId, ref: 'User' },
    
})

module.exports =  Mongoose.model('Answer', AnswerSchema)