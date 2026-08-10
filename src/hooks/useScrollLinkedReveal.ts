import type { RefObject } from 'react';
import {
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionStyle,
} from 'framer-motion';

interface ScrollLinkedRevealOptions {
  headingX?: number;
  headingOpacity?: number;
  contentScale?: number;
  contentOpacity?: number;
}

export const useScrollLinkedReveal = <T extends HTMLElement = HTMLElement>(
  targetRef: RefObject<T | null>,
  {
    headingX = -16,
    headingOpacity = 0.62,
    contentScale = 0.965,
    contentOpacity = 0.7,
  }: ScrollLinkedRevealOptions = {},
) => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start 92%', 'start 50%'],
  });

  const linkedHeadingX = useTransform(scrollYProgress, [0, 1], [headingX, 0]);
  const linkedHeadingOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    [headingOpacity, 1],
  );
  const linkedContentScale = useTransform(
    scrollYProgress,
    [0, 1],
    [contentScale, 1],
  );
  const linkedContentOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    [contentOpacity, 1],
  );

  const headingStyle: MotionStyle = prefersReducedMotion
    ? { opacity: 1, x: 0 }
    : { opacity: linkedHeadingOpacity, x: linkedHeadingX };
  const contentStyle: MotionStyle = prefersReducedMotion
    ? { opacity: 1, scale: 1 }
    : { opacity: linkedContentOpacity, scale: linkedContentScale };

  return {
    scrollYProgress,
    headingStyle,
    contentStyle,
  };
};
