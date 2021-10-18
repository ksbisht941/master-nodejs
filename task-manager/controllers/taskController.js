const { catchAsync } = require("../middleware/catchAsync");
const Task = require("../models/taskModel");
const AppError = require("../utils/appError");

exports.getAllTasks = catchAsync(async (req, res, next) => {
    const task = await Task.find();

    if (!task.length) {
        res.status(404).json({
          code: 404,
          status: "failure",
          message: `No task found with this id: ${req.params.id}`,
        });
    }

    res.status(200).json({
      code: 200,
      status: "success",
      data: task,
    })
});

exports.getTask = catchAsync(async (req, res, next) => {
    const {id: taskID} = req.params;
    const task = await Task.findOne({_id: taskID});

    if (!task) {
      return next(new AppError(`No task found with this id: ${req.params.id}`, 404));
    }

    res.status(200).json({
      code: 200,
      status: "success",
      data: task,
    });
});

exports.createTask = catchAsync(async (req, res, next) => {
    const task = await Task.create(req.body);
    res.status(201).json({
      code: 201,
      status: "success",
      message: "Create task successfully",
      data: task
    })
});

exports.updateTask = catchAsync(async (req, res, next) => {
    const {id: taskID} = req.params;
    const task = await Task.findByIdAndUpdate(taskID, req.body);

    if (!task) {
      return next(new AppError(`No task found with this id: ${req.params.id}`, 404));
    }

    res.status(200).json({
      code: 200,
      status: "success",
    });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
    const {id: taskID} = req.params;
    const task = await Task.findByIdAndDelete(taskID);

    if (!task) {
      return next(new AppError(`No task found with this id: ${req.params.id}`, 404));
    }

    res.status(204).json({
      code: 204,
      status: "success",
    });
});
