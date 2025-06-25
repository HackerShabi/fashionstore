import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Layout/Breadcrumb";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatters";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { items, totalPrice } = cart;
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    paymentMethod: "card"
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };
  
  const handlePaymentMethodChange = (method) => {
    setFormData({
      ...formData,
      paymentMethod: method
    });
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Required fields except email
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";
    
    // Email is optional, but validate format if provided
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (validateForm()) {
      // Save order data to localStorage
      const orderData = {
        id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toISOString(),
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          address: formData.address,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode
        },
        items: items,
        totalPrice: totalPrice,
        shipping: totalPrice > 100 ? 0 : 10,
        paymentMethod: formData.paymentMethod
      };
      
      // Store order in localStorage
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      localStorage.setItem('orders', JSON.stringify([...existingOrders, orderData]));
      
      // Clear the cart and navigate to success page
      clearCart();
      navigate('/order-success', { state: { orderId: orderData.id } });
    } else {
      setIsSubmitting(false);
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[
        { label: "Home", path: "/" },
        { label: "Cart", path: "/cart" },
        { label: "Checkout", path: "/checkout" }
      ]} />
      
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full p-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md`} 
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full p-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md`} 
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address (Optional)
                </label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`} 
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              
              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md mb-2`} 
                  placeholder="Street address" 
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                <input 
                  type="text" 
                  id="apartment"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md" 
                  placeholder="Apartment, suite, etc. (optional)" 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full p-2 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md`} 
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`w-full p-2 border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-md`} 
                  />
                  {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className={`w-full p-2 border ${errors.zipCode ? 'border-red-500' : 'border-gray-300'} rounded-md`} 
                  />
                  {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input 
                    id="card" 
                    name="paymentMethod" 
                    type="radio" 
                    checked={formData.paymentMethod === "card"}
                    onChange={() => handlePaymentMethodChange("card")}
                    className="h-4 w-4 text-indigo-600" 
                  />
                  <label htmlFor="card" className="ml-2 text-sm font-medium text-gray-700">Credit Card</label>
                </div>
                
                <div className="flex items-center">
                  <input 
                    id="paypal" 
                    name="paymentMethod" 
                    type="radio" 
                    checked={formData.paymentMethod === "paypal"}
                    onChange={() => handlePaymentMethodChange("paypal")}
                    className="h-4 w-4 text-indigo-600" 
                  />
                  <label htmlFor="paypal" className="ml-2 text-sm font-medium text-gray-700">PayPal</label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="border-t border-b py-4 my-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between py-2">
                    <div>
                      <span className="font-medium">{item.quantity} x </span>
                      <span>{item.name}</span>
                    </div>
                    <span>{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{formatCurrency(totalPrice > 100 ? 0 : 10)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatCurrency(totalPrice + (totalPrice > 100 ? 0 : 10))}</span>
                </div>
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md font-medium mt-6 hover:bg-indigo-700 transition duration-300 disabled:bg-indigo-300 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Processing..." : "Complete Order"}
              </button>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                By completing your order, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout; 