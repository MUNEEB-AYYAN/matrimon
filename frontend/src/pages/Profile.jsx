import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const CLOUD_NAME = "dcgbuq0lu";
const UPLOAD_PRESET = "matrimony_unsigned";

export default function Profile() {
  const { user, fetchProfile } = useAuth();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    age: "",
    gender: "",
    image: "",
  });

  const [password, setPassword] = useState("");
  const [imgPreview, setImgPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        age: user.age || "",
        gender: user.gender || "male",
        image: user.image || "",
      });
      setImgPreview(user.image || "");
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      setLoading(true);
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      setForm({ ...form, image: res.data.secure_url });
      setImgPreview(res.data.secure_url);
    } catch (err) {
      alert("Image upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await axios.put(
        "https://matrimon.onrender.com//api/users/profile",
        { ...form, password },
        { withCredentials: true }
      );
      setMsg("✅ Profile updated successfully.");
      fetchProfile();
    } catch (err) {
      setMsg(err.response?.data?.message || "Update failed.");
    }
  };

  if (!user) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-base-200 flex justify-center py-10 px-4">
      <div className="bg-base-100 text-base-content p-6 rounded-xl shadow-lg w-full max-w-lg space-y-4">
        <h2 className="text-2xl font-bold text-center">👤 Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="input input-bordered w-full"
            required
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="input input-bordered w-full"
            required
          />

          <input
            name="age"
            value={form.age}
            onChange={handleChange}
            type="number"
            placeholder="Age"
            className="input input-bordered w-full"
            required
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={handleImageUpload}
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

          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password (optional)"
            className="input input-bordered w-full"
          />

          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </button>

          {msg && (
            <p
              className={`text-sm text-center ${
                msg.includes("success") ? "text-success" : "text-error"
              }`}
            >
              {msg}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
