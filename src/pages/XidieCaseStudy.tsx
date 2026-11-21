import { useCallback, useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Viewer from '../components/casestudy/Viewer';
import { Reveal, SectionHead, Film, ArrowLeft } from '../components/casestudy/primitives';
import type { ProjectData, StoryImage } from '../data/types';
import '../components/casestudy/xidie.css';

/*
  XIDIE — /design/4. Media in /public/Design_4.
  Palette taken from the object: porcelain white, the earth yellow of the city wall,
  calligraphy ink, Qinghua cobalt and the "Xi'an red" of the port.
  x_*.webp are the 2560 px renders; xidie_film.mp4 is Video.mp4 in H.264.
*/

const M = '/Design_4';

const MOTIFS = [
  {
    zh: '青花瓷碗', en: 'Porcelain bowl', src: `${M}/x_bowl.webp`,
    alt: 'Close-up of the blue-and-white pattern on the round cable case',
    text: 'The retractable cable case takes its shape and pattern from the blue-and-white bowls that hand-pulled noodles are served in. A familiar thing from the table, holding the cable.',
  },
  {
    zh: '扯面', en: 'Pulled noodle', src: `${M}/x_noodle.webp`,
    alt: 'The cable plug, marked with a drawn ribbon of noodle and a red ring, entering the cable case',
    text: 'The cable is the noodle: long and pliable, pulled out of the bowl and wound back into it. Its plug carries a single drawn ribbon of noodle.',
  },
  {
    zh: '城墙', en: 'City wall', src: `${M}/x_wall.webp`,
    alt: 'The side of the charger, banded with an abstract crenellation pattern',
    text: 'The earth-yellow body takes the colour of the Xi\'an city wall, and its side carries an abstract band of the wall\'s crenellations, kept shallow so it never gets in the way of the grip.',
  },
  {
    zh: '咥', en: 'The word for eating', src: `${M}/x_die.webp`,
    alt: 'Three-quarter view of the charger with the character 咥 on its top',
    text: 'The top carries 咥 (diē), the Shaanxi word for eating, said every day across the city. Written large in ink, it names what the object is for.',
  },
];

const Motifs = ({ open }: { open: (src: string) => void }) => {
  const [at, setAt] = useState(0);
  // Walks through the four on its own until someone picks one.
  const [auto, setAuto] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    if (!auto) return;
    const id = window.setTimeout(() => setAt(i => (i + 1) % MOTIFS.length), 6000);
    return () => window.clearTimeout(id);
  }, [auto, at]);
  const pick = (i: number) => { setAuto(false); setAt(i); };
  return (
    <div className="xd-motifs">
      <Reveal>
        <button type="button" className="xd-stage" onClick={() => open(MOTIFS[at].src)} aria-label={`View larger: ${MOTIFS[at].alt}`}>
          {MOTIFS.map((m, i) => (
            <img key={m.src} src={m.src} alt={i === at ? m.alt : ''} className={i === at ? 'is-on' : ''} loading="lazy" decoding="async" />
          ))}
        </button>
        <div className="xd-progress" aria-hidden="true">
          <span className="cs-label">{String(at + 1).padStart(2, '0')} / {String(MOTIFS.length).padStart(2, '0')}</span>
          <div className="xd-bars">
            {MOTIFS.map((m, i) => (
              <span key={m.zh} className={i < at ? 'is-done' : i === at ? (auto ? 'is-run' : 'is-done') : ''}>
                {i === at && <i key={`${at}-${auto}`} />}
              </span>
            ))}
          </div>
          <span className="cs-label xd-progress-name">{MOTIFS[at].en}</span>
        </div>
      </Reveal>
      <Reveal delay={120}>
        <ol className="xd-list">
          {MOTIFS.map((m, i) => (
            <li key={m.zh}>
              <button type="button" aria-pressed={i === at} onClick={() => pick(i)}>
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <span className="zh">{m.zh}</span>
                <span className="en">{m.en}</span>
                <span className="x">{m.text}</span>
              </button>
            </li>
          ))}
        </ol>
      </Reveal>
    </div>
  );
};

/* Every image that opens in the viewer, in page order. */
const GALLERY: StoryImage[] = [
  ...MOTIFS.map(m => ({ src: m.src, alt: m.alt, ratio: 16 / 9, caption: `${m.zh} · ${m.en}` })),
  { src: `${M}/D4_3.webp`, alt: 'A shop display of cultural souvenirs: prints, boxes and figurines', ratio: 1000 / 667, caption: 'Market: cultural products that stop at decoration.' },
  { src: `${M}/D4_4.webp`, alt: 'Affinity map of user-research notes', ratio: 1100 / 612, caption: 'User research: notes clustered into insights.' },
  { src: `${M}/x_detach.webp`, alt: 'The cable case lifted off the charger, showing the magnetic contacts', ratio: 16 / 9, caption: 'Detachable: the cable case lifts off; magnetic contacts keep it seated and powered.' },
  { src: `${M}/x_three_quarter.webp`, alt: 'The charger with its cable wound around the bowl', ratio: 16 / 9, caption: 'Coiled: the cable winds into the bowl.' },
  { src: `${M}/x_plug.webp`, alt: 'The charger from below with its plug pins folded out', ratio: 16 / 9, caption: 'Foldable plug: compact enough for a pocket.' },
  { src: `${M}/D4_5.webp`, alt: 'Technical study: exploded cable case, GaN chip datasheet, teardown of a GaN power board, output specification', ratio: 1600 / 860, caption: 'Technical study: a GaN power board and planar transformer, the chip datasheet and the output specification.' },
];

const Shot = ({ src, ratio, open, caption, alt }: { src: string; ratio: number; open: (s: string) => void; caption?: string; alt: string }) => (
  <figure className="cs-fig">
    <button type="button" className="cs-frame cs-zoom" style={{ aspectRatio: String(ratio) }} onClick={() => open(src)} aria-label={`View larger: ${alt}`}>
      <img src={src} alt={alt} loading="lazy" decoding="async" />
    </button>
    {caption && <figcaption className="cs-cap">{caption}</figcaption>}
  </figure>
);

const XidieCaseStudy = ({ project, prev, next }: { project: ProjectData; prev: ProjectData; next: ProjectData }) => {
  const [at, setAt] = useState<number | null>(null);
  const open = useCallback((src: string) => {
    const i = GALLERY.findIndex(g => g.src === src);
    if (i >= 0) setAt(i);
  }, []);
  const close = useCallback(() => setAt(null), []);
  const img = (src: string) => GALLERY.find(g => g.src === src)!;

  return (
    <main className="cs xd">
      <Seo title="XIDIE — Xi'an Food Culture in a 65 W GaN Charger | Ruipeng Wang" description={project.description} />

      {/* ── Hero: the object from above, the dialect line set vertically ── */}
      <header className="xd-hero">
        <img className="xd-hero-img" src={`${M}/x_top.webp`} alt="XIDIE from above: a porcelain-patterned cable case on an earth-yellow body marked 咥" fetchPriority="high" />
        <div className="xd-hero-in cs-wrap">
          <Link to="/design" className="cs-back"><ArrowLeft /><span className="cs-label" style={{ color: 'inherit' }}>Design</span></Link>
          <p className="xd-vert" lang="zh-CN">
            <span className="xd-vert-k">「咥」西安方言</span>
            <span>藏古城烟火，裹美食与生活的热忱。</span>
          </p>
          <div className="xd-hero-text">
            <div className="cs-label">Industrial Design — 2025</div>
            <h1 className="xd-title">XIDIE</h1>
            <p className="cs-hero-sub">Xi'an's food culture, built into a 65 W charger.</p>
          </div>
          <div className="cs-hero-meta xd-hero-meta">
            <span><b>Type</b>Concept</span>
            <span><b>Power</b>65 W GaN</span>
            <span><b>Thickness</b>≤ 10 mm</span>
          </div>
        </div>
      </header>

      {/* ── Overview ── */}
      <section className="cs-sec">
        <div className="cs-wrap">
          <div className="cs-split">
            <Reveal>
              <dl className="cs-facts">
                <div><dt>Type</dt><dd>Concept, cultural and creative product</dd></div>
                <div><dt>For</dt><dd>Young people, 18–30, who carry their chargers every day</dd></div>
                <div><dt>Power</dt><dd>65 W GaN fast charging</dd></div>
                <div><dt>Size</dt><dd>No more than 10 mm thick</dd></div>
                <div><dt>Timeline</dt><dd>{project.time.replace(' - ', ' – ')}</dd></div>
              </dl>
            </Reveal>
            <Reveal delay={100}>
              <p className="cs-lead">
                Most cultural products are printed with a pattern and put on a shelf. XIDIE takes the food of Xi'an,
                its hand-pulled noodles, old porcelain bowls and city wall, and builds it into a charger you use every day.
              </p>
              <div style={{ height: 32 }} />
              <p className="cs-body">
                The city's food culture becomes a tangible part of daily life, paired with the practical needs of young
                users: a GaN charger thin enough for a pocket, with a cable that winds into a porcelain bowl like a pulled noodle.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 01 Film ── */}
      <section className="cs-sec cs-dark" data-nav-dark>
        <div className="cs-wrap">
          <SectionHead index="01" label="Film" title="One take, around the object." />
          <Reveal>
            <Film src={`${M}/xidie_film.mp4`} poster={`${M}/film_poster.webp`} label="Play film — 0:34" />
            <p className="cs-cap">A single continuous shot that traces the product's contours, connecting form, material and function.</p>
          </Reveal>
        </div>
      </section>

      {/* ── 02 咥: the idea, set on the earth-yellow of the city wall ── */}
      <section className="cs-sec xd-wheat">
        <div className="cs-wrap xd-die">
          <Reveal className="xd-die-char">
            <span className="xd-glyph" lang="zh-CN">咥</span>
            <span className="xd-pron"><b>diē</b> · Shaanxi dialect · to eat</span>
          </Reveal>
          <Reveal delay={100}>
            <div className="cs-label xd-die-label"><span>02</span><span>Concept</span></div>
            <h2 className="cs-h2">Food energy, device energy.</h2>
            <p className="cs-body" style={{ marginTop: 28 }}>
              Xi'an is known for hearty food, the hand-pulled noodles that carry locals through the day. XIDIE borrows
              that idea: just as the city's dishes give people energy, the charger gives it to their devices.
            </p>
            <p className="cs-body">
              The concept is a food energy station: a pocket charger built from the bowl, the noodle, the city wall and
              the word for eating, rather than one with a picture of them printed on it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 03 Motifs ── */}
      <section className="cs-sec">
        <div className="cs-wrap">
          <SectionHead index="03" label="Details" title="Four details, one city." />
          <Motifs open={open} />
        </div>
      </section>

      {/* ── 04 Research ── */}
      <section className="cs-sec xd-porcelain">
        <div className="cs-wrap">
          <SectionHead index="04" label="Research" title="Culture people actually use." />
          <div className="xd-research">
            <Reveal>
              <Shot {...img(`${M}/D4_3.webp`)} open={open} caption={undefined} />
              <h3 className="cs-h3" style={{ marginTop: 24 }}>Market</h3>
              <p className="cs-body">Many cultural products are decorative: cultural elements printed onto an object, without meeting any real need in use.</p>
            </Reveal>
            <Reveal delay={100}>
              <Shot {...img(`${M}/D4_4.webp`)} open={open} caption={undefined} />
              <h3 className="cs-h3" style={{ marginTop: 24 }}>Users</h3>
              <p className="cs-body">Young users favour portable digital accessories they use many times a day, with understated cultural touches that blend into that use.</p>
            </Reveal>
          </div>
          <Reveal>
            <div className="xd-brief">
              <div className="xd-brief-head">
                <div className="cs-label">Brief</div>
                <p>A portable charger that merges Xi'an's food culture with GaN fast charging, and breaks the decorative-only habit of cultural products.</p>
              </div>
              <ol>
                <li><span className="n">01</span><h4>Blend, not print</h4><p>Cultural elements sit naturally in the form of a working charger, and never feel forced.</p></li>
                <li><span className="n">02</span><h4>Pocket-sized</h4><p>No more than 10 mm thick, so it travels like any other daily accessory.</p></li>
                <li><span className="n">03</span><h4>Both at once</h4><p>65 W fast charging, without giving up the cultural look.</p></li>
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 05 Engineering ── */}
      <section className="cs-sec">
        <div className="cs-wrap">
          <SectionHead index="05" label="Engineering" title="Thin enough for a pocket." />
          <Reveal>
            <div className="cs-stats xd-stats">
              <div><div className="cs-num">65<small> W</small></div><p>GaN fast charging.</p></div>
              <div><div className="cs-num">40<small> %</small></div><p>Less volume, from GaN and a planar transformer.</p></div>
              <div><div className="cs-num">≤10<small> mm</small></div><p>Thick, with the plug folded away.</p></div>
            </div>
          </Reveal>
          <Reveal>
            <ul className="cs-features xd-features" style={{ '--cols': 3 } as CSSProperties}>
              <li><Shot {...img(`${M}/x_detach.webp`)} open={open} caption={undefined} /><h4>Detachable</h4><p>The cable case lifts off for replacement. Magnetic contacts keep it seated and powered.</p></li>
              <li><Shot {...img(`${M}/x_three_quarter.webp`)} open={open} caption={undefined} /><h4>Coiled</h4><p>The cable winds into the bowl, and comes out to the length you need.</p></li>
              <li><Shot {...img(`${M}/x_plug.webp`)} open={open} caption={undefined} /><h4>Folded</h4><p>The plug folds flat. Its smooth, wall-inspired shape keeps the cultural look without giving up practicality.</p></li>
            </ul>
          </Reveal>
          <Reveal>
            <div className="cs-gap-top">
              <Shot {...img(`${M}/D4_5.webp`)} open={open} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Close ── */}
      <section className="xd-close">
        <img src={`${M}/x_front.webp`} alt="" aria-hidden="true" loading="lazy" />
        <div className="cs-wrap">
          <Reveal>
            <p className="cs-lead">The energy of Xi'an's food, powering your digital life.</p>
            <p className="xd-close-zh" lang="zh-CN">藏古城烟火，裹美食与生活的热忱。</p>
          </Reveal>
        </div>
      </section>
      <nav className="cs-wrap" aria-label="More projects">
        <div className="cs-nav">
          <Link to={`/design/${prev.id}`}><span className="cs-label">Previous</span><span>{prev.title}</span></Link>
          <Link to={`/design/${next.id}`}><span className="cs-label">Next</span><span>{next.title}</span></Link>
        </div>
      </nav>
      <div style={{ height: 'clamp(48px, 8vw, 96px)' }} />

      {at !== null && <Viewer items={GALLERY} index={at} onClose={close} onStep={setAt} />}
    </main>
  );
};

export default XidieCaseStudy;
