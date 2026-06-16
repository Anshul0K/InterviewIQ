const express = require("express");
const {
  testLLM,
  testResumeAnalysis,
  testInterviewGeneration,
  testAnswerEvaluation
} = require("../controllers/testController");

const router = express.Router();

router.get("/llm", testLLM);
router.get("/resume-analysis", testResumeAnalysis);
router.get("/interview", testInterviewGeneration);
router.get("/evaluate", testAnswerEvaluation);

module.exports = router;