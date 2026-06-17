const express = require("express");

const{
    generateInterview,
    answerQuestion,
    getInterviewReport,
    getInterviews,
    getInterviewById,
    deleteInterview,
} = require("../controllers/interviewController");



const{
    protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    "/generate",
    protect,
    generateInterview
);

router.post(
  "/:interviewId/answer",
  protect,
  answerQuestion
);

router.get(
  "/:interviewId",
  protect,
  getInterviewById
);

router.get(
  "/:interviewId/report",
  protect,
  getInterviewReport
);

router.get(
  "/",
  protect,
  getInterviews
);

router.delete(
  "/:interviewId",
  protect,
  deleteInterview
);

module.exports = router;


