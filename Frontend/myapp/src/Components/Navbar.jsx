import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

  // useNavigate is used to move to another page 
  const navigate = useNavigate(); 
  // Logout function 
  const handleLogout = () => { 
  // Remove the current user's token 
  localStorage.removeItem("token"); 
  // Move the user to the Login page 
  navigate("/login"); 
};

  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        📚 <span>BookKeeper</span>
      </Link>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/books">Books</Link>

        <Link to="/category">Categories</Link>

        <Link to="/library">Library Records</Link>

      </div>

      {/* Show Logout button only on Home page */}

      {location.pathname === "/" && 
      (
      <div className="nav-buttons"> 
        {/* Logout button */} 
        <button className="logout-btn" onClick={handleLogout} > Logout </button>

        {/* <Link to="/login" className="login-btn"> */}
          {/* Login */}
        {/* </Link> */}

        {/* <Link to="/signup" className="signup-btn"> */}
          {/* Sign Up */}
        {/* </Link> */}

       </div> 
      )}
    </nav>
  );
}

export default Navbar;