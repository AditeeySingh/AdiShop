import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Send, CreditCard, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Adi<span className="text-purple-500">SHOP</span></h3>
            <p className="text-gray-400 mb-4">
              Your destination for high-quality products at competitive prices. We pride ourselves on exceptional customer service and fast shipping.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-purple-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-purple-500 transition-colors">Shop</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-purple-500 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-400 hover:text-purple-500 transition-colors">Wishlist</Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-purple-500 transition-colors">Cart</Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">Contact Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">FAQs</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">Shipping Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">Returns & Exchanges</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for updates on new products and special promotions.
            </p>
            <form className="flex mb-4">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 text-white py-2 px-3 rounded-l-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-500 flex-grow"
              />
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-r-md px-3 transition-colors"
              >
                <Send size={18} />
              </button>
            </form>
            <div className="flex items-center text-gray-400 space-x-6">
              <div className="flex items-center">
                <CreditCard size={16} className="mr-2" />
                <span className="text-sm">Secure Payments</span>
              </div>
              <div className="flex items-center">
                <Phone size={16} className="mr-2" />
                <span className="text-sm">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} LUXESHOP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;