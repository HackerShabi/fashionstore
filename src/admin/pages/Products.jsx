import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaSearch, FaFilter, FaPlus } from 'react-icons/fa';
import { useAdminData } from '../context';
import PageHeader from '../components/common/PageHeader';

const Products = () => {
  const { products, categories, deleteProduct } = useAdminData();
  
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    mainCategory: '',
    categoryId: '',
    featured: false,
    trending: false,
    onSale: false,
    inStock: false
  });
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Reset filters
  const resetFilters = () => {
    setFilters({
      mainCategory: '',
      categoryId: '',
      featured: false,
      trending: false,
      onSale: false,
      inStock: false
    });
    setSearchTerm('');
  };
  
  // Get available categories based on selected main category
  const getAvailableCategories = () => {
    if (!filters.mainCategory) return categories;
    return categories.filter(cat => cat.mainCategory === filters.mainCategory);
  };
  
  // Filter products based on search term and filters
  const filteredProducts = products.filter(product => {
    // Search term filter
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Main category filter
    if (filters.mainCategory && product.mainCategory !== filters.mainCategory) {
      return false;
    }
    
    // Category filter
    if (filters.categoryId && product.categoryId !== filters.categoryId) {
      return false;
    }
    
    // Featured filter
    if (filters.featured && !product.featured) {
      return false;
    }
    
    // Trending filter
    if (filters.trending && !product.trending) {
      return false;
    }
    
    // On sale filter
    if (filters.onSale && !product.onSale) {
      return false;
    }
    
    // In stock filter
    if (filters.inStock && product.stock <= 0) {
      return false;
    }
    
    return true;
  });
  
  // Handle product deletion with confirmation
  const handleDeleteProduct = (productId, productName) => {
    if (window.confirm(`Are you sure you want to delete "${productName}"?`)) {
      deleteProduct(productId);
    }
  };
  
  // Get category name by ID
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  };
  
  // Format price with discount
  const formatPrice = (price, onSale, discountPercentage) => {
    if (onSale && discountPercentage) {
      const discountedPrice = price * (1 - discountPercentage / 100);
      return (
        <div>
          <span className="line-through text-gray-500 mr-2">${price.toFixed(2)}</span>
          <span className="text-red-500">${discountedPrice.toFixed(2)}</span>
        </div>
      );
    }
    return <span>${price.toFixed(2)}</span>;
  };
  
  return (
    <div className="space-y-6">
      <PageHeader title="Products" actionLabel="Add New Product" actionPath="/admin/products/new" />
      
      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
            />
          </div>
          
          {/* Filter Toggle */}
          <button
            type="button"
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            onClick={() => document.getElementById('filters').classList.toggle('hidden')}
          >
            <FaFilter className="mr-2" />
            Filters
          </button>
        </div>
        
        {/* Filter Options */}
        <div id="filters" className="hidden mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="mainCategory" className="block text-sm font-medium text-gray-700 mb-1">
                Main Category
              </label>
              <select
                id="mainCategory"
                name="mainCategory"
                value={filters.mainCategory}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
              >
                <option value="">All Main Categories</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kids">Kids</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={filters.categoryId}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
              >
                <option value="">All Categories</option>
                {getAvailableCategories().map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={filters.featured}
                  onChange={handleFilterChange}
                  className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                  Featured
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="trending"
                  name="trending"
                  checked={filters.trending}
                  onChange={handleFilterChange}
                  className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                />
                <label htmlFor="trending" className="ml-2 block text-sm text-gray-700">
                  Trending
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="onSale"
                  name="onSale"
                  checked={filters.onSale}
                  onChange={handleFilterChange}
                  className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                />
                <label htmlFor="onSale" className="ml-2 block text-sm text-gray-700">
                  On Sale
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="inStock"
                  name="inStock"
                  checked={filters.inStock}
                  onChange={handleFilterChange}
                  className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                />
                <label htmlFor="inStock" className="ml-2 block text-sm text-gray-700">
                  In Stock
                </label>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={resetFilters}
              className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>
      
      {/* Products Grid/List */}
      {filteredProducts.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          {product.images && product.images.length > 0 ? (
                            <img 
                              className="h-10 w-10 rounded-md object-cover" 
                              src={product.images[0]} 
                              alt={product.name} 
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-500 text-xs">No img</span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-xs text-gray-500 capitalize">{product.mainCategory}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{getCategoryName(product.categoryId)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatPrice(product.price, product.onSale, product.discountPercentage)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${product.stock > 0 ? 'text-gray-900' : 'text-red-500'}`}>
                        {product.stock}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {product.featured && (
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                            Featured
                          </span>
                        )}
                        {product.trending && (
                          <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                            Trending
                          </span>
                        )}
                        {product.onSale && (
                          <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                            Sale
                          </span>
                        )}
                        {product.stock <= 0 && (
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/admin/products/edit/${product.id}`}
                        className="text-accent hover:text-accent-dark mr-3"
                      >
                        <FaEdit className="inline-block mr-1" /> Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(product.id, product.name)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash className="inline-block mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <div className="text-gray-500 mb-4">No products found matching your criteria.</div>
          <div className="flex justify-center">
            <Link
              to="/admin/products/new"
              className="inline-flex items-center px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90"
            >
              <FaPlus className="mr-2" /> Add a new product
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products; 