import { FaFileAlt, FaTrash, FaEye } from "react-icons/fa";

const ResumeCard = ({
  resume,
  onDelete,
  onView,
}) => {
  return (
    <div className="bg-white border border-green-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition">

      <div className="flex justify-between items-start">

        <div>
          <div className="flex items-center gap-3">
            <FaFileAlt className="text-green-600 text-xl" />

            <h3 className="font-semibold text-lg">
              {resume.originalName}
            </h3>
          </div>

          <p className="text-sm text-gray-500 mt-2">
            Uploaded on{" "}
            {new Date(
              resume.createdAt
            ).toLocaleDateString()}
          </p>

          <p className="text-sm text-green-600 mt-2">
            Skills Identified:{" "}
            {resume.analysis?.skills?.length || 0}
          </p>
        </div>

        <div className="flex gap-2">

          <button
            onClick={() => onView(resume._id)}
            className="p-3 rounded-lg bg-green-50 text-green-600 hover:bg-green-100"
          >
            <FaEye />
          </button>

          <button
            onClick={() => onDelete(resume._id)}
            className="p-3 rounded-lg bg-red-50 text-red-500 hover:bg-red-100"
          >
            <FaTrash />
          </button>

        </div>

      </div>

    </div>
  );
};

export default ResumeCard;