import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Books from "./pages/Books";
import Category from "./pages/Category";
import LibraryRecord from "./pages/LibraryRecord";

import NavbarWrapper from "./Components/NavbarWrapper";
import ProtectedRoute from "./Components/ProtectedRoute";

import ForgetPassword from "./Pages/ForgetPassword";

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