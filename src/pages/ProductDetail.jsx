import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaHeart, FaRegHeart, FaShare } from "react-icons/fa";

import Breadcrumb from "../components/Layout/Breadcrumb";
import ProductCarousel from "../components/Home/ProductCarousel";
import products from "../data/products";
import { formatCurrency } from "../utils/formatters";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  // Find the product
  const product = products.find((p) => p.id === parseInt(id));
  
  // State for product selection
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Redirect if product doesn't exist
  useEffect(() => {
    if (!product) {
      navigate("/shop", { replace: true });
    } else {
      // Set defaults
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes[0]);
    }
  }, [product, navigate]);
  
  if (!product) {
    return null;
  }
  
  // Handle quantity changes
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
    });
  };
  
  // Handle favorite toggle
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  // Render star rating
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
    }
    
    return stars;
  };
  
  return (
    <div className="pt-20">
      <Breadcrumb product={product} category={product.category} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnails */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 ${
                    selectedImage === index ? "border-accent" : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center mb-4">
                  <div className="flex mr-2">
                    {renderRating(product.rating)}
                  </div>
                  <span className="text-gray-500 text-sm">
                    {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>
              
              <button
                onClick={toggleFavorite}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorite ? (
                  <FaHeart className="text-red-500 text-xl" />
                ) : (
                  <FaRegHeart className="text-gray-400 text-xl" />
                )}
              </button>
            </div>
            
            <div className="text-2xl font-bold text-primary mb-4">
              {formatCurrency(product.price)}
            </div>
            
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            <div className="space-y-6">
              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Color: {selectedColor}</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                          selectedColor === color
                            ? "border-accent"
                            : "border-transparent hover:border-gray-300"
                        }`}
                        title={color}
                      >
                        <span
                          className="w-8 h-8 rounded-full"
                          style={{
                            backgroundColor: color.includes("floral")
                              ? "#FFFFFF"
                              : color.includes("light")
                                ? "#A0AEC0"
                                : color,
                            backgroundImage: color.includes("floral")
                              ? "url('/assets/patterns/floral-sm.jpg')"
                              : "none",
                          }}
                        ></span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Size Selection */}
              {product.sizes.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-900">Size: {selectedSize}</h3>
                    <button className="text-accent text-sm font-medium">Size Guide</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                          selectedSize === size
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        } transition-colors`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quantity */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Quantity</h3>
                <div className="flex items-center">
                  <button
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className={`w-10 h-10 rounded-l-md flex items-center justify-center ${
                      quantity <= 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-16 h-10 border-y border-gray-200 text-center focus:outline-none"
                  />
                  <button
                    onClick={increaseQuantity}
                    className="w-10 h-10 rounded-r-md bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-grow py-3 px-6 rounded-md font-medium flex items-center justify-center gap-2 ${
                    product.inStock
                      ? "bg-primary text-white hover:bg-accent"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  } transition-colors`}
                >
                  <FaShoppingCart /> 
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="py-3 px-6 rounded-md font-medium border border-primary text-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  <FaShare /> Share
                </motion.button>
              </div>
            </div>
            
            {/* Additional Info */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="flex flex-wrap gap-4">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="mt-4 text-sm text-gray-500">
                <p>SKU: {product.id.toString().padStart(6, '0')}</p>
                <p>Category: {product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                <p>In Stock: {product.inStock ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Details and Reviews Tabs */}
        <div className="mt-12">
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              <button className="border-b-2 border-accent text-accent font-medium py-4 px-1">
                Description
              </button>
              <button className="text-gray-500 hover:text-primary py-4 px-1">
                Reviews ({product.reviewCount})
              </button>
              <button className="text-gray-500 hover:text-primary py-4 px-1">
                Shipping & Returns
              </button>
            </nav>
          </div>
          
          <div className="prose max-w-none">
            <p className="text-gray-600">{product.description}</p>
            <p className="text-gray-600 mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam
              tincidunt, nisl nunc aliquet nunc, vitae aliquam nisl nunc eu nisl. Sed euismod, diam
              quis aliquam tincidunt, nisl nunc aliquet nunc, vitae aliquam nisl nunc eu nisl.
            </p>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>High-quality materials for comfort and durability</li>
              <li>Classic design that never goes out of style</li>
              <li>Versatile enough for both casual and formal occasions</li>
              <li>Easy care instructions for long-lasting wear</li>
            </ul>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-16">
          <ProductCarousel
            title="You May Also Like"
            subtitle="Products similar to this one"
            filter={product.category}
            limit={4}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 