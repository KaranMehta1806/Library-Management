import { useEffect, useState } from "react";
import axios from "axios";
import "./books.css"

const Books = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    axios.get("http://localhost:5000/books")
      .then((response) => {
        if (!response.data.error) {
          setBooks(response.data.books);
          setFilteredBooks(response.data.books);
          const uniqueCategories = ["All", ...new Set(response.data.books.map(book => book.category))];
          setCategories(uniqueCategories);
        }
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterBooks(e.target.value, selectedCategory);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterBooks(searchTerm, category);
  };

  const filterBooks = (search, category) => {
    let filtered = books;
    
    if (category !== "All") {
      filtered = filtered.filter(book => book.category === category);
    }
    
    if (search) {
      filtered = filtered.filter(book => book.title.toLowerCase().includes(search.toLowerCase()));
    }
    
    setFilteredBooks(filtered);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        
        {/* Sidebar */}
        <div className="col-md-3 p-3 bg-light shadow-sm">
          <h4 className="text-center">📚 Categories</h4>
          <ul className="list-group mt-3">
            {categories.map((category, index) => (
              <li key={index} className={`list-group-item ${selectedCategory === category ? "active" : ""}`} 
                  style={{ cursor: "pointer" }} onClick={() => handleCategoryChange(category)}>
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Books Section */}
        <div className="col-md-9">
          <div className="d-flex justify-content-between align-items-center p-3">
            <h2 className="text-primary">📖 All Books</h2>
            <input type="text" className="form-control w-50" placeholder="🔍 Search by title..." value={searchTerm} onChange={handleSearch} />
          </div>

          <div className="row p-3">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book, index) => (
                <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                  <div className="card shadow-lg border-0">
                    <img src={book.coverImage} className="card-img-top" alt={book.title} style={{ height: "250px", objectFit: "cover" }} />
                    <div className="card-body">
                      <h5 className="card-title">{book.title}</h5>
                      <p className="text-muted"><strong>By:</strong> {book.author}</p>
                      <p><strong>Category:</strong> {book.category}</p>
                      <p className="text-success"><strong>₹{book.price}</strong></p>
                      <button className="btn btn-primary w-100">View Details</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center mt-4">
                <h4 className="text-danger">No books found! 😔</h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
