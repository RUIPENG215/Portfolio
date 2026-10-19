import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

interface ParallaxImageProps {
  src: string;
  alt: string;
  /** 外层容器（负责尺寸、圆角、底色）；overflow-hidden 已内置 */
  className?: string;
  imgClassName?: string;
  /** 图片相对容器的最大位移百分比 */
  range?: number;
}

/** 滚动视差：图片比容器略大，随滚动在框内缓慢位移。 */
const ParallaxImage = ({ src, alt, className, imgClassName, range = 7 }: ParallaxImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${range}%`, `${range}%`]);

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ''}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover ${imgClassName ?? ''}`}
        style={reduceMotion ? undefined : { y, scale: 1.16 }}
      />
    </div>
  );
};

export default ParallaxImage;
