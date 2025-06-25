import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminDataProvider } from './context/AdminDataContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Products from './pages/Products';
import ProductForm from './pages/ProductForm';
import Categories from './pages/Categories';
import CategoryForm from './pages/CategoryForm';
import Orders from './pages/Orders';
import Users from './pages/Users';
import HomepageSettings from './pages/HomepageSettings';

const AdminRoutes = () => {
  return (
    <AuthProvider>
      <AdminDataProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            
            {/* Products Routes */}
            <Route path="products" element={<Products />} />
            <Route path="products/new" element={<ProductForm />} />
            <Route path="products/edit/:id" element={<ProductForm />} />
            
            {/* Categories Routes */}
            <Route path="categories" element={<Categories />} />
            <Route path="categories/new" element={<CategoryForm />} />
            <Route path="categories/edit/:id" element={<CategoryForm />} />
            
            {/* Orders Route */}
            <Route path="orders" element={<Orders />} />
            
            {/* Users Route */}
            <Route path="users" element={<Users />} />
            
            {/* Homepage Settings Route */}
            <Route path="homepage-settings" element={<HomepageSettings />} />
          </Route>
        </Routes>
      </AdminDataProvider>
    </AuthProvider>
  );
};

export default AdminRoutes; 