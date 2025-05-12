
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Clock, Tag, Calendar } from 'lucide-react';

// Mock data for blog posts
const blogPosts = [
  {
    id: 1,
    title: 'How to Choose the Perfect Paint Colors for Your Home',
    excerpt: 'Selecting the right colors for your home can be overwhelming. This guide breaks down how to choose colors based on your space, lighting, and personal style.',
    image: '/placeholder.svg',
    date: 'May 10, 2023',
    author: 'Sarah Johnson',
    category: 'Color Selection',
    tags: ['color theory', 'interior design', 'home improvement'],
    readTime: '8 min read'
  },
  {
    id: 2,
    title: 'The Complete Guide to Exterior Painting: Preparation, Techniques, and Maintenance',
    excerpt: 'A well-executed exterior paint job can transform your home and increase its value. Learn the professional approach to exterior painting from start to finish.',
    image: '/placeholder.svg',
    date: 'April 25, 2023',
    author: 'Michael Rodriguez',
    category: 'Exterior Painting',
    tags: ['exterior', 'painting techniques', 'maintenance'],
    readTime: '12 min read'
  },
  {
    id: 3,
    title: 'Waterproofing Your Home: Why It Matters and How to Do It Right',
    excerpt: 'Water damage can be devastating and expensive to repair. Learn about the importance of waterproofing and the best methods to protect your home.',
    image: '/placeholder.svg',
    date: 'April 18, 2023',
    author: 'Thomas Chen',
    category: 'Waterproofing',
    tags: ['waterproofing', 'moisture control', 'home protection'],
    readTime: '10 min read'
  },
  {
    id: 4,
    title: '2023 Color Trends: What\'s Hot in Home Painting This Year',
    excerpt: 'Stay ahead of the curve with the latest color trends in home design. We break down the popular palettes and how to incorporate them into your space.',
    image: '/placeholder.svg',
    date: 'March 30, 2023',
    author: 'Emily Wilson',
    category: 'Color Trends',
    tags: ['trends', 'color palettes', 'design'],
    readTime: '7 min read'
  },
  {
    id: 5,
    title: 'Commercial Painting: Best Practices for Business Environments',
    excerpt: 'Commercial spaces have unique painting requirements. Discover how to choose durable finishes, minimize disruption, and create a productive environment.',
    image: '/placeholder.svg',
    date: 'March 15, 2023',
    author: 'Robert Patterson',
    category: 'Commercial Painting',
    tags: ['commercial', 'business', 'professional painting'],
    readTime: '9 min read'
  },
  {
    id: 6,
    title: 'DIY vs Professional Painting: When to Call the Experts',
    excerpt: 'While DIY painting can save money, sometimes professional help is necessary. Learn when to tackle a project yourself and when to hire professionals.',
    image: '/placeholder.svg',
    date: 'February 28, 2023',
    author: 'Jessica Taylor',
    category: 'DIY & Professional Tips',
    tags: ['DIY', 'professional services', 'home projects'],
    readTime: '6 min read'
  },
];

// Categories for filtering
const categories = [
  'All Categories',
  'Color Selection',
  'Exterior Painting',
  'Interior Painting',
  'Waterproofing',
  'Color Trends',
  'Commercial Painting',
  'DIY & Professional Tips'
];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Categories');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = activeCategory === 'All Categories' || post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-paint-blue mb-6">Paint Pro Blog</h1>
            <p className="text-lg text-paint-gray max-w-2xl mx-auto">
              Expert tips, trends, and insights on painting, color selection, and home improvement
              to help you make informed decisions for your projects.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    placeholder="Search articles..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="font-semibold text-lg mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`block w-full text-left px-2 py-1 rounded ${
                        activeCategory === category ? 'bg-paint-blue text-white' : 'hover:bg-gray-100 text-paint-gray'
                      }`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-lg mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {['color theory', 'interior design', 'exterior', 'waterproofing', 'trends', 'commercial', 'DIY', 'maintenance'].map(tag => (
                    <button
                      key={tag}
                      className="bg-gray-100 hover:bg-gray-200 text-paint-gray rounded-full px-3 py-1 text-sm"
                      onClick={() => setSearchTerm(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="md:w-3/4">
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.map(post => (
                    <article key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
                      <Link to={`/blog/${post.id}`} className="block h-48 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </Link>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center text-sm text-paint-gray mb-3">
                          <Calendar size={14} className="mr-1" />
                          <span>{post.date}</span>
                          <span className="mx-2">•</span>
                          <Clock size={14} className="mr-1" />
                          <span>{post.readTime}</span>
                        </div>
                        
                        <Link to={`/blog/${post.id}`} className="block mb-3">
                          <h2 className="font-bold text-xl hover:text-paint-blue transition-colors">{post.title}</h2>
                        </Link>
                        
                        <p className="text-paint-gray mb-4 flex-1">{post.excerpt}</p>
                        
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center text-sm">
                            <Tag size={14} className="mr-1 text-paint-terracotta" />
                            <span className="text-paint-terracotta">{post.category}</span>
                          </div>
                          <Button variant="link" asChild className="p-0">
                            <Link to={`/blog/${post.id}`}>
                              Read More <ArrowRight size={14} className="ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <p className="text-xl text-paint-gray mb-4">No articles match your search criteria</p>
                  <Button onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('All Categories');
                  }}>
                    Clear Filters
                  </Button>
                </div>
              )}
              
              {/* Featured post - full width */}
              {filteredPosts.length > 0 && activeCategory === 'All Categories' && !searchTerm && (
                <div className="mt-10 bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="grid md:grid-cols-2">
                    <div className="h-full">
                      <img 
                        src="/placeholder.svg" 
                        alt="Featured Post"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-8">
                      <span className="inline-block bg-paint-terracotta text-white text-sm font-bold px-3 py-1 rounded-full mb-4">
                        Featured Article
                      </span>
                      <h2 className="text-3xl font-bold mb-4">The Ultimate Guide to Paint Finishes</h2>
                      <p className="text-paint-gray mb-6">
                        From matte to high-gloss, each paint finish has its ideal use cases. This comprehensive 
                        guide explains the pros and cons of each finish and where they work best in your home.
                      </p>
                      <div className="flex items-center text-sm text-paint-gray mb-6">
                        <Calendar size={14} className="mr-1" />
                        <span>May 15, 2023</span>
                        <span className="mx-2">•</span>
                        <Clock size={14} className="mr-1" />
                        <span>15 min read</span>
                      </div>
                      <Button asChild>
                        <Link to="/blog/featured">Read Full Article</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Newsletter signup */}
              <div className="mt-10 bg-paint-blue text-white rounded-lg p-8">
                <div className="max-w-2xl mx-auto text-center">
                  <h3 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h3>
                  <p className="mb-6">
                    Get expert painting tips, color inspiration, and special offers delivered directly to your inbox.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input 
                      placeholder="Your email address"
                      className="bg-white flex-1"
                    />
                    <Button variant="secondary">Subscribe</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
