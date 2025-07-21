import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        withCredentials: true,
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleBlock = async (userId, isBlocked) => {
    try {
      const url = isBlocked
        ? `http://localhost:5000/api/admin/unblock/${userId}`
        : `http://localhost:5000/api/admin/block/${userId}`;
      await axios.put(url, {}, { withCredentials: true });
      fetchUsers();
    } catch (err) {
      console.error("Failed to toggle block:", err);
    }
  };

  const deleteUser = async (userId) => {
    if (!confirm("Are you sure to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/delete/${userId}`, {
        withCredentials: true,
      });
      fetchUsers();
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  useEffect(() => {
    if (user?.isAdmin) {
      fetchUsers();
    }
  }, [user]);

  if (!user?.isAdmin) {
    return <div className="text-center mt-10 text-red-500">❌ Access denied</div>;
  }

  if (loading) return <div className="text-center mt-10">⏳ Loading users...</div>;

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <h2 className="text-2xl font-bold text-center mb-6">👑 Admin Dashboard</h2>
      <div className="overflow-x-auto">
        <table className="table w-full bg-white shadow rounded">
          <thead>
            <tr>
              <th>#</th>
              <th>👤 Name</th>
              <th>📧 Email</th>
              <th>📱 Phone</th>
              <th>Admin</th>
              <th>Status</th>
              <th>⚙️ Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u._id}>
                <td>{i + 1}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>{u.isAdmin ? "✅" : "❌"}</td>
                <td>{u.isBlocked ? "🚫 Blocked" : "✅ Active"}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => toggleBlock(u._id, u.isBlocked)}
                    className={`btn btn-xs ${
                      u.isBlocked ? "btn-success" : "btn-warning"
                    }`}
                  >
                    {u.isBlocked ? "Unblock" : "Block"}
                  </button>
                  <button
                    onClick={() => deleteUser(u._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
