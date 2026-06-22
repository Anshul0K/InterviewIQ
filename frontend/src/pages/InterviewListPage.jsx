import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import InterviewCard from "../components/interview/InterviewCard";
import GenerateInterviewModal from "../components/interview/GenerateInterviewModal";

import api from "../services/axios";

const InterviewListPage = () => {
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [
    isGenerateModalOpen,
    setIsGenerateModalOpen,
  ] = useState(false);


  const fetchInterviews = async () => {
    try {
      setLoading(true);

      const response =
        await api.get("/interviews");

      setInterviews(
        response.data.interviews
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  const handleDelete = async (
    interviewId
  ) => {
    try {
      const confirmed =
        window.confirm(
          "Delete this interview?"
        );

      if (!confirmed) return;

      await api.delete(
        `/interviews/${interviewId}`
      );

      setInterviews((prev) =>
        prev.filter(
          (interview) =>
            interview._id !== interviewId
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleView = (
    interviewId
  ) => {
    navigate(
      `/interviews/${interviewId}`
    );
  };

  return (
    <DashboardLayout>

      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            My Interviews
          </h1>

          <p className="text-gray-500 mt-2">
            Practice and track your interview performance
          </p>
        </div>

        <button
          onClick={() =>
            setIsGenerateModalOpen(true)
          }
          className="
            bg-green-600
            text-white
            px-5
            py-3
            rounded-xl
            hover:bg-green-700
            transition
          "
        >
          Generate Interview
        </button>

      </div>

      {loading ? (
        <div className="text-center py-20">
          Loading...
        </div>
      ) : interviews.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center border border-green-100">

          <h3 className="text-xl font-semibold">
            No Interviews Found
          </h3>

          <p className="text-gray-500 mt-2">
            Generate your first AI interview.
          </p>

        </div>
      ) : (
        <div className="grid gap-6">

          {interviews.map(
            (interview) => (
              <InterviewCard
                key={interview._id}
                interview={interview}
                onDelete={
                  handleDelete
                }
                onView={handleView}
              />
            )
          )}

        </div>
      )}

      <GenerateInterviewModal
        isOpen={isGenerateModalOpen}
        onClose={() =>
          setIsGenerateModalOpen(false)
        }
        onSuccess={fetchInterviews}
      />

    </DashboardLayout>
  );
};

export default InterviewListPage;