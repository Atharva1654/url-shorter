import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold tracking-wide">
        URL Shortener
      </Link>

      <div className="flex items-center gap-6">
        {user ? (
          <>
            <span className="text-gray-300">Hi, {user.name}</span>
            <button
              className="bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-md"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="hover:text-blue-400 transition" to="/login">
              Login
            </Link>
            <Link className="hover:text-blue-400 transition" to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
