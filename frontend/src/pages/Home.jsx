import { Link } from "react-router-dom";
import weddingImg from "../assets/wedding.jpg"; // Make sure this image exists
import Profile from "./Profile";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center p-8">
      {/* Wedding Image */}
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


      <h1 className="text-4xl font-bold mb-4">💍 Matrimony Platform</h1>
      <p className="mb-6 text-lg">Find your perfect match today!</p>

      <div className="space-x-4">
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
        <Link to="/register" className="btn btn-secondary">
          Register
        </Link>
      </div>
    </div>
  );
}
