const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const commentScheme = new Schema({
    user_comment: String,
    user_id: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    question_id: {
        type: Schema.Types.ObjectId, 
        ref: 'Question'
    },
    like: Number
}, {
    timestamps: true
});

const Comment = mongoose.model('Comment', commentScheme)
module.exports = Comment