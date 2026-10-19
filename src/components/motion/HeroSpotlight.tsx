import { useEffect, useState } from 'react';
import type { RefObject } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { useFinePointer } from '../../hooks/useFinePointer';

interface HeroSpotlightProps {
  /** 监听指针的区块（通常是 Hero 根节点） */
  scopeRef: RefObject<HTMLElement | null>;
}

const SPRING = { stiffness: 140, damping: 24, mass: 0.6 };
const GRID =
  'linear-gradient(rgba(255,255,255,0.44) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.44) 1px, transparent 1px)';

/**
 * 英文深色 Hero 的指针光场：网格在鼠标下方被"点亮"，外围一圈很淡的冷色光晕。
 * 叠在原有的静态网格之上，指针离开后淡出。
 */
const HeroSpotlight = ({ scopeRef }: HeroSpotlightProps) => {
  const reduceMotion = useReducedMotion();
  const finePointer = useFinePointer();
  const enabled = finePointer && !reduceMotion;

  const [visible, setVisible] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  const gridMask = useMotionTemplate`radial-gradient(260px circle at ${springX}px ${springY}px, black 0%, transparent 100%)`;
  const glow = useMotionTemplate`radial-gradient(520px circle at ${springX}px ${springY}px, rgba(121,192,255,0.07), transparent 70%)`;

  useEffect(() => {
    if (!enabled) return;
    const scope = scopeRef.current;
    if (!scope) return;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const rect = scope.getBoundingClientRect();
      x.set(event.clientX - rect.left);
      y.set(event.clientY - rect.top);
      setVisible(true);
    };
    const onLeave = () => setVisible(false);

    scope.addEventListener('pointermove', onMove, { passive: true });
    scope.addEventListener('pointerleave', onLeave);
    return () => {
      scope.removeEventListener('pointermove', onMove);
      scope.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled, scopeRef, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div className="absolute inset-0" style={{ backgroundImage: glow }} />
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: GRID,
          backgroundSize: '80px 80px',
          maskImage: gridMask,
          WebkitMaskImage: gridMask,
        }}
      />
    </motion.div>
  );
};

export default HeroSpotlight;
