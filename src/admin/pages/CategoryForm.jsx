import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdminData } from '../context';
import CategoryFormComponent from '../components/CategoryForm';
import PageHeader from '../components/common/PageHeader';

const CategoryFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCategoryById } = useAdminData();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState(null);
  
  const isEdit = !!id;
  
  // Fetch category data if editing
  useEffect(() => {
    if (isEdit) {
      try {
        const categoryData = getCategoryById(id);
        if (categoryData) {
          setCategory(categoryData);
        } else {
          setError('Category not found');
          setTimeout(() => {
            navigate('/admin/categories');
          }, 2000);
        }
      } catch (error) {
        console.error('Error fetching category:', error);
        setError('Failed to load category data');
      } finally {
        setLoading(false);
      }
    }
  }, [id, isEdit, getCategoryById, navigate]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }
  
  return (
    <div>
      <PageHeader
        title={isEdit ? 'Edit Category' : 'Add New Category'}
        actionLabel="Back to Categories"
        actionPath="/admin/categories"
      />
      
      <div className="mt-6">
        <CategoryFormComponent category={category} isEdit={isEdit} />
      </div>
    </div>
  );
};

export default CategoryFormPage; 