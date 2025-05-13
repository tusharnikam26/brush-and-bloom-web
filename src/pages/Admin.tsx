
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Book, 
  Image as ImageIcon, 
  MessageSquare, 
  Settings, 
  ShoppingBag, 
  Calendar, 
  Users, 
  Plus, 
  Edit, 
  Trash, 
  Search,
  ShieldCheck
} from 'lucide-react';
import { toast } from 'sonner';

// Create a custom hook to check admin status
const useAdminCheck = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkAdmin = () => {
      setIsLoading(true);
      const userString = localStorage.getItem('user');
      
      if (!userString) {
        setIsAdmin(false);
        navigate('/login');
        setIsLoading(false);
        return;
      }
      
      try {
        const user = JSON.parse(userString);
        if (user?.role === 'admin') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          toast.error("Admin access required");
          navigate('/login');
        }
      } catch (error) {
        setIsAdmin(false);
        navigate('/login');
      }
      
      setIsLoading(false);
    };
    
    checkAdmin();
  }, [navigate]);
  
  return { isAdmin, isLoading };
};

const Admin = () => {
  const navigate = useNavigate();
  const { isAdmin, isLoading } = useAdminCheck();
  
  if (isLoading) {
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
  
  if (!isAdmin) {
    return (
      <>
        <Navbar />
        <main className="pt-32 pb-16 min-h-screen">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-paint-blue mb-6">Access Denied</h1>
              <p className="text-xl mb-6">You do not have permission to access the admin area.</p>
              <Button asChild>
                <a href="/login">Login as Administrator</a>
              </Button>
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
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <ShieldCheck className="h-8 w-8 text-paint-blue mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-paint-blue">Admin Dashboard</h1>
              <p className="text-paint-gray">Manage your website content, services, and customer interactions</p>
            </div>
          </div>
          
          <Tabs defaultValue="blog" className="space-y-6">
            <TabsList className="grid grid-cols-3 md:grid-cols-7">
              <TabsTrigger value="blog">
                <Book className="mr-2 h-4 w-4" /> Blog
              </TabsTrigger>
              <TabsTrigger value="gallery">
                <ImageIcon className="mr-2 h-4 w-4" /> Gallery
              </TabsTrigger>
              <TabsTrigger value="products">
                <ShoppingBag className="mr-2 h-4 w-4" /> Products
              </TabsTrigger>
              <TabsTrigger value="bookings">
                <Calendar className="mr-2 h-4 w-4" /> Bookings
              </TabsTrigger>
              <TabsTrigger value="reviews">
                <MessageSquare className="mr-2 h-4 w-4" /> Reviews
              </TabsTrigger>
              <TabsTrigger value="users">
                <Users className="mr-2 h-4 w-4" /> Users
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="mr-2 h-4 w-4" /> Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="blog" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Blog Management</CardTitle>
                      <CardDescription>Create, edit, and manage blog posts</CardDescription>
                    </div>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" /> New Post
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 flex gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input placeholder="Search posts..." className="pl-10" />
                    </div>
                    <select className="border rounded-md px-4 py-2">
                      <option>All Categories</option>
                      <option>Color Selection</option>
                      <option>Exterior Painting</option>
                      <option>Interior Painting</option>
                    </select>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left">Title</th>
                          <th className="px-4 py-2 text-left">Category</th>
                          <th className="px-4 py-2 text-left">Date</th>
                          <th className="px-4 py-2 text-left">Status</th>
                          <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="px-4 py-3">How to Choose the Perfect Paint Colors</td>
                          <td className="px-4 py-3">Color Selection</td>
                          <td className="px-4 py-3">May 10, 2023</td>
                          <td className="px-4 py-3"><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Published</span></td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit size={16} />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-red-500">
                                <Trash size={16} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3">2023 Color Trends</td>
                          <td className="px-4 py-3">Color Trends</td>
                          <td className="px-4 py-3">March 30, 2023</td>
                          <td className="px-4 py-3"><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Published</span></td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit size={16} />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-red-500">
                                <Trash size={16} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3">Waterproofing Techniques for Modern Homes</td>
                          <td className="px-4 py-3">Waterproofing</td>
                          <td className="px-4 py-3">June 5, 2023</td>
                          <td className="px-4 py-3"><span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Draft</span></td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit size={16} />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-red-500">
                                <Trash size={16} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-paint-gray">Showing 3 of 15 posts</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="gallery" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Gallery Management</CardTitle>
                      <CardDescription>Manage project images and before/after comparisons</CardDescription>
                    </div>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" /> Add Images
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <Tabs defaultValue="all">
                      <TabsList>
                        <TabsTrigger value="all">All Images</TabsTrigger>
                        <TabsTrigger value="interior">Interior</TabsTrigger>
                        <TabsTrigger value="exterior">Exterior</TabsTrigger>
                        <TabsTrigger value="commercial">Commercial</TabsTrigger>
                        <TabsTrigger value="before-after">Before/After</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="relative group">
                        <img 
                          src="/placeholder.svg" 
                          alt={`Gallery image ${i+1}`}
                          className="w-full h-40 object-cover rounded-md"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded-md">
                          <Button size="sm" variant="outline" className="text-white border-white">
                            <Edit size={14} />
                          </Button>
                          <Button size="sm" variant="outline" className="text-white border-white">
                            <Trash size={14} />
                          </Button>
                        </div>
                        <div className="mt-1 text-xs text-paint-gray">Interior Project</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline">Load More</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="products" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Product Management</CardTitle>
                      <CardDescription>Manage paint products, prices, and inventory</CardDescription>
                    </div>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" /> Add Product
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left">Product</th>
                          <th className="px-4 py-2 text-left">Category</th>
                          <th className="px-4 py-2 text-left">Price</th>
                          <th className="px-4 py-2 text-left">Status</th>
                          <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="px-4 py-3 flex items-center gap-2">
                            <div className="w-10 h-10 bg-gray-200 rounded"></div>
                            <div>Premium Interior Paint</div>
                          </td>
                          <td className="px-4 py-3">Interior</td>
                          <td className="px-4 py-3">$45.99</td>
                          <td className="px-4 py-3"><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">In Stock</span></td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit size={16} />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-red-500">
                                <Trash size={16} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 flex items-center gap-2">
                            <div className="w-10 h-10 bg-gray-200 rounded"></div>
                            <div>Weather Shield Exterior Paint</div>
                          </td>
                          <td className="px-4 py-3">Exterior</td>
                          <td className="px-4 py-3">$52.99</td>
                          <td className="px-4 py-3"><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">In Stock</span></td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit size={16} />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-red-500">
                                <Trash size={16} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 flex items-center gap-2">
                            <div className="w-10 h-10 bg-gray-200 rounded"></div>
                            <div>Waterproofing Sealer</div>
                          </td>
                          <td className="px-4 py-3">Waterproofing</td>
                          <td className="px-4 py-3">$79.99</td>
                          <td className="px-4 py-3"><span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Low Stock</span></td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit size={16} />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-red-500">
                                <Trash size={16} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="text-sm text-paint-gray">Showing 3 of 12 products</div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Placeholder content for other tabs */}
            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Management</CardTitle>
                  <CardDescription>View and manage service bookings</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Booking management content would appear here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Review Management</CardTitle>
                  <CardDescription>Moderate and respond to customer reviews</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Review management content would appear here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage user accounts and permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>User management content would appear here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Site Settings</CardTitle>
                  <CardDescription>Configure general website settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Settings content would appear here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Admin;
