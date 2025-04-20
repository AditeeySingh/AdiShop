import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, User, MapPin, Package, ShieldCheck, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  cardName: string;
  cardNumber: string;
  expDate: string;
  cvv: string;
};

type FormErrors = {
  [key in keyof FormData]?: string;
};

const CheckoutPage: React.FC = () => {
  const { state, getTotalPrice, clearCart } = useShop();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  
  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    // Validate personal info
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Validate address
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zip.trim()) newErrors.zip = 'ZIP code is required';
    
    // Validate payment
    if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    
    if (!formData.expDate.trim()) {
      newErrors.expDate = 'Expiration date is required';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expDate)) {
      newErrors.expDate = 'Use format MM/YY';
    }
    
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV must be 3-4 digits';
    }
    
    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formatted = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim();
      setFormData({ ...formData, [name]: formatted });
    } 
    // Format expiration date
    else if (name === 'expDate') {
      let formatted = value;
      if (value.length === 2 && !value.includes('/') && formData.expDate.length === 1) {
        formatted = value + '/';
      }
      setFormData({ ...formData, [name]: formatted });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsProcessing(true);
      
      // Simulate processing payment
      setTimeout(() => {
        clearCart();
        navigate('/order-confirmation');
      }, 2000);
    }
  };
  
  if (state.cart.length === 0) {
    navigate('/cart');
    return null;
  }
  
  return (
    <div className="bg-black text-white min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Customer Information */}
            <div className="lg:w-2/3 space-y-6">
              {/* Personal Information */}
              <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                <div className="bg-gray-800 p-4 flex items-center">
                  <User size={20} className="mr-2 text-purple-500" />
                  <h2 className="text-lg font-semibold">Personal Information</h2>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full bg-gray-800 text-white border ${
                          errors.firstName ? 'border-red-500' : 'border-gray-700'
                        } rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-purple-500`}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full bg-gray-800 text-white border ${
                          errors.lastName ? 'border-red-500' : 'border-gray-700'
                        } rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-purple-500`}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full bg-gray-800 text-white border ${
                        errors.email ? 'border-red-500' : 'border-gray-700'
                      } rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-purple-500`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Shipping Address */}
              <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                <div className="bg-gray-800 p-4 flex items-center">
                  <MapPin size={20} className="mr-2 text-purple-500" />
                  <h2 className="text-lg font-semibold">Shipping Address</h2>
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Street Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full bg-gray-800 text-white border ${
                        errors.address ? 'border-red-500' : 'border-gray-700'
                      } rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-purple-500`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full bg-gray-800 text-white border ${
                          errors.city ? 'border-red-500' : 'border-gray-700'
                        } rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-purple-500`}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={`w-full bg-gray-800 text-white border ${
                          errors.state ? 'border-red-500' : 'border-gray-700'
                        } rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-purple-500`}
                      />
                      {errors.state && (
                        <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">ZIP Code</label>
                      <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        className={`w-full bg-gray-800 text-white border ${
                          errors.zip ? 'border-red-500' : 'border-gray-700'
                        } rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-purple-500`}
                      />
                      {errors.zip && (
                        <p className="text-red-500 text-xs mt-1">{errors.zip}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Payment Information */}
              <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                <div className="bg-gray-800 p-4 flex items-center">
                  <CreditCard size={20} className="mr-2 text-purple-500" />
                  <h2 className="text-lg font-semibold">Payment Information</h2>
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name on Card</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className={`w-full bg-gray-800 text-white border ${
                        errors.cardName ? 'border-red-500' : 'border-gray-700'
                      } rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-purple-500`}
                    />
                    {errors.cardName && (
                      <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      maxLength={19} // 16 digits + 3 spaces
                      placeholder="XXXX XXXX XXXX XXXX"
                      className={`w-full bg-gray-800 text-white border ${
                        errors.cardNumber ? 'border-red-500' : 'border-gray-700'
                      } rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-purple-500`}
                    />
                    {errors.cardNumber && (
                      <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Expiration Date</label>
                      <input
                        type="text"
                        name="expDate"
                        value={formData.expDate}
                        onChange={handleInputChange}
                        maxLength={5} // MM/YY
                        placeholder="MM/YY"
                        className={`w-full bg-gray-800 text-white border ${
                          errors.expDate ? 'border-red-500' : 'border-gray-700'
                        } rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-purple-500`}
                      />
                      {errors.expDate && (
                        <p className="text-red-500 text-xs mt-1">{errors.expDate}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        maxLength={4}
                        className={`w-full bg-gray-800 text-white border ${
                          errors.cvv ? 'border-red-500' : 'border-gray-700'
                        } rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-purple-500`}
                      />
                      {errors.cvv && (
                        <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start mt-4">
                    <ShieldCheck size={20} className="text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-400">
                      Your payment information is secure. We use industry-standard encryption to protect your data.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden sticky top-24">
                <div className="bg-gray-800 p-4">
                  <h2 className="text-lg font-semibold flex items-center">
                    <Package size={20} className="mr-2 text-purple-500" />
                    Order Summary
                  </h2>
                </div>
                
                <div className="p-6">
                  <div className="max-h-48 overflow-auto mb-4 pr-2">
                    {state.cart.map(item => (
                      <div key={item.id} className="flex py-2 border-b border-gray-800">
                        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded bg-gray-800">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-contain object-center p-1"
                          />
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-white">
                            {item.title.length > 25
                              ? `${item.title.substring(0, 25)}...`
                              : item.title}
                          </p>
                          <p className="text-xs text-gray-400">
                            ${item.price.toFixed(2)} × {item.quantity}
                          </p>
                        </div>
                        <div className="text-sm font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                  
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
                    
                    <button
                      type="submit"
                      className={`bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-md transition-colors font-medium w-full flex items-center justify-center ${
                        isProcessing ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard size={18} className="mr-2" />
                          Place Order
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;