
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

    // Check if user is logged in
    const checkLoginStatus = () => {
      const user = localStorage.getItem('user');
      setIsLoggedIn(!!user);
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
    navigate('/');
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
                <Link to="/color-preview" className="text-paint-gray hover:text-paint-blue font-medium transition-colors">
                  Color Preview
                </Link>
              </div>
              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="flex items-center gap-2" asChild>
                    <Link to="/dashboard">
                      <User size={16} />
                      Dashboard
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
            <Link to="/color-preview" 
              className="text-paint-gray hover:text-paint-blue font-medium transition-colors py-2 px-4 hover:bg-gray-50 rounded"
              onClick={closeMenu}
            >
              Color Preview
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" 
                  className="text-paint-gray hover:text-paint-blue font-medium transition-colors py-2 px-4 hover:bg-gray-50 rounded flex items-center gap-2"
                  onClick={closeMenu}
                >
                  <User size={16} />
                  Dashboard
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
