
import React from 'react';

const features = [
  {
    icon: '✓',
    title: 'Licensed & Insured',
    description: 'Our team is fully licensed and insured, giving you peace of mind throughout your project.'
  },
  {
    icon: '🛠️',
    title: 'Expert Craftsmen',
    description: 'Our painters have years of experience and undergo continuous training to deliver outstanding results.'
  },
  {
    icon: '⏱️',
    title: 'On-Time Completion',
    description: 'We respect your time and commit to completing projects on schedule without compromising quality.'
  },
  {
    icon: '🌱',
    title: 'Eco-Friendly Options',
    description: 'We offer low-VOC and eco-friendly paint options for healthier living environments.'
  },
  {
    icon: '📋',
    title: 'Detailed Estimates',
    description: 'Receive comprehensive quotes with no hidden fees or unexpected costs during your project.'
  },
  {
    icon: '👍',
    title: '100% Satisfaction',
    description: 'We\'re not finished until you\'re completely satisfied with our work.'
  }
];

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title mx-auto w-fit">Why Choose PaintPro</h2>
          <p className="text-lg text-paint-gray max-w-3xl mx-auto">
            With years of experience and a commitment to excellence, we deliver painting services that exceed expectations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-paint-blue text-white w-12 h-12 rounded-full flex items-center justify-center text-xl mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-paint-blue">{feature.title}</h3>
              <p className="text-paint-gray">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gray-50 p-8 rounded-lg border border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold text-paint-blue mb-2">Our Quality Guarantee</h3>
              <p className="text-paint-gray">
                We stand behind our work with a 5-year warranty. If any issues arise from our workmanship, we'll fix it at no additional cost.
              </p>
            </div>
            <div className="shrink-0">
              <img src="https://cdn-icons-png.flaticon.com/512/1067/1067357.png" alt="Quality Guarantee" className="w-24 h-24" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
