
/**
 * Authentication utility functions
 */

// User types
export interface User {
  email: string;
  name: string;
  isLoggedIn: boolean;
  role: 'user' | 'admin';
}

// Admin credentials - in a real app, these would be securely stored on the server
const ADMIN_EMAIL = 'tejasnikam4515@gmail.com';
const ADMIN_PASSWORD = 'admin@2025';

/**
 * Get the current user from localStorage
 */
export const getCurrentUser = (): User | null => {
  try {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    return JSON.parse(userStr) as User;
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
    return null;
  }
};

/**
 * Check if a user is logged in
 */
export const isLoggedIn = (): boolean => {
  const user = getCurrentUser();
  return !!user?.isLoggedIn;
};

/**
 * Check if the current user is an admin
 */
export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  return !!user?.isLoggedIn && user.role === 'admin';
};

/**
 * Log out the current user
 */
export const logout = (): void => {
  localStorage.removeItem('user');
  window.location.href = '/login';
};

/**
 * Login function to handle both regular and admin authentication
 */
export const login = (email: string, password: string): User | null => {
  // Check if the credentials match admin credentials
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const adminUser: User = {
      email,
      name: 'Admin User',
      isLoggedIn: true,
      role: 'admin'
    };
    
    // Store admin user in localStorage
    localStorage.setItem('user', JSON.stringify(adminUser));
    return adminUser;
  }
  
  // Handle regular user login (mock implementation)
  // In a real app, this would validate against a database
  if (email && password) {
    const regularUser: User = {
      email,
      name: email.split('@')[0],
      isLoggedIn: true,
      role: 'user'
    };
    
    // Store regular user in localStorage
    localStorage.setItem('user', JSON.stringify(regularUser));
    return regularUser;
  }
  
  // Return null if login fails
  return null;
};
