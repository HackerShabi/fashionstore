import React, { createContext, useContext, useReducer, useEffect, useState } from "react";
import app from '../firebase';
import { 
  getAuth, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc 
} from 'firebase/firestore';

// Initialize Firebase
const auth = getAuth(app);
const db = getFirestore(app);

// Initial state
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  discount: 0,
};

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id && item.size === action.payload.size && item.color === action.payload.color
      );

      let updatedItems;

      if (existingItemIndex >= 0) {
        // Item already exists, update quantity
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + (action.payload.quantity || 1),
        };
      } else {
        // New item, add to cart
        updatedItems = [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }];
      }

      const totalPrice = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice,
      };
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter(
        (item) => !(item.id === action.payload.id && item.size === action.payload.size && item.color === action.payload.color)
      );

      const totalPrice = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice,
      };
    }

    case "UPDATE_QUANTITY": {
      const updatedItems = state.items.map((item) => {
        if (item.id === action.payload.id && item.size === action.payload.size && item.color === action.payload.color) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });

      const totalPrice = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice,
      };
    }

    case "APPLY_DISCOUNT":
      return {
        ...state,
        discount: action.payload,
      };

    case "CLEAR_CART":
      return initialState;
      
    case "LOAD_CART":
      return {
        ...action.payload
      };

    default:
      return state;
  }
};

// Create context
const CartContext = createContext();

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// Cart provider component
export const CartProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Load cart from localStorage or Firestore
  const loadCartFromStorage = () => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : initialState;
    }
    return initialState;
  };

  const [state, dispatch] = useReducer(cartReducer, initialState, loadCartFromStorage);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      
      // If user logs in, fetch their cart from Firestore
      if (user) {
        fetchUserCart(user.uid);
      }
    });
    
    return unsubscribe;
  }, []);

  // Fetch user's cart from Firestore
  const fetchUserCart = async (userId) => {
    try {
      const cartDoc = await getDoc(doc(db, 'carts', userId));
      
      if (cartDoc.exists()) {
        // If user has a cart in Firestore, load it
        dispatch({ type: 'LOAD_CART', payload: cartDoc.data() });
      } else if (state.items.length > 0) {
        // If user doesn't have a cart but has items in localStorage, save those to Firestore
        await setDoc(doc(db, 'carts', userId), state);
      }
    } catch (error) {
      console.error('Error fetching user cart:', error);
    }
  };

  // Save cart to localStorage or Firestore
  useEffect(() => {
    if (loading) return;
    
    if (currentUser) {
      // Save to Firestore for logged in users
      const saveToFirestore = async () => {
        try {
          await setDoc(doc(db, 'carts', currentUser.uid), state);
        } catch (error) {
          console.error('Error saving cart to Firestore:', error);
        }
      };
      
      saveToFirestore();
    } else if (typeof window !== "undefined") {
      // Save to localStorage for guests
      localStorage.setItem("cart", JSON.stringify(state));
    }
  }, [state, currentUser, loading]);

  // Cart actions
  const addItem = (item) => dispatch({ type: "ADD_ITEM", payload: item });
  const removeItem = (item) => dispatch({ type: "REMOVE_ITEM", payload: item });
  const updateQuantity = (item, quantity) => 
    dispatch({ type: "UPDATE_QUANTITY", payload: { ...item, quantity } });
  const applyDiscount = (amount) => dispatch({ type: "APPLY_DISCOUNT", payload: amount });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const value = {
    cart: state,
    addItem,
    removeItem,
    updateQuantity,
    applyDiscount,
    clearCart,
    isAuthenticated: !!currentUser
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext; 