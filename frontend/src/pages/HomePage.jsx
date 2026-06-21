import Navbar from "../components/Navbar";
import AuthCard from "../components/AuthCard";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorksSection from "../components/HowItWorksSection";
import FooterSection from "../components/FooterSection";

import {
  FaRobot,
  FaFileAlt,
  FaChartLine,
} from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div>
            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
              AI-Powered Interview Preparation
            </span>

            <h1 className="text-5xl font-bold mt-6 text-gray-900 leading-tight">
              Prepare Smarter.
              <br />
              Perform Better.
            </h1>

            <p className="mt-6 text-gray-600 text-lg leading-8">
              Upload your resume, generate
              personalized interviews, receive AI
              feedback, and improve your chances of
              landing your dream job.
            </p>

            <div className="mt-8 space-y-4">
              <div>✓ AI Resume Analysis</div>
              <div>✓ Personalized Interview Questions</div>
              <div>✓ Detailed Performance Reports</div>
              <div>✓ Powered by Gemini AI</div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-10">
              <div className="p-5 rounded-2xl border border-green-100 hover:shadow-xl hover:scale-105 transition cursor-pointer">
                <FaFileAlt className="text-green-600 text-2xl mb-3" />
                <h3 className="font-semibold">
                  Resume Analysis
                </h3>
              </div>

              <div className="p-5 rounded-2xl border border-green-100 hover:shadow-xl hover:scale-105 transition cursor-pointer">
                <FaRobot className="text-green-600 text-2xl mb-3" />
                <h3 className="font-semibold">
                  AI Interviews
                </h3>
              </div>

              <div className="p-5 rounded-2xl border border-green-100 hover:shadow-xl hover:scale-105 transition cursor-pointer">
                <FaChartLine className="text-green-600 text-2xl mb-3" />
                <h3 className="font-semibold">
                  Performance Reports
                </h3>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <AuthCard />
          </div>

        </div>
        </div>

      <FeaturesSection />

      <HowItWorksSection />

      <FooterSection />

    </div>
  );
};

export default HomePage;