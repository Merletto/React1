// Header.jsx
import React from "react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md">
      
      <div className="max-w-7xl mx-auto flex justify-between items-center px-5 sm:px-10 py-4">
        
        {/* Home */}
        <button className="text-white font-bold text-lg hover:text-light-100 transition-colors duration-300">
          Home
        </button>

        {/* Botones */}
        <div className="flex gap-6">
          <button className="text-white font-medium hover:text-light-100 transition-colors duration-300">
            Profile
          </button>
          <button className="text-white font-medium hover:text-light-100 transition-colors duration-300">
            Logout
          </button>
        </div>
      
      </div>
    </header>
  );
};

export default Header;