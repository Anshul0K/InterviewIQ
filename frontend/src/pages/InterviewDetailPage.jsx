import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import api from "../services/axios";

const InterviewDetailPage = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answer, setAnswer] = useState("");

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const fetchInterview = async () => {
    try {
      const response = await api.get(
        `/interviews/${interviewId}`
      );

      const interviewData =
        response.data.interview;

      setInterview(interviewData);

      const firstUnanswered =
        interviewData.questions.findIndex(
          (q) => !q.userAnswer
        );

      if (firstUnanswered !== -1) {
        setCurrentQuestion(
          firstUnanswered
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterview();
  }, []);

  const submitAnswer = async () => {
    if (!answer.trim()) {
      alert("Please enter an answer");
      return;
    }

    try {
      setSubmitting(true);

      await api.post(
        `/interviews/${interviewId}/answer`,
        {
          questionIndex:
            currentQuestion,
          answer,
        }
      );

      const response = await api.get(
        `/interviews/${interviewId}`
        );

        setInterview(
        response.data.interview
        );

        setAnswer("");
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const generateReport =
    async () => {
      try {
        await api.get(
          `/interviews/${interviewId}/report`
        );

        navigate(
          `/reports/${interviewId}`
        );
      } catch (error) {
        console.error(error);
      }
    };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          Loading Interview...
        </div>
      </DashboardLayout>
    );
  }



  const question =
    interview.questions[
      currentQuestion
    ];

  const answered =
    !!question.userAnswer;

    const unansweredQuestions =
        interview.questions.filter(
            (q) => !q.userAnswer
        );

    const interviewCompleted =
        unansweredQuestions.length === 0;


    if (interviewCompleted) {
    return (
        <DashboardLayout>

        <div className="bg-white border border-green-100 rounded-3xl p-8">

            <h1 className="text-3xl font-bold mb-6">
            Interview Completed 🎉
            </h1>

            <div className="space-y-4 mb-8">

            {interview.questions.map(
                (q, index) => (
                <div
                    key={index}
                    className="flex justify-between border-b pb-3"
                >
                    <span>
                    Question {index + 1}
                    </span>

                    <span className="font-semibold text-green-600">
                    {q.score}/10
                    </span>
                </div>
                )
            )}

            </div>

            <button
            onClick={generateReport}
            className="
                bg-green-600
                text-white
                px-6
                py-3
                rounded-xl
                hover:bg-green-700
            "
            >
            Generate Final Report
            </button>

        </div>

        </DashboardLayout>
    );
    }

  return (
    <DashboardLayout>

      {/* Header */}

      <div className="bg-white border border-green-100 rounded-3xl p-6 mb-8">

        <div className="flex justify-between items-center">

          <div>
            <h1 className="text-3xl font-bold">
              {interview.role}
            </h1>

            <p className="text-gray-500 mt-2">
              {interview.difficulty}
              {" • "}
              {interview.status}
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">
              Question
            </p>

            <p className="text-2xl font-bold text-green-600">
              {currentQuestion + 1}/
              {
                interview.questions
                  .length
              }
            </p>
          </div>

        </div>

      </div>


      {/* Navigator*/}

      <div className="bg-white border border-green-100 rounded-2xl p-4 mb-6">
        <div className="flex flex-wrap gap-2">

            

            {interview.questions.map(
            (q, index) => (
                <button
                key={index}
                onClick={() =>
                    setCurrentQuestion(index)
                }
                className={`
                    w-10 h-10 rounded-full text-sm font-medium
                    ${
                    index === currentQuestion
                        ? "bg-green-600 text-white"
                        : q.userAnswer
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }
                `}
                >
                {index + 1}
                </button>
            )
            )}

            <div className="flex justify-between items-center mb-4">


            <button
                onClick={generateReport}
                className="
                bg-green-600
                text-white
                px-4
                py-2
                rounded-lg
                hover:bg-green-700
                "
            >
                Generate Report
            </button>

            </div>

        </div>
        </div>


      {/* Question Card */}

      <div className="bg-white border border-green-100 rounded-3xl p-8">

        <div className="mb-4">

          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

            {question.category}

          </span>

        </div>

        <h2 className="text-xl font-semibold leading-8 mb-8">
          {question.question}
        </h2>

        {!answered ? (
          <>
            <textarea
              rows={8}
              value={answer}
              onChange={(e) =>
                setAnswer(
                  e.target.value
                )
              }
              placeholder="Write your answer here..."
              className="
                w-full
                border
                border-gray-300
                rounded-2xl
                p-4
                focus:outline-none
                focus:ring-2
                focus:ring-green-500
              "
            />

            <div className="flex justify-between mt-6">

              <button
                onClick={() => {
                const nextUnanswered =
                    interview.questions.findIndex(
                    (q, index) =>
                        index > currentQuestion &&
                        !q.userAnswer
                    );

                if (nextUnanswered !== -1) {
                    setCurrentQuestion(
                    nextUnanswered
                    );
                } else {
                    const firstUnanswered =
                    interview.questions.findIndex(
                        (q) => !q.userAnswer
                    );

                    if (firstUnanswered !== -1) {
                    setCurrentQuestion(
                        firstUnanswered
                    );
                    }
                }
                }}
                className="
                  px-5
                  py-3
                  border
                  border-gray-300
                  rounded-xl
                "
              >
                Skip Question
              </button>

              <button
                onClick={
                  submitAnswer
                }
                disabled={
                  submitting
                }
                className="
                  px-5
                  py-3
                  bg-green-600
                  text-white
                  rounded-xl
                  hover:bg-green-700
                "
              >
                {submitting
                  ? "Evaluating..."
                  : "Submit Answer"}
              </button>

            </div>
          </>
        ) : (
          <>
            <div className="bg-gray-50 rounded-2xl p-5 mb-5">

              <h3 className="font-semibold mb-2">
                Your Answer
              </h3>

              <p className="text-gray-700 whitespace-pre-wrap">
                {
                  question.userAnswer
                }
              </p>

            </div>

            <div className="bg-green-50 rounded-2xl p-5 mb-5">

              <h3 className="font-semibold text-green-700 mb-2">
                Score
              </h3>

              <p className="text-3xl font-bold text-green-600">
                {question.score}/10
              </p>

            </div>

            <div className="bg-blue-50 rounded-2xl p-5">

              <h3 className="font-semibold mb-2">
                Feedback
              </h3>

              <p className="text-gray-700 leading-7">
                {
                  question.feedback
                }
              </p>

            </div>

            <div className="flex justify-between mt-8">

              <button
                onClick={() =>
                  setCurrentQuestion(
                    Math.max(
                      0,
                      currentQuestion -
                        1
                    )
                  )
                }
                disabled={
                  currentQuestion ===
                  0
                }
                className="
                  px-5
                  py-3
                  border
                  border-gray-300
                  rounded-xl
                "
              >
                Previous
              </button>

              {currentQuestion ===
              interview.questions
                .length -
                1 ? (
                <button
                  onClick={
                    generateReport
                  }
                  className="
                    px-5
                    py-3
                    bg-green-600
                    text-white
                    rounded-xl
                    hover:bg-green-700
                  "
                >
                  Generate Report
                </button>
              ) : (
                <button
                  onClick={() =>
                    setCurrentQuestion(
                      (
                        prev
                      ) =>
                        prev + 1
                    )
                  }
                  className="
                    px-5
                    py-3
                    bg-green-600
                    text-white
                    rounded-xl
                    hover:bg-green-700
                  "
                >
                  Next Question
                </button>
              )}

            </div>
          </>
        )}

      </div>

    </DashboardLayout>
  );
};

export default InterviewDetailPage;