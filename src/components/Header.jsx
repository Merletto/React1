// Header.jsx
import React from "react";

const Header = () => {
  return (
    <header className="w-[80%] mx-auto flex justify-between items-center px-5 sm:px-10 py-4 fixed top-0 z-20 backdrop-blur-md">
      {/* Home */}
      <button className="text-white font-bold text-lg hover:text-light-100 transition-colors">
        Home
      </button>

      {/* Botones de perfil y logout */}
      <div className="flex gap-4">
        <button className="text-white font-medium hover:text-light-100 transition-colors">
          Profile
        </button>
        <button className="text-white font-medium hover:text-light-100 transition-colors">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;