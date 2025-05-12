
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Star, Upload, Image as ImageIcon, Camera, ThumbsUp, MessageSquare, Users } from 'lucide-react';
import { toast } from 'sonner';

// Mock data for testimonials
const testimonials = [
  {
    id: 1,
    name: 'Jennifer R.',
    location: 'San Francisco, CA',
    rating: 5,
    date: 'April 15, 2023',
    comment: "I can't express how happy we are with the exterior painting job. The team was professional, punctual, and paid incredible attention to detail. Our house looks brand new!",
    projectType: 'Exterior Painting',
    likes: 24,
    images: ['/placeholder.svg', '/placeholder.svg'],
    verified: true
  },
  {
    id: 2,
    name: 'Michael T.',
    location: 'Portland, OR',
    rating: 4,
    date: 'March 22, 2023',
    comment: "The interior painting was done with exceptional care. They helped us choose the perfect color palette for our open concept living space, and the execution was flawless.",
    projectType: 'Interior Painting',
    likes: 18,
    images: ['/placeholder.svg'],
    verified: true
  },
  {
    id: 3,
    name: 'Sarah K.',
    location: 'Austin, TX',
    rating: 5,
    date: 'May 3, 2023',
    comment: "We hired them for a complete home repaint before selling, and it made a HUGE difference in our home's value. The realtor was amazed at the transformation. Worth every penny!",
    projectType: 'Full House Painting',
    likes: 32,
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    verified: true
  },
  {
    id: 4,
    name: 'David L.',
    location: 'Chicago, IL',
    rating: 5,
    date: 'February 18, 2023',
    comment: "The waterproofing work they did on our basement was incredibly thorough. We had issues with moisture for years, and after their treatment, it's completely dry even during heavy rains.",
    projectType: 'Waterproofing',
    likes: 15,
    images: [],
    verified: true
  },
  {
    id: 5,
    name: 'Emily J.',
    location: 'Denver, CO',
    rating: 4,
    date: 'April 5, 2023',
    comment: "They transformed our commercial space with minimal disruption to our business operations. The team worked after hours and weekends to accommodate our schedule. Highly recommend!",
    projectType: 'Commercial Painting',
    likes: 21,
    images: ['/placeholder.svg'],
    verified: true
  }
];

const Testimonials = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: '',
    projectType: '',
    images: [] as File[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredTestimonials = testimonials.filter(testimonial => {
    if (activeTab === 'all') return true;
    if (activeTab === 'interior' && testimonial.projectType.toLowerCase().includes('interior')) return true;
    if (activeTab === 'exterior' && testimonial.projectType.toLowerCase().includes('exterior')) return true;
    if (activeTab === 'commercial' && testimonial.projectType.toLowerCase().includes('commercial')) return true;
    if (activeTab === 'with-images' && testimonial.images.length > 0) return true;
    return false;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating: number) => {
    setReviewForm(prev => ({ ...prev, rating }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setReviewForm(prev => ({ ...prev, images: [...prev.images, ...filesArray] }));
    }
  };

  const handleRemoveImage = (index: number) => {
    setReviewForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!reviewForm.name || !reviewForm.email || !reviewForm.comment || !reviewForm.projectType) {
      toast.error("Please fill all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, this would submit to a backend
    setTimeout(() => {
      setIsSubmitting(false);
      setIsDialogOpen(false);
      toast.success("Thank you for your review! It will appear after moderation.");
      setReviewForm({
        name: '',
        email: '',
        rating: 5,
        comment: '',
        projectType: '',
        images: []
      });
    }, 1500);
  };

  const handleLike = (id: number) => {
    toast("Thanks for your feedback!");
  };

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-paint-blue mb-6">Customer Testimonials</h1>
            <p className="text-lg text-paint-gray max-w-2xl mx-auto">
              Read what our customers are saying about their experiences with our painting services.
              We pride ourselves on quality work and customer satisfaction.
            </p>
          </div>
          
          <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList className="grid grid-cols-2 md:grid-cols-5">
                <TabsTrigger value="all">All Reviews</TabsTrigger>
                <TabsTrigger value="interior">Interior</TabsTrigger>
                <TabsTrigger value="exterior">Exterior</TabsTrigger>
                <TabsTrigger value="commercial">Commercial</TabsTrigger>
                <TabsTrigger value="with-images">With Photos</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>Share Your Experience</Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Submit Your Review</DialogTitle>
                  <DialogDescription>
                    Share your experience with our services and help others make informed decisions.
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input 
                        id="name" 
                        name="name"
                        placeholder="John Doe"
                        value={reviewForm.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email"
                        placeholder="johndoe@example.com"
                        value={reviewForm.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Your Rating</Label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingChange(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            size={24}
                            className={star <= reviewForm.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="projectType">Project Type</Label>
                    <select
                      id="projectType"
                      name="projectType"
                      className="w-full p-2 border rounded-md"
                      value={reviewForm.projectType}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, projectType: e.target.value }))}
                      required
                    >
                      <option value="">Select a project type</option>
                      <option value="Interior Painting">Interior Painting</option>
                      <option value="Exterior Painting">Exterior Painting</option>
                      <option value="Commercial Painting">Commercial Painting</option>
                      <option value="Residential Painting">Residential Painting</option>
                      <option value="Waterproofing">Waterproofing</option>
                      <option value="Stencil & Texture">Stencil & Texture</option>
                      <option value="Color Consultation">Color Consultation</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="comment">Your Review</Label>
                    <Textarea 
                      id="comment" 
                      name="comment"
                      placeholder="Share details about your experience with our service..."
                      value={reviewForm.comment}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label>Add Photos (Optional)</Label>
                    <div className="flex gap-2">
                      <Button 
                        type="button"
                        variant="outline" 
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Images
                      </Button>
                      <Button type="button" variant="outline">
                        <Camera className="mr-2 h-4 w-4" />
                        Take Photo
                      </Button>
                      <input 
                        id="file-upload" 
                        type="file" 
                        multiple 
                        accept="image/*"
                        className="hidden" 
                        onChange={handleFileChange}
                      />
                    </div>
                    
                    {reviewForm.images.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mt-3">
                        {reviewForm.images.map((file, index) => (
                          <div key={index} className="relative">
                            <img 
                              src={URL.createObjectURL(file)} 
                              alt={`Preview ${index}`}
                              className="w-full h-20 object-cover rounded-md"
                            />
                            <button
                              type="button"
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 w-5 h-5 flex items-center justify-center text-xs"
                              onClick={() => handleRemoveImage(index)}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredTestimonials.map(testimonial => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          size={16}
                          className={i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                    <div className="flex items-center text-sm text-paint-gray">
                      <span>{testimonial.location}</span>
                      <span className="mx-2">•</span>
                      <span>{testimonial.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {testimonial.verified && (
                      <span className="text-xs bg-paint-blue text-white px-2 py-1 rounded-full">
                        Verified Customer
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mt-3 mb-4">
                  <span className="inline-block bg-gray-100 text-paint-gray rounded-full px-3 py-1 text-xs font-medium mr-2">
                    {testimonial.projectType}
                  </span>
                </div>
                
                <p className="text-paint-gray mb-4">{testimonial.comment}</p>
                
                {testimonial.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {testimonial.images.map((image, index) => (
                      <img 
                        key={index}
                        src={image} 
                        alt={`Project by ${testimonial.name}`}
                        className="rounded-md h-24 w-full object-cover"
                      />
                    ))}
                  </div>
                )}
                
                <div className="flex gap-4 text-paint-gray text-sm mt-4">
                  <button 
                    className="flex items-center gap-1 hover:text-paint-blue transition-colors"
                    onClick={() => handleLike(testimonial.id)}
                  >
                    <ThumbsUp size={14} />
                    <span>Helpful ({testimonial.likes})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredTestimonials.length === 0 && (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <p className="text-2xl text-paint-gray mb-4">No reviews in this category yet</p>
              <p className="text-paint-gray max-w-md mx-auto">
                Be the first to share your experience with our {activeTab === 'all' ? 'services' : activeTab} painting services.
              </p>
            </div>
          )}
          
          <div className="mt-12 bg-gray-50 p-8 rounded-lg text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Share Your Story</h2>
              <p className="text-paint-gray mb-6">
                Your feedback helps us improve and helps other customers make informed decisions.
                Upload before and after photos to showcase your project transformation!
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="#" onClick={() => setIsDialogOpen(true)}>
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Write a Review
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/gallery">
                    <ImageIcon className="mr-2 h-5 w-5" />
                    View Our Gallery
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Testimonials;
