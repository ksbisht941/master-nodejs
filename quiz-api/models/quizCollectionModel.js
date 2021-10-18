const mongoose = require("mongoose");

// const quizQuestionConceptCategory = mongoose.Schema({
//   technologyQuestions: {
//     type: mongoose.Schema.ObjectId,
//     ref: "QuizQuestion",
//   },
//   securityAndComplianceQuestions: {
//     type: mongoose.Schema.ObjectId,
//     ref: "QuizQuestion",
//   },
//   cloudConceptsQuestions: {
//     type: mongoose.Schema.ObjectId,
//     ref: "QuizQuestion",
//   },
//   billingAndPriceQuestions: {
//     type: mongoose.Schema.ObjectId,
//     ref: "QuizQuestion",
//   },
// });

const quizCollectionSchema = mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is a required field"],
    },
    answer: {
      type: [String],
      required: [true, "Question must have a correct answer"],
      select: false,
    },
    options: {
      type: [String],
      required: [true, "Options is a required fields"],
    },
    attempted: {
      type: Boolean,
      default: false,
      select: false,
      required: [true, "Attempt check missing"],
    },
    quizQuestionId: {
      type: String,
      select: false,
    },
    concept: {
      type: String,
      required: [true, "Question must be related to any concept"],
      enum: {
        values: [
          "Technology",
          "Security and Compliance",
          "Cloud Concepts",
          "Billing and Price",
        ],
        message: "Unknown concept category",
      },
    },
    inputType: {
      type: [String],
      required: [true, "Question must have an input type"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

quizCollectionSchema.pre("save", function (next) {
  this.quizQuestionId = this.id;
  console.log(this.quizQuestionId);
  next();
});

const QuizCollection = mongoose.model("QuizCollection", quizCollectionSchema);
module.exports = QuizCollection;
