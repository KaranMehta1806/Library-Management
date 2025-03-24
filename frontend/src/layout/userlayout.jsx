import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar"
// import Footer from "../components/footer"

export default function userLayout() {
  return (
    <>
        
          <Navbar />
          <Outlet />
          {/* <Footer /> */}
      
    </>
  );
}
