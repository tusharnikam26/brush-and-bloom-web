
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative bg-paint-blue text-white min-h-[80vh] flex items-center overflow-hidden">
      {/* Static background image */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop")', 
            backgroundPosition: 'center 30%',
            opacity: 0.4
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-paint-blue via-paint-blue/90 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Transform Your Space With 
            <span className="text-paint-terracotta"> Premium</span> Painting Services
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Professional, reliable, and high-quality painting services for residential and commercial properties. 
            We bring colors to life with precision and care.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="btn-secondary flex items-center group shadow-lg" asChild>
              <Link to="/products">
                View Products
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white/10 shadow-md" 
              asChild
            >
              <Link to="/color-preview">
                Explore Colors
              </Link>
            </Button>
          </div>
          
          <div className="flex flex-wrap items-center gap-6 mt-12">
            <div className="flex items-center">
              <div className="bg-white rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <span className="text-lg">5-Year Guarantee</span>
            </div>
            <div className="flex items-center">
              <div className="bg-white rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              </div>
              <span className="text-lg">4.9/5 Rated Service</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
