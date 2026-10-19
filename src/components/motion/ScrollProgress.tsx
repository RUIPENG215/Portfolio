import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useLocation } from 'react-router-dom';

// 尺身高度（px）。每 6px 一格 = 5%，共 21 条刻度；每 5 格（25%）一条长刻度。
const RULER_HEIGHT = 120;
const STEP = 6;
const TICK_COUNT = RULER_HEIGHT / STEP + 1;
const IDLE_DELAY = 1200;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/**
 * 右侧边缘的刻度尺式阅读进度（首页英雄区不显示，滚过首屏后才出现）：
 * 细分刻度 + 指针式游标 + 百分比读数。平时淡到几乎不可见，滚动时亮起，停下约 1 秒后淡回。
 * difference 混合让它在深色/浅色页上都可见；窄屏不显示。
 */
const ScrollProgress = () => {
  const reduceMotion = useReducedMotion();
  const { pathname } = useLocation();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 28, mass: 0.4 });
  const markerY = useTransform(progress, (value) => clamp01(value) * RULER_HEIGHT);
  const percent = useTransform(progress, (value) =>
    String(Math.round(clamp01(value) * 100)).padStart(2, '0'),
  );

  const [active, setActive] = useState(false);
  const idleTimer = useRef<number | undefined>(undefined);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setPastHero(latest > window.innerHeight * 0.75);
    setActive(true);
    window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => setActive(false), IDLE_DELAY);
  });
  useEffect(() => () => window.clearTimeout(idleTimer.current), []);

  // 首页：英雄区（首屏）不显示，滚过首屏之后才出现；其它页面始终显示
  const [pastHero, setPastHero] = useState(false);
  useEffect(() => {
    setPastHero(window.scrollY > window.innerHeight * 0.75);
  }, [pathname]);
  const visible = !reduceMotion && (pathname !== '/' || pastHero);

  return (
    <AnimatePresence>
      {visible && (
        <div
          key="ruler"
          aria-hidden="true"
          className="pointer-events-none fixed right-2 top-1/2 z-[60] hidden w-12 -translate-y-1/2 mix-blend-difference md:block"
          style={{ height: RULER_HEIGHT }}
        >
          <motion.div
            className="relative h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: active ? 1 : 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            {/* 尺身：轴线 + 刻度 */}
            <svg
              width="12"
              height={RULER_HEIGHT + 1}
              viewBox={`0 0 12 ${RULER_HEIGHT + 1}`}
              className="absolute right-0 top-0 overflow-visible"
            >
              <line x1="11.5" x2="11.5" y1="0" y2={RULER_HEIGHT + 1} stroke="white" strokeOpacity="0.4" />
              {Array.from({ length: TICK_COUNT }, (_, index) => {
                const major = index % 5 === 0;
                const y = index * STEP + 0.5;
                return (
                  <line
                    key={index}
                    x1={major ? 2 : 7}
                    x2="11.5"
                    y1={y}
                    y2={y}
                    stroke="white"
                    strokeOpacity={major ? 1 : 0.65}
                  />
                );
              })}
            </svg>

            {/* 已读部分：轴线变亮 */}
            <motion.div
              className="absolute right-0 top-0 w-px origin-top bg-white"
              style={{ height: RULER_HEIGHT, scaleY: progress }}
            />

            {/* 游标：一条横向指针 */}
            <motion.div
              className="absolute right-0 top-0 h-px w-4 bg-white"
              style={{ y: markerY }}
            />

            {/* 读数：只在滚动时出现 */}
            <motion.span
              className="absolute right-6 top-0 -mt-[5px] text-[9px] leading-[10px] tracking-[0.12em] tabular-nums text-white"
              style={{ y: markerY }}
              animate={{ opacity: active ? 0.75 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {percent}
            </motion.span>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ScrollProgress;
