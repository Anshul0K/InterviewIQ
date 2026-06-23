const Resume = require("../models/Resume");
const parsePDF = require("../utils/pdfParser");
const analyzeResume = require("../services/resumeAnalyzerService");
const fs = require("fs");

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

    fs.unlinkSync(req.file.path);

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

const getResumes = async (req, res) => {
  try {

    const resumes = await Resume.find({
      user: req.user._id,
    })
      .select(
        "originalName analysis createdAt"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      resumes,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getResumeById = async (req, res) => {
  try {

    const { resumeId } = req.params;

    const resume = await Resume.findById(
      resumeId
    );

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    if (
      resume.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    res.status(200).json({
      success: true,
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

const deleteResume = async (req, res) => {
  try {

    const { resumeId } = req.params;

    const resume = await Resume.findById(
      resumeId
    );

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    if (
      resume.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    await Resume.findByIdAndDelete(
      resumeId
    );

    res.status(200).json({
      success: true,
      message:
        "Resume deleted successfully",
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
  getResumes,
  getResumeById,
  deleteResume,
};