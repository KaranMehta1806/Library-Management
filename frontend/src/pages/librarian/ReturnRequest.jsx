import React, { useEffect, useState } from "react";
import axios from "axios";
import { Server_URL } from "../../utils/config";
import { showErrorToast, showSuccessToast } from "../../utils/toasthelper";


export default function ReturnRequest() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const url = Server_URL + "librarian/returnrequest"
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
          }
        });
        console.log(res);
        setRequests(res.data.requests);
      } catch (err) {
        console.error("Error fetching requests", err);
      }
    };

    fetchRequests();
  }, []);

  const approveRequest = async (id) => {
    try {
        const url = Server_URL + "librarian/approvereturnrequest/" + id;
      const response = await axios.put(url , {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      });
      showSuccessToast(response.data.message || "Book Return successfully!");
      setRequests(prev => prev.filter(req => req._id !== id));
    } catch (err) {
      console.error("Error approving request", err);
      showErrorToast("Failed to approve request");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📚 Return Book Requests</h2>

      {requests.length === 0 ? (
        <div className="alert alert-info">No pending requests.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-primary">
              <tr>
                <th>User Name</th>
                <th>Book Title</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th>Fine</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id}>
                  <td>{req.userId?.name || "N/A"}</td>
                  <td>{req.bookId?.title || "N/A"}</td>
                  <td>{new Date(req.issueDate).toLocaleDateString()}</td>
                  <td>{new Date(req.dueDate).toLocaleDateString()}</td>
                  <td><span >₹{req.fine}</span></td>
                  <td><span className="badge bg-warning">{req.status}</span></td>
                  <td>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => approveRequest(req._id)}
                    >
                      ✅ Approve
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
}
