import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Breadcrumb from "../components/Layout/Breadcrumb";
import { formatCurrency } from "../utils/formatters";

const OrderSuccess = () => {
  const { clearCart } = useCart();
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState(null);
  
  useEffect(() => {
    // Get order ID from location state or get the most recent order
    const orderId = location.state?.orderId;
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    if (orders.length > 0) {
      if (orderId) {
        const order = orders.find(order => order.id === orderId);
        if (order) {
          setOrderDetails(order);
        } else {
          // If order ID not found, use the most recent order
          setOrderDetails(orders[orders.length - 1]);
        }
      } else {
        // If no order ID provided, use the most recent order
        setOrderDetails(orders[orders.length - 1]);
      }
    }
  }, [location.state]);

  return (
    <div className="container mx-auto px-4 py-12">
      <Breadcrumb items={[
        { label: "Home", path: "/" },
        { label: "Cart", path: "/cart" },
        { label: "Checkout", path: "/checkout" },
        { label: "Order Success", path: "/order-success" }
      ]} />
      
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <svg 
            className="w-20 h-20 text-green-500 mx-auto"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Your order has been placed successfully. We've sent you an email with the order details.
        </p>
        
        {orderDetails && (
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Order Information</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-medium">{orderDetails.id}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">{new Date(orderDetails.date).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Total Amount:</span>
              <span className="font-medium">{formatCurrency(orderDetails.totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-medium">{orderDetails.paymentMethod === 'card' ? 'Credit Card' : 
                orderDetails.paymentMethod === 'paypal' ? 'PayPal' : 'Cash on Delivery'}</span>
            </div>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/shop" 
            className="bg-indigo-600 text-white py-3 px-6 rounded-md font-medium hover:bg-indigo-700 transition duration-300"
          >
            Continue Shopping
          </Link>
          <Link 
            to="/" 
            className="bg-white text-indigo-600 border border-indigo-600 py-3 px-6 rounded-md font-medium hover:bg-gray-50 transition duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess; 