import { motion } from 'framer-motion';
import { Music } from 'lucide-react';
import type { ReactNode } from 'react';
import type { HumanitiesMusicData } from '../../data/types';

export interface MusicContent {
  title: string;
  philosophy: string;
  bio: string;
  tags: { label: string; icon: string }[];
  tracks: HumanitiesMusicData[];
}

/** 音乐板块：沿用原来的奶油色卡片样式。 */
const HumanitiesMusic = ({ content, footer }: { content: MusicContent; footer?: ReactNode }) => (
  <section className="mx-auto max-w-7xl px-4 pb-10 pt-24 md:px-8 md:pt-40">
    <motion.div
      className="mb-8 flex items-center gap-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <Music className="text-humanities-primary" />
      <h2 className="text-3xl italic">{content.title}</h2>
    </motion.div>

    <div className="relative">
      <div className="absolute -right-20 -top-20 -z-10 h-64 w-64 rounded-full bg-humanities-primary/5 blur-3xl" />

      <motion.div
        className="group relative overflow-hidden rounded-2xl border border-humanities-secondary/20 bg-white/40 p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] backdrop-blur-sm md:p-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.015]"
          style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />
        <div className="relative z-10 w-full">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-8 bg-humanities-primary/40" />
            <span className="font-serif text-xs font-medium uppercase tracking-[0.3em] text-humanities-primary/60">
              {content.philosophy}
            </span>
          </div>

          <p className="mb-10 text-justify font-serif text-lg font-light leading-relaxed text-gray-700 md:text-xl">
            {content.bio}
          </p>

          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {content.tags.map((tag, idx) => (
              <motion.div
                key={tag.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
                className="group/tag flex items-baseline gap-2"
              >
                <span className="font-serif text-[10px] text-humanities-primary/30 transition-colors group-hover/tag:text-humanities-primary/60">
                  {tag.icon}
                </span>
                <span className="font-serif text-sm uppercase tracking-widest text-gray-500 transition-colors group-hover/tag:text-gray-900">
                  {tag.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute -bottom-10 -right-10 rotate-[-15deg] text-humanities-primary opacity-[0.02] transition-transform duration-1000 group-hover:rotate-0">
          <Music size={220} strokeWidth={0.5} />
        </div>
      </motion.div>

      {content.tracks.length > 0 && (
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {content.tracks.map((track, i) => (
            <motion.div
              key={track.id}
              className="group rounded-2xl border border-humanities-secondary/10 bg-white/60 p-8 backdrop-blur-sm transition-all duration-500 hover:border-humanities-primary/20 hover:shadow-xl hover:shadow-humanities-primary/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
            >
              <div className="flex items-center gap-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-humanities-primary/5 text-humanities-primary transition-all duration-500 group-hover:bg-humanities-primary group-hover:text-white">
                  {track.icon || <Music size={24} strokeWidth={1.5} />}
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-medium text-gray-900 transition-colors group-hover:text-humanities-primary">
                    {track.title}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-gray-400">
                    {track.type} • {track.duration}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>

    {footer}
  </section>
);

export default HumanitiesMusic;
