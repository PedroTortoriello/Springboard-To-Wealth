import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../images/Logo.png";

const Header: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="dark:bg-gray-900 dark:text-gray-200 font-din">
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Header */}
      <header className="bg-gradient-to-r bg-slate-200 text-white shadow-md p-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-20 max-h-[60px] sm:max-h-[80px] w-auto object-contain" />
        </div>

      </header>

      {/* Page Content */}
      <main className="p-6 bg-gray-100 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
};

export default Header;
