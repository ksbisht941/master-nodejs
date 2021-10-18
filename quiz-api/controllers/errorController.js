const AppError = require("./../utils/appError");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

//   let error = { ...err };

//   if (error.name === "CastError") error = handleCastErrorDB(error);
//   if (error.code === 11000) error = handleDuplicateFieldsDB(error);
//   if (error.name === "ValidationError") error = handleValidationErrorDB(error);
//   if (error.name === "JsonWebTokenError") error = handleJWTError();
//   if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

//   sendErrorProd(error, res);
};
