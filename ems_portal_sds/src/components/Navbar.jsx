import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context_api/AuthContext";
import { useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { useDispatch } from "react-redux";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    const handleLogout = () => {
      dispatch(logout());
    };

    return (
        <nav className="bg-blue-600 text-white px-6 py-4">
            <div className="flex justify-between items-center">
                <h6 className="text-xl font-bold">
                    Employee Management System of SDSI
                </h6>

                {/* Hamburger Button - Visible only on small screens */}
                <button
                    className="text-white text-2xl md:hidden focus:outline-none"
                    onClick={toggleMenu}
                >
                    {isOpen ? "✕" : "☰"}
                </button>

                {/* Desktop Links */}
        <div className="hidden md:flex space-x-4 font-bold">
                {user ? (
          <>
            <Link to="/" className="hover:underline">Dashboard</Link>
            <Link to="/Addemployee" className="hover:underline">Addemployee</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/Login" className="hover:underline">Login</Link>
            <Link to="/admin-signup" className="hover:underline">Admin-Singup</Link>
          </>
        )}
        </div>
                
                    
                    
                
    </div>

            {/* Mobile Links */}
            {isOpen && (
                
                <div className="md:hidden flex flex-col mt-4 space-y-2 font-bold">
                    {user ? (
                 <>
                    <Link to="/" className="hover:underline" onClick={toggleMenu}>Dashboard</Link>
                    <Link to="/Addemployee" className="hover:underline" onClick={toggleMenu}>Addemployee</Link>
                    <button onClick={handleLogout}>Logout</button>
                </>
                ) : (
                    <>
                    <Link to="/Login" className="hover:underline" onClick={toggleMenu}>Login</Link> 
                    <Link to="/admin-signup" className="hover:underline">Admin-Singup</Link>
                    </>
                )}
                </div>


            )}
        </nav>
    );
};

export default Navbar;
