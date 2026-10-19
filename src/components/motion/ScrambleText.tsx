import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

const scramble = (text: string, revealed: number) =>
  Array.from(text)
    .map((char, index) => (char === ' ' || index < revealed ? char : randomGlyph()))
    .join('');

interface ScrambleTextProps {
  text: string;
  className?: string;
  /** 为 false 时保持乱码静止，等待触发 */
  active?: boolean;
  /** 起始延迟（毫秒） */
  delay?: number;
  /** 从乱码解到完整文字的总时长（毫秒） */
  duration?: number;
}

/** 文字解码：乱码从左到右逐个"落定"为真实字符。读屏用户直接读原文。 */
const ScrambleText = ({
  text,
  className,
  active = true,
  delay = 0,
  duration = 900,
}: ScrambleTextProps) => {
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(() => scramble(text, 0));

  useEffect(() => {
    if (reduceMotion || !active) return;
    let frame = 0;
    const startAt = performance.now() + delay;

    const tick = (now: number) => {
      if (now >= startAt) {
        const progress = Math.min(1, (now - startAt) / duration);
        if (progress >= 1) {
          setDisplay(text);
          return;
        }
        setDisplay(scramble(text, Math.floor(progress * Array.from(text).length)));
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [text, active, delay, duration, reduceMotion]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{reduceMotion ? text : display}</span>
    </span>
  );
};

export default ScrambleText;
