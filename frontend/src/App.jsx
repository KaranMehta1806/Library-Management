import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
// import AdminDashboard from './pages/admin/admindashboard';
function App() {

  return (
    <Router>
      <Routes>
      <Route path="/">
      <Route path='/admin-login' element={<AdminLogin/>}/>
      
      </Route>
      <Route path="/" element={<Userlayout/>}>
      <Route index element = {<Home/>}/>
      <Route path='/books' element = {<Books/>}/>
      <Route path='/category' element = {<AllCategories/>}/>
        <Route path="/register" element = {<Register/>}/>
        <Route path="/login" element = {<Login/>}/>
            </Route>
      <Route path='/admin' element={<AdminLayout/>}>
      <Route index element={<AdminDashboard/>}/>

      </Route>
        
      </Routes>
    </Router>
  )
}

export default App
