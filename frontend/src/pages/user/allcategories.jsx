import React, { useState, useEffect } from "react";
import { Server_URL } from "../../utils/config";
import axios from "axios";
import "./allcategories.css";
import { Link } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../utils/toasthelper";

export default function ViewAllCategories() {
  const [books, setBooks] = useState([]);
  const [filterBooks, setFilteredBooks] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [categoryCounts, setCategoryCounts] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const url = Server_URL + "books";
      const response = await axios.get(url);
      const { error, message } = response.data;

      if (error) {
        alert(message);
      } else {
        const { books } = response.data;
        setBooks(books);
        setFilteredBooks(books);
        const categoryCountMap = {};
        books.forEach((book) => {
          const cat = book.category;
          categoryCountMap[cat] = (categoryCountMap[cat] || 0) + 1;
        });
        setCategoryCounts(categoryCountMap);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      showErrorToast("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (selectedCategory) => {
    setActiveCategory(selectedCategory);
    if (selectedCategory === "All") {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(
        (book) => book.category === selectedCategory
      );
      setFilteredBooks(filtered);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="all-categories-container">
      {loading ? (
        <div className="preloader-container">
          <div className="preloader"></div>
          <p>Loading categories...</p>
        </div>
      ) : (
        <div className="all-categories-row">
          {/* Sidebar */}
          <nav className="all-categories-sidebar">
            <h5 className="all-categories-sidebar-title">Categories</h5>
            <ul className="all-categories-nav">
              <li
                className={`all-categories-nav-item ${
                  activeCategory === "All" ? "active" : ""
                }`}
                onClick={() => handleCategoryClick("All")}
              >
                All <span className="category-count">({books.length})</span>
              </li>

              {[...new Set(books.map((book) => book.category))].map(
                (category, index) => (
                  <li
                    key={index}
                    className={`all-categories-nav-item ${
                      activeCategory === category ? "active" : ""
                    }`}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category} <span className="category-count">({categoryCounts[category] || 0})</span>
                  </li>
                )
              )}
            </ul>
          </nav>

          {/* Main Content */}
          <main className="all-categories-main">
            <h2 className="all-categories-main-title">Explore All Categories</h2>
            {filterBooks.length > 0 ? (
              <div className="all-categories-grid">
                {[...new Set(filterBooks.map(book => book.category))].map((category, index) => {
                  const categoryBook = filterBooks.find(b => b.category === category);
                  return (
                    <div key={index} className="all-categories-card-wrapper">
                      <div className="all-categories-card">
                        <div className="all-categories-card-img-container">
                          <img
                            src={categoryBook?.coverImage}
                            className="all-categories-card-img"
                            alt={category}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://via.placeholder.com/300x400?text=No+Image";
                            }}
                          />
                        </div>
                        <div className="all-categories-card-body">
                          <h5 className="all-categories-card-title">{category}</h5>
                          <p className="all-categories-card-count">{categoryCounts[category] || 0} {categoryCounts[category] === 1 ? 'Book' : 'Books'}</p>
                          <Link 
                            to={`/books?category=${encodeURIComponent(category)}`} 
                            className="all-categories-btn"
                          >
                            Explore
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="all-categories-empty">
                <p>No books found in this category.</p>
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
}