
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  ShieldCheck,
  Check,
  X,
  Star
} from 'lucide-react';
import { toast } from 'sonner';
import { isAdmin } from '@/utils/authUtils';

// Create a custom hook to check admin status
const useAdminCheck = () => {
  const navigate = useNavigate();
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkAdmin = () => {
      setIsLoading(true);
      const userString = localStorage.getItem('user');
      
      if (!userString) {
        setIsAdminUser(false);
        navigate('/login');
        setIsLoading(false);
        return;
      }
      
      try {
        const user = JSON.parse(userString);
        if (user?.role === 'admin') {
          setIsAdminUser(true);
        } else {
          setIsAdminUser(false);
          toast.error("Admin access required");
          navigate('/login');
        }
      } catch (error) {
        setIsAdminUser(false);
        navigate('/login');
      }
      
      setIsLoading(false);
    };
    
    checkAdmin();
  }, [navigate]);
  
  return { isAdminUser, isLoading };
};

const Admin = () => {
  const navigate = useNavigate();
  const { isAdminUser, isLoading } = useAdminCheck();
  
  // Blog state
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogCategory, setBlogCategory] = useState('');
  const [blogTags, setBlogTags] = useState('');
  const [editingBlogId, setEditingBlogId] = useState(null);
  
  // Reviews state
  const [replyContent, setReplyContent] = useState('');
  const [replyingReviewId, setReplyingReviewId] = useState(null);
  
  // Products state
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [editingProductId, setEditingProductId] = useState(null);

  // Form handlers
  const handleBlogSubmit = (e) => {
    e.preventDefault();
    toast.success(editingBlogId ? "Blog post updated!" : "New blog post created!");
    setBlogTitle('');
    setBlogContent('');
    setBlogCategory('');
    setBlogTags('');
    setEditingBlogId(null);
  };
  
  const handleReplySubmit = (e) => {
    e.preventDefault();
    toast.success("Reply submitted successfully!");
    setReplyContent('');
    setReplyingReviewId(null);
  };
  
  const handleProductSubmit = (e) => {
    e.preventDefault();
    toast.success(editingProductId ? "Product updated!" : "New product added!");
    setProductName('');
    setProductPrice('');
    setProductBrand('');
    setProductCategory('');
    setProductDescription('');
    setEditingProductId(null);
  };
  
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
  
  if (!isAdminUser) {
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
            
            {/* Blog Management */}
            <TabsContent value="blog" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>{editingBlogId ? 'Edit Blog Post' : 'Create New Blog Post'}</CardTitle>
                      <CardDescription>
                        {editingBlogId ? 'Update your blog post details' : 'Add a new blog post to your website'}
                      </CardDescription>
                    </div>
                    {editingBlogId && (
                      <Button variant="outline" onClick={() => setEditingBlogId(null)}>
                        Cancel Edit
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleBlogSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="blog-title" className="block text-sm font-medium">Blog Title</label>
                      <Input 
                        id="blog-title" 
                        value={blogTitle} 
                        onChange={(e) => setBlogTitle(e.target.value)} 
                        placeholder="Enter blog title"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="blog-category" className="block text-sm font-medium">Category</label>
                        <select 
                          id="blog-category" 
                          className="w-full border rounded-md px-3 py-2"
                          value={blogCategory}
                          onChange={(e) => setBlogCategory(e.target.value)}
                          required
                        >
                          <option value="">Select a category</option>
                          <option value="Color Selection">Color Selection</option>
                          <option value="Exterior Painting">Exterior Painting</option>
                          <option value="Interior Painting">Interior Painting</option>
                          <option value="Waterproofing">Waterproofing</option>
                          <option value="Maintenance">Maintenance</option>
                          <option value="Tips & Tricks">Tips & Tricks</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="blog-tags" className="block text-sm font-medium">Tags (comma separated)</label>
                        <Input 
                          id="blog-tags" 
                          value={blogTags} 
                          onChange={(e) => setBlogTags(e.target.value)} 
                          placeholder="painting, interior, modern, etc."
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="blog-content" className="block text-sm font-medium">Content</label>
                      <Textarea 
                        id="blog-content" 
                        value={blogContent} 
                        onChange={(e) => setBlogContent(e.target.value)} 
                        placeholder="Write your blog content here..."
                        className="min-h-[200px]"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="blog-image" className="block text-sm font-medium">Featured Image</label>
                      <Input id="blog-image" type="file" accept="image/*" />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit">
                        {editingBlogId ? 'Update Post' : 'Publish Post'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Manage Blog Posts</CardTitle>
                  <CardDescription>View, edit or delete existing blog posts</CardDescription>
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
                      <option>Waterproofing</option>
                      <option>Maintenance</option>
                      <option>Tips & Tricks</option>
                    </select>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>How to Choose the Perfect Paint Colors</TableCell>
                        <TableCell>Color Selection</TableCell>
                        <TableCell>May 10, 2023</TableCell>
                        <TableCell><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Published</span></TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" onClick={() => {
                              setEditingBlogId(1);
                              setBlogTitle("How to Choose the Perfect Paint Colors");
                              setBlogCategory("Color Selection");
                              setBlogContent("Lorem ipsum dolor sit amet...");
                              setBlogTags("colors, selection, interior");
                            }}>
                              <Edit size={16} />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-500" onClick={() => toast.success("Post deleted!")}>
                              <Trash size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2023 Color Trends</TableCell>
                        <TableCell>Color Trends</TableCell>
                        <TableCell>March 30, 2023</TableCell>
                        <TableCell><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Published</span></TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit size={16} />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-500">
                              <Trash size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Waterproofing Techniques for Modern Homes</TableCell>
                        <TableCell>Waterproofing</TableCell>
                        <TableCell>June 5, 2023</TableCell>
                        <TableCell><span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Draft</span></TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit size={16} />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-500">
                              <Trash size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
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
            
            {/* Gallery Management */}
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
            
            {/* Products Management */}
            <TabsContent value="products" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>{editingProductId ? 'Edit Product' : 'Add New Product'}</CardTitle>
                      <CardDescription>
                        {editingProductId ? 'Update product information' : 'Add a new paint product to your catalog'}
                      </CardDescription>
                    </div>
                    {editingProductId && (
                      <Button variant="outline" onClick={() => setEditingProductId(null)}>
                        Cancel Edit
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProductSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="product-name" className="block text-sm font-medium">Product Name</label>
                        <Input 
                          id="product-name" 
                          value={productName} 
                          onChange={(e) => setProductName(e.target.value)} 
                          placeholder="Premium Interior Paint"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="product-brand" className="block text-sm font-medium">Brand</label>
                        <Input 
                          id="product-brand" 
                          value={productBrand} 
                          onChange={(e) => setProductBrand(e.target.value)} 
                          placeholder="Premium Paints"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="product-price" className="block text-sm font-medium">Price ($)</label>
                        <Input 
                          id="product-price" 
                          type="number" 
                          step="0.01" 
                          value={productPrice} 
                          onChange={(e) => setProductPrice(e.target.value)} 
                          placeholder="45.99"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="product-category" className="block text-sm font-medium">Category</label>
                        <select 
                          id="product-category" 
                          className="w-full border rounded-md px-3 py-2"
                          value={productCategory}
                          onChange={(e) => setProductCategory(e.target.value)}
                          required
                        >
                          <option value="">Select a category</option>
                          <option value="Interior">Interior</option>
                          <option value="Exterior">Exterior</option>
                          <option value="Waterproofing">Waterproofing</option>
                          <option value="Specialty">Specialty</option>
                          <option value="Primers">Primers</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="product-status" className="block text-sm font-medium">Status</label>
                        <select className="w-full border rounded-md px-3 py-2">
                          <option value="In Stock">In Stock</option>
                          <option value="Low Stock">Low Stock</option>
                          <option value="Out of Stock">Out of Stock</option>
                          <option value="Hidden">Hidden</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="product-description" className="block text-sm font-medium">Description</label>
                      <Textarea 
                        id="product-description" 
                        value={productDescription} 
                        onChange={(e) => setProductDescription(e.target.value)} 
                        placeholder="High-quality interior paint with excellent coverage and durability..."
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="product-features" className="block text-sm font-medium">Features (one per line)</label>
                      <Textarea 
                        placeholder="Low VOC
Excellent coverage
5-year warranty
Washable finish"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="product-image" className="block text-sm font-medium">Product Image</label>
                      <Input id="product-image" type="file" accept="image/*" />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit">
                        {editingProductId ? 'Update Product' : 'Add Product'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Product Management</CardTitle>
                  <CardDescription>Manage paint products, prices, and inventory</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gray-200 rounded"></div>
                            <div>Premium Interior Paint</div>
                          </TableCell>
                          <TableCell>Interior</TableCell>
                          <TableCell>$45.99</TableCell>
                          <TableCell><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">In Stock</span></TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" onClick={() => {
                                setEditingProductId(1);
                                setProductName("Premium Interior Paint");
                                setProductBrand("Premium Paints");
                                setProductPrice("45.99");
                                setProductCategory("Interior");
                                setProductDescription("High-quality interior paint...");
                              }}>
                                <Edit size={16} />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-red-500" onClick={() => toast.success("Product deleted")}>
                                <Trash size={16} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gray-200 rounded"></div>
                            <div>Weather Shield Exterior Paint</div>
                          </TableCell>
                          <TableCell>Exterior</TableCell>
                          <TableCell>$52.99</TableCell>
                          <TableCell><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">In Stock</span></TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit size={16} />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-red-500">
                                <Trash size={16} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gray-200 rounded"></div>
                            <div>Waterproofing Sealer</div>
                          </TableCell>
                          <TableCell>Waterproofing</TableCell>
                          <TableCell>$79.99</TableCell>
                          <TableCell><span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Low Stock</span></TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit size={16} />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-red-500">
                                <Trash size={16} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="text-sm text-paint-gray">Showing 3 of 12 products</div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Reviews Management */}
            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Review Management</CardTitle>
                  <CardDescription>Moderate and respond to customer reviews</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="pending">
                    <TabsList className="mb-4">
                      <TabsTrigger value="pending">Pending</TabsTrigger>
                      <TabsTrigger value="approved">Approved</TabsTrigger>
                      <TabsTrigger value="featured">Featured</TabsTrigger>
                      <TabsTrigger value="rejected">Rejected</TabsTrigger>
                    </TabsList>
                    
                    <div className="space-y-6">
                      {/* Review Card */}
                      <div className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">John Doe</h3>
                            <div className="flex items-center">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={16}
                                    className={i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                                  />
                                ))}
                              </div>
                              <span className="text-sm ml-2 text-gray-500">4.0</span>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">May 15, 2023</div>
                        </div>
                        
                        <p className="text-gray-700">
                          The team did an excellent job on our exterior painting. They were professional, 
                          on time, and the quality of their work exceeded our expectations. Would definitely recommend!
                        </p>
                        
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline" className="text-green-600" onClick={() => toast.success("Review approved!")}>
                            <Check size={16} className="mr-1" /> Approve
                          </Button>
                          <Button size="sm" variant="outline" className="text-yellow-600" onClick={() => toast.success("Review featured!")}>
                            <Star size={16} className="mr-1" /> Feature
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600" onClick={() => toast.success("Review rejected!")}>
                            <X size={16} className="mr-1" /> Reject
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => setReplyingReviewId(replyingReviewId === 1 ? null : 1)}
                          >
                            Reply
                          </Button>
                        </div>
                        
                        {/* Reply Form */}
                        {replyingReviewId === 1 && (
                          <form onSubmit={handleReplySubmit} className="mt-3 border-t pt-3">
                            <h4 className="text-sm font-medium mb-2">Your Reply</h4>
                            <Textarea 
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                              placeholder="Thank you for your feedback..."
                              className="mb-2"
                            />
                            <div className="flex justify-end gap-2">
                              <Button 
                                type="button" 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setReplyingReviewId(null)}
                              >
                                Cancel
                              </Button>
                              <Button type="submit" size="sm">Submit Reply</Button>
                            </div>
                          </form>
                        )}
                      </div>
                      
                      {/* Another Review */}
                      <div className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">Jane Smith</h3>
                            <div className="flex items-center">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={16}
                                    className={i < 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                                  />
                                ))}
                              </div>
                              <span className="text-sm ml-2 text-gray-500">5.0</span>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">June 2, 2023</div>
                        </div>
                        
                        <p className="text-gray-700">
                          Amazing attention to detail! The interior painting completely transformed our living room. 
                          The color consultation was incredibly helpful in choosing the perfect shade.
                        </p>
                        
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline" className="text-green-600">
                            <Check size={16} className="mr-1" /> Approve
                          </Button>
                          <Button size="sm" variant="outline" className="text-yellow-600">
                            <Star size={16} className="mr-1" /> Feature
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600">
                            <X size={16} className="mr-1" /> Reject
                          </Button>
                          <Button size="sm" variant="outline">Reply</Button>
                        </div>
                      </div>
                    </div>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-paint-gray">Showing 2 of 8 reviews</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Bookings Management */}
            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Management</CardTitle>
                  <CardDescription>View and manage service bookings</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Client</TableHead>
                        <TableHead>Service Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Mark Johnson</TableCell>
                        <TableCell>Interior Painting</TableCell>
                        <TableCell>June 15, 2023</TableCell>
                        <TableCell><span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Scheduled</span></TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Details</Button>
                            <Button variant="outline" size="sm">Update</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Susan Miller</TableCell>
                        <TableCell>Exterior Painting</TableCell>
                        <TableCell>June 22, 2023</TableCell>
                        <TableCell><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Confirmed</span></TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Details</Button>
                            <Button variant="outline" size="sm">Update</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>David Wilson</TableCell>
                        <TableCell>Color Consultation</TableCell>
                        <TableCell>June 10, 2023</TableCell>
                        <TableCell><span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Completed</span></TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Details</Button>
                            <Button variant="outline" size="sm">Invoice</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-paint-gray">Showing 3 of 10 bookings</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* User Management */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage user accounts and permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Admin User</TableCell>
                        <TableCell>tejasnikam4515@gmail.com</TableCell>
                        <TableCell><span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Admin</span></TableCell>
                        <TableCell>March 1, 2023</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>John Smith</TableCell>
                        <TableCell>john@example.com</TableCell>
                        <TableCell><span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">User</span></TableCell>
                        <TableCell>April 15, 2023</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm" className="text-red-500">Disable</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Mary Johnson</TableCell>
                        <TableCell>mary@example.com</TableCell>
                        <TableCell><span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">User</span></TableCell>
                        <TableCell>May 3, 2023</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm" className="text-red-500">Disable</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Settings */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Site Settings</CardTitle>
                  <CardDescription>Configure general website settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Company Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label htmlFor="company-name" className="text-sm">Company Name</label>
                        <Input id="company-name" defaultValue="Premium Painting Services" />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="company-phone" className="text-sm">Phone Number</label>
                        <Input id="company-phone" defaultValue="(555) 123-4567" />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="company-email" className="text-sm">Email Address</label>
                        <Input id="company-email" defaultValue="contact@premiumpainting.com" />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="company-address" className="text-sm">Address</label>
                        <Input id="company-address" defaultValue="123 Paint Street, Color Town" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Social Media Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label htmlFor="facebook" className="text-sm">Facebook</label>
                        <Input id="facebook" defaultValue="https://facebook.com/premiumpainting" />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="instagram" className="text-sm">Instagram</label>
                        <Input id="instagram" defaultValue="https://instagram.com/premiumpainting" />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="twitter" className="text-sm">Twitter/X</label>
                        <Input id="twitter" defaultValue="https://x.com/premiumpainting" />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="pinterest" className="text-sm">Pinterest</label>
                        <Input id="pinterest" defaultValue="https://pinterest.com/premiumpainting" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Business Hours</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label htmlFor="weekday-hours" className="text-sm">Weekdays</label>
                        <Input id="weekday-hours" defaultValue="8:00 AM - 6:00 PM" />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="weekend-hours" className="text-sm">Weekends</label>
                        <Input id="weekend-hours" defaultValue="9:00 AM - 4:00 PM" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={() => toast.success("Settings updated successfully!")}>Save Settings</Button>
                  </div>
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
