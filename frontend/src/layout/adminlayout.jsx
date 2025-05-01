import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminNavbar from "../components/adminnavbar";
import Footer from "../components/footer"

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
          <Footer /></> :
          null
          }
        
          
      
    </>
  );
}
