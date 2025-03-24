import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login(){

    const { register, handleSubmit, formState: { errors } } = useForm();
    let navigate = useNavigate()

    const onSubmit = async (data) => {
      try {
        const response = await axios.post("http://localhost:5000/users/login", data);
        console.log("Response:", response.data);
        alert("Login Successful!");
        navigate("/")
        
        // Store token in localStorage or sessionStorage
        localStorage.setItem("authToken", response.data.token);
        

      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        alert("Login Failed!");
      }
    };


    return(
        <div className="container mt-4">
        <h2 className="text-center">User Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded shadow">
          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" {...register("email", { required: "Email is required" })} />
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
          </div>
  
          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" {...register("password", { required: "Password is required" })} />
            {errors.password && <p className="text-danger">{errors.password.message}</p>}
          </div>
  
          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    )
}