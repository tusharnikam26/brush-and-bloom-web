
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HousePaintingSection = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="section-title">Building & House Painting Excellence</h2>
            <p className="text-lg text-paint-gray mb-6">
              We specialize in transforming residential and commercial buildings with professional painting services that 
              enhance both appearance and protection. Our experienced team handles projects of all sizes, from single-family 
              homes to multi-story commercial buildings.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="bg-paint-blue/10 p-2 rounded-full mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-paint-blue">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Complete Exterior Solutions</h3>
                  <p className="text-paint-gray">
                    From preparation and repairs to finishing coats, we provide comprehensive exterior painting services
                    that protect your building from the elements while enhancing its visual appeal.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-paint-blue/10 p-2 rounded-full mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-paint-blue">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Weather-Resistant Coatings</h3>
                  <p className="text-paint-gray">
                    We use premium weather-resistant paints and coatings specifically designed to withstand harsh 
                    environmental conditions, providing long-lasting protection.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-paint-blue/10 p-2 rounded-full mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-paint-blue">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Commercial Building Expertise</h3>
                  <p className="text-paint-gray">
                    Our specialized team has extensive experience with commercial buildings, offices, retail spaces, 
                    and industrial facilities, delivering professional results with minimal disruption.
                  </p>
                </div>
              </div>
            </div>
            
            <Button className="btn-primary" asChild>
              <Link to="/services">
                Explore House Painting Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1000&auto=format&fit=crop" 
                alt="Professional house painting" 
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg">
                <p className="font-bold text-paint-blue">15+ Years Experience</p>
                <p className="text-sm text-paint-gray">Trusted by homeowners & businesses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HousePaintingSection;
