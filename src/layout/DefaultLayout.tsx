import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../images/Logo.png";

const Header: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="dark:bg-gray-900 dark:text-gray-200 font-din flex flex-col min-h-screen">
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Header */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-md p-4 flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src={Logo} 
            alt="Logo" 
            className="h-20 max-h-[60px] sm:max-h-[80px] w-auto object-contain" 
          />
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-grow p-6 bg-gray-100 dark:bg-gray-800 pb-20">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>

      {/* Footer */}
      <footer className="bg-gray text-white shadow-md p-4 flex items-center justify-between">
        <p className="text-black-2 font-helvetica font-sm">&copy; 2025 Springboard to Wealth. Todos os direitos reservados.</p>
        {/* Button */}
        <a
          href="https://www.springboard-community.com/home"
          target="_blank" 
          className="mt-2 inline-block bg-[#44C63A] text-white text-sm py-2 px-5 rounded-3xl hover:bg-[#36A02C] transition duration-300"
        >
          Join Springboard to Wealth
        </a>

      </footer>
    </div>
  );
};

export default Header;
