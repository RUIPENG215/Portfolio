import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useFinePointer } from '../../hooks/useFinePointer';

const INTERACTIVE = 'a, button, [role="button"], [data-cursor]';
const TEXT_FIELD = 'input, textarea, select, [contenteditable="true"]';

// 外环的跟随弹簧：接近临界阻尼，稳态落后约 60ms（普通移动只差十几像素，
// 快速甩动也不至于拖出一大截），仍保留"轻轻跟上"的手感。
const RING_SPRING = { stiffness: 1100, damping: 66, mass: 1 };

/**
 * 全站光标：一个实心小点（即时跟随）+ 一个细环（轻微弹簧延迟）。
 * 用 mix-blend-mode: difference，在深色页和象牙白页上都能看清。
 * 悬停在链接/按钮上时环放大、点消失；按下时环收缩；在输入框里让位给系统光标。
 * 触屏设备和"减少动态效果"用户不启用，也不会隐藏系统光标。
 */
const CustomCursor = () => {
  const reduceMotion = useReducedMotion();
  const finePointer = useFinePointer();
  const enabled = finePointer && !reduceMotion;

  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [overText, setOverText] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, RING_SPRING);
  const ringY = useSpring(y, RING_SPRING);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      x.set(event.clientX);
      y.set(event.clientY);
      // 等到第一次真的移动鼠标，才隐藏系统光标，避免光标"凭空消失"
      if (!root.classList.contains('has-custom-cursor')) {
        root.classList.add('has-custom-cursor');
      }
      setVisible(true);
    };
    const onOver = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      setHovering(target.closest(INTERACTIVE) !== null);
      setOverText(target.closest(TEXT_FIELD) !== null);
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeaveWindow = () => setVisible(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeaveWindow);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeaveWindow);
      root.classList.remove('has-custom-cursor');
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const show = visible && !overText;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="-ml-[18px] -mt-[18px] h-9 w-9 rounded-full border border-white"
          animate={{
            scale: hovering ? 1.7 : pressed ? 0.75 : 1,
            opacity: show ? (hovering ? 0.9 : 0.55) : 0,
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
        style={{ x, y }}
      >
        <motion.div
          className="-ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-white"
          animate={{ scale: hovering ? 0 : 1, opacity: show ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
