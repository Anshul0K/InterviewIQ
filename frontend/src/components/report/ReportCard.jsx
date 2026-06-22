import { FaChartBar, FaEye } from "react-icons/fa";

const ReportCard = ({
  interview,
  onView,
}) => {
  return (
    <div className="bg-white border border-green-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition">

      <div className="flex justify-between items-start">

        <div>

          <div className="flex items-center gap-3">
            <FaChartBar className="text-green-600 text-xl" />

            <h3 className="font-semibold text-lg">
              {interview.role}
            </h3>
          </div>

          <div className="mt-4 flex gap-3">

            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              {interview.difficulty}
            </span>

            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
              Completed
            </span>

          </div>

          <p className="text-sm text-gray-500 mt-3">
            {new Date(
              interview.createdAt
            ).toLocaleDateString()}
          </p>

          <p className="text-green-600 font-semibold mt-2">
            Score: {interview.overallScore}%
          </p>

        </div>

        <button
          onClick={() =>
            onView(interview._id)
          }
          className="
            p-3
            rounded-lg
            bg-green-50
            text-green-600
            hover:bg-green-100
          "
        >
          <FaEye />
        </button>

      </div>

    </div>
  );
};

export default ReportCard;