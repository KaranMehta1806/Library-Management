import React, { useState, useEffect } from "react";
import { Server_URL } from "../../utils/config";
import axios from "axios";
import "./home.css";
import { Link } from "react-router-dom";
import { FiBook, FiSearch, FiClock, FiUser, FiCalendar } from "react-icons/fi";
import Preloader from "../../components/Preloader";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [stats, setStats] = useState({
    totalBooks: 0,
    availableBooks: 0,
    students: 0
  });
  const [categoryCount , setCategoryCount] = useState({});
  const [loading, setLoading] = useState(true);

  // const fetchData = async () => {
  //   try {

  //     setLoading(true);
  //     const categoriesResponse = await axios.get(Server_URL + 'books');
  //     if (categoriesResponse.data.error) {
  //       alert(categoriesResponse.data.message);
  //     } else {
  //       console.log("category")
  //       console.log(categoriesResponse.data.books)
  //       const {books} = categoriesResponse.data;

  //       const categoryCountMap = {};
  //     books.forEach((book) => {
  //       const cat = book.category;
  //       categoryCountMap[cat] = (categoryCountMap[cat] || 0) + 1;
  //     });

  //     setCategoryCount(categoryCountMap);

  //       setCategories(books);
  //     }

      
  //     const arrivalsResponse = await axios.get(Server_URL + 'books/new');
  //     console.log(arrivalsResponse);
  //     if (!arrivalsResponse.data.error) {
  //       setNewArrivals(arrivalsResponse.data.books);
  //       setStats(arrivalsResponse.data);
  //     }

  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  //    finally {
  //     setLoading(false);
  //   }
  // };


  const fetchData = async () => {
  try {
    setLoading(true);
    const response = await axios.get(Server_URL + "home");
    
    if (!response.data.error) {
      setStats(response.data.stats);
      setCategories(response.data.categories);
      setNewArrivals(response.data.newArrivals);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchData();
  }, []);

   if (loading) return <Preloader />;  

  return (
    <div className="library-homepage">
 
      <header className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1 className="hero-title">Welcome to College Central Library</h1>
          <p className="hero-subtitle">Access academic resources, textbooks, and research materials</p>
          
          
          
          <div className="hero-buttons">
            <Link to="/books" className="btn btn-primary">
            <FiBook size={18} className="mr-2" />
              Browse collections 
            </Link>
          
          </div>
        </div>
      </header>

     
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
          <div className="stat-cardhome">
              <FiBook className="stat-icon" />
              <h3>{stats.totalCategories}+</h3>
              <p>Total Categories</p>
            </div>
            <div className="stat-cardhome">
              <FiBook className="stat-icon" />
              <h3>{stats.totalBooks}+</h3>
              <p>Total Books</p>
            </div>
           
            <div className="stat-cardhome">
              <FiUser className="stat-icon" />
              <h3>{stats.totalActiveStudents}</h3>
              <p>Active Students</p>
            </div>
          </div>
        </div>
      </section>

      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Browse By Categories</h2>
          <p className="section-subtitle">Find resources for your courses</p>
          
          <div className="categories-grid">
            {categories.slice(0, 4).map((book, index) => (
              <div key={index} className="category-card">
                <div className="category-img-container">
                  <img 
                    src={book.coverImage || "/images/default-subject.jpg"} 
                    alt={book.category} 
                  />
                </div>
                <div className="category-info">
                  <h3>{book.category}</h3>
                  <p>Books :  {categoryCount[book.category] || 0}</p>
                  <Link to={`/books?category=${book.category}`} className="btn btn-outline">
                    View Collection
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/category" className="btn btn-view-all">
              View All Categories
            </Link>
          </div>
        </div>
      </section>

    
      <section className="na-section">
  <div className="na-container">
    <h2 className="na-heading">New Arrivals</h2>
    <p className="na-subheading">Recently added to our collection</p>
    
    <div className="na-grid-container">  
      {newArrivals.slice(0, 4).map((book, index) => (
        <div key={index} className="na-book-item">
          <div className="na-cover-wrapper">
            <img 
              src={book.coverImage || "/images/default-book.jpg"} 
              alt={book.title} 
              className="na-cover-image"
            />
          </div>
          <div className="na-book-info">
            <h3 className="na-book-title">{book.title}</h3>
            <p className="na-book-author">{book.author}</p>
            <span className="na-book-category">{book.category}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      
      <section className="hours-section">
        <div className="container">
          <h2 className="section-title">Library Hours</h2>
          <div className="hours-grid">
            <div className="hours-card">
              <FiClock className="hours-icon" />
              <h3>Regular Hours</h3>
              <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
              <p>Saturday: 10:00 AM - 5:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
            <div className="hours-card">
              <FiCalendar className="hours-icon" />
              <h3>Exam Period</h3>
              <p>Monday - Sunday: 7:00 AM - 11:00 PM</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}