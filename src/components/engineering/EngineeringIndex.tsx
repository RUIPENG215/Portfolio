import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import { Drawing } from './Drawings';
import { engineeringSheets, engineeringCopy } from '../../data/engineeringSheets';
import type { EngineeringSheet, Lang } from '../../data/engineeringSheets';
import './engineering.css';

/*
  Engineering index (/engineering) as a drawing set: dark graphite sheet, thin rules,
  mono annotations. A register (drawing list) up top, then one framed sheet per project
  with a schematic that plots itself in, and a title block along the bottom.
*/

const useInView = <T extends Element>() => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, { rootMargin: '0px 0px -15% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView] as const;
};

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M1 7h12m0 0L7.5 1.5M13 7l-5.5 5.5" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const ZONES_X = ['1', '2', '3', '4', '5', '6'];
const ZONES_Y = ['A', 'B', 'C', 'D'];

const Sheet = ({ s, lang, wide }: { s: EngineeringSheet; lang: Lang; wide?: boolean }) => {
  const c = engineeringCopy[lang];
  const [ref, inView] = useInView<HTMLElement>();
  const plotRef = useRef<HTMLDivElement>(null);

  // every plotted stroke gets pathLength=1 so one dash rule animates them all;
  // --k keeps line weights constant on screen however large the sheet is drawn
  useEffect(() => {
    const plot = plotRef.current;
    if (!plot) return;
    plot.querySelectorAll('.ln, .lt').forEach((el) => el.setAttribute('pathLength', '1'));
    const svg = plot.querySelector('svg');
    if (!svg) return;
    const fit = () => {
      const scale = svg.getScreenCTM()?.a || 1;
      plot.style.setProperty('--k', String(1 / scale));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(plot);
    return () => ro.disconnect();
  }, []);

  const body: ReactNode = (
    <>
      <div className="eg-zones eg-zones--x" aria-hidden="true">{ZONES_X.map((z) => <span key={z}>{z}</span>)}</div>
      <div className="eg-zones eg-zones--y" aria-hidden="true">{ZONES_Y.map((z) => <span key={z}>{z}</span>)}</div>
      <div className="eg-sheet-in">
        <div className="eg-plot" ref={plotRef}>
          <Drawing id={s.drawing} />
          {s.photo && (
            <div className={`eg-photo ${s.photo.fit === 'contain' ? 'is-contain' : ''}`}>
              <img src={s.photo.src} alt={s.title[lang]} loading="lazy" decoding="async" />
              <span className="eg-photo-tag">{c.photo}</span>
            </div>
          )}
        </div>
        <div className={`eg-tb ${s.key ? '' : 'eg-tb--nokey'}`}>
          <div className="eg-tb-no">
            <span className="lbl">DWG</span>{s.no}
            {!s.ready && <span className="eg-stamp">{c.draft}</span>}
          </div>
          <div className="eg-tb-title">
            <h3>{s.title[lang]}</h3>
            <p>{s.subtitle[lang]}</p>
          </div>
          <div className="eg-tb-cell"><span className="lbl">{c.meta.discipline}</span>{s.discipline[lang]}</div>
          <div className="eg-tb-cell eg-tb-type"><span className="lbl">{c.meta.type}</span>{s.type[lang]}</div>
          <div className="eg-tb-cell eg-tb-year"><span className="lbl">{c.meta.year}</span>{s.year}</div>
          {s.key && (
            <div className="eg-tb-key"><span className="v">{s.key.value}</span><span className="lbl">{s.key.label[lang]}</span></div>
          )}
          <p className="eg-tb-sum">{s.summary[lang]}</p>
          {s.tools.length > 0 && (
            <div className="eg-tb-tools"><span className="lbl">{c.meta.tools}</span>{s.tools.join(' · ')}</div>
          )}
          {s.ready && <span className="eg-tb-open">{c.open} <Arrow /></span>}
        </div>
      </div>
    </>
  );

  const cls = `eg-sheet ${wide ? 'eg-sheet--wide' : ''} ${inView ? 'is-in' : ''} ${s.ready ? 'is-ready' : ''}`;
  return (
    <article id={s.no.toLowerCase()} ref={ref} className={cls}>
      {s.ready ? <Link to={`/engineering/${s.id}`} className="eg-sheet-link">{body}</Link> : <div className="eg-sheet-link">{body}</div>}
    </article>
  );
};

const EngineeringIndex = ({ lang }: { lang: Lang }) => {
  const c = engineeringCopy[lang];
  const [first, ...rest] = engineeringSheets;
  const [headRef, headIn] = useInView<HTMLElement>();

  const jump = (no: string) => {
    document.getElementById(no.toLowerCase())?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={`eg ${lang === 'zh' ? 'eg--zh' : ''}`} data-nav-dark>
      <div className="eg-wrap">
        <header ref={headRef} className={`eg-head ${headIn ? 'is-in' : ''}`}>
          <div>
            <div className="eg-eyebrow">{c.eyebrow}</div>
            <h1 className="eg-title">{c.title}</h1>
          </div>
          <div className="eg-head-side">
            <p className="eg-intro">{c.intro}</p>
            <dl className="eg-set">
              {c.set.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            </dl>
          </div>
        </header>

        <section className="eg-reg" aria-label={c.register}>
          <div className="eg-reg-cap">{c.register}</div>
          <div className="eg-reg-row eg-reg-row--head" aria-hidden="true">
            {c.cols.map((col) => <span key={col}>{col}</span>)}
          </div>
          {engineeringSheets.map((s) => (
            <button key={s.no} type="button" className="eg-reg-row" onClick={() => jump(s.no)}>
              <span className="no">{s.no}</span>
              <span className="t">{s.title[lang]}{s.key && <em>{s.key.value}</em>}</span>
              <span className="d">{s.discipline[lang]}</span>
              <span className="y">{s.year}</span>
            </button>
          ))}
        </section>

        <div className="eg-sheets">
          <Sheet s={first} lang={lang} wide />
          {rest.map((s) => <Sheet key={s.no} s={s} lang={lang} />)}
        </div>

        <Footer darkMode />
      </div>
    </div>
  );
};

export default EngineeringIndex;
