import React from "react";

interface MenuCategoryProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const MenuCategory: React.FC<MenuCategoryProps> = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex justify-center space-x-6 mt-8">
      {categories.map((category) => (
        <button
          key={category}
          className={`px-6 py-2 text-lg font-medium rounded-full transition-all shadow-md ${
            activeCategory === category
              ? "bg-orange-500 text-white"
              : "bg-black text-orange-500 hover:bg-orange-600 hover:text-white"
          }`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default MenuCategory;
