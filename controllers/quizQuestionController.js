const QuizCollection = require("../models/quizCollectionModel");
const QuizQuestion = require("../models/QuizQuestionModel");

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    array[currentIndex],
      (array[randomIndex] = array[randomIndex]),
      array[currentIndex];
  }

  return array;
};

exports.getStartQuiz = async (req, res, next) => {
next()
};
