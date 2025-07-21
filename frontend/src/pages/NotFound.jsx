// src/pages/NotFound.jsx
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center p-4">
      <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl mb-6">Oops! Page not found.</p>
      <Link
        to="/"
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-focus transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
