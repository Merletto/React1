// Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext.jsx";

const Header = () => {
  const navigate = useNavigate();

  const {user} = useAuth()

  const logoutClick = ( ) => {
    navigate("/login")
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md">
      
      <div className="max-w-7xl mx-auto flex justify-between items-center px-5 sm:px-10 py-4">

      {user ? (
      <>
        {/* Home */}
        <Link to="/" className="text-white font-bold text-lg hover:text-light-100 transition-colors duration-300">
          Home
        </Link>
        
        {/* Botones */}
        <div className="flex gap-6">
      
          <Link to="/profile" className=" text-white font-medium hover:text-light-100 transition-colors duration-300">
            Profile
          </Link>
          <button onClick={logoutClick} className="text-white font-medium hover:text-light-100 transition-colors duration-300">
            Logout
          </button>
        </div>
      </>
      ) : (
       <div className="flex gap-6">
        <Link to="/login" className=" text-white font-medium hover:text-light-100 transition-colors duration-300">
            Login
        </Link>
      </div>
      )}

      
      
      </div>
    </header>
  );
};

export default Header;