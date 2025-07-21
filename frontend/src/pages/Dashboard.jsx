import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(""); // ✅ fallback handling

  // ✅ Fetch profile from server directly
  const fetchMyProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/profile/me", {
        withCredentials: true,
      });

      if (res.data) {
        console.log("Fetched Profile:", res.data);
        setProfile(res.data);
        setImageSrc(res.data.image || "https://via.placeholder.com/150?text=No+Image");
      } else {
        navigate("/create-profile");
      }
    } catch (err) {
      console.error("Error fetching profile:", err.message);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyProfile(); // ✅ always check cookie/session withCredentials
  }, []);

  const handleLogout = () => {
    logout(); // clear user context and cookies
    navigate("/login"); // ✅ redirect to login after logout
  };

  if (loading) return <div className="text-center mt-10">⏳ Loading profile...</div>;
  if (!profile) return null;

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="bg-base-100 shadow-xl rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-primary text-center">👤 My Profile</h2>

        <div className="flex flex-col items-center space-y-3 text-base-content">
          <img
            src={imageSrc}
            alt="Profile"
            className="w-24 h-24 rounded-full border object-cover"
            onError={() => {
              setImageSrc("https://via.placeholder.com/150?text=No+Image");
            }}
          />

          <h3 className="text-lg font-semibold">{profile.name || user?.name}</h3>
          <p className="text-sm opacity-70">{user?.email}</p>
          <p className="text-sm opacity-70">📞 {user?.phone || "N/A"}</p>

          <div className="divider my-2" />

          <p><strong>Age:</strong> {profile.age}</p>
          <p><strong>Gender:</strong> {profile.gender}</p>
          <p><strong>Bio:</strong> {profile.bio || "N/A"}</p>
          <p><strong>Religion:</strong> {profile.religion || "N/A"}</p>
          <p><strong>Location:</strong> {profile.location || "N/A"}</p>

          <div className="flex gap-3 mt-4">
            <button
              className="btn btn-sm btn-outline"
              onClick={() => navigate("/create-profile")}
            >
              ✏️ Edit Profile
            </button>
            <button
              className="btn btn-sm btn-outline btn-error"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
