import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import './casestudy.css';

/** Fades content up once when it scrolls into view. */
export const Reveal = ({ children, delay = 0, className = '' }: {
  children: ReactNode; delay?: number; className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); io.disconnect(); }
    }, { rootMargin: '0px 0px -12% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`cs-reveal ${inView ? 'is-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/** Section heading: index + label on the left, headline on the right. */
export const SectionHead = ({ index, label, title }: { index: string; label: string; title: ReactNode }) => (
  <Reveal className="cs-head">
    <div className="cs-label"><span>{index}</span><span>{label}</span></div>
    <h2 className="cs-h2">{title}</h2>
  </Reveal>
);

/**
 * Image with an optional caption. `ratio` is width / height; inside a <Row> it also sets
 * how much room the image takes. If the file is missing the figure removes itself, so a
 * photo slot can be listed before the photo exists.
 */
export const Figure = ({ src, alt, ratio, caption, contain, className = '', style }: {
  src: string; alt: string; ratio?: number; caption?: ReactNode; contain?: boolean; className?: string; style?: CSSProperties;
}) => {
  const [missing, setMissing] = useState(false);
  if (missing) return null;
  const vars = { ...(ratio ? { '--r': ratio } : {}), ...style } as CSSProperties;
  return (
    <figure className={`cs-fig ${className}`} style={vars}>
      <div className={`cs-frame ${contain ? 'cs-frame--contain' : ''}`} style={ratio ? { aspectRatio: String(ratio) } : undefined}>
        <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setMissing(true)} />
      </div>
      {caption && <figcaption className="cs-cap">{caption}</figcaption>}
    </figure>
  );
};

/** A justified row of figures; each grows in proportion to its aspect ratio. */
export const Row = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`cs-row ${className}`}>{children}</div>
);

/** Film player: poster with a quiet play button, native controls once playing. */
export const Film = ({ src, poster, label }: { src: string; poster: string; label: string }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const start = () => {
    setStarted(true);
    const v = ref.current;
    if (v) { v.muted = false; void v.play().catch(() => undefined); }
  };
  return (
    <div className="cs-film">
      <video ref={ref} src={src} poster={poster} preload="none" playsInline controls={started} />
      {!started && (
        <button type="button" className="cs-play" onClick={start} aria-label={`Play: ${label}`}>
          <span className="ring">
            <svg width="22" height="24" viewBox="0 0 22 24" aria-hidden="true"><path d="M2 1.5v21L21 12z" fill="currentColor" /></svg>
          </span>
          <span className="cs-label">{label}</span>
        </button>
      )}
    </div>
  );
};

export const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M15 8H1m0 0 6-6M1 8l6 6" stroke="currentColor" strokeWidth="1.2" /></svg>
);
export const ArrowOut = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 10 10 2m0 0H3.5M10 2v6.5" stroke="currentColor" strokeWidth="1.2" /></svg>
);
export const ArrowDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M6 1v10m0 0L1.5 6.5M6 11l4.5-4.5" stroke="currentColor" strokeWidth="1.2" /></svg>
);
