
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

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
          <a href="tel:+1234567890" className="hidden md:flex items-center text-paint-blue font-medium">
            <Phone className="h-5 w-5 mr-2" />
            <span>(123) 456-7890</span>
          </a>

          {isMobile ? (
            <button onClick={toggleMenu} className="text-paint-blue hover:text-paint-terracotta focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          ) : (
            <>
              <div className="hidden md:flex items-center space-x-6">
                <Link to="/" className="text-paint-gray hover:text-paint-blue font-medium transition-colors">Home</Link>
                <Link to="/about" className="text-paint-gray hover:text-paint-blue font-medium transition-colors">About</Link>
                <Link to="/services" className="text-paint-gray hover:text-paint-blue font-medium transition-colors">Services</Link>
                <Link to="/gallery" className="text-paint-gray hover:text-paint-blue font-medium transition-colors">Gallery</Link>
                <Link to="/contact" className="text-paint-gray hover:text-paint-blue font-medium transition-colors">Contact</Link>
              </div>
              <Button className="btn-secondary">
                Book Now
              </Button>
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
            <Link to="/services" 
              className="text-paint-gray hover:text-paint-blue font-medium transition-colors py-2 px-4 hover:bg-gray-50 rounded"
              onClick={closeMenu}
            >
              Services
            </Link>
            <Link to="/gallery" 
              className="text-paint-gray hover:text-paint-blue font-medium transition-colors py-2 px-4 hover:bg-gray-50 rounded"
              onClick={closeMenu}
            >
              Gallery
            </Link>
            <Link to="/contact" 
              className="text-paint-gray hover:text-paint-blue font-medium transition-colors py-2 px-4 hover:bg-gray-50 rounded"
              onClick={closeMenu}
            >
              Contact
            </Link>
            <Button className="btn-secondary w-full">
              Book Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
