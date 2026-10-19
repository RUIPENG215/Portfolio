import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { aspectOf, pad } from './photoUtils';
import type { OpenPhoto } from './photoUtils';
import type { HumanitiesPhotoData } from '../../data/types';

const Frame = ({
  photo,
  index,
  progress,
  onClick,
}: {
  photo: HumanitiesPhotoData;
  index: number;
  progress: MotionValue<number>;
  onClick: () => void;
}) => {
  // 照片比画框略大，横向滚动时在框里反向漂移，产生"透过窗户看"的纵深
  const imageX = useTransform(progress, [0, 1], ['7%', '-7%']);

  return (
    <div
      className="relative shrink-0"
      style={{ marginTop: index % 2 === 0 ? '-5vh' : '9vh' }}
    >
      <span className="pointer-events-none absolute -left-4 -top-14 select-none font-serif text-[7rem] italic leading-none text-white/[0.06] md:-left-8 md:-top-24 md:text-[11rem]">
        {pad(index + 1)}
      </span>
      <button
        type="button"
        data-cursor
        onClick={onClick}
        className="group relative block h-[52svh] overflow-hidden rounded-sm bg-white/5 md:h-[62vh]"
        style={{ aspectRatio: aspectOf(photo) }}
      >
        <motion.img
          src={photo.image}
          alt={photo.title}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-full w-full max-w-none object-cover transition-[filter] duration-500 group-hover:brightness-110"
          style={{ x: imageX, scale: 1.16 }}
        />
      </button>
      <div className="mt-4 flex items-baseline justify-between gap-6 text-white">
        <span className="font-serif text-xl">{photo.title}</span>
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">{photo.category}</span>
      </div>
    </div>
  );
};

/** 胶片模式：竖向滚动被"接管"成横向移动，画面在屏幕中央逐帧经过。 */
const FilmMode = ({
  photos,
  hint,
  onOpen,
}: {
  photos: HumanitiesPhotoData[];
  hint: string;
  onOpen: OpenPhoto;
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [photos]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setCurrent(Math.min(photos.length - 1, Math.max(0, Math.round(value * (photos.length - 1)))));
  });

  return (
    <div ref={sectionRef} style={{ height: `calc(100svh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex w-max items-center gap-14 px-[10vw] md:gap-28">
          {photos.map((photo, index) => (
            <Frame
              key={photo.id}
              photo={photo}
              index={index}
              progress={scrollYProgress}
              onClick={() => onOpen(photo, photos)}
            />
          ))}
        </motion.div>

        <div className="absolute inset-x-0 bottom-8 mx-auto flex w-full max-w-7xl items-center gap-6 px-4 text-[10px] uppercase tracking-[0.35em] text-white/50 md:px-8">
          <span className="tabular-nums text-white">
            {pad(current + 1)} <span className="text-white/30">/ {pad(photos.length)}</span>
          </span>
          <span className="relative h-px flex-1 bg-white/15">
            <motion.span className="absolute inset-0 origin-left bg-white/80" style={{ scaleX: scrollYProgress }} />
          </span>
          <span className="hidden sm:inline">{hint}</span>
        </div>
      </div>
    </div>
  );
};

export default FilmMode;
