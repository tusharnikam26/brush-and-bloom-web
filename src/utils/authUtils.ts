
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
