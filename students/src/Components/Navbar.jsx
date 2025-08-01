import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import ProfileModal from './ProfileModal';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', href: '/', section: 'home' },
    { name: 'Find Tutors', href: '/search', section: null },
    { name: 'Messages', href: '/messages', section: null },
    { name: 'Profile', href: null, section: null, action: 'profile' }
  ];

  const handleNavClick = (item) => {
    if (item.action === 'profile') {
      setShowProfile(true);
    } else if (item.href === '/search') {
      navigate('/search');
    } else if (item.href === '/messages') {
      navigate('/messages');
    } else if (item.section) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(item.section);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        const element = document.getElementById(item.section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else if (item.href) {
      navigate(item.href);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative z-50">
      <nav className="fixed md:top-8 top-0 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900 text-white shadow-md md:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 max-w-7xl w-full md:w-[calc(100%-1.5rem)] mx-auto md:mx-3">
        <div className="flex justify-between items-center">

          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wide bg-slate-800 px-2 sm:px-3 py-1 rounded-lg">
            Study<span className="text-blue-400">Hub</span>
          </h1>


          <ul className="hidden md:flex space-x-4 lg:space-x-6 items-center font-semibold text-sm lg:text-base">
            {navItems.map((item) => (
              <motion.li
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer transition text-white/80 hover:text-white"
              >
                <a 
                  onClick={() => handleNavClick(item)}
                  className="cursor-pointer hover:text-blue-300 transition-colors"
                >
                  {item.name.toUpperCase()}
                </a>
              </motion.li>
            ))}
          </ul>


          <div className="md:hidden flex items-center ml-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <motion.div className="w-6 h-5 flex flex-col justify-between">
                <motion.span
                  className={`h-0.5 w-full bg-white block rounded-sm transition-all duration-300 ${
                    isOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                ></motion.span>
                <motion.span
                  className={`h-0.5 w-full bg-white block rounded-sm transition-all duration-300 ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></motion.span>
                <motion.span
                  className={`h-0.5 w-full bg-white block rounded-sm transition-all duration-300 ${
                    isOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></motion.span>
              </motion.div>
            </button>
          </div>
        </div>


        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-slate-800 px-4 sm:px-6 py-4 text-white font-semibold rounded-b-2xl space-y-3 [&>div]:border-b [&>div]:border-white/20 [&>div]:pb-2 absolute right-0 w-56 sm:w-64 top-full mt-2 text-sm sm:text-base"
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-b border-gray-700 pb-3"
                >
                  <a
                    onClick={() => handleNavClick(item)}
                    className="cursor-pointer flex justify-end w-full text-white/80 hover:text-blue-300 transition-colors"
                  >
                    {item.name.toUpperCase()}
                  </a>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      
      <ProfileModal 
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
      />
    </div>
  );
}
