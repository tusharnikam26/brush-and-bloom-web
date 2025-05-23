
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import ServicesPreview from '@/components/home/ServicesPreview';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import HousePaintingSection from '@/components/home/HousePaintingSection';

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServicesPreview />
        <HousePaintingSection />
        <WhyChooseUs />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
