import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function SettingsPage() {
  const { logout } = useAuth();
  const [theme, setTheme] = useState("light");


  useEffect(() => {
    const stored = localStorage.getItem("theme") || "light";
    setTheme(stored);
    document.documentElement.setAttribute("data-theme", stored);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
  <div className="min-h-screen bg-base-200 p-4 flex items-center justify-center">
    <div className="bg-base-100 shadow-xl rounded-xl p-6 w-full max-w-sm space-y-6 text-center">
      <h2 className="text-2xl font-bold text-pink-600">⚙️ Settings</h2>

      <div className="flex items-center justify-between">
        <span className="text-base-content">🌙 Toggle Theme</span>
        <button className="btn btn-sm btn-outline" onClick={toggleTheme}>
          {theme === "light" ? "Switch to Dark" : "Switch to Light"}
        </button>
      </div>

      <div className="divider">OR</div>

      <button className="btn btn-error w-full" onClick={logout}>
        🔓 Logout
      </button>
    </div>
  </div>
);

}
