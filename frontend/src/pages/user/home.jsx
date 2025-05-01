// import React,{useState,useEffect} from "react";
// import {Server_URL} from "../../utils/config"
// import axios from "axios";
// import "./home.css";

// import { Link } from "react-router-dom";

// export default function Home(){
//   const [category,setCategory] = useState([]);

//   const fetchCategories = async () => {
//     try {
//       const url =Server_URL + 'books';
//       const response = await axios.get(url);
//       console.log(response.data);
//       const {error,message} = response.data;
//       if(error){
//         alert(message)
//       }
//       else{
//         const {books} = response.data;
//         setCategory(books);
//       }

//       // setCategory(response.data);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

  


//   const categories = [
//     { name: "Fiction", image: "/assets/library.avif" },
//     { name: "Science", image: "/assets/library.avif" },
//     { name: "History", image: "/assets/library.avif" }
//   ];

//   useEffect(()=>{
//     console.log(Server_URL);
//     fetchCategories();
//   },[])
//     return(
//       <div>
//       <header className="hero-section text-center text-white">
//       <div className="container">
//         <h1>Welcome to the Digital Library</h1>
//         <p>Explore thousands of books and manage your library easily.</p>
//         <Link className="btn btn-light btn-lg mt-3" to="/books">Browse Books</Link>
//       </div>
//     </header>

//     {/* Featured Book Categories */}

//     <div className="container mt-5">
//   <h2 className="text-center mb-4">Browse Categories</h2>

//   <div className="row">
//     {category.slice(0,3).map((books, index) => (
//       <div key={index} className="col-md-4 col-sm-6 mb-4">
//         <div className="card category-card shadow-lg">
//           <img src={books.coverImage} className="card-img-top category-img" alt={books.title} />
//           <div className="card-body text-center">
//             <h5 className="card-title">{books.category}</h5>
//             <button className="btn btn-primary">Explore</button>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>

//   {/* All Categories Section */}
//   <div className="text-center mb-4">
//   <Link  className="btn btn-lg btn-gradient shadow-sm " to="/category">
//     🌟 View All Categories
//             </Link>
//   </div>
// </div>



    



//     {/* <section className="featured-books">
//         <h2>📚 Featured Books</h2>
//         <div className="book-list">
//           <div className="book-card">
//             <img src="https://source.unsplash.com/200x300/?book" alt="Book" />
//             <h3>Book Title</h3>
//             <p>Author Name</p>
//           </div>
//           <div className="book-card">
//             <img src="https://source.unsplash.com/200x300/?library" alt="Book" />
//             <h3>Another Book</h3>
//             <p>Author Name</p>
//           </div>
//         </div>
//       </section> */}

//       {/* Services Section */}
//       {/* <section className="services">
//         <h2>🛠 Our Services</h2>
//         <div className="service-list">
//           <div className="service-card">
//             <h3>📖 Book Borrowing</h3>
//             <p>Borrow books and return them at your convenience.</p>
//           </div>
//           <div className="service-card">
//             <h3>🖥️ Digital Resources</h3>
//             <p>Access e-books, research papers, and journals online.</p>
//           </div>
//           <div className="service-card">
//             <h3>📚 Study Rooms</h3>
//             <p>Reserve a quiet space for studying.</p>
//           </div>
//         </div>
//       </section> */}

//       {/* Testimonials Section */}
//       {/* <section className="testimonials">
//         <h2>⭐ What Our Readers Say</h2>
//         <div className="testimonial-list">
//           <blockquote>
//             "This library has an amazing collection and great staff!" - Alex
//           </blockquote>
//           <blockquote>
//             "I love the digital resources available here." - Sam
//           </blockquote>
//         </div>
//       </section> */}

//       {/* Call to Action Section */}
//       {/* <section className="cta-section">
//         <h2>📢 Join Our Library Today!</h2>
//         <p>Sign up to explore thousands of books and digital content.</p>
//         <button className="cta-button">Sign Up</button>
//       </section> */}

//       {/* Contact Section */}
//       {/* <section className="contact">
//         <h2>📩 Contact Us</h2>
//         <p>Email: support@library.com</p>
//         <p>Phone: +123 456 7890</p>
//       </section> */}
//     </div>
//     )
// }


import React, { useState, useEffect } from "react";
import { Server_URL } from "../../utils/config";
import axios from "axios";
import "./home.css";
import { Link } from "react-router-dom";
import { FiBook, FiSearch, FiClock, FiUser, FiCalendar } from "react-icons/fi";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [stats, setStats] = useState({
    totalBooks: 0,
    availableBooks: 0,
    students: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [categoryCount , setCategoryCount] = useState({});

  const fetchData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch categories
      const categoriesResponse = await axios.get(Server_URL + 'books');
      if (categoriesResponse.data.error) {
        alert(categoriesResponse.data.message);
      } else {
        console.log("category")
        console.log(categoriesResponse.data.books)
        const {books} = categoriesResponse.data;

        const categoryCountMap = {};
      books.forEach((book) => {
        const cat = book.category;
        categoryCountMap[cat] = (categoryCountMap[cat] || 0) + 1;
      });

      setCategoryCount(categoryCountMap);

        setCategories(books);
      }

      // Fetch new arrivals (you'll need to implement this endpoint)
      const arrivalsResponse = await axios.get(Server_URL + 'books/new');
      console.log(arrivalsResponse);
      if (!arrivalsResponse.data.error) {
        setNewArrivals(arrivalsResponse.data.books);
        setStats(arrivalsResponse.data);
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner">
          <FiBook size={32} />
        </div>
        <p>Loading Library Resources...</p>
      </div>
    );
  }

  return (
    <div className="library-homepage">
      {/* Hero Section */}
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
            <Link to="/login" className="btn btn-secondary">
              Student Login
            </Link>
          </div>
        </div>
      </header>

      {/* Quick Stats */}
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
            {/* <div className="stat-card">
              <FiBook className="stat-icon" />
              <h3>{stats.availableBooks}</h3>
              <p>Available Now</p>
            </div> */}
            <div className="stat-cardhome">
              <FiUser className="stat-icon" />
              <h3>{stats.totalActiveStudents}</h3>
              <p>Active Students</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
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

      {/* New Arrivals */}
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

      {/* Library Hours */}
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

      {/* Quick Links */}
      {/* <section className="quick-links">
        <div className="container">
          <h2 className="section-title">Quick Links</h2>
          <div className="links-grid">
            <Link to="/e-resources" className="link-card">
              <div className="link-icon">
                <FiBook />
              </div>
              <h3>E-Resources</h3>
              <p>Access digital journals and databases</p>
            </Link>
            <Link to="/textbooks" className="link-card">
              <div className="link-icon">
                <FiBook />
              </div>
              <h3>Course Textbooks</h3>
              <p>Find required course materials</p>
            </Link>
            <Link to="/thesis" className="link-card">
              <div className="link-icon">
                <FiBook />
              </div>
              <h3>Thesis Collection</h3>
              <p>Browse past student research</p>
            </Link>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      {/* <footer className="library-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-info">
              <h3>College Central Library</h3>
              <p>Knowledge Street, Campus Area</p>
              <p>library@college.edu</p>
              <p>+1 (123) 456-7890</p>
            </div>
            <div className="footer-links">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/rules">Library Rules</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} College Central Library. All rights reserved.</p>
          </div>
        </div>
      </footer> */}
    </div>
  );
}