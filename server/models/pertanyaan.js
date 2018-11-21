var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pertanyaanSchema = new Schema({
  title: {
    type : String,
    required : [true, 'Sorry!, title must be filled']
  } ,
  description : {
    type : String,
    required : [true, 'Sorry!, description must be filled']
  },
  user : {type: Schema.Types.ObjectId, ref: 'User'},
  upvote : [{type: Schema.Types.ObjectId, ref: 'User'}],
  downvote : [{type: Schema.Types.ObjectId, ref: 'User'}],
  jawaban : [{type: Schema.Types.ObjectId, ref: 'Jawaban'}]

}, { timestamps : true });

const  Pertanyaan = mongoose.model('Pertanyaan', pertanyaanSchema)
module.exports =  Pertanyaan

