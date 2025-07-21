// src/pages/ReportChat.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ReportChat = () => {
  const { userId } = useParams(); // user you're reporting
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const navigate = useNavigate();

  const handleReport = async (e) => {
    e.preventDefault();
    if (!reason) return toast.error("Please select a reason");
    try {
      const { data } = await axios.post(`/api/report`, {
        reportedUserId: userId,
        reason,
        details,
      });
      toast.success(data.message);
      navigate("/chat");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto bg-white dark:bg-base-100 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Report Chat</h2>
      <form onSubmit={handleReport} className="space-y-4">
        <div>
          <label className="block mb-1">Reason for reporting</label>
          <select
            className="select select-bordered w-full"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            <option value="">Select Reason</option>
            <option value="abusive">Abusive Language</option>
            <option value="spam">Spam</option>
            <option value="harassment">Harassment</option>
            <option value="fake">Fake Profile</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Additional Details</label>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Explain the issue..."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-error w-full">
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default ReportChat;