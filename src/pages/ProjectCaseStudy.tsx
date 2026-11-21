import { useCallback, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Viewer from '../components/casestudy/Viewer';
import { Reveal, SectionHead, Film, ArrowLeft, ArrowOut } from '../components/casestudy/primitives';
import type { CaseStory, ProjectData, StoryImage, StoryMedia, StorySection } from '../data/types';

/*
  Shared case-study template for the design projects, in the same visual language as Wisp
  (/design/9, which keeps its own bespoke page). Everything on the page comes from
  `project.story` in src/data/designProjects.tsx. Every image opens in the viewer.
*/

type Open = (src: string) => void;

const year = (time: string) => time.match(/\d{4}/)?.[0] ?? '';
const span = (time: string) => time.replace(' - ', ' – ');

/** Image in a frame; a button that opens the viewer. */
const Shot = ({ img, open, ratio, className = '' }: { img: StoryImage; open: Open; ratio?: number; className?: string }) => {
  const [missing, setMissing] = useState(false);
  if (missing) return null;
  const r = ratio ?? img.ratio;
  return (
    <figure className={`cs-fig ${className}`} style={{ '--r': r } as CSSProperties}>
      <button type="button" className={`cs-frame cs-zoom ${img.contain ? 'cs-frame--contain' : ''}`} style={{ aspectRatio: String(r) }} onClick={() => open(img.src)} aria-label={`View larger: ${img.alt}`}>
        <img src={img.src} alt={img.alt} loading="lazy" decoding="async" onError={() => setMissing(true)} />
      </button>
      {img.caption && <figcaption className="cs-cap">{img.caption}</figcaption>}
    </figure>
  );
};

const Media = ({ m, open }: { m: StoryMedia; open: Open }) => {
  switch (m.kind) {
    case 'full':
      return <Shot img={m.item} open={open} />;
    case 'row':
      return <div className="cs-row">{m.items.map(img => <Shot key={img.src} img={img} open={open} />)}</div>;
    case 'grid':
      return (
        <figure className="cs-fig">
          <div className="cs-grid" style={{ '--cols': m.cols } as CSSProperties}>
            {m.items.map(img => <Shot key={img.src} img={{ ...img, caption: undefined }} ratio={m.ratio} open={open} />)}
          </div>
          {m.caption && <figcaption className="cs-cap">{m.caption}</figcaption>}
        </figure>
      );
    case 'boards':
      return (
        <div className="cs-boards">
          {m.items.map((img, i) => (
            <figure key={img.src} className="cs-fig cs-board">
              <button type="button" className="cs-frame cs-zoom" style={{ aspectRatio: String(img.ratio) }} onClick={() => open(img.src)} aria-label={`Read board: ${img.alt}`}>
                <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
                <span className="cs-zoom-tag cs-label">View full size</span>
              </button>
              {img.caption && (
                <figcaption className="cs-cap cs-board-cap"><span className="n">{String(i + 1).padStart(2, '0')}</span>{img.caption}</figcaption>
              )}
            </figure>
          ))}
        </div>
      );
    case 'features':
      return (
        <ul className="cs-features" style={{ '--cols': m.items.length % 3 === 0 ? 3 : 2 } as CSSProperties}>
          {m.items.map(f => (
            <li key={f.src}>
              <Shot img={{ ...f, caption: undefined }} open={open} />
              <h4>{f.title}</h4>
              <p>{f.text}</p>
            </li>
          ))}
        </ul>
      );
    case 'film':
      return (
        <div>
          <Film src={m.src} poster={m.poster} label={m.label} />
          {m.caption && <p className="cs-cap">{m.caption}</p>}
        </div>
      );
  }
};

const Paragraphs = ({ items }: { items: string[] }) => (
  <div className="cs-split">
    <div />
    <Reveal>{items.map((p, i) => <p key={i} className="cs-body">{p}</p>)}</Reveal>
  </div>
);

const Section = ({ s, n, open }: { s: StorySection; n: number; open: Open }) => {
  const dark = s.tone === 'dark';
  return (
    <section
      className={`cs-sec ${dark ? 'cs-dark' : ''} ${s.tone === 'tint' ? 'cs-tint' : ''}`}
      data-nav-dark={dark || undefined}
    >
      <div className="cs-wrap">
        <SectionHead index={String(n).padStart(2, '0')} label={s.label} title={s.title} />
        {s.body && <Paragraphs items={s.body} />}
        {s.media && (
          <div className={`cs-media ${s.body ? 'cs-gap-top' : ''}`}>
            {s.media.map((m, i) => <Reveal key={i}><Media m={m} open={open} /></Reveal>)}
          </div>
        )}
        {s.after && <div className="cs-gap-top"><Paragraphs items={s.after} /></div>}
      </div>
    </section>
  );
};

/** All images on the page, in reading order, for the viewer. */
const collect = (story: CaseStory): StoryImage[] => {
  const out: StoryImage[] = [];
  for (const s of story.sections) for (const m of s.media ?? []) {
    if (m.kind === 'full') out.push(m.item);
    else if (m.kind !== 'film') out.push(...m.items);
  }
  return out;
};

const ProjectCaseStudy = ({ project, story, prev, next }: {
  project: ProjectData; story: CaseStory; prev: ProjectData; next: ProjectData;
}) => {
  const images = useMemo(() => collect(story), [story]);
  const [at, setAt] = useState<number | null>(null);
  const open = useCallback<Open>(src => {
    const i = images.findIndex(img => img.src === src);
    if (i >= 0) setAt(i);
  }, [images]);
  const close = useCallback(() => setAt(null), []);

  const { hero } = story;
  const long = project.title.length > 12;
  const link = project.externalLink;

  return (
    <main className="cs" key={project.id}>
      <Seo title={`${project.title} | Design by Ruipeng Wang`} description={project.description} />

      {/* ── Hero: title and facts above, the work full width below ── */}
      <header className={`cs-hero cs-hero--stack ${hero.dark ? 'cs-hero--dark' : ''}`} data-nav-dark={hero.dark || undefined}>
        <div className="cs-wrap">
          <Link to="/design" className="cs-back"><ArrowLeft /><span className="cs-label" style={{ color: 'inherit' }}>Design</span></Link>
          <div className="cs-stack-top">
            <div className="cs-hero-in">
              <div className="cs-label">{project.category} — {year(project.time)}</div>
              <h1 className={`cs-title ${long ? 'cs-title--long' : ''}`}>{project.title}</h1>
            </div>
            <div className="cs-hero-in cs-stack-side">
              <p className="cs-hero-sub">{story.sub}</p>
              <div className="cs-hero-meta">
                {story.meta.map(m => <span key={m.k}><b>{m.k}</b>{m.v}</span>)}
              </div>
            </div>
          </div>
          <figure className="cs-stack-img">
            <img src={hero.src} alt={hero.alt} fetchPriority="high" style={{ objectPosition: hero.position ?? '50% 50%' }} />
          </figure>
        </div>
      </header>

      {/* ── Overview ── */}
      <section className="cs-sec">
        <div className="cs-wrap">
          <div className="cs-split">
            <Reveal>
              <dl className="cs-facts">
                {story.facts.map(f => <div key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd></div>)}
                <div><dt>Timeline</dt><dd>{span(project.time)}</dd></div>
              </dl>
            </Reveal>
            <Reveal delay={100}>
              <p className="cs-lead">{story.lead}</p>
              {story.body && (
                <div style={{ marginTop: 32 }}>
                  {story.body.map((p, i) => <p key={i} className="cs-body">{p}</p>)}
                </div>
              )}
              {link && (
                <div className="cs-links">
                  <a className="cs-btn cs-btn--ghost" href={link} target="_blank" rel="noopener noreferrer">
                    {link.includes('github.com') ? 'Source code' : 'Live project'} <ArrowOut />
                  </a>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {story.sections.map((s, i) => <Section key={s.title} s={s} n={i + 1} open={open} />)}

      {/* ── Close ── */}
      {story.close && (
        <section className="cs-close">
          <div className="cs-wrap">
            <Reveal>
              <span className="cs-close-rule" aria-hidden="true" />
              <p className="cs-lead">{story.close}</p>
              {story.credits && <p className="cs-credits">{story.credits}</p>}
            </Reveal>
          </div>
        </section>
      )}
      <nav className="cs-wrap" aria-label="More projects">
        <div className="cs-nav">
          <Link to={`/design/${prev.id}`}><span className="cs-label">Previous</span><span>{prev.title}</span></Link>
          <Link to={`/design/${next.id}`}><span className="cs-label">Next</span><span>{next.title}</span></Link>
        </div>
      </nav>
      <div style={{ height: 'clamp(48px, 8vw, 96px)' }} />

      {at !== null && <Viewer items={images} index={at} onClose={close} onStep={setAt} />}
    </main>
  );
};

export default ProjectCaseStudy;
