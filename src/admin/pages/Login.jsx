import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context';
import { FaLock, FaEnvelope, FaUser } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const { login, register, currentUser, error, setError } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/admin/dashboard');
    }
    // Clear any previous errors
    setError('');
  }, [currentUser, navigate, setError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isRegistering) {
        // Register new admin user
        await register(email, password, name);
        navigate('/admin/dashboard');
      } else {
        // Login existing user
        await login(email, password);
        navigate('/admin/dashboard');
      }
    } catch (error) {
      console.error(isRegistering ? 'Registration failed:' : 'Login failed:', error);
      // Error is set in the auth context
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">
            {isRegistering ? 'Create an admin account' : 'Sign in to manage your store'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>
          )}

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                placeholder="admin@example.com"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                placeholder={isRegistering ? 'Choose a secure password' : '••••••••'}
                required
                minLength={6}
              />
              {isRegistering && (
                <p className="mt-1 text-xs text-gray-500">Password must be at least 6 characters</p>
              )}
            </div>
          </div>

          {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="mb-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent text-white py-2 px-4 rounded-md font-medium hover:bg-accent/90 transition-colors disabled:bg-gray-400"
            >
              {isLoading 
                ? (isRegistering ? 'Creating Account...' : 'Signing in...') 
                : (isRegistering ? 'Create Admin Account' : 'Sign In')}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={toggleMode}
              className="text-accent hover:text-accent/80 text-sm font-medium"
            >
              {isRegistering 
                ? 'Already have an account? Sign in' 
                : 'First time setup? Create admin account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 