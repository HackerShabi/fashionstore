import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaSearch, FaPlus } from 'react-icons/fa';
import { useAdminData } from '../context';
import PageHeader from '../components/common/PageHeader';

const Categories = () => {
  const { categories, deleteCategory } = useAdminData();
  
  // State for active main category tab
  const [activeTab, setActiveTab] = useState('men');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Main categories
  const mainCategories = ['men', 'women', 'kids'];
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Filter categories based on active tab and search term
  const filteredCategories = categories.filter(category => 
    category.mainCategory === activeTab && 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle category deletion with confirmation
  const handleDeleteCategory = (categoryId, categoryName) => {
    // Check if category has products
    const hasProducts = false; // This would be a real check in a production app
    
    if (hasProducts) {
      alert(`Cannot delete "${categoryName}" because it has products associated with it. Remove or reassign the products first.`);
      return;
    }
    
    if (window.confirm(`Are you sure you want to delete "${categoryName}"? This will also delete all subcategories.`)) {
      deleteCategory(categoryId);
    }
  };
  
  return (
    <div className="space-y-6">
      <PageHeader title="Categories" actionLabel="Add Category" actionPath="/admin/categories/new" />
      
      {/* Main Category Tabs */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex border-b">
          {mainCategories.map((category) => (
            <button
              key={category}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === category
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Search */}
        <div className="p-4 border-b">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search categories..."
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
            />
          </div>
        </div>
        
        {/* Categories Grid */}
        <div className="p-4">
          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category) => (
                <div key={category.id} className="bg-white border rounded-lg shadow-sm overflow-hidden">
                  <div className="h-40 bg-gray-200 relative">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No image
                      </div>
                    )}
                    
                    {category.featured && (
                      <span className="absolute top-2 right-2 px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-primary">{category.name}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{category.description}</p>
                    
                    <div className="mt-3">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-medium text-gray-700">Subcategories:</h4>
                        <Link
                          to={`/admin/categories/edit/${category.id}`}
                          className="text-xs text-accent hover:text-accent-dark"
                        >
                          <FaPlus className="inline-block mr-1" /> Add
                        </Link>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {category.subcategories && category.subcategories.length > 0 ? (
                          category.subcategories.map((subcategory) => (
                            <div
                              key={subcategory.id}
                              className="inline-flex items-center px-2 py-1 bg-gray-100 text-xs rounded-full group"
                            >
                              <span>{subcategory.name}</span>
                              <Link
                                to={`/admin/categories/edit/${category.id}?subcategory=${subcategory.id}`}
                                className="ml-1 text-gray-400 hover:text-accent opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <FaEdit className="inline-block" />
                              </Link>
                            </div>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500 italic">No subcategories</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <Link
                        to={`/admin/categories/edit/${category.id}`}
                        className="text-accent hover:text-accent-dark mr-3"
                      >
                        <FaEdit className="inline-block mr-1" /> Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteCategory(category.id, category.name)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash className="inline-block mr-1" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Add Category Card */}
              <Link
                to={`/admin/categories/new?mainCategory=${activeTab}`}
                className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center h-64 hover:border-accent hover:bg-gray-50 transition-colors"
              >
                <FaPlus className="text-gray-400 text-2xl mb-2" />
                <span className="text-gray-500 font-medium">Add New Category</span>
              </Link>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg text-center text-gray-500">
              No categories found for {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}.
              <div className="mt-4">
                <Link
                  to={`/admin/categories/new?mainCategory=${activeTab}`}
                  className="inline-flex items-center px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90"
                >
                  <FaPlus className="mr-2" /> Add a new category
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories; 