import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTag, FaLock } from "react-icons/fa";
import { formatCurrency } from "../../utils/formatters";
import { useCart } from "../../context/CartContext";

const CartSummary = () => {
  const { cart, applyDiscount } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState(null);
  const [promoSuccess, setPromoSuccess] = useState(null);
  
  // Sample promo codes
  const validPromoCodes = {
    "WELCOME10": 0.1,
    "SUMMER20": 0.2,
    "FLASH30": 0.3,
  };
  
  const handleApplyPromo = (e) => {
    e.preventDefault();
    
    // Reset previous messages
    setPromoError(null);
    setPromoSuccess(null);
    
    if (!promoCode.trim()) {
      setPromoError("Please enter a promo code");
      return;
    }
    
    const code = promoCode.trim().toUpperCase();
    const discountRate = validPromoCodes[code];
    
    if (discountRate) {
      const discountAmount = cart.totalPrice * discountRate;
      applyDiscount(discountAmount);
      setPromoSuccess(`Promo code "${code}" applied successfully!`);
    } else {
      setPromoError("Invalid promo code");
    }
  };
  
  // Calculate totals
  const subtotal = cart.totalPrice;
  const shipping = subtotal > 100 ? 0 : 10;
  const discount = cart.discount;
  const total = subtotal + shipping - discount;
  
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-xl font-bold text-primary mb-4">Order Summary</h2>
      
      {/* Order Details */}
      <div className="space-y-3 border-b border-gray-200 pb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? "Free" : formatCurrency(shipping)}
          </span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-accent">
            <span>Discount</span>
            <span>-{formatCurrency(discount)}</span>
          </div>
        )}
      </div>
      
      {/* Total */}
      <div className="flex justify-between pt-4 text-lg font-bold">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
      
      {/* Promo Code */}
      <div className="mt-6">
        <form onSubmit={handleApplyPromo}>
          <label htmlFor="promo-code" className="flex items-center text-gray-600 mb-2">
            <FaTag className="mr-2 text-accent" /> Apply Promo Code
          </label>
          <div className="flex">
            <input
              type="text"
              id="promo-code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter code"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-accent text-white px-4 py-2 rounded-r-md transition-colors"
            >
              Apply
            </button>
          </div>
          {promoError && (
            <p className="mt-2 text-red-500 text-sm">{promoError}</p>
          )}
          {promoSuccess && (
            <p className="mt-2 text-green-500 text-sm">{promoSuccess}</p>
          )}
        </form>
      </div>
      
      {/* Checkout Button */}
      <div className="mt-6">
        <Link to={cart.items.length > 0 ? "/checkout" : "#"}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={cart.items.length === 0}
            className={`w-full py-3 rounded-md font-medium flex items-center justify-center ${
              cart.items.length > 0
                ? "bg-accent text-white hover:bg-accent/90"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } transition-colors`}
          >
            <FaLock className="mr-2" /> Proceed to Checkout
          </motion.button>
        </Link>
      </div>
      
      {/* Additional Info */}
      <div className="mt-6 text-xs text-gray-500">
        <p>
          By proceeding to checkout, you agree to our{" "}
          <Link to="/terms" className="text-accent hover:underline">Terms of Service</Link> and{" "}
          <Link to="/privacy" className="text-accent hover:underline">Privacy Policy</Link>.
        </p>
        <div className="flex items-center mt-4">
          <FaLock className="text-green-500 mr-2" />
          <span>Secure checkout with SSL encryption</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary; 