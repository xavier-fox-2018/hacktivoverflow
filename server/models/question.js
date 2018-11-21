const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const questionScheme = new Schema({
    title: {
        type: String,
        unique: true
    },
    description: String,
    author: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    like: Number,
    comment_list: [{
        type: Schema.Types.ObjectId, 
        ref: 'Comment'
    }]   
}, {
    timestamps: true
});

const Question = mongoose.model('Question', questionScheme)
module.exports = Question