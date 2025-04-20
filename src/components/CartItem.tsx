import React from 'react';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useShop } from '../context/ShopContext';

type CartItemProps = {
  item: {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
  };
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart, updateQuantity } = useShop();
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(item.id, newQuantity);
  };
  
  return (
    <div className="flex items-center py-4 border-b border-gray-800">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded bg-gray-800">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-contain object-center"
        />
      </div>
      
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium">
            <h3 className="text-white">{item.title}</h3>
            <p className="ml-4 text-white">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-400">${item.price.toFixed(2)} each</p>
        </div>
        
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="text-gray-400 hover:text-white p-1 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <Minus size={16} />
            </button>
            
            <span className="text-white px-2">{item.quantity}</span>
            
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="text-gray-400 hover:text-white p-1 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <div className="flex">
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-400 transition-colors flex items-center"
            >
              <Trash2 size={18} />
              <span className="ml-1">Remove</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;