import React, { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../images/SBTW1.png'

const Header: React.FC<{ children: ReactNode }> = ({ children }) => {

  return (
    <div className="dark:bg-gray-900 dark:text-gray-200 font-din">
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Header */}

      <header className="bg-gradient-to-r bg-slate-200 text-white shadow-md p-4 flex items-center justify-between">

      <div className="flex justify-center items-center p-6 bg-white rounded-lg shadow-md mt-4">
        <div className="flex space-x-6">
          <img src={Logo} alt="" className='h-15 object-contain'/>
        </div>
      </div>
      <a
              href="https://www.springboard-community.com/home"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-400 transition shadow-md"
            >
              Join Circle
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
