const Resume = require("../models/Resume");
const Interview = require("../models/Interview");

const generateInterviewQuestions = require(
  "../services/interviewGeneratorService"
);

const evaluateAnswer = require(
  "../services/answerEvaluatorService"
);

const generateInterviewReport = require(
  "../services/interviewReportService"
);

const generateInterview = async (req, res) => {
  try {
    const {
      resumeId,
      role,
      difficulty,
    } = req.body;

    if (!resumeId || !role || !difficulty) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const questions =
      await generateInterviewQuestions(
        resume.analysis,
        role,
        difficulty
      );

    const interview = await Interview.create({
      user: req.user._id,
      resume: resume._id,
      role,
      difficulty,
      questions,
    });

    res.status(201).json({
      success: true,
      message: "Interview generated successfully",
      interview,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


const answerQuestion = async (req, res) => {
  try {
    const { interviewId } = req.params;

    const { questionIndex, answer } = req.body;

    if (
      questionIndex === undefined ||
      !answer
    ) {
      return res.status(400).json({
        success: false,
        message:
          "questionIndex and answer are required",
      });
    }

    const interview =
      await Interview.findById(interviewId);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    const question =
      interview.questions[questionIndex];

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    const evaluation =
      await evaluateAnswer(
        question.question,
        answer
      );

    question.userAnswer = answer;
    question.feedback = evaluation.feedback;
    question.score = evaluation.score;
    interview.status = "In Progress";

    await interview.save();

    res.status(200).json({
      success: true,
      evaluation,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getInterviewReport = async (req, res) => {
  try {

    const { interviewId } = req.params;

    const interview =
      await Interview.findById(interviewId);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    const totalQuestions =
      interview.questions.length;

    const answeredQuestions =
      interview.questions.filter(
        (q) => q.userAnswer
      ).length;

    const totalScore =
      interview.questions.reduce(
        (sum, q) => sum + (q.score || 0),
        0
      );

      if (
        interview.report &&
        interview.report.overallFeedback
      ) {
        return res.status(200).json({
          success: true,

          report: {
            overallScore:
              interview.overallScore,

            totalQuestions,
            answeredQuestions,

            strongAreas:
              interview.report
                .strongAreas,

            weakAreas:
              interview.report
                .weakAreas,

            recommendations:
              interview.report
                .recommendations,

            overallFeedback:
              interview.report
                .overallFeedback,
          },
        });
      }

    const overallScore =
      totalQuestions > 0
        ? Number(
            (
              (totalScore /
                (totalQuestions * 10)) *
              100
            ).toFixed(1)
          )
        : 0;

    const report =
      await generateInterviewReport(
        interview.questions
      );

    interview.overallScore = overallScore;

    interview.report = {
      strongAreas:
        report.strongAreas,

      weakAreas:
        report.weakAreas,

      recommendations:
        report.recommendations,

      overallFeedback:
        report.overallFeedback,
    };

    interview.status =
      "Completed";

    await interview.save();;

    res.status(200).json({
      success: true,

      report: {
        overallScore,
        totalQuestions,
        answeredQuestions,

        strongAreas:
          report.strongAreas,

        weakAreas:
          report.weakAreas,

        recommendations:
          report.recommendations,

        overallFeedback:
          report.overallFeedback,
      },
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


const getInterviews = async (req, res) => {
  try {

    const interviews = await Interview.find({
      user: req.user._id,
    })
      .select(
        "role difficulty overallScore status createdAt"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      interviews,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getInterviewById = async (req, res) => {
  try {

    const { interviewId } = req.params;

    const interview = await Interview.findById(
      interviewId
    );

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    if (
      interview.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    res.status(200).json({
      success: true,
      interview,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteInterview = async (req, res) => {
  try {

    const { interviewId } = req.params;

    const interview =
      await Interview.findById(
        interviewId
      );

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    if (
      interview.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    await Interview.findByIdAndDelete(
      interviewId
    );

    res.status(200).json({
      success: true,
      message:
        "Interview deleted successfully",
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
  generateInterview,
  answerQuestion,
  getInterviewReport,
  getInterviews,
  getInterviewById,
  deleteInterview,
};