const sendErrorDev = (err, res) => {
  console.log("status code", err.statusCode);
  res.status(err.statusCode).json({
    code: err.statusCode,
    status: err.status,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = (err, res) => {
  res.status(err.statusCode).json({
    code: err.statusCode,
    status: err.status,
    stack: err.stack,
    error: err,
  });
};

module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    sendErrorProd(err, res);
  }
};
