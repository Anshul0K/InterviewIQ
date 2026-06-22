import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import ReportCard from "../components/report/ReportCard";

import api from "../services/axios";

const ReportsListPage = () => {
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response =
          await api.get("/interviews");

        const completedReports =
          response.data.interviews.filter(
            (interview) =>
              interview.status ===
              "Completed"
          );

        setReports(
          completedReports
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleView = (
    interviewId
  ) => {
    navigate(
      `/reports/${interviewId}`
    );
  };

  return (
    <DashboardLayout>

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Interview Reports
        </h1>

        <p className="text-gray-500 mt-2">
          View all your completed
          interview reports.
        </p>

      </div>

      {loading ? (
        <div className="text-center py-20">
          Loading Reports...
        </div>
      ) : reports.length === 0 ? (
        <div className="bg-white rounded-2xl border border-green-100 p-10 text-center">

          <h3 className="text-xl font-semibold">
            No Reports Yet
          </h3>

          <p className="text-gray-500 mt-2">
            Complete an interview and
            generate a report to see it
            here.
          </p>

        </div>
      ) : (
        <div className="grid gap-6">

          {reports.map(
            (interview) => (
              <ReportCard
                key={
                  interview._id
                }
                interview={
                  interview
                }
                onView={
                  handleView
                }
              />
            )
          )}

        </div>
      )}

    </DashboardLayout>
  );
};

export default ReportsListPage;