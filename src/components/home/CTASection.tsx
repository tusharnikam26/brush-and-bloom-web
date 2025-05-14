
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const CTASection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const benefits = [
    'Free color consultation',
    'Professional painters',
    '5-year warranty on all work',
    'Eco-friendly paint options',
    'Flexible scheduling',
    'Thorough cleanup after completion'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create a mailto link with the form data
      const subject = encodeURIComponent(`New Quote Request from ${formData.name}`);
      const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Service: ${formData.service}
      `);
      
      const mailtoLink = `mailto:tejxcoder0.1@gmail.com?subject=${subject}&body=${body}`;
      
      // Open the mail client
      window.open(mailtoLink);
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: ''
      });
      
      toast({
        title: "Quote Request Sent",
        description: "Thank you! Your quote request has been sent successfully.",
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: "There was an error sending your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Your Name" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-paint-blue"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Email Address" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-paint-blue"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="Phone Number" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-paint-blue"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <select 
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-paint-blue text-gray-700"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Service</option>
                    <option value="interior">Interior Painting</option>
                    <option value="exterior">Exterior Painting</option>
                    <option value="commercial">Commercial Painting</option>
                    <option value="consultation">Color Consultation</option>
                  </select>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-paint-blue hover:bg-blue-800"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
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
