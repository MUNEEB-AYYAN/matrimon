import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CLOUD_NAME = "dcgbuq0lu";
const UPLOAD_PRESET = "matrimony_unsigned";

export default function CreateProfile() {
  const { token, fetchProfile } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    age: "",
    gender: "male",
    religion: "",
    location: "",
    bio: "",
    image: "",
    preferences: {
      gender: "female",
      religion: "",
      location: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [imgPreview, setImgPreview] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("preferences.")) {
      const key = name.split(".")[1];
      setForm({
        ...form,
        preferences: {
          ...form.preferences,
          [key]: value,
        },
      });
    } else {
      setForm({ ...form, [name]: value });
    }
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
      const imageUrl = res.data.secure_url;
      setForm({ ...form, image: imageUrl });
      setImgPreview(imageUrl);
    } catch (err) {
      console.error("Image upload failed:", err);
      setError("Image upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/profile",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Profile created successfully.");
      fetchProfile(); // ✅ Refresh context with profile data
      navigate("/dashboard");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong";
      console.error("Profile creation error:", errorMsg);

      if (errorMsg === "Profile already exists") {
        navigate("/dashboard");
        return;
      }

      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="bg-base-100 text-base-content p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">🧑‍💼 Create Your Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            name="age"
            placeholder="Enter your age"
            className="input input-bordered w-full"
            value={form.age}
            onChange={handleChange}
            required
          />

          <select
            name="preferences.gender"
            className="select select-bordered w-full"
            value={form.preferences.gender}
            onChange={handleChange}
            required
          >
            <option value="male">Looking for Male</option>
            <option value="female">Looking for Female</option>
          </select>

          <textarea
            name="bio"
            rows="3"
            placeholder="Write a short bio..."
            className="textarea textarea-bordered w-full"
            value={form.bio}
            onChange={handleChange}
            required
          />

          <select
            name="religion"
            className="select select-bordered w-full"
            value={form.religion}
            onChange={handleChange}
            required
          >
            <option value="">Select Religion</option>
            <option value="Hindu">Hindu</option>
            <option value="Muslim">Muslim</option>
            <option value="Christian">Christian</option>
            <option value="Sikh">Sikh</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="text"
            name="location"
            placeholder="Enter your city or state"
            className="input input-bordered w-full"
            value={form.location}
            onChange={handleChange}
            required
          />

          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={handleImageUpload}
          />

          {imgPreview && (
            <img
              src={imgPreview}
              alt="Preview"
              className="w-24 h-24 rounded-md border object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/150?text=No+Image";
              }}
            />
          )}

          {error && <p className="text-error text-sm text-center">{error}</p>}
          {success && <p className="text-success text-sm text-center">{success}</p>}

          <button className="btn btn-primary w-full" disabled={loading}>
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
