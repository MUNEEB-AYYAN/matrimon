import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance"; // ✅ use custom instance
import { useAuth } from "../context/AuthContext";

const CLOUD_NAME = "dcgbuq0lu";
const UPLOAD_PRESET = "matrimony_unsigned";

export default function Register() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "male",
    password: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [imgPreview, setImgPreview] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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
      const res = await axiosInstance.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      setForm((prev) => ({ ...prev, image: res.data.secure_url }));
      setImgPreview(res.data.secure_url);
    } catch (err) {
      console.error("Image upload failed:", err);
      setErrorMsg("Image upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await axiosInstance.post("/auth/register", form, {
        withCredentials: true,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);

      navigate("/dashboard");
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Register failed");
      console.log(err.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4 text-base-content">
      <div className="bg-base-100 shadow-md rounded-lg p-6 w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">📝 Register</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />
          <input
            name="phone"
            type="text"
            placeholder="Phone"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />
          <input
            name="age"
            type="number"
            placeholder="Age"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />

          <select
            name="gender"
            className="select select-bordered w-full"
            onChange={handleChange}
            value={form.gender}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
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
              alt="preview"
              className="w-20 h-20 rounded-full mx-auto"
            />
          )}

          {errorMsg && <div className="text-error text-sm text-center">{errorMsg}</div>}

          <button className="btn btn-primary w-full" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
