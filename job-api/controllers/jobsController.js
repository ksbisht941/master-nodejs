const Jobs = require("./../models/jobsModel");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllJobs = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Jobs.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const jobs = await features.query;

  res.status(200).json({
    jobs,
  });
});

exports.getJob = catchAsync(async (req, res, next) => {});

exports.createJobs = catchAsync(async (req, res, next) => {
  req.body.createdBy = req.user._id;
  const newJob = await Jobs.create(req.body);

  res.status(201).json({
    code: 201,
    status: "success",
    data: req.body,
  });
});

exports.updateJob = catchAsync(async (req, res, next) => {});

exports.deleteJob = catchAsync(async (req, res, next) => {});
