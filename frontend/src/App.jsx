import { useEffect } from 'react';
import {BrowserRouter as Router, HashRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import  { jwtDecode } from "jwt-decode";
import './App.css'
import Login from "./pages/user/login"
import Register from './pages/user/register';
import Home from "./pages/user/home"
import Userlayout from "./layout/userlayout"
import Books from './pages/user/books';
import AllCategories from './pages/user/allcategories';
import AdminDashboard from './pages/admin/admindashboard';
import AdminLayout from './layout/adminlayout';
import AdminLogin from './pages/admin/AdminLogin';
import AddBookForm from './pages/admin/addbook';
import ViewBooks from './pages/admin/viewbook';
import AddLibrarian from './pages/admin/AddLibrarian';
import BookDetails from './pages/user/bookdetails';
import ProfilePage from './pages/user/profile';
import LibrarianRequests from './pages/librarian/LibrarianRequest';
import ReturnRequest from './pages/librarian/ReturnRequest';
import AboutUs from './pages/user/AboutUs';
import ContactUs from './pages/user/ContactUs';
import BooksBorrowed from './pages/librarian/BooksBorrowed';
import ForgotPassword from './pages/user/ForgetPassword/ForgetPassword';
import VerifyOTP from './pages/user/ForgetPassword/VerifyOtp';
import ResetPassword from './pages/user/ForgetPassword/UpdatePassword';
// import AdminDashboard from './pages/admin/admindashboard';
function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("userAuthToken");
    if (token && location.pathname === "/") { // Check if the user is on the landing page
      try {
        const decoded = jwtDecode(token);
        if (decoded.role === "admin") {
          navigate("/admin-dashboard");
        } else if (decoded.role === "user") {
          navigate("/user-home");
        }
      } catch (err) {
        console.error("Token decode failed", err);
        localStorage.removeItem("userAuthToken");
      }
    }
  }, [location.pathname]);

  return (
    <HashRouter>
      <Routes>
      <Route path="/">
      <Route path='/admin-login' element={<AdminLogin/>}/>
      
      </Route>
      <Route path="/" element={<Userlayout/>}>
      <Route index element = {<Home/>}/>
      <Route path='/books' element = {<Books/>}/>
      <Route path='/bookdetails/:id' element = {<BookDetails/>}/>
      <Route path='/category' element = {<AllCategories/>}/>
        <Route path="/register" element = {<Register/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/aboutus" element = {<AboutUs/>}/>
        <Route path="/contactus" element = {<ContactUs/>}/>
        <Route path="/forgetPassword" element = {<ForgotPassword/>}/>
        <Route path="/verifyotp" element = {<VerifyOTP/>}/>
        <Route path="/resetpass" element = {<ResetPassword/>}/>
            </Route>
      <Route path='/admin' element={<AdminLayout/>}>
      <Route index element={<AdminDashboard/>}/>
      <Route path='addbook' element={<AddBookForm/>}/>
      <Route path='viewbook' element={<ViewBooks/>}/>
      <Route path='addlibrarian' element={<AddLibrarian/>}/>
      <Route path='issuerequest' element={<LibrarianRequests/>}/>
      <Route path='returnrequest' element={<ReturnRequest/>}/>
      <Route path='issued' element={<BooksBorrowed/>}/>

      </Route>
      <Route path='/user' element={<Userlayout/>}>
      <Route index element={<ProfilePage/>}/>         
      </Route>
        
      </Routes>
    </HashRouter>
  )
}

export default App


