const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.route("/")
    .get(productController.getAllProduct)
    .post(productController.addProduct);

router.route("/:id")
    .get(productController.getProduct)
    .patch(productController.updateProduct);

module.exports = router;