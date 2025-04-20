import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import ProductGrid from '../components/ProductGrid';
import CategoryFilter from '../components/CategoryFilter';
import { Grid, List, SlidersHorizontal } from 'lucide-react';

const ProductsPage: React.FC = () => {
  const { state, dispatch } = useShop();
  const location = useLocation();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Parse URL parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    
    if (category) {
      dispatch({ type: 'SET_CATEGORY', payload: category });
    }
  }, [location, dispatch]);
  
  // Sort products
  const [sortOption, setSortOption] = useState('featured');
  
  const sortedProducts = [...state.filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating.rate - a.rating.rate;
      default: // featured - sort by rating
        return b.rating.rate - a.rating.rate;
    }
  });
  
  return (
    <div className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Our Products</h1>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center text-sm bg-gray-800 hover:bg-gray-700 py-2 px-3 rounded transition-colors"
            >
              <SlidersHorizontal size={16} className="mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            
            <div className="hidden sm:flex items-center border border-gray-700 rounded overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${
                  viewMode === 'grid' ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-400'
                }`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${
                  viewMode === 'list' ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-400'
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar - Filters */}
          <div className={`md:w-1/4 lg:w-1/5 ${!showFilters && 'hidden md:block'}`}>
            <CategoryFilter />
            
            <div className="bg-gray-900 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-medium mb-3">Sort By</h3>
              <div className="space-y-2">
                {[
                  { value: 'featured', label: 'Featured' },
                  { value: 'price-low', label: 'Price: Low to High' },
                  { value: 'price-high', label: 'Price: High to Low' },
                  { value: 'rating', label: 'Customer Rating' },
                ].map(option => (
                  <div key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      id={option.value}
                      name="sort"
                      value={option.value}
                      checked={sortOption === option.value}
                      onChange={() => setSortOption(option.value)}
                      className="text-purple-600 focus:ring-purple-500 h-4 w-4 bg-gray-800 border-gray-600"
                    />
                    <label htmlFor={option.value} className="ml-2 text-sm text-gray-300">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:w-3/4 lg:w-4/5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-400">
                Showing {sortedProducts.length} products
                {state.category !== 'all' && ` in ${state.category}`}
              </p>
              
              <div className="sm:hidden">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 p-2.5"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>
            </div>
            
            {viewMode === 'grid' ? (
              <ProductGrid products={sortedProducts} loading={state.loading} />
            ) : (
              <div className="space-y-4">
                {state.loading ? (
                  <p>Loading...</p>
                ) : (
                  sortedProducts.map(product => (
                    <div 
                      key={product.id} 
                      className="bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-800 p-4 transition-all hover:shadow-xl"
                    >
                      <div className="flex">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-800 rounded-md flex-shrink-0 overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.title} 
                            className="w-full h-full object-contain p-2"
                          />
                        </div>
                        
                        <div className="ml-4 flex-1">
                          <h3 className="font-medium text-white">{product.title}</h3>
                          <p className="text-sm text-gray-400 mt-1 line-clamp-2">{product.description}</p>
                          
                          <div className="mt-2 flex items-center">
                            <div className="flex items-center text-yellow-500">
                              {[...Array(5)].map((_, i) => (
                                <span key={i}>
                                  <svg
                                    className={`w-4 h-4 ${
                                      i < Math.round(product.rating.rate)
                                        ? 'text-yellow-500 fill-current'
                                        : 'text-gray-600'
                                    }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                  </svg>
                                </span>
                              ))}
                              <span className="ml-1 text-sm text-white">
                                {product.rating.rate.toFixed(1)}
                              </span>
                            </div>
                            <span className="text-gray-400 text-xs ml-2">
                              ({product.rating.count} reviews)
                            </span>
                          </div>
                        </div>
                        
                        <div className="ml-4 flex-shrink-0 flex flex-col justify-between items-end">
                          <span className="text-white font-bold text-xl">
                            ${product.price.toFixed(2)}
                          </span>
                          
                          <button
                            onClick={() => {}}
                            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition-colors text-sm"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;