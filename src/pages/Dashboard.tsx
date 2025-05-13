import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Calendar, User, ClipboardCheck, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { logout } from '@/utils/authUtils';

// Create custom icons if needed
const ColorSwatchIcon = User; // Placeholder until we have proper icons

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading, isLoggedIn, isAdmin } = useAuth();

  useEffect(() => {
    // If user is not logged in, redirect to login
    if (!loading && !isLoggedIn) {
      toast.error("You need to be logged in to access this page");
      navigate('/login');
      return;
    }

    // If user is admin, redirect to admin dashboard
    if (!loading && isAdmin) {
      navigate('/admin');
      return;
    }
  }, [loading, isLoggedIn, isAdmin, navigate]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-32 pb-16 min-h-screen">
          <div className="container mx-auto px-4 flex justify-center">
            <div className="text-center">
              <p className="text-xl">Loading...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-paint-blue">User Dashboard</h1>
            <p className="text-paint-gray mt-2">Welcome back, {user?.name}!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Bookings Card */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-paint-blue" />
                  <span>My Bookings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-paint-gray">
                  <p>View and manage your painting service appointments</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => navigate('/book-service')}>
                  View Bookings
                </Button>
              </CardFooter>
            </Card>

            {/* Saved Colors Card */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <ColorSwatchIcon className="h-5 w-5 text-paint-blue" />
                  <span>My Colors</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-paint-gray">
                  <p>Access your saved color schemes and preferences</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => navigate('/color-preview')}>
                  View Saved Colors
                </Button>
              </CardFooter>
            </Card>

            {/* Reviews Card */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <ClipboardCheck className="h-5 w-5 text-paint-blue" />
                  <span>My Reviews</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-paint-gray">
                  <p>Manage your reviews and ratings for our services</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => navigate('/testimonials')}>
                  View Reviews
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="flex justify-center mt-10">
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
