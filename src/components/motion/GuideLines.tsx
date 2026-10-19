import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { useFinePointer } from '../../hooks/useFinePointer';

interface GuideLinesProps {
  /** 辅助线颜色 */
  color?: string;
  /** 坐标读数的文字 class */
  labelClassName?: string;
}

const SPRING = { stiffness: 260, damping: 32, mass: 0.5 };

/**
 * 制图辅助线：两条细线跟随鼠标贯穿整个区块，交点旁标出坐标读数。
 * 呼应工业设计 / 工程制图的语境，也契合中文首页的"界栏"细线版式。
 * 必须放在一个 position: relative 的区块里，监听的是它的父元素。
 */
const GuideLines = ({
  color = 'rgba(23, 19, 16, 0.14)',
  labelClassName = 'text-[#a39c8f]',
}: GuideLinesProps) => {
  const selfRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const finePointer = useFinePointer();
  const enabled = finePointer && !reduceMotion;

  const [visible, setVisible] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);
  const readout = useTransform(
    [springX, springY],
    (values: number[]) => `${Math.round(values[0])}, ${Math.round(values[1])}`,
  );

  useEffect(() => {
    if (!enabled) return;
    const scope = selfRef.current?.parentElement;
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
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      ref={selfRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="absolute left-0 top-0 h-full w-px"
        style={{ x: springX, backgroundColor: color }}
      />
      <motion.div
        className="absolute left-0 top-0 h-px w-full"
        style={{ y: springY, backgroundColor: color }}
      />
      <motion.span
        className={`absolute left-0 top-0 ml-3 mt-2 text-[10px] tabular-nums tracking-wider ${labelClassName}`}
        style={{ x: springX, y: springY }}
      >
        {readout}
      </motion.span>
    </motion.div>
  );
};

export default GuideLines;
