const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

const userRoutes = require("./routes/userRoutes");
const globalErrorHandler = require("./controllers/errorController");

dotenv.config({path: './config.env'});
const app = express();

// middleware
app.use(morgan('dev'));
app.use(express.json());

// serve static files
app.use(express.static(`${__dirname}/public`));

// routes
app.use("/api/v1/user", userRoutes);

// global error handler
app.use(globalErrorHandler);

module.exports = app;