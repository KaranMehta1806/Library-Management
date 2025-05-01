import { useForm } from "react-hook-form";
import axios from "axios";
import { Server_URL } from "../../../utils/config";
import { useNavigate, useLocation } from "react-router-dom";
import "./VerifyOtp.css";

function VerifyOTP() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${Server_URL}users/verify-otp`, data);
      alert(res.data.message);
      navigate("/resetpass", { state: { email: data.email } });
    } catch (err) {
      alert(err.response?.data?.message || "Invalid or expired OTP");
    }
  };

  return (
    <div className="verify-otp-container">
      <div className="verify-otp-card">
        <h2 className="verify-otp-title">Verify OTP</h2>
        <p className="verify-otp-subtitle">
          We've sent a 6-digit code to <span className="verify-otp-email">{email}</span>
        </p>
        
        <form className="verify-otp-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="verify-otp-form-group">
            <label htmlFor="email" className="verify-otp-label">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className={`verify-otp-input ${
                errors.email ? "input-error" : ""
              }`}
              placeholder="Enter your registered email"
              defaultValue={email}
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
            />
            {errors.email && (
              <p className="verify-otp-error">{errors.email.message}</p>
            )}
          </div>

          <div className="verify-otp-form-group">
            <label htmlFor="otp" className="verify-otp-label">
              OTP Code
            </label>
            <div className="otp-input-container">
              <input
                id="otp"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="6"
                className={`verify-otp-input otp-input ${
                  errors.otp ? "input-error" : ""
                }`}
                placeholder="Enter 6-digit code"
                {...register("otp", { 
                  required: "OTP is required",
                  minLength: {
                    value: 6,
                    message: "OTP must be 6 digits"
                  },
                  maxLength: {
                    value: 6,
                    message: "OTP must be 6 digits"
                  },
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "OTP must be numeric"
                  }
                })}
              />
              <button 
                type="button" 
                className="resend-otp-btn"
                onClick={() => alert("OTP resent!")}
              >
                Resend OTP
              </button>
            </div>
            {errors.otp && (
              <p className="verify-otp-error">{errors.otp.message}</p>
            )}
          </div>
          
          <button 
            type="submit" 
            className="verify-otp-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
        
        <div className="verify-otp-footer">
          Didn't receive the code?{" "}
          <button 
            className="verify-otp-resend-link"
            onClick={() => alert("OTP resent!")}
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyOTP;