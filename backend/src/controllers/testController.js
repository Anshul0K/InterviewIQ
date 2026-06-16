const llm = require("../services/langchain/llm");
const analyzeResume = require("../services/resumeAnalyzerService");
const generateInterviewQuestions = require("../services/interviewGeneratorService");
const evaluateAnswer = require("../services/answerEvaluatorService");

const testAnswerEvaluation = async (req, res) => {
  try {

    const question =
      "What is JWT Authentication?";

    const answer =
      "JWT is used for authentication between client and server using tokens.";

    const result = await evaluateAnswer(
      question,
      answer
    );

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


const testInterviewGeneration = async (req, res) => {
  try {
    const analysis = {
      skills: [
        "React",
        "Node.js",
        "MongoDB",
        "JWT",
        "Express.js",
      ],
    };

    const questions = await generateInterviewQuestions(
      analysis,
      "Full Stack Developer",
      "Medium"
    );

    res.status(200).json({
      success: true,
      questions,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

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
  testResumeAnalysis,  testInterviewGeneration, testAnswerEvaluation};