import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import GridMode from './GridMode';
import FilmMode from './FilmMode';
import IndexMode from './IndexMode';
import { EASE, pad } from './photoUtils';
import type { HumanitiesLabels, OpenPhoto } from './photoUtils';
import type { HumanitiesPhotoData } from '../../data/types';

type Mode = 'grid' | 'film' | 'index';

/** 深色"展厅"：筛选 + 三种浏览方式（网格 / 胶片 / 索引），照片再多也不会乱。 */
const PhotoExhibition = ({
  photos,
  labels,
  onOpen,
}: {
  photos: HumanitiesPhotoData[];
  labels: HumanitiesLabels;
  onOpen: OpenPhoto;
}) => {
  const [mode, setMode] = useState<Mode>('grid');
  const [category, setCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    photos.forEach((photo) => counts.set(photo.category, (counts.get(photo.category) ?? 0) + 1));
    return Array.from(counts.entries());
  }, [photos]);

  const visible = useMemo(
    () => (category ? photos.filter((photo) => photo.category === category) : photos),
    [photos, category],
  );

  const modes: { id: Mode; label: string }[] = [
    { id: 'grid', label: labels.modes.grid },
    { id: 'film', label: labels.modes.film },
    { id: 'index', label: labels.modes.index },
  ];

  return (
    <section data-nav-dark className="relative mx-2 rounded-[2rem] bg-[#131313] text-white md:mx-4 md:rounded-[3rem]">
      {/* 工具条：标题 + 分类 + 浏览方式，一行排开；吸附在导航栏下方 */}
      {/* 标题区：不吸附，随页面滚动，作为这一部分的章节标题 */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-5 px-5 pb-7 pt-10 md:flex-row md:items-end md:gap-14 md:px-16 md:pb-8 md:pt-14">
          <motion.h2
            className="shrink-0 font-serif text-4xl italic md:text-5xl"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {labels.photography}
            <span className="ml-3 align-top text-sm not-italic tabular-nums text-humanities-primary">
              {pad(visible.length)}
            </span>
          </motion.h2>

          <div className="flex flex-1 flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.25em]">
            {[{ key: null as string | null, label: labels.all, count: photos.length }, ...categories.map(([key, count]) => ({ key, label: key, count }))].map(
              (chip) => {
                const active = category === chip.key;
                return (
                  <button
                    key={chip.key ?? 'all'}
                    type="button"
                    data-cursor
                    onClick={() => setCategory(chip.key)}
                    className={`relative py-1 transition-colors ${active ? 'text-white' : 'text-white/40 hover:text-white/80'}`}
                  >
                    {chip.label}
                    <sup className="ml-1 text-[9px] tabular-nums text-humanities-primary/80">{chip.count}</sup>
                    {active && (
                      <motion.span
                        layoutId="exhibition-chip"
                        className="absolute inset-x-0 -bottom-0.5 h-px bg-humanities-primary"
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}
                  </button>
                );
              },
            )}
          </div>

          <div className="relative flex shrink-0 self-start rounded-full border border-white/10 p-0.5 text-[11px] uppercase tracking-[0.2em] md:self-auto">
            {modes.map((item) => (
              <button
                key={item.id}
                type="button"
                data-cursor
                onClick={() => setMode(item.id)}
                className={`relative rounded-full px-5 py-2 transition-colors ${mode === item.id ? 'text-black' : 'text-white/50 hover:text-white'}`}
              >
                {mode === item.id && (
                  <motion.span
                    layoutId="exhibition-mode"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={mode === 'film' ? '' : 'mx-auto max-w-[1600px] px-5 pb-24 pt-8 md:px-16 md:pb-32 md:pt-12'}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${mode}-${category ?? 'all'}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {mode === 'grid' && <GridMode photos={visible} onOpen={onOpen} />}
            {mode === 'film' && <FilmMode photos={visible} hint={labels.filmHint} onOpen={onOpen} />}
            {mode === 'index' && <IndexMode photos={visible} onOpen={onOpen} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PhotoExhibition;
