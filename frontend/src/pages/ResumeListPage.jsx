import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import ResumeCard from "../components/resume/ResumeCard";
import ResumeUploadModal from "../components/resume/ResumeUploadModal";

import api from "../services/axios";

const ResumeListPage = () => {
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const response = await api.get("/resumes");

      setResumes(response.data.resumes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleDelete = async (resumeId) => {
    try {
      await api.delete(`/resumes/${resumeId}`);

      setResumes((prev) =>
        prev.filter(
          (resume) => resume._id !== resumeId
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleView = (resumeId) => {
    navigate(`/resumes/${resumeId}`);
  };

  return (
    <DashboardLayout>

      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            My Resumes
          </h1>

          <p className="text-gray-500 mt-2">
            Manage and analyze your resumes
          </p>
        </div>

        <button
            onClick={() =>
                setIsUploadModalOpen(true)
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
          Upload Resume
        </button>

      </div>

      {loading ? (
        <div className="text-center py-20">
          Loading...
        </div>
      ) : resumes.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center border border-green-100">
          <h3 className="text-xl font-semibold">
            No Resumes Found
          </h3>

          <p className="text-gray-500 mt-2">
            Upload your first resume to begin.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">

          {resumes.map((resume) => (
            <ResumeCard
              key={resume._id}
              resume={resume}
              onDelete={handleDelete}
              onView={handleView}
            />
          ))}

        </div>
      )}


      <ResumeUploadModal
        isOpen={isUploadModalOpen}
        onClose={() =>
            setIsUploadModalOpen(false)
        }
        onUploadSuccess={fetchResumes}
        />

    </DashboardLayout>
  );
};

export default ResumeListPage;