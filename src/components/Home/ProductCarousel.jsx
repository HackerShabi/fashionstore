import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductCard from "../Common/ProductCard";
import products from "../../data/products";

const ProductCarousel = ({ title, subtitle, filter, limit = 8 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  
  // Filter products based on the filter prop (trending, featured, etc.)
  const filteredProducts = filter
    ? products.filter((product) => product[filter])
    : products;
  
  // Limit the number of products to display
  const displayProducts = filteredProducts.slice(0, limit);
  
  // Number of slides to show based on screen size
  const getItemsPerSlide = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 768) return 2;
      if (window.innerWidth < 1024) return 3;
      return 4;
    }
    return 4; // Default for SSR
  };
  
  const itemsPerSlide = getItemsPerSlide();
  const maxIndex = Math.max(0, displayProducts.length - itemsPerSlide);
  
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(maxIndex, prevIndex + 1));
  };
  
  return (
    <section className="py-16 bg-lightGray">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
          <div className="mb-4 md:mb-0">
            <h2 className="text-3xl font-bold text-primary mb-2">{title}</h2>
            <p className="text-gray-600">{subtitle}</p>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`p-3 rounded-full ${
                currentIndex === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-primary hover:bg-primary hover:text-white"
              } transition-colors shadow-sm`}
              aria-label="Previous slide"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className={`p-3 rounded-full ${
                currentIndex >= maxIndex
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-primary hover:bg-primary hover:text-white"
              } transition-colors shadow-sm`}
              aria-label="Next slide"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="relative overflow-hidden">
          <motion.div
            ref={carouselRef}
            animate={{ x: `-${currentIndex * (100 / itemsPerSlide)}%` }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
            className="flex"
            style={{ width: `${(displayProducts.length / itemsPerSlide) * 100}%` }}
          >
            {displayProducts.map((product) => (
              <div
                key={product.id}
                className="px-2"
                style={{ width: `${100 / displayProducts.length}%` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </motion.div>
        </div>
        
        <div className="flex justify-center mt-8">
          {[...Array(Math.ceil(displayProducts.length / itemsPerSlide))].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full mx-1 ${
                index === Math.floor(currentIndex / itemsPerSlide)
                  ? "bg-accent"
                  : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel; 