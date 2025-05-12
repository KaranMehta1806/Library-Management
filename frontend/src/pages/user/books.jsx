import { useEffect, useState } from "react";
import axios from "axios";
import "./books.css"
import { useNavigate } from "react-router-dom";
import { Server_URL } from "../../utils/config";
import { showErrorToast, showSuccessToast } from "../../utils/toasthelper";


const Books = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const navigate = useNavigate();


  async function issueBook(bookid) {
        try {
          console.log("bookId");
            console.log(bookid);
          const authToken = localStorage.getItem("authToken");
          console.log(authToken)
          if (!authToken) {
            showErrorToast("Please login to issue a book.");
            return;
        }
           const url =Server_URL + 'borrow/request-issue/'+bookid;
           const response = await axios.post(`${Server_URL}books/borrow/request-issue/${bookid}`,{}, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });

          // alert(response.data);
          const {error,message} = response.data;
          if(error){
            console.log(error);
            showErrorToast(message)
          }
          else{
            showSuccessToast(message);
          }
        } catch (error) {
          // console.error("Error:", error.response?.data || error.message);
          showErrorToast(error.response?.data?.message || "Something went wrong! Please try again.");
          
        }    
      }
    
      async function bookDetails(bookid) {
        console.log(bookid)
        navigate(`/bookdetails/${bookid}`);       
      }

  useEffect(() => {
    axios.get(`${Server_URL}books`)
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

       
        <div className="col-md-9">
  <div className="d-flex justify-content-between align-items-center p-3">
    <h2 className="text-primary">📖 All Books</h2>
    <input type="text" className="form-control w-50" placeholder="🔍 Search by title..." value={searchTerm} onChange={handleSearch} />
  </div>

  <div className="row p-3">
    {filteredBooks.length > 0 ? (
      filteredBooks.map((book, index) => (
        <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
          <div className="card shadow-lg border-0 h-100 d-flex flex-column">
            <img src={book.coverImage} className="card-img-top" alt={book.title} style={{ height: "250px", objectFit: "cover", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{book.title}</h5>
              <p className="text-muted"><strong>By:</strong> {book.author}</p>
              <p><strong>Category:</strong> {book.category}</p>
              <p className="text-success"><strong>₹{book.price}</strong></p>
              <div className="mt-auto">
                <button className="btn btn-primary w-100 mb-2" onClick={() => bookDetails(book._id)}>View Details</button>
                <button className="btn btn-success w-100" onClick={() => issueBook(book._id)}>📚 Issue Book</button>
              </div>
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