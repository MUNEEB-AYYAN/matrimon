import { useEffect, useState } from "react";
import axios from "axios";
import Profile from "./Profile";

export default function Shortlisted() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchShortlisted = async () => {
    try {
      const res = await axios.get("https://matrimon.onrender.com//api/users/shortlisted", {
        withCredentials: true,
      });
      setUsers(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch shortlisted users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShortlisted();
  }, []);

  if (loading) return <div className="text-center mt-10">⏳ Loading your shortlisted users...</div>;

  if (users.length === 0)
    return <div className="text-center mt-10 text-lg">🙁 You haven’t shortlisted anyone yet.</div>;

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <h2 className="text-2xl font-bold text-center mb-6">❤️ My Shortlisted Users</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((u) => (
          <div key={u._id} className="bg-white shadow rounded p-4">
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

            <h3 className="text-xl mt-2 font-semibold">{u.name}</h3>
            <p className="text-sm text-gray-600">
              {u.age} yrs | {u.gender} | {u.religion}
            </p>
            <p className="text-sm text-gray-600">{u.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
