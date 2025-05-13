
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useHeroImages } from '@/services/dataService';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  
  // Fetch hero images from the data service
  const { data: projectImages = [], isLoading } = useHeroImages();
  
  // Image rotation effect
  useEffect(() => {
    if (projectImages.length === 0) return;
    
    const intervalId = setInterval(() => {
      setFadeIn(false);
      
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === projectImages.length - 1 ? 0 : prevIndex + 1
        );
        setFadeIn(true);
      }, 1000); // Wait for fade out before changing image
      
    }, 5000); // Change image every 5 seconds
    
    return () => clearInterval(intervalId);
  }, [projectImages]);

  // Default image if data is loading or not available
  const currentImage = isLoading || projectImages.length === 0 
    ? 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09' 
    : projectImages[currentImageIndex];

  return (
    <section className="relative bg-paint-blue text-white min-h-[80vh] flex items-center overflow-hidden">
      {/* Paint drip animation */}
      <div className="absolute top-0 left-0 w-full h-20 z-10 overflow-hidden">
        <div className="paint-drip"></div>
      </div>
      
      {/* Background Image with Fade Transition */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className={`absolute w-full h-full bg-cover bg-center transition-opacity duration-1000 ${fadeIn ? 'opacity-20' : 'opacity-0'}`}
          style={{ backgroundImage: `url('${currentImage}')` }}
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
            <Button className="btn-secondary flex items-center group" asChild>
              <Link to="/contact">
                Book Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white/10 shadow-[0_0_10px_rgba(0,0,0,0.2)]" 
              asChild
            >
              <Link to="/services">
                Explore Services
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
