import { useEffect, useLayoutEffect } from 'react';
import type { ReactNode } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';

interface PageWrapperProps {
  children: ReactNode;
}

// 页面切换：旧页面轻轻上移、淡出并略微虚化；新页面从下方淡入、由虚到实。
// 没有任何遮罩层，过渡期间不会出现整屏纯色。
const pageVariants: Variants = {
  initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
  enter: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    transitionEnd: { transform: 'none', filter: 'none' },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: 'blur(4px)',
    transition: { duration: 0.32, ease: [0.4, 0, 1, 1] },
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

    let saveTimer: number | undefined;

    const handleScroll = () => {
      window.clearTimeout(saveTimer);
      saveTimer = window.setTimeout(saveScroll, 160);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('pagehide', saveScroll);
    
    return () => {
      window.clearTimeout(saveTimer);
      saveScroll();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pagehide', saveScroll);
    };
  }, [pathname]);

  return (
    <>
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        className="w-full min-h-screen origin-top"
      >
        {children}
      </motion.div>
    </>
  );
};
