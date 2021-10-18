

const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const AppError = require("../../jwt-basics/utils/appError");

const catchAsync = require("../utils/catchAsync");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.register = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    });

    createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;

    // 1) Check if email and password exist
    if (!email || !password) return next(new AppError('Please provide email and password!', 400));
    
    // 2) Check if user exists && password is correct
    const user = await User.find({email: email}).select('+password');
    
    if (!user || !(await User.correctPassword(password, user.password)))   return next(new AppError('Incorrect email or password', 401));

    // 3) If everything ok, send token to client
    createSendToken(user, 200, res)
});
