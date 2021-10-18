exports.errorHandlerMiddleware = (err, req, res, next) => {
  return res.status(500).json({
    code: 500,
    status: "error",
    error: err,
  });
};
