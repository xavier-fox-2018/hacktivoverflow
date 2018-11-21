const   mongoose = require('mongoose'),
        Schema = mongoose.Schema;

const questionSchema = new mongoose.Schema({
    UserId: { type:Schema.Types.ObjectId, ref: 'User'},
    title: {type:String, required: true},
    description: {type:String, required: true},
    upvote: [{ type:Schema.Types.ObjectId, ref: 'User'}],
    downvote: [{ type:Schema.Types.ObjectId, ref: 'User'}],
    answer:[{ 
        UserId: { type:Schema.Types.ObjectId, ref: 'User'},
        description: {type:String, required: true},
        upvote: [{ type:Schema.Types.ObjectId, ref: 'User'}],
        downvote: [{ type:Schema.Types.ObjectId, ref: 'User'}]
    }],
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question