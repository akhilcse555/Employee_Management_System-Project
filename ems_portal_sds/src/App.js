import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Addemployee from './pages/Addemployee';
import Editemployee from './pages/Editemployee';

import { Navigate } from "react-router-dom";
import { useAuth } from "./context_api/AuthContext";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}



function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-300">
        <Navbar />
        <div className="p-4 grow">
          <Routes>
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/Addemployee" element={<PrivateRoute><Addemployee /></PrivateRoute>} />
            <Route path="/Editemployee/:id" element={<Editemployee />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
