import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const CategoryCard = ({ category, variant = "default" }) => {
  // Define different layouts based on variant
  const variants = {
    default: {
      imageClass: "aspect-square",
      containerClass: "flex flex-col h-full",
      contentClass: "p-6 flex-grow flex flex-col justify-between",
    },
    horizontal: {
      imageClass: "aspect-[16/9]",
      containerClass: "flex flex-col md:flex-row h-full",
      contentClass: "p-6 flex-grow flex flex-col justify-between",
    },
    overlay: {
      imageClass: "aspect-[3/4]",
      containerClass: "relative h-full",
      contentClass: "absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent text-white",
    },
    compact: {
      imageClass: "aspect-[1/1]",
      containerClass: "flex flex-col h-full",
      contentClass: "p-4 flex-grow",
    },
  };

  const selectedVariant = variants[variant] || variants.default;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-light h-full"
    >
      <Link to={`/shop/${category.id}`} className={selectedVariant.containerClass}>
        <div className={`relative ${selectedVariant.imageClass} overflow-hidden`}>
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        
        <div className={selectedVariant.contentClass}>
          <div>
            <h3 className={`text-xl font-bold mb-2 ${variant === 'overlay' ? 'text-white' : 'text-primary'}`}>
              {category.name}
            </h3>
            {category.description && variant !== 'compact' && (
              <p className={`mb-4 text-sm ${variant === 'overlay' ? 'text-gray-200' : 'text-gray-600'}`}>
                {variant === 'overlay' 
                  ? category.description.split(' ').slice(0, 10).join(' ') + '...'
                  : category.description}
              </p>
            )}
          </div>
          
          <motion.div
            whileHover={{ x: 5 }}
            className={`inline-flex items-center gap-2 font-medium ${
              variant === 'overlay' ? 'text-white' : 'text-accent'
            }`}
          >
            Shop Now <FaArrowRight className="text-sm" />
          </motion.div>
          
          {variant === 'default' || variant === 'horizontal' ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {category.subcategories && 
                category.subcategories.slice(0, 3).map((subcategory) => (
                  <span
                    key={subcategory.id}
                    className="inline-block text-xs bg-lightGray px-2 py-1 rounded"
                  >
                    {subcategory.name}
                  </span>
                ))}
              {category.subcategories && category.subcategories.length > 3 && (
                <span className="inline-block text-xs bg-lightGray px-2 py-1 rounded">
                  +{category.subcategories.length - 3} more
                </span>
              )}
            </div>
          ) : null}
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard; 