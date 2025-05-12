
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, Tag, Share2, Facebook, Twitter, Linkedin, ArrowLeft, ArrowRight } from 'lucide-react';

// Mock data for a blog post
const blogPost = {
  id: 1,
  title: 'How to Choose the Perfect Paint Colors for Your Home',
  content: `
    <p class="mb-4">Selecting the right paint colors for your home is one of the most impactful decisions you'll make during a renovation or refresh. The right colors can make spaces feel larger, cozier, more elegant, or more energetic—depending on your goals.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4">Understanding Color Psychology</h2>
    
    <p class="mb-4">Colors affect our mood and perception in powerful ways. Before choosing paint, consider what atmosphere you want to create in each room:</p>
    
    <ul class="list-disc ml-6 mb-6 space-y-2">
      <li><strong>Blues</strong> are calming and serene, ideal for bedrooms and bathrooms.</li>
      <li><strong>Yellows</strong> are cheerful and energizing, great for kitchens and dining areas.</li>
      <li><strong>Greens</strong> connect us to nature and promote relaxation, perfect for living rooms.</li>
      <li><strong>Neutrals</strong> like beige, gray, and white are versatile foundations that can be accented with bolder colors.</li>
    </ul>
    
    <p class="mb-4">The key is understanding that colors evoke different emotional responses, so choose ones that align with how you want to feel in each space.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4">Consider Your Home's Lighting</h2>
    
    <p class="mb-4">The same color can look dramatically different depending on the lighting in your home. Natural light shows a color's truest shade, while incandescent lighting brings out warm tones and fluorescent lighting casts a cool blue tone.</p>
    
    <p class="mb-4">Always test paint samples in the actual room at different times of day to see how the light affects the color. What looks perfect in the store might appear completely different in your home.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4">Create Flow Throughout Your Home</h2>
    
    <p class="mb-4">While each room can have its own personality, the colors throughout your home should have a sense of cohesion. Consider choosing colors from the same color family or with similar undertones to create a harmonious flow from room to room.</p>
    
    <p class="mb-6">A popular approach is to use a neutral palette for main living areas and add more saturated colors in smaller spaces or as accents.</p>
    
    <div class="bg-gray-100 p-6 rounded-lg mb-8">
      <h3 class="font-bold text-lg mb-2">Quick Tip: The 60-30-10 Rule</h3>
      <p>When designing a color scheme for a room, consider using the 60-30-10 rule:</p>
      <ul class="list-disc ml-6 mt-2 space-y-1">
        <li>60% dominant color (walls)</li>
        <li>30% secondary color (furniture)</li>
        <li>10% accent color (accessories)</li>
      </ul>
    </div>
    
    <h2 class="text-2xl font-bold mt-8 mb-4">Test Before Committing</h2>
    
    <p class="mb-4">Never skip the testing phase! Paint large swatches (at least 2ft x 2ft) on different walls in the room. Live with these samples for a few days to see how they look in different lighting conditions and how they make you feel.</p>
    
    <p class="mb-4">Many paint companies now offer peel-and-stick samples that can be moved around the room, making this process even easier.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4">Consider Your Existing Décor</h2>
    
    <p class="mb-4">Your paint colors should complement your existing furniture, flooring, and fixtures. If you have bold furniture or patterned rugs, you might want more neutral walls to balance the space. Conversely, if your furniture is neutral, colorful walls can add visual interest.</p>
    
    <p class="mb-4">Pro tip: Pull colors from existing items in your home—artwork, throw pillows, or area rugs can be excellent inspiration for your paint palette.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4">Finishes Matter Too</h2>
    
    <p class="mb-6">Don't forget that the finish of your paint (flat, eggshell, satin, semi-gloss, or high-gloss) can dramatically impact how the color appears and functions in your space:</p>
    
    <ul class="list-disc ml-6 mb-6 space-y-2">
      <li><strong>Flat/Matte:</strong> Non-reflective, hides imperfections, but less washable. Best for low-traffic areas and ceilings.</li>
      <li><strong>Eggshell/Satin:</strong> Slight sheen, more durable than flat. Great for living rooms and bedrooms.</li>
      <li><strong>Semi-Gloss/High-Gloss:</strong> Highly reflective, very durable and washable. Ideal for trim, doors, and high-moisture areas like kitchens and bathrooms.</li>
    </ul>
    
    <h2 class="text-2xl font-bold mt-8 mb-4">Final Thoughts</h2>
    
    <p class="mb-4">Choosing paint colors is both an art and a science. While there are guidelines to help you make decisions, ultimately your personal preference matters most. Don't be afraid to trust your instincts and choose colors that make you happy.</p>
    
    <p class="mb-4">If you're still uncertain, consider hiring a color consultant or using one of the many digital tools available that let you upload photos of your rooms and virtually "paint" the walls.</p>
    
    <p>Remember, paint is one of the easiest and most affordable ways to transform your space—and if you don't love the result, you can always paint over it!</p>
  `,
  image: '/placeholder.svg',
  date: 'May 10, 2023',
  author: 'Sarah Johnson',
  authorTitle: 'Interior Design Specialist',
  authorBio: 'Sarah has over 10 years of experience in interior design and color consultation. She specializes in creating harmonious color schemes for residential spaces.',
  authorImage: '/placeholder.svg',
  category: 'Color Selection',
  tags: ['color theory', 'interior design', 'home improvement'],
  readTime: '8 min read',
  relatedPosts: [
    {
      id: 2,
      title: 'The Complete Guide to Exterior Painting',
      excerpt: 'Learn the professional approach to exterior painting from start to finish.',
      image: '/placeholder.svg'
    },
    {
      id: 4,
      title: '2023 Color Trends: What\'s Hot in Home Painting This Year',
      excerpt: 'Stay ahead of the curve with the latest color trends in home design.',
      image: '/placeholder.svg'
    },
    {
      id: 6,
      title: 'DIY vs Professional Painting: When to Call the Experts',
      excerpt: 'Learn when to tackle a project yourself and when to hire professionals.',
      image: '/placeholder.svg'
    }
  ]
};

const BlogPost = () => {
  const { id } = useParams();
  // In a real app, we would fetch the blog post based on the id
  // For now, we'll just use our mock data
  
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <div className="text-sm text-paint-gray mb-8">
              <Link to="/" className="hover:text-paint-blue">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/blog" className="hover:text-paint-blue">Blog</Link>
              <span className="mx-2">/</span>
              <span>{blogPost.title}</span>
            </div>
            
            {/* Post Header */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{blogPost.title}</h1>
            
            <div className="flex flex-wrap items-center text-sm text-paint-gray mb-8">
              <div className="flex items-center mr-4">
                <Calendar size={16} className="mr-1" />
                <span>{blogPost.date}</span>
              </div>
              <div className="flex items-center mr-4">
                <Clock size={16} className="mr-1" />
                <span>{blogPost.readTime}</span>
              </div>
              <div className="flex items-center">
                <Tag size={16} className="mr-1" />
                <span>{blogPost.category}</span>
              </div>
            </div>
            
            {/* Featured Image */}
            <div className="mb-8">
              <img 
                src={blogPost.image} 
                alt={blogPost.title}
                className="w-full h-auto rounded-lg"
              />
            </div>
            
            {/* Article Content */}
            <article className="prose prose-lg max-w-none mb-12">
              <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
            </article>
            
            {/* Tags */}
            <div className="mb-8">
              <h3 className="font-medium mb-3">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {blogPost.tags.map(tag => (
                  <Link 
                    key={tag} 
                    to={`/blog?tag=${tag}`}
                    className="bg-gray-100 hover:bg-gray-200 text-paint-gray rounded-full px-3 py-1 text-sm"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Share */}
            <div className="mb-12 pb-8 border-b">
              <h3 className="font-medium mb-3">Share this article:</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Facebook size={18} />
                </Button>
                <Button variant="outline" size="icon">
                  <Twitter size={18} />
                </Button>
                <Button variant="outline" size="icon">
                  <Linkedin size={18} />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 size={18} />
                </Button>
              </div>
            </div>
            
            {/* Author Bio */}
            <div className="bg-gray-50 rounded-lg p-6 mb-12">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <img 
                  src={blogPost.authorImage}
                  alt={blogPost.author}
                  className="w-20 h-20 object-cover rounded-full"
                />
                <div>
                  <h3 className="font-bold text-lg">{blogPost.author}</h3>
                  <p className="text-paint-terracotta mb-2">{blogPost.authorTitle}</p>
                  <p className="text-paint-gray">{blogPost.authorBio}</p>
                </div>
              </div>
            </div>
            
            {/* Related Posts */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {blogPost.relatedPosts.map(post => (
                  <Link key={post.id} to={`/blog/${post.id}`} className="group">
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                      <div className="h-40 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold mb-2 group-hover:text-paint-blue transition-colors">{post.title}</h3>
                        <p className="text-sm text-paint-gray">{post.excerpt}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between mt-12">
              <Button variant="outline" asChild>
                <Link to="/blog">
                  <ArrowLeft size={16} className="mr-2" />
                  Back to All Articles
                </Link>
              </Button>
              <div className="flex gap-3">
                <Button variant="ghost" asChild>
                  <Link to="/blog/prev">
                    <ArrowLeft size={16} className="mr-1" />
                    Previous
                  </Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link to="/blog/next">
                    Next
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
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

export default BlogPost;
