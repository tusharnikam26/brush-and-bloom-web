
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { User, isAdmin, isLoggedIn, getCurrentUser } from '@/utils/authUtils';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      setLoading(true);
      const currentUser = getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };

    checkAuth();
  }, []);

  const checkAdminAccess = (redirectTo: string = '/login') => {
    if (!isLoggedIn()) {
      toast.error("You need to login first");
      navigate(redirectTo);
      return false;
    }
    
    if (!isAdmin()) {
      toast.error("Admin access required");
      navigate(redirectTo);
      return false;
    }
    
    return true;
  };

  // Specifically navigate users to the correct dashboard based on role
  const navigateToDashboard = () => {
    if (isAdmin()) {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  return { 
    user, 
    loading, 
    isLoggedIn: isLoggedIn(),
    isAdmin: isAdmin(),
    checkAdminAccess,
    navigateToDashboard
  };
}
