const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    answer: {
      type: String,
      required: [true, "answer is required"]
    },
    questionId: { type: Schema.Types.ObjectId, ref: "Question" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    likes: [],
    dislikes: [],
    deleteAt: { type: Date, default: null}
  },
  {
    timestamps: true
  }
);

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;