const express = require("express");

const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

const router = express.Router();

router.route("/register").post(authController.register)
router.route("/login").post(authController.login)

router.route("/").get(userController.getAllUsers);
router.route("/:id").get(userController.getUser);

module.exports = router;