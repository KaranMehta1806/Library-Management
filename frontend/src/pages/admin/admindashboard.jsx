import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { Server_URL } from "../../utils/config";

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("dashboard");
  const [user,setUser] = useState([]);
  const [books,setBooks] = useState([]);
  const [totalUser,setTotalUser] = useState(0)
  const [totalBooks,setTotalBooks] = useState(0)

  async function getUsers() {
    try {
      const url =Server_URL + 'users';
      const result = await axios.get(url);
      const {error,message} = result.data;
      if(error){
        alert(message);        
      }
      else{
        const {user,totalUser} = result.data;
        console.log(user);
        setUser(user);
        setTotalUser(totalUser)
      }
    } catch (error) {
      console.error("Error fetching users:", error);            
    }    
  }
  async function getBooks() {
    try {
      const url =Server_URL + 'books';
      const result = await axios.get(url);
      console.log(result.data);
      const {error,message} = result.data;
      if(error){
        alert(message);        
      }
      else{
        const {books,totalBooks} = result.data;
        setBooks(books);
        setTotalBooks(totalBooks)
      }
    } catch (error) {
      console.error("Error fetching users:", error);            
    }    
  }

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  // Dummy chart data for category distribution
  const categoryData = {
    labels: ["Fiction", "Science", "Technology", "History", "Business"],
    datasets: [
      {
        data: [40, 20, 15, 10, 15],
        backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545", "#6f42c1"],
      },
    ],
  };

  useEffect(()=>{
    getUsers();
    getBooks();
  },[])

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <nav className="col-md-3 col-lg-2 bg-dark text-white sidebar vh-100 p-3">
          <h4 className="text-center">📌 Admin Panel</h4>
          <ul className="nav flex-column mt-4">
            <li className="nav-item">
              <button className="nav-link text-white" onClick={() => handleSectionChange("dashboard")}>
                📊 Dashboard
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link text-white" onClick={() => handleSectionChange("users")}>
                👥 Users
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link text-white" onClick={() => handleSectionChange("librarians")}>
                📚 Librarians
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link text-white" onClick={() => handleSectionChange("books")}>
                📖 Books
              </button>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="col-md-9 col-lg-10 p-4">
          {selectedSection === "dashboard" && (
            <>
              <h2 className="mb-4">📊 Dashboard</h2>

              {/* Stats Cards */}
              <div className="row">
                <div className="col-md-3">
                  <div className="card text-center p-3 shadow-sm">
                    <h6>Total Books</h6>
                    <p className="display-6 text-primary">{totalBooks}</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card text-center p-3 shadow-sm">
                    <h6>Total Users</h6>
                    <p className="display-6 text-success">{totalUser}</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card text-center p-3 shadow-sm">
                    <h6>Total Librarians</h6>
                    <p className="display-6 text-warning">10</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card text-center p-3 shadow-sm">
                    <h6>Books Borrowed Today</h6>
                    <p className="display-6 text-danger">35</p>
                  </div>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="card p-3 shadow-sm">
                    <h6>Library Occupancy</h6>
                    <div className="progress">
                      <div className="progress-bar bg-primary" style={{ width: "75%" }}>
                        75%
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card p-3 shadow-sm">
                    <h6>Book Returns</h6>
                    <div className="progress">
                      <div className="progress-bar bg-success" style={{ width: "60%" }}>
                        60%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category Distribution */}
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="card p-3 shadow-sm">
                    <h6>Category Distribution</h6>
                    <Pie data={categoryData} />
                  </div>
                </div>

                {/* Recent Activities */}
                <div className="col-md-6">
                  <div className="card p-3 shadow-sm">
                    <h6>Recent Activities</h6>
                    <ul className="list-group">
                      <li className="list-group-item">John borrowed "React for Beginners"</li>
                      <li className="list-group-item">Emma returned "Data Structures in Java"</li>
                      <li className="list-group-item">New librarian added: Alex Johnson</li>
                      <li className="list-group-item">Library occupancy reached 75%</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Users Section */}
          {selectedSection === "users" && (
            <>
              <h2 className="mb-4">👥 Users List</h2>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Stream</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.map((data,index)=>
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.stream}</td>
                    </tr>
)}
                  </tbody>
                </table>
              </div>
            </>
          )}

{selectedSection === "librarians" && (
            <>
              <h2 className="mb-4">👥 Users List</h2>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>John Doe</td>
                      <td>johndoe@gmail.com</td>
                      <td>User</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
          {selectedSection === "books" && (
            <>
              <h2 className="mb-4">👥 Users List</h2>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>John Doe</td>
                      <td>johndoe@gmail.com</td>
                      <td>User</td>
                    </tr>
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
