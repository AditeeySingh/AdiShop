import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Menu, X, Search } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const Navbar = () => {
  const { state, dispatch, getItemsCount } = useShop();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value });
  };
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  
  return (
    <nav className="bg-black text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-tight">
            Adi<span className="text-purple-500">SHOP</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-purple-400 transition-colors">
              Home
            </Link>
            <Link to="/products" className="hover:text-purple-400 transition-colors">
              Products
            </Link>
            <Link to="/about" className="hover:text-purple-400 transition-colors">
              About
            </Link>
          </div>
          
          {/* Desktop Search and Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={state.searchTerm}
                onChange={handleSearchChange}
                className="bg-gray-900 text-white rounded-full py-1.5 px-4 focus:outline-none focus:ring-1 focus:ring-purple-500 w-48 transition-all"
              />
              <Search size={18} className="absolute right-3 top-2 text-gray-400" />
            </div>
            
            <Link to="/wishlist" className="relative hover:text-purple-400 transition-colors">
              <Heart size={24} />
              {state.wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {state.wishlist.length}
                </span>
              )}
            </Link>
            
            <Link to="/cart" className="relative hover:text-purple-400 transition-colors">
              <ShoppingCart size={24} />
              {getItemsCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getItemsCount()}
                </span>
              )}
            </Link>
          </div>
          
          {/* Mobile Icons */}
          <div className="flex md:hidden items-center space-x-4">
            <button onClick={toggleSearch} className="focus:outline-none">
              <Search size={22} />
            </button>
            
            <Link to="/wishlist" className="relative">
              <Heart size={22} />
              {state.wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {state.wishlist.length}
                </span>
              )}
            </Link>
            
            <Link to="/cart" className="relative">
              <ShoppingCart size={22} />
              {getItemsCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getItemsCount()}
                </span>
              )}
            </Link>
            
            <button onClick={toggleMenu} className="focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="mt-4 md:hidden">
            <input
              type="text"
              placeholder="Search products..."
              value={state.searchTerm}
              onChange={handleSearchChange}
              className="bg-gray-900 text-white rounded-full py-2 px-4 w-full focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
        )}
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-800">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link 
                  to="/" 
                  className="block py-2 hover:text-purple-400 transition-colors"
                  onClick={toggleMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className="block py-2 hover:text-purple-400 transition-colors"
                  onClick={toggleMenu}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="block py-2 hover:text-purple-400 transition-colors"
                  onClick={toggleMenu}
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;