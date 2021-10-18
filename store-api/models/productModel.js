const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
      type: String,
      required: [true, 'Product name must be provided'],
      unique: true,
      trim: true
  },
  price: {
      type: Number,
      required: [true, 'Product price must be provided'],
  },
  featured: {
      type: Boolean,
      default: false
  },
  rating: {
      type: Number,
      default: 4.5,
      max: [5, "Rating cannot be more than 5"],
      min: [1, "Raing cannot be less than 1"]
  },
  company: {
    type: String,
    enum: {
        values: ['hp', 'acer', 'asus', 'apple'],
        message: '{VALUE} is not supported'
    }
  },
  createAt: {
      type: Date,
      default: Date.now()
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
