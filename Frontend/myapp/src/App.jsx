import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import Books from "./Pages/Books.jsx";
import Category from "./Pages/Category.jsx";
import LibraryRecord from "./Pages/LibraryRecord.jsx";

import NavbarWrapper from "./Components/NavbarWrapper";
import ProtectedRoute from "./Components/ProtectedRoute";

import ForgetPassword from "./Pages/ForgetPassword.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetPassword" element={<ForgetPassword />}/>
        
        {/* Protected Routes */}
        {/* Navbar Wrapper */}
        
        <Route path="/" element={<ProtectedRoute><NavbarWrapper><Home /></NavbarWrapper></ProtectedRoute>}/>

        <Route path="/books" element={<ProtectedRoute><NavbarWrapper><Books/></NavbarWrapper></ProtectedRoute>}/>

        <Route path="/category"element={<ProtectedRoute><NavbarWrapper><Category /></NavbarWrapper></ProtectedRoute>}/>

        <Route path="/library"element={<ProtectedRoute><NavbarWrapper><LibraryRecord /></NavbarWrapper></ProtectedRoute>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;