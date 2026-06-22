import { useState } from "react";
import api from "../../services/axios";

const ResumeUploadModal = ({
  isOpen,
  onClose,
  onUploadSuccess,
}) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] =
    useState(false);

  if (!isOpen) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-3xl p-10 w-full max-w-md text-center">

          <div className="animate-spin rounded-full h-14 w-14 border-4 border-green-200 border-t-green-600 mx-auto"></div>

          <h2 className="text-2xl font-bold mt-6">
            Analyzing Resume
          </h2>

          <p className="text-gray-500 mt-3">
            Uploading file, extracting content and generating AI insights...
          </p>

          <p className="text-green-600 mt-4 font-medium">
            This may take a few seconds
          </p>

        </div>
      </div>
    );
  }

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append(
        "resume",
        file
      );

      await api.post(
        "/resumes/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setFile(null);

      if (onUploadSuccess) {
        onUploadSuccess();
      }

      onClose();

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/50
        flex
        items-center
        justify-center
        z-50
      "
    >
      <div
        className="
          bg-white
          w-full
          max-w-lg
          rounded-3xl
          p-8
          shadow-2xl
        "
      >
        <h2 className="text-2xl font-bold mb-6">
          Upload Resume
        </h2>

        <div
          className="
            border-2
            border-dashed
            border-green-300
            rounded-2xl
            p-8
            text-center
          "
        >
          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setFile(
                e.target.files[0]
              )
            }
            className="w-full"
          />

          {file && (
            <p className="mt-4 text-green-600 font-medium">
              {file.name}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="
              px-5
              py-2
              rounded-xl
              border
              border-gray-300
              hover:bg-gray-100
            "
          >
            Cancel
          </button>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="
              px-5
              py-2
              rounded-xl
              bg-green-600
              text-white
              hover:bg-green-700
              disabled:opacity-50
            "
          >
            {loading
              ? "Uploading..."
              : "Upload Resume"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default ResumeUploadModal;