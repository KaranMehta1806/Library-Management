import React,{useState,useEffect} from "react";
import {Server_URL} from "../../utils/config"
import axios from "axios";
import "./allcategories.css";

export default function ViewAllCategories() {
    const [books,setBooks] = useState([]);
    const [filterBooks,setFilteredBooks] = useState([])
    // const [categoryClick,setCategoryClick] = useState([]);

    

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
          setBooks(books);
          setFilteredBooks(books)
        }
  
        // setCategory(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    async function handleCategoryClick(selectedCategory){
        // console.log(book)
        if(selectedCategory == "All"){
            setFilteredBooks(books)
        }
        else{
            const filterBooks = books.filter(book => book.category === selectedCategory)
            setFilteredBooks(filterBooks);
        }
        // const filterBooks = book.filter(particularBook =>  )
    }

    useEffect(()=>{
        fetchCategories();
    },[])

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <nav className="col-md-3 col-lg-2 d-md-block sidebar">
  <h5 className="text-center mb-3">Categories</h5>
  <ul className="nav flex-column">
    {/* All Option */}
    <li
      className="nav-item category-item"
      onClick={() => handleCategoryClick("All")}
    >
      All
    </li>

    {/* Dynamic Categories from Books */}
    {[...new Set(books.map(book => book.category))].map((category, index) => (
      <li
        key={index}
        className="nav-item category-item"
        onClick={() => handleCategoryClick(category)}
      >
        {category}
      </li>
    ))}
  </ul>
</nav>


        {/* Main Content */}
        <main className="col-md-9 col-lg-10 px-md-4">
          <h2 className="text-center my-4">Explore All Categories</h2>
          <div className="row">
            {filterBooks.map((category, index) => (
              <div key={index} className="col-md-4 col-sm-6 mb-4">
                <div className="card category-card">
                  <img
                    src={category.image}
                    className="card-img-top"
                    alt={category.title}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{category.category}</h5>
                    <button className="btn btn-gradient">Explore</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};
