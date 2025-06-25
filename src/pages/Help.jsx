import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Layout/Breadcrumb";

const Help = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[
        { label: "Home", path: "/" },
        { label: "Help", path: "/help" }
      ]} />
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Help Center</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">How do I track my order?</h3>
              <p className="text-gray-600">You can track your order in the order history section of your account.</p>
            </div>
            <div>
              <h3 className="font-medium">What is your return policy?</h3>
              <p className="text-gray-600">We accept returns within 30 days of purchase.</p>
            </div>
            <div>
              <h3 className="font-medium">How do I contact customer service?</h3>
              <p className="text-gray-600">You can reach us at support@example.com or call (555) 123-4567.</p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Link to="/contact" className="bg-indigo-600 text-white py-2 px-6 rounded-md inline-block font-medium hover:bg-indigo-700">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Help; 