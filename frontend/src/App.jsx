import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import ResumeListPage from "./pages/ResumeListPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import InterviewListPage from "./pages/InterviewListPage";
import ResumeDetailPage from "./pages/ResumeDetailPage";
import InterviewDetailPage from "./pages/InterviewDetailPage";
import InterviewReportPage from "./pages/InterviewReportPage";
import ReportsListPage from "./pages/ReportsListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resumes"
          element={
            <ProtectedRoute>
              <ResumeListPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resumes/:resumeId"
          element={
            <ProtectedRoute>
              <ResumeDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/interviews"
          element={
            <ProtectedRoute>
              <InterviewListPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/interviews/:interviewId"
          element={
            <ProtectedRoute>
              <InterviewDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports/:interviewId"
          element={
            <ProtectedRoute>
              <InterviewReportPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <ReportsListPage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;