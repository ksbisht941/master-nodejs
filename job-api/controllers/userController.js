const catchAsync = require("../utils/catchAsync");
const User = require("./../models/userModel");

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();

    if (!users.length) {
        return next(new AppError(`No user created yet`, 404));
    }

    res.status(200).json({
        code: 200,
        status: "success",
        data: users
    })
});

exports.getUser = catchAsync(async (req, res, next) => {
    const {id: userId} = req.params;

    const user = await User.findOne({_id: userId}).populate('jobCreate');

    res.status(200).json({
        code: 200,
        status: "success",
        data: user
    })
})