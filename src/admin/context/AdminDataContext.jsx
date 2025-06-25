import React, { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Create admin data context
const AdminDataContext = createContext();

// Custom hook to use admin data context
export const useAdminData = () => {
  return useContext(AdminDataContext);
};

export const AdminDataProvider = ({ children }) => {
  // State for all data
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [homepageSettings, setHomepageSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load products
        const storedProducts = localStorage.getItem('admin_products');
        if (storedProducts) {
          setProducts(JSON.parse(storedProducts));
        } else {
          // Initialize with sample data if empty
          setProducts(generateSampleProducts());
        }
        
        // Load categories
        const storedCategories = localStorage.getItem('admin_categories');
        if (storedCategories) {
          setCategories(JSON.parse(storedCategories));
        } else {
          // Initialize with sample data if empty
          setCategories(generateSampleCategories());
        }
        
        // Load orders
        const storedOrders = localStorage.getItem('admin_orders');
        if (storedOrders) {
          setOrders(JSON.parse(storedOrders));
        } else {
          // Initialize with sample data if empty
          setOrders(generateSampleOrders());
        }
        
        // Load users
        const storedUsers = localStorage.getItem('admin_users');
        if (storedUsers) {
          setUsers(JSON.parse(storedUsers));
        } else {
          // Initialize with sample data if empty
          setUsers(generateSampleUsers());
        }
        
        // Load homepage settings
        const storedHomepageSettings = localStorage.getItem('admin_homepage_settings');
        if (storedHomepageSettings) {
          setHomepageSettings(JSON.parse(storedHomepageSettings));
        } else {
          // Initialize with sample data if empty
          setHomepageSettings(generateSampleHomepageSettings());
        }
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('admin_products', JSON.stringify(products));
    }
  }, [products, loading]);
  
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('admin_categories', JSON.stringify(categories));
    }
  }, [categories, loading]);
  
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('admin_orders', JSON.stringify(orders));
    }
  }, [orders, loading]);
  
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('admin_users', JSON.stringify(users));
    }
  }, [users, loading]);
  
  useEffect(() => {
    if (!loading && homepageSettings) {
      localStorage.setItem('admin_homepage_settings', JSON.stringify(homepageSettings));
    }
  }, [homepageSettings, loading]);
  
  // Product CRUD operations
  const getProductById = (id) => {
    return products.find(product => product.id === id) || null;
  };
  
  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: `prod_${uuidv4()}`,
      createdAt: new Date().toISOString()
    };
    
    setProducts([...products, newProduct]);
    return newProduct;
  };
  
  const updateProduct = (id, productData) => {
    const updatedProducts = products.map(product => 
      product.id === id ? { ...product, ...productData, updatedAt: new Date().toISOString() } : product
    );
    
    setProducts(updatedProducts);
  };
  
  const deleteProduct = (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
  };
  
  // Category CRUD operations
  const getCategoryById = (id) => {
    return categories.find(category => category.id === id) || null;
  };
  
  const addCategory = (categoryData) => {
    const newCategory = {
      ...categoryData,
      id: `cat_${uuidv4()}`,
      createdAt: new Date().toISOString()
    };
    
    setCategories([...categories, newCategory]);
    return newCategory;
  };
  
  const updateCategory = (id, categoryData) => {
    const updatedCategories = categories.map(category => 
      category.id === id ? { ...category, ...categoryData, updatedAt: new Date().toISOString() } : category
    );
    
    setCategories(updatedCategories);
  };
  
  const deleteCategory = (id) => {
    const updatedCategories = categories.filter(category => category.id !== id);
    setCategories(updatedCategories);
  };
  
  // Order operations
  const getOrderById = (id) => {
    return orders.find(order => order.id === id) || null;
  };
  
  const updateOrderStatus = (id, status) => {
    const updatedOrders = orders.map(order => 
      order.id === id ? { ...order, status, updatedAt: new Date().toISOString() } : order
    );
    
    setOrders(updatedOrders);
  };
  
  // User operations
  const getUserById = (id) => {
    return users.find(user => user.id === id) || null;
  };
  
  const updateUserStatus = (id, isActive) => {
    const updatedUsers = users.map(user => 
      user.id === id ? { ...user, isActive, updatedAt: new Date().toISOString() } : user
    );
    
    setUsers(updatedUsers);
  };
  
  const updateUser = (id, userData) => {
    const updatedUsers = users.map(user => 
      user.id === id ? { ...user, ...userData, updatedAt: new Date().toISOString() } : user
    );
    
    setUsers(updatedUsers);
  };
  
  // Homepage settings operations
  const updateHomepageSettings = (settingsData) => {
    const updatedSettings = {
      ...homepageSettings,
      ...settingsData,
      updatedAt: new Date().toISOString()
    };
    
    setHomepageSettings(updatedSettings);
  };
  
  // Analytics data
  const getAnalyticsData = () => {
    // Calculate revenue
    const revenue = orders.reduce((total, order) => {
      const orderTotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return total + orderTotal + order.shipping + order.tax;
    }, 0);
    
    // Calculate total orders
    const totalOrders = orders.length;
    
    // Calculate average order value
    const averageOrderValue = totalOrders > 0 ? revenue / totalOrders : 0;
    
    // Calculate conversion rate (dummy data)
    const conversionRate = 3.2;
    
    // Calculate top selling products
    const productSales = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        if (productSales[item.id]) {
          productSales[item.id].quantity += item.quantity;
          productSales[item.id].revenue += item.price * item.quantity;
        } else {
          productSales[item.id] = {
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            revenue: item.price * item.quantity,
            image: item.image
          };
        }
      });
    });
    
    const topSellingProducts = Object.values(productSales)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);
    
    // Calculate revenue by category
    const categoryRevenue = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        const product = getProductById(item.id);
        if (product) {
          const categoryId = product.categoryId || product.category;
          const category = getCategoryById(categoryId);
          if (category) {
            const categoryName = category.name;
            if (categoryRevenue[categoryName]) {
              categoryRevenue[categoryName] += item.price * item.quantity;
            } else {
              categoryRevenue[categoryName] = item.price * item.quantity;
            }
          }
        }
      });
    });
    
    const revenueByCategory = Object.entries(categoryRevenue)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
    
    return {
      revenue,
      totalOrders,
      averageOrderValue,
      conversionRate,
      topSellingProducts,
      revenueByCategory
    };
  };
  
  // Generate sample data
  const generateSampleProducts = () => {
    return [
      {
        id: 'prod_1',
        name: 'Classic T-Shirt',
        description: 'A comfortable and versatile t-shirt for everyday wear.',
        price: 24.99,
        mainCategory: 'men',
        categoryId: 'cat_1',
        subcategoryId: 'sub_1',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'White', 'Gray'],
        stock: 100,
        images: ['/assets/products/tshirt1.jpg', '/assets/products/tshirt2.jpg'],
        featured: true,
        trending: true,
        onSale: false,
        discountPercentage: 0,
        createdAt: new Date().toISOString()
      },
      {
        id: 'prod_2',
        name: 'Slim Fit Jeans',
        description: 'Modern slim fit jeans with a comfortable stretch.',
        price: 59.99,
        mainCategory: 'men',
        categoryId: 'cat_2',
        subcategoryId: 'sub_3',
        sizes: ['30', '32', '34', '36'],
        colors: ['Blue', 'Black'],
        stock: 75,
        images: ['/assets/products/jeans1.jpg', '/assets/products/jeans2.jpg'],
        featured: false,
        trending: true,
        onSale: true,
        discountPercentage: 15,
        createdAt: new Date().toISOString()
      },
      {
        id: 'prod_3',
        name: 'Summer Dress',
        description: 'Light and flowy summer dress perfect for warm days.',
        price: 49.99,
        mainCategory: 'women',
        categoryId: 'cat_3',
        subcategoryId: 'sub_5',
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Red', 'Blue', 'Yellow'],
        stock: 50,
        images: ['/assets/products/dress1.jpg', '/assets/products/dress2.jpg'],
        featured: true,
        trending: false,
        onSale: false,
        discountPercentage: 0,
        createdAt: new Date().toISOString()
      }
    ];
  };
  
  const generateSampleCategories = () => {
    return [
      {
        id: 'cat_1',
        name: 'Tops',
        description: 'All types of tops including t-shirts, shirts, and blouses',
        mainCategory: 'men',
        image: '/assets/categories/tops.jpg',
        featured: true,
        displayOrder: 0,
        subcategories: [
          { id: 'sub_1', name: 'T-Shirts', displayOrder: 0 },
          { id: 'sub_2', name: 'Shirts', displayOrder: 1 }
        ],
        createdAt: new Date().toISOString()
      },
      {
        id: 'cat_2',
        name: 'Bottoms',
        description: 'All types of bottoms including pants, jeans, and shorts',
        mainCategory: 'men',
        image: '/assets/categories/bottoms.jpg',
        featured: true,
        displayOrder: 1,
        subcategories: [
          { id: 'sub_3', name: 'Jeans', displayOrder: 0 },
          { id: 'sub_4', name: 'Shorts', displayOrder: 1 }
        ],
        createdAt: new Date().toISOString()
      },
      {
        id: 'cat_3',
        name: 'Dresses',
        description: 'All types of dresses for various occasions',
        mainCategory: 'women',
        image: '/assets/categories/dresses.jpg',
        featured: true,
        displayOrder: 0,
        subcategories: [
          { id: 'sub_5', name: 'Casual Dresses', displayOrder: 0 },
          { id: 'sub_6', name: 'Formal Dresses', displayOrder: 1 }
        ],
        createdAt: new Date().toISOString()
      },
      {
        id: 'cat_4',
        name: 'T-Shirts',
        description: 'Comfortable t-shirts for kids of all ages',
        mainCategory: 'kids',
        image: '/assets/categories/kids-tshirts.jpg',
        featured: true,
        displayOrder: 0,
        subcategories: [
          { id: 'sub_7', name: 'Graphic Tees', displayOrder: 0 },
          { id: 'sub_8', name: 'Basic Tees', displayOrder: 1 }
        ],
        createdAt: new Date().toISOString()
      }
    ];
  };
  
  const generateSampleOrders = () => {
    return [
      {
        id: 'ord_1',
        customer: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '555-123-4567'
        },
        date: new Date().toISOString(),
        status: 'delivered',
        shippingAddress: {
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zip: '12345',
          country: 'USA'
        },
        items: [
          {
            id: 'prod_1',
            name: 'Classic T-Shirt',
            price: 24.99,
            quantity: 2,
            image: '/assets/products/tshirt1.jpg',
            variant: { color: 'Black', size: 'M' }
          }
        ],
        shipping: 5.99,
        tax: 4.50,
        createdAt: new Date().toISOString()
      },
      {
        id: 'ord_2',
        customer: {
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '555-987-6543'
        },
        date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        status: 'shipped',
        shippingAddress: {
          street: '456 Oak Ave',
          city: 'Somewhere',
          state: 'NY',
          zip: '67890',
          country: 'USA'
        },
        items: [
          {
            id: 'prod_2',
            name: 'Slim Fit Jeans',
            price: 59.99,
            quantity: 1,
            image: '/assets/products/jeans1.jpg',
            variant: { color: 'Blue', size: '32' }
          },
          {
            id: 'prod_3',
            name: 'Summer Dress',
            price: 49.99,
            quantity: 1,
            image: '/assets/products/dress1.jpg',
            variant: { color: 'Red', size: 'M' }
          }
        ],
        shipping: 5.99,
        tax: 8.80,
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 'ord_3',
        customer: {
          name: 'Bob Johnson',
          email: 'bob@example.com',
          phone: '555-555-5555'
        },
        date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        status: 'pending',
        shippingAddress: {
          street: '789 Pine Rd',
          city: 'Elsewhere',
          state: 'TX',
          zip: '54321',
          country: 'USA'
        },
        items: [
          {
            id: 'prod_3',
            name: 'Summer Dress',
            price: 49.99,
            quantity: 2,
            image: '/assets/products/dress1.jpg',
            variant: { color: 'Blue', size: 'S' }
          }
        ],
        shipping: 5.99,
        tax: 7.00,
        createdAt: new Date(Date.now() - 172800000).toISOString()
      }
    ];
  };
  
  const generateSampleUsers = () => {
    return [
      {
        id: 'user_1',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
        isActive: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 'user_2',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user',
        isActive: true,
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 'user_3',
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'user',
        isActive: true,
        createdAt: new Date(Date.now() - 172800000).toISOString()
      }
    ];
  };
  
  const generateSampleHomepageSettings = () => {
    return {
      heroTitle: 'Summer Collection',
      heroSubtitle: 'Discover our latest summer styles with up to 50% off',
      heroImage: '/assets/products/hero.jpg',
      featuredCategories: ['cat_1', 'cat_2', 'cat_3'],
      featuredProducts: ['prod_1', 'prod_2', 'prod_3'],
      promoTitle: 'New Arrivals',
      promoSubtitle: 'Check out our latest products just for you',
      promoImage: '/assets/products/promo.jpg',
      promoLink: '/shop/new-arrivals',
      testimonials: [
        {
          id: 'testimonial_1',
          name: 'Sarah Johnson',
          role: 'Regular Customer',
          comment: 'I love the quality of the clothes. They last forever and always look great!',
          image: '/assets/testimonials/person1.jpg'
        },
        {
          id: 'testimonial_2',
          name: 'Mike Thompson',
          role: 'Fashion Enthusiast',
          comment: 'The styles are always on trend and the prices are reasonable. My go-to shop!',
          image: '/assets/testimonials/person2.jpg'
        }
      ],
      createdAt: new Date().toISOString()
    };
  };
  
  // Get stats for dashboard
  const getStats = () => {
    // Total revenue
    const totalRevenue = orders.reduce((total, order) => {
      const orderTotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return total + orderTotal + order.shipping + order.tax;
    }, 0);
    
    // Orders by status
    const ordersByStatus = {
      pending: orders.filter(order => order.status === 'pending').length,
      processing: orders.filter(order => order.status === 'processing').length,
      shipped: orders.filter(order => order.status === 'shipped').length,
      delivered: orders.filter(order => order.status === 'delivered').length,
      cancelled: orders.filter(order => order.status === 'cancelled').length
    };
    
    // Recent orders (last 5)
    const recentOrders = [...orders]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
    
    // Total products
    const totalProducts = products.length;
    
    // Total categories
    const totalCategories = categories.length;
    
    // Total customers
    const totalCustomers = users.filter(user => user.role === 'customer').length;
    
    // Low stock products (less than 10)
    const lowStockProducts = products.filter(product => product.stock < 10).length;
    
    return {
      totalRevenue,
      ordersByStatus,
      recentOrders,
      totalProducts,
      totalCategories,
      totalCustomers,
      lowStockProducts
    };
  };
  
  // Context value
  const value = {
    products,
    categories,
    orders,
    users,
    homepageSettings,
    loading,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory,
    getOrderById,
    updateOrderStatus,
    getUserById,
    updateUserStatus,
    updateUser,
    updateHomepageSettings,
    getAnalyticsData,
    getStats
  };
  
  return (
    <AdminDataContext.Provider value={value}>
      {children}
    </AdminDataContext.Provider>
  );
};

export default AdminDataProvider; 