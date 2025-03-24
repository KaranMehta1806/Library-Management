import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/adminnavbar";
// import Footer from "../components/footer"

export default function adminLayout() {
  return (
    <>
        
          <AdminNavbar />
          <Outlet />
          {/* <Footer /> */}
      
    </>
  );
}
