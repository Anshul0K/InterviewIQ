import { useAuth } from "../../context/AuthContext";

const DashboardNavbar = () => {
  const { user } = useAuth();

  const today = new Date().toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="bg-white border-b border-green-100 px-8 py-5">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back,
            {" "}
            {user?.name || "User"} 👋
          </h1>

          <p className="text-gray-500 mt-1">
            {today}
          </p>
        </div>

        <div className="flex items-center gap-4">

          <div className="text-right">
            <p className="font-semibold text-gray-800">
              {user?.name || "User"}
            </p>

            <p className="text-sm text-gray-500">
              {user?.email || ""}
            </p>
          </div>

          <div
            className="
              w-12
              h-12
              rounded-full
              bg-green-600
              text-white
              flex
              items-center
              justify-center
              font-bold
              text-lg
            "
          >
            {initials}
          </div>

        </div>

      </div>

    </div>
  );
};

export default DashboardNavbar;