const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");

const app = express();
const taskRoutes = require("./routes/taskRoutes");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

dotenv.config({ path: "./config.env" });

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// middleware
app.use(express.json());

// Serving static files
app.use(express.static(`${__dirname}/public`));

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
