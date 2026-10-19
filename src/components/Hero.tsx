import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import type { ReactNode, RefObject } from 'react';
import HeroSpotlight from './motion/HeroSpotlight';

interface HeroProps {
  children?: ReactNode;
}

const BackgroundElements = ({
  isActive,
  scopeRef,
}: {
  isActive: boolean;
  scopeRef: RefObject<HTMLElement | null>;
}) => {
  const reduceMotion = useReducedMotion();
  const shouldAnimate = isActive && !reduceMotion;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        style={{ 
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(circle at 78% 38%, black 0%, transparent 72%)',
        }}
        className="absolute inset-0 opacity-[0.11]"
      />

      <motion.div
        aria-hidden="true"
        className="absolute -right-[22vw] -top-[35vw] h-[75vw] w-[75vw] rounded-full opacity-60 transform-gpu"
        style={{
          background: 'radial-gradient(circle, rgba(121,192,255,0.10) 0%, rgba(255,255,255,0.035) 35%, transparent 70%)',
          willChange: shouldAnimate ? 'transform, opacity' : 'auto',
        }}
        animate={shouldAnimate
          ? {
              x: ['0%', '-10%', '-3%', '0%'],
              y: ['0%', '16%', '30%', '0%'],
              opacity: [0.54, 0.8, 0.64, 0.54],
            }
          : { x: '0%', y: '0%', opacity: 0.54 }}
        transition={shouldAnimate
          ? { duration: 18, repeat: Infinity, ease: 'easeInOut' }
          : { duration: 0.2 }}
      />

      {/* 指针光场：网格在鼠标下被点亮（仅鼠标/触控板，且尊重减少动态效果） */}
      <HeroSpotlight scopeRef={scopeRef} />
    </div>
  );
};

const Hero = ({ children }: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isHeroInView = useInView(containerRef, { amount: 0.05 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[100svh] w-full bg-[#050505] overflow-hidden flex flex-col text-white">
      <BackgroundElements isActive={isHeroInView} scopeRef={containerRef} />

      {/* Content positioned at bottom-left */}
      <motion.div 
        className="relative z-10 flex flex-col justify-end h-full px-4 md:px-8 pb-20 md:pb-32 w-full max-w-7xl mx-auto"
        style={reduceMotion ? undefined : { y, opacity }}
      >
        <div className="w-full max-w-3xl">
          {children}
        </div>
      </motion.div>

      {/* Scroll Indicator - Bottom Right */}
      <motion.div 
        className="absolute bottom-10 right-4 md:right-10 z-20 flex flex-col items-center gap-4"
        animate={isHeroInView && !reduceMotion ? { opacity: [0.3, 0.85, 0.3] } : { opacity: 0.4 }}
        transition={isHeroInView && !reduceMotion
          ? { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }
          : { duration: 0.2 }}
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
