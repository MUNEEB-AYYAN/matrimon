// src/pages/AdminUserManagement.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const AdminUserManagement = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBlockUnblock = async (id, isBlocked) => {
    try {
      const url = isBlocked
        ? `/api/admin/unblock/${id}`
        : `/api/admin/block/${id}`;
      await axios.put(url, {}, { headers: { Authorization: `Bearer ${token}` } });
      fetchUsers(); // refresh
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure to delete this user?")) return;
    try {
      await axios.delete(`/api/admin/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers(); // refresh
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin User Management</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border rounded shadow">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.gender}</td>
                  <td>
                    {u.isBlocked ? (
                      <span className="text-red-500 font-semibold">Blocked</span>
                    ) : (
                      <span className="text-green-600 font-semibold">Active</span>
                    )}
                  </td>
                  <td className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleBlockUnblock(u._id, u.isBlocked)}
                      className={`px-3 py-1 rounded text-white ${
                        u.isBlocked ? "bg-green-500" : "bg-yellow-500"
                      }`}
                    >
                      {u.isBlocked ? "Unblock" : "Block"}
                    </button>
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUserManagement;
