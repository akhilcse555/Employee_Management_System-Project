import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context_api/AuthContext";


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
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
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/Login" className="hover:underline">Login</Link>
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
                    <button onClick={logout}>Logout</button>
                </>
                ) : (
                <>
                    <Link to="/Login" className="hover:underline" onClick={toggleMenu}>Login</Link> 
                    </>
                )}
                </div>


            )}
        </nav>
    );
};

export default Navbar;
