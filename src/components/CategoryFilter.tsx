import React from 'react';
import { useShop } from '../context/ShopContext';

const CategoryFilter: React.FC = () => {
  const { state, dispatch } = useShop();
  
  // Get unique categories from products
  const categories = ['all', ...new Set(state.products.map(p => p.category))];
  
  const handleCategoryChange = (category: string) => {
    dispatch({ type: 'SET_CATEGORY', payload: category });
  };
  
  return (
    <div className="bg-gray-900 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-medium mb-3">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              state.category === category
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;