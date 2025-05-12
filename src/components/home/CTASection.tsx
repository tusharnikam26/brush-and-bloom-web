
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const CTASection = () => {
  const benefits = [
    'Free color consultation',
    'Professional painters',
    '5-year warranty on all work',
    'Eco-friendly paint options',
    'Flexible scheduling',
    'Thorough cleanup after completion'
  ];

  return (
    <section className="section-padding bg-paint-blue text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-0 bottom-0 w-1/2 h-full bg-[url('https://images.unsplash.com/photo-1589939705384-5185137a7f0f')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-paint-blue/80 to-paint-blue"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Space?</h2>
            <p className="text-lg text-gray-200 mb-8">
              Get a free, no-obligation quote for your painting project. Our team is ready to help you achieve the perfect look for your home or business.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-paint-terracotta mr-2" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button className="btn-secondary" asChild>
                <Link to="/contact">Request a Quote</Link>
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-paint-blue" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
          
          <div className="lg:w-2/5 w-full">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-paint-blue text-2xl font-semibold mb-4">Get a Free Estimate</h3>
              <form className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-paint-blue"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-paint-blue"
                  />
                </div>
                <div>
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-paint-blue"
                  />
                </div>
                <div>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-paint-blue text-gray-700">
                    <option value="">Select Service</option>
                    <option value="interior">Interior Painting</option>
                    <option value="exterior">Exterior Painting</option>
                    <option value="commercial">Commercial Painting</option>
                    <option value="consultation">Color Consultation</option>
                  </select>
                </div>
                <Button type="submit" className="w-full bg-paint-blue hover:bg-blue-800">
                  Submit Request
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
