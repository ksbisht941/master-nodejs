const express = require("express");
const quizCollectionController = require("../controllers/quizCollectionController");
const quizQuestionController = require("../controllers/quizQuestionController");

const router = express.Router();

router.route("/collection")
    .get(quizCollectionController.getAllQuestion)
    .post(quizCollectionController.createQuestion);

router.route("/start")
    .get(quizQuestionController.getStartQuiz);

module.exports = router;