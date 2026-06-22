import { useEffect, useState } from "react";
import api from "../../services/axios";

const GenerateInterviewModal = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [resumes, setResumes] = useState([]);

  const [resumeId, setResumeId] =
    useState("");

  const [role, setRole] =
    useState("");

  const [difficulty, setDifficulty] =
    useState("Medium");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const fetchResumes = async () => {
      try {
        const response =
          await api.get("/resumes");

        setResumes(
          response.data.resumes
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchResumes();
  }, [isOpen]);

  if (!isOpen) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

        <div className="bg-white rounded-3xl p-10 w-full max-w-md text-center">

          <div className="animate-spin rounded-full h-14 w-14 border-4 border-green-200 border-t-green-600 mx-auto"></div>

          <h2 className="text-2xl font-bold mt-6">
            Generating Interview
          </h2>

          <p className="text-gray-600 mt-3">
            Analyzing resume and creating
            personalized interview questions...
          </p>

          <div className="mt-6 space-y-2 text-sm text-left">

            <p>
              ✓ Resume Selected
            </p>

            <p>
              ✓ Role Analysis
            </p>

            <p className="text-green-600 font-medium">
              ⏳ Generating Questions...
            </p>

          </div>

        </div>

      </div>
    );
  }

  const handleGenerate =
    async () => {
      if (
        !resumeId ||
        !role ||
        !difficulty
      ) {
        alert(
          "Please fill all fields"
        );
        return;
      }

      try {
        setLoading(true);

        await api.post(
          "/interviews/generate",
          {
            resumeId,
            role,
            difficulty,
          }
        );

        if (onSuccess) {
          onSuccess();
        }

        onClose();

      } catch (error) {
        console.error(error);

        alert(
          error.response?.data
            ?.message ||
            "Failed to generate interview"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl p-8 w-full max-w-xl">

        <h2 className="text-2xl font-bold mb-6">
          Generate AI Interview
        </h2>

        <div className="space-y-5">

          <div>
            <label className="block font-medium mb-2">
              Select Resume
            </label>

            <select
              value={resumeId}
              onChange={(e) =>
                setResumeId(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 rounded-xl p-3"
            >
              <option value="">
                Select Resume
              </option>

              {resumes.map(
                (resume) => (
                  <option
                    key={
                      resume._id
                    }
                    value={
                      resume._id
                    }
                  >
                    {
                      resume.originalName
                    }
                  </option>
                )
              )}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">
              Target Role
            </label>

            <input
              type="text"
              value={role}
              onChange={(e) =>
                setRole(
                  e.target.value
                )
              }
              placeholder="Frontend Developer"
              className="w-full border border-gray-300 rounded-xl p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Difficulty
            </label>

            <select
              value={difficulty}
              onChange={(e) =>
                setDifficulty(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 rounded-xl p-3"
            >
              <option>
                Easy
              </option>

              <option>
                Medium
              </option>

              <option>
                Hard
              </option>

            </select>
          </div>

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-2 border border-gray-300 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={
              handleGenerate
            }
            className="px-5 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
          >
            Generate
            Interview
          </button>

        </div>

      </div>

    </div>
  );
};

export default GenerateInterviewModal;