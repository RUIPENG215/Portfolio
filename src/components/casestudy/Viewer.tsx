import { useCallback, useEffect, useRef, useState } from 'react';
import type { StoryImage } from '../../data/types';

/**
 * Full-screen image viewer for case-study pages. Background #131313, the frame follows the
 * image's own ratio. Click (or tap) the image to read it at full size and pan by scrolling;
 * arrow keys step through the page's images, Esc closes.
 */
const Viewer = ({ items, index, onClose, onStep }: {
  items: StoryImage[];
  index: number;
  onClose: () => void;
  onStep: (to: number) => void;
}) => {
  const item = items[index];
  const [zoom, setZoom] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const step = useCallback((d: number) => {
    setZoom(false);
    onStep((index + d + items.length) % items.length);
  }, [index, items.length, onStep]);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', key);
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => { window.removeEventListener('keydown', key); html.style.overflow = prev; };
  }, [onClose, step]);

  if (!item) return null;
  return (
    <div className="cs-viewer" role="dialog" aria-modal="true" aria-label={item.alt} onClick={onClose}>
      <div className="cs-viewer-bar" onClick={e => e.stopPropagation()}>
        <span className="cs-label">{String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
        <span className="cs-label cs-viewer-hint">{zoom ? 'Click to fit' : 'Click image for full size'}</span>
        <button ref={closeRef} type="button" className="cs-viewer-btn" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 2l12 12M14 2 2 14" stroke="currentColor" strokeWidth="1.2" /></svg>
        </button>
      </div>
      <div className={`cs-viewer-stage ${zoom ? 'is-zoom' : ''}`}>
        <img
          key={item.src}
          src={item.src}
          alt={item.alt}
          style={zoom ? undefined : { aspectRatio: String(item.ratio) }}
          onClick={e => { e.stopPropagation(); setZoom(z => !z); }}
        />
      </div>
      <div className="cs-viewer-foot" onClick={e => e.stopPropagation()}>
        {items.length > 1 && (
          <button type="button" className="cs-viewer-btn" onClick={() => step(-1)} aria-label="Previous image">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M15 8H1m0 0 6-6M1 8l6 6" stroke="currentColor" strokeWidth="1.2" /></svg>
          </button>
        )}
        <p className="cs-viewer-cap">{item.caption ?? item.alt}</p>
        {items.length > 1 && (
          <button type="button" className="cs-viewer-btn" onClick={() => step(1)} aria-label="Next image">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M1 8h14m0 0L9 2m6 6-6 6" stroke="currentColor" strokeWidth="1.2" /></svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Viewer;
