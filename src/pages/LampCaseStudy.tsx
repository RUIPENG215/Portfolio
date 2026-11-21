import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Viewer from '../components/casestudy/Viewer';
import { Reveal, SectionHead, ArrowLeft } from '../components/casestudy/primitives';
import type { ProjectData, StoryImage } from '../data/types';
import '../components/casestudy/lamp.css';

/*
  Luminous Tower Crane — /design/1. Media in /public/Design_1 (l_* files, exported from the
  group's presentation). Palette from the object: graphite, studio grey, the orange of the dial,
  and the night blue of the ambient render. The "two lights" section turns the room dark.
*/

const M = '/Design_1';

type Mode = 'work' | 'ambient';
const MODES: Record<Mode, { label: string; title: string; text: string; src: string; alt: string }> = {
  work: {
    label: 'Work light',
    title: 'Unfolded, a work light.',
    text: 'The arm swings out over the desk and lights a 700 × 450 mm surface, up to 500 lux at the centre. Brightness and colour temperature are set at the dial, for comfortable reading, study and work.',
    src: `${M}/l_work.webp`,
    alt: 'The lamp with its arm unfolded, lighting the table beneath it',
  },
  ambient: {
    label: 'Ambient light',
    title: 'Folded, a glow.',
    text: 'With work done, the arm folds away and the body becomes the light: a soft ambient glow for relaxation and leisure. The spare space inside also holds a speaker, for the rest of the evening.',
    src: `${M}/l_ambient.webp`,
    alt: 'The folded lamp glowing magenta in a dark blue room',
  },
};

const USES = [
  { k: 'Reading', v: 'Light that makes reading comfortable and reduces fatigue.' },
  { k: 'Studying', v: 'An environment that helps concentration and efficiency.' },
  { k: 'Working', v: 'A stable source that keeps the working area bright enough.' },
  { k: 'Decoration', v: 'An aesthetic touch for the room.' },
];

const DETAILS: StoryImage[] = [
  { src: `${M}/l_dial.webp`, alt: 'The orange dial at the base, with lock and unlock marks', ratio: 1.5, caption: 'The lock.' },
  { src: `${M}/l_switch.webp`, alt: 'The dial with brightness, power and colour-temperature marks', ratio: 1.5, caption: 'The switch, with brightness and colour temperature.' },
  { src: `${M}/l_diffuse.webp`, alt: 'The side of the lamp with its diffuse light strip', ratio: 1.5, caption: 'Diffuse light along the side of the body.' },
  { src: `${M}/l_base.webp`, alt: 'The underside of the base with a Type-C port and a wireless charging pad', ratio: 1.5, caption: 'Type-C charging port, and wireless charging in the base.' },
  { src: `${M}/l_joint.webp`, alt: 'The joint where the arm meets the body', ratio: 1.5, caption: 'The joint.' },
  { src: `${M}/l_groove.webp`, alt: 'The groove in the top of the body that receives the arm', ratio: 1.5, caption: 'The groove that takes the folded arm.' },
];

const PARTS_BODY = ['Top', 'Speaker', 'Core', 'PCB', 'Shell', 'LED, ambient', 'Acrylic cover, ambient', 'Knob', 'Switch', 'Connector', 'Back', 'LED, base', 'Base', 'Acrylic cover, base'];
const PARTS_ARM = ['Slider', 'Sticks', 'Shaft', 'Slider 2', 'Handle front', 'Light frame', 'LED', 'Light guide plate'];

const COLOURS = [
  { name: 'Red', swatch: '#2b2b2c', src: `${M}/l_c_red.webp`, alt: 'Graphite body with a red handle', accent: '#d8332f' },
  { name: 'White', swatch: '#f1f1ef', src: `${M}/l_c_white.webp`, alt: 'White body with a grey handle', accent: '#c9c9c9' },
  { name: 'Cyan', swatch: '#dcdcdc', src: `${M}/l_c_cyan.webp`, alt: 'Light grey body with a cyan handle', accent: '#36d0e0' },
  { name: 'Yellow', swatch: '#f2cf2f', src: `${M}/l_c_yellow.webp`, alt: 'Yellow body with a purple handle', accent: '#5b2a8c' },
];

const GALLERY: StoryImage[] = [
  { src: MODES.work.src, alt: MODES.work.alt, ratio: 1.5, caption: 'Work light.' },
  { src: MODES.ambient.src, alt: MODES.ambient.alt, ratio: 1.5, caption: 'Ambient light.' },
  { src: `${M}/l_front.webp`, alt: 'The folded lamp from the front', ratio: 1.5, caption: 'Folded, front.' },
  { src: `${M}/l_side.webp`, alt: 'The folded lamp from the side', ratio: 1.5, caption: 'Folded, side.' },
  { src: `${M}/l_top.webp`, alt: 'The arm seen from above, casting light on the wall', ratio: 1.5, caption: 'The arm from above.' },
  { src: `${M}/l_bar.webp`, alt: 'The light bar and its rails', ratio: 1.5, caption: 'The area light and its rails.' },
  ...DETAILS,
  { src: `${M}/l_carry.webp`, alt: 'A hand carrying the lamp by its handle', ratio: 1.6, caption: 'Carry.' },
  { src: `${M}/l_turn.webp`, alt: 'A finger turning the dial at the base', ratio: 1.6, caption: 'Turn.' },
  { src: `${M}/l_exploded.webp`, alt: 'Exploded view of the body, parts numbered 1 to 14', ratio: 1800 / 2135, caption: 'Body, exploded.' },
  { src: `${M}/l_exploded_arm.webp`, alt: 'Exploded view of the arm, parts numbered', ratio: 1800 / 2400, caption: 'Arm, exploded.' },
  { src: `${M}/l_drawing.webp`, alt: 'Assembly drawing with section A-A and parts list', ratio: 4678 / 3308, caption: 'Assembly drawing, section A-A and parts list.' },
];

type Open = (src: string) => void;

const Shot = ({ img, open, className = '' }: { img: StoryImage; open: Open; className?: string }) => (
  <figure className={`cs-fig ${className}`}>
    <button type="button" className={`cs-frame cs-zoom ${img.contain ? 'cs-frame--contain' : ''}`} style={{ aspectRatio: String(img.ratio) }} onClick={() => open(img.src)} aria-label={`View larger: ${img.alt}`}>
      <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
    </button>
    {img.caption && <figcaption className="cs-cap">{img.caption}</figcaption>}
  </figure>
);

const g = (src: string) => GALLERY.find(i => i.src === src)!;

/* ── Two lights: the section itself goes dark for the ambient light ── */
const TwoLights = ({ open }: { open: Open }) => {
  const [mode, setMode] = useState<Mode>('work');
  const m = MODES[mode];
  const dark = mode === 'ambient';
  return (
    <section className={`cs-sec lt-modes ${dark ? 'is-night' : ''}`} data-nav-dark={dark || undefined}>
      <div className="cs-wrap">
        <SectionHead index="02" label="Two lights" title="One lamp, two lights." />
        <div className="lt-modes-grid">
          <Reveal>
            <button type="button" className="lt-stage" onClick={() => open(m.src)} aria-label={`View larger: ${m.alt}`}>
              {(Object.keys(MODES) as Mode[]).map(k => (
                <img key={k} src={MODES[k].src} alt={k === mode ? MODES[k].alt : ''} className={k === mode ? 'is-on' : ''} loading="lazy" decoding="async" />
              ))}
            </button>
          </Reveal>
          <Reveal delay={100}>
            <div className="lt-switch" role="radiogroup" aria-label="Light">
              {(Object.keys(MODES) as Mode[]).map(k => (
                <button key={k} type="button" role="radio" aria-checked={k === mode} onClick={() => setMode(k)}>{MODES[k].label}</button>
              ))}
              <span className="lt-knob" style={{ transform: dark ? 'translateX(100%)' : 'none' }} aria-hidden="true" />
            </div>
            <div className="lt-mode-text" key={mode}>
              <h3 className="cs-h3">{m.title}</h3>
              <p className="cs-body">{m.text}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

/* ── Colourways: swatches swap the render ── */
const Colours = ({ open }: { open: Open }) => {
  const [at, setAt] = useState(0);
  const c = COLOURS[at];
  return (
    <div className="lt-colours">
      <Reveal>
        <button type="button" className="lt-colour-stage" onClick={() => open(c.src)} aria-label={`View larger: ${c.alt}`}>
          {COLOURS.map((k, i) => <img key={k.src} src={k.src} alt={i === at ? k.alt : ''} className={i === at ? 'is-on' : ''} loading="lazy" decoding="async" />)}
        </button>
      </Reveal>
      <Reveal delay={100}>
        <div className="lt-swatches" role="radiogroup" aria-label="Colourway">
          {COLOURS.map((k, i) => (
            <button key={k.name} type="button" role="radio" aria-checked={i === at} onClick={() => setAt(i)} aria-label={k.name}>
              <span className="dot" style={{ background: `linear-gradient(135deg, ${k.swatch} 0 58%, ${k.accent} 58% 100%)` }} />
              <span className="cs-label">{k.name}</span>
            </button>
          ))}
        </div>
        <p className="cs-cap" style={{ marginTop: 20 }}>Colourways developed by other members of the team.</p>
      </Reveal>
    </div>
  );
};

const LampCaseStudy = ({ project, prev, next }: { project: ProjectData; prev: ProjectData; next: ProjectData }) => {
  const [at, setAt] = useState<number | null>(null);
  const open = useCallback<Open>(src => {
    const i = GALLERY.findIndex(x => x.src === src);
    if (i >= 0) setAt(i);
  }, []);
  const close = useCallback(() => setAt(null), []);

  return (
    <main className="cs lt">
      <Seo title="Luminous Tower Crane — A Portable, Foldable Lamp | Ruipeng Wang" description={project.description} />

      {/* ── Hero: the lamp folded, lights off ── */}
      <header className="lt-hero">
        <img className="lt-hero-img" src={`${M}/Hero_lamp.webp`} alt="The lamp folded, standing on a white shelf beside a potted plant" fetchPriority="high" />
        <div className="cs-wrap lt-hero-in">
          <Link to="/design" className="cs-back"><ArrowLeft /><span className="cs-label" style={{ color: 'inherit' }}>Design</span></Link>
          <div className="lt-hero-text">
            <div className="cs-label">Industrial Design — 2024 · PoliMi × XJTU</div>
            <h1 className="lt-title">Luminous Tower Crane</h1>
            <p className="cs-hero-sub">A portable lamp that swings out a work light, and folds back into a glow.</p>
          </div>
        </div>
      </header>

      {/* ── Overview ── */}
      <section className="cs-sec">
        <div className="cs-wrap">
          <div className="cs-split lt-overview">
            <Reveal>
              <dl className="cs-facts lt-facts">
                <div><dt>Course</dt><dd>Project Work 3<br /><span>Politecnico di Milano ×<br />Xi'an Jiaotong University</span></dd></div>
                <div><dt>Role</dt><dd>Team leader</dd></div>
                <div><dt>Tutors</dt><dd>Giorgio Colombo<br />Marco Rossoni<br /><span>Politecnico di Milano</span><br />Li Hongwei<br /><span>Xi'an Jiaotong University</span></dd></div>
                <div><dt>Team</dt><dd><span className="lt-names">{['Wang Ruipeng', 'Li Haozhuo', 'Xiao Yuhan', 'Pu Chunlin', 'Gu Yuntian', 'Chen Jiawang'].map(n => <span key={n}>{n}</span>)}</span><span>Group 10</span></dd></div>
                <div><dt>Timeline</dt><dd>{project.time.replace(' - ', ' – ')}</dd></div>
              </dl>
            </Reveal>
            <Reveal delay={100}>
              <p className="cs-lead">
                A lamp you carry by its handle from room to room. On the desk, its arm swings out like the jib of a
                crane to light the work; when the work is done, it folds back and the body glows.
              </p>
              <div style={{ height: 32 }} />
              <p className="cs-body">
                It supports physical interaction and fits work and leisure alike. Users adjust brightness and colour
                temperature to their preference, and an ambient mode turns it from a tool into an atmosphere.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 01 Context ── */}
      <section className="cs-sec lt-tint">
        <div className="cs-wrap">
          <SectionHead index="01" label="Context" title="One lamp for a shared room." />
          <div className="cs-split">
            <div />
            <Reveal>
              <p className="cs-body">
                The user attends university and lives off campus, in a shared apartment or a small studio. One desk has
                to serve every purpose, so they want a single lamp that does several things: more than one kind of
                light, easy to move, with adjustable brightness and colour temperature.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <ol className="lt-uses">
              {USES.map((u, i) => (
                <li key={u.k}><span className="n">{String(i + 1).padStart(2, '0')}</span><h4>{u.k}</h4><p>{u.v}</p></li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ── 02 Two lights ── */}
      <TwoLights open={open} />

      {/* ── 03 Brief in numbers ── */}
      <section className="cs-sec">
        <div className="cs-wrap">
          <SectionHead index="03" label="Brief" title="Small when carried, large when lit." />
          <Reveal>
            <div className="cs-stats lt-stats">
              <div><div className="cs-num">500<small> lux</small></div><p>At the centre of the lit surface.</p></div>
              <div><div className="cs-num">700×450<small> mm</small></div><p>Table area the work light covers.</p></div>
              <div><div className="cs-num">400<small> mm</small></div><p>Approximate height of the luminous surface.</p></div>
              <div><div className="cs-num">200–400<small> mm</small></div><p>Height when folded.</p></div>
              <div><div className="cs-num">100×100<small> mm</small></div><p>Footprint when folded.</p></div>
              <div><div className="cs-num">2</div><p>Lights: work and ambient.</p></div>
            </div>
          </Reveal>
          <Reveal>
            <div className="cs-row cs-gap-top">
              <Shot img={g(`${M}/l_front.webp`)} open={open} className="lt-r15" />
              <Shot img={g(`${M}/l_side.webp`)} open={open} className="lt-r15" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 04 The crane ── */}
      <section className="cs-sec lt-crane">
        <div className="cs-wrap">
          <SectionHead index="04" label="Mechanism" title="An arm that slides and turns." />
          <div className="cs-split cs-split--wide">
            <Reveal>
              <div className="lt-film">
                <video src={`${M}/l_crane.mp4`} poster={`${M}/l_crane_poster.webp`} autoPlay muted loop playsInline preload="metadata" aria-label="Animation: the arm sliding out and the light bar rotating" />
              </div>
              <p className="cs-cap">The rotation-slip structure, from the group's animation.</p>
            </Reveal>
            <Reveal delay={100}>
              <p className="cs-body">
                The grip and the lamp are one integrated structure, so the handle that carries it is also the arm that
                holds the light. A screw-slider mechanism lets the light move back and forth along the arm and rotate,
                so its position can be adjusted freely.
              </p>
              <p className="cs-body">
                Like a tower crane, the jib reaches out over the work from a single column, and the column stays small
                enough to carry.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <div className="cs-row cs-gap-top">
              <Shot img={g(`${M}/l_top.webp`)} open={open} className="lt-r15" />
              <Shot img={g(`${M}/l_bar.webp`)} open={open} className="lt-r15" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 05 Details ── */}
      <section className="cs-sec">
        <div className="cs-wrap">
          <SectionHead index="05" label="Details" title="Everything at the base." />
          <Reveal>
            <div className="lt-details">
              {DETAILS.map(d => <Shot key={d.src} img={d} open={open} />)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 06 Interaction ── */}
      <section className="cs-sec lt-tint">
        <div className="cs-wrap">
          <SectionHead index="06" label="Interaction" title="Lift it, turn it." />
          <Reveal>
            <div className="lt-hands">
              <figure className="cs-fig">
                <button type="button" className="cs-zoom lt-hand" onClick={() => open(`${M}/l_carry.webp`)} aria-label="View larger: carrying the lamp">
                  <img src={`${M}/l_carry.webp`} alt="A hand carrying the lamp by its handle" loading="lazy" />
                </button>
                <figcaption className="cs-cap"><b>Carry.</b> The handle is the top of the arm, so the lamp goes where you go.</figcaption>
              </figure>
              <figure className="cs-fig">
                <button type="button" className="cs-zoom lt-hand" onClick={() => open(`${M}/l_turn.webp`)} aria-label="View larger: turning the dial">
                  <img src={`${M}/l_turn.webp`} alt="A finger turning the dial at the base" loading="lazy" />
                </button>
                <figcaption className="cs-cap"><b>Turn.</b> The lock and the switch sit together at the base.</figcaption>
              </figure>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 07 Inside ── */}
      <section className="cs-sec lt-paper">
        <div className="cs-wrap">
          <SectionHead index="07" label="Inside" title="Two assemblies, twenty-two parts." />
          <div className="lt-explode">
            <Reveal>
              <div className="lt-explode-col">
                <Shot img={{ ...g(`${M}/l_exploded.webp`), caption: undefined }} open={open} />
                <div>
                  <div className="cs-label lt-explode-h">Body</div>
                  <ol className="lt-parts">{PARTS_BODY.map(p => <li key={p}>{p}</li>)}</ol>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="lt-explode-col">
                <Shot img={{ ...g(`${M}/l_exploded_arm.webp`), caption: undefined }} open={open} />
                <div>
                  <div className="cs-label lt-explode-h">Arm</div>
                  <ol className="lt-parts">{PARTS_ARM.map(p => <li key={p}>{p}</li>)}</ol>
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal>
            <div className="cs-gap-top"><Shot img={{ ...g(`${M}/l_drawing.webp`), contain: true }} open={open} /></div>
          </Reveal>
        </div>
      </section>

      {/* ── 08 Colour ── */}
      <section className="cs-sec">
        <div className="cs-wrap">
          <SectionHead index="08" label="Colour" title="The same lamp, other moods." />
          <Colours open={open} />
        </div>
      </section>

      {/* ── Close ── */}
      <section className="cs-close">
        <div className="cs-wrap">
          <Reveal>
            <span className="lt-close-dot" aria-hidden="true" />
            <p className="cs-lead">Wherever you go, your glow follows.</p>
            <p className="cs-credits">
              Group 10 · Wang Ruipeng (team leader), Li Haozhuo, Xiao Yuhan, Pu Chunlin, Gu Yuntian, Chen Jiawang<br />
              Project Work 3, Politecnico di Milano × Xi'an Jiaotong University
            </p>
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

export default LampCaseStudy;
