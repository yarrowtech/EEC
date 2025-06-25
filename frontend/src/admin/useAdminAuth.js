import { useState, useEffect } from 'react';

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check
    const checkAuth = () => {
      // In real app, check token/session
      const mockAdmin = {
        name: 'Admin',
        role: 'Administrator',
        avatar: '👨‍💼',
        permissions: ['read', 'write', 'delete']
      };
      
      setAdminUser(mockAdmin);
      setIsAuthenticated(true);
      setLoading(false);
    };

    checkAuth();
  }, []);

  const logout = () => {
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  return {
    isAuthenticated,
    adminUser,
    loading,
    logout
  };
};