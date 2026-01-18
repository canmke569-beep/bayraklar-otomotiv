'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail, Search } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  { name: 'VİTRİN', href: '#vitrin' },
  { name: 'HAKKIMIZDA', href: '#hakkimizda' },
  { name: 'BLOG', href: '#blog' },
  { name: 'EKİBİMİZ', href: '#ekibimiz' },
  { name: 'İLETİŞİM', href: '#iletisim' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `https://bayraklarotomotiv.sahibinden.com/?query_text=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Main Navigation */}
      <div className={`transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center cursor-pointer"
            >
              <img 
                src="/bayraklaroto.png" 
                alt="Bayraklar Otomotiv" 
                className="h-20 w-auto"
              />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.querySelector(link.href);
                    if (target) {
                      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="text-sm font-bold text-gray-900 hover:text-[#dc2626] transition-colors tracking-wide cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Search & CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="relative">
                <button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 text-gray-600 hover:text-[#dc2626] transition-colors"
                >
                  <Search size={20} />
                </button>
                
                {/* Search Dropdown */}
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-gray-100 p-4"
                    >
                      <form onSubmit={handleSearch}>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Araç ara... (Marka, Model)"
                            className="flex-1 px-4 py-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#dc2626] transition-all"
                            autoFocus
                          />
                          <button
                            type="submit"
                            className="p-3 bg-[#dc2626] text-white rounded-xl hover:bg-[#b91c1c] transition-colors"
                          >
                            <Search size={18} />
                          </button>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">Sahibinden'de arama yapılacak</p>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <a
                href="https://bayraklarotomotiv.sahibinden.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-[#dc2626] text-white font-semibold rounded-lg hover:bg-[#b91c1c] transition-colors"
              >
                Araçları İncele
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t shadow-lg"
          >
            <div className="max-w-7xl mx-auto px-4 py-4">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      const target = document.querySelector(link.href);
                      if (target) {
                        setTimeout(() => {
                          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 100);
                      }
                    }}
                    className="px-4 py-3 text-gray-700 hover:text-[#334155] hover:bg-gray-50 rounded-lg transition-colors font-medium cursor-pointer"
                  >
                    {link.name}
                  </a>
                ))}
                <a
                  href="https://bayraklarotomotiv.sahibinden.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 px-6 py-3 bg-[#1a1a1a] text-white font-semibold rounded-lg text-center"
                >
                  Araçları İncele
                </a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
