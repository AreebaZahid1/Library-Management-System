import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Style/Auth.css";
// import axios from "axios";
import api from "./Axios/api"; // Import the configured Axios instance

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const handleSignup = async(e) => {
    e.preventDefault();

    try
    {
       // FormData is used to send text and image files together
        const formData = new FormData();

        formData.append("name", name);
        formData.append("email", email);
        formData.append("number", number);
        formData.append("password", password);
        formData.append("profilePicture", profilePicture);

      // response ka obj banaya axios.API ki jis k parameters hain url of the API and body
       const response = await api.post('https://library-management-system-hdxd.vercel.app/api/auth/register', formData)
       console.log(response.data.message)
      alert(response.data.message);
      // Redirect to Login page
      navigate("/login");
    }
    catch(error)
    {
     console.log("Signup error:", error);
    alert(error.response?.data?.message ||"Error creating account")
    }

  }

  return (
    <div className="container">
      <div className="form-box">

        <h2>Create Account</h2>
        <p className="subtitle">Register your account</p>

        <form onSubmit={handleSignup}>

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            <input
              type="text"
              placeholder="03XXXXXXXXX"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>setProfilePicture(e.target.files[0])} // e.target.files[0] gets selected image file
            />
          </div>

          <button type="submit">
            Sign Up
          </button>

          <p className="bottom-text">
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>

        </form>

      </div>
    </div>
  );
}

export default Signup;