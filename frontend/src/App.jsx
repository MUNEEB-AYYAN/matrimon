import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useAuth } from "./context/AuthContext";
import AdminRoute from "./components/AdminRoute";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import CreateProfile from "./pages/CreateProfile";
import EditProfile from "./pages/EditProfile";
import Browse from "./pages/Browse";
import Chat from "./pages/Chat";
import Shortlist from "./pages/Shortlist";
import Shortlisted from "./pages/Shortlisted";
import Settings from "./pages/SettingPage";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUserManagement from "./pages/AdminUserManagement";
import AdminChatMonitor from "./pages/AdminChatMonitor";
import VerifyEmail from "./pages/VerifyEmail";
import ReportChat from "./pages/ReportChat"; // ✅ Added this
import ServicePage from "./pages/ServicePage";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Login />;
};

export default function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <Routes>
          {/* ✅ Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ✅ Authenticated Routes with Layout */}
          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            {/* <Route path="/home" element={<Home />} /> */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/shortlist" element={<Shortlist />} />
            <Route path="/shortlisted" element={<Shortlisted />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/create-profile" element={<CreateProfile />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/report-user/:userId" element={<ReportChat />} /> {/* ✅ Added route */}
            <Route path="*" element={<NotFound />} />
            <Route path="/service" element={<ServicePage />} />

          </Route>

          {/* ✅ Admin-only Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AdminUserManagement />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/chat-monitor"
            element={
              <AdminRoute>
                <AdminChatMonitor />
              </AdminRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}
