import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ReportUserModal = ({ userId, reportedName, onClose }) => {
  const [loading, setLoading] = useState(false);

  const handleReport = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token",res.data.token);
      const { data } = await axios.post(
        `/api/users/report/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(data.message);
      onClose();
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to report user. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Report User</h3>
        <p className="py-4">Are you sure you want to report <b>{reportedName}</b> for inappropriate behavior?</p>
        <div className="modal-action">
          <button onClick={onClose} className="btn btn-ghost">Cancel</button>
          <button
            onClick={handleReport}
            className="btn btn-error"
            disabled={loading}
          >
            {loading ? "Reporting..." : "Report"}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ReportUserModal;
