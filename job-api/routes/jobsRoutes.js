const express = require("express");

const jobsController = require("./../controllers/jobsController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.route("/")
    .get(jobsController.getAllJobs)
    .post(authController.protect, jobsController.createJobs);

router.route("/:id")
    .get(jobsController.getJob)
    .patch(authController.protect, jobsController.updateJob)
    .delete(authController.protect, jobsController.deleteJob);

module.exports = router;