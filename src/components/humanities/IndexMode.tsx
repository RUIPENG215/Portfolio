import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE, pad, thumbOf } from './photoUtils';
import type { OpenPhoto } from './photoUtils';
import type { HumanitiesPhotoData } from '../../data/types';

/**
 * 索引模式（横屏优先）：左边是目录，右边是吸附的大预览区。
 * 悬停或键盘聚焦某一行，右侧就切换到那张照片；点击打开大图。
 * 手机上没有悬停，目录右侧放小缩略图。
 */
const IndexMode = ({ photos, onOpen }: { photos: HumanitiesPhotoData[]; onOpen: OpenPhoto }) => {
  const [hovered, setHovered] = useState<HumanitiesPhotoData | null>(null);
  const shown = hovered ?? photos[0];

  return (
    <div className="grid grid-cols-1 gap-x-12 md:grid-cols-12">
      <div className="border-t border-white/10 md:col-span-7" onPointerLeave={() => setHovered(null)}>
        {photos.map((photo, index) => {
          const active = shown?.id === photo.id;
          return (
            <motion.button
              key={photo.id}
              type="button"
              data-cursor
              onClick={() => onOpen(photo, photos)}
              onPointerEnter={() => setHovered(photo)}
              onFocus={() => setHovered(photo)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{ duration: 0.6, ease: EASE, delay: Math.min(index, 8) * 0.03 }}
              className="group relative grid w-full grid-cols-12 items-center gap-x-4 border-b border-white/10 py-5 text-left md:py-6"
            >
              <span className="col-span-2 font-serif text-sm italic text-humanities-primary md:col-span-1">
                {pad(index + 1)}
              </span>
              <span
                className="col-span-8 font-serif text-3xl text-white transition-all duration-500 ease-out md:col-span-7 md:text-4xl lg:text-5xl"
                style={{ opacity: active ? 1 : 0.4, transform: active ? 'translateX(12px)' : 'translateX(0)' }}
              >
                {photo.title}
              </span>
              <span
                className="col-span-4 hidden flex-col items-end gap-1 text-right transition-opacity duration-500 md:flex"
                style={{ opacity: active ? 1 : 0.35 }}
              >
                <span className="text-[11px] uppercase tracking-[0.3em] text-white/60">{photo.category}</span>
                <span className="text-xs text-white/40">{photo.date}</span>
              </span>
              <span className="col-span-2 flex justify-end md:hidden">
                <img src={thumbOf(photo)} alt="" loading="lazy" className="h-12 w-12 rounded-sm object-cover" />
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* 右侧预览：随目录切换，吸附在工具条下方 */}
      <div className="hidden md:col-span-5 md:block">
        <div className="sticky top-[168px]">
          <div className="relative flex h-[calc(100vh-290px)] min-h-[320px] items-center justify-center">
            <AnimatePresence mode="popLayout" initial={false}>
              {shown && (
                <motion.img
                  key={shown.id}
                  src={shown.image}
                  alt={shown.title}
                  draggable={false}
                  className="max-h-full max-w-full object-contain"
                  initial={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)', scale: 1.04 }}
                  animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.25 } }}
                  transition={{ duration: 0.6, ease: EASE }}
                />
              )}
            </AnimatePresence>
          </div>
          {shown && (
            <p className="mt-4 text-[11px] uppercase tracking-[0.3em] text-white/40">
              {shown.location}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndexMode;
