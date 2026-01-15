import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Design', path: '/design' },
    { name: 'Engineering', path: '/engineering' },
    { name: 'Humanities', path: '/humanities' },
    { name: 'Contact', path: '/contact' },
  ];

  const isPageDark = location.pathname.startsWith('/engineering');
  const isNavbarDark = isPageDark || (location.pathname === '/' && !isScrolled);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none pt-4 md:pt-6"
    >
      <div className={`
        w-full border-y border-x-transparent pointer-events-auto
        backdrop-blur-sm transition-all duration-500
        ${isNavbarDark 
          ? `bg-gray-950/${isScrolled ? '70' : '20'} border-white/10 text-white` 
          : `bg-white/${isScrolled ? '60' : '30'} border-black/5 text-gray-900`}
      `}>
        <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 md:px-8">
          {/* Logo */}
          <Link to="/" className="text-lg md:text-xl font-black tracking-tighter uppercase shrink-0">
            RUIPENG
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                              (item.path !== '/' && location.pathname.startsWith(item.path));
              
              return (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className="relative px-4 py-1.5 text-sm font-medium transition-colors"
                >
                  <span className={`relative z-10 ${isActive ? (isNavbarDark ? 'text-white' : 'text-black') : (isNavbarDark ? 'text-gray-400' : 'text-gray-500')} hover:text-current transition-colors`}>
                    {item.name}
                  </span>
                  {isActive && (
                    <motion.div 
                      layoutId="nav-active"
                      className={`absolute inset-0 rounded-lg z-0 ${isNavbarDark ? 'bg-white/10' : 'bg-black/5'}`}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`md:hidden p-2 rounded-xl transition-colors ${isNavbarDark ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-4 right-4 mt-2 p-4 rounded-2xl border backdrop-blur-sm shadow-2xl pointer-events-auto md:hidden"
            style={{
              backgroundColor: isNavbarDark ? 'rgba(3, 7, 18, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              borderColor: isNavbarDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
              color: isNavbarDark ? 'white' : 'black'
            }}
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || 
                                (item.path !== '/' && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      px-4 py-3 rounded-xl text-lg font-bold transition-all
                      ${isActive 
                        ? (isNavbarDark ? 'bg-white/10 text-white' : 'bg-black/5 text-black') 
                        : (isNavbarDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black')}
                    `}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
