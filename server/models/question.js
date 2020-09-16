var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var questionSchema = new Schema({
  title: { 
    type : String,
    required : [true, 'Title cannot be empty'],
  },
  content: { 
    type : String,
    required : [true, 'Content cannot be empty'] 
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  timeStamp: {
    type: Date,
    default: new Date()
  },
  upvotes: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
  }],
  downvotes: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
  }]
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question