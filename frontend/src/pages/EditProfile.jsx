import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";

export default function EditProfile() {
  const [form, setForm] = useState({
    age: "",
    gender: "male",
    religion: "",
    location: "",
    bio: "",
    image: "",
  });
  const [imgPreview, setImgPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/profile/me", {
          withCredentials: true,
        });
        setForm(res.data);
        setImgPreview(res.data.image);
      } catch (err) {
        setErrorMsg("Failed to load profile",err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setImgPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const data = new FormData();
    Object.entries(form).forEach(([key, val]) => data.append(key, val));

    try {
      await axios.put("http://localhost:5000/api/users/profile", data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Profile updated!");
      navigate("/dashboard");
    } catch (err) {
      setErrorMsg("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center">✏️ Edit Profile</h2>

        {errorMsg && <div className="text-red-500 text-sm">{errorMsg}</div>}

        <input
          name="age"
          type="number"
          min="18"
          placeholder="Age"
          className="input input-bordered w-full"
          value={form.age}
          onChange={handleChange}
          required
        />
        <select
          name="gender"
          className="select select-bordered w-full"
          value={form.gender}
          onChange={handleChange}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          name="religion"
          type="text"
          placeholder="Religion"
          className="input input-bordered w-full"
          value={form.religion}
          onChange={handleChange}
          required
        />
        <input
          name="location"
          type="text"
          placeholder="Location"
          className="input input-bordered w-full"
          value={form.location}
          onChange={handleChange}
          required
        />
        <textarea
          name="bio"
          placeholder="Bio"
          className="textarea textarea-bordered w-full"
          value={form.bio}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full"
          onChange={handleImage}
        />

        {imgPreview && (
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

        )}

        <div className="flex justify-between items-center gap-3">
          <button
            type="button"
            className="btn btn-outline w-1/2"
            onClick={() => navigate("/dashboard")}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary w-1/2"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
