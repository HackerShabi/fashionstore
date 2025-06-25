import React from 'react';
import { 
  FaBox, 
  FaShoppingBag, 
  FaUsers, 
  FaDollarSign, 
  FaArrowUp, 
  FaArrowDown 
} from 'react-icons/fa';

const StatCard = ({ title, value, icon: Icon, change, changeType }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-primary mt-1">{value}</p>
        </div>
        <div className="p-3 bg-light rounded-full">
          <Icon className="h-6 w-6 text-accent" />
        </div>
      </div>
      {change && (
        <div className="flex items-center mt-4">
          {changeType === 'increase' ? (
            <FaArrowUp className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <FaArrowDown className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span className={`text-sm ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
            {change}% from last month
          </span>
        </div>
      )}
    </div>
  );
};

const OrderStatusChart = ({ ordersByStatus }) => {
  const { pending, shipped, delivered, cancelled } = ordersByStatus;
  const total = pending + shipped + delivered + cancelled;

  // Calculate percentages
  const pendingPercent = total > 0 ? Math.round((pending / total) * 100) : 0;
  const shippedPercent = total > 0 ? Math.round((shipped / total) * 100) : 0;
  const deliveredPercent = total > 0 ? Math.round((delivered / total) * 100) : 0;
  const cancelledPercent = total > 0 ? Math.round((cancelled / total) * 100) : 0;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-primary mb-4">Order Status</h3>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Pending</span>
            <span className="text-sm font-medium text-gray-700">{pending} ({pendingPercent}%)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${pendingPercent}%` }}></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Shipped</span>
            <span className="text-sm font-medium text-gray-700">{shipped} ({shippedPercent}%)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${shippedPercent}%` }}></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Delivered</span>
            <span className="text-sm font-medium text-gray-700">{delivered} ({deliveredPercent}%)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${deliveredPercent}%` }}></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Cancelled</span>
            <span className="text-sm font-medium text-gray-700">{cancelled} ({cancelledPercent}%)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-red-500 h-2 rounded-full" style={{ width: `${cancelledPercent}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RecentOrdersTable = ({ orders }) => {
  // Get the most recent 5 orders
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate total price for an order
  const calculateOrderTotal = (order) => {
    const itemsTotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = order.shipping || 0;
    const tax = order.tax || 0;
    return itemsTotal + shipping + tax;
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-primary">Recent Orders</h3>
      </div>
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
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {order.customer.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  ${calculateOrderTotal(order).toFixed(2)}
                </td>
              </tr>
            ))}
            {recentOrders.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { StatCard, OrderStatusChart, RecentOrdersTable }; 