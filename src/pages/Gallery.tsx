
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Gallery = () => {
  const categories = ['All', 'Interior', 'Exterior', 'Commercial', 'Residential', 'Before/After'];
  const [activeCategory, setActiveCategory] = useState('All');

  const galleryItems = [
    {
      id: 1,
      category: 'Interior',
      title: 'Modern Living Room',
      description: 'Complete interior repaint with custom color palette',
      image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb',
      tags: ['Interior', 'Residential']
    },
    {
      id: 2,
      category: 'Exterior',
      title: 'Suburban Home Exterior',
      description: 'Fresh coat of paint and trim work for enhanced curb appeal',
      image: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1',
      tags: ['Exterior', 'Residential']
    },
    {
      id: 3,
      category: 'Commercial',
      title: 'Office Space Renovation',
      description: 'Complete office makeover with modern color scheme',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2',
      tags: ['Interior', 'Commercial']
    },
    {
      id: 4,
      category: 'Before/After',
      title: 'Kitchen Transformation',
      description: 'Dramatic before and after kitchen cabinet painting',
      image: 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf',
      tags: ['Interior', 'Residential', 'Before/After']
    },
    {
      id: 5,
      category: 'Interior',
      title: 'Master Bedroom',
      description: 'Calming color palette for a restful retreat',
      image: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4',
      tags: ['Interior', 'Residential']
    },
    {
      id: 6,
      category: 'Commercial',
      title: 'Retail Store',
      description: 'Vibrant retail space with brand-aligned colors',
      image: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0',
      tags: ['Interior', 'Commercial']
    },
    {
      id: 7,
      category: 'Exterior',
      title: 'Historic Home Restoration',
      description: 'Careful restoration of a century-old Victorian home',
      image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf',
      tags: ['Exterior', 'Residential']
    },
    {
      id: 8,
      category: 'Before/After',
      title: 'Dining Room Makeover',
      description: 'Complete transformation with accent wall',
      image: 'https://images.unsplash.com/photo-1615529162924-f8605388461d',
      tags: ['Interior', 'Residential', 'Before/After']
    },
    {
      id: 9,
      category: 'Commercial',
      title: 'Restaurant Interior',
      description: 'Warm and inviting colors for dining atmosphere',
      image: 'https://images.unsplash.com/photo-1523539693385-e5e891eb4465',
      tags: ['Interior', 'Commercial']
    },
  ];

  const filteredItems = activeCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.tags.includes(activeCategory));

  return (
    <>
      <Navbar />
      
      {/* Page Header */}
      <section className="bg-paint-blue text-white pt-32 pb-20 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1588854337115-1c67d9247e4d')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Project Gallery</h1>
            <p className="text-xl text-gray-200">
              Explore our portfolio of completed painting projects. From residential interiors to commercial exteriors, see the quality of our work firsthand.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? 'default' : 'outline'}
                className={activeCategory === category ? 'bg-paint-blue hover:bg-blue-700' : 'text-paint-blue'}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="relative group overflow-hidden rounded-lg shadow-lg">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="mb-2">
                      <span className="bg-paint-terracotta text-white text-xs font-semibold px-2 py-1 rounded">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                    <p className="text-gray-200 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Showcase */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto">
          <h2 className="section-title text-center mx-auto w-fit mb-12">Featured Project</h2>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-paint-blue mb-4">Historic Victorian Restoration</h3>
                <p className="text-paint-gray mb-4">
                  This historic Victorian home in the heart of the city required careful restoration to maintain its architectural integrity while providing modern protection from the elements.
                </p>
                <div className="mb-6 space-y-2">
                  <div className="flex items-center">
                    <span className="font-semibold w-32">Project Type:</span>
                    <span>Exterior Restoration</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold w-32">Duration:</span>
                    <span>3 Weeks</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold w-32">Location:</span>
                    <span>Heritage District</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold w-32">Services:</span>
                    <span>Scraping, Sanding, Priming, Painting, Detail Work</span>
                  </div>
                </div>
                <Button className="btn-primary self-start" asChild>
                  <Link to="/contact">
                    Request Similar Project
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1570129477492-45c003edd2be" 
                  alt="Victorian Home Restoration" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <a href="#" className="inline-flex items-center text-paint-blue hover:text-paint-terracotta font-medium">
              Browse All Projects
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="section-title text-center mx-auto w-fit mb-12">Client Testimonials</h2>
          
          <div className="bg-paint-blue text-white p-8 rounded-lg relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1588854337115-1c67d9247e4d')] bg-cover bg-center opacity-10"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-paint-blue via-paint-blue/90 to-paint-blue/80"></div>
            </div>
            
            <div className="relative z-10">
              <div className="text-4xl text-paint-terracotta mb-6">"</div>
              <p className="text-xl italic mb-6">
                The team at PaintPro transformed our outdated home into a modern masterpiece. Their attention to detail, color recommendations, and professional service exceeded our expectations. We couldn't be happier with the results!
              </p>
              <div className="flex items-center">
                <img 
                  src="https://randomuser.me/api/portraits/women/65.jpg" 
                  alt="Client" 
                  className="rounded-full w-12 h-12 object-cover border-2 border-white mr-4"
                />
                <div>
                  <p className="font-semibold">Jennifer & David Patterson</p>
                  <p className="text-gray-300">Homeowners</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button className="btn-primary" asChild>
              <Link to="/testimonials">Read More Testimonials</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-paint-blue">Ready to Start Your Project?</h2>
          <p className="text-xl text-paint-gray mb-8 max-w-2xl mx-auto">
            Contact us today to schedule a consultation and get a free quote for your painting project.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="btn-primary" asChild>
              <Link to="/contact">Request a Quote</Link>
            </Button>
            <Button variant="outline" className="border-paint-blue text-paint-blue hover:bg-paint-blue hover:text-white" asChild>
              <Link to="/services">Explore Our Services</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Gallery;
