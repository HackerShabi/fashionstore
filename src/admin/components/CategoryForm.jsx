import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdminData } from '../context';
import ImageUploader from './common/ImageUploader';

const CategoryForm = ({ category = null, isEdit = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addCategory, updateCategory } = useAdminData();
  
  // Get main category from URL query params if available
  const getInitialMainCategory = () => {
    if (location.search) {
      const params = new URLSearchParams(location.search);
      return params.get('mainCategory') || '';
    }
    return '';
  };
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    mainCategory: getInitialMainCategory(),
    image: null,
    featured: false,
    displayOrder: 0
  });
  
  const [subcategories, setSubcategories] = useState([]);
  const [newSubcategory, setNewSubcategory] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Main category options
  const mainCategoryOptions = ['men', 'women', 'kids'];
  
  // Initialize form with category data if editing
  useEffect(() => {
    if (isEdit && category) {
      setFormData({
        name: category.name || '',
        description: category.description || '',
        mainCategory: category.mainCategory || '',
        image: category.image ? [{ path: category.image }] : [],
        featured: category.featured || false,
        displayOrder: category.displayOrder || 0
      });
      
      setSubcategories(category.subcategories || []);
    }
  }, [isEdit, category]);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  // Handle image changes
  const handleImageChange = (images) => {
    setFormData({ ...formData, image: images[0] || null });
    
    // Clear error when field is being edited
    if (errors.image) {
      setErrors({ ...errors, image: '' });
    }
  };
  
  // Add new subcategory
  const handleAddSubcategory = () => {
    if (!newSubcategory.trim()) return;
    
    // Check if subcategory with same name already exists
    if (subcategories.some(sub => sub.name.toLowerCase() === newSubcategory.trim().toLowerCase())) {
      setErrors({ ...errors, subcategory: 'A subcategory with this name already exists' });
      return;
    }
    
    // Add new subcategory
    const newSub = {
      id: `sub_${Date.now()}`,
      name: newSubcategory.trim(),
      displayOrder: subcategories.length
    };
    
    setSubcategories([...subcategories, newSub]);
    setNewSubcategory('');
    
    // Clear error if it exists
    if (errors.subcategory) {
      setErrors({ ...errors, subcategory: '' });
    }
    
    // Clear error if it exists
    if (errors.subcategories) {
      setErrors({ ...errors, subcategories: '' });
    }
  };
  
  // Remove subcategory
  const handleRemoveSubcategory = (id) => {
    setSubcategories(subcategories.filter(sub => sub.id !== id));
  };
  
  // Edit subcategory
  const handleEditSubcategory = (id, newName) => {
    if (!newName.trim()) return;
    
    // Check if another subcategory with same name already exists
    if (subcategories.some(sub => sub.id !== id && sub.name.toLowerCase() === newName.trim().toLowerCase())) {
      setErrors({ ...errors, subcategory: 'A subcategory with this name already exists' });
      return;
    }
    
    setSubcategories(
      subcategories.map(sub => 
        sub.id === id ? { ...sub, name: newName.trim() } : sub
      )
    );
  };
  
  // Reorder subcategories
  const moveSubcategory = (id, direction) => {
    const index = subcategories.findIndex(sub => sub.id === id);
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === subcategories.length - 1)) {
      return;
    }
    
    const newSubcategories = [...subcategories];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const temp = newSubcategories[index];
    newSubcategories[index] = newSubcategories[targetIndex];
    newSubcategories[targetIndex] = temp;
    
    // Update display order
    const updatedSubcategories = newSubcategories.map((sub, idx) => ({
      ...sub,
      displayOrder: idx
    }));
    
    setSubcategories(updatedSubcategories);
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Category description is required';
    }
    
    if (!formData.mainCategory) {
      newErrors.mainCategory = 'Main category is required';
    }
    
    if (!formData.image) {
      newErrors.image = 'Category image is required';
    }
    
    if (subcategories.length === 0) {
      newErrors.subcategories = 'At least one subcategory is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (validateForm()) {
      // Prepare category data
      const categoryData = {
        ...formData,
        image: formData.image?.path || '',
        subcategories
      };
      
      try {
        if (isEdit && category) {
          // Update existing category
          updateCategory(category.id, categoryData);
        } else {
          // Add new category
          addCategory(categoryData);
        }
        
        // Navigate back to categories list
        navigate('/admin/categories');
      } catch (error) {
        console.error('Error saving category:', error);
        setErrors({ submit: 'Failed to save category. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {errors.submit && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
          {errors.submit}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-primary mb-4">Category Information</h2>
          
          <div className="space-y-4">
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
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Category Name <span className="text-red-500">*</span>
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
            
            <div>
              <label htmlFor="displayOrder" className="block text-sm font-medium text-gray-700 mb-1">
                Display Order
              </label>
              <input
                type="number"
                id="displayOrder"
                name="displayOrder"
                value={formData.displayOrder}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
              />
              <p className="mt-1 text-xs text-gray-500">
                Lower numbers will be displayed first
              </p>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                Featured Category
              </label>
            </div>
          </div>
        </div>
        
        {/* Category Image */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-primary mb-4">Category Image</h2>
          
          <ImageUploader
            images={formData.image ? [formData.image] : []}
            onChange={handleImageChange}
            multiple={false}
          />
          {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
          <p className="text-sm text-gray-500 mt-2">
            Upload a high-quality image that represents this category.
            Recommended size: 800x600 pixels.
          </p>
        </div>
      </div>
      
      {/* Subcategories */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium text-primary mb-4">Subcategories</h2>
        
        <div className="space-y-4">
          <div className="flex">
            <input
              type="text"
              value={newSubcategory}
              onChange={(e) => setNewSubcategory(e.target.value)}
              placeholder="Enter subcategory name"
              className={`flex-1 px-3 py-2 border rounded-l-md ${
                errors.subcategory ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent`}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSubcategory())}
            />
            <button
              type="button"
              onClick={handleAddSubcategory}
              className="px-4 py-2 bg-accent text-white rounded-r-md hover:bg-accent/90"
            >
              Add
            </button>
          </div>
          {errors.subcategory && <p className="mt-1 text-sm text-red-500">{errors.subcategory}</p>}
          
          {subcategories.length > 0 ? (
            <div className="mt-4 border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subcategory Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subcategories.map((subcategory, index) => (
                    <tr key={subcategory.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          <button
                            type="button"
                            onClick={() => moveSubcategory(subcategory.id, 'up')}
                            disabled={index === 0}
                            className={`p-1 rounded ${
                              index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100'
                            }`}
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            onClick={() => moveSubcategory(subcategory.id, 'down')}
                            disabled={index === subcategories.length - 1}
                            className={`p-1 rounded ${
                              index === subcategories.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100'
                            }`}
                          >
                            ↓
                          </button>
                          <span className="ml-2">{index + 1}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          value={subcategory.name}
                          onChange={(e) => handleEditSubcategory(subcategory.id, e.target.value)}
                          className="w-full px-2 py-1 border-b border-transparent hover:border-gray-300 focus:border-accent focus:outline-none"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          type="button"
                          onClick={() => handleRemoveSubcategory(subcategory.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="mt-4 p-4 border border-dashed border-gray-300 rounded-md text-center text-gray-500">
              No subcategories added yet
            </div>
          )}
          
          {errors.subcategories && <p className="mt-1 text-sm text-red-500">{errors.subcategories}</p>}
        </div>
      </div>
      
      {/* Form Actions */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => navigate('/admin/categories')}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 mr-4 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:bg-gray-400"
        >
          {isSubmitting ? 'Saving...' : isEdit ? 'Update Category' : 'Add Category'}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm; 