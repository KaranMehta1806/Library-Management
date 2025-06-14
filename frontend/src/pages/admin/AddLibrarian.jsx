import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Server_URL } from "../../utils/config";
import { showErrorToast, showSuccessToast } from "../../utils/toasthelper";


export default function AddLibrarian() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = { ...data, role: "librarian" };
      const url = Server_URL + "admin/addlibrarian";
      const authToken = localStorage.getItem("authToken");
      console.log(authToken);

      const response = await axios.post(
        url,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Response:", response.data);
      showSuccessToast("Registration Successful!");
      reset();
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      showErrorToast("Registration Failed!");
    }
   
  };
  return (
    <div className="container mt-4">
      <h2 className="text-center">User Registration</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 border rounded shadow"
      >
    
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>

        
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>

     
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>



       
        <button type="submit" className="btn btn-primary w-100">
          Add
        </button>
      </form>
    </div>
  );
}
