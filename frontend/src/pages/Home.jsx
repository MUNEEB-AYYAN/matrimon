import { Link } from "react-router-dom";
import weddingImg from "../assets/wedding.jpg"; // Ensure this exists

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center p-8">
      {/* Wedding/Profile Image */}
      <img
        src={weddingImg || "https://via.placeholder.com/150?text=No+Image"}
        alt="Wedding Theme"
        className="w-[90vh] h-[60vh] border object-cover mb-6"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/150?text=No+Image";
        }}
      />

      <h1 className="text-4xl font-bold mb-4">💍 Matrimony Platform</h1>
      <p className="mb-6 text-lg">Find your perfect match today!</p>

      <div className="flex gap-4">
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
