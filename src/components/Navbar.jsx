import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';

import logo from "../assets/logo-web.avif";

export default function Navbar({ onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (path) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.href = path;
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img src={logo} alt="FLAIR Logo" className="h-10" />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => handleNavClick('/')}
              className="text-sm font-medium tracking-wide uppercase transition-colors hover:text-gray-600"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('/admin')}
              className="text-sm font-medium tracking-wide uppercase transition-colors hover:text-gray-600"
            >
              Dashboard
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => handleNavClick('/cart')}>
              <ShoppingBag className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-gray-200 mt-4">
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => handleNavClick('/')}
                className="text-sm font-medium tracking-wide uppercase transition-colors hover:text-gray-600 text-left"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavClick('/admin')}
                className="text-sm font-medium tracking-wide uppercase transition-colors hover:text-gray-600 text-left"
              >
                Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}