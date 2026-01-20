import { useEffect, useLayoutEffect } from 'react';
import type { ReactNode } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';

interface PageWrapperProps {
  children: ReactNode;
}

const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // Quartic ease out
    },
    transitionEnd: {
      transform: "none", 
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  },
};

export const PageWrapper = ({ children }: PageWrapperProps) => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  // 1. Handle scroll restoration on mount
  useLayoutEffect(() => {
    // If it's a POP (back/forward), try to restore scroll
    if (navigationType === 'POP') {
      const savedPosition = sessionStorage.getItem(`scroll:${pathname}`);
      if (savedPosition) {
        // Use requestAnimationFrame to ensure the DOM is ready
        requestAnimationFrame(() => {
          window.scrollTo(0, parseInt(savedPosition, 10));
        });
      }
    } else {
      // For PUSH or REPLACE, always scroll to top
      window.scrollTo(0, 0);
    }
  }, [pathname, navigationType]);

  // 2. Save scroll position before unmounting or when pathname changes
  useEffect(() => {
    const saveScroll = () => {
      sessionStorage.setItem(`scroll:${pathname}`, window.scrollY.toString());
    };

    // Save on scroll (throttled/debounced implicitly by the browser's scroll event frequency)
    // but we'll use a passive listener for performance
    const handleScroll = () => {
      // We don't need to save on every single pixel, but it's safe to do so
      // as long as we don't do heavy work here.
      saveScroll();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Also save when the component is about to unmount
    return () => {
      saveScroll();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="w-full min-h-screen origin-top"
    >
      {children}
    </motion.div>
  );
};
