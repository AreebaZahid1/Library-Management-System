import React from "react";
import Navbar from "./Navbar";

function NavbarWrapper({ children }) {
  return (
    <>
      {/* Show Navbar */}
      <Navbar />

      {/* Show the current page */}
      <main className="main-content">
        {children}
      </main>
    </>
  );
}

export default NavbarWrapper;