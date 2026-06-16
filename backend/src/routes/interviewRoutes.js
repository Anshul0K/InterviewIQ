const express = require("express");

const{
    generateInterview,
    answerQuestion,
    getInterviewReport,
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
  "/:interviewId/report",
  protect,
  getInterviewReport
);

module.exports = router;


