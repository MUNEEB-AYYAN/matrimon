import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ChatBox = ({ chatUser, loggedInUser, token, socket }) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [isReporting, setIsReporting] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch past messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/messages/${chatUser._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    };

    if (chatUser) {
      fetchMessages();
    }
  }, [chatUser, token]);

  // Socket listeners
  useEffect(() => {
    socket.emit("join", loggedInUser._id);

    socket.on("receiveMessage", (msg) => {
      if (msg.from === chatUser._id || msg.to === chatUser._id) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [chatUser, loggedInUser, socket]);

  const sendMessage = async () => {
    if (!newMsg.trim()) return;

    const messageData = {
      to: chatUser._id,
      text: newMsg,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/messages",
        messageData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      socket.emit("sendMessage", res.data);
      setMessages([...messages, res.data]);
      setNewMsg("");
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  const handleReportUser = async () => {
    if (!window.confirm("Are you sure you want to report this user?")) return;

    setIsReporting(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/report",
        {
          reportedUserId: chatUser._id,
          reason: "Inappropriate chat behavior", // Optional: Replace with a form/modal later
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(res.data.message || "User reported successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to report the user."
      );
    } finally {
      setIsReporting(false);
    }
  };

  return (
    <div className="border rounded p-4 h-[500px] flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{chatUser?.name}</h3>
        <button
          onClick={handleReportUser}
          disabled={isReporting}
          className="text-sm bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          {isReporting ? "Reporting..." : "🚩 Report User"}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`p-2 rounded ${
              msg.from === loggedInUser._id
                ? "bg-blue-100 text-right"
                : "bg-gray-100"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-2 flex gap-2">
        <input
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          className="border rounded w-full px-2 py-1"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
