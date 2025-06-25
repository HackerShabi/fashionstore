import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FaHome, 
  FaBox, 
  FaList, 
  FaShoppingCart, 
  FaUsers, 
  FaCog, 
  FaSignOutAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  
  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <FaHome className="w-5 h-5" /> },
    { name: 'Products', path: '/admin/products', icon: <FaBox className="w-5 h-5" /> },
    { name: 'Categories', path: '/admin/categories', icon: <FaList className="w-5 h-5" /> },
    { name: 'Orders', path: '/admin/orders', icon: <FaShoppingCart className="w-5 h-5" /> },
    { name: 'Users', path: '/admin/users', icon: <FaUsers className="w-5 h-5" /> },
    { name: 'Homepage Settings', path: '/admin/homepage-settings', icon: <FaCog className="w-5 h-5" /> },
  ];
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-primary text-white transition duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-primary-dark">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <button 
            className="lg:hidden text-white"
            onClick={closeSidebar}
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
        
        {/* User info */}
        <div className="p-4 border-b border-primary-dark">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{user?.name || 'Admin User'}</p>
              <p className="text-xs text-gray-300">{user?.email || 'admin@example.com'}</p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-3 text-sm rounded-md transition-colors ${
                      isActive 
                        ? 'bg-primary-dark text-white' 
                        : 'text-gray-300 hover:bg-primary-dark hover:text-white'
                    }`
                  }
                  onClick={closeSidebar}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </NavLink>
              </li>
            ))}
            
            <li className="pt-4 mt-4 border-t border-primary-dark">
              <button
                onClick={handleLogout}
                className="flex w-full items-center px-4 py-3 text-sm text-gray-300 rounded-md hover:bg-primary-dark hover:text-white transition-colors"
              >
                <FaSignOutAlt className="w-5 h-5 mr-3" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      
      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex h-16 items-center justify-between px-4">
            <button 
              className="lg:hidden text-gray-600"
              onClick={toggleSidebar}
            >
              <FaBars className="w-5 h-5" />
            </button>
            
            <div className="ml-auto text-sm text-gray-600">
              <a href="/" className="hover:underline" target="_blank" rel="noopener noreferrer">
                View Store
              </a>
            </div>
          </div>
        </header>
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 