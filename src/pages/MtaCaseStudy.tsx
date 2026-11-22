import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Viewer from '../components/casestudy/Viewer';
import { Reveal, SectionHead, ArrowLeft } from '../components/casestudy/primitives';
import type { ProjectData, StoryImage } from '../data/types';
import StatusHalo from '../components/casestudy/StatusHalo';
import '../components/casestudy/mta.css';

/*
  MTA-CoDrive — /design/6. Media in /public/Design_6 (m_* files cropped from the Figma boards at 4x;
  H.webp is the hero render). Research numbers are redrawn; the accident timeline, the three
  takeover-status halos and the game modes are built in the page. Night cockpit, mint accent.
*/

const M = '/Design_6';
const img = (name: string, w: number, h: number, alt: string, caption?: string): StoryImage =>
  ({ src: `${M}/${name}.webp`, ratio: w / h, alt, caption });

/* ---------- data, from the boards ---------- */

const STEPS = [
  { t: 'Perceive the alarm', d: 'Notice the visual, auditory or tactile alarm issued by the system.' },
  { t: 'Understand the situation', d: 'Quickly understand why the system exited, and how dangerous the road is.' },
  { t: 'Make a decision', d: 'Decide whether to brake, steer or take other evasive action.' },
  { t: 'Execute the operation', d: 'Move hands and feet to the right controls and carry it out.' },
];

const TOT = [
  { k: 'Younger drivers', a: 3.32, b: 3.70 },
  { k: 'Older drivers', a: 3.41, b: 3.25 },
];
const TTC = [
  { k: 'No traffic', a: '3.34 ± 0.24', b: '3.20 ± 0.25', av: 3.34, bv: 3.2 },
  { k: 'High traffic density', a: '2.68 ± 0.25', b: '2.72 ± 0.23', av: 2.68, bv: 2.72 },
];

const TIMELINE = [
  { t: '22:44:24', k: 'Takeover request', d: 'ADAS alarms and asks the driver to take over at 116 km/h.', speed: 116, steer: 0, brake: 0 },
  { t: '22:44:25', k: 'Driver takes over', d: 'The driver steers left by 22.06° and presses the brake to 31 %.', speed: 108, steer: -22.06, brake: 31 },
  { t: '22:44:26', k: 'Correction', d: 'Steering right by 1.06°; the brake pedal reaches 38 %, its most.', speed: 101, steer: 1.06, brake: 38 },
  { t: '22:44:28', k: 'Collision', d: 'The car hits the concrete barrier at 97 km/h.', speed: 97, steer: 0, brake: 38 },
];

const DRIVERS = [
  { img: 'm_sim1', years: 5, km: '10,000 km', age: 25, racing: 'Learned racing', steer: 24, brake: 87, accel: 0 },
  { img: 'm_sim2', years: 11, km: '120,000 km', age: 46, racing: 'No racing', steer: 27, brake: 35, accel: 0 },
  { img: 'm_sim3', years: 0, km: '0 km', age: 24, racing: 'Learned racing', steer: 22, brake: 56, accel: 1 },
];

const POSITIONS = {
  upper: { label: 'Upper', imgs: ['m_up', 'm_up2', 'm_up3'], pros: ['Activates the motor muscles better, a warm-up effect', 'Better control when a takeover is needed'], cons: ['Some operating burden'] },
  middle: { label: 'Middle', imgs: ['m_mid', 'm_mid2', 'm_mid3'], pros: ['Better steering experience after takeover', 'Saves space'], cons: ['Takeover is not smooth enough in an emergency', 'Less comfortable to exercise with ADAS on'] },
  lower: { label: 'Lower', imgs: ['m_low', 'm_low2', 'm_low3'], pros: ['Better control when a takeover is needed', 'More comfortable posture during ADAS'], cons: ['In an urgent takeover the force is far from the axis, needing more lateral force', 'Takes more space'] },
} as const;
type Pos = keyof typeof POSITIONS;

const SCENARIOS = [
  { k: 'Closed & regular', d: 'Closed highways in sunny daytime or night-time, urban expressways with no congestion.' },
  { k: 'Low-interference semi-closed', d: 'Expressways with little traffic at the ramps, highways in cloudy or light rain, suburban arterials.' },
  { k: 'High-dynamic open', d: 'Urban arterial roads off-peak, ramps with traffic, suburban roads past villages.' },
  { k: 'Extreme-interference open', d: 'Arterial roads at peak hours, heavy rain or fog at night, unlit village roads, construction in old town.' },
];

const STATUS = {
  safe: { label: 'Safe', scene: '1–2', att: 'Well maintained', halo: 'A calm green halo: low risk, stable driver.' },
  medium: { label: 'Medium', scene: '2–3', att: 'At risk or critical', halo: 'A pulsing blue halo: rising risk, check your attention.' },
  danger: { label: 'Danger', scene: '3–4', att: 'Distracted', halo: 'A vibrant yellow-orange halo: high risk and distracted, take over now.' },
} as const;
type Status = keyof typeof STATUS;

const GALLERY: StoryImage[] = [
  img('m_tot1', 792, 440, 'Driver on a phone while ADAS drives', '1. ADAS activated.'),
  img('m_tot2', 788, 440, 'Road works ahead with a takeover warning on the dashboard', '2. Request of takeover.'),
  img('m_tot3', 788, 440, 'Hands grabbing the steering wheel', '3. Take actions.'),
  img('m_tot4', 788, 440, 'Driver in control past the road works', '4. Fully takeover.'),
  img('m_q1', 764, 424, 'Hand on the steering wheel', 'Steering wheel angle.'),
  img('m_q2', 760, 424, 'A car crossing the lane line', 'Lateral stability.'),
  img('m_q3', 760, 424, 'Two cars on a curve with a collision zone', 'Collision risk.'),
  img('m_q4', 764, 424, 'A foot on the brake pedal', 'Brake pedal position.'),
  img('m_q5', 760, 424, 'A car with a speedometer and arrows', 'Longitudinal acceleration.'),
  img('m_q6', 760, 424, 'A driver at the wheel', 'Subjective perception.'),
  ...DRIVERS.map((d, i) => img(d.img, 620, 452, `Driver ${i + 1} in the racing simulator`, `Driver ${i + 1}: ${d.years} years of driving.`)),
  img('m_ms1', 368, 276, 'Both hands holding the wheel', 'Manual: hands hold the wheel tightly.'),
  img('m_ms2', 372, 276, 'Hands resisting the wheel force', 'Manual: resisting the wheel, adjusting all the time.'),
  img('m_ms3', 372, 276, 'Emergency steering with a warning sign', 'Manual: the right force, quickly.'),
  img('m_as1', 368, 272, 'One hand on the wheel, one on a phone', 'ADAS: one hand, on a phone.'),
  img('m_as2', 372, 276, 'Hands passively following the wheel', 'ADAS: hands follow the wheel passively.'),
  img('m_as3', 372, 276, 'Panicked driver struggling with the wheel', 'ADAS: panic in an emergency.'),
  img('m_mb', 400, 400, 'Foot on the pedals in manual driving', 'Manual: feet on the pedals, real-time feedback.'),
  img('m_ab', 400, 400, 'Feet resting away from the pedals', 'ADAS: feet away, little situational awareness.'),
  img('m_wall1', 1040, 712, 'Research wall on dynamic warm-up', 'Sports kinesiology: dynamic warm-up.'),
  img('m_wall2', 1032, 712, 'Research wall on neuromuscular activation', 'Neuroscience: neuromuscular activation.'),
  img('m_sketch', 1076, 876, 'Sketches of F1-style steering wheels with modules and sensors', 'Sketches.'),
  ...(['upper', 'middle', 'lower'] as Pos[]).flatMap(p => POSITIONS[p].imgs.map((n, i) => img(n, i ? 380 : 788, i ? 280 : 588, `Prototype, ${POSITIONS[p].label.toLowerCase()} position`, `${POSITIONS[p].label} position.`))),
  img('m_force', 1800, 826, 'Force diagram of the wheel: M = F × L, T = 2 × F × L, Fn = Tn / (2 × L)', 'The force the grip sensor must read.'),
  img('m_test1', 812, 1000, 'Grip force sensor wired to a board', 'Grip force sensor.'),
  img('m_test2', 748, 1000, 'Testing the sensor with a laptop', 'Testing.'),
  img('m_serial', 512, 988, 'Arduino code and serial readings', 'Readings over serial.'),
  img('m_cv', 1008, 588, 'OpenCV lane detection on a road video', 'OpenCV: lanes and direction.'),
  img('m_unity', 992, 588, 'Unity scene with the code editor', 'Unity: the HUD overlay.'),
  img('m_ontrack', 1232, 940, 'HUD guide on the road ahead, in the lane', 'On track.'),
  img('m_deviation', 1232, 928, 'HUD guide turning red off the lane', 'Deviation warning.'),
  img('m_wheel', 1472, 984, 'The redesigned wheel with a transparent screen and two flexible modules', 'The redesigned wheel.'),
  img('m_det1', 648, 472, 'Detail of the touch-sensitive area', 'Touch-sensitive area.'),
  img('m_det2', 656, 476, 'Detail of the flexible module', 'Flexible module.'),
  img('m_man1', 860, 436, 'Driver steering with the new wheel', 'Manual driving.'),
  img('m_man2', 860, 440, 'Driver taking over, the system assisting', 'Take over.'),
  img('m_co1', 520, 340, 'HUD shows machine driving and the game', 'Co-driving: the game at a moderate pace.'),
  img('m_co2', 520, 344, 'HUD adjusting the game', 'Adjusting to the driver.'),
  img('m_co3', 520, 332, 'HUD asking the driver to take over', 'Requesting takeover.'),
];
const g = (name: string) => GALLERY.find(x => x.src === `${M}/${name}.webp`)!;

type Open = (src: string) => void;

const Shot = ({ i, open, ratio, cap = true, className = '' }: { i: StoryImage; open: Open; ratio?: number; cap?: boolean; className?: string }) => (
  <figure className={`cs-fig ${className}`} style={{ '--r': ratio ?? i.ratio } as CSSProperties}>
    <button type="button" className="cs-frame cs-zoom" style={{ aspectRatio: String(ratio ?? i.ratio) }} onClick={() => open(i.src)} aria-label={`View larger: ${i.alt}`}>
      <img src={i.src} alt={i.alt} loading="lazy" decoding="async" />
    </button>
    {cap && i.caption && <figcaption className="cs-cap">{i.caption}</figcaption>}
  </figure>
);

/* ---------- the accident, second by second ---------- */
const Timeline = () => {
  const [at, setAt] = useState(0);
  const auto = useRef(true);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let id = 0;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(id);
      if (e.isIntersecting && auto.current) id = window.setInterval(() => setAt(i => (i + 1) % TIMELINE.length), 2600);
    }, { threshold: 0.4 });
    if (box.current) io.observe(box.current);
    return () => { io.disconnect(); window.clearInterval(id); };
  }, []);
  const pick = (i: number) => { auto.current = false; setAt(i); };
  const s = TIMELINE[at];
  return (
    <div className="mt-tl" ref={box}>
      <ol className="mt-tl-track">
        {TIMELINE.map((x, i) => (
          <li key={x.t} className={`${i <= at ? 'is-past' : ''} ${i === at ? 'is-on' : ''} ${i === TIMELINE.length - 1 ? 'is-end' : ''}`}>
            <button type="button" onClick={() => pick(i)} aria-pressed={i === at}>
              <span className="t">{x.t}</span>
              <span className="dot" />
              <span className="k">{x.k}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className="mt-tl-body">
        <p className="mt-tl-d" key={at}>{s.d}</p>
        <dl className="mt-gauges">
          <div><dt>Speed</dt><dd><b>{s.speed}</b> km/h</dd></div>
          <div><dt>Steering</dt><dd><b>{s.steer === 0 ? '0' : `${Math.abs(s.steer)}°`}</b> {s.steer < 0 ? 'left' : s.steer > 0 ? 'right' : ''}</dd></div>
          <div className="brake"><dt>Brake pedal</dt><dd><b>{s.brake}</b> %<span className="bar"><i style={{ width: `${s.brake}%` }} /></span></dd></div>
        </dl>
      </div>
    </div>
  );
};

/* ---------- three positions of the flexible module ---------- */
const Positions = ({ open }: { open: Open }) => {
  const [p, setP] = useState<Pos>('upper');
  const d = POSITIONS[p];
  return (
    <div className="mt-pos">
      <div className="mt-seg" role="radiogroup" aria-label="Module position">
        {(Object.keys(POSITIONS) as Pos[]).map(k => (
          <button key={k} type="button" role="radio" aria-checked={k === p} onClick={() => setP(k)}>{POSITIONS[k].label}</button>
        ))}
      </div>
      <div className="mt-pos-grid" key={p}>
        <div className="mt-pos-imgs">
          <Shot i={g(d.imgs[0])} open={open} cap={false} className="big" />
          <Shot i={g(d.imgs[1])} open={open} cap={false} />
          <Shot i={g(d.imgs[2])} open={open} cap={false} />
        </div>
        <div className="mt-pos-text">
          <div className="cs-label">Advantages</div>
          <ul className="pro">{d.pros.map(x => <li key={x}>{x}</li>)}</ul>
          <div className="cs-label">Disadvantages</div>
          <ul className="con">{d.cons.map(x => <li key={x}>{x}</li>)}</ul>
        </div>
      </div>
    </div>
  );
};

/* ---------- takeover status halo ---------- */
const Halo = () => {
  const [s, setS] = useState<Status>('safe');
  const d = STATUS[s];
  return (
    <div className={`mt-halo is-${s}`}>
      <div className="mt-halo-stage">
        <StatusHalo state={s} className="mt-halo-canvas" />
      </div>
      <div>
        <div className="mt-seg" role="radiogroup" aria-label="Status">
          {(Object.keys(STATUS) as Status[]).map(k => (
            <button key={k} type="button" role="radio" aria-checked={k === s} onClick={() => setS(k)}>{STATUS[k].label}</button>
          ))}
        </div>
        <dl className="mt-halo-facts" key={s}>
          <div><dt>Road scenario</dt><dd>{d.scene}</dd></div>
          <div><dt>Driver's attention</dt><dd>{d.att}</dd></div>
          <div><dt>Animation</dt><dd>{d.halo}</dd></div>
        </dl>
      </div>
    </div>
  );
};

const MtaCaseStudy = ({ project, prev, next }: { project: ProjectData; prev: ProjectData; next: ProjectData }) => {
  const [at, setAt] = useState<number | null>(null);
  const [mode, setMode] = useState<'on' | 'off'>('on');
  const open = useCallback<Open>(src => {
    const i = GALLERY.findIndex(x => x.src === src);
    if (i >= 0) setAt(i);
  }, []);
  const close = useCallback(() => setAt(null), []);
  const totMax = 4;

  return (
    <main className="cs mt">
      <Seo title="MTA-CoDrive — Takeover Alert & Human-Machine Co-Driving | Ruipeng Wang" description={project.description} />

      {/* ── Hero ── */}
      <header className="mt-hero" data-nav-dark>
        <img className="mt-hero-img" src={`${M}/H.webp`} alt="A car crossing an intersection at night, sensing rings around it" fetchPriority="high" />
        <div className="cs-wrap mt-hero-in">
          <Link to="/design" className="cs-back"><ArrowLeft /><span className="cs-label" style={{ color: 'inherit' }}>Design</span></Link>
          <div className="mt-hero-text">
            <div className="cs-label">Interaction Design — 2025 · Automotive HMI</div>
            <h1 className="mt-title">MTA-CoDrive</h1>
            <p className="cs-hero-sub">Multimodal takeover alert and human-machine co-driving: keeping the driver ready while the car drives.</p>
          </div>
        </div>
      </header>

      {/* ── Overview ── */}
      <section className="cs-sec cs-dark mt-sec" data-nav-dark>
        <div className="cs-wrap">
          <div className="cs-split mt-overview">
            <Reveal>
              <dl className="cs-facts mt-facts">
                <div><dt>Type</dt><dd>Interaction design research</dd></div>
                <div><dt>System</dt><dd>Steering wheel with flexible modules<br />HUD serious game</dd></div>
                <div><dt>Built with</dt><dd>Grip force sensor, Arduino<br />Camera, OpenCV (Python)<br />Unity (C#)</dd></div>
                <div><dt>Timeline</dt><dd>{project.time.replace(' - ', ' – ')}</dd></div>
              </dl>
            </Reveal>
            <Reveal delay={100}>
              <p className="cs-lead">
                As assisted driving spreads, the moment the system hands control back has become a critical safety
                problem. MTA-CoDrive keeps the driver's attention alive while the car drives, so that taking over is
                something they are ready for.
              </p>
              <div style={{ height: 32 }} />
              <p className="cs-body">
                A camera reads the road; OpenCV finds lanes and paths in real time and passes them to Unity, which turns
                them into small tasks on the HUD. The driver plays by pressing and sliding the deformable areas of the
                steering wheel, staying aware of the road through easy interaction. The game's frequency and difficulty
                follow how safe the driving scenario is, balancing warning and comfort.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 01 Context ── */}
      <section className="cs-sec cs-dark mt-sec mt-rule" data-nav-dark>
        <div className="cs-wrap">
          <SectionHead index="01" label="Context" title="More automation, more accidents to explain." />
          <div className="cs-split cs-split--wide">
            <Reveal>
              <div className="mt-big"><span>70</span><small>%+</small></div>
              <p className="cs-cap">of ADAS accidents trace to human factors: over-reliance and misuse.</p>
            </Reveal>
            <Reveal delay={100}>
              <p className="cs-body">
                Advanced driver assistance is spreading fast in Chinese passenger cars, and so are the accidents it is
                involved in. Most come from people rather than technology: distraction and over-trust, and not knowing
                where the system's operational boundaries lie. The rest come from the limits of perception, errors of
                decision and execution, and malfunctions.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 02 The takeover ── */}
      <section className="cs-sec cs-dark mt-sec mt-rule" data-nav-dark>
        <div className="cs-wrap">
          <SectionHead index="02" label="Takeover dilemma" title="Four steps, from a cognitive vacuum." />
          <div className="cs-split">
            <div />
            <Reveal>
              <p className="cs-body">
                When the road leaves the system's operational design domain, it issues a takeover request, and a
                driver who has been out of the loop has to get through four steps. The usual 10-second request time
                may not be enough: a driver deep in a non-driving task reacts much more slowly, and that difference
                leads directly to accidents.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <ol className="mt-steps cs-gap-top">
              {STEPS.map((s, i) => <li key={s.t}><span className="n">0{i + 1}</span><span className="line" aria-hidden="true" /><h4>{s.t}</h4><p>{s.d}</p></li>)}
            </ol>
          </Reveal>
          <Reveal>
            <div className="mt-tot cs-gap-top">
              <div className="mt-tot-head">
                <div className="cs-label">Takeover time (TOT)</div>
                <div className="mt-tot-num">2.72<small> s</small></div>
                <p className="cs-cap">Mean TOT: from the takeover request to the first braking or steering.</p>
              </div>
              <div className="mt-tot-imgs">
                {['m_tot1', 'm_tot2', 'm_tot3', 'm_tot4'].map(n => <Shot key={n} i={g(n)} open={open} />)}
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="cs-gap-top">
              <div className="cs-label mt-sub">Takeover quality</div>
              <div className="mt-grid3">
                {['m_q1', 'm_q2', 'm_q3', 'm_q4', 'm_q5', 'm_q6'].map(n => <Shot key={n} i={g(n)} open={open} />)}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 03 What research says ── */}
      <section className="cs-sec mt-light">
        <div className="cs-wrap">
          <SectionHead index="03" label="Research" title="Studies stop at the moment of takeover." />
          <div className="mt-charts">
            <Reveal>
              <div className="cs-label">Mean takeover time, s</div>
              <ul className="mt-hbars">
                {TOT.map(r => (
                  <li key={r.k}>
                    <span className="k">{r.k}</span>
                    <span className="row"><span className="lab">No task</span><span className="bar"><i style={{ width: `${(r.a / totMax) * 100}%` }} /></span><b>{r.a}</b></span>
                    <span className="row b"><span className="lab">With task</span><span className="bar"><i style={{ width: `${(r.b / totMax) * 100}%` }} /></span><b>{r.b}</b></span>
                  </li>
                ))}
              </ul>
              <ul className="mt-notes">
                <li><b>+0.8 s</b>TOT in high traffic density</li>
                <li><b>+0.14 s</b>TOT on a sharp turn</li>
                <li><b>−0.3 s</b>TOT with auditory or tactile alerts instead of visual</li>
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <div className="cs-label">Minimum time to collision, 7 s lead time</div>
              <p className="mt-formula">TTC = distance / relative speed</p>
              <table className="mt-table">
                <thead><tr><th scope="col" /><th scope="col">Low cognitive load</th><th scope="col">High cognitive load</th></tr></thead>
                <tbody>{TTC.map(r => <tr key={r.k}><th scope="row">{r.k}</th><td>{r.a} s</td><td>{r.b} s</td></tr>)}</tbody>
              </table>
              <p className="cs-cap">High traffic density cuts TTC by about 30 %.</p>
            </Reveal>
          </div>
          <Reveal>
            <p className="mt-concl cs-gap-top">Research on ADAS takeovers focuses on takeover time and the moments before it. How drivers behave after taking over is barely studied.</p>
          </Reveal>
          <p className="cs-cap mt-refs">Zhang, H. et al. (2022), Int. J. Environ. Res. Public Health 19(3), 1834. So, J. et al. (2021), J. Adv. Transportation, 8859553.</p>
        </div>
      </section>

      {/* ── 04 Accident ── */}
      <section className="cs-sec cs-dark mt-sec" data-nav-dark>
        <div className="cs-wrap">
          <SectionHead index="04" label="Case study" title="Four seconds to a crash." />
          <div className="cs-split">
            <div />
            <Reveal>
              <p className="cs-body">
                On 29 March 2025, a Xiaomi SU7 using assisted driving hit a concrete barrier on a highway section under
                maintenance and caught fire; all three people inside died. Two problems stand out. ADAS was used on a
                road beyond its capability. And once the driver took over, with too little time, the brake never went
                past 38 %: not enough to slow down, or to soften the crash.
              </p>
            </Reveal>
          </div>
          <Reveal><div className="cs-gap-top"><Timeline /></div></Reveal>
        </div>
      </section>

      {/* ── 05 Experiment ── */}
      <section className="cs-sec cs-dark mt-sec mt-rule" data-nav-dark>
        <div className="cs-wrap">
          <SectionHead index="05" label="Experiment" title="Three drivers, one unfamiliar track." />
          <div className="cs-split">
            <div />
            <Reveal>
              <p className="cs-body">
                In a professional racing simulator on the Nürburgring, a track none of them knew, each driver met an
                emergency: a sharp turn they had not seen coming. Steering and braking through the turn showed how they
                handle the moment.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <div className="mt-drivers cs-gap-top">
              {DRIVERS.map((d, i) => (
                <div key={d.img} className="mt-driver">
                  <Shot i={g(d.img)} open={open} cap={false} />
                  <div className="mt-driver-meta">
                    <span className="cs-label">Driver {i + 1}</span>
                    <span>{d.years} years · {d.km} · age {d.age} · {d.racing}</span>
                  </div>
                  <dl className="mt-meters">
                    <div><dt>Steering</dt><dd><b>{d.steer}°</b></dd></div>
                    <div><dt>Brake</dt><dd><span className="bar"><i style={{ width: `${d.brake}%` }} /></span><b>{d.brake}%</b></dd></div>
                    <div><dt>Accelerator</dt><dd><span className="bar"><i style={{ width: `${Math.max(d.accel, 0.5)}%` }} /></span><b>{d.accel}%</b></dd></div>
                  </dl>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <p className="mt-concl cs-gap-top">Some drivers understeer on sharp turns, and almost none brake fully in time. Ordinary drivers fall short in emergencies.</p>
          </Reveal>
        </div>
      </section>

      {/* ── 06 Behaviour ── */}
      <section className="cs-sec mt-light">
        <div className="cs-wrap">
          <SectionHead index="06" label="Behaviour" title="Assisted driving trains passive hands and idle feet." />
          <div className="cs-split">
            <div />
            <Reveal>
              <p className="cs-body">
                Driving manually, the driver holds the wheel firmly and keeps feeling its force through the road; the
                feet stay on the pedals and know where they are. With ADAS, one hand rests on the wheel or none, the
                feet relax away from the pedals, and the habit carries into the emergency.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <div className="mt-behave cs-gap-top">
              <div className="mt-behave-row">
                <div className="cs-label">Steering · manual</div>
                <div className="cs-row">{['m_ms1', 'm_ms2', 'm_ms3'].map(n => <Shot key={n} i={g(n)} open={open} />)}</div>
              </div>
              <div className="mt-behave-row">
                <div className="cs-label">Steering · with ADAS</div>
                <div className="cs-row">{['m_as1', 'm_as2', 'm_as3'].map(n => <Shot key={n} i={g(n)} open={open} />)}</div>
              </div>
              <div className="mt-behave-row">
                <div className="cs-label">Braking</div>
                <div className="cs-row">{['m_mb', 'm_ab'].map(n => <Shot key={n} i={g(n)} open={open} />)}</div>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="mt-goal cs-gap-top">
              <div className="cs-label">Design goal</div>
              <p>How can drivers take over well in an emergency, braking and steering as they should?</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 07 Warm-up ── */}
      <section className="cs-sec mt-light mt-tint">
        <div className="cs-wrap">
          <SectionHead index="07" label="Transdisciplinary research" title="How athletes get ready before they compete." />
          <div className="mt-two">
            <Reveal>
              <Shot i={g('m_wall1')} open={open} />
              <h3 className="cs-h3">Dynamic warm-up</h3>
              <ul className="mt-facts-list">
                <li><b>+2.23 cm</b>Vertical jump against static stretching; +2.64 cm against no warm-up.</li>
                <li><b>−0.06 s</b>On a 30 m sprint against static stretching; −0.08 s against no warm-up.</li>
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <Shot i={g('m_wall2')} open={open} />
              <h3 className="cs-h3">Neuromuscular activation</h3>
              <ul className="mt-facts-list">
                <li><b>Drive</b>A warm-up strengthens central motor drive, raising the output of spinal α-motoneurons.</li>
                <li><b>Excitability</b>It reduces presynaptic inhibition and raises motoneuron excitability, so signals pass better.</li>
              </ul>
            </Reveal>
          </div>
          <Reveal>
            <p className="mt-concl cs-gap-top">While ADAS drives, the driver's neuromuscular system should stay activated, so they are ready for a good takeover at any time.</p>
          </Reveal>
        </div>
      </section>

      {/* ── 08 Prototype ── */}
      <section className="cs-sec cs-dark mt-sec" data-nav-dark>
        <div className="cs-wrap">
          <SectionHead index="08" label="Prototype" title="An F1 wheel, with modules that give." />
          <div className="cs-split cs-split--wide">
            <Reveal><Shot i={g('m_sketch')} open={open} /></Reveal>
            <Reveal delay={100}>
              <p className="cs-body">
                Steering wheels keep getting smaller and doing more, and steer-by-wire will change their shape again.
                An F1 wheel stood in for that future: two flexible, deformable modules give a tactile experience, and
                sensors judge whether the driver is steering well, with enough torque.
              </p>
              <ul className="mt-spec">
                <li><b>Modules</b>TPU, fluororubber, TPE</li>
                <li><b>Sensors</b>Torque, grip force, vibration</li>
              </ul>
            </Reveal>
          </div>
          <Reveal><div className="cs-gap-top"><Positions open={open} /></div></Reveal>
          <Reveal>
            <div className="cs-gap-top"><Shot i={g('m_force')} open={open} /></div>
          </Reveal>
          <Reveal>
            <div className="cs-row cs-gap-top">
              {['m_test1', 'm_test2', 'm_serial'].map(n => <Shot key={n} i={g(n)} open={open} />)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 09 The game ── */}
      <section className="cs-sec cs-dark mt-sec mt-rule" data-nav-dark>
        <div className="cs-wrap">
          <SectionHead index="09" label="Serious game" title="A game on the HUD that keeps you in the loop." />
          <div className="cs-split cs-split--wide">
            <Reveal>
              <ol className="mt-scen">
                {SCENARIOS.map((s, i) => (
                  <li key={s.k}><span className="lvl" style={{ '--l': i + 1 } as CSSProperties}><i /><i /><i /><i /></span><div><h4>{s.k}</h4><p>{s.d}</p></div></li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={100}>
              <p className="cs-body">
                Driving scenarios are graded from simple to difficult. The harder the scenario, the more often the game
                appears and the more it asks of the driver, so that they adapt to taking over.
              </p>
              <ol className="mt-stack">
                <li><b>Camera</b>captures the road as a live video stream.</li>
                <li><b>OpenCV</b>greyscale, blur, edge detection, Hough transform and line fitting find the lanes and direction, sent over TCP.</li>
                <li><b>Unity</b>draws guide lines on the camera feed as an AR overlay.</li>
              </ol>
            </Reveal>
          </div>
          <Reveal>
            <div className="cs-row cs-gap-top">
              <Shot i={g('m_cv')} open={open} />
              <Shot i={g('m_unity')} open={open} />
            </div>
          </Reveal>
          <Reveal>
            <div className="mt-play cs-gap-top">
              <div>
                <div className="mt-seg" role="radiogroup" aria-label="Game state">
                  <button type="button" role="radio" aria-checked={mode === 'on'} onClick={() => setMode('on')}>On track</button>
                  <button type="button" role="radio" aria-checked={mode === 'off'} onClick={() => setMode('off')}>Deviation</button>
                </div>
                <div className="mt-play-text" key={mode}>
                  {mode === 'on' ? (
                    <><h3 className="cs-h3">Regular operation.</h3><p className="cs-body">The predicted trajectory is drawn on the HUD; its glowing centre is the right path. As the road turns it drifts toward the curve, and the driver applies torque on the deformable area to keep it centred.</p></>
                  ) : (
                    <><h3 className="cs-h3">Inadequate awareness.</h3><p className="cs-body">Without enough torque, the game centre drifts out of the glowing area and turns red, asking for more force to match the road, and keeping the driver aware of the situation.</p></>
                  )}
                </div>
              </div>
              <button type="button" className={`mt-play-stage is-${mode}`} onClick={() => open(`${M}/${mode === 'on' ? 'm_ontrack' : 'm_deviation'}.webp`)} aria-label="View larger: the HUD game">
                <img src={`${M}/m_ontrack.webp`} alt={mode === 'on' ? 'The HUD guide in the lane' : ''} className={mode === 'on' ? 'is-on' : ''} loading="lazy" />
                <img src={`${M}/m_deviation.webp`} alt={mode === 'off' ? 'The HUD guide turning red' : ''} className={mode === 'off' ? 'is-on' : ''} loading="lazy" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 10 The wheel ── */}
      <section className="cs-sec cs-dark mt-sec mt-rule" data-nav-dark>
        <div className="cs-wrap">
          <SectionHead index="10" label="Redesign" title="Two flexible modules and a transparent screen." />
          <Reveal>
            <div className="mt-wheel">
              <Shot i={g('m_wheel')} open={open} cap={false} />
              <div className="mt-wheel-side">
                <p className="cs-body">A transparent screen shows speed, autopilot status and the driver's steering, brake and accelerator. Two flexible modules sit where the hands rest, with touch-sensitive areas for the game.</p>
                <Shot i={g('m_det1')} open={open} />
                <Shot i={g('m_det2')} open={open} />
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="cs-gap-top">
              <div className="cs-label mt-sub">Autopilot status on the screen</div>
              <Halo />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 11 Co-driving ── */}
      <section className="cs-sec mt-light">
        <div className="cs-wrap">
          <SectionHead index="11" label="Interaction process" title="Driving, co-driving, and back." />
          <div className="mt-flow">
            <Reveal>
              <div className="mt-flow-col">
                <div className="cs-label">Manual driving</div>
                <Shot i={g('m_man1')} open={open} cap={false} />
                <p>The driver controls the car with the new wheel; the HUD shows only "Human driving".</p>
                <Shot i={g('m_man2')} open={open} cap={false} />
                <p>The driver takes over manually, and the system assists in detection and operation.</p>
              </div>
            </Reveal>
            <div className="mt-flow-arrows" aria-hidden="true">
              <span>ADAS activated →</span>
              <span>← Take over</span>
            </div>
            <Reveal delay={100}>
              <div className="mt-flow-col co">
                <div className="cs-label">Human-machine co-driving</div>
                {[
                  ['m_co1', 'ADAS is on. The driver plays the game at a moderate pace; the HUD shows "Machine driving" and a reminder.'],
                  ['m_co2', 'The game adapts: if the driver plays poorly, it comes more often, or more of the driving goes back to them.'],
                  ['m_co3', 'In scenarios the system cannot handle, clear prompts ask the driver to take over.'],
                ].map(([n, t]) => (
                  <div key={n} className="mt-co"><Shot i={g(n)} open={open} cap={false} /><p>{t}</p></div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Close ── */}
      <section className="cs-close mt-close">
        <div className="cs-wrap">
          <Reveal>
            <span className="mt-close-dot" aria-hidden="true" />
            <p className="cs-lead">Touch, sight and play: a driver who is still driving, even when the car is.</p>
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

export default MtaCaseStudy;
