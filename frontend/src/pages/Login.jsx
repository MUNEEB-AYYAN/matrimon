// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// // import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import axiosInstance from "../../utils/axiosInstance";

// export default function Login() {
//   const { setUser, setToken } = useAuth();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({ email: "", password: "" });
//   const [errorMsg, setErrorMsg] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");
//     setLoading(true);

//     try {
//       const res = await axiosInstance.post("/auth/login",form,
//         { withCredentials: true }
//       );

//       // ✅ Save to localStorage
//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       localStorage.setItem("token", res.data.token);

//       // ✅ Set Axios default Authorization header
//       // axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;

//       // ✅ Set in Context
//       setUser(res.data.user);
//       setToken(res.data.token);

//       navigate("/dashboard");
//     } catch (err) {
//       setErrorMsg(err.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
//       <div className="card w-full max-w-md shadow-2xl bg-base-100">
//         <div className="card-body space-y-4">
//           <h2 className="text-3xl font-bold text-center text-primary">
//             🔐 Welcome Back
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-3">
//             <input
//               name="email"
//               type="email"
//               placeholder="Email"
//               className="input input-bordered w-full"
//               onChange={handleChange}
//               required
//             />
//             <input
//               name="password"
//               type="password"
//               placeholder="Password"
//               className="input input-bordered w-full"
//               onChange={handleChange}
//               required
//             />

//             {errorMsg && <div className="text-error text-sm">{errorMsg}</div>}

//             <button className="btn btn-primary w-full" disabled={loading}>
//               {loading ? "Logging in..." : "Login"}
//             </button>

//             <p className="text-center">
//               Don't have an account?{" "}
//               <Link to="/register" className="text-blue-500 font-bold">
//                 Register
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";

export default function Login() {
  const { setUser, setToken } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await axiosInstance.post("/auth/login",form,
        { withCredentials: true }
      );

      // ✅ Save to localStorage
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      // ✅ Set Axios default Authorization header
      // axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;

      // ✅ Set in Context
      setUser(res.data.user);
      setToken(res.data.token);

      navigate("/dashboard");
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <div className="card-body space-y-4">
          <h2 className="text-3xl font-bold text-center text-primary">
            🔐 Welcome Back
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              onChange={handleChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              onChange={handleChange}
              required
            />

            {errorMsg && <div className="text-error text-sm">{errorMsg}</div>}

            <button className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500 font-bold">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
