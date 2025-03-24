import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Server_URL } from "../../utils/config";

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const navigate = useNavigate();


  const onSubmit = async (data) => {
        try {
                const url =Server_URL + 'admin/login';
          const response = await axios.post(url, data);
          console.log("Response:", response.data);
          alert("Login Successful!");
          navigate("/admin")
          
          // Store token in localStorage or sessionStorage
          localStorage.setItem("adminauthToken", response.data.token);
          
  
        } catch (error) {
          console.error("Error:", error.response?.data || error.message);
          alert("Login Failed!");
        }
      };




  // const onSubmits = (data) => {
  //   const adminEmail = "admin@example.com";
  //   const adminPassword = "admin123";

  //   if (data.email === adminEmail && data.password === adminPassword) {
  //     navigate("/admin-dashboard"); // Redirect to Admin Dashboard
  //   } else {
  //     alert("Invalid email or password!");
  //   }
  // };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "350px" }}>
        <h3 className="text-center mb-4">Admin Login</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-danger">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
