import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, X } from 'lucide-react';
import type { DetailSection } from '../data/types';

export interface ResumeDetailItem {
  eyebrow: string;
  title: string;
  subtitle: string;
  period: string;
  summary: string;
  sections: DetailSection[];
  tags?: string[];
  icon?: ReactNode;
  accentClass?: string;
  ongoing?: boolean;
}

interface ResumeDetailPanelProps {
  item: ResumeDetailItem | null;
  onClose: () => void;
}

const ResumeDetailPanel = ({ item, onClose }: ResumeDetailPanelProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches
  ));

  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)');
    const updateLayout = () => setIsDesktop(query.matches);
    updateLayout();
    query.addEventListener('change', updateLayout);
    return () => query.removeEventListener('change', updateLayout);
  }, []);

  useEffect(() => {
    if (!item) return;

    const previousActiveElement = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 40);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousActiveElement?.focus();
    };
  }, [item, onClose]);

  if (typeof document === 'undefined') return null;

  const duration = shouldReduceMotion ? 0 : 0.46;

  return createPortal(
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-[100] flex items-end justify-end md:items-stretch" aria-live="polite">
          <motion.button
            type="button"
            aria-label="Close details"
            className="absolute inset-0 cursor-default bg-gray-950/25 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.28 }}
            onClick={onClose}
          />

          <motion.aside
            key={`${item.eyebrow}-${item.title}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-detail-title"
            className="relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[2rem] border border-white/70 bg-white/95 shadow-[0_-24px_80px_rgba(15,23,42,0.18)] backdrop-blur-2xl md:h-full md:max-h-none md:w-[min(42rem,48vw)] md:rounded-none md:rounded-l-[2rem] md:shadow-[-24px_0_80px_rgba(15,23,42,0.16)]"
            initial={shouldReduceMotion ? false : isDesktop ? { x: 72 } : { y: 56 }}
            animate={{ x: 0, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : isDesktop ? { x: 72, opacity: 0 } : { y: 56, opacity: 0 }}
            transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-7 py-6 md:px-10 md:py-7">
              <div className="flex items-center gap-3">
                {item.icon && (
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.accentClass ?? 'bg-gray-100 text-gray-900'}`}>
                    {item.icon}
                  </div>
                )}
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.28em] text-gray-400">{item.eyebrow}</p>
                  <p className="mt-1 font-mono text-[11px] font-bold text-gray-500">{item.period}</p>
                </div>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-[color,background-color,border-color,transform] duration-300 hover:scale-105 hover:border-gray-900 hover:bg-gray-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2"
                aria-label="Close details"
              >
                <X size={18} />
              </button>
            </div>

            <div className="overscroll-contain overflow-y-auto px-7 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-8 md:px-10 md:pb-12 md:pt-10">
              <div className="mb-8 border-b border-gray-100 pb-8 md:mb-10 md:pb-10">
                <div className="mb-5 flex items-center gap-3">
                  {item.ongoing && (
                    <span className="rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-purple-600">
                      Ongoing
                    </span>
                  )}
                  <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-gray-400">Case notes</span>
                </div>
                <h2 id="resume-detail-title" className="max-w-xl text-4xl font-black leading-[0.98] tracking-tight text-gray-950 md:text-5xl">
                  {item.title}
                </h2>
                <p className="mt-4 text-sm font-bold uppercase tracking-[0.14em] text-gray-400">{item.subtitle}</p>
                <p className="mt-7 max-w-xl text-lg leading-relaxed text-gray-600">{item.summary}</p>
              </div>

              <div className="space-y-9 md:space-y-10">
                {item.sections.map((section, index) => (
                  <section key={`${section.label}-${section.title}`} className="grid grid-cols-1 gap-3 md:grid-cols-[3rem_1fr] md:gap-5">
                    <div className="flex items-center gap-3 pt-1 font-mono text-[10px] font-bold text-gray-300 md:block">
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <span className="font-sans font-black uppercase tracking-[0.22em] text-gray-400 md:hidden">{section.label}</span>
                      <span className="h-px flex-1 bg-gray-100 md:hidden" />
                    </div>
                    <div>
                      <div className="mb-3 hidden items-center gap-3 md:flex">
                        <span className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-400">{section.label}</span>
                        <span className="h-px flex-1 bg-gray-100" />
                      </div>
                      <h3 className="text-xl font-bold leading-tight text-gray-900">{section.title}</h3>
                      <p className="mt-3 leading-relaxed text-gray-600">{section.body}</p>
                    </div>
                  </section>
                ))}
              </div>

              {item.tags && item.tags.length > 0 && (
                <div className="mt-12 border-t border-gray-100 pt-8">
                  <div className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.24em] text-gray-400">
                    <ArrowDownRight size={14} />
                    Capabilities
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default ResumeDetailPanel;
