
// This is a mock service that simulates fetching data from a backend
// In a real implementation, this would connect to your API

import { useQuery } from '@tanstack/react-query';

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  date: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  imageUrl?: string;
}

interface Service {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  features: string[];
}

const BASE_URL = '/api'; // This would be your actual API endpoint

// Mock data - in a real app, these would be API calls
const mockProjects: Project[] = [
  {
    id: 1,
    title: 'Modern Kitchen Transformation',
    description: 'Complete repainting of kitchen cabinets and walls',
    imageUrl: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09',
    category: 'Interior',
    date: '2024-04-15'
  },
  {
    id: 2,
    title: 'Victorian House Exterior',
    description: 'Full exterior restoration with period-accurate colors',
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f',
    category: 'Exterior',
    date: '2024-03-22'
  },
  {
    id: 3,
    title: 'Corporate Office Refresh',
    description: 'Modern color scheme for productivity-focused environment',
    imageUrl: 'https://images.unsplash.com/photo-1562259929-a12aa8898506',
    category: 'Commercial',
    date: '2024-02-10'
  },
  {
    id: 4,
    title: 'Textured Accent Wall',
    description: 'Custom textured finish with metallic highlights',
    imageUrl: 'https://images.unsplash.com/photo-1599619351208-3e6c839d6828',
    category: 'Specialty',
    date: '2024-01-30'
  }
];

const mockTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Homeowner",
    content: "The team transformed our outdated kitchen into a modern masterpiece. The attention to detail on the cabinet painting was exceptional!",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Roberts",
    role: "Business Owner",
    content: "Our office space looks completely refreshed. The team worked after hours to minimize disruption to our business.",
    rating: 5
  },
  {
    id: 3,
    name: "Jennifer Williams",
    role: "Interior Designer",
    content: "As a designer, I have high standards. This company exceeded my expectations with their precision and color matching skills.",
    rating: 4
  }
];

const mockServices: Service[] = [
  {
    id: 1,
    title: "Interior Painting",
    description: "Transform your indoor spaces with our premium interior painting services",
    imageUrl: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09",
    features: ["Eco-friendly paint options", "Color consultation included", "Precise edge work", "Furniture protection"]
  },
  {
    id: 2,
    title: "Exterior Painting",
    description: "Enhance your home's curb appeal with durable, weather-resistant exterior painting",
    imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f",
    features: ["Weather-resistant finishes", "Wood repair and preparation", "Multi-year warranty", "Pressure washing included"]
  },
  {
    id: 3,
    title: "Commercial Services",
    description: "Minimize business disruption with our efficient commercial painting services",
    imageUrl: "https://images.unsplash.com/photo-1562259929-a12aa8898506",
    features: ["After-hours scheduling", "Fast-drying paint options", "Brand color matching", "Liability insurance coverage"]
  }
];

// Simulated API functions
const fetchHeroImages = async (): Promise<string[]> => {
  // In a real app: const response = await fetch(`${BASE_URL}/hero-images`);
  // return await response.json();
  
  // Simulated response:
  return mockProjects.map(project => project.imageUrl);
};

const fetchProjects = async (): Promise<Project[]> => {
  // In a real app: const response = await fetch(`${BASE_URL}/projects`);
  // return await response.json();
  
  // Simulated response:
  return mockProjects;
};

const fetchTestimonials = async (): Promise<Testimonial[]> => {
  // In a real app: const response = await fetch(`${BASE_URL}/testimonials`);
  // return await response.json();
  
  return mockTestimonials;
};

const fetchServices = async (): Promise<Service[]> => {
  // In a real app: const response = await fetch(`${BASE_URL}/services`);
  // return await response.json();
  
  return mockServices;
};

// React Query hooks for data fetching
export const useHeroImages = () => {
  return useQuery({
    queryKey: ['heroImages'],
    queryFn: fetchHeroImages
  });
};

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects
  });
};

export const useTestimonials = () => {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: fetchTestimonials
  });
};

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: fetchServices
  });
};

// Export types for use in other components
export type { Project, Testimonial, Service };
