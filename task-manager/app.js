const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const path = require('path');
const compression = require('compression')
// const dotenv = require("dotenv");

const taskRoutes = require("./routes/taskRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const app = express();

// dotenv.config({ path: "./config.env" });

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'name',
      'completed'
    ]
  })
);

app.use(compression())

app.use(express.json());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.status(200).render('base');
})

app.use("/api/v1/tasks", taskRoutes);

// app.use(notFoundMiddleware);
// app.use(errorHandlerMiddleware);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

// app.get('/api/v1/tasks')             -> get all the tasks
// app.post('/api/v1/tasks')            -> create a new task
// app.get('/api/v1/tasks/:id')         -> get single task
// app.patch('/api/v1/tasks/:id')       -> update task
// app.delete('/api/v1/tasks/:id')      -> delete task
