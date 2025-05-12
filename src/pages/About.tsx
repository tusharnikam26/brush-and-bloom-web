
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const About = () => {
  const milestones = [
    { year: '2005', event: 'Founded as a small residential painting service' },
    { year: '2010', event: 'Expanded to commercial painting services' },
    { year: '2015', event: 'Reached 1,000+ completed projects milestone' },
    { year: '2018', event: 'Introduced eco-friendly paint options' },
    { year: '2022', event: 'Opened second office location' },
    { year: '2023', event: 'Celebrated serving 5,000+ happy customers' }
  ];

  const values = [
    { title: 'Quality', description: 'We never compromise on quality and use premium materials for lasting results.' },
    { title: 'Integrity', description: 'We operate with honesty and transparency in all our client interactions.' },
    { title: 'Reliability', description: 'We honor our commitments and deliver projects on time and within budget.' },
    { title: 'Excellence', description: 'We constantly strive for excellence in our craft and customer service.' }
  ];

  const team = [
    { name: 'Robert Johnson', role: 'Founder & CEO', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { name: 'Sarah Williams', role: 'Operations Manager', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { name: 'Michael Davis', role: 'Lead Painter', image: 'https://randomuser.me/api/portraits/men/67.jpg' },
  ];

  return (
    <>
      <Navbar />
      
      {/* Page Header */}
      <section className="bg-paint-blue text-white pt-32 pb-20 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1562259929-b4e1fd3aef09')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About PaintPro</h1>
            <p className="text-xl text-gray-200">
              We're a team of passionate painting professionals dedicated to transforming spaces and exceeding client expectations.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <h2 className="section-title">Our Story</h2>
              <p className="mb-4 text-paint-gray">
                Founded in 2005, PaintPro began as a small residential painting service with a simple mission: to provide exceptional quality painting with outstanding customer service.
              </p>
              <p className="mb-4 text-paint-gray">
                What started as a small team has grown into a full-service painting company serving both residential and commercial clients across the region. Despite our growth, we've maintained our commitment to personalized service and attention to detail.
              </p>
              <p className="mb-6 text-paint-gray">
                Today, with thousands of completed projects, we continue to build our reputation one brush stroke at a time, focusing on quality craftsmanship and customer satisfaction.
              </p>
              
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-paint-terracotta">
                <p className="italic text-paint-gray font-medium">
                  "Our passion is transforming spaces and bringing our clients' visions to life through the power of color and quality craftsmanship."
                </p>
                <p className="mt-2 font-semibold">— Robert Johnson, Founder</p>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1562259929-b4e1fd3aef09" 
                  alt="Painting services" 
                  className="rounded-lg shadow-lg h-48 md:h-64 w-full object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1595815771614-ade1944a9d6b" 
                  alt="Team at work" 
                  className="rounded-lg shadow-lg h-48 md:h-64 w-full object-cover mt-8"
                />
                <img 
                  src="https://images.unsplash.com/photo-1586277641998-13c753e442b9" 
                  alt="Paint colors" 
                  className="rounded-lg shadow-lg h-48 md:h-64 w-full object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1580137189272-c9379f8864fd" 
                  alt="Professional results" 
                  className="rounded-lg shadow-lg h-48 md:h-64 w-full object-cover mt-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto">
          <h2 className="section-title text-center mx-auto w-fit mb-12">Our Journey</h2>
          
          <div className="relative flex flex-col items-center">
            {/* Vertical line */}
            <div className="absolute h-full w-0.5 bg-paint-blue left-1/2 transform -translate-x-1/2"></div>
            
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex w-full items-center justify-between mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <h3 className="text-xl font-bold text-paint-blue">{milestone.year}</h3>
                  <p className="text-paint-gray">{milestone.event}</p>
                </div>
                
                <div className="w-2/12 flex justify-center">
                  <div className="bg-paint-terracotta rounded-full h-6 w-6 border-4 border-white shadow-lg z-10"></div>
                </div>
                
                <div className="w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto">
          <h2 className="section-title text-center mx-auto w-fit mb-12">Our Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border-t-4 border-paint-blue">
                <h3 className="text-xl font-bold mb-3 text-paint-blue">{value.title}</h3>
                <p className="text-paint-gray">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto">
          <h2 className="section-title text-center mx-auto w-fit mb-12">Meet Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-paint-blue">{member.name}</h3>
                  <p className="text-paint-gray">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-white p-8 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-bold text-paint-blue mb-4">Join Our Team</h3>
            <p className="text-paint-gray mb-6">
              We're always looking for talented painters and team members who share our values and commitment to excellence.
            </p>
            <Button className="btn-primary">View Open Positions</Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-paint-blue text-white px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Space?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and quote. Let's bring your vision to life!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="btn-secondary" asChild>
              <Link to="/contact">Get a Free Quote</Link>
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-paint-blue" asChild>
              <Link to="/services">Explore Our Services</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default About;
