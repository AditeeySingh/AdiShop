import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const WishlistPage: React.FC = () => {
  const { state, toggleWishlist, addToCart } = useShop();
  
  const handleAddToCart = (productId: number) => {
    const product = state.wishlist.find(item => item.id === productId);
    if (product) {
      addToCart(product);
    }
  };
  
  if (state.wishlist.length === 0) {
    return (
      <div className="bg-black text-white min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center py-16">
            <Heart size={64} className="mx-auto mb-6 text-gray-500" />
            <h1 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
            <p className="text-gray-400 mb-8">
              You haven't saved any products to your wishlist yet.
            </p>
            <Link
              to="/products"
              className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-md transition-colors inline-flex items-center"
            >
              Discover Products <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-black text-white min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 flex items-center">
          <Heart size={28} className="mr-3" />
          Your Wishlist
        </h1>
        
        <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800 text-gray-300 text-sm uppercase">
                <tr>
                  <th className="py-3 px-4 text-left">Product</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-center">Rating</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {state.wishlist.map(product => (
                  <tr key={product.id} className="hover:bg-gray-800 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded bg-gray-800">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="h-full w-full object-contain object-center p-1"
                          />
                        </div>
                        <div className="ml-4">
                          <Link 
                            to={`/product/${product.id}`}
                            className="font-medium text-white hover:text-purple-400 transition-colors"
                          >
                            {product.title}
                          </Link>
                          <p className="text-sm text-gray-400 capitalize">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-medium">${product.price.toFixed(2)}</td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center">
                        <div className="text-yellow-500 flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
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
                          ))}
                          <span className="ml-1 text-sm text-white">
                            {product.rating.rate.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleAddToCart(product.id)}
                          className="text-purple-500 hover:text-purple-400 transition-colors p-1"
                          title="Add to Cart"
                        >
                          <ShoppingCart size={18} />
                        </button>
                        <button
                          onClick={() => toggleWishlist(product)}
                          className="text-red-500 hover:text-red-400 transition-colors p-1"
                          title="Remove from Wishlist"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-8 flex justify-between">
          <Link
            to="/products"
            className="text-purple-500 hover:text-purple-400 flex items-center transition-colors"
          >
            Continue Shopping <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;