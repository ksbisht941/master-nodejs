const catchAsync = require("../middlewares/catchAsync");
const Product = require("../models/productModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllProduct = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const products = await features.query;

  if (!products.length) throw next(new AppError(`No product found`, 404));

  res.status(200).json({
    code: 200,
    status: "success",
    data: { products, length: products.length },
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const { id: productId } = req.params;

  const product = Product.findOne({ _id: productId });

  if (!product)
    throw next(new AppError(`No product found with this id ${productId}`, 404));

  res.status(200).json({
    code: 200,
    status: "success",
    data: product,
  });
});

exports.addProduct = catchAsync(async (req, res, next) => {
  const task = await Product.create(req.body);
  res.status(201).json({
    code: 201,
    status: "success",
    message: "Add product successfully",
    data: task,
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const { id: productId } = req.params;
  const task = await Product.findByIdAndUpdate({ _id: productId }, req.body);

  res.status(200).json({
    code: 200,
    status: "success",
    message: "Update product successfully",
    data: task,
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const { id: productId } = req.params;
  const product = Product.findByIdAndDelete({ _id: productId });

  if (!product)
    throw new AppError(`No product found with this id ${productId}`, 204);

  res.status(204).json({
    code: 204,
    status: "Succussfully delete product",
  });
});
