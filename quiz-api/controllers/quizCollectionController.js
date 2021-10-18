const QuizCollection = require("../models/quizCollectionModel");

exports.getAllQuestion = async (req, res, next) => {
  try {
    const questions = await QuizCollection.find();

    if (questions) {
      res.status(200).json({
        code: 204,
        status: "failure",
        data: questions,
      });
    }

    res.status(200).json({
      code: 200,
      status: "success",
      data: questions,
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      status: "failure",
      message: "Something went wrong",
      error: err
    });
  }
};

exports.createQuestion = async (req, res, next) => {
  try {
    await QuizCollection.create(req.body);

    res.status(201).json({
      code: 201,
      status: "success",
      message: "Save Successfully",
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      status: "failure",
      message: "Something went wrong",
      error: err
    });
  }
};
