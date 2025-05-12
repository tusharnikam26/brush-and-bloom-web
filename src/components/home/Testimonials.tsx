
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Michael Johnson',
    role: 'Homeowner',
    content: 'The team at PaintPro did an amazing job painting the interior of my home. They were professional, efficient, and the results exceeded my expectations. I highly recommend their services!',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    name: 'Sarah Williams',
    role: 'Business Owner',
    content: 'We hired PaintPro for our office renovation, and they delivered exceptional quality work. Their attention to detail and commitment to deadlines made the project stress-free.',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    name: 'David Thompson',
    role: 'Property Manager',
    content: 'I\'ve worked with many painting contractors over the years, and PaintPro stands out for their reliability and consistent quality. They\'ve become our go-to painting service.',
    rating: 4,
    image: 'https://randomuser.me/api/portraits/men/67.jpg'
  }
];

const Testimonials = () => {
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} 
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title mx-auto w-fit">What Our Clients Say</h2>
          <p className="text-lg text-paint-gray max-w-3xl mx-auto">
            Don't take our word for it. Here's what our satisfied customers have to say about our painting services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="rounded-full w-16 h-16 object-cover border-2 border-paint-blue"
                />
                <div>
                  <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-700 italic">&ldquo;{testimonial.content}&rdquo;</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <a href="#" className="inline-flex items-center text-paint-blue hover:text-paint-terracotta font-medium">
            View All Reviews
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
