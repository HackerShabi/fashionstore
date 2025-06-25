import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart, FaStar, FaShoppingCart } from "react-icons/fa";
import { formatCurrency } from "../../utils/formatters";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product, featured = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: product.colors[0],
      size: product.sizes[0],
      quantity: 1,
    });
  };

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`group bg-light rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${
        featured ? "col-span-2" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block h-full">
        <div className="relative overflow-hidden aspect-[3/4]">
          {/* Product Image */}
          <img
            src={isHovered && product.images.length > 1 ? product.images[1] : product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.trending && (
              <span className="bg-accentAlt text-white text-xs px-2 py-1 rounded">Trending</span>
            )}
            {!product.inStock && (
              <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">Out of Stock</span>
            )}
            {product.featured && (
              <span className="bg-accent text-white text-xs px-2 py-1 rounded">Featured</span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={toggleFavorite}
            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-accent hover:text-white transition-colors"
          >
            {isFavorite ? <FaHeart className="text-accent" /> : <FaRegHeart />}
          </button>

          {/* Quick Actions */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur p-2 transform transition-transform duration-300 ${
              isHovered ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full py-2 rounded flex items-center justify-center gap-2 transition-colors ${
                product.inStock
                  ? "bg-primary text-white hover:bg-accent"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <FaShoppingCart />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-medium text-primary line-clamp-1">{product.name}</h3>
          
          <div className="flex items-center gap-1 my-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviewCount})</span>
          </div>
          
          <div className="mt-1 font-medium">{formatCurrency(product.price)}</div>
          
          {/* Color Options */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex mt-2 gap-1">
              {product.colors.slice(0, 4).map((color, index) => (
                <div
                  key={index}
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{
                    backgroundColor: color.includes("floral") 
                      ? "#FFFFFF" 
                      : color.includes("light") 
                        ? "#A0AEC0" 
                        : color,
                    backgroundImage: color.includes("floral") ? "url('/assets/patterns/floral-sm.jpg')" : "none",
                  }}
                  title={color}
                />
              ))}
              {product.colors.length > 4 && (
                <div className="text-xs text-gray-500">+{product.colors.length - 4}</div>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard; 