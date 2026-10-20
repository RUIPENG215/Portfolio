import { useCallback, useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, Info, MapPin, X } from 'lucide-react';
import { aspectOf, EASE, pad, thumbOf } from './photoUtils';
import type { HumanitiesLabels } from './photoUtils';
import type { HumanitiesPhotoData } from '../../data/types';

const slide = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 90, filter: 'blur(10px)' }),
  center: { opacity: 1, x: 0, filter: 'blur(0px)' },
  exit: (dir: number) => ({ opacity: 0, x: dir * -90, filter: 'blur(10px)' }),
};

/**
 * 大图查看器：键盘 ← → / Esc / I / Z，触屏左右滑动，点击图片放大并随鼠标平移，
 * 底部缩略图条随当前张自动居中，相邻两张提前预加载。
 */
const PhotoLightbox = ({
  photos,
  index,
  labels,
  onIndex,
  onClose,
}: {
  photos: HumanitiesPhotoData[];
  index: number;
  labels: HumanitiesLabels['lightbox'];
  onIndex: (next: number) => void;
  onClose: () => void;
}) => {
  const [direction, setDirection] = useState(1);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState('50% 50%');
  const [showInfo, setShowInfo] = useState(true);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const count = photos.length;
  const photo = photos[index];

  // 画框尺寸：按"真实照片比例"在可用空间里算出刚好放得下的宽高，框和照片之间不留任何黑边
  const bodyRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [ratios, setRatios] = useState<Record<number, number>>({});

  useEffect(() => {
    const element = bodyRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) =>
      setBox({ w: entry.contentRect.width, h: entry.contentRect.height }),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const rememberRatio = useCallback((id: number, width: number, height: number) => {
    if (!width || !height) return;
    setRatios((current) => (current[id] ? current : { ...current, [id]: width / height }));
  }, []);

  const ratio = ratios[photo.id] ?? aspectOf(photo);
  const isDesktop = box.w >= 768;
  const infoWidth = showInfo && isDesktop ? (box.w >= 1024 ? 440 : 380) : 0;
  const infoHeight = showInfo && !isDesktop ? Math.round(box.h * 0.36) : 0;
  const availW = Math.max(0, box.w - infoWidth - (isDesktop ? 96 : 32));
  const availH = Math.max(0, box.h - infoHeight - (isDesktop ? 24 : 12));
  const frameW = Math.min(availW, availH * ratio);
  const frameH = frameW / ratio;

  const go = useCallback(
    (step: number) => {
      setDirection(step);
      setZoomed(false);
      onIndex((index + step + count) % count);
    },
    [count, index, onIndex],
  );

  const jump = (target: number) => {
    if (target === index) return;
    setDirection(target > index ? 1 : -1);
    setZoomed(false);
    onIndex(target);
  };

  // 锁定背景滚动
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // 键盘
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      else if (event.key === 'ArrowRight') go(1);
      else if (event.key === 'ArrowLeft') go(-1);
      else if (event.key === 'i' || event.key === 'I') setShowInfo((value) => !value);
      else if (event.key === 'z' || event.key === 'Z') setZoomed((value) => !value);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onClose]);

  // 预加载相邻两张
  useEffect(() => {
    [photos[(index + 1) % count], photos[(index - 1 + count) % count]].forEach((neighbour) => {
      const image = new Image();
      image.onload = () => rememberRatio(neighbour.id, image.naturalWidth, image.naturalHeight);
      image.src = neighbour.image;
    });
  }, [count, index, photos, rememberRatio]);

  // 缩略图条居中
  useEffect(() => {
    thumbRefs.current[index]?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  }, [index]);

  const handleZoomMove = (event: ReactPointerEvent<HTMLImageElement>) => {
    if (!zoomed) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${Math.min(100, Math.max(0, x))}% ${Math.min(100, Math.max(0, y))}%`);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col bg-[#131313] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
    >
      {/* 顶栏 */}
      <div className="flex shrink-0 items-center justify-between px-4 py-4 md:px-8">
        <span className="font-serif text-lg tabular-nums">
          {pad(index + 1)} <span className="text-white/35">/ {pad(count)}</span>
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            data-cursor
            onClick={() => setShowInfo((value) => !value)}
            aria-label={labels.info}
            aria-pressed={showInfo}
            className={`rounded-full p-2 transition-colors ${showInfo ? 'bg-white/15 text-white' : 'text-white/50 hover:text-white'}`}
          >
            <Info size={18} />
          </button>
          <button
            type="button"
            data-cursor
            onClick={onClose}
            aria-label={labels.close}
            className="rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* 主体：图 + 信息，作为一张整体卡片居中 */}
      <div
        ref={bodyRef}
        className={`flex min-h-0 flex-1 items-center justify-center ${isDesktop ? 'flex-row' : 'flex-col'}`}
      >
        {box.w > 0 && (
          <>
            <motion.div
              className="relative shrink-0 overflow-hidden bg-[#131313]"
              initial={false}
              animate={{ width: frameW, height: frameH }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <AnimatePresence initial custom={direction} mode="popLayout">
                <motion.div
                  key={photo.id}
                  custom={direction}
                  variants={slide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.55, ease: EASE }}
                  drag={zoomed ? false : 'x'}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -80 || info.velocity.x < -500) go(1);
                    else if (info.offset.x > 80 || info.velocity.x > 500) go(-1);
                  }}
                  className="absolute inset-0"
                >
                  <motion.img
                    src={photo.image}
                    alt={photo.title}
                    draggable={false}
                    onLoad={(event) =>
                      rememberRatio(photo.id, event.currentTarget.naturalWidth, event.currentTarget.naturalHeight)
                    }
                    onClick={() => setZoomed((value) => !value)}
                    onPointerMove={handleZoomMove}
                    animate={{ scale: zoomed ? 2.2 : 1 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    style={{ transformOrigin: origin }}
                    className={`h-full w-full select-none object-cover ${zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                  />
                </motion.div>
              </AnimatePresence>

              {/* 左右翻页热区：悬停才出现 */}
              <button
                type="button"
                data-cursor
                onClick={() => go(-1)}
                aria-label={labels.prev}
                className="group absolute left-0 top-0 z-10 hidden h-full w-[16%] items-center justify-start pl-2 md:flex"
              >
                <span className="rounded-full bg-black/40 p-2 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  <ChevronLeft size={22} strokeWidth={1.5} />
                </span>
              </button>
              <button
                type="button"
                data-cursor
                onClick={() => go(1)}
                aria-label={labels.next}
                className="group absolute right-0 top-0 z-10 hidden h-full w-[16%] items-center justify-end pr-2 md:flex"
              >
                <span className="rounded-full bg-black/40 p-2 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  <ChevronRight size={22} strokeWidth={1.5} />
                </span>
              </button>
            </motion.div>

            <AnimatePresence initial={false}>
              {showInfo && (
                <motion.aside
                  key="info"
                  initial={{ opacity: 0, x: isDesktop ? 24 : 0, y: isDesktop ? 0 : 16 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: isDesktop ? 24 : 0, y: isDesktop ? 0 : 16 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="shrink-0 overflow-y-auto rounded-sm px-6 pb-4 pt-4 md:px-10 md:py-2"
                  style={isDesktop ? { width: infoWidth, height: frameH } : { width: '100%', height: infoHeight }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={photo.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <span className="mb-3 block text-[10px] uppercase tracking-[0.4em] text-humanities-primary">
                        {photo.category}
                      </span>
                      <h2 className="mb-5 font-serif text-3xl font-light leading-tight md:text-5xl">{photo.title}</h2>
                      <div className="mb-5 space-y-2 text-xs tracking-wider text-white/55">
                        {photo.location && (
                          <div className="flex items-center gap-3">
                            <MapPin size={12} className="text-humanities-primary" />
                            {photo.location}
                          </div>
                        )}
                        {photo.date && (
                          <div className="flex items-center gap-3">
                            <Calendar size={12} className="text-humanities-primary" />
                            {photo.date}
                          </div>
                        )}
                      </div>
                      <div className="mb-5 h-px w-10 bg-white/15" />
                      <p className="whitespace-pre-wrap font-serif text-sm font-light italic leading-loose tracking-wide text-white/70 md:text-base">
                        {photo.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </motion.aside>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* 缩略图条 */}
      <div className="shrink-0 border-t border-white/10">
        <div className="flex gap-2 overflow-x-auto px-4 py-3 md:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {photos.map((item, itemIndex) => (
            <button
              key={item.id}
              ref={(node) => {
                thumbRefs.current[itemIndex] = node;
              }}
              type="button"
              data-cursor
              onClick={() => jump(itemIndex)}
              aria-label={item.title}
              className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-sm transition-all duration-300 md:h-14 md:w-14 ${
                itemIndex === index ? 'opacity-100 ring-1 ring-humanities-primary' : 'opacity-40 hover:opacity-80'
              }`}
            >
              <img src={thumbOf(item)} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PhotoLightbox;
