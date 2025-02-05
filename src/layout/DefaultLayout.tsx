import React, { ReactNode } from 'react'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../images/Logo.png'

const Header: React.FC<{ children: ReactNode }> = ({ children }) => {

  return (
    <div className="dark:bg-gray-900 dark:text-gray-200 font-din">
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Header */}
      <header className="bg-gradient-to-r bg-slate-200 text-white shadow-md p-4 flex items-center justify-between">
        
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-30 max-h-[80px] w-auto object-contain" />
        </div>
      
        <a
          href="https://www.springboard-community.com/home"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-400 transition shadow-md text-center"
        >
          Join Springboard to Wealth
        </a>
      </header>

      {/* Page Content */}
      <main className="p-6 bg-gray-100 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
};

export default Header;
