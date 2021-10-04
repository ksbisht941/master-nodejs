const mongoose = require("mongoose");

const quizQuestionSchema = mongoose.Schema({
  question: {
    type: String,
  },
  correctAnswer: {
    type: [String],
  },
  answer: {
      type: [String],
      required: [true, 'Please select an option']
  },
  options: {
    type: [String],
  },
  quizQuestionId: {
    type: String,
  },
  concept: {
    type: String,
  },
  inputType: {
    type: [String],
    required: [true, 'Question must have an input type'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false
  }
});

const QuizQuestion = mongoose.model("QuizQuestion", quizQuestionSchema);

module.exports = QuizQuestion;
