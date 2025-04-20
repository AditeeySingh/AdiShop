import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Truck, ShoppingBag, ArrowRight } from 'lucide-react';

const OrderConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const [orderNumber] = useState(`ORD-${Math.floor(10000 + Math.random() * 90000)}`);
  const [estimatedDelivery] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  });
  
  // Redirect if user refreshes this page
  useEffect(() => {
    const hasOrderBeenPlaced = sessionStorage.getItem('orderPlaced');
    
    if (!hasOrderBeenPlaced) {
      // Set this in session storage, so they can refresh once
      sessionStorage.setItem('orderPlaced', 'true');
    }
    
    // Cleanup function - will run on component unmount
    return () => {
      sessionStorage.removeItem('orderPlaced');
    };
  }, [navigate]);
  
  return (
    <div className="bg-black text-white min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-900 bg-opacity-30 rounded-full mb-6">
              <CheckCircle size={48} className="text-purple-500" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
            
            <div className="bg-gray-800 rounded-lg p-6 text-left mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Order Number:</p>
                  <p className="font-semibold">{orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Estimated Delivery:</p>
                  <p className="font-semibold">{estimatedDelivery}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-6">Track Your Order</h2>
              
              <div className="relative">
                <div className="absolute left-0 top-12 w-full">
                  <div className="h-1 bg-gray-800 w-full relative">
                    <div className="h-1 bg-purple-600 absolute left-0 top-0" style={{ width: '33%' }}></div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <div className="text-center relative">
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center mx-auto mb-2 relative z-10">
                      <CheckCircle size={20} className="text-white" />
                    </div>
                    <p className="text-xs text-purple-500 font-semibold">Order Placed</p>
                  </div>
                  
                  <div className="text-center relative">
                    <div className="w-10 h-10 rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center mx-auto mb-2 relative z-10">
                      <Package size={18} className="text-gray-500" />
                    </div>
                    <p className="text-xs text-gray-500 font-semibold">Processing</p>
                  </div>
                  
                  <div className="text-center relative">
                    <div className="w-10 h-10 rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center mx-auto mb-2 relative z-10">
                      <Truck size={18} className="text-gray-500" />
                    </div>
                    <p className="text-xs text-gray-500 font-semibold">Shipped</p>
                  </div>
                  
                  <div className="text-center relative">
                    <div className="w-10 h-10 rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center mx-auto mb-2 relative z-10">
                      <ShoppingBag size={18} className="text-gray-500" />
                    </div>
                    <p className="text-xs text-gray-500 font-semibold">Delivered</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-400 mb-6">
                A confirmation email has been sent to your email address with the order details.
              </p>
              
              <Link
                to="/"
                className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-md transition-colors inline-flex items-center"
              >
                Continue Shopping <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;