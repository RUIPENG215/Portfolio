import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const interactionDesignProjectIds = new Set(['5', '6', '7', '8']);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuPath, setMobileMenuPath] = useState<string | null>(null);
  const location = useLocation();
  const isMobileMenuOpen = mobileMenuPath === location.pathname;

  useEffect(() => {
    let frameId: number | null = null;

    const handleScroll = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(() => {
        const threshold = location.pathname === '/' ? window.innerHeight - 72 : 20;
        setIsScrolled(window.scrollY > threshold);
        frameId = null;
      });
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Design', path: '/design' },
    { name: 'Engineering', path: '/engineering' },
    { name: 'Humanities', path: '/humanities' },
    { name: 'Contact', path: '/contact' },
  ];

  const isPageDark = location.pathname.startsWith('/engineering');
  const isDesignProject = location.pathname.startsWith('/design/');
  const currentProjectId = isDesignProject ? location.pathname.split('/').pop() : null;
  const isInteractionProject = currentProjectId ? interactionDesignProjectIds.has(currentProjectId) : false;
  const isHumanities = location.pathname === '/humanities';
  
  const isNavbarDark = isPageDark || 
                       ((location.pathname === '/' || isInteractionProject) && !isScrolled);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none pt-4 md:pt-6"
    >
      <div className={`
        w-full border-y border-x-transparent pointer-events-auto
        ${isNavbarDark 
          ? `bg-transparent border-b border-white/10 text-[#e6edf3]` 
          : (isHumanities 
            ? `bg-transparent border-black/5 text-[#463220]` 
            : `bg-transparent border-black/5 text-gray-900`)}
      `}>
        <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 md:px-8">
          {/* Logo */}
          <Link to="/" onClick={() => setMobileMenuPath(null)} className="text-lg md:text-xl font-black tracking-tighter uppercase shrink-0">
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
                  className="relative px-4 py-1.5 text-sm font-medium"
                >
                  <span className={`relative z-10 ${
                    isActive 
                      ? (isNavbarDark ? 'text-white' : (isHumanities ? 'text-[#463220]' : 'text-black')) 
                      : (isNavbarDark ? 'text-gray-400' : (isHumanities ? 'text-[#8b7355]' : 'text-gray-500'))
                  } hover:text-current`}>
                    {item.name}
                  </span>
                  {isActive && (
                    <motion.div 
                      layoutId="nav-active"
                      className={`absolute inset-0 rounded-lg z-0 ${
                        isNavbarDark ? 'bg-white/10' : (isHumanities ? 'bg-[#463220]/5' : 'bg-black/5')
                      }`}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            type="button"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            className={`md:hidden p-2 rounded-xl ${
              isNavbarDark 
                ? 'hover:bg-white/5 text-white' 
                : (isHumanities ? 'hover:bg-black/5 text-[#463220]' : 'hover:bg-black/5 text-black')
            }`}
            onClick={() => setMobileMenuPath(isMobileMenuOpen ? null : location.pathname)}
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
            className={`absolute top-full left-4 right-4 mt-2 p-4 rounded-2xl border backdrop-blur-xl shadow-2xl pointer-events-auto md:hidden ${
              isNavbarDark 
                ? 'bg-black/80 border-white/10 text-white' 
                : (isHumanities 
                  ? 'bg-[#f4f1ea]/90 border-[#463220]/10 text-[#463220]' 
                  : 'bg-white/90 border-black/5 text-black')
            }`}
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || 
                                (item.path !== '/' && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuPath(null)}
                    className={`
                      px-4 py-3 rounded-xl text-lg font-bold transition-all
                      ${isActive 
                        ? (isNavbarDark ? 'bg-white/10 text-white' : (isHumanities ? 'bg-[#463220]/5 text-[#463220]' : 'bg-black/5 text-black')) 
                        : (isNavbarDark ? 'text-gray-400 hover:text-white' : (isHumanities ? 'text-[#8b7355] hover:text-[#463220]' : 'text-gray-500 hover:text-black'))}
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
