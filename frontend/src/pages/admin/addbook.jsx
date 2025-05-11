import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Server_URL } from "../../utils/config";
import { showSuccessToast, showErrorToast } from "../.. /utils/toasthelper";



const AddBookForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      
      // Append all fields except coverImage
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "coverImage" && value !== undefined) {
          formData.append(key, value);
        }
      });
  
      // Append the file if exists
      if (data.coverImage?.[0]) {
        formData.append("coverImage", data.coverImage[0]);
      }

      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        showErrorToast("Authentication required. Please login again.");
        return;
      }

      const response = await axios.post(`${Server_URL}books/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.data.error) {
        showErrorToast(response.data.message);
      } else {
        showSuccessToast("Book added successfully!");
        reset();
      }
      
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         "Failed to add book";
      showErrorToast(errorMessage);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📚 Add a New Book</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 shadow-sm bg-light rounded">
        {/* Title Field */}
        <div className="mb-3">
          <label className="form-label">Book Title*</label>
          <input
            type="text"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            {...register("title", { 
              required: "Title is required",
              minLength: {
                value: 3,
                message: "Title must be at least 3 characters"
              }
            })}
          />
          {errors.title && (
            <div className="invalid-feedback">{errors.title.message}</div>
          )}
        </div>

        {/* Author Field */}
        <div className="mb-3">
          <label className="form-label">Author*</label>
          <input
            type="text"
            className={`form-control ${errors.author ? "is-invalid" : ""}`}
            {...register("author", { 
              required: "Author is required",
              minLength: {
                value: 3,
                message: "Author name must be at least 3 characters"
              }
            })}
          />
          {errors.author && (
            <div className="invalid-feedback">{errors.author.message}</div>
          )}
        </div>

        {/* Category Field */}
        <div className="mb-3">
          <label className="form-label">Category*</label>
          <select 
            className={`form-select ${errors.category ? "is-invalid" : ""}`} 
            {...register("category", { required: "Category is required" })}
          >
            <option value="">Select Category</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-fiction">Non-fiction</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="Biography">Biography</option>
          </select>
          {errors.category && (
            <div className="invalid-feedback">{errors.category.message}</div>
          )}
        </div>

        {/* ISBN Field */}
        <div className="mb-3">
          <label className="form-label">ISBN*</label>
          <input
            type="text"
            className={`form-control ${errors.isbn ? "is-invalid" : ""}`}
            {...register("isbn", { 
              required: "ISBN is required",
              pattern: {
                value: /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/,
                message: "Invalid ISBN format"
              }
            })}
          />
          {errors.isbn && (
            <div className="invalid-feedback">{errors.isbn.message}</div>
          )}
        </div>

        {/* Cover Image Field */}
        <div className="mb-3">
          <label className="form-label">Book Cover Image*</label>
          <input
            type="file"
            className={`form-control ${errors.coverImage ? "is-invalid" : ""}`}
            accept="image/*"
            {...register("coverImage", { 
              required: "Cover image is required",
              validate: {
                lessThan10MB: files => 
                  files[0]?.size < 10000000 || "Maximum 10MB size",
                acceptedFormats: files =>
                  ['image/jpeg', 'image/png', 'image/webp'].includes(files[0]?.type) || 
                  "Only JPEG, PNG, or WEBP formats"
              }
            })}
          />
          {errors.coverImage && (
            <div className="invalid-feedback">{errors.coverImage.message}</div>
          )}
        </div>

        {/* Total Copies Field */}
        <div className="mb-3">
          <label className="form-label">Total Copies*</label>
          <input 
            type="number" 
            className={`form-control ${errors.totalCopies ? "is-invalid" : ""}`}
            min="1"
            {...register("totalCopies", { 
              required: "Total copies is required",
              min: {
                value: 1,
                message: "Must have at least 1 copy"
              },
              valueAsNumber: true
            })} 
          />
          {errors.totalCopies && (
            <div className="invalid-feedback">{errors.totalCopies.message}</div>
          )}
        </div>
        
        {/* Price Field */}
        <div className="mb-3">
          <label className="form-label">Price*</label>
          <input 
            type="number" 
            step="0.01" 
            min="0"
            className={`form-control ${errors.price ? "is-invalid" : ""}`}
            {...register("price", { 
              required: "Price is required",
              min: {
                value: 0,
                message: "Price cannot be negative"
              },
              valueAsNumber: true
            })} 
          />
          {errors.price && (
            <div className="invalid-feedback">{errors.price.message}</div>
          )}
        </div>

        {/* Description Field */}
        <div className="mb-3">
          <label className="form-label">Description*</label>
          <textarea
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            rows="3"
            {...register("description", { 
              required: "Description is required",
              minLength: {
                value: 20,
                message: "Description must be at least 20 characters"
              },
              maxLength: {
                value: 500,
                message: "Description cannot exceed 500 characters"
              }
            })}
          />
          {errors.description && (
            <div className="invalid-feedback">{errors.description.message}</div>
          )}
        </div>

        <button 
          type="submit" 
          className="btn btn-primary w-100"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Adding...
            </>
          ) : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;