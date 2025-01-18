import React, { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

const Header: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const toggleType = (type: string) => {
    setSelectedTypes((prevSelectedTypes) =>
      prevSelectedTypes.includes(type)
        ? prevSelectedTypes.filter((t) => t !== type)
        : [...prevSelectedTypes, type]
    );
  };
  return (
    <div className="dark:bg-gray-900 dark:text-gray-200 font-din">
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Header */}

      <header className="bg-gradient-to-r from-green-500 via-yellow-40 via-red-40 to-blue-400 text-white shadow-md p-4 flex items-center justify-between">

      <div className="flex justify-center items-center p-6 bg-gray-100 rounded-lg shadow-md mt-4">
        <div className="flex space-x-6">
          {[
            { type: "Deal Input", icon: "input" },
            { type: "Results", icon: "assessment" },
            { type: "Carry Costs", icon: "attach_money" },
            { type: "Takedown/Hard Money", icon: "money" },
          ].map(({ type, icon }) => (
            <button
              key={type}
              onClick={() => toggleType(type)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full shadow-md transition-all transform ${
                selectedTypes.includes(type)
                  ? "bg-indigo-500 text-black shadow-lg scale-105"
                  : "bg-white border text-black hover:bg-gray-200"
              }`}
            >
              <span className="material-icons">{icon}</span>
              <span>{type}</span>
            </button>
          ))}
        </div>
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
