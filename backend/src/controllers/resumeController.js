const Resume = require("../models/Resume");
const parsePDF = require("../utils/pdfParser");
const analyzeResume = require("../services/resumeAnalyzerService");

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const parsedText = await parsePDF(req.file.path);

    const analysis = await analyzeResume(parsedText);

    const resume = await Resume.create({
      user: req.user._id,
      originalName: req.file.originalname,
      fileName: req.file.filename,
      filePath: req.file.path,
      parsedText,
      analysis,
    });

    res.status(201).json({
      success: true,
      message: "Resume uploaded and analyzed successfully",
      resume,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  uploadResume,
};