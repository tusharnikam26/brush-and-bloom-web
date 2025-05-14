
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, PaintBucket, Brush, BuildingIcon, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const serviceData = [
  {
    title: 'Interior Painting',
    description: 'Professional interior painting services for a fresh, new look in any room of your home.',
    icon: <Brush className="h-10 w-10 text-paint-blue" />,
    link: '/services#interior'
  },
  {
    title: 'Exterior Painting',
    description: 'Protect your property from the elements while enhancing curb appeal with our exterior painting.',
    icon: <PaintBucket className="h-10 w-10 text-paint-blue" />,
    link: '/services#exterior'
  },
  {
    title: 'Commercial Painting',
    description: 'Create the right impression for your business with our commercial painting solutions.',
    icon: <BuildingIcon className="h-10 w-10 text-paint-blue" />,
    link: '/services#commercial'
  },
  {
    title: 'Residential Painting',
    description: 'Transform your home with our premium residential painting services, tailored to your style.',
    icon: <Home className="h-10 w-10 text-paint-blue" />,
    link: '/services#residential'
  }
];

const ServicesPreview = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title mx-auto w-fit">Our Professional Services</h2>
          <p className="text-lg text-paint-gray max-w-3xl mx-auto">
            We offer a comprehensive range of painting services to meet all your needs. 
            Our team of experienced professionals delivers exceptional results.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceData.map((service, index) => (
            <Card key={index} className="border-t-4 border-t-paint-blue hover:-translate-y-1 transition-transform duration-300">
              <CardHeader>
                <div className="mb-4">{service.icon}</div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="group text-paint-blue p-0 hover:text-paint-terracotta" asChild>
                  <Link to={service.link}>
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="btn-primary" asChild>
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
