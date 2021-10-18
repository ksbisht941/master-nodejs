const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");

const userRoutes = require("userRoutes");
const jobsRoutes = require("jobsRoutes");

const app = express();

// Config Environment
dotenv.config({path: './config.env'});

// Middleware
if (process.env.NODE_ENV === 'production') {
    app.use(morgan('dev'));
}

app.use(express.json());

// Serve Static Files
app.use(express.static(`${__dirname}/public`));

// Routes
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/jobs', jobsRoutes)

module.exports = app;