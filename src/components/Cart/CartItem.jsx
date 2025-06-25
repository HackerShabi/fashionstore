import React from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { formatCurrency } from "../../utils/formatters";
import { useCart } from "../../context/CartContext";

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      updateQuantity(item, newQuantity);
    }
  };

  const handleRemove = () => {
    removeItem(item);
  };

  return (
    <div className="flex flex-col sm:flex-row py-4 border-b border-gray-200 relative">
      {/* Mobile Remove Button (Absolute Positioned) */}
      <button
        onClick={handleRemove}
        className="absolute top-2 right-2 sm:hidden text-gray-400 hover:text-red-500 transition-colors"
        aria-label="Remove item"
      >
        <FaTrash />
      </button>

      {/* Product Image */}
      <div className="w-full sm:w-24 h-32 sm:h-24 flex-shrink-0 mr-0 sm:mr-4 mb-4 sm:mb-0">
        <Link to={`/product/${item.id}`}>
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover rounded-md"
          />
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row flex-grow">
        {/* Product Info */}
        <div className="flex-grow mb-4 sm:mb-0 pr-8 sm:pr-0">
          <Link to={`/product/${item.id}`} className="hover:text-accent transition-colors">
            <h3 className="font-medium text-primary">{item.name}</h3>
          </Link>
          <div className="text-sm text-gray-500 mt-1">
            {item.color && <span className="mr-2">Color: {item.color}</span>}
            {item.size && <span>Size: {item.size}</span>}
          </div>
          <div className="font-medium text-primary mt-1 sm:hidden">
            {formatCurrency(item.price)}
          </div>
        </div>

        <div className="flex justify-between items-center sm:items-start">
          {/* Quantity Controls */}
          <div className="flex items-center">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => updateQuantity(item, Math.max(1, item.quantity - 1))}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={handleQuantityChange}
                className="w-10 h-8 text-center border-x border-gray-300 focus:outline-none"
              />
              <button
                onClick={() => updateQuantity(item, item.quantity + 1)}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Subtotal (hidden on mobile) */}
          <div className="hidden sm:block font-medium text-primary ml-6">
            {formatCurrency(item.price * item.quantity)}
          </div>

          {/* Mobile Subtotal */}
          <div className="font-medium text-primary sm:hidden">
            {formatCurrency(item.price * item.quantity)}
          </div>

          {/* Remove Button (desktop) */}
          <button
            onClick={handleRemove}
            className="hidden sm:block text-gray-400 hover:text-red-500 transition-colors ml-4"
            aria-label="Remove item"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem; 