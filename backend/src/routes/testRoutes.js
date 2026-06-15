const express = require("express");
const {
  testLLM,
  testResumeAnalysis,
} = require("../controllers/testController");

const router = express.Router();

router.get("/llm", testLLM);
router.get("/resume-analysis", testResumeAnalysis);

module.exports = router;