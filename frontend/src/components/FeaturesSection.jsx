import feature1 from "../assets/feature1.png";
import feature2 from "../assets/feature2.png";
import feature3 from "../assets/feature3.png";
import feature4 from "../assets/feature4.png";

const features = [
  {
    title: "Resume & Skills Analysis",
    subtitle: "Smart Resume Parsing",
    image: feature1,
    points: [
      "Extract technical and soft skills",
      "Identify strengths and weaknesses",
      "Generate AI-powered summary",
      "Resume-specific insights",
    ],
  },
  {
    title: "Mock Interview Creation",
    subtitle: "Personalized Question Engine",
    image: feature2,
    points: [
      "Role-specific interviews",
      "Technical and behavioral questions",
      "Multiple difficulty levels",
      "Questions based on resume content",
    ],
  },
  {
    title: "Performance Evaluation",
    subtitle: "Detailed Performance Insights",
    image: feature3,
    points: [
      "AI answer evaluation",
      "Question-wise feedback",
      "Performance scoring",
      "Improvement suggestions",
    ],
  },
  {
    title: "Report Generation",
    subtitle: "Multi-Interview Reports",
    image: feature4,
    points: [
      "Strong area detection",
      "Weak area analysis",
      "Progress tracking",
      "Personalized recommendations",
    ],
  },
];

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="max-w-7xl mx-auto px-6 py-10"
    >
      <div className="text-center mb-20">
        <h2 className="text-4xl font-bold text-gray-900">
          Why Choose InterviewIQ?
        </h2>

        <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
          Everything you need to prepare for technical
          interviews, evaluate performance, and track
          your growth with AI assistance.
        </p>
      </div>

      <div className="space-y-24">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className={`grid lg:grid-cols-2 gap-12 items-center ${
              index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div className="rounded-3xl overflow-hidden border border-green-100 shadow-lg hover:shadow-2xl transition-all duration-300">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-auto object-cover"
              />
            </div>

            <div>
              <p className="text-green-600 font-semibold">
                FEATURE {index + 1}
              </p>

              <h3 className="text-4xl font-bold mt-2 text-gray-900">
                {feature.title}
              </h3>

              <h4 className="text-2xl font-semibold mt-4 text-gray-800">
                {feature.subtitle}
              </h4>

              <ul className="mt-8 space-y-4">
                {feature.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <div className="w-2 h-2 rounded-full bg-green-600" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;