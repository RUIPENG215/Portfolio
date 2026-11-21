import { useCallback, useState } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Viewer from '../components/casestudy/Viewer';
import { Reveal, SectionHead, ArrowLeft } from '../components/casestudy/primitives';
import type { ProjectData, StoryImage } from '../data/types';
import '../components/casestudy/knober.css';

/*
  KNOBER — /design/3. Media in /public/Design_3 (k_* files, exported from the group's final deck).
  Graphite handles on white doors, the thin red line on the handle, the green and red of the
  status ring. Third-party pictures from the deck (stock photos, mood board, material swatches,
  the DINED charts) are left out on purpose.
*/

const M = '/Design_3';
const img = (name: string, w: number, h: number, alt: string, caption?: string, contain = false): StoryImage =>
  ({ src: `${M}/${name}.webp`, ratio: w / h, alt, caption, contain });

const SKETCHES = [
  img('k_sk1', 1308, 991, 'Early sketches of door handles'),
  img('k_sk2', 1971, 1343, 'Sketches of knobs, plates and grips'),
  img('k_sk4', 1261, 1869, 'Sketches of lever and loop handles'),
  img('k_sk3', 1049, 758, 'Sketches of handles on door panels'),
  img('k_sk6', 1568, 939, 'Sketches comparing room, house and building doors'),
  img('k_sk5', 785, 675, 'Sketches of a loop handle with a round knob'),
  img('k_sk8', 821, 1200, 'Sketches of a round knob in parts'),
  img('k_sk9', 1995, 1163, 'Sketches of grips and rings'),
  img('k_sk7', 538, 760, 'Sketch of a knob on a box'),
];

const MODELS = [
  img('k_model1', 1588, 1166, 'Foam model on a room door, with a bag resting on the handle', 'Room door: place the weight on the handle, then swipe your card to unlock.'),
  img('k_model2', 1534, 2038, 'Hand lifting the foam handle on a dormitory door', 'Lift up.'),
  img('k_model3', 1528, 2035, 'Hand turning the foam handle to open the door', 'Turn the handle to open the door.'),
  img('k_model4', 1116, 1491, 'Long foam handle mounted on a unit door', 'Unit door: the long grip.'),
  img('k_model5', 1120, 1489, 'A bag resting on the long foam handle', 'Put the weight here.'),
  img('k_model6', 1116, 1492, 'Pulling the unit door open by the long handle', 'Pull open.'),
];

const STEPS = [
  { n: '01', t: 'Swipe the card', d: 'The card reader sits in the face of the knob.', i: img('k_sb_card', 878, 878, 'Drawing: a hand holding an access card') },
  { n: '02', t: 'Lift the handle', d: 'Lift it about 10°.', i: img('k_sb_lift', 721, 864, 'Drawing: a hand lifting the handle') },
  { n: '03', t: 'Swivel clutch', d: 'Inside the knob, with the electric contacts.', i: img('k_sb_parts', 1526, 1319, 'Drawing: the knob opened to show the swivel clutch and contacts') },
  { n: '04', t: 'Battery', d: 'The battery component that powers the card reader.', i: img('k_sb_battery', 671, 822, 'Drawing: the round battery component') },
];

const MATERIALS = [
  { m: 'Zinc alloy, painted', p: 'Easy to shape.' },
  { m: 'Stainless steel', p: 'Strong corrosion resistance.' },
  { m: 'Aluminium alloy', p: 'Light, strong and corrosion resistant.' },
  { m: 'Copper', p: 'Good mechanical properties and corrosion resistance.' },
  { m: 'Polypropylene (PP)', p: 'Good rigidity, heat and chemical resistance.' },
];

const PARTS = [
  { t: 'Base', d: 'Contacts for the electronic components and a connecting clip-slot; it rotates to install.', i: img('k_base_open', 1201, 864, 'The knob base opened, with the contacts and clip-slot', undefined, true) },
  { t: 'Grip and knob', d: 'A fit assembly with screw holes and a wire hole that connect to the door and to the other knob. A plain cover plate protects the inside when no card reader is needed.', i: img('k_grip2', 974, 973, 'The grip joining the knob', undefined, true) },
  { t: 'Transmission', d: 'A bevel gear drive inside the knob.', i: img('k_drive2', 735, 669, 'Cutaway of the knob showing the transmission', undefined, true) },
  { t: 'Battery', d: 'Lithium polymer, 5,000 to 6,000 mAh: three cells of 58 × 40 × 2 mm, 48 g in all. A light ring shows the component status.', i: img('k_battery', 868, 1080, 'Exploded battery stack under a clear cover', undefined, true) },
  { t: 'Lock cylinder', d: 'The cylindrical knob carries the inner structure of the lock. A carabiner gives the swivel connection, and contacts power the card reader.', i: img('k_lock3', 1044, 910, 'The inside of the knob with the lock cylinder', undefined, true) },
  { t: 'Back plate', d: 'Usually fixed on the inside to power the outside reader, and removable for charging. If the battery in the door dies, it charges over Type-C to open the door with a swipe.', i: img('k_backplate', 1663, 1431, 'The round back plate with its swivel slot and contacts', undefined, true) },
];

const SCENES = [
  img('k_door2', 2400, 1375, 'The room handle on a pale grey door', 'Room handle.'),
  img('k_gate_scene', 1618, 1600, 'The long gate handle on a dark wooden door', 'Gate handle.'),
  img('k_wood', 2400, 1350, 'Handles on a warm wooden door', 'On wood.'),
  img('k_garden', 1877, 1056, 'The gate handle on a door opening to a garden', 'At the building door.'),
];

const GALLERY: StoryImage[] = [
  img('k_main', 1920, 1200, 'The KNOBER handle on a pale door, a common room blurred behind', 'On a dormitory door.'),
  ...SKETCHES,
  img('k_concept1', 1175, 931, 'Concept 01: a lever on a round knob, with a separate plate', 'Concept 01.'),
  img('k_concept2', 380, 901, 'Concept 02: a long vertical grip between two round ends', 'Concept 02.'),
  img('k_final', 1446, 1144, 'Final concepts: the room handle and the gate handle', 'Final concepts.'),
  ...MODELS,
  img('k_model7', 958, 974, 'A hand on the foam grip', 'Grip state.'),
  img('k_model8', 770, 1372, 'A student standing at a door, using the foam handle', 'Standing use.'),
  img('k_down', 941, 1173, 'The handle at rest', 'At rest.'),
  img('k_up', 1274, 1600, 'The handle lifted', 'Lifted.'),
  ...STEPS.map(s => ({ ...s.i, caption: s.t })),
  img('k_modules', 962, 1153, 'The handle modules side by side', 'Modules.', true),
  img('k_sb_support', 873, 1513, 'Drawing: a heavy box resting on the long handle', 'Offer support: the handle takes the weight.', true),
  img('k_sb_dismantle', 1279, 1727, 'Drawing: taking the knob component off the long handle', 'Dismantle the components.', true),
  img('k_exploded', 2400, 1500, 'Exploded view of the room handle and lock', 'Exploded view.'),
  ...PARTS.map(p => ({ ...p.i, caption: p.t })),
  img('k_ring_red', 506, 506, 'The card pad with a red light ring', 'Red ring.', true),
  img('k_ring_green', 502, 502, 'The card pad with a green light ring', 'Green ring.', true),
  img('k_business', 2400, 1432, 'Business map: suppliers, manufacturers, partners and customers around the handle', 'Business map.', true),
  img('k_system', 1920, 1080, 'System map: the handle, control and component systems', 'System map.', true),
  ...SCENES,
];

type Open = (src: string) => void;

const Shot = ({ i, open, ratio, className = '' }: { i: StoryImage; open: Open; ratio?: number; className?: string }) => (
  <figure className={`cs-fig ${className}`} style={{ '--r': ratio ?? i.ratio } as CSSProperties}>
    <button type="button" className={`cs-frame cs-zoom ${i.contain ? 'cs-frame--contain' : ''}`} style={{ aspectRatio: String(ratio ?? i.ratio) }} onClick={() => open(i.src)} aria-label={`View larger: ${i.alt}`}>
      <img src={i.src} alt={i.alt} loading="lazy" decoding="async" />
    </button>
    {i.caption && <figcaption className="cs-cap">{i.caption}</figcaption>}
  </figure>
);
const g = (name: string) => GALLERY.find(x => x.src === `${M}/${name}.webp`)!;

/* ── The status ring: the same render in its two colours ── */
const Ring = ({ open }: { open: Open }) => {
  const [green, setGreen] = useState(true);
  return (
    <div className="kn-ring">
      <Reveal>
        <button type="button" className={`kn-ring-stage ${green ? 'is-green' : 'is-red'}`} onClick={() => open(`${M}/${green ? 'k_ring_green' : 'k_ring_red'}.webp`)} aria-label="View larger: the card pad and its light ring">
          <img src={`${M}/k_ring_red.webp`} alt={green ? '' : 'The card pad with a red light ring'} className={green ? '' : 'is-on'} loading="lazy" />
          <img src={`${M}/k_ring_green.webp`} alt={green ? 'The card pad with a green light ring' : ''} className={green ? 'is-on' : ''} loading="lazy" />
        </button>
      </Reveal>
      <Reveal delay={100}>
        <div className="kn-ring-switch" role="radiogroup" aria-label="Ring colour">
          <button type="button" role="radio" aria-checked={!green} onClick={() => setGreen(false)}><span className="dot red" />Red</button>
          <button type="button" role="radio" aria-checked={green} onClick={() => setGreen(true)}><span className="dot green" />Green</button>
        </div>
        <div className="kn-ring-text" key={String(green)}>
          <h3 className="cs-h3">{green ? 'Green: charged, unlocked.' : 'Red: discharged, locked.'}</h3>
          <p className="cs-body">
            A standard 1 mm light strip runs around the card pad and changes colour by recognising the card read
            at the reader.
          </p>
        </div>
      </Reveal>
    </div>
  );
};

const KnoberCaseStudy = ({ project, prev, next }: { project: ProjectData; prev: ProjectData; next: ProjectData }) => {
  const [at, setAt] = useState<number | null>(null);
  const open = useCallback<Open>(src => {
    const i = GALLERY.findIndex(x => x.src === src);
    if (i >= 0) setAt(i);
  }, []);
  const close = useCallback(() => setAt(null), []);

  return (
    <main className="cs kn">
      <Seo title="KNOBER — A Lift-Off Handle System for Student Dormitories | Ruipeng Wang" description={project.description} />

      {/* ── Hero ── */}
      <header className="kn-hero">
        <img className="kn-hero-img" src={`${M}/k_hero.webp`} alt="The KNOBER room handle on a white panelled door" fetchPriority="high" />
        <div className="cs-wrap kn-hero-in">
          <Link to="/design" className="cs-back"><ArrowLeft /><span className="cs-label" style={{ color: 'inherit' }}>Design</span></Link>
          <div className="kn-hero-text">
            <div className="cs-label">Industrial Design — 2025 · PoliMi × XJTU</div>
            <h1 className="kn-title">KNOBER</h1>
            <p className="cs-hero-sub">A modular lift-off handle system for student dormitories.</p>
          </div>
        </div>
      </header>

      {/* ── Overview ── */}
      <section className="cs-sec">
        <div className="cs-wrap">
          <div className="cs-split kn-overview">
            <Reveal>
              <dl className="cs-facts kn-facts">
                <div><dt>Course</dt><dd>Project Work 5<br /><span>Xi'an Jiaotong University ×<br />Politecnico di Milano</span></dd></div>
                <div><dt>Role</dt><dd>Team leader</dd></div>
                <div><dt>Professor</dt><dd>Patrizia Bolzan</dd></div>
                <div><dt>Team</dt><dd><span className="kn-names">{['Wang Ruipeng', 'Gu Yuntian', 'Chen Jiawang', 'Pu Chunlin', 'Xiao Yuhan', 'Liu Zhuoran', 'Qiao Zhining', 'Li Haozhuo'].map(n => <span key={n}>{n}</span>)}</span><span>Group 1</span></dd></div>
                <div><dt>Timeline</dt><dd>{project.time.replace(' - ', ' – ')}</dd></div>
              </dl>
            </Reveal>
            <Reveal delay={100}>
              <p className="cs-lead">
                A handle that holds the weight for you. KNOBER gives students carrying something large a knob to rest it
                on, and a new form of handle that makes the door convenient to open.
              </p>
              <div style={{ height: 32 }} />
              <p className="cs-body">
                Dormitory door handles fail in three familiar ways: they are hard to use with full hands, electric models
                run out of battery, and they look dated. KNOBER keeps a durable mechanical handle, adds card access where
                it is wanted, and leaves out everything else.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── The main render, on a dormitory door ── */}
      <section className="kn-main">
        <Reveal>
          <button type="button" className="cs-zoom kn-main-img" onClick={() => open(`${M}/k_main.webp`)} aria-label="View larger: the handle on a dormitory door">
            <img src={`${M}/k_main.webp`} alt="The KNOBER handle on a pale door, a common room blurred behind" loading="lazy" />
          </button>
        </Reveal>
      </section>

      {/* ── 01 Problem ── */}
      <section className="cs-sec kn-tint">
        <div className="cs-wrap">
          <SectionHead index="01" label="Problem" title="Hands full, door shut." />
          <div className="cs-split cs-split--wide kn-problem">
            <Reveal><Shot i={g('k_sb_support')} open={open} ratio={0.8} /></Reveal>
            <Reveal delay={100}>
              <p className="cs-body">
                The setting is a student dormitory; the user is anyone with something heavy in their arms, trying to open
                the door. Four requirements came out of it.
              </p>
              <ol className="kn-reqs">
                <li><span className="n">01</span><h4>Usable with full hands</h4></li>
                <li><span className="n">02</span><h4>Pleasing to look at</h4></li>
                <li><span className="n">03</span><h4>Stable in the hand</h4></li>
                <li><span className="n">04</span><h4>Smart, but only as needed</h4></li>
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 02 Sketches: a strip to scroll through ── */}
      <section className="cs-sec kn-paper">
        <div className="cs-wrap">
          <SectionHead index="02" label="Ideas" title="From many sketches to two concepts." />
        </div>
        <Reveal>
          <div className="kn-strip" tabIndex={0} aria-label="Sketches, scroll sideways">
            {SKETCHES.map(s => (
              <button key={s.src} type="button" className="kn-sketch" style={{ aspectRatio: String(s.ratio) }} onClick={() => open(s.src)} aria-label={`View larger: ${s.alt}`}>
                <img src={s.src} alt={s.alt} loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
          <div className="cs-wrap"><p className="cs-cap kn-strip-cap">Concept sketches and deductions. Scroll sideways.</p></div>
        </Reveal>
        <div className="cs-wrap">
          <Reveal>
            <div className="kn-concepts cs-gap-top">
              <Shot i={g('k_concept1')} open={open} className="kn-plain" />
              <Shot i={g('k_concept2')} open={open} className="kn-plain" />
              <span className="kn-arrow cs-label" aria-hidden="true">Iteration →</span>
              <Shot i={g('k_final')} open={open} className="kn-plain" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 03 Models and ergonomics ── */}
      <section className="cs-sec">
        <div className="cs-wrap">
          <SectionHead index="03" label="Models and ergonomics" title="Tried on real doors, sized to real bodies." />
          <Reveal>
            <div className="cs-row">
              <Shot i={MODELS[0]} open={open} />
              <Shot i={MODELS[1]} open={open} ratio={3 / 4} />
            </div>
            <div className="cs-row kn-row2">
              {MODELS.slice(2).map(m => <Shot key={m.src} i={m} open={open} ratio={3 / 4} />)}
            </div>
          </Reveal>

          <div className="kn-ergo cs-gap-top">
            <Reveal>
              <div className="cs-row">
                <Shot i={g('k_model8')} open={open} ratio={3 / 4} />
                <Shot i={g('k_model7')} open={open} ratio={3 / 4} />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h3 className="cs-h3">Elbow height and finger breadth.</h3>
              <p className="cs-body">
                The handle is used standing, often with a bent arm and a full hand, so two measures set its size: the
                height of the elbow from the ground when standing, and the breadth of the fingers. Using the DINED
                anthropometric database (dined.nl), the team chose 1,100 mm as the height of the knob and 34 mm as the
                inner width of the grip.
              </p>
              <div className="cs-stats kn-stats">
                <div><div className="cs-num">1,100<small> mm</small></div><p>Knob height, from standing elbow height.</p></div>
                <div><div className="cs-num">34<small> mm</small></div><p>Inner width of the grip, from finger breadth.</p></div>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="kn-table-wrap cs-gap-top">
              <table className="kn-table">
                <caption className="cs-label">DINED reference values, mm · mean (sd) and P1–P99</caption>
                <thead>
                  <tr><th scope="col">Measure</th><th scope="col">Dutch adults 20–30</th><th scope="col">Dutch adults 18–30</th><th scope="col">Dutch students 19–36</th></tr>
                </thead>
                <tbody>
                  <tr><th scope="row">Elbow height, standing</th><td>1097 (74)<span>925–1269</span></td><td>1133 (66)<span>979–1287</span></td><td>1076 (55)<span>948–1204</span></td></tr>
                  <tr><th scope="row">Forefinger breadth</th><td>16 (2)<span>11–21</span></td><td>17 (2)<span>12–22</span></td><td>14 (1)<span>12–16</span></td></tr>
                </tbody>
              </table>
              <p className="cs-cap">Source: DINED, TU Delft (dined.nl). Mixed populations.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 04 Lift to open ── */}
      <section className="cs-sec cs-dark kn-lift" data-nav-dark>
        <div className="cs-wrap">
          <div className="kn-lift-head">
            <Reveal><p className="kn-lift-type" aria-label="Lift to open"><span>LIFT</span><span className="up" aria-hidden="true">↑</span><span>TO OPEN</span></p></Reveal>
          </div>
          <Reveal>
            <div className="kn-pair">
              <Shot i={g('k_down')} open={open} ratio={0.8} />
              <Shot i={g('k_up')} open={open} ratio={0.8} />
            </div>
          </Reveal>
          <Reveal>
            <ol className="kn-steps">
              {STEPS.map(s => (
                <li key={s.n}>
                  <button type="button" className="kn-step-img" onClick={() => open(s.i.src)} aria-label={`View larger: ${s.i.alt}`}><img src={s.i.src} alt={s.i.alt} loading="lazy" /></button>
                  <span className="n">{s.n}</span>
                  <h4>{s.t}</h4>
                  <p>{s.d}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ── 06 One system ── */}
      <section className="cs-sec kn-tint">
        <div className="cs-wrap">
          <SectionHead index="05" label="Modular" title="One system, two doors." />
          <div className="kn-system">
            <Reveal>
              <figure className="cs-fig kn-module">
                <button type="button" className="cs-zoom kn-cut" onClick={() => open(`${M}/k_room_handle.webp`)} aria-label="View larger: the room handle">
                  <img src={`${M}/k_room_handle.webp`} alt="The room handle" loading="lazy" />
                </button>
                <figcaption>
                  <h4>Room handle</h4>
                  <p>A knob and lever for the room door.</p>
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={80}>
              <figure className="cs-fig kn-module">
                <button type="button" className="cs-zoom kn-cut" onClick={() => open(`${M}/k_modules.webp`)} aria-label="View larger: the modules">
                  <img src={`${M}/k_modules.webp`} alt="The handle modules side by side" loading="lazy" />
                </button>
                <figcaption>
                  <h4>Modules</h4>
                  <p>Components shared across the system.</p>
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={160}>
              <figure className="cs-fig kn-module">
                <button type="button" className="cs-zoom kn-cut" onClick={() => open(`${M}/k_gate_handle.webp`)} aria-label="View larger: the gate handle">
                  <img src={`${M}/k_gate_handle.webp`} alt="The long gate handle with a knob at each end" loading="lazy" />
                </button>
                <figcaption>
                  <h4>Gate handle</h4>
                  <p>A long grip for the building door, with a knob at each end.</p>
                </figcaption>
              </figure>
            </Reveal>
          </div>
          <Reveal>
            <div className="cs-row cs-gap-top kn-sb2">
              <Shot i={g('k_sb_support')} open={open} className="kn-plain" />
              <Shot i={g('k_sb_dismantle')} open={open} className="kn-plain" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 07 Inside ── */}
      <section className="cs-sec">
        <div className="cs-wrap">
          <SectionHead index="06" label="Inside" title="A mechanical handle with a battery in its knob." />
          <Reveal><Shot i={g('k_exploded')} open={open} /></Reveal>
          <Reveal>
            <div className="kn-materials cs-gap-top">
              <div className="cs-label">Materials</div>
              <ul>{MATERIALS.map(x => <li key={x.m}><b>{x.m}</b><span>{x.p}</span></li>)}</ul>
            </div>
          </Reveal>
          <Reveal>
            <ul className="kn-parts cs-gap-top">
              {PARTS.map(p => (
                <li key={p.t}>
                  <button type="button" className="cs-zoom kn-part-img" onClick={() => open(p.i.src)} aria-label={`View larger: ${p.i.alt}`}>
                    <img src={p.i.src} alt={p.i.alt} loading="lazy" />
                  </button>
                  <h4>{p.t}</h4>
                  <p>{p.d}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── 08 Ring ── */}
      <section className="cs-sec cs-dark" data-nav-dark>
        <div className="cs-wrap">
          <SectionHead index="07" label="Status" title="A ring of light that reads the card." />
          <Ring open={open} />
        </div>
      </section>

      {/* ── 09 Maps ── */}
      <section className="cs-sec kn-tint">
        <div className="cs-wrap">
          <SectionHead index="08" label="Systems" title="Who makes it, and how it works." />
          <Reveal>
            <div className="cs-row kn-maps">
              <Shot i={g('k_business')} open={open} />
              <Shot i={g('k_system')} open={open} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 10 On the door ── */}
      <section className="cs-sec">
        <div className="cs-wrap">
          <SectionHead index="09" label="On the door" title="At home on any door." />
          <Reveal>
            <div className="cs-row">
              <Shot i={SCENES[0]} open={open} />
              <Shot i={SCENES[1]} open={open} />
            </div>
            <div className="cs-row kn-row2">
              <Shot i={SCENES[2]} open={open} />
              <Shot i={SCENES[3]} open={open} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Close ── */}
      <section className="kn-close">
        <img src={`${M}/k_room.webp`} alt="" aria-hidden="true" loading="lazy" />
        <div className="cs-wrap">
          <Reveal>
            <p className="cs-lead">Hands full? No problem. Unlock with ease.</p>
            <p className="cs-credits">
              Group 1 · Wang Ruipeng (team leader), Gu Yuntian, Chen Jiawang, Pu Chunlin, Xiao Yuhan, Liu Zhuoran, Qiao Zhining, Li Haozhuo<br />
              Project Work 5, Xi'an Jiaotong University × Politecnico di Milano · Professor Patrizia Bolzan
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

export default KnoberCaseStudy;
