import React, { useState, useEffect } from 'react';
import { useAdminData } from '../context/AdminDataContext';
import ImageUploader from './common/ImageUploader';

const HomepageSettingsForm = ({ onFormDataChange }) => {
  const { homepageSettings, updateHomepageSettings, products, categories } = useAdminData();
  
  // Form state
  const [formData, setFormData] = useState({
    heroTitle: '',
    heroSubtitle: '',
    heroImage: null,
    featuredCategories: [],
    featuredProducts: [],
    promoTitle: '',
    promoSubtitle: '',
    promoImage: null,
    promoLink: '',
    testimonials: []
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('hero'); // For tabbed navigation
  
  // New testimonial state
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    role: '',
    comment: '',
    image: null
  });
  
  // Initialize form with homepage settings data
  useEffect(() => {
    if (homepageSettings) {
      const initialData = {
        heroTitle: homepageSettings.heroTitle || '',
        heroSubtitle: homepageSettings.heroSubtitle || '',
        heroImage: homepageSettings.heroImage ? { path: homepageSettings.heroImage } : null,
        featuredCategories: homepageSettings.featuredCategories || [],
        featuredProducts: homepageSettings.featuredProducts || [],
        promoTitle: homepageSettings.promoTitle || '',
        promoSubtitle: homepageSettings.promoSubtitle || '',
        promoImage: homepageSettings.promoImage ? { path: homepageSettings.promoImage } : null,
        promoLink: homepageSettings.promoLink || '',
        testimonials: homepageSettings.testimonials?.map(t => ({
          ...t,
          image: t.image ? { path: t.image } : null
        })) || []
      };
      
      setFormData(initialData);
      
      // Pass initial data to parent for preview
      if (onFormDataChange) {
        onFormDataChange(initialData);
      }
    }
  }, [homepageSettings, onFormDataChange]);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    
    setFormData(updatedFormData);
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    
    // Clear success message
    if (success) {
      setSuccess(false);
    }
    
    // Update preview in parent component
    if (onFormDataChange) {
      onFormDataChange(updatedFormData);
    }
  };
  
  // Handle image changes
  const handleImageChange = (images, field) => {
    const updatedFormData = { ...formData, [field]: images[0] || null };
    
    setFormData(updatedFormData);
    
    // Clear error when field is being edited
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
    
    // Clear success message
    if (success) {
      setSuccess(false);
    }
    
    // Update preview in parent component
    if (onFormDataChange) {
      onFormDataChange(updatedFormData);
    }
  };
  
  // Handle multi-select changes
  const handleMultiSelect = (e, field) => {
    const value = e.target.value;
    let updatedValues;
    
    if (formData[field].includes(value)) {
      // Remove value if already selected
      updatedValues = formData[field].filter(item => item !== value);
    } else {
      // Add value if not already selected
      updatedValues = [...formData[field], value];
    }
    
    const updatedFormData = {
      ...formData,
      [field]: updatedValues
    };
    
    setFormData(updatedFormData);
    
    // Clear error when field is being edited
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
    
    // Clear success message
    if (success) {
      setSuccess(false);
    }
    
    // Update preview in parent component
    if (onFormDataChange) {
      onFormDataChange(updatedFormData);
    }
  };
  
  // Handle new testimonial input changes
  const handleTestimonialChange = (e) => {
    const { name, value } = e.target;
    setNewTestimonial({ ...newTestimonial, [name]: value });
    
    // Clear error when field is being edited
    if (errors[`testimonial_${name}`]) {
      setErrors({ ...errors, [`testimonial_${name}`]: '' });
    }
  };
  
  // Handle testimonial image change
  const handleTestimonialImageChange = (images) => {
    setNewTestimonial({ ...newTestimonial, image: images[0] || null });
    
    // Clear error when field is being edited
    if (errors.testimonial_image) {
      setErrors({ ...errors, testimonial_image: '' });
    }
  };
  
  // Add new testimonial
  const handleAddTestimonial = () => {
    const testimonialErrors = {};
    
    if (!newTestimonial.name.trim()) {
      testimonialErrors.testimonial_name = 'Name is required';
    }
    
    if (!newTestimonial.role.trim()) {
      testimonialErrors.testimonial_role = 'Role is required';
    }
    
    if (!newTestimonial.comment.trim()) {
      testimonialErrors.testimonial_comment = 'Comment is required';
    }
    
    if (!newTestimonial.image) {
      testimonialErrors.testimonial_image = 'Image is required';
    }
    
    if (Object.keys(testimonialErrors).length > 0) {
      setErrors({ ...errors, ...testimonialErrors });
      return;
    }
    
    // Add new testimonial with an ID
    const newTestimonialWithId = {
      ...newTestimonial,
      id: `testimonial_${Date.now()}`
    };
    
    const updatedFormData = {
      ...formData,
      testimonials: [...formData.testimonials, newTestimonialWithId]
    };
    
    setFormData(updatedFormData);
    
    // Reset new testimonial form
    setNewTestimonial({
      name: '',
      role: '',
      comment: '',
      image: null
    });
    
    // Clear success message
    if (success) {
      setSuccess(false);
    }
    
    // Update preview in parent component
    if (onFormDataChange) {
      onFormDataChange(updatedFormData);
    }
  };
  
  // Remove testimonial
  const handleRemoveTestimonial = (id) => {
    const updatedFormData = {
      ...formData,
      testimonials: formData.testimonials.filter(t => t.id !== id)
    };
    
    setFormData(updatedFormData);
    
    // Clear success message
    if (success) {
      setSuccess(false);
    }
    
    // Update preview in parent component
    if (onFormDataChange) {
      onFormDataChange(updatedFormData);
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Hero section validation
    if (!formData.heroTitle.trim()) {
      newErrors.heroTitle = 'Hero title is required';
    }
    
    if (!formData.heroSubtitle.trim()) {
      newErrors.heroSubtitle = 'Hero subtitle is required';
    }
    
    if (!formData.heroImage) {
      newErrors.heroImage = 'Hero image is required';
    }
    
    // Featured sections validation
    if (formData.featuredCategories.length === 0) {
      newErrors.featuredCategories = 'At least one featured category is required';
    }
    
    if (formData.featuredProducts.length === 0) {
      newErrors.featuredProducts = 'At least one featured product is required';
    }
    
    // Promo section validation
    if (formData.promoTitle.trim() && !formData.promoImage) {
      newErrors.promoImage = 'Promo image is required when title is provided';
    }
    
    if (formData.promoImage && !formData.promoTitle.trim()) {
      newErrors.promoTitle = 'Promo title is required when image is provided';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare data for submission
      const submissionData = {
        ...formData,
        heroImage: formData.heroImage?.path || null,
        promoImage: formData.promoImage?.path || null,
        testimonials: formData.testimonials.map(t => ({
          ...t,
          image: t.image?.path || null
        }))
      };
      
      // Update homepage settings
      updateHomepageSettings(submissionData);
      
      setSuccess(true);
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error updating homepage settings:', error);
      setErrors({ submit: 'Failed to update homepage settings. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Tab navigation
  const tabs = [
    { id: 'hero', label: 'Hero Section' },
    { id: 'featured', label: 'Featured Content' },
    { id: 'promo', label: 'Promo Banner' },
    { id: 'testimonials', label: 'Testimonials' }
  ];
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Success message */}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
          Homepage settings updated successfully!
        </div>
      )}
      
      {/* Submit error */}
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {errors.submit}
        </div>
      )}
      
      {/* Tabbed navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Hero Section */}
      <div className={activeTab === 'hero' ? 'block' : 'hidden'}>
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Hero Section</h3>
          <p className="text-sm text-gray-500">
            Configure the main banner that appears at the top of your homepage.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="heroTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Hero Title
              </label>
              <input
                type="text"
                id="heroTitle"
                name="heroTitle"
                value={formData.heroTitle}
                onChange={handleChange}
                className={`w-full rounded-md border ${
                  errors.heroTitle ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary`}
                placeholder="e.g., Summer Collection 2023"
              />
              {errors.heroTitle && (
                <p className="mt-1 text-sm text-red-600">{errors.heroTitle}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="heroSubtitle" className="block text-sm font-medium text-gray-700 mb-1">
                Hero Subtitle
              </label>
              <input
                type="text"
                id="heroSubtitle"
                name="heroSubtitle"
                value={formData.heroSubtitle}
                onChange={handleChange}
                className={`w-full rounded-md border ${
                  errors.heroSubtitle ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary`}
                placeholder="e.g., Discover the latest trends"
              />
              {errors.heroSubtitle && (
                <p className="mt-1 text-sm text-red-600">{errors.heroSubtitle}</p>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hero Image
            </label>
            <ImageUploader
              images={formData.heroImage ? [formData.heroImage] : []}
              onChange={(images) => handleImageChange(images, 'heroImage')}
              maxImages={1}
            />
            {errors.heroImage && (
              <p className="mt-1 text-sm text-red-600">{errors.heroImage}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Recommended size: 1920x600 pixels. Max file size: 2MB.
            </p>
          </div>
        </div>
      </div>
      
      {/* Featured Content */}
      <div className={activeTab === 'featured' ? 'block' : 'hidden'}>
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Featured Content</h3>
          <p className="text-sm text-gray-500">
            Select categories and products to feature on your homepage.
          </p>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Featured Categories
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`category-${category.id}`}
                    value={category.id}
                    checked={formData.featuredCategories.includes(category.id)}
                    onChange={(e) => handleMultiSelect(e, 'featuredCategories')}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className="ml-2 block text-sm text-gray-700"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
            {errors.featuredCategories && (
              <p className="mt-1 text-sm text-red-600">{errors.featuredCategories}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Select 3-6 categories to feature on your homepage.
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Featured Products
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {products.map((product) => (
                <div key={product.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`product-${product.id}`}
                    value={product.id}
                    checked={formData.featuredProducts.includes(product.id)}
                    onChange={(e) => handleMultiSelect(e, 'featuredProducts')}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`product-${product.id}`}
                    className="ml-2 block text-sm text-gray-700"
                  >
                    {product.name}
                  </label>
                </div>
              ))}
            </div>
            {errors.featuredProducts && (
              <p className="mt-1 text-sm text-red-600">{errors.featuredProducts}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Select 4-8 products to feature on your homepage.
            </p>
          </div>
        </div>
      </div>
      
      {/* Promo Banner */}
      <div className={activeTab === 'promo' ? 'block' : 'hidden'}>
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Promotional Banner</h3>
          <p className="text-sm text-gray-500">
            Configure a promotional banner to highlight special offers or collections.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="promoTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Promo Title
              </label>
              <input
                type="text"
                id="promoTitle"
                name="promoTitle"
                value={formData.promoTitle}
                onChange={handleChange}
                className={`w-full rounded-md border ${
                  errors.promoTitle ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary`}
                placeholder="e.g., Special Offer"
              />
              {errors.promoTitle && (
                <p className="mt-1 text-sm text-red-600">{errors.promoTitle}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="promoSubtitle" className="block text-sm font-medium text-gray-700 mb-1">
                Promo Subtitle
              </label>
              <input
                type="text"
                id="promoSubtitle"
                name="promoSubtitle"
                value={formData.promoSubtitle}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                placeholder="e.g., Get 20% off on all products"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="promoLink" className="block text-sm font-medium text-gray-700 mb-1">
              Promo Link (URL)
            </label>
            <input
              type="text"
              id="promoLink"
              name="promoLink"
              value={formData.promoLink}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              placeholder="e.g., /shop/sale"
            />
            <p className="mt-1 text-xs text-gray-500">
              Enter a relative URL (e.g., /shop/sale) or leave blank to disable the link.
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Promo Image
            </label>
            <ImageUploader
              images={formData.promoImage ? [formData.promoImage] : []}
              onChange={(images) => handleImageChange(images, 'promoImage')}
              maxImages={1}
            />
            {errors.promoImage && (
              <p className="mt-1 text-sm text-red-600">{errors.promoImage}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Recommended size: 1200x400 pixels. Max file size: 2MB.
            </p>
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className={activeTab === 'testimonials' ? 'block' : 'hidden'}>
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Testimonials</h3>
          <p className="text-sm text-gray-500">
            Add customer testimonials to build trust and credibility.
          </p>
          
          {/* Existing testimonials */}
          {formData.testimonials.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Existing Testimonials</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="border rounded-lg p-4 relative"
                  >
                    <button
                      type="button"
                      onClick={() => handleRemoveTestimonial(testimonial.id)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                      aria-label="Remove testimonial"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        {testimonial.image && (
                          <img
                            src={testimonial.image.path || '/assets/placeholder.txt'}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 italic">"{testimonial.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Add new testimonial */}
          <div className="border-t pt-6">
            <h4 className="font-medium text-gray-700 mb-4">Add New Testimonial</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="testimonial_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="testimonial_name"
                  name="name"
                  value={newTestimonial.name}
                  onChange={handleTestimonialChange}
                  className={`w-full rounded-md border ${
                    errors.testimonial_name ? 'border-red-300' : 'border-gray-300'
                  } px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary`}
                  placeholder="e.g., John Smith"
                />
                {errors.testimonial_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.testimonial_name}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="testimonial_role" className="block text-sm font-medium text-gray-700 mb-1">
                  Role/Company
                </label>
                <input
                  type="text"
                  id="testimonial_role"
                  name="role"
                  value={newTestimonial.role}
                  onChange={handleTestimonialChange}
                  className={`w-full rounded-md border ${
                    errors.testimonial_role ? 'border-red-300' : 'border-gray-300'
                  } px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary`}
                  placeholder="e.g., Customer"
                />
                {errors.testimonial_role && (
                  <p className="mt-1 text-sm text-red-600">{errors.testimonial_role}</p>
                )}
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="testimonial_comment" className="block text-sm font-medium text-gray-700 mb-1">
                Testimonial
              </label>
              <textarea
                id="testimonial_comment"
                name="comment"
                value={newTestimonial.comment}
                onChange={handleTestimonialChange}
                rows={3}
                className={`w-full rounded-md border ${
                  errors.testimonial_comment ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary`}
                placeholder="Enter the customer's testimonial..."
              />
              {errors.testimonial_comment && (
                <p className="mt-1 text-sm text-red-600">{errors.testimonial_comment}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer Photo
              </label>
              <ImageUploader
                images={newTestimonial.image ? [newTestimonial.image] : []}
                onChange={handleTestimonialImageChange}
                maxImages={1}
              />
              {errors.testimonial_image && (
                <p className="mt-1 text-sm text-red-600">{errors.testimonial_image}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Square image recommended. Max file size: 1MB.
              </p>
            </div>
            
            <button
              type="button"
              onClick={handleAddTestimonial}
              className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Add Testimonial
            </button>
          </div>
        </div>
      </div>
      
      {/* Form actions */}
      <div className="border-t pt-6 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
            isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};

export default HomepageSettingsForm; 