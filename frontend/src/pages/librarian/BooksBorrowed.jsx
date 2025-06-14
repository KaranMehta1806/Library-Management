import React, { useEffect, useState } from "react";
import axios from "axios";
import { Server_URL } from "../../utils/config";

export default function BooksBorrowed() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const url = Server_URL + "librarian/bookissued"
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

  useEffect(() => {
    fetchRequests();
  }, []);

  const approveRequest = async (id) => {
    try {
      const url = Server_URL + "librarian/approverequest/" + id;
      const response = await axios.put(url, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      });
  
      
      alert(response.data.message || "Book issued successfully!");
      fetchRequests();
    } catch (err) {
      if (err.response) {
        const message = err.response.data?.error || "Something went wrong";
        alert( message);
      } else {
       
        alert("Network error: " + err.message);
      }
      console.error("Error approving request:", err);
    }
  };
  

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📚 Books Issued</h2>

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
              
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id}>
                  <td>{req.userId?.name || "N/A"}</td>
                  <td>{req.bookId?.title || "N/A"}</td>
                  <td>{new Date(req.issueDate).toLocaleDateString()}</td>
                  <td>{new Date(req.dueDate).toLocaleDateString()}</td>
                 
                  <td><span className="badge bg-warning">{req.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
