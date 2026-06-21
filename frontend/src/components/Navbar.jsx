import logo from "../assets/logo_nb.png";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-green-50 border-b border-green-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <a href="#">
          <img
            src={logo}
            alt="InterviewIQ"
            className="h-10 object-contain cursor-pointer"
          />
        </a>

        <div className="hidden md:flex items-center gap-8">

          <a
            href="#features"
            className="text-gray-700 hover:text-green-600 transition cursor-pointer font-medium"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-gray-700 hover:text-green-600 transition cursor-pointer font-medium"
          >
            How It Works
          </a>

          <a
            href="#contact"
            className="text-gray-700 hover:text-green-600 transition cursor-pointer font-medium"
          >
            Contact
          </a>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;