var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jawabanSchema = new Schema({
  isi: {
    type : String,
    required : [true, 'Sorry, jawabn must be filled!']
  } ,
  user:{ type : Schema.Types.ObjectId, ref: 'User'},
  upvote : [{type: Schema.Types.ObjectId, ref: 'User'}],
  downvote : [{type: Schema.Types.ObjectId, ref: 'User'}]
},{ timestamps:true });

const Jawaban = mongoose.model('Jawaban', jawabanSchema)

module.exports =  Jawaban

