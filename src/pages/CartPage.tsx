import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ShoppingBag, ArrowRight, CreditCard, Info } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import CartItem from '../components/CartItem';

const CartPage: React.FC = () => {
  const { state, clearCart, getTotalPrice } = useShop();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (couponCode.toLowerCase() === 'discount20') {
      setCouponError('Coupon applied successfully!');
      // In a real app, we would apply the discount here
    } else {
      setCouponError('Invalid coupon code');
    }
  };
  
  if (state.cart.length === 0) {
    return (
      <div className="bg-black text-white min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center py-16">
            <ShoppingBag size={64} className="mx-auto mb-6 text-gray-500" />
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-400 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link
              to="/products"
              className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-md transition-colors inline-flex items-center"
            >
              Start Shopping <ArrowRight size={18} className="ml-2" />
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
          <ShoppingCart size={28} className="mr-3" />
          Your Shopping Cart
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
              <div className="p-6">
                {state.cart.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
              
              <div className="bg-gray-800 p-4 flex flex-wrap justify-between items-center">
                <button
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-400 transition-colors"
                >
                  Clear Cart
                </button>
                
                <Link
                  to="/products"
                  className="text-purple-500 hover:text-purple-400 flex items-center transition-colors"
                >
                  Continue Shopping <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tax</span>
                    <span>${(getTotalPrice() * 0.1).toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-800 my-4 pt-4">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-xl font-bold">
                      ${(getTotalPrice() * 1.1).toFixed(2)}
                    </span>
                  </div>
                  
                  <form onSubmit={handleApplyCoupon} className="mb-6">
                    <div className="flex mb-2">
                      <input
                        type="text"
                        placeholder="Coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="bg-gray-800 text-white flex-grow py-2 px-3 rounded-l-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                      <button
                        type="submit"
                        className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-r-md transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <p className={`text-sm ${couponError.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
                        {couponError}
                      </p>
                    )}
                  </form>
                  
                  <Link
                    to="/checkout"
                    className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-md transition-colors font-medium w-full block text-center flex items-center justify-center"
                  >
                    <CreditCard size={18} className="mr-2" />
                    Proceed to Checkout
                  </Link>
                </div>
                
                <div className="mt-6 flex items-start bg-gray-800 p-3 rounded-md text-sm">
                  <Info size={16} className="text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-400">
                    Your order qualifies for free shipping. Items are typically delivered within 3-5 business days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;