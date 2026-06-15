const llm = require("../services/langchain/llm");
const analyzeResume = require("../services/resumeAnalyzerService");

const testResumeAnalysis = async (req, res) => {
  try {
    const sampleResume = `
    B.Tech CSAI student at NSUT.
    Skills: React, Node.js, MongoDB, Java, Python.
    Solved 500+ Leetcode questions.
    Built multiple full-stack projects.
    Interested in AI and Machine Learning.
    `;

    const result = await analyzeResume(sampleResume);

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const testLLM = async (req, res) => {
  try {
    const response = await llm.invoke(
      "Say hello in one sentence."
    );

    res.status(200).json({
      success: true,
      response: response.content,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { testLLM, 
  testResumeAnalysis };