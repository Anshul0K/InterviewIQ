import {
  FaRobot,
  FaTrash,
  FaEye,
} from "react-icons/fa";

const InterviewCard = ({
  interview,
  onDelete,
  onView,
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";

      case "In Progress":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white border border-green-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition">

      <div className="flex justify-between items-start">

        <div>

          <div className="flex items-center gap-3">
            <FaRobot className="text-green-600 text-xl" />

            <h3 className="font-semibold text-lg">
              {interview.role}
            </h3>
          </div>

          <div className="flex gap-3 mt-3">

            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
              {interview.difficulty}
            </span>

            <span
              className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                interview.status
              )}`}
            >
              {interview.status}
            </span>

          </div>

          <p className="text-sm text-gray-500 mt-3">
            Created on{" "}
            {new Date(
              interview.createdAt
            ).toLocaleDateString()}
          </p>

          <p className="text-sm text-green-600 mt-2">
            Score:{" "}
            {interview.overallScore || 0}%
          </p>

        </div>

        <div className="flex gap-2">

          <button
            onClick={() =>
              onView(interview._id)
            }
            className="p-3 rounded-lg bg-green-50 text-green-600 hover:bg-green-100"
          >
            <FaEye />
          </button>

          <button
            onClick={() =>
              onDelete(interview._id)
            }
            className="p-3 rounded-lg bg-red-50 text-red-500 hover:bg-red-100"
          >
            <FaTrash />
          </button>

        </div>

      </div>

    </div>
  );
};

export default InterviewCard;