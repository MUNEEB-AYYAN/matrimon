import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Profile from "./Profile";

export default function Shortlist() {
  const { user } = useAuth();
  const [shortlisted, setShortlisted] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchShortlisted = async () => {
    try {
      const res = await axios.get("https://matrimon.onrender.com/api/users/shortlisted", {
        withCredentials: true,
      });
      setShortlisted(res.data);
    } catch (err) {
      console.error("Error fetching shortlisted:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShortlisted();
  }, []);

  if (loading) return <div className="text-center mt-10">⏳ Loading...</div>;

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <h2 className="text-2xl font-bold text-center mb-6">❤️ My Shortlisted Profiles</h2>

      {shortlisted.length === 0 ? (
        <div className="text-center text-gray-500">No users shortlisted yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shortlisted.map((p) => (
            <div key={p._id} className="bg-white shadow rounded p-4">
              <img
  src={Profile.image || "https://via.placeholder.com/150?text=No+Image"}
  alt="Profile"
  className="w-24 h-24 rounded-full border object-cover"
  onError={(e) => {
    if (e.target.src !== "https://via.placeholder.com/150?text=No+Image") {
      e.target.src = "https://via.placeholder.com/150?text=No+Image";
    }
  }}
/>

              <h3 className="text-xl mt-2 font-semibold">{p.user?.name}</h3>
              <p className="text-sm text-gray-600">
                {p.age} yrs | {p.gender} | {p.religion}
              </p>
              <p className="text-sm text-gray-600">{p.location}</p>
              <p className="text-sm mt-2">{p.bio}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
