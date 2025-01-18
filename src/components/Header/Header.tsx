import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-orange-500 shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Cardápio<span className="text-black">Digital</span>
        </h1>
        <button className="px-4 py-2 bg-black text-orange-500 font-medium rounded-lg shadow-md hover:bg-orange-600 hover:text-white transition-all">
          Ver Pedidos
        </button>
      </div>
    </header>
  );
};

export default Header;
