import type { PointerEvent as ReactPointerEvent } from 'react';
import {
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useFinePointer } from './useFinePointer';

const TILT_SPRING = { stiffness: 220, damping: 22, mass: 0.6 };
const GLARE_SPRING = { stiffness: 160, damping: 24 };

/**
 * 卡片 3D 倾斜 + 光泽跟随。
 * 只在鼠标/触控板上启用，且尊重"减少动态效果"系统设置。
 */
export const useTilt = (maxDeg = 6) => {
  const reduceMotion = useReducedMotion();
  const finePointer = useFinePointer();
  const enabled = finePointer && !reduceMotion;

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const hover = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [0, 1], [maxDeg, -maxDeg]), TILT_SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxDeg, maxDeg]), TILT_SPRING);
  const glareOpacity = useSpring(hover, GLARE_SPRING);

  const glareX = useTransform(px, [0, 1], [0, 100]);
  const glareY = useTransform(py, [0, 1], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(360px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.45), transparent 62%)`;

  const onPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (!enabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };
  const onPointerEnter = () => {
    if (enabled) hover.set(1);
  };
  const onPointerLeave = () => {
    px.set(0.5);
    py.set(0.5);
    hover.set(0);
  };

  return {
    enabled,
    rotateX,
    rotateY,
    glare,
    glareOpacity,
    handlers: { onPointerMove, onPointerEnter, onPointerLeave },
  };
};
