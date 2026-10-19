import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { aspectOf, EASE, pad } from './photoUtils';
import type { OpenPhoto } from './photoUtils';
import type { HumanitiesPhotoData } from '../../data/types';

const useColumnCount = () => {
  const compute = () => {
    if (typeof window === 'undefined') return 4;
    const width = window.innerWidth;
    if (width >= 1536) return 5;
    if (width >= 1100) return 4;
    if (width >= 768) return 3;
    return 2;
  };
  const [count, setCount] = useState(compute);
  useEffect(() => {
    const onResize = () => setCount(compute());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return count;
};

/** 瀑布流：每张照片放进当前最矮的一列，列与列之间再错开一点起点。 */
const distribute = (photos: HumanitiesPhotoData[], count: number) => {
  const columns = Array.from({ length: count }, () => ({ height: 0, items: [] as HumanitiesPhotoData[] }));
  photos.forEach((photo) => {
    const target = columns.reduce((min, column) => (column.height < min.height ? column : min));
    target.items.push(photo);
    target.height += 1 / aspectOf(photo);
  });
  return columns.map((column) => column.items);
};

const COLUMN_OFFSETS = ['', 'md:mt-14', 'md:mt-5', 'md:mt-10', 'md:mt-2'];

const Tile = ({
  photo,
  number,
  dimmed,
  priority,
  onHover,
  onClick,
}: {
  photo: HumanitiesPhotoData;
  number: number;
  dimmed: boolean;
  priority: boolean;
  onHover: (id: number | null) => void;
  onClick: () => void;
}) => (
  <motion.button
    type="button"
    layout
    layoutId={`tile-${photo.id}`}
    data-cursor
    onClick={onClick}
    onPointerEnter={() => onHover(photo.id)}
    onPointerLeave={() => onHover(null)}
    onFocus={() => onHover(photo.id)}
    onBlur={() => onHover(null)}
    animate={{ opacity: dimmed ? 0.35 : 1 }}
    transition={{ duration: 0.45, ease: EASE, layout: { duration: 0.6, ease: EASE } }}
    className="group relative block w-full overflow-hidden rounded-sm bg-white/5 text-left"
    style={{ aspectRatio: aspectOf(photo) }}
  >
    <motion.img
      src={photo.image}
      alt={photo.title}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className="h-full w-full object-cover"
      initial={{ scale: 1.3 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 1.6, ease: EASE }}
    />
    {/* 幕布：进入视口时向上拉开，把照片"揭"出来 */}
    <motion.span
      aria-hidden="true"
      className="absolute inset-0 origin-top bg-[#131313]"
      initial={{ scaleY: 1 }}
      whileInView={{ scaleY: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 1.1, ease: EASE, delay: (number % 3) * 0.08 }}
    />
    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    <span className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-3 items-end justify-between px-4 pb-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
      <span>
        <span className="mb-1 block text-[10px] uppercase tracking-[0.3em] text-humanities-primary">{photo.category}</span>
        <span className="block font-serif text-lg text-white">{photo.title}</span>
      </span>
      <span className="font-serif text-2xl italic text-white/70">{pad(number)}</span>
    </span>
  </motion.button>
);

const GridMode = ({ photos, onOpen }: { photos: HumanitiesPhotoData[]; onOpen: OpenPhoto }) => {
  const count = useColumnCount();
  const [hovered, setHovered] = useState<number | null>(null);
  const columns = useMemo(() => distribute(photos, count), [photos, count]);

  return (
    <div className="flex items-start gap-3 md:gap-6">
      {columns.map((items, columnIndex) => (
        <div
          key={columnIndex}
          className={`flex min-w-0 flex-1 flex-col gap-3 md:gap-6 ${COLUMN_OFFSETS[columnIndex % COLUMN_OFFSETS.length]}`}
        >
          {items.map((photo) => {
            const index = photos.indexOf(photo);
            return (
              <Tile
                key={photo.id}
                photo={photo}
                number={index + 1}
                dimmed={hovered !== null && hovered !== photo.id}
                priority={index < 6}
                onHover={setHovered}
                onClick={() => onOpen(photo, photos)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default GridMode;
