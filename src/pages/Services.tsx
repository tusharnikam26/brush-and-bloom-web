
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

const Services = () => {
  const services = [
    {
      id: 'interior',
      title: 'Interior Painting',
      description: 'Transform the inside of your home with our premium interior painting services.',
      details: 'Our interior painting services cover walls, ceilings, trim, doors, and windows. We use premium paints that are durable, washable, and provide excellent coverage.',
      benefits: [
        'Low-VOC and eco-friendly paint options',
        'Careful preparation and surface cleaning',
        'Detailed trim and accent work',
        'Thorough cleanup after completion'
      ],
      image: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09'
    },
    {
      id: 'exterior',
      title: 'Exterior Painting',
      description: 'Boost your home's curb appeal while protecting it from the elements.',
      details: 'Our exterior painting services include proper preparation, premium weather-resistant paints, and meticulous application to ensure a beautiful, long-lasting finish.',
      benefits: [
        'Weather-resistant paints for durability',
        'Thorough preparation including power washing',
        'Careful protection of landscaping and fixtures',
        '5-year warranty on exterior work'
      ],
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c3fdae2'
    },
    {
      id: 'commercial',
      title: 'Commercial Painting',
      description: 'Professional painting services for offices, retail spaces, and commercial properties.',
      details: 'We understand that businesses require minimal disruption. Our commercial painting services are tailored to work around your schedule, with options for evening and weekend work.',
      benefits: [
        'Flexible scheduling to minimize business disruption',
        'Fast-drying, low-odor paints for quick return to operations',
        'Industrial-grade materials for high-traffic areas',
        'Compliance with commercial building codes and regulations'
      ],
      image: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c'
    },
    {
      id: 'residential',
      title: 'Residential Painting',
      description: 'Complete home painting services tailored to your style and preferences.',
      details: 'From single rooms to entire homes, our residential painting services are comprehensive and customized to your specific needs and style preferences.',
      benefits: [
        'Personalized color consultation',
        'Protection of furniture and belongings',
        'Detailed cut-in work around fixtures and trim',
        'Final walkthrough to ensure complete satisfaction'
      ],
      image: 'https://images.unsplash.com/photo-1560440021-33f9b867899d'
    },
    {
      id: 'texture',
      title: 'Texture & Specialty Finishes',
      description: 'Add character and dimension with textured walls and specialty finishes.',
      details: 'Our skilled painters can create a variety of textured finishes and decorative effects, including knockdown, orange peel, popcorn removal, Venetian plaster, and more.',
      benefits: [
        'Custom texture patterns and techniques',
        'Specialized tools and materials',
        'Skilled artisans with texture experience',
        'Samples provided before full application'
      ],
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f'
    },
    {
      id: 'consultation',
      title: 'Color Consultation',
      description: 'Expert advice to help you choose the perfect colors for your space.',
      details: 'Our professional color consultants will help you select the perfect palette for your home or business, considering lighting, architecture, existing décor, and your personal preferences.',
      benefits: [
        'In-home consultation with color samples',
        'Digital color visualization',
        'Expertise in color psychology and trends',
        'Coordination with existing elements and furnishings'
      ],
      image: 'https://images.unsplash.com/photo-1582005450386-de4bd999c395'
    },
  ];

  return (
    <>
      <Navbar />
      
      {/* Page Header */}
      <section className="bg-paint-blue text-white pt-32 pb-20 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589939705384-5185137a7f0f')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Painting Services</h1>
            <p className="text-xl text-gray-200">
              Professional painting services tailored to your needs. We deliver quality, reliability, and attention to detail in every project.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {services.map((service, index) => (
            <div 
              key={service.id}
              id={service.id}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 mb-20`}
            >
              <div className="lg:w-1/2">
                <img 
                  src={service.image}
                  alt={service.title}
                  className="rounded-lg shadow-lg w-full h-80 object-cover"
                />
              </div>
              
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold text-paint-blue mb-4">{service.title}</h2>
                <p className="text-xl text-paint-gray mb-4">{service.description}</p>
                <p className="text-paint-gray mb-6">{service.details}</p>
                
                <h3 className="text-xl font-semibold mb-3">Benefits:</h3>
                <ul className="mb-6 space-y-2">
                  {service.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-paint-terracotta mr-2 mt-0.5 shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <Button className="btn-primary" asChild>
                  <Link to="/contact">
                    Get a Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto">
          <h2 className="section-title text-center mx-auto w-fit mb-12">Our Painting Process</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center relative">
              <div className="bg-paint-blue text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-3">Consultation</h3>
              <p className="text-paint-gray">We discuss your needs, preferences, timeline, and budget to understand your project requirements.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center relative">
              <div className="bg-paint-blue text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-3">Preparation</h3>
              <p className="text-paint-gray">We carefully prepare surfaces, protect your belongings, and address any repairs needed before painting.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center relative">
              <div className="bg-paint-blue text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-3">Painting</h3>
              <p className="text-paint-gray">Our skilled team applies premium paints using professional techniques for a flawless finish.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center relative">
              <div className="bg-paint-blue text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-xl font-semibold mb-3">Final Inspection</h3>
              <p className="text-paint-gray">We conduct a detailed walkthrough with you to ensure complete satisfaction with the results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="section-title text-center mx-auto w-fit mb-12">Our Service Packages</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gray-50 p-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-paint-blue">Basic Package</h3>
                <p className="text-paint-gray mt-2">Perfect for single room refreshes</p>
              </div>
              <div className="p-6">
                <ul className="mb-6 space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-paint-terracotta mr-2 mt-0.5 shrink-0" />
                    <span>Surface preparation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-paint-terracotta mr-2 mt-0.5 shrink-0" />
                    <span>Two coats of premium paint</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-paint-terracotta mr-2 mt-0.5 shrink-0" />
                    <span>Basic trim and detail work</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-paint-terracotta mr-2 mt-0.5 shrink-0" />
                    <span>Standard cleanup</span>
                  </li>
                </ul>
                <Button className="w-full btn-primary" asChild>
                  <Link to="/contact">Request Quote</Link>
                </Button>
              </div>
            </div>
            
            <div className="border-2 border-paint-blue rounded-lg overflow-hidden relative shadow-lg">
              <div className="absolute top-0 right-0 bg-paint-terracotta text-white py-1 px-4 text-sm font-semibold">
                Most Popular
              </div>
              <div className="bg-paint-blue text-white p-6 border-b border-blue-700">
                <h3 className="text-2xl font-bold">Premium Package</h3>
                <p className="text-gray-200 mt-2">Ideal for multiple room projects</p>
              </div>
              <div className="p-6">
                <ul className="mb-6 space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-paint-terracotta mr-2 mt-0.5 shrink-0" />
                    <span>Extensive surface preparation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-paint-terracotta mr-2 mt-0.5 shrink-0" />
                    <span>Two coats of premium paint</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-paint-terracotta mr-2 mt-0.5 shrink-0" />
                    <span>Detailed trim and accent work</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-paint-terracotta mr-2 mt-0.5 shrink-0" />
                    <span>Minor drywall repairs</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-paint-terracotta mr-2 mt-0.5 shrink-0" />
                    <span>Thorough cleanup</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-paint-terracotta mr-2 mt-0.5 shrink-0" />
                    <span>Color consultation</span>
                  </li>
                </ul>
                <Button className="w-full btn-secondary" asChild>
                  <Link to="/contact">Request Quote</Link>
                </Button>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gray-50 p-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-paint-blue">Deluxe Package</h3>
                <p className="text-paint-gray mt-2">Complete home transformation</p>
              </div>
              <div className="p-6">
                <ul className="mb-6 space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-paint-terracotta mr-2 mt-0.5 shrink-0" />
                    <span>Premium surface preparation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-paint-terracotta mr-2 mt-0.5 shrink-0" />
                    <span>Two coats of premium paint</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-paint-terracotta mr-2 mt-0.5 shrink-0" />
                    <span>Detailed trim and accent work</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-paint-terracotta mr-2 mt-0.5 shrink-0" />
                    <span>Major drywall repairs</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-paint-terracotta mr-2 mt-0.5 shrink-0" />
                    <span>Cabinet and specialty painting</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-paint-terracotta mr-2 mt-0.5 shrink-0" />
                    <span>Deep cleaning and furniture moving</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-paint-terracotta mr-2 mt-0.5 shrink-0" />
                    <span>Extended warranty</span>
                  </li>
                </ul>
                <Button className="w-full btn-primary" asChild>
                  <Link to="/contact">Request Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto">
          <h2 className="section-title text-center mx-auto w-fit mb-12">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="mb-6 bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-paint-blue mb-2">How long does a typical painting project take?</h3>
              <p className="text-paint-gray">The duration depends on the size and complexity of the project. A single room typically takes 1-2 days, while an entire home interior might take 5-7 days. We'll provide a specific timeline during your consultation.</p>
            </div>
            
            <div className="mb-6 bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-paint-blue mb-2">What type of paint do you use?</h3>
              <p className="text-paint-gray">We use premium quality paints from leading manufacturers like Sherwin-Williams, Benjamin Moore, and Behr. We select the appropriate type based on the surface, location, and your preferences, including options for low-VOC and eco-friendly paints.</p>
            </div>
            
            <div className="mb-6 bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-paint-blue mb-2">Do I need to move my furniture before you start?</h3>
              <p className="text-paint-gray">Our team can handle moving furniture to the center of the room and covering it for protection. For larger items, we may request your assistance or recommend they be moved before we arrive.</p>
            </div>
            
            <div className="mb-6 bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-paint-blue mb-2">Do you offer a warranty on your work?</h3>
              <p className="text-paint-gray">Yes, we provide a 2-year warranty on interior painting and a 5-year warranty on exterior painting. This covers any defects in our workmanship, such as peeling, blistering, or excessive fading.</p>
            </div>
            
            <div className="mb-6 bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-paint-blue mb-2">How do I prepare for a painting project?</h3>
              <p className="text-paint-gray">Remove any valuable or fragile items from the area, take down pictures or wall hangings, and provide clear access to the areas being painted. We'll handle the rest, including covering furniture and floors for protection.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-paint-blue text-white px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Painting Project?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and quote. Our team is ready to transform your space!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="btn-secondary" asChild>
              <Link to="/contact">Get a Free Quote</Link>
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-paint-blue" asChild>
              <a href="tel:1234567890">Call Us: (123) 456-7890</a>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Services;
