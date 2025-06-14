import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminNavbar from "../components/adminnavbar";
import AdminFooter from "../components/AdminFooter";
import { ToastContainer } from 'react-toastify';

export default function adminLayout() {
  const [render,setRender] = useState(false);
  const token = localStorage.getItem("authToken")
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    if(token && (role === "librarian" || role === "admin")){
      setRender(true)
    }
    else{
      navigate("/login")
    }    
  },[])


  return (
    <>

    {render ? <><AdminNavbar />
          <Outlet />
          <AdminFooter /></> :
          null
          }
          <ToastContainer
position="top-right"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/> 
    </>
  );
}
