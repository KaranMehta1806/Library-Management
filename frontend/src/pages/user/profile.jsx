import { useEffect, useState } from "react";
import axios from "axios";
import { Server_URL } from "../../utils/config";
import "./profile.css";
import { getAuthToken } from "../../utils/auth";
import { showErrorToast, showSuccessToast } from "../../utils/toasthelper";

function ProfilePage() {
  const [user, setUser] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [issuedRequests, setIssuedRequests] = useState([]);
  const [returnRequests, setReturnRequests] = useState([]);

  const fetchIssuedBooks = async () => {
    try {
      const url = Server_URL + "books/issued";
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
      const books = response.data.issuedBooks || [];
      setAllBooks(books);
      setIssuedBooks(books.filter(b => b.status === "Issued"));
      setIssuedRequests(books.filter(b => b.status === "Requested"));
      setReturnRequests(books.filter(b => b.status === "Requested Return"));
    } catch (error) {
      console.error("Error fetching issued books:", error.message);
    }
  };
  async function fetchProfile() {
    try {
      const response = await axios.get(`${Server_URL}users/profile`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
      
      const { user } = response.data;
      setUser(user);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }

  useEffect(() => {
    fetchProfile();
    fetchIssuedBooks();
  }, []);

  async function returnBook(borrowId) {
    try {
      const response = await axios.put(
        `${Server_URL}books/returnrequest/${borrowId}`,
        {},
        { headers: { Authorization: `Bearer ${getAuthToken()}` } }
      );
      showSuccessToast(response.data.message);
      fetchIssuedBooks();
    } catch (error) {
      console.error("Error returning book:", error);
      showErrorToast(error.response?.data?.message || "Something went wrong!");
    }
  }

  if (!user) return <p className="loading">Loading...</p>;

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-info card">
          <h1>{user.name}</h1>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>

        <div className="profile-sections">
          <div className="section-card issued-books">
            <h2>📚 Issued Books</h2>
            {issuedBooks.length === 0 ? (
              <p>No books currently issued.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Book Title</th>
                    <th>Issue Date</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Fine</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {issuedBooks.map((book) => (
                    <tr key={book._id}>
                      <td>{book.bookId.title}</td>
                      <td>{new Date(book.issueDate).toLocaleDateString()}</td>
                      <td>{new Date(book.dueDate).toLocaleDateString()}</td>
                      <td><span className="badge issued">{book.status}</span></td>
                      <td>₹{book.fine}</td>
                      <td>
                        <button
                          className="return-btn"
                          onClick={() => returnBook(book._id)}
                        >
                          Request Return
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="section-card issued-requests">
            <h2>📝 Issued Requests</h2>
            {issuedRequests.length === 0 ? (
              <p>No pending issue requests.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Book Title</th>
                    <th>Request Date</th>
                    <th>Due Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {issuedRequests.map((book) => (
                    <tr key={book._id}>
                      <td>{book.bookId.title}</td>
                      <td>{new Date(book.issueDate).toLocaleDateString()}</td>
                      <td>{new Date(book.dueDate).toLocaleDateString()}</td>
                      <td><span className="badge requested">{book.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="section-card return-requests">
            <h2>🔄 Return Requests</h2>
            {returnRequests.length === 0 ? (
              <p>No pending return requests.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Book Title</th>
                    <th>Request Date</th>
                    <th>Due Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {returnRequests.map((book) => (
                    <tr key={book._id}>
                      <td>{book.bookId.title}</td>
                      <td>{new Date(book.issueDate).toLocaleDateString()}</td>
                      <td>{new Date(book.dueDate).toLocaleDateString()}</td>
                      <td><span className="badge return-requested">{book.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
