import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminMessages() {
  const [pairs, setPairs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedPair, setSelectedPair] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPairs = async () => {
      try {
        const res = await axios.get("https://matrimon.onrender.com/api/messages/pairs", {
          withCredentials: true,
        });
        setPairs(res.data);
      } catch (err) {
        console.error("Failed to fetch chat pairs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPairs();
  }, []);

  const viewMessages = async (user1Id, user2Id) => {
    try {
      const res = await axios.get(
        `https://matrimon.onrender.com/api/messages/admin/${user1Id}/${user2Id}`,
        { withCredentials: true }
      );
      setMessages(res.data);
      setSelectedPair({ user1Id, user2Id });
      setShowModal(true);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setMessages([]);
    setSelectedPair(null);
  };

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <h2 className="text-2xl font-bold text-center mb-6">📨 Admin Chat Monitoring</h2>

      {loading ? (
        <div className="text-center mt-10">⏳ Loading chat pairs...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>👤 User A</th>
                <th>👤 User B</th>
                <th>🔍 Action</th>
              </tr>
            </thead>
            <tbody>
              {pairs.map((pair, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{pair.userA?.name || "Deleted User"}</td>
                  <td>{pair.userB?.name || "Deleted User"}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => viewMessages(pair.userA._id, pair.userB._id)}
                    >
                      View Chat
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Chat Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-3xl max-h-[80vh] overflow-y-auto relative">
            <h3 className="text-xl font-bold mb-4">💬 Chat Between Users</h3>
            <button
              onClick={closeModal}
              className="btn btn-sm btn-error absolute top-2 right-2"
            >
              ❌ Close
            </button>

            <div className="space-y-3">
              {messages.length === 0 ? (
                <p>No messages exchanged yet.</p>
              ) : (
                messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded border ${
                      msg.sender._id === selectedPair.user1Id
                        ? "bg-blue-100"
                        : "bg-green-100"
                    }`}
                  >
                    <div className="text-sm font-bold">{msg.sender?.name}</div>
                    <div>{msg.text}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(msg.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
