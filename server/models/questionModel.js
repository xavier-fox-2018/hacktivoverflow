const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Question title is required'],
        unique: [true, 'Title is already exists']
    },
    description: {
        type: String,
        required: [true, 'Question description is required']
    },
    poster: {
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
    }],
    viewCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;