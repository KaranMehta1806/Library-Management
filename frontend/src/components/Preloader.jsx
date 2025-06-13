import React from "react";
import "./preloader.css";

export default function Preloader() {
  return (
    <div className="preloader-wrapper">
      <div className="spinner"></div>
      <p>Loading data...</p>
    </div>
  );
}