import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";

import Breadcrumb from "../components/Layout/Breadcrumb";
import CartItem from "../components/Cart/CartItem";
import CartSummary from "../components/Cart/CartSummary";
import ProductCarousel from "../components/Home/ProductCarousel";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, clearCart } = useCart();
  
  // Empty cart state
  if (cart.items.length === 0) {
    return (
      <div className="pt-20">
        <Breadcrumb 
          extraItems={[{ name: "Cart", path: "/cart" }]} 
        />
        
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-lg mx-auto">
            <FaShoppingCart className="text-gray-300 w-20 h-20 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-primary mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
              Browse our products and find something you'll love!
            </p>
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-accent text-white px-8 py-3 rounded-md font-medium hover:bg-accent/90 transition-colors"
              >
                Start Shopping
              </motion.button>
            </Link>
          </div>
          
          {/* Recommended Products */}
          <div className="mt-20">
            <ProductCarousel
              title="You Might Like"
              subtitle="Popular products our customers love"
              filter="featured"
              limit={4}
            />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-20">
      <Breadcrumb 
        extraItems={[{ name: "Cart", path: "/cart" }]} 
      />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-primary mb-6">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-grow">
            {/* Header */}
            <div className="hidden sm:flex justify-between border-b border-gray-200 pb-2 mb-4 font-medium text-gray-500">
              <div className="w-2/3">Product</div>
              <div className="w-1/3 flex justify-between pl-4">
                <div>Quantity</div>
                <div>Subtotal</div>
                <div className="w-8"></div> {/* For delete button */}
              </div>
            </div>
            
            {/* Items */}
            <div className="divide-y divide-gray-100">
              {cart.items.map((item) => (
                <CartItem key={`${item.id}-${item.size}-${item.color}`} item={item} />
              ))}
            </div>
            
            {/* Actions */}
            <div className="flex justify-between items-center mt-8">
              <Link to="/shop" className="text-primary hover:text-accent transition-colors flex items-center">
                <FaArrowLeft className="mr-2" /> Continue Shopping
              </Link>
              
              <button
                onClick={clearCart}
                className="text-gray-500 hover:text-red-500 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
          
          {/* Cart Summary */}
          <div className="lg:w-80 xl:w-96">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 