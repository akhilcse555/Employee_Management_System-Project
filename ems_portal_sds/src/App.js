// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Footer from './components/Footer';
import Addemployee from './pages/Addemployee';
import Editemployee from './pages/Editemployee';
import AdminSignup from './pages/AdminSignup';
import ChangePassword from './pages/ChangePassword';
import ProtectedRoute from './components/Protected.js';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-300">
        <Navbar />
        <div className="p-4 grow">
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/Addemployee" element={<Addemployee />} />
              <Route path="/Editemployee/:id" element={<Editemployee />} />
             
            </Route>
            <Route path="/change-password/:userId" element={<ChangePassword />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-signup" element={<AdminSignup />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
