import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="w-64 h-screen bg-gray-800 p-4 flex flex-col text-white">
      {/* Top */}
      <div>
        <h3 className="text-xl font-semibold mb-6 text-white">
          Payroll
        </h3>

        <ul className="space-y-3">
          <li className="cursor-pointer hover:text-gray-300">
            Dashboard
          </li>
          <li className="cursor-pointer hover:text-gray-300">
            Users
          </li>
          <li className="cursor-pointer hover:text-gray-300">
            Reports
          </li>
        </ul>
      </div>

      {/* Push logout to bottom */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
