import DashboardLayout from "../components/dashboard/DashboardLayout";
import { useEffect, useState } from "react";
import api from "../services/axios";
import { useAuth } from "../context/AuthContext";
import ResumeUploadModal from "../components/resume/ResumeUploadModal";
import GenerateInterviewModal from "../components/interview/GenerateInterviewModal";


import {
  FaFileAlt,
  FaRobot,
  FaChartBar,
  FaPlus,
} from "react-icons/fa";

const DashboardPage = () => {
  const { user, setUser } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/auth/me");

        setUser(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [user, setUser]);

  const [resumes, setResumes] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);

  const fetchDashboardData = async () => {
    try {
      const [resumeRes, interviewRes] =
        await Promise.all([
          api.get("/resumes"),
          api.get("/interviews"),
        ]);

      setResumes(resumeRes.data.resumes);
      setInterviews(interviewRes.data.interviews);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);



  const averageScore =
    interviews.length > 0
      ? (
          interviews.reduce(
            (sum, interview) =>
              sum + interview.overallScore,
            0
          ) / interviews.length
        ).toFixed(1)
      : 0;


      let progress = 0;

      if (resumes.length > 0) {
        progress += 25;
      }

      if (interviews.length > 0) {
        progress += 25;
      }

      if (
        interviews.some(
          (interview) => interview.status === "Completed"
        )
      ) {
        progress += 25;
      }

      if (
        interviews.some(
          (interview) =>
            interview.overallScore > 0
        )
      ) {
        progress += 25;
      }

  return (
    <DashboardLayout>

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-3xl p-8 text-white mb-8">
        <h2 className="text-3xl font-bold">
          Ready for your next interview?
        </h2>

        <p className="mt-3 text-green-50">
          Upload your resume, generate AI-powered
          interviews, and improve your performance
          with detailed feedback.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
          <FaFileAlt className="text-green-600 text-3xl mb-4" />

          <h3 className="text-gray-500 text-sm">
            Total Resumes
          </h3>

          <p className="text-3xl font-bold mt-2">
            {resumes.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
          <FaRobot className="text-green-600 text-3xl mb-4" />

          <h3 className="text-gray-500 text-sm">
            Interviews Taken
          </h3>

          <p className="text-3xl font-bold mt-2">
            {interviews.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
          <FaChartBar className="text-green-600 text-3xl mb-4" />

          <h3 className="text-gray-500 text-sm">
            Reports Generated
          </h3>

          <p className="text-3xl font-bold mt-2">
            {interviews.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
          <FaChartBar className="text-green-600 text-3xl mb-4" />

          <h3 className="text-gray-500 text-sm">
            Average Score
          </h3>

          <p className="text-3xl font-bold mt-2">
            {averageScore}%
          </p>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">

        <div className="bg-white rounded-2xl p-6 border border-green-100 shadow-sm">
          <h3 className="text-xl font-semibold mb-4">
            Quick Actions
          </h3>

          <div className="flex flex-col gap-4">

            <button
              onClick={() =>
                setIsUploadModalOpen(true)
              }
              className="
                flex
                items-center
                gap-3
                bg-green-600
                text-white
                px-5
                py-3
                rounded-xl
                hover:bg-green-700
                transition
                cursor-pointer
              "
            >
              <FaPlus />
              Upload Resume
            </button>

            <button
              onClick={() =>
                setIsGenerateModalOpen(true)
              }
              className="
                flex
                items-center
                gap-3
                border
                border-green-600
                text-green-600
                px-5
                py-3
                rounded-xl
                hover:bg-green-50
                transition
                cursor-pointer
              "
            >
              <FaPlus />
              Generate Interview
            </button>

          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-green-100 shadow-sm">
          <h3 className="text-xl font-semibold mb-4">
            Progress Overview
          </h3>

          <p className="text-gray-600">
            Start by uploading your first resume
            and generating an AI-powered interview.
          </p>

          <div className="mt-6">
            <div className="w-full h-3 bg-gray-200 rounded-full">
              <div
                className="h-3 bg-green-600 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <p className="text-sm text-gray-500 mt-3">
              Profile Progress: {progress}%
            </p>
          </div>
        </div>

      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 border border-green-100 shadow-sm">

        <h3 className="text-xl font-semibold mb-6">
          Recent Activity
        </h3>

        <div className="space-y-4">

          {resumes.length > 0 && (
            <div className="border border-green-100 rounded-xl p-4">
              <p className="font-semibold">
                Latest Resume
              </p>

              <p className="text-gray-600 mt-1">
                {resumes[0].originalName}
              </p>
            </div>
          )}

          {interviews.length > 0 && (
            <div className="border border-green-100 rounded-xl p-4">
              <p className="font-semibold">
                Latest Interview
              </p>

              <p className="text-gray-600 mt-1">
                {interviews[0].role}
              </p>

              <p className="text-sm text-green-600 mt-2">
                Score: {interviews[0].overallScore}%
              </p>
            </div>
          )}

          {resumes.length === 0 &&
          interviews.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No activity yet.
            </div>
          )}

        </div>

      </div>

      <ResumeUploadModal
        isOpen={isUploadModalOpen}
        onClose={() =>
          setIsUploadModalOpen(false)
        }
        onUploadSuccess={fetchDashboardData}
      />

      <GenerateInterviewModal
        isOpen={isGenerateModalOpen}
        onClose={() =>
          setIsGenerateModalOpen(false)
        }
        onSuccess={fetchDashboardData}
      />

    </DashboardLayout>
  );
};

export default DashboardPage;