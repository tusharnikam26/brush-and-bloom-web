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

// Other data fetching hooks would be defined here
