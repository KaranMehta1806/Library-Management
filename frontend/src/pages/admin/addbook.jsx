import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Server_URL } from "../../utils/config";
import { showErrorToast, showSuccessToast } from "../../utils/toasthelper";


const AddBookForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      
      // Append all text fields
      Object.keys(data).forEach((key) => {
        if (key !== "coverImage") {
          formData.append(key, data[key]);
        }
      });
  
      // Append the file manually
      if (data.coverImage && data.coverImage[0]) {
        formData.append("coverImage", data.coverImage[0]); // Ensure it's the file object
      }
  
      const authToken = localStorage.getItem("authToken");
      const url = Server_URL + "books/add";
  
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log(response.data);
      const { error, message } = response.data;

      if (error) {
        showErrorToast(message);
      } else {
        showSuccessToast(message);
        reset();
      }
      
    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
      showErrorToast("Failed to add book!");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📚 Add a New Book</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 shadow-sm bg-light rounded">
        <div className="mb-3">
          <label className="form-label">Book Title</label>
          <input
            type="text"
            className="form-control"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && <small className="text-danger">{errors.title.message}</small>}
        </div>

        <div className="mb-3">
          <label className="form-label">Author</label>
          <input
            type="text"
            className="form-control"
            {...register("author", { required: "Author is required" })}
          />
          {errors.author && <small className="text-danger">{errors.author.message}</small>}
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select className="form-select" {...register("category", { required: "Category is required" })}>
            <option value="">Select Category</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-fiction">Non-fiction</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
          </select>
          {errors.category && <small className="text-danger">{errors.category.message}</small>}
        </div>

        <div className="mb-3">
          <label className="form-label">ISBN</label>
          <input
            type="text"
            className="form-control"
            {...register("isbn", { required: "ISBN is required" })}
          />
          {errors.isbn && <small className="text-danger">{errors.isbn.message}</small>}
        </div>

        

        <div className="mb-3">
          <label className="form-label">Book Cover Image</label>
          <input
            type="file"
            className="form-control"
            {...register("coverImage")}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Total Copies</label>
          <input 
            type="number" 
            className="form-control" 
            {...register("totalCopies", { required: true, min: 1 })} 
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input 
            type="number" 
            step="0.01" 
            className="form-control" 
            {...register("price", { required: true })} 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="3"
            {...register("description", { required: "Description is required" })}
          ></textarea>
          {errors.description && <small className="text-danger">{errors.description.message}</small>}
        </div>

        <button type="submit" className="btn btn-primary w-100">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookForm;
