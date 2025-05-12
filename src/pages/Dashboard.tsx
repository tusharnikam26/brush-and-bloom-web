
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Image, Calendar, Clock, MapPin, LogOut, User, Palette } from 'lucide-react';

interface User {
  name: string;
  email: string;
  isLoggedIn: boolean;
}

interface ColorCombination {
  name: string;
  color: string;
  imageUrl: string;
}

interface Booking {
  id: string;
  service: string;
  date: string;
  time: string;
  address: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [savedCombinations, setSavedCombinations] = useState<ColorCombination[]>([]);
  
  // Mock bookings data (in a real app, this would come from a backend)
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      service: 'Interior Painting - Living Room',
      date: '2025-06-18',
      time: '09:00 AM - 12:00 PM',
      address: '123 Main St, Anytown, USA',
      status: 'confirmed'
    },
    {
      id: '2',
      service: 'Color Consultation',
      date: '2025-06-10',
      time: '02:00 PM - 03:00 PM',
      address: '123 Main St, Anytown, USA',
      status: 'pending'
    }
  ]);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Redirect to login if not logged in
      navigate('/login');
    }
    
    // Load saved color combinations
    const storedCombinations = localStorage.getItem('savedColorCombinations');
    if (storedCombinations) {
      setSavedCombinations(JSON.parse(storedCombinations));
    }
    
    setIsLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="pt-32 pb-16">
          <div className="container mx-auto px-4 text-center">
            <p>Loading...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-paint-blue">Welcome, {user?.name}</h1>
              <p className="text-paint-gray mt-2">{user?.email}</p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut size={16} />
              Sign Out
            </Button>
          </div>
          
          <Tabs defaultValue="bookings">
            <TabsList className="mb-8">
              <TabsTrigger value="bookings" className="flex items-center gap-2">
                <Calendar size={16} />
                My Bookings
              </TabsTrigger>
              <TabsTrigger value="colors" className="flex items-center gap-2">
                <Palette size={16} />
                Saved Colors
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User size={16} />
                Profile
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="bookings">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Upcoming Appointments</CardTitle>
                    <CardDescription>
                      View and manage your scheduled painting services
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {bookings.length > 0 ? (
                      <div className="space-y-4">
                        {bookings.map((booking) => (
                          <div 
                            key={booking.id}
                            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                              <div>
                                <h3 className="font-semibold text-lg">{booking.service}</h3>
                                <div className="mt-2 space-y-1 text-paint-gray">
                                  <div className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    <span>{new Date(booking.date).toLocaleDateString('en-US', { 
                                      weekday: 'long', 
                                      year: 'numeric', 
                                      month: 'long', 
                                      day: 'numeric' 
                                    })}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock size={16} />
                                    <span>{booking.time}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <MapPin size={16} />
                                    <span>{booking.address}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                                  booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                  booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </span>
                                <div className="space-x-2">
                                  <Button variant="outline" size="sm">Reschedule</Button>
                                  <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-paint-gray">You don't have any upcoming appointments.</p>
                        <Button className="mt-4" asChild>
                          <a href="/services">Book a Service</a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <div className="text-right">
                  <Button asChild>
                    <a href="/services">Schedule New Service</a>
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="colors">
              <Card>
                <CardHeader>
                  <CardTitle>Your Saved Color Combinations</CardTitle>
                  <CardDescription>
                    View and manage your saved color preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {savedCombinations.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {savedCombinations.map((combo, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border">
                          <div className="h-48 bg-gray-100 relative">
                            <img 
                              src={combo.imageUrl} 
                              alt={combo.name} 
                              className="w-full h-full object-cover"
                            />
                            <div 
                              className="absolute inset-0"
                              style={{
                                backgroundColor: combo.color,
                                opacity: 0.7,
                              }}
                            ></div>
                          </div>
                          <div className="p-4">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{combo.name}</p>
                              <div 
                                className="w-6 h-6 rounded-full border border-gray-300" 
                                style={{backgroundColor: combo.color}}
                              ></div>
                            </div>
                            <div className="flex justify-between mt-4">
                              <Button variant="outline" size="sm">
                                Share
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-500">
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-paint-gray">You haven't saved any color combinations yet.</p>
                      <Button className="mt-4" asChild>
                        <a href="/color-preview">Try Our Color Preview Tool</a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <div className="mt-6 text-right">
                <Button asChild>
                  <a href="/color-preview">Try More Color Combinations</a>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Manage your account details and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md"
                          value={user?.name}
                          readOnly
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email Address</label>
                        <input
                          type="email"
                          className="w-full p-2 border rounded-md"
                          value={user?.email}
                          readOnly
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Phone Number</label>
                        <input
                          type="tel"
                          className="w-full p-2 border rounded-md"
                          placeholder="Add your phone number"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Default Address</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md"
                          placeholder="Add your address"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button type="button">
                        Update Profile
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
              
              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage your password and account security
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline">
                      Change Password
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
