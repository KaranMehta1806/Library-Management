import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { Server_URL } from "../../utils/config";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("dashboard");
  const [user, setUser] = useState([]);
  const [lib, setLib] = useState([]);
  const [books, setBooks] = useState([]);
  const [latestBooks, setLatestBooks] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const [totalLib, setTotalLib] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [borrowedBooks, setBorrowedBooks] = useState(0);
  const [occupancyPercent, setOccupancyPercent] = useState(0);
  const [issueRequest, setIssueRequest] = useState(0);
  const [categoryData, setCategoryData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#3498db",
          "#f39c12",
          "#9b59b6",
          "#e74c3c",
          "#2ecc71",
        ],
      },
    ],
  });

  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("role");

  async function getUsers() {
    try {
      const url = Server_URL + "users";
      const result = await axios.get(url);
      const { error, message } = result.data;
      if (error) {
        alert(message);
      } else {
        const { user, totalUser } = result.data;
        const students = user.filter((u) => u.role === "user");
        const librarians = user.filter((u) => u.role === "librarian");
        setUser(students);
        setLib(librarians);
        setTotalUser(students.length);
        setTotalLib(librarians.length);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  async function getBooks() {
    try {
      const url = Server_URL + "books";
      const result = await axios.get(url);
      const { error, message } = result.data;
      if (error) {
        alert(message);
      } else {
        const { books, totalBooks } = result.data;
        setBooks(books);
        setTotalBooks(totalBooks);

        const categoryCount = books.reduce((acc, book) => {
          acc[book.category] = (acc[book.category] || 0) + 1;
          return acc;
        }, {});

        const labels = Object.keys(categoryCount);
        const data = Object.values(categoryCount);
        setCategoryData({
          labels,
          datasets: [
            {
              data,
              backgroundColor: [
                "#3498db",
                "#f39c12",
                "#9b59b6",
                "#e74c3c",
                "#2ecc71",
              ],
            },
          ],
        });

        const borrowed = books.reduce((acc, book) => {
          return acc + (book.totalCopies - book.availableCopies);
        }, 0);
        setBorrowedBooks(borrowed);

        const total = books.reduce((acc, book) => acc + book.totalCopies, 0);
        const occupancy = total ? Math.round((borrowed / total) * 100) : 0;
        setOccupancyPercent(occupancy);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }

  async function getLatestBooks() {
    try {
      const url = Server_URL + 'books/new';
      const result = await axios.get(url);
      const {error, message} = result.data;
      if (error) {
        alert(message);        
      } else {
        console.log("result");
        console.log(result);
        const {books, totalBooks} = result.data;
        setLatestBooks(books);
      }
    } catch (error) {
      console.error("Error fetching books:", error);            
    }    
  }

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  useEffect(() => {
    getUsers();
    getBooks();
    getLatestBooks();
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="row g-0">
        <nav className="col-md-3 col-lg-2 admin-sidebar">
          {role == "admin" ? (
            <h4 className="admin-sidebar-title">📌 Admin Panel</h4>
          ) : (
            <h4 className="admin-sidebar-title">📌 Librarian Panel</h4>
          )}
          <ul className="admin-nav">
            <li className="admin-nav-item">
              <button
                className={`admin-nav-btn ${
                  selectedSection === "dashboard" ? "active" : ""
                }`}
                onClick={() => handleSectionChange("dashboard")}
              >
                📊 Dashboard
              </button>
            </li>
            <li className="admin-nav-item">
              <button
                className={`admin-nav-btn ${
                  selectedSection === "users" ? "active" : ""
                }`}
                onClick={() => handleSectionChange("users")}
              >
                👥 Users
              </button>
            </li>
            {role === "admin" && (
              <li className="admin-nav-item">
                <button
                  className={`admin-nav-btn ${
                    selectedSection === "librarians" ? "active" : ""
                  }`}
                  onClick={() => handleSectionChange("librarians")}
                >
                  📚 Librarians
                </button>
              </li>
            )}
            <li className="admin-nav-item">
              <button
                className={`admin-nav-btn ${
                  selectedSection === "books" ? "active" : ""
                }`}
                onClick={() => handleSectionChange("books")}
              >
                📖 Books
              </button>
            </li>
          </ul>
        </nav>

        <main className="col-md-9 col-lg-10 admin-main">
          {selectedSection === "dashboard" && (
            <>
              <h2 className="admin-section-title">📊 Dashboard Overview</h2>

              <div className="stats-grid">
                <div className="stat-card books">
                  <h3>Total Books</h3>
                  <p>{totalBooks}</p>
                </div>
                <div className="stat-card users">
                  <h3>Total Users</h3>
                  <p>{totalUser}</p>
                </div>
                {role === "admin" && (
                  <div className="stat-card librarians">
                    <h3>Total Librarians</h3>
                    <p>{totalLib}</p>
                  </div>
                )}
                <div className="stat-card borrowed">
                  <h3>Books Borrowed</h3>
                  <p>{borrowedBooks}</p>
                </div>
              </div>

              <div className="progress-grid">
                <div className="progress-card">
                  <h3>Books Issued</h3>
                  <div className="progress-container">
                    <div
                      className="progress-bar"
                      style={{ width: `${occupancyPercent}%` }}
                    >
                      {occupancyPercent}%
                    </div>
                  </div>
                </div>
              </div>

              <div className="chart-activity-grid">
                <div className="chart-card">
                  <h3>Category Distribution</h3>
                  <div style={{ height: "250px" }}>
                    <Pie
                      data={categoryData}
                      options={{
                        plugins: {
                          legend: {
                            position: "bottom",
                            labels: {
                              padding: 20,
                              usePointStyle: true,
                            },
                          },
                        },
                        maintainAspectRatio: false,
                      }}
                    />
                  </div>
                </div>

                <div className="activity-card">
                  <h3>Recent Addition</h3>
                  <div className="activity-list">
                    {latestBooks.slice(0, 4).map((book, index) => (
                      <div key={index} className="activity-item">
                        <div className="activity-icon">📚</div>
                        <div className="activity-text">
                          <strong>{book.title}</strong> added by {book.addedBy?.name} 
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {selectedSection === "users" && (
            <>
              <h2 className="admin-section-title">👥 Users Management</h2>
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Stream</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.map((data, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{data.name}</td>
                        <td>{data.email}</td>
                        <td>{data.stream}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {selectedSection === "librarians" && (
            <>
              <h2 className="admin-section-title">📚 Librarians Management</h2>
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lib.map((data, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{data.name}</td>
                        <td>{data.email}</td>
                        <td>{data.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {selectedSection === "books" && (
            <>
              <h2 className="admin-section-title">📖 Books Inventory</h2>
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Category</th>
                      <th>Total Copies</th>
                      <th>Available</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((data, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{data.title}</td>
                        <td>{data.author}</td>
                        <td>{data.category}</td>
                        <td>{data.totalCopies}</td>
                        <td>{data.availableCopies}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
