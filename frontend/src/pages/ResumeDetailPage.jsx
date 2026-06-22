import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import api from "../services/axios";

const ResumeDetailPage = () => {
  const { resumeId } = useParams();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await api.get(
          `/resumes/${resumeId}`
        );

        setResume(response.data.resume);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [resumeId]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          Loading Resume Analysis...
        </div>
      </DashboardLayout>
    );
  }

  if (!resume) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          Resume Not Found
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {resume.originalName}
        </h1>

        <p className="text-gray-500 mt-2">
          AI Resume Analysis
        </p>
      </div>

      {/* Summary */}

      <div className="bg-white border border-green-100 rounded-2xl p-6 mb-6">

        <h2 className="text-xl font-semibold mb-4">
          Professional Summary
        </h2>

        <p className="text-gray-700 leading-7">
          {resume.analysis?.summary ||
            "No summary available"}
        </p>

      </div>

      {/* Skills */}

      <div className="bg-white border border-green-100 rounded-2xl p-6 mb-6">

        <h2 className="text-xl font-semibold mb-4">
          Skills
        </h2>

        <div className="flex flex-wrap gap-3">

          {resume.analysis?.skills?.map(
            (skill, index) => (
              <span
                key={index}
                className="
                  bg-green-100
                  text-green-700
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  font-medium
                "
              >
                {skill}
              </span>
            )
          )}

        </div>

      </div>

      {/* Strengths + Weaknesses */}

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white border border-green-100 rounded-2xl p-6">

          <h2 className="text-xl font-semibold mb-4 text-green-700">
            Strengths
          </h2>

          <ul className="space-y-3">

            {resume.analysis?.strengths?.map(
              (strength, index) => (
                <li
                  key={index}
                  className="text-gray-700"
                >
                  ✓ {strength}
                </li>
              )
            )}

          </ul>

        </div>

        <div className="bg-white border border-red-100 rounded-2xl p-6">

          <h2 className="text-xl font-semibold mb-4 text-red-600">
            Areas for Improvement
          </h2>

          <ul className="space-y-3">

            {resume.analysis?.weaknesses?.map(
              (weakness, index) => (
                <li
                  key={index}
                  className="text-gray-700"
                >
                  • {weakness}
                </li>
              )
            )}

          </ul>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default ResumeDetailPage;