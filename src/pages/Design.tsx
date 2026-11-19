import { useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { visibleDesignProjects } from '../data/designProjects';
import type { ProjectData } from '../data/types';
import { Reveal } from '../components/casestudy/primitives';
import { useFinePointer } from '../hooks/useFinePointer';
import LightRing from '../components/casestudy/LightRing';
import '../components/casestudy/designIndex.css';

/*
  Design index, in the same visual language as the Wisp case study (/design/9):
  warm paper, thin rules, mono labels, the work's own images as the main event.
  Two views: a staggered grid, and a compact index whose rows float a preview image.
*/

type View = 'grid' | 'index';

const startYear = (p: ProjectData) => p.time.match(/\d{4}/)?.[0] ?? '';
const shortCategory = (c?: string) => (c ?? '').replace(' Design', '');
const blurb = (p: ProjectData) => p.subtitle ?? p.description;
const thumb = (p: ProjectData) => p.thumb ?? p.image;
// Wisp shows its own light: the ring from the case-study hero, laid on paper.
const isWisp = (p: ProjectData) => p.id === 9;
const Visual = ({ p, eager }: { p: ProjectData; eager?: boolean }) => (
  <div className={`di-img ${isWisp(p) ? 'di-img--ring' : ''}`}>
    {isWisp(p)
      ? <LightRing state="present" tone="light" />
      : <img src={thumb(p)} alt={p.title} loading={eager ? 'eager' : 'lazy'} decoding="async" />}
  </div>
);

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M1 7h12m0 0L7.5 1.5M13 7l-5.5 5.5" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const Featured = ({ p, n }: { p: ProjectData; n: string }) => (
  <Reveal>
    <Link to={`/design/${p.id}`} className="di-featured">
      <Visual p={p} eager />
      <div className="di-featured-text">
        <div className="di-meta"><span className="n">{n}</span><span>Latest</span><span>{shortCategory(p.category)}</span><span>{startYear(p)}</span></div>
        <h2 className="di-featured-title">{p.title}</h2>
        {p.subtitle && <p className="di-featured-sub">{p.subtitle}</p>}
        <p className="di-featured-desc">{p.description}</p>
        <span className="di-more">View case study <Arrow /></span>
      </div>
    </Link>
  </Reveal>
);

const Card = ({ p, n, delay }: { p: ProjectData; n: string; delay: number }) => (
  <Reveal delay={delay}>
    <Link to={`/design/${p.id}`} className="di-card">
      <Visual p={p} />
      <div className="di-meta"><span className="n">{n}</span><span>{shortCategory(p.category)}</span><span>{startYear(p)}</span></div>
      <h3 className="di-card-title">{p.title} <span className="di-arrow"><Arrow /></span></h3>
      <p className="di-card-sub">{blurb(p)}</p>
    </Link>
  </Reveal>
);

const IndexList = ({ items }: { items: { p: ProjectData; n: string }[] }) => {
  const fine = useFinePointer();
  const [hover, setHover] = useState<ProjectData | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const frame = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const move = (e: MouseEvent) => {
    pos.current = { x: e.clientX, y: e.clientY };
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const el = preview.current;
      if (el) el.style.transform = `translate3d(${pos.current.x + 28}px, ${pos.current.y - 120}px, 0)`;
    });
  };

  return (
    <div className="di-index" onMouseMove={fine ? move : undefined} onMouseLeave={() => setHover(null)}>
      <div className="di-index-head cs-label">
        <span>No.</span><span>Project</span><span className="c">Discipline</span><span className="t">Timeline</span><span />
      </div>
      {items.map(({ p, n }) => (
        <Link key={p.id} to={`/design/${p.id}`} className="di-row" onMouseEnter={() => setHover(p)}>
          <span className="n">{n}</span>
          <span className="title">
            {!fine && <img src={thumb(p)} alt="" loading="lazy" />}
            <span>{p.title}<em>{blurb(p)}</em></span>
          </span>
          <span className="c">{p.category}</span>
          <span className="t">{p.time.replace(' - ', ' – ')}</span>
          <span className="a"><Arrow /></span>
        </Link>
      ))}
      {fine && (
        <div ref={preview} className={`di-preview ${hover ? 'is-on' : ''}`} aria-hidden="true">
          {hover && <img key={hover.id} src={thumb(hover)} alt="" />}
        </div>
      )}
    </div>
  );
};

const Design = () => {
  const [filter, setFilter] = useState<string>('All');
  const [view, setView] = useState<View>('grid');

  const all = visibleDesignProjects.map((p, i) => ({ p, n: String(i + 1).padStart(2, '0') }));
  const categories = ['All', ...Array.from(new Set(visibleDesignProjects.map(p => p.category ?? '').filter(Boolean)))];
  const items = filter === 'All' ? all : all.filter(({ p }) => p.category === filter);
  const [first, ...rest] = items;
  const showFeatured = filter === 'All' && view === 'grid' && first;
  const gridItems = showFeatured ? rest : items;
  const count = (c: string) => (c === 'All' ? all.length : all.filter(({ p }) => p.category === c).length);
  const years = all.map(({ p }) => Number(startYear(p))).filter(Boolean);

  return (
    <main className="cs di">
      <header className="cs-wrap di-head">
        <Reveal>
          <div className="cs-label">Design — {Math.min(...years)}–{Math.max(...years)}</div>
          <h1 className="di-title">Design</h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="di-intro">
            Objects, interfaces and the systems behind them. Industrial and interaction design,
            from a foldable lamp to a lamp that houses an AI agent.
          </p>
        </Reveal>
      </header>

      <div className="cs-wrap">
        <div className="di-bar">
          <div className="di-filters" role="group" aria-label="Filter by discipline">
            {categories.map(c => (
              <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(c)}>
                {c === 'All' ? 'All work' : shortCategory(c)}<sup>{count(c)}</sup>
              </button>
            ))}
          </div>
          <div className="di-views" role="group" aria-label="View">
            <button type="button" aria-pressed={view === 'grid'} onClick={() => setView('grid')}>Grid</button>
            <button type="button" aria-pressed={view === 'index'} onClick={() => setView('index')}>Index</button>
          </div>
        </div>

        {view === 'grid' ? (
          <div key={`grid-${filter}`}>
            {showFeatured && <Featured p={first.p} n={first.n} />}
            <div className="di-grid">
              {gridItems.map(({ p, n }, i) => <Card key={p.id} p={p} n={n} delay={(i % 2) * 90} />)}
            </div>
          </div>
        ) : (
          <IndexList key={`index-${filter}`} items={items} />
        )}
      </div>

      <div className="di-foot"><Footer /></div>
    </main>
  );
};

export default Design;
