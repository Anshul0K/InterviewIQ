import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaFileAlt,
  FaRobot,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";

import logo from "../../assets/logo_nb.png";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      isActive
        ? "bg-green-600 text-white"
        : "text-gray-700 hover:bg-green-100"
    }`;

  return (
    <div className="w-64 h-screen bg-white border-r border-green-100 flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-green-100">
        <img
          src={logo}
          alt="InterviewIQ"
          className="h-10 object-contain"
        />
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-2">

        <NavLink
          to="/dashboard"
          className={navItemClass}
        >
          <FaHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/resumes"
          className={navItemClass}
        >
          <FaFileAlt />
          <span>Resumes</span>
        </NavLink>

        <NavLink
          to="/interviews"
          className={navItemClass}
        >
          <FaRobot />
          <span>Interviews</span>
        </NavLink>

        <NavLink
          to="/reports"
          className={navItemClass}
        >
          <FaChartBar />
          <span>Reports</span>
        </NavLink>

      </div>

      {/* Logout */}
      <div className="p-4 border-t border-green-100">
        <button
          onClick={handleLogout}
          className="
            w-full
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-xl
            text-red-500
            hover:bg-red-50
            transition
            cursor-pointer
          "
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>

    </div>
  );
};

export default Sidebar;