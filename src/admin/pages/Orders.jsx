import React, { useState } from 'react';
import { FaSearch, FaFilter, FaEye } from 'react-icons/fa';
import { useAdminData } from '../context/AdminDataContext';
import PageHeader from '../components/common/PageHeader';

const Orders = () => {
  const { orders, updateOrderStatus } = useAdminData();
  
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    dateRange: ''
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };
  
  // Reset filters
  const resetFilters = () => {
    setFilters({
      status: '',
      dateRange: ''
    });
    setSearchTerm('');
  };
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Calculate total amount
  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  // Filter orders based on search term and filters
  const filteredOrders = orders.filter(order => {
    // Search term filter (match order ID or customer name/email)
    if (searchTerm && !order.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Status filter
    if (filters.status && order.status !== filters.status) {
      return false;
    }
    
    // Date range filter
    if (filters.dateRange) {
      const orderDate = new Date(order.date);
      const today = new Date();
      
      switch (filters.dateRange) {
        case 'today':
          if (orderDate.toDateString() !== today.toDateString()) {
            return false;
          }
          break;
        case 'last7days': {
          const last7Days = new Date(today);
          last7Days.setDate(last7Days.getDate() - 7);
          if (orderDate < last7Days) {
            return false;
          }
          break;
        }
        case 'last30days': {
          const last30Days = new Date(today);
          last30Days.setDate(last30Days.getDate() - 30);
          if (orderDate < last30Days) {
            return false;
          }
          break;
        }
        default:
          break;
      }
    }
    
    return true;
  });
  
  // Handle order status change
  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    
    // If this is the selected order, update its status in the modal
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({
        ...selectedOrder,
        status: newStatus
      });
    }
  };
  
  // View order details
  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
  };
  
  // Close order details modal
  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };
  
  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="space-y-6">
      <PageHeader title="Orders" />
      
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
              placeholder="Search orders..."
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
            />
          </div>
          
          {/* Filter Toggle */}
          <button
            type="button"
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            onClick={() => document.getElementById('orderFilters').classList.toggle('hidden')}
          >
            <FaFilter className="mr-2" />
            Filters
          </button>
        </div>
        
        {/* Filter Options */}
        <div id="orderFilters" className="hidden mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <select
                id="dateRange"
                name="dateRange"
                value={filters.dateRange}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
              >
                <option value="">All Time</option>
                <option value="today">Today</option>
                <option value="last7days">Last 7 Days</option>
                <option value="last30days">Last 30 Days</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={resetFilters}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>
      
      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
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
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                      #{order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                      <div className="text-sm text-gray-500">{order.customer.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${calculateTotal(order.items).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => viewOrderDetails(order)}
                        className="text-accent hover:text-accent-dark"
                      >
                        <FaEye className="inline-block" /> View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No orders found. {searchTerm || Object.values(filters).some(Boolean) ? (
                      <button
                        onClick={resetFilters}
                        className="text-accent hover:underline"
                      >
                        Clear filters
                      </button>
                    ) : 'No orders have been placed yet.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-primary">
                  Order #{selectedOrder.id}
                </h2>
                <button
                  onClick={closeOrderDetails}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Customer Information</h3>
                  <p className="text-sm font-medium text-gray-900">{selectedOrder.customer.name}</p>
                  <p className="text-sm text-gray-600">{selectedOrder.customer.email}</p>
                  <p className="text-sm text-gray-600">{selectedOrder.customer.phone}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Shipping Address</h3>
                  <p className="text-sm text-gray-900">{selectedOrder.shippingAddress.street}</p>
                  <p className="text-sm text-gray-600">
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zip}
                  </p>
                  <p className="text-sm text-gray-600">{selectedOrder.shippingAddress.country}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Order Status</h3>
                <div className="flex items-center">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full mr-3 ${getStatusBadgeClass(selectedOrder.status)}`}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </span>
                  
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                    className="border border-gray-300 rounded-md text-sm px-2 py-1 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Order Items</h3>
                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md overflow-hidden">
                                {item.image ? (
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="h-full w-full flex items-center justify-center text-gray-400">
                                    No img
                                  </div>
                                )}
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                {item.variant && (
                                  <div className="text-xs text-gray-500">
                                    {item.variant.color && `Color: ${item.variant.color}`}
                                    {item.variant.color && item.variant.size && ' / '}
                                    {item.variant.size && `Size: ${item.variant.size}`}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                            ${item.price.toFixed(2)}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan="3" className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                          Subtotal
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                          ${calculateTotal(selectedOrder.items).toFixed(2)}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="3" className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                          Shipping
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                          ${selectedOrder.shipping?.toFixed(2) || '0.00'}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="3" className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                          Tax
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                          ${selectedOrder.tax?.toFixed(2) || '0.00'}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="3" className="px-4 py-3 whitespace-nowrap text-base font-bold text-gray-900 text-right">
                          Total
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-base font-bold text-gray-900 text-right">
                          ${(
                            calculateTotal(selectedOrder.items) +
                            (selectedOrder.shipping || 0) +
                            (selectedOrder.tax || 0)
                          ).toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              
              <div className="border-t pt-4 flex justify-end">
                <button
                  onClick={closeOrderDetails}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;