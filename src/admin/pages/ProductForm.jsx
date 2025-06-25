import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdminData } from '../context';
import ProductFormComponent from '../components/ProductForm';
import PageHeader from '../components/common/PageHeader';

const ProductFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, getProductById } = useAdminData();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState(null);
  
  const isEdit = !!id;
  
  // Fetch product data if editing
  useEffect(() => {
    if (isEdit) {
      try {
        const productData = getProductById(id);
        if (productData) {
          setProduct(productData);
        } else {
          setError('Product not found');
          setTimeout(() => {
            navigate('/admin/products');
          }, 2000);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product data');
      } finally {
        setLoading(false);
      }
    }
  }, [id, isEdit, getProductById, navigate]);
  
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
        title={isEdit ? 'Edit Product' : 'Add New Product'}
        actionLabel="Back to Products"
        actionPath="/admin/products"
      />
      
      <div className="mt-6">
        <ProductFormComponent product={product} isEdit={isEdit} />
      </div>
    </div>
  );
};

export default ProductFormPage; 