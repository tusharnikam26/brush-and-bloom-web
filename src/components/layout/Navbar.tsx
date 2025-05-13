import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogOut, ShoppingCart } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";
import { isAdmin } from '@/utils/authUtils';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Check if user is logged in and admin status
    const checkLoginStatus = () => {
      const user = localStorage.getItem('user');
      setIsLoggedIn(!!user);
      
      if (user) {
        setUserIsAdmin(isAdmin());
      } else {
        setUserIsAdmin(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    checkLoginStatus();
    
    // Listen for storage changes (for login/logout)
    window.addEventListener('storage', checkLoginStatus);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserIsAdmin(false);
    navigate('/');
  };

  const dashboardLink = userIsAdmin ? "/admin" : "/dashboard";
  const dashboardLabel = userIsAdmin ? "Admin Dashboard" : "Dashboard";

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center" onClick={closeMenu}>
          <span className="text-paint-blue font-bold text-2xl">Paint<span className="text-paint-terracotta">Pro</span></span>
        </Link>

        <div className="flex items-center gap-4">
          {isMobile ? (
            <button onClick={toggleMenu} className="text-paint-blue hover:text-paint-terracotta focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          ) : (
            <>
              <NavigationMenu className="hidden md:flex">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link to="/" className="text-paint-gray hover:text-paint-blue font-medium transition-colors px-3">Home</Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/about" className="text-paint-gray hover:text-paint-blue font-medium transition-colors px-3">About</Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-paint-gray hover:text-paint-blue font-medium">Services</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-4 w-[400px]">
                        <Link to="/services" className="font-medium">All Services</Link>
                        <hr />
                        <Link to="/services?type=interior" className="text-sm">Interior Painting</Link>
                        <Link to="/services?type=exterior" className="text-sm">Exterior Painting</Link>
                        <Link to="/services?type=commercial" className="text-sm">Commercial Services</Link>
                        <Link to="/services?type=residential" className="text-sm">Residential Services</Link>
                        <Link to="/services?type=waterproofing" className="text-sm">Waterproofing</Link>
                        <Link to="/services?type=stencil" className="text-sm">Stencil & Texture</Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-paint-gray hover:text-paint-blue font-medium">Tools</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-4 w-[300px]">
                        <Link to="/color-preview" className="font-medium">Virtual Paint Tool</Link>
                        <Link to="/book-service" className="font-medium">Book a Service</Link>
                        <Link to="/products" className="font-medium">Select Products</Link>
                        <Link to="/projects-nearby" className="font-medium">Projects Near You</Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/gallery" className="text-paint-gray hover:text-paint-blue font-medium transition-colors px-3">Gallery</Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/testimonials" className="text-paint-gray hover:text-paint-blue font-medium transition-colors px-3">Testimonials</Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/blog" className="text-paint-gray hover:text-paint-blue font-medium transition-colors px-3">Blog</Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/contact" className="text-paint-gray hover:text-paint-blue font-medium transition-colors px-3">Contact</Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              
              <div className="flex items-center gap-2">
                <Link to="/products">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <ShoppingCart className="h-[1.2rem] w-[1.2rem]" />
                  </Button>
                </Link>
                
                {isLoggedIn ? (
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="flex items-center gap-2" asChild>
                      <Link to={dashboardLink}>
                        <User size={16} />
                        {dashboardLabel}
                      </Link>
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2" onClick={handleLogout}>
                      <LogOut size={16} />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button className="btn-secondary" asChild>
                    <Link to="/login">Login / Register</Link>
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="bg-white shadow-lg absolute top-full left-0 w-full border-t border-gray-100 animate-accordion-down">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link to="/" 
              className="text-paint-gray hover:text-paint-blue font-medium transition-colors py-2 px-4 hover:bg-gray-50 rounded" 
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link to="/about"
              className="text-paint-gray hover:text-paint-blue font-medium transition-colors py-2 px-4 hover:bg-gray-50 rounded" 
              onClick={closeMenu}
            >
              About
            </Link>
            
            <div className="py-2 px-4">
              <div className="font-medium mb-1">Services</div>
              <div className="pl-4 flex flex-col gap-1">
                <Link to="/services" 
                  className="text-sm text-paint-gray hover:text-paint-blue transition-colors py-1"
                  onClick={closeMenu}
                >
                  All Services
                </Link>
                <Link to="/services?type=interior" 
                  className="text-sm text-paint-gray hover:text-paint-blue transition-colors py-1"
                  onClick={closeMenu}
                >
                  Interior Painting
                </Link>
                <Link to="/services?type=exterior" 
                  className="text-sm text-paint-gray hover:text-paint-blue transition-colors py-1"
                  onClick={closeMenu}
                >
                  Exterior Painting
                </Link>
                <Link to="/services?type=commercial" 
                  className="text-sm text-paint-gray hover:text-paint-blue transition-colors py-1"
                  onClick={closeMenu}
                >
                  Commercial Services
                </Link>
                <Link to="/services?type=residential" 
                  className="text-sm text-paint-gray hover:text-paint-blue transition-colors py-1"
                  onClick={closeMenu}
                >
                  Residential Services
                </Link>
              </div>
            </div>
            <Link to="/gallery" 
              className="text-paint-gray hover:text-paint-blue font-medium transition-colors py-2 px-4 hover:bg-gray-50 rounded"
              onClick={closeMenu}
            >
              Gallery
            </Link>
            <Link to="/color-preview" 
              className="text-paint-gray hover:text-paint-blue font-medium transition-colors py-2 px-4 hover:bg-gray-50 rounded"
              onClick={closeMenu}
            >
              Virtual Paint Tool
            </Link>
            <Link to="/products" 
              className="text-paint-gray hover:text-paint-blue font-medium transition-colors py-2 px-4 hover:bg-gray-50 rounded"
              onClick={closeMenu}
            >
              Products
            </Link>
            <Link to="/book-service" 
              className="text-paint-gray hover:text-paint-blue font-medium transition-colors py-2 px-4 hover:bg-gray-50 rounded"
              onClick={closeMenu}
            >
              Book a Service
            </Link>
            <Link to="/projects-nearby" 
              className="text-paint-gray hover:text-paint-blue font-medium transition-colors py-2 px-4 hover:bg-gray-50 rounded"
              onClick={closeMenu}
            >
              Projects Near You
            </Link>
            <Link to="/testimonials" 
              className="text-paint-gray hover:text-paint-blue font-medium transition-colors py-2 px-4 hover:bg-gray-50 rounded"
              onClick={closeMenu}
            >
              Testimonials
            </Link>
            <Link to="/blog" 
              className="text-paint-gray hover:text-paint-blue font-medium transition-colors py-2 px-4 hover:bg-gray-50 rounded"
              onClick={closeMenu}
            >
              Blog
            </Link>
            <Link to="/contact" 
              className="text-paint-gray hover:text-paint-blue font-medium transition-colors py-2 px-4 hover:bg-gray-50 rounded"
              onClick={closeMenu}
            >
              Contact
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link to={dashboardLink}
                  className="text-paint-gray hover:text-paint-blue font-medium transition-colors py-2 px-4 hover:bg-gray-50 rounded flex items-center gap-2"
                  onClick={closeMenu}
                >
                  <User size={16} />
                  {dashboardLabel}
                </Link>
                <button 
                  className="text-left text-paint-gray hover:text-paint-blue font-medium transition-colors py-2 px-4 hover:bg-gray-50 rounded flex items-center gap-2"
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <Button className="btn-secondary w-full" asChild>
                <Link to="/login" onClick={closeMenu}>
                  Login / Register
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
