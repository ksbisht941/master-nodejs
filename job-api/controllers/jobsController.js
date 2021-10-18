const Jobs = require("./../models/jobsModel");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../../store-api/utils/appError");

exports.getAllJobs = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Jobs.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const jobs = await features.query;

  if (!jobs.length) {
    return next(new AppError(`No job created yet`, 404));
  }

  res.status(200).json({
    code: 200,
    status: "success",
    data: jobs,
  });
});

exports.getJob = catchAsync(async (req, res, next) => {
  const { id: jobId } = req.params;

  const job = await Jobs.findOne({ _id: jobId });

  if (!job) {
    return next(new AppError(`No job found with this id: ${jobId}`, 404));
  }

  res.status(200).json({
    code: 200,
    status: "success",
    data: job,
  });
});

exports.createJobs = catchAsync(async (req, res, next) => {
  req.body.createdBy = req.user._id;
  const newJob = await Jobs.create(req.body);

  res.status(201).json({
    code: 201,
    status: "success",
    data: req.body,
  });
});

exports.updateJob = catchAsync(async (req, res, next) => {
  const { id: jobId } = req.params;

  const job = await Jobs.findByIdAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true
  });

  if (!job) {
    return next(new AppError(`No job found with this id: ${jobId}`, 404));
  }

  res.status(200).json({
    code: 200,
    status: "success",
    data: job,
  });
});

exports.deleteJob = catchAsync(async (req, res, next) => {
  const { id: jobId } = req.params;

  const job = await Jobs.findByIdAndDelete({ _id: jobId });

  if (!job) {
    return next(new AppError(`No job found with this id: ${jobId}`, 404));
  }

  res.status(200).json({
    code: 200,
    status: "success",
    message: "Job delete successfully"
  });
});
