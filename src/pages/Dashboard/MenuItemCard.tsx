import React from "react";

interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
}

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden hover:scale-105 transform transition-all duration-300 w-60">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-60 object-cover rounded-t-5xl"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-black truncate">{item.name}</h3>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
          {item.description}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-bold text-orange-500">
            R$ {item.price.toFixed(2)}
          </span>
          <button className="px-3 py-1.5 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 hover:shadow-md transition-all">
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
