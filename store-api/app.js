const express = require('express');
const morgan = require('morgan');
const dotenv = require("dotenv");

const productRoutes = require('./routes/productRoutes');
const globalError = require('./controllers/errorController');

const app = express();
dotenv.config({ path: "./config.env" });

// middleware
// if (process.env.NODE_ENV === 'development') {
    app.use(morgan("dev"));
// }

app.use(express.json());

// Serving static files
app.use(express.static(`${__dirname}/public`));

// routes
app.use("/api/v1/products/", productRoutes);

// middleware
app.use(globalError);


module.exports = app;