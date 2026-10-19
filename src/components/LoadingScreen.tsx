import { useEffect } from 'react';
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import SplitText from './motion/SplitText';
import ScrambleText from './motion/ScrambleText';
import { useLanguage } from '../context/useLanguage';

const LoadingScreen = () => {
  const reduceMotion = useReducedMotion();
  const { language } = useLanguage();

  // 进度条和计数共用一个数值：App 里的加载计时是 1.4s，这里 1.25s 走完，留一点"满格停顿"
  const count = useMotionValue(0);
  const counter = useTransform(count, (value) => String(Math.round(value)).padStart(3, '0'));
  const progress = useTransform(count, [0, 100], [0, 1]);

  useEffect(() => {
    if (reduceMotion) {
      count.set(100);
      return;
    }
    const controls = animate(count, 100, { duration: 1.25, ease: [0.65, 0, 0.35, 1] });
    return () => controls.stop();
  }, [count, reduceMotion]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        y: "-100%",
        transition: { duration: 0.68, ease: [0.76, 0, 0.24, 1] }
      }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] text-white shadow-[0_10px_40px_-10px_rgba(255,255,255,0.2)] border-b border-white/5"
    >
      <div className="mb-4 text-4xl md:text-6xl font-black tracking-tighter uppercase">
        <SplitText lines={['RUIPENG']} stagger={0.05} duration={0.8} />
      </div>

      <div className="w-48">
        <div className="h-[1px] w-full bg-white/10 relative overflow-hidden">
          <motion.div className="absolute inset-0 origin-left bg-white" style={{ scaleX: progress }} />
        </div>
        <div className="mt-3 flex justify-end">
          <motion.span className="font-mono text-[10px] tabular-nums tracking-[0.3em] text-white/40">
            {counter}
          </motion.span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-[10px] tracking-[0.4em] text-white/40 uppercase font-mono"
      >
        {language === 'zh' ? (
          '正在进入创意空间'
        ) : (
          <ScrambleText text="Initialising Creative Space" delay={450} duration={900} />
        )}
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
