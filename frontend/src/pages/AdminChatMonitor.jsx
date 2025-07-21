import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { format } from "date-fns";

const AdminChatMonitor = () => {
  const { user } = useAuth();
  const [messagePairs, setMessagePairs] = useState([]);
  const [selectedPair, setSelectedPair] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchPairs = async () => {
      try {
        const { data } = await axios.get("/api/messages/pairs", {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        setMessagePairs(data);
      } catch (err) {
        console.error("Failed to fetch message pairs", err);
      }
    };
    fetchPairs();
  }, [user?.token]);

  const handlePairClick = async (user1, user2) => {
    setSelectedPair({ user1, user2 });
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/admin/messages/${user1._id}/${user2._id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch messages", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">📋 Admin Chat Monitor</h2>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Sidebar - User Pairs */}
        <div className="w-full md:w-1/3 border-r border-gray-200 dark:border-gray-700 p-4 space-y-2 overflow-y-auto bg-base-200 rounded">
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Chat Pairs</h2>
          {messagePairs.length === 0 && <p className="text-gray-500">No chat pairs found.</p>}
          {messagePairs.map(([user1, user2], index) => {
            const isSelected =
              selectedPair &&
              ((selectedPair.user1._id === user1._id && selectedPair.user2._id === user2._id) ||
               (selectedPair.user1._id === user2._id && selectedPair.user2._id === user1._id));

            return (
              <button
                key={index}
                onClick={() => handlePairClick(user1, user2)}
                className={`w-full text-left px-4 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-700 ${
                  isSelected ? "bg-blue-200 dark:bg-gray-700 font-semibold" : ""
                }`}
              >
                {user1.name} & {user2.name}
              </button>
            );
          })}
        </div>

        {/* Messages View */}
        <div className="w-full md:w-2/3 bg-base-200 p-4 rounded overflow-y-auto h-[70vh]">
          <h3 className="text-lg font-semibold mb-2">Messages</h3>
          {loading ? (
            <p>Loading messages...</p>
          ) : messages.length === 0 ? (
            <p className="text-gray-500">Select a chat pair to view messages.</p>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg shadow-sm text-sm whitespace-pre-wrap ${
                    msg.sender === selectedPair?.user1._id ? "bg-blue-100" : "bg-green-100"
                  }`}
                >
                  <div className="font-medium text-gray-800 mb-1">
                    {msg.sender === selectedPair?.user1._id ? selectedPair.user1.name : selectedPair.user2.name}
                  </div>
                  <div>{msg.text}</div>
                  <div className="text-xs text-gray-500 text-right">
                    {format(new Date(msg.createdAt), "dd MMM yyyy hh:mm a")}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminChatMonitor;
