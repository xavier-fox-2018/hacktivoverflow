const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    title: { type: String },
    description: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    answerId: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    deleteAt: { type: Date, default: null}, 
  },
  {
    timestamps: true
  }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;