const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

router.route("/signin").post(authController.signin);
router.route("/signup").post(authController.signup);
router.route("/updatePassword").post(authController.updatePassword);
router.route("/resetPassword").post(authController.resetPassword);
router.route("/forgotPassword").post(authController.forgotPassword);

module.exports = router;