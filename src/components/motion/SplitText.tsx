import { Fragment, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export interface TextSegment {
  text: string;
  className?: string;
}

/** 一行文字：纯字符串，或带局部样式的片段（用于"一行里有一段变灰"这种排版）。 */
export type SplitLine = string | TextSegment[];

interface SplitTextProps {
  lines: SplitLine[];
  className?: string;
  /** 每行容器的额外 class；传数组时按行下标取值 */
  lineClassName?: string | string[];
  /** 起始延迟（秒） */
  delay?: number;
  /** 相邻字符的错开时间（秒） */
  stagger?: number;
  duration?: number;
  /** 默认 true；传 false 时保持隐藏，用来等待加载完成 */
  active?: boolean;
  /** 进入视口时再播放（优先于 active） */
  inView?: boolean;
}

interface Char {
  char: string;
  index: number;
  className?: string;
}

const toSegments = (line: SplitLine): TextSegment[] =>
  typeof line === 'string' ? [{ text: line }] : line;

/**
 * 逐字"遮罩揭示"：每个字从各自所在行的下沿升起。
 * - 中文按字拆；英文按词分组（不会在词中间断行）
 * - 读屏用户读到的是完整原文；"减少动态效果"时直接渲染静态文字
 */
const SplitText = ({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.035,
  duration = 0.9,
  active = true,
  inView = false,
}: SplitTextProps) => {
  const reduceMotion = useReducedMotion();

  const variants = useMemo<Variants>(
    () => ({
      hidden: { y: '125%' },
      show: (startAt: number) => ({
        y: '0%',
        transition: { duration, ease: EASE, delay: startAt },
      }),
    }),
    [duration],
  );

  const built = useMemo(() => {
    let counter = 0;
    return lines.map((line) => {
      const segments = toSegments(line);
      const spaced = segments.some((segment) => segment.text.includes(' '));
      const chars: Char[] = segments.flatMap((segment) =>
        Array.from(segment.text).map((char) => ({
          char,
          index: counter++,
          className: segment.className,
        })),
      );
      // 有空格 → 按词分组（组内不换行）；没有空格 → 每个字单独一组，允许在任意字间换行
      const groups: Char[][] = [];
      if (spaced) {
        let current: Char[] = [];
        chars.forEach((item) => {
          if (item.char === ' ') {
            if (current.length) groups.push(current);
            current = [];
          } else {
            current.push(item);
          }
        });
        if (current.length) groups.push(current);
      } else {
        chars.forEach((item) => groups.push([item]));
      }
      return { groups, spaced };
    });
  }, [lines]);

  const label = useMemo(
    () => lines.map((line) => toSegments(line).map((segment) => segment.text).join('')).join(' '),
    [lines],
  );

  const lineClassFor = (lineIndex: number) =>
    Array.isArray(lineClassName) ? (lineClassName[lineIndex] ?? '') : (lineClassName ?? '');

  if (reduceMotion) {
    return (
      <span className={`block ${className ?? ''}`}>
        {lines.map((line, lineIndex) => (
          <span key={lineIndex} className={`block ${lineClassFor(lineIndex)}`}>
            {toSegments(line).map((segment, segmentIndex) => (
              <span key={segmentIndex} className={segment.className}>
                {segment.text}
              </span>
            ))}
          </span>
        ))}
      </span>
    );
  }

  return (
    <motion.span
      className={`block ${className ?? ''}`}
      initial="hidden"
      animate={!inView && active ? 'show' : undefined}
      whileInView={inView ? 'show' : undefined}
      viewport={{ once: true, margin: '-80px' }}
    >
      <span className="sr-only">{label}</span>
      <span aria-hidden="true" className="block">
        {built.map(({ groups, spaced }, lineIndex) => (
          <span key={lineIndex} className={`-mx-[0.05em] -my-[0.12em] block overflow-hidden px-[0.05em] py-[0.12em] ${lineClassFor(lineIndex)}`}>
            {groups.map((group, groupIndex) => (
              <Fragment key={groupIndex}>
                {spaced && groupIndex > 0 ? ' ' : null}
                <span className="inline-block whitespace-nowrap align-top">
                  {group.map(({ char, index, className: charClass }) => (
                    <motion.span
                      key={index}
                      custom={delay + index * stagger}
                      variants={variants}
                      className={`inline-block ${charClass ?? ''}`}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </Fragment>
            ))}
          </span>
        ))}
      </span>
    </motion.span>
  );
};

export default SplitText;
