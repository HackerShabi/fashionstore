import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminData } from '../context';
import ImageUploader from './common/ImageUploader';

const ProductForm = ({ product = null, isEdit = false }) => {
  const navigate = useNavigate();
  const { categories, addProduct, updateProduct } = useAdminData();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    mainCategory: '', // Men, Women, Kids
    categoryId: '',
    subcategoryId: '',
    sizes: [],
    colors: [],
    stock: '',
    images: [],
    featured: false,
    trending: false,
    onSale: false,
    discountPercentage: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableSubcategories, setAvailableSubcategories] = useState([]);
  
  // Available options
  const mainCategoryOptions = ['men', 'women', 'kids'];
  
  // Size options based on main category
  const getSizeOptions = (mainCategory) => {
    switch(mainCategory) {
      case 'men':
      case 'women':
        return ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
      case 'kids':
        return ['2Y', '3Y', '4Y', '5Y', '6Y', '7Y', '8Y', '9Y', '10Y', '11Y', '12Y', '13Y', '14Y'];
      default:
        return ['XS', 'S', 'M', 'L', 'XL', 'XXL', '2Y', '3Y', '4Y', '5Y', '6Y', '7Y', '8Y', '9Y', '10Y', '11Y', '12Y', '13Y', '14Y'];
    }
  };
  
  const colorOptions = [
    'Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Pink', 
    'Orange', 'Gray', 'Brown', 'Navy', 'Beige', 'Teal', 'Maroon'
  ];
  
  // Initialize form with product data if editing
  useEffect(() => {
    if (isEdit && product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        mainCategory: product.mainCategory || '',
        categoryId: product.categoryId || '',
        subcategoryId: product.subcategoryId || '',
        sizes: product.sizes || [],
        colors: product.colors || [],
        stock: product.stock || '',
        images: product.images ? product.images.map(path => ({ path })) : [],
        featured: product.featured || false,
        trending: product.trending || false,
        onSale: product.onSale || false,
        discountPercentage: product.discountPercentage || ''
      });
      
      // Update available subcategories
      updateAvailableCategories(product.mainCategory);
    }
  }, [isEdit, product]);
  
  // Update available categories when main category changes
  const updateAvailableCategories = (mainCategory) => {
    if (!mainCategory) {
      setAvailableSubcategories([]);
      return;
    }
    
    const filteredCategories = categories.filter(cat => cat.mainCategory === mainCategory);
    setAvailableSubcategories(filteredCategories);
    
    // Reset category and subcategory if main category changes
    setFormData(prev => ({ 
      ...prev, 
      categoryId: '',
      subcategoryId: ''
    }));
  };
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
      
      // If changing main category, update available categories
      if (name === 'mainCategory') {
        updateAvailableCategories(value);
      }
    }
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  // Handle multi-select changes (sizes, colors)
  const handleMultiSelect = (e, field) => {
    const value = e.target.value;
    
    if (formData[field].includes(value)) {
      // Remove value if already selected
      setFormData({
        ...formData,
        [field]: formData[field].filter(item => item !== value)
      });
    } else {
      // Add value if not already selected
      setFormData({
        ...formData,
        [field]: [...formData[field], value]
      });
    }
    
    // Clear error when field is being edited
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };
  
  // Handle image changes
  const handleImageChange = (images) => {
    setFormData({ ...formData, images });
    
    // Clear error when field is being edited
    if (errors.images) {
      setErrors({ ...errors, images: '' });
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Product description is required';
    }
    
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }
    
    if (!formData.mainCategory) {
      newErrors.mainCategory = 'Main category is required';
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = 'Category is required';
    }
    
    if (formData.sizes.length === 0) {
      newErrors.sizes = 'At least one size is required';
    }
    
    if (formData.colors.length === 0) {
      newErrors.colors = 'At least one color is required';
    }
    
    if (!formData.stock || isNaN(formData.stock) || Number(formData.stock) < 0) {
      newErrors.stock = 'Valid stock quantity is required';
    }
    
    if (formData.images.length === 0) {
      newErrors.images = 'At least one image is required';
    }
    
    if (formData.onSale && (!formData.discountPercentage || 
        isNaN(formData.discountPercentage) || 
        Number(formData.discountPercentage) <= 0 || 
        Number(formData.discountPercentage) > 100)) {
      newErrors.discountPercentage = 'Valid discount percentage is required (1-100)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (validateForm()) {
      // Prepare product data
      const productData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        discountPercentage: formData.onSale ? Number(formData.discountPercentage) : 0,
        images: formData.images.map(img => img.path)
      };
      
      try {
        if (isEdit && product) {
          // Update existing product
          updateProduct(product.id, productData);
        } else {
          // Add new product
          addProduct(productData);
        }
        
        // Navigate back to products list
        navigate('/admin/products');
      } catch (error) {
        console.error('Error saving product:', error);
        setErrors({ submit: 'Failed to save product. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };
  
  // Get subcategories for selected category
  const getSubcategories = () => {
    if (!formData.categoryId) return [];
    
    const selectedCategory = categories.find(cat => cat.id === formData.categoryId);
    return selectedCategory?.subcategories || [];
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {errors.submit && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
          {errors.submit}
        </div>
      )}
      
      {/* Basic Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium text-primary mb-4">Basic Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>
          
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price ($) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              className={`w-full px-3 py-2 border rounded-md ${
                errors.price ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent`}
            />
            {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
          </div>
        </div>
        
        <div className="mt-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className={`w-full px-3 py-2 border rounded-md ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent`}
          ></textarea>
          {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
        </div>
      </div>
      
      {/* Categorization */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium text-primary mb-4">Categorization</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="mainCategory" className="block text-sm font-medium text-gray-700 mb-1">
              Main Category <span className="text-red-500">*</span>
            </label>
            <select
              id="mainCategory"
              name="mainCategory"
              value={formData.mainCategory}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.mainCategory ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent`}
            >
              <option value="">Select Main Category</option>
              {mainCategoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            {errors.mainCategory && <p className="mt-1 text-sm text-red-500">{errors.mainCategory}</p>}
          </div>
          
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              disabled={!formData.mainCategory}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.categoryId ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent ${
                !formData.mainCategory ? 'bg-gray-100' : ''
              }`}
            >
              <option value="">Select Category</option>
              {availableSubcategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && <p className="mt-1 text-sm text-red-500">{errors.categoryId}</p>}
          </div>
          
          <div>
            <label htmlFor="subcategoryId" className="block text-sm font-medium text-gray-700 mb-1">
              Subcategory
            </label>
            <select
              id="subcategoryId"
              name="subcategoryId"
              value={formData.subcategoryId}
              onChange={handleChange}
              disabled={!formData.categoryId}
              className={`w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent ${
                !formData.categoryId ? 'bg-gray-100' : ''
              }`}
            >
              <option value="">Select Subcategory</option>
              {getSubcategories().map((subcategory) => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Variants */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium text-primary mb-4">Variants</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sizes <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {getSizeOptions(formData.mainCategory).map((size) => (
                <div key={size} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`size-${size}`}
                    value={size}
                    checked={formData.sizes.includes(size)}
                    onChange={(e) => handleMultiSelect(e, 'sizes')}
                    className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                  />
                  <label htmlFor={`size-${size}`} className="ml-2 block text-sm text-gray-700">
                    {size}
                  </label>
                </div>
              ))}
            </div>
            {errors.sizes && <p className="mt-1 text-sm text-red-500">{errors.sizes}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Colors <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {colorOptions.map((color) => (
                <div key={color} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`color-${color}`}
                    value={color}
                    checked={formData.colors.includes(color)}
                    onChange={(e) => handleMultiSelect(e, 'colors')}
                    className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                  />
                  <label htmlFor={`color-${color}`} className="ml-2 block text-sm text-gray-700">
                    {color}
                  </label>
                </div>
              ))}
            </div>
            {errors.colors && <p className="mt-1 text-sm text-red-500">{errors.colors}</p>}
          </div>
        </div>
        
        <div className="mt-4">
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
            Stock Quantity <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            min="0"
            className={`w-full px-3 py-2 border rounded-md ${
              errors.stock ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent`}
          />
          {errors.stock && <p className="mt-1 text-sm text-red-500">{errors.stock}</p>}
        </div>
      </div>
      
      {/* Images */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium text-primary mb-4">Product Images</h2>
        
        <ImageUploader
          images={formData.images}
          onChange={handleImageChange}
          multiple={true}
          maxImages={5}
        />
        {errors.images && <p className="mt-1 text-sm text-red-500">{errors.images}</p>}
        <p className="text-sm text-gray-500 mt-2">
          Upload up to 5 images. First image will be used as the main product image.
        </p>
      </div>
      
      {/* Additional Settings */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium text-primary mb-4">Additional Settings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                Featured Product
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="trending"
                name="trending"
                checked={formData.trending}
                onChange={handleChange}
                className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
              />
              <label htmlFor="trending" className="ml-2 block text-sm text-gray-700">
                Trending Product
              </label>
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="onSale"
                name="onSale"
                checked={formData.onSale}
                onChange={handleChange}
                className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
              />
              <label htmlFor="onSale" className="ml-2 block text-sm text-gray-700">
                On Sale
              </label>
            </div>
            
            {formData.onSale && (
              <div>
                <label htmlFor="discountPercentage" className="block text-sm font-medium text-gray-700 mb-1">
                  Discount Percentage <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="discountPercentage"
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={handleChange}
                  min="1"
                  max="100"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.discountPercentage ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent`}
                />
                {errors.discountPercentage && (
                  <p className="mt-1 text-sm text-red-500">{errors.discountPercentage}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Form Actions */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => navigate('/admin/products')}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 mr-4 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:bg-gray-400"
        >
          {isSubmitting ? 'Saving...' : isEdit ? 'Update Product' : 'Add Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm; 