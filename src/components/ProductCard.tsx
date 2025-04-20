import React from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

type ProductCardProps = {
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
    category: string;
    description: string;
  };
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, state } = useShop();
  
  const isInWishlist = state.wishlist.some(item => item.id === product.id);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };
  
  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };
  
  // Truncate title if it's too long
  const truncatedTitle = product.title.length > 40
    ? `${product.title.substring(0, 40)}...`
    : product.title;
  
  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 border border-gray-800 h-full flex flex-col">
        <div className="relative pt-4 px-4">
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-6 right-6 z-10 p-1.5 rounded-full ${
              isInWishlist ? 'bg-purple-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            } transition-colors`}
          >
            <Heart size={18} fill={isInWishlist ? 'currentColor' : 'none'} />
          </button>
          
          <div className="h-48 flex items-center justify-center p-4 overflow-hidden bg-gray-800 rounded-md">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
        
        <div className="p-4 flex-grow flex flex-col">
          <span className="text-xs text-purple-400 uppercase tracking-wider">
            {product.category}
          </span>
          
          <h3 className="font-medium text-white mt-1 mb-2 h-12">
            {truncatedTitle}
          </h3>
          
          <div className="flex items-center mt-auto mb-2">
            <div className="flex items-center text-yellow-500">
              <Star size={16} fill="currentColor" />
              <span className="ml-1 text-sm">
                {product.rating.rate.toFixed(1)}
              </span>
            </div>
            <span className="text-gray-400 text-xs ml-2">
              ({product.rating.count} reviews)
            </span>
          </div>
          
          <div className="flex justify-between items-center mt-2">
            <span className="text-white font-semibold">
              ${product.price.toFixed(2)}
            </span>
            
            <button
              onClick={handleAddToCart}
              className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full transition-colors flex items-center"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;