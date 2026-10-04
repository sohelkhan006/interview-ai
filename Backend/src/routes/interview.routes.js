const express = require("express");
const authmiddleware = require("../middlewares/auth.middleware");
const interviewController = require("../controllers/interview.controller");
const upload = require("../middlewares/file.middleware");

const interviewRouter = express.Router();

/**
 * @route POST /api/interview
 * @description generate new interview report on the basis of user self description resume pdf and jog description
 * @access private
 */
interviewRouter.post(
  "/",
  authmiddleware.authUser,
  upload.single("resume"),
  interviewController.generateInterViewReportController,
);

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId.
 * @access private
 */

interviewRouter.get("/report/:interviewId", authmiddleware.authUser, interviewController.getInterviewReportByIdController)

/**
 * @route GET /api/interview
 * @description get all interview report of logged in user
 * @access private
 */
interviewRouter.get("/",authmiddleware.authUser, interviewController.getAllInterviewReportsController)
module.exports = interviewRouter;
