import {
  FaFileUpload,
  FaSearch,
  FaRobot,
  FaComments,
  FaChartLine,
  FaFileAlt,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaFileUpload />,
    title: "Upload Resume",
    description:
      "Upload your resume in PDF format and let InterviewIQ understand your profile.",
  },
  {
    icon: <FaSearch />,
    title: "AI Resume Analysis",
    description:
      "Extract skills, strengths, weaknesses and generate detailed resume insights.",
  },
  {
    icon: <FaRobot />,
    title: "Generate Interview",
    description:
      "Create personalized interview questions tailored to your resume and target role.",
  },
  {
    icon: <FaComments />,
    title: "Answer Questions",
    description:
      "Attempt technical and behavioral questions in a realistic interview environment.",
  },
  {
    icon: <FaChartLine />,
    title: "AI Evaluation",
    description:
      "Receive intelligent feedback, scoring and performance analysis for every answer.",
  },
  {
    icon: <FaFileAlt />,
    title: "Performance Report",
    description:
      "Get a comprehensive report highlighting strengths, weaknesses and recommendations.",
  },
];

const HowItWorksSection = () => {
  return (
    <section
      id="how-it-works"
      className="bg-green-50 py-24"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900">
            How InterviewIQ Works
          </h2>

          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            A complete AI-driven workflow that helps you
            prepare, practice and improve for interviews.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="
                bg-white
                rounded-3xl
                p-8
                shadow-sm
                border
                border-green-100

                hover:shadow-xl
                hover:-translate-y-2
                transition-all
                duration-300
              "
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-green-100 text-green-600 text-2xl">
                {step.icon}
              </div>

              <div className="mt-6">
                <p className="text-sm font-semibold text-green-600">
                  STEP {index + 1}
                </p>

                <h3 className="text-xl font-bold mt-2">
                  {step.title}
                </h3>

                <p className="text-gray-600 mt-4 leading-7">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <div className="bg-white border border-green-100 rounded-3xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-center">
              Complete Workflow
            </h3>

            <div className="mt-10 flex flex-wrap justify-center items-center gap-4 text-center">
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl">
                Upload Resume
              </div>

              <span>→</span>

              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl">
                AI Analysis
              </div>

              <span>→</span>

              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl">
                Interview
              </div>

              <span>→</span>

              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl">
                Evaluation
              </div>

              <span>→</span>

              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl">
                Report
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;