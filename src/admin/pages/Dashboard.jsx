import React, { useState } from 'react';
import { FaBox, FaShoppingBag, FaUsers, FaDollarSign, FaChartLine } from 'react-icons/fa';
import { StatCard, OrderStatusChart, RecentOrdersTable } from '../components/DashboardWidgets';
import DashboardAnalytics from '../components/DashboardAnalytics';
import { useAdminData } from '../context/AdminDataContext';

const Dashboard = () => {
  const { orders, getStats } = useAdminData();
  const stats = getStats();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
        
        <div className="mt-4 md:mt-0">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                activeTab === 'overview'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border border-gray-300`}
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                activeTab === 'analytics'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border border-gray-300 border-l-0`}
            >
              Analytics
            </button>
          </div>
        </div>
      </div>
      
      {activeTab === 'overview' ? (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Total Products" 
              value={stats.totalProducts} 
              icon={FaBox} 
              change={stats.productGrowth || "0"} 
              changeType={stats.productGrowth >= 0 ? "increase" : "decrease"} 
            />
            <StatCard 
              title="Total Orders" 
              value={stats.totalOrders} 
              icon={FaShoppingBag} 
              change={stats.orderGrowth || "0"} 
              changeType={stats.orderGrowth >= 0 ? "increase" : "decrease"} 
            />
            <StatCard 
              title="Total Users" 
              value={stats.totalUsers} 
              icon={FaUsers} 
              change={stats.userGrowth || "0"} 
              changeType={stats.userGrowth >= 0 ? "increase" : "decrease"} 
            />
            <StatCard 
              title="Total Revenue" 
              value={`$${stats.totalRevenue.toFixed(2)}`} 
              icon={FaDollarSign} 
              change={stats.revenueGrowth || "0"} 
              changeType={stats.revenueGrowth >= 0 ? "increase" : "decrease"} 
            />
          </div>
          
          {/* Charts and Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Status Chart */}
            <div className="lg:col-span-1">
              <OrderStatusChart ordersByStatus={stats.ordersByStatus} />
            </div>
            
            {/* Recent Orders Table */}
            <div className="lg:col-span-2">
              <RecentOrdersTable orders={orders} />
            </div>
          </div>
        </>
      ) : (
        <DashboardAnalytics />
      )}
    </div>
  );
};

export default Dashboard; 