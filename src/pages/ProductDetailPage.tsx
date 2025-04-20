import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Check, Star, Truck, ShieldCheck, RotateCw } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state, addToCart, toggleWishlist } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  
  // Find product by ID
  const product = state.products.find(p => p.id === parseInt(id || '0'));
  const isInWishlist = state.wishlist.some(p => p.id === parseInt(id || '0'));
  
  // Related products - products from the same category
  const relatedProducts = product
    ? state.products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
    : [];
  
  // Handle "Add to Cart" button click
  const handleAddToCart = () => {
    if (product) {
      // Add the product with the selected quantity
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      
      // Show "Added to Cart" message
      setIsAddedToCart(true);
      
      // Reset the message after 3 seconds
      setTimeout(() => {
        setIsAddedToCart(false);
      }, 3000);
    }
  };
  
  if (state.loading) {
    return (
      <div className="bg-black text-white min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded w-1/4 mb-8"></div>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2 h-96 bg-gray-800 rounded-lg"></div>
              
              <div className="md:w-1/2">
                <div className="h-8 bg-gray-800 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-800 rounded w-1/4 mb-6"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-800 rounded w-full"></div>
                  <div className="h-4 bg-gray-800 rounded w-full"></div>
                  <div className="h-4 bg-gray-800 rounded w-5/6"></div>
                </div>
                
                <div className="h-10 bg-gray-800 rounded w-1/3 mt-8 mb-4"></div>
                
                <div className="h-12 bg-gray-800 rounded w-full mt-8"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="bg-black text-white min-h-screen py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="text-gray-400 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/products"
            className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-md transition-colors inline-block"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-black text-white min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-400 mb-8">
          <Link to="/" className="hover:text-purple-400">Home</Link> {' / '}
          <Link to="/products" className="hover:text-purple-400">Products</Link> {' / '}
          <Link to={`/products?category=${product.category}`} className="hover:text-purple-400 capitalize">
            {product.category}
          </Link> {' / '}
          <span className="text-gray-300">{product.title}</span>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          {/* Product Image */}
          <div className="md:w-1/2">
            <div className="bg-gray-900 rounded-lg overflow-hidden p-8 border border-gray-800 flex items-center justify-center h-[500px]">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
          
          {/* Product Details */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={i < Math.floor(product.rating.rate) ? "currentColor" : "none"}
                    className={i < Math.floor(product.rating.rate) ? "" : "text-gray-600"}
                  />
                ))}
                <span className="ml-1 text-white">{product.rating.rate.toFixed(1)}</span>
              </div>
              <span className="text-gray-400 text-sm ml-2">
                ({product.rating.count} reviews)
              </span>
            </div>
            
            <div className="text-2xl font-bold mb-6 text-white">
              ${product.price.toFixed(2)}
            </div>
            
            <p className="text-gray-300 mb-8">{product.description}</p>
            
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-l border-r border-gray-700"
                  >
                    -
                  </button>
                  <span className="bg-gray-800 text-white py-2 px-4">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-r"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 px-6 rounded-md font-medium flex items-center justify-center transition-colors ${
                    isAddedToCart
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-purple-600 hover:bg-purple-700'
                  }`}
                >
                  {isAddedToCart ? (
                    <>
                      <Check size={20} className="mr-2" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} className="mr-2" />
                      Add to Cart
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`py-3 px-6 rounded-md font-medium flex items-center justify-center transition-colors ${
                    isInWishlist
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : 'bg-transparent hover:bg-gray-800 border border-gray-600'
                  }`}
                >
                  <Heart
                    size={20}
                    className="mr-2"
                    fill={isInWishlist ? "currentColor" : "none"}
                  />
                  {isInWishlist ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-6">
              <h3 className="font-semibold mb-4">Shipping & Returns</h3>
              
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <Truck size={18} className="mr-2 text-purple-500" />
                  Free shipping on orders over $50
                </li>
                <li className="flex items-center text-gray-300">
                  <ShieldCheck size={18} className="mr-2 text-purple-500" />
                  2 year extended warranty
                </li>
                <li className="flex items-center text-gray-300">
                  <RotateCw size={18} className="mr-2 text-purple-500" />
                  30 days return policy
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;