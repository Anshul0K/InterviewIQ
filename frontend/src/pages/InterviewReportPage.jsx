import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import api from "../services/axios";

const InterviewReportPage = () => {
  const { interviewId } = useParams();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await api.get(
          `/interviews/${interviewId}/report`
        );

        setReport(response.data.report);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [interviewId]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          Loading Report...
        </div>
      </DashboardLayout>
    );
  }

  if (!report) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          Report not found.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      {/* Header */}

      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-3xl p-8 mb-8">

        <h1 className="text-4xl font-bold">
          Interview Report
        </h1>

        <p className="mt-3 text-green-100">
          AI-powered performance evaluation
        </p>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-2xl border border-green-100 p-6 shadow-sm">

          <h3 className="text-gray-500 text-sm">
            Overall Score
          </h3>

          <p className="text-4xl font-bold text-green-600 mt-3">
            {report.overallScore}%
          </p>

        </div>

        <div className="bg-white rounded-2xl border border-green-100 p-6 shadow-sm">

          <h3 className="text-gray-500 text-sm">
            Questions Answered
          </h3>

          <p className="text-4xl font-bold mt-3">
            {report.answeredQuestions}/
            {report.totalQuestions}
          </p>

        </div>

        <div className="bg-white rounded-2xl border border-green-100 p-6 shadow-sm">

          <h3 className="text-gray-500 text-sm">
            Completion Rate
          </h3>

          <p className="text-4xl font-bold mt-3">
            {Math.round(
              (report.answeredQuestions /
                report.totalQuestions) *
                100
            )}
            %
          </p>

        </div>

      </div>

      {/* Strong Areas */}

      <div className="bg-white rounded-2xl border border-green-100 p-6 shadow-sm mb-6">

        <h2 className="text-2xl font-bold text-green-700 mb-4">
          Strong Areas
        </h2>

        <ul className="space-y-3">

          {report.strongAreas?.map(
            (item, index) => (
              <li
                key={index}
                className="flex items-start gap-3"
              >
                <span className="text-green-600">
                  ✓
                </span>

                <span>{item}</span>
              </li>
            )
          )}

        </ul>

      </div>

      {/* Weak Areas */}

      <div className="bg-white rounded-2xl border border-red-100 p-6 shadow-sm mb-6">

        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Areas for Improvement
        </h2>

        <ul className="space-y-3">

          {report.weakAreas?.map(
            (item, index) => (
              <li
                key={index}
                className="flex items-start gap-3"
              >
                <span className="text-red-500">
                  •
                </span>

                <span>{item}</span>
              </li>
            )
          )}

        </ul>

      </div>

      {/* Recommendations */}

      <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm mb-6">

        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Recommendations
        </h2>

        <ul className="space-y-3">

          {report.recommendations?.map(
            (item, index) => (
              <li
                key={index}
                className="flex items-start gap-3"
              >
                <span className="text-blue-500">
                  →
                </span>

                <span>{item}</span>
              </li>
            )
          )}

        </ul>

      </div>

      {/* Overall Feedback */}

      <div className="bg-white rounded-2xl border border-green-100 p-6 shadow-sm">

        <h2 className="text-2xl font-bold mb-4">
          Overall Feedback
        </h2>

        <p className="text-gray-700 leading-8">
          {report.overallFeedback}
        </p>

      </div>

    </DashboardLayout>
  );
};

export default InterviewReportPage;