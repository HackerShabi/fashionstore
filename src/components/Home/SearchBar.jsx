import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-light rounded-lg shadow-md p-4"
      >
        <form onSubmit={handleSearchSubmit} className="flex items-center">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, brands, and more..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
            />
          </div>
          <button
            type="submit"
            className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-r-lg font-medium transition-colors"
          >
            Search
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SearchBar; 