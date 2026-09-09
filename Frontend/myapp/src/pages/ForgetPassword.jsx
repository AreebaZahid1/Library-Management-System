import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Style/ForgetPassword.css";

function ForgetPassword() {

const navigate = useNavigate();

// Form states
const [email, setEmail] = useState("");
const [otp, setOtp] = useState("");
const [newPassword, setNewPassword] = useState("");

// Check whether OTP is sent
const [otpSent, setOtpSent] = useState(false);

// Show success or error message
const [message, setMessage] = useState("");

// Send OTP to email
const sendOTP = async (e) => {
   e.preventDefault();
   try 
   {
    const response = await axios.post("http://localhost:3000/api/auth/forgetPassword",{email,});

    setMessage(response.data.message);
    // Show OTP and new-password form
    setOtpSent(true);
   } 
   catch (error) 
   {
    setMessage(error.response?.data?.message ||"Something went wrong");
   }
};

// Verify OTP and reset password
const resetPassword = async (e) => {
  e.preventDefault();

  try 
  {
    const response = await axios.post("http://localhost:3000/api/auth/reset-password",{  email,  otp,  newPassword,});

    setMessage(response.data.message);
  // Go to login page after 1.5 seconds
    setTimeout(() => { navigate("/login"); }, 1500);
  } 
  catch (error) 
  {
    setMessage(error.response?.data?.message ||"Something went wrong");
  }
};

return ( 
<div className="forgot-password-page">

  <div className="forgot-password-card">

    {/* Icon */}

    <div className="forgot-password-icon">
      🔐
    </div>


    {/* First Screen */}

    {!otpSent && (
      <>
        <h2>
          Forgot Password?
        </h2>

        <p className="forgot-description">
          Enter your email address and we will
          send you a verification OTP.
        </p>


        {/* Message */}
        {message && (<p className="forgot-message">{message}</p>)}

        {/* Email Form */}
        <form className="forgot-form"onSubmit={sendOTP}>
          <div className="forgot-input-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>setEmail(e.target.value)}
              required
            />

          </div>

          <button type="submit" className="forgot-button">
            Send OTP
          </button>

        </form>
      </>
    )}


    {/* Second Screen */}

    {otpSent && (
      <>
        <h2>
          Reset Password
        </h2>

        <p className="forgot-description">
          Enter the OTP sent to your email
          and create a new password.
        </p>


        {/* Message */}
        {message && (<p className="forgot-message">{message}</p>)}

        {/* Reset Password Form */}
        <form className="forgot-form"onSubmit={resetPassword}>

          {/* OTP */}

          <div className="forgot-input-group">

            <label>
              Verification OTP
            </label>

            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) =>setOtp(e.target.value)}
              maxLength="6"
              required
            />

          </div>

          {/* New Password */}

          <div className="forgot-input-group">

            <label>
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) =>setNewPassword(e.target.value)}
              required
            />

          </div>

          {/* Reset Button */}
          <button type="submit"className="forgot-button">
            Reset Password
          </button>

        </form>
      </>
    )}


    {/* Back to Login */}

    <button className="back-login"onClick={() =>navigate("/login")}>
      ← Back to Login
    </button>

  </div>

</div>

);
}

export default ForgetPassword;
