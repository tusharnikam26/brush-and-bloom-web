
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Calendar, Clock, UserCheck } from 'lucide-react';
import { toast } from 'sonner';

// Mock data for nearby projects
const nearbyProjects = [
  {
    id: 1,
    title: "Modern Townhouse Exterior",
    address: "123 Pine Avenue, Oakwood",
    distance: "0.8 miles away",
    startDate: "May 5, 2023",
    duration: "3 days",
    projectType: "Exterior Painting",
    image: "/placeholder.svg",
    description: "Complete exterior repaint of a modern townhouse, including trim work and front door accent color.",
    inProgress: true
  },
  {
    id: 2,
    title: "Victorian Home Restoration",
    address: "78 Heritage Lane, Oakwood",
    distance: "1.2 miles away",
    startDate: "April 28, 2023",
    duration: "7 days",
    projectType: "Historical Restoration",
    image: "/placeholder.svg",
    description: "Restoration of a Victorian-era home with period-appropriate colors and delicate trim work.",
    inProgress: true
  },
  {
    id: 3,
    title: "Office Building Refresh",
    address: "550 Commerce Drive, Business District",
    distance: "1.5 miles away",
    startDate: "May 12, 2023",
    duration: "5 days",
    projectType: "Commercial Painting",
    image: "/placeholder.svg",
    description: "Complete interior repainting of a three-story office building with modern, productivity-enhancing colors.",
    inProgress: false
  },
  {
    id: 4,
    title: "Lakeside Cabin Waterproofing",
    address: "25 Lake View Road, North Shore",
    distance: "2.3 miles away",
    startDate: "May 3, 2023",
    duration: "2 days",
    projectType: "Waterproofing",
    image: "/placeholder.svg",
    description: "Waterproofing treatment for a lakeside cabin, protecting it from moisture damage and extending its lifespan.",
    inProgress: true
  },
  {
    id: 5,
    title: "Community Center Mural",
    address: "300 Main Street, Downtown",
    distance: "0.5 miles away",
    startDate: "May 15, 2023",
    duration: "10 days",
    projectType: "Mural & Specialty Work",
    image: "/placeholder.svg",
    description: "Creation of a community-inspired mural on the exterior wall of the downtown community center.",
    inProgress: false
  }
];

const ProjectsNearby = () => {
  const [zipCode, setZipCode] = useState('');
  const [location, setLocation] = useState('');
  const [projects, setProjects] = useState(nearbyProjects);
  const [isLoading, setIsLoading] = useState(false);
  const [showLocationInput, setShowLocationInput] = useState(false);

  const handleDetectLocation = () => {
    setIsLoading(true);
    
    // In a real app, this would use the browser's geolocation API
    setTimeout(() => {
      setLocation('Oakwood Area');
      setIsLoading(false);
      toast.success("Location detected: Oakwood Area");
      // Would normally re-fetch projects based on location
    }, 1000);
  };

  const handleZipCodeSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipCode || zipCode.length < 5) {
      toast.error("Please enter a valid ZIP code");
      return;
    }

    setIsLoading(true);
    
    // In a real app, this would call an API to get projects near this zip code
    setTimeout(() => {
      setLocation(`Area: ${zipCode}`);
      setIsLoading(false);
      toast.success(`Showing projects near ZIP code: ${zipCode}`);
      // Would normally re-fetch projects based on ZIP
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-paint-blue mb-6">Projects Near You</h1>
          <p className="text-lg text-paint-gray mb-8 max-w-3xl">
            See what we're working on in your neighborhood. Viewing our ongoing projects helps you get a sense
            of our quality and process. You might even spot your future paint colors in action!
          </p>
          
          <div className="bg-white p-6 rounded-lg shadow-sm mb-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold mb-1">Find Projects In Your Area</h2>
                <p className="text-paint-gray">
                  {location ? `Showing projects near: ${location}` : "Detect your location or enter your ZIP code"}
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowLocationInput(!showLocationInput)}
                  className="whitespace-nowrap"
                >
                  {showLocationInput ? 'Cancel' : 'Enter ZIP Code'}
                </Button>
                <Button 
                  onClick={handleDetectLocation}
                  disabled={isLoading}
                  className="whitespace-nowrap"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  {isLoading ? 'Detecting...' : 'Detect My Location'}
                </Button>
              </div>
            </div>
            
            {showLocationInput && (
              <form onSubmit={handleZipCodeSearch} className="mt-4 flex gap-2">
                <Input
                  placeholder="Enter ZIP code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="max-w-xs"
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Searching...' : 'Search'}
                </Button>
              </form>
            )}
          </div>
          
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(project => (
                <div key={project.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <div className="h-48 relative">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    {project.inProgress && (
                      <div className="absolute top-4 right-4 bg-paint-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                        In Progress
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                    <div className="flex items-start gap-2 mb-2 text-paint-gray">
                      <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                      <div>
                        <div>{project.address}</div>
                        <div className="text-sm text-paint-terracotta font-medium">{project.distance}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-paint-gray">
                        <Calendar size={18} />
                        <span>{project.startDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-paint-gray">
                        <Clock size={18} />
                        <span>{project.duration}</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <span className="inline-block bg-gray-100 text-paint-gray rounded-full px-3 py-1 text-sm font-semibold mr-2">
                        {project.projectType}
                      </span>
                    </div>
                    <p className="text-paint-gray mb-4">{project.description}</p>
                    <div className="flex justify-between items-center">
                      <Button variant="outline">View Details</Button>
                      <div className="flex items-center text-sm">
                        <UserCheck className="text-paint-blue mr-1" size={16} />
                        <span>Verified Project</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <p className="text-2xl text-paint-gray mb-4">No projects found in your area yet</p>
              <p className="text-paint-gray max-w-md mx-auto mb-6">
                We may not have any current projects in your neighborhood, but we'd be happy to discuss your
                painting needs for a future project.
              </p>
              <Button asChild>
                <a href="/book-service">Schedule a Consultation</a>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProjectsNearby;
