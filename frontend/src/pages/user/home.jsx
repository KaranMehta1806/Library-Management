import React,{useState,useEffect} from "react";
import {Server_URL} from "../../utils/config"
import axios from "axios";
import "./home.css";

import { Link } from "react-router-dom";

export default function Home(){
  const [category,setCategory] = useState([]);

  const fetchCategories = async () => {
    try {
      const url =Server_URL + 'books';
      const response = await axios.get(url);
      console.log(response.data);
      const {error,message} = response.data;
      if(error){
        alert(message)
      }
      else{
        const {books} = response.data;
        setCategory(books);
      }

      // setCategory(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  


  const categories = [
    { name: "Fiction", image: "/assets/library.avif" },
    { name: "Science", image: "/assets/library.avif" },
    { name: "History", image: "/assets/library.avif" }
  ];

  useEffect(()=>{
    console.log(Server_URL);
    fetchCategories();
  },[])
    return(
      <div>
      <header className="hero-section text-center text-white">
      <div className="container">
        <h1>Welcome to the Digital Library</h1>
        <p>Explore thousands of books and manage your library easily.</p>
        <Link className="btn btn-light btn-lg mt-3" to="/books">Browse Books</Link>
      </div>
    </header>

    {/* Featured Book Categories */}

    <div className="container mt-5">
  <h2 className="text-center mb-4">Browse Categories</h2>

  <div className="row">
    {category.slice(0,3).map((books, index) => (
      <div key={index} className="col-md-4 col-sm-6 mb-4">
        <div className="card category-card shadow-lg">
          <img src={books.coverImage} className="card-img-top category-img" alt={books.title} />
          <div className="card-body text-center">
            <h5 className="card-title">{books.category}</h5>
            <button className="btn btn-primary">Explore</button>
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* All Categories Section */}
  <div className="text-center mb-4">
  <Link  className="btn btn-lg btn-gradient shadow-sm " to="/category">
    🌟 View All Categories
            </Link>
  </div>
</div>



    



    {/* <section className="featured-books">
        <h2>📚 Featured Books</h2>
        <div className="book-list">
          <div className="book-card">
            <img src="https://source.unsplash.com/200x300/?book" alt="Book" />
            <h3>Book Title</h3>
            <p>Author Name</p>
          </div>
          <div className="book-card">
            <img src="https://source.unsplash.com/200x300/?library" alt="Book" />
            <h3>Another Book</h3>
            <p>Author Name</p>
          </div>
        </div>
      </section> */}

      {/* Services Section */}
      {/* <section className="services">
        <h2>🛠 Our Services</h2>
        <div className="service-list">
          <div className="service-card">
            <h3>📖 Book Borrowing</h3>
            <p>Borrow books and return them at your convenience.</p>
          </div>
          <div className="service-card">
            <h3>🖥️ Digital Resources</h3>
            <p>Access e-books, research papers, and journals online.</p>
          </div>
          <div className="service-card">
            <h3>📚 Study Rooms</h3>
            <p>Reserve a quiet space for studying.</p>
          </div>
        </div>
      </section> */}

      {/* Testimonials Section */}
      {/* <section className="testimonials">
        <h2>⭐ What Our Readers Say</h2>
        <div className="testimonial-list">
          <blockquote>
            "This library has an amazing collection and great staff!" - Alex
          </blockquote>
          <blockquote>
            "I love the digital resources available here." - Sam
          </blockquote>
        </div>
      </section> */}

      {/* Call to Action Section */}
      {/* <section className="cta-section">
        <h2>📢 Join Our Library Today!</h2>
        <p>Sign up to explore thousands of books and digital content.</p>
        <button className="cta-button">Sign Up</button>
      </section> */}

      {/* Contact Section */}
      {/* <section className="contact">
        <h2>📩 Contact Us</h2>
        <p>Email: support@library.com</p>
        <p>Phone: +123 456 7890</p>
      </section> */}
    </div>
    )
}