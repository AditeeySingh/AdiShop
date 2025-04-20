import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Types
type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  quantity?: number;
};

type CartItem = Product & {
  quantity: number;
};

type WishlistItem = Product;

type ShopState = {
  products: Product[];
  filteredProducts: Product[];
  cart: CartItem[];
  wishlist: WishlistItem[];
  searchTerm: string;
  category: string;
  loading: boolean;
  error: string | null;
};

type ShopAction =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_FILTERED_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'TOGGLE_WISHLIST'; payload: Product }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_CART' };

const initialState: ShopState = {
  products: [],
  filteredProducts: [],
  cart: [],
  wishlist: [],
  searchTerm: '',
  category: 'all',
  loading: false,
  error: null,
};

// Load state from localStorage
const loadState = (): ShopState => {
  try {
    const serializedCart = localStorage.getItem('cart');
    const serializedWishlist = localStorage.getItem('wishlist');
    
    return {
      ...initialState,
      cart: serializedCart ? JSON.parse(serializedCart) : [],
      wishlist: serializedWishlist ? JSON.parse(serializedWishlist) : [],
    };
  } catch (err) {
    return initialState;
  }
};

// Reducer function
const shopReducer = (state: ShopState, action: ShopAction): ShopState => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        filteredProducts: action.payload,
      };
    
    case 'SET_FILTERED_PRODUCTS':
      return {
        ...state,
        filteredProducts: action.payload,
      };
    
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item => 
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      }
    }
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item => 
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    
    case 'TOGGLE_WISHLIST': {
      const existingItem = state.wishlist.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          wishlist: state.wishlist.filter(item => item.id !== action.payload.id),
        };
      } else {
        return {
          ...state,
          wishlist: [...state.wishlist, action.payload],
        };
      }
    }
    
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload,
      };
    
    case 'SET_CATEGORY':
      return {
        ...state,
        category: action.payload,
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };
    
    default:
      return state;
  }
};

// Create context
type ShopContextType = {
  state: ShopState;
  dispatch: React.Dispatch<ShopAction>;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  toggleWishlist: (product: Product) => void;
  clearCart: () => void;
  filterProducts: () => void;
  getTotalPrice: () => number;
  getItemsCount: () => number;
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Provider component
export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(shopReducer, loadState());
  
  // Save cart and wishlist to localStorage when they change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
    localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
  }, [state.cart, state.wishlist]);
  
  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        dispatch({ type: 'SET_PRODUCTS', payload: data });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch products' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };
    
    fetchProducts();
  }, []);
  
  // Filter products based on search term and category
  const filterProducts = () => {
    const { products, searchTerm, category } = state;
    
    let filtered = products;
    
    if (category !== 'all') {
      filtered = filtered.filter(product => product.category === category);
    }
    
    if (searchTerm) {
      const lowercaseTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        product =>
          product.title.toLowerCase().includes(lowercaseTerm) ||
          product.description.toLowerCase().includes(lowercaseTerm)
      );
    }
    
    dispatch({ type: 'SET_FILTERED_PRODUCTS', payload: filtered });
  };
  
  // Run filter whenever search term or category changes
  useEffect(() => {
    filterProducts();
  }, [state.searchTerm, state.category, state.products]);
  
  // Helper functions
  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };
  
  const removeFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };
  
  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };
  
  const toggleWishlist = (product: Product) => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  const getTotalPrice = () => {
    return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  
  const getItemsCount = () => {
    return state.cart.reduce((count, item) => count + item.quantity, 0);
  };
  
  return (
    <ShopContext.Provider
      value={{
        state,
        dispatch,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        clearCart,
        filterProducts,
        getTotalPrice,
        getItemsCount,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

// Custom hook to use the shop context
export const useShop = (): ShopContextType => {
  const context = useContext(ShopContext);
  
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  
  return context;
};