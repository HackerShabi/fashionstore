import React from "react";
import Breadcrumb from "../components/Layout/Breadcrumb";

const BecomeSeller = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[
        { label: "Home", path: "/" },
        { label: "Become a Seller", path: "/become-seller" }
      ]} />
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Become a Seller</h1>
        <p className="text-lg text-gray-600 mb-8">
          Join our marketplace and start selling your fashion products to customers worldwide.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="bg-indigo-100 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Register</h3>
            <p className="text-gray-600">
              Sign up for a seller account and provide your basic information
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="bg-indigo-100 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Create Profile</h3>
            <p className="text-gray-600">
              Set up your store profile and upload product listings
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="bg-indigo-100 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Start Selling</h3>
            <p className="text-gray-600">
              Receive orders, fulfill them and earn money
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-6">Seller Registration</h2>
          
          <form>
            <h3 className="text-lg font-medium mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
            </div>
            
            <h3 className="text-lg font-medium mb-4">Business Information</h3>
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Address</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option value="">Select business type</option>
                  <option value="individual">Individual / Sole Proprietor</option>
                  <option value="partnership">Partnership</option>
                  <option value="corporation">Corporation</option>
                  <option value="llc">LLC</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Description</label>
                <textarea 
                  rows="4" 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Tell us about your business and products..."
                ></textarea>
              </div>
            </div>
            
            <div className="flex items-center mb-6">
              <input id="terms" type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                I agree to the <a href="#" className="text-indigo-600 hover:underline">Terms and Conditions</a> and <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>
              </label>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md font-medium hover:bg-indigo-700 transition duration-300"
            >
              Submit Application
            </button>
          </form>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">What are the fees for selling on the platform?</h3>
              <p className="text-gray-600">
                We charge a 5% commission on each sale. There are no monthly fees or listing fees.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">How do I get paid?</h3>
              <p className="text-gray-600">
                Payments are processed every two weeks. You can receive funds via direct deposit or PayPal.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">How do I handle shipping?</h3>
              <p className="text-gray-600">
                You can choose to handle shipping yourself or use our fulfillment services for an additional fee.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">What kind of products can I sell?</h3>
              <p className="text-gray-600">
                You can sell clothing, shoes, accessories, and other fashion-related items. All products must be authentic and comply with our guidelines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeSeller; 