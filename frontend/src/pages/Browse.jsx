import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Browse = () => {
  const { user, token } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({gender: "",minAge: "",maxAge: "",});

  // Fetch profiles on mount
  useEffect(() => {
    const fetchProfiles = async () => {
      if (!token || !user) {
        console.warn("Token or user not found, skipping fetch.");
        return;
      }

      try {
        const response = await axios.get("https://matrimon.onrender.com/api/users/profiles/filtered", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfiles(response.data);
        setFiltered(response.data); // Start with all profiles
      } catch (err) {
        console.error("Failed to fetch profiles:", err.response?.data || err.message);
      }
    };

    fetchProfiles();
  }, [token, user]);

  // Filter handler
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Apply filters
  useEffect(() => {
    let updated = [...profiles];

    if (filters.gender) {
      updated = updated.filter((p) => p.gender === filters.gender);
    }

    if (filters.minAge) {
      updated = updated.filter((p) => p.age >= parseInt(filters.minAge));
    }

    if (filters.maxAge) {
      updated = updated.filter((p) => p.age <= parseInt(filters.maxAge));
    }

    setFiltered(updated);
  }, [filters, profiles]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Browse Profiles</h2>

      {/* Filter Controls */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <select
          name="gender"
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <input
          type="number"
          name="minAge"
          placeholder="Min Age"
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />

        <input
          type="number"
          name="maxAge"
          placeholder="Max Age"
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
      </div>

      {/* Profile Cards */}
      {filtered.length === 0 ? (
        <p>No profiles found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((profile) => (
            <div key={profile._id} className="border p-4 rounded shadow flex space-x-2">
              <div>
                <img src={profile.avatar || "https://via.placeholder.com/150"} alt={profile.name} 
                className="w-28 h-30 rounded-2xl mr-4" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{profile.name}</h3>
                <p>Age: {profile.age}</p>
                <p>Gender: {profile.gender}</p>
                <p>Bio: {profile.bio}</p>
                <p>Phone: {profile.phone}</p>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Browse;
