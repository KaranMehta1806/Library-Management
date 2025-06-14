import { useForm } from "react-hook-form";
import axios from "axios";
import { Server_URL } from "../../../utils/config";
import { useNavigate } from "react-router-dom";
import "./UpdatePassword.css";

function ResetPassword() {
  const { 
    register, 
    handleSubmit, 
    watch, 
    formState: { errors, isSubmitting } 
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${Server_URL}users/reset-password`, data);
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-card">
        <h2 className="reset-password-title">Reset Your Password</h2>
        <p className="reset-password-subtitle">
          Create a new password for your account
        </p>
        
        <form className="reset-password-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="reset-password-form-group">
            <label htmlFor="email" className="reset-password-label">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className={`reset-password-input ${
                errors.email ? "input-error" : ""
              }`}
              placeholder="Enter your registered email"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
            />
            {errors.email && (
              <p className="reset-password-error">{errors.email.message}</p>
            )}
          </div>

          <div className="reset-password-form-group">
            <label htmlFor="newPassword" className="reset-password-label">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              className={`reset-password-input ${
                errors.newPassword ? "input-error" : ""
              }`}
              placeholder="Enter new password (min 6 characters)"
              {...register("newPassword", {
                required: "Password is required",
                minLength: { 
                  value: 6, 
                  message: "Password must be at least 6 characters" 
                }
              })}
            />
            {errors.newPassword && (
              <p className="reset-password-error">{errors.newPassword.message}</p>
            )}
          </div>

          <div className="reset-password-form-group">
            <label htmlFor="confirmPassword" className="reset-password-label">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className={`reset-password-input ${
                errors.confirmPassword ? "input-error" : ""
              }`}
              placeholder="Confirm your new password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => 
                  value === watch("newPassword") || "Passwords do not match"
              })}
            />
            {errors.confirmPassword && (
              <p className="reset-password-error">{errors.confirmPassword.message}</p>
            )}
          </div>
          
          <button 
            type="submit" 
            className="reset-password-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>
        
        
      </div>
    </div>
  );
}

export default ResetPassword;