import { useForm } from "react-hook-form";
import axios from "axios";
import { Server_URL } from "../../../utils/config";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css"; 

function ForgotPassword() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${Server_URL}users/forgot-password`, data);
      alert(res.data.message);
      navigate("/verifyotp", { state: { email: data.email } });
    } catch (err) {
      alert(err.response?.data?.message || "Error sending OTP");
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2 className="forgot-password-title">Forgot Password</h2>
        <p className="forgot-password-subtitle">
          Enter your email to receive a password reset OTP
        </p>
        
        <form className="forgot-password-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="forgot-password-form-group">
            <label htmlFor="email" className="forgot-password-label">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className={`forgot-password-input ${
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
              <p className="forgot-password-error">{errors.email.message}</p>
            )}
          </div>
          
          <button 
            type="submit" 
            className="forgot-password-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
        
        <div className="forgot-password-footer">
          Remember your password?{" "}
          <a href="/login" className="forgot-password-login-link">
            Login here
          </a>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;