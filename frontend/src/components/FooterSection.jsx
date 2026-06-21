import logo from "../assets/logo_nb.png";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

const FooterSection = () => {
  return (
    <footer
      id="contact"
      className="bg-white border-t border-green-100"
    >
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-4 gap-10">

          <div>
            <img
              src={logo}
              alt="InterviewIQ"
              className="h-12 mb-4"
            />

            <p className="text-gray-600 leading-7">
              AI-powered interview preparation
              platform helping students and
              professionals practice smarter and
              perform better.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">
              Features
            </h3>

            <ul className="space-y-3 text-gray-600">
              <li>Resume Analysis</li>
              <li>Mock Interviews</li>
              <li>Answer Evaluation</li>
              <li>Performance Reports</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">
              Technology
            </h3>

            <ul className="space-y-3 text-gray-600">
              <li>React</li>
              <li>Node.js</li>
              <li>MongoDB</li>
              <li>LangChain + Gemini</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">
              Support
            </h3>

            <div className="space-y-4 text-gray-600">

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-green-600" />
                <span>support@interviewiq.com</span>
              </div>

              <div className="flex items-center gap-3">
                <FaGithub className="text-green-600" />
                <span>GitHub Repository</span>
              </div>

              <div className="flex items-center gap-3">
                <FaLinkedin className="text-green-600" />
                <span>LinkedIn</span>
              </div>

            </div>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-green-100 text-center text-gray-500">
          © 2026 InterviewIQ. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};

export default FooterSection;