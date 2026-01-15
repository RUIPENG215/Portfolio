import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import type { ReactNode } from 'react';

interface HeroProps {
  children?: ReactNode;
}

const BackgroundElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating grid lines with spotlight effect */}
      <motion.div 
        animate={{ 
          opacity: [0.08, 0.15, 0.08],
          maskImage: [
            'radial-gradient(circle at 80% 20%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%), radial-gradient(circle at 15% 85%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 40%)',
            'radial-gradient(circle at 90% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%), radial-gradient(circle at 15% 85%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 40%)',
            'radial-gradient(circle at 70% 80%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%), radial-gradient(circle at 15% 85%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 40%)',
            'radial-gradient(circle at 60% 40%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%), radial-gradient(circle at 15% 85%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 40%)',
            'radial-gradient(circle at 80% 20%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%), radial-gradient(circle at 15% 85%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 40%)',
          ]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        style={{ 
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
        className="absolute inset-0"
      />
    </div>
  );
};

const Hero = ({ children }: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-screen w-full bg-[#050505] overflow-hidden flex flex-col text-white">
      <BackgroundElements />

      {/* Content positioned at bottom-left */}
      <motion.div 
        className="relative z-10 flex flex-col justify-end h-full px-4 md:px-8 pb-20 md:pb-32 w-full max-w-7xl mx-auto"
        style={{ y, opacity }}
      >
        <div className="w-full max-w-3xl">
          {children}
        </div>
      </motion.div>

      {/* Scroll Indicator - Bottom Right */}
      <motion.div 
        className="absolute bottom-10 right-10 z-20 flex flex-col items-center gap-4"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-light [writing-mode:vertical-lr] text-white/40">
          Scroll to explore
        </span>
        <div className="h-12 w-[1px] bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </div>
  );
};

export default Hero;
