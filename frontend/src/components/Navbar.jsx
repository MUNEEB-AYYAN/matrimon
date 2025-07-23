import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="drawer z-50">
      <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex items-center justify-between px-4 py-2 bg-base-100 shadow-md sticky top-0 backdrop-blur-md z-50">
        {/* Left: Brand */}
        <div className="flex items-center gap-2">
          <label htmlFor="nav-drawer" className="lg:hidden cursor-pointer">
            <FaBars size={22} />
          </label>
          <Link to="/" className="text-2xl text-pink-600 font-bold ">
            💍 NikahForever
          </Link>
        </div>

        {/* Center: Desktop Menu */}
        <div className="hidden lg:flex gap-4 items-center">
          {user && (
            <>
              <Link to="/dashboard" className="btn btn-ghost text-pink-600 btn-sm rounded-full">
                Dashboard
              </Link>
              <Link to="/browse" className="btn btn-ghost text-pink-600 btn-sm rounded-full">
                Browse
              </Link>
              <Link to="/chat" className="btn btn-ghost text-pink-600 btn-sm rounded-full">
                Chat
              </Link>
              <Link to="/shortlisted" className="btn btn-ghost text-pink-600 btn-sm rounded-full">
                Shortlisted
              </Link>
            </>
          )}
        </div>

        {/* Right: Auth & Theme */}
        <div className="flex items-center gap-4">
          {user ? (
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <FaUserCircle
                size={28}
                className="text-gray-600 hover:text-primary cursor-pointer transition"
              />
              {dropdownOpen && (
                <div className="absolute right-0 top-6 w-48 bg-base-100 border rounded-lg shadow-md z-50 overflow-hidden animate-fade-in">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-base-200">
                    👤 Profile
                  </Link>
                  <Link to="/settings" className="block px-4 py-2 hover:bg-base-200">
                    ⚙️ Settings
                  </Link>
                  <label className="flex items-center justify-between px-4 py-2 hover:bg-base-200 cursor-pointer">
                    🌓 Theme
                    <input
                      type="checkbox"
                      className="toggle toggle-sm"
                      onChange={toggleTheme}
                      checked={theme === "dark"}
                    />
                  </label>

                  {/* Admin-only links */}
                  {user?.role === "admin" && (
                    <>
                      <Link to="/admin/chat-monitor" className="block px-4 py-2 hover:bg-base-200">
                        🛡️ Admin Monitor
                      </Link>
                      <Link to="/admin/users" className="block px-4 py-2 hover:bg-base-200">
                        👥 Manage Users
                      </Link>
                    </>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-sm rounded-full">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm rounded-full">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Drawer Side Menu (Mobile Only) */}
      <div className="drawer-side z-50">
        <label htmlFor="nav-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-64 bg-base-200 min-h-full space-y-1">
          <li className="text-xl font-bold mb-4">Navigation</li>
          {user ? (
            <>
              <li>
                <NavLink to="/dashboard" className={({ isActive }) =>
                  `btn btn-ghost btn-sm rounded-full ${isActive ? "bg-pink-600 text-white" : ""}`}>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/browse" className={({ isActive }) =>
                  `btn btn-ghost btn-sm rounded-full ${isActive ? "bg-pink-600 text-white" : ""}`}>
                  Browse
                </NavLink>
              </li>
              <li>
                <NavLink to="/chat" className={({ isActive }) =>
                  `btn btn-ghost btn-sm rounded-full ${isActive ? "bg-pink-600 text-white" : ""}`}>
                  Chat
                </NavLink>
              </li>
              <li>
                <NavLink to="/shortlisted" className={({ isActive }) =>
                  `btn btn-ghost btn-sm rounded-full ${isActive ? "bg-pink-600 text-white" : ""}`}>
                  Shortlisted
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile" className={({ isActive }) =>
                  `btn btn-ghost btn-sm rounded-full ${isActive ? "bg-pink-600 text-white" : ""}`}>
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/settings" className={({ isActive }) =>
                  `btn btn-ghost btn-sm rounded-full ${isActive ? "bg-pink-600 text-white" : ""}`}>
                  Settings
                </NavLink>
              </li>

              {/* Admin-only links */}
              {user?.role === "admin" && (
                <>
                  <li>
                    <NavLink to="/admin/chat-monitor" className={({ isActive }) =>
                      `btn btn-ghost btn-sm rounded-full ${isActive ? "bg-primary text-white" : ""}`}>
                      Admin Monitor
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin/users" className={({ isActive }) =>
                      `btn btn-ghost btn-sm rounded-full ${isActive ? "bg-primary text-white" : ""}`}>
                      Manage Users
                    </NavLink>
                  </li>
                </>
              )}

              <li>
                <label className="flex justify-between items-center">
                  Theme
                  <input
                    type="checkbox"
                    className="toggle toggle-sm"
                    onChange={toggleTheme}
                    checked={theme === "dark"}
                  />
                </label>
              </li>
              <li>
                <button onClick={handleLogout} className="text-red-600 pl-20 font-semibold">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
