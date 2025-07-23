import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import ChatBox from "../components/ChatBox";
import { io } from "socket.io-client";

const socket = io("https://matrimon.onrender.com"); // ✅ Change this to your deployed backend if needed

const Chat = () => {
  const { user, token } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [chatUser, setChatUser] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    if (!token || !user?._id) return;

    const fetchProfiles = async () => {
      try {
        const res = await axios.get("https://matrimon.onrender.com/api/users/profiles", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("✅ All fetched profiles:", res.data);

        const others = res.data.filter((p) => {
          const id = p?._id || p?.user?._id;
          return id !== user._id;
        });

        console.log("✅ Filtered other users:", others);
        setProfiles(others);
      } catch (err) {
        console.error("❌ Error fetching profiles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [token, user]);

  const handleSelectChatUser = (selectedUser) => {
    console.log("💬 Selected chat user:", selectedUser);
    setChatUser(selectedUser);
  };

  const filteredProfiles = profiles.filter((p) => {
  const name = p?.profile?.name || p?.name || p?.user?.name || "";
  console.log("🔍 Name being checked in filter:", name);
  return name.toLowerCase().includes(search.toLowerCase());
});


  return (
  <div className="p-4 max-w-3xl mx-auto bg-base-100 text-base-content min-h-screen">
    <h2 className="text-2xl font-bold mb-4">Start a Chat</h2>

    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search user by name"
      className="input input-bordered w-full mb-4"
    />

    {loading ? (
      <p className="text-primary">Loading users...</p>
    ) : filteredProfiles.length === 0 ? (
      <div className="text-base-content border border-base-300 p-3 rounded bg-base-200">
        No users found. Try changing search or check backend.
      </div>
    ) : (
      <div className="space-y-3">
        {filteredProfiles.map((p, index) => {
          const name = p?.profile?.name || p?.name || p?.user?.name || "Unnamed";
          const email = p?.profile?.email || p?.email || p?.user?.email || "No email";
          const id = p?._id || p?.user?._id || index;

          if (!name || !email) return null;

          return (
            <div key={id} className="border border-base-300 p-3 rounded bg-base-200 shadow">
              <p className="font-semibold">{name}</p>
              <p className="text-sm opacity-70">{email}</p>
              <button
                onClick={() => handleSelectChatUser(p)}
                className="btn text-white bg-pink-600 mt-2"
              >
                Message
              </button>
            </div>
          );
        })}
      </div>
    )}

    {chatUser && (
      <div className="border-t border-base-300 mt-6 pt-4">
        <h3 className="text-lg font-bold mb-2">
          Chatting with {chatUser?.profile?.name || chatUser?.name || "User"}
        </h3>
        <ChatBox
          chatUser={chatUser}
          loggedInUser={user}
          token={token}
          socket={socket}
        />
      </div>
    )}
  </div>
);

};

export default Chat;
