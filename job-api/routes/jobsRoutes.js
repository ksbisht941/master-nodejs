const express = require("express");

const jobsController = require("./../controllers/jobsController");

const router = express.Router();

router.route("/").get(jobsController.getAllJobs).post(jobsController.createJobs);

router.route("/:id").get(jobsController.getJob).patch(jobsController.updateJob).delete(jobsController.deleteJob);

module.exports = router;