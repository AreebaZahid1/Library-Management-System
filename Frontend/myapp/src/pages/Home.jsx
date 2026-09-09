import React from "react";
import "./Style/Home.css";
// import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
  return (
 <>
      {/* <Navbar /> */}
      
    <div className="home">

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          {/* <span className="badge">📚 Modern Library</span> */}

          <h1>
            Smart Library <br />
            Management System
          </h1>

          <p>
            Manage books, members, categories and borrowing records
            efficiently with a clean and modern library management platform.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn" onClick={() => navigate("/books")}>Explore Books</button>
            {/* <button className="secondary-btn">Learn More</button> */}
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800"
            alt="Library"
          />
        </div>
      </section>

      {/* Stats */}

      <section className="stats">

        <div className="stat-card">
          <h2>1200+</h2>
          <p>Books</p>
        </div>

        <div className="stat-card">
          <h2>350+</h2>
          <p>Members</p>
        </div>

        <div className="stat-card">
          <h2>45</h2>
          <p>Categories</p>
        </div>

        <div className="stat-card">
          <h2>98%</h2>
          <p>Accuracy</p>
        </div>

      </section>

      {/* Features */}

      <section className="features">

        <h2>Why Choose Our Library?</h2>

        <p className="section-text">
          Everything you need to manage a modern digital library.
        </p>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="icon">📖</div>
            <h3>Book Management</h3>
            <p>
              Easily add, edit, delete and organize books in your library.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">👥</div>
            <h3>Member Records</h3>
            <p>
              Maintain complete member profiles and borrowing history.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">📋</div>
            <h3>Issue & Return</h3>
            <p>
              Track issued books, return dates and overdue records.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">📊</div>
            <h3>Analytics</h3>
            <p>
              View statistics and monitor overall library performance.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">🔍</div>
            <h3>Smart Search</h3>
            <p>
              Search books instantly by title, author or category.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">🔒</div>
            <h3>Secure System</h3>
            <p>
              Keep all library data protected and safely managed.
            </p>
          </div>

        </div>

      </section>

      {/* Featured */}

      <section className="books">

        <h2>Featured Categories</h2>

        <div className="book-grid">

          <div className="book-card">
            <h3>Computer Science</h3>
            <p>150 Books</p>
          </div>

          <div className="book-card">
            <h3>Business</h3>
            <p>110 Books</p>
          </div>

          <div className="book-card">
            <h3>History</h3>
            <p>95 Books</p>
          </div>

          <div className="book-card">
            <h3>Mathematics</h3>
            <p>120 Books</p>
          </div>

        </div>

      </section>

     

      {/* Footer */}

      <footer>

        © 2026 Library Management System | All Rights Reserved

      </footer>

    </div>
    </>
  );
}

export default Home;