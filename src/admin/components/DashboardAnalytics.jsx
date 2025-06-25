import React from 'react';
import { useAdminData } from '../context/AdminDataContext';

const DashboardAnalytics = () => {
  const { getStats } = useAdminData();
  const stats = getStats();
  
  // Chart data for revenue
  const revenueData = stats.revenueByMonth;
  const maxRevenue = Math.max(...Object.values(revenueData));
  
  // Chart data for orders
  const orderData = stats.ordersByMonth;
  const maxOrders = Math.max(...Object.values(orderData));
  
  return (
    <div className="space-y-6">
      {/* Revenue & Orders Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue (Last 6 Months)</h3>
          <div className="h-64 flex items-end space-x-2">
            {Object.entries(revenueData).map(([month, amount]) => (
              <div key={month} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-primary rounded-t-sm" 
                  style={{ 
                    height: `${(amount / maxRevenue) * 100}%`,
                    minHeight: '4px'
                  }}
                ></div>
                <div className="text-xs text-gray-600 mt-2">{month}</div>
                <div className="text-xs font-medium mt-1">${amount}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Orders Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Orders (Last 6 Months)</h3>
          <div className="h-64 flex items-end space-x-2">
            {Object.entries(orderData).map(([month, count]) => (
              <div key={month} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-accent rounded-t-sm" 
                  style={{ 
                    height: `${(count / maxOrders) * 100}%`,
                    minHeight: '4px'
                  }}
                ></div>
                <div className="text-xs text-gray-600 mt-2">{month}</div>
                <div className="text-xs font-medium mt-1">{count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Top Products & Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Products</h3>
          <div className="space-y-4">
            {stats.topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center">
                <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 mr-3 flex-shrink-0">
                  {product.image && (
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-grow min-w-0">
                  <p className="font-medium text-gray-900 truncate">{product.name}</p>
                  <div className="flex items-center mt-1">
                    <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary" 
                        style={{ width: `${product.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-gray-600 ml-2">
                      ${product.revenue}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Top Categories */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Categories</h3>
          <div className="space-y-4">
            {stats.topCategories.map((category, index) => (
              <div key={category.id} className="flex items-center">
                <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 mr-3 flex-shrink-0">
                  {category.image && (
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-grow min-w-0">
                  <p className="font-medium text-gray-900 truncate">{category.name}</p>
                  <div className="flex items-center mt-1">
                    <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-accent" 
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-gray-600 ml-2">
                      {category.count} orders
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {stats.recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                activity.type === 'order' ? 'bg-green-100 text-green-600' :
                activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                activity.type === 'product' ? 'bg-purple-100 text-purple-600' :
                'bg-gray-100 text-gray-600'
              }`}>
                {activity.type === 'order' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                    <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                )}
                {activity.type === 'user' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                )}
                {activity.type === 'product' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-4 flex-grow">
                <p className="text-sm text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalytics; 