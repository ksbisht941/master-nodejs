const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const quizCollectionRoutes = require("./routes/quizRoutes");
const userRoutes = require("./routes/userRoutes");

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();


app.use(morgan("dev"));
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use('/api/v1/quiz', quizCollectionRoutes);
app.use('/api/v1/user', userRoutes);

app.use(globalErrorHandler);

module.exports = app;
