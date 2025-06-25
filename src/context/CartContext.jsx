import React, { createContext, useContext, useReducer, useEffect } from "react";

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
  // Load cart from localStorage
  const loadCartFromStorage = () => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : initialState;
    }
    return initialState;
  };

  const [state, dispatch] = useReducer(cartReducer, initialState, loadCartFromStorage);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(state));
    }
  }, [state]);

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
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext; 