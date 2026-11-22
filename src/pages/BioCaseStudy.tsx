import { useCallback, useState } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Viewer from '../components/casestudy/Viewer';
import { Reveal, SectionHead, ArrowLeft } from '../components/casestudy/primitives';
import type { ProjectData, StoryImage } from '../data/types';
import '../components/casestudy/bio.css';

/*
  Bio-Adaptive Microclimate — /design/5. Media in /public/Design_5 (b_* files, cropped from the
  Figma boards at 4x; D5_H is the hero render). Research numbers are redrawn as live charts.
  Clinical blue from the boards, warm amber for heating, cyan for cooling.
*/

const M = '/Design_5';
const img = (name: string, w: number, h: number, alt: string, caption?: string): StoryImage =>
  ({ src: `${M}/${name}.webp`, ratio: w / h, alt, caption });

/* ---------- data, from the research boards ---------- */

const STAYS = [
  { k: 'Orthopedics', d: 24 },
  { k: 'Thoracic surgery', d: 23 },
  { k: 'General surgery', d: 21 },
  { k: 'Tuberculosis', d: 19 },
  { k: 'General internal medicine', d: 15 },
  { k: 'Respiratory', d: 11 },
];

const VOTES = {
  sensation: { label: 'Thermal sensation', q: 'The immediate feeling of being hot or cold.', ticks: ['−3', '−2', '−1', '0', '+1', '+2', '+3'], ends: ['Cold', 'Hot'], v: [4, 8, 100, 388, 41, 24, 2] },
  comfort: { label: 'Thermal comfort', q: 'How comfortable the thermal environment feels.', ticks: ['−3', '−2', '−1', '0', '+1', '+2', '+3'], ends: ['', ''], v: [2, 10, 77, 395, 28, 45, 10] },
  acceptance: { label: 'Acceptance', q: 'Whether the thermal conditions are tolerable.', ticks: ['Not acceptable', 'Acceptable'], ends: ['', ''], v: [31, 536] },
  preference: { label: 'Preference', q: 'The desired change in thermal conditions.', ticks: ['−1', '0', '+1'], ends: ['', ''], v: [20, 439, 108] },
} as const;
type VoteKey = keyof typeof VOTES;

const GROUPS = [
  { k: 'OTD', name: 'Traumatic', nset: 21.75, lo: 17.54, hi: 24.05, sens: 'Low sensitivity to temperature change', pref: 'Moderate thermal preference', sd: 1.6, color: '#2fd3c0' },
  { k: 'ODD', name: 'Degenerative', nset: 21.82, lo: 20.74, hi: 21.72, sens: 'Extreme sensitivity to temperature change', pref: 'Moderate thermal preference', sd: 0.45, color: '#ff5b6e' },
  { k: 'OBMO', name: 'Bone metabolic and other', nset: 25.96, lo: 19.38, hi: 24.95, sens: 'Moderate sensitivity to temperature change', pref: 'Warmer thermal preference', sd: 1.1, color: '#f2c14e' },
];

const FEELINGS = [
  { zh: '冷', en: 'cold' }, { zh: '喜', en: 'happy' }, { zh: '困', en: 'sleepy' },
  { zh: '累', en: 'tired' }, { zh: '饿', en: 'hungry' }, { zh: '热', en: 'hot' },
];

const MODES = {
  heat: { label: 'Heating', title: 'Cool to the patient, so the bed warms.', text: 'Readings say the patient feels cool even though the room is near neutral. The infrared heating along the bed rails warms them, precisely and evenly.', src: `${M}/b_heat.webp`, read: { 'NSET*': '25.6 °C', 'Air temp': '25.3 °C', Humidity: '65 %', GSR: '198', 'Skin wettedness': '37 %', 'Thermal sensation': '−1' } },
  cool: { label: 'Cooling', title: 'Warm to the patient, so the bed breathes.', text: 'In the same room, a patient whose skin is damp and conductive feels hot. The bedside airflow switches on and lowers their perceived temperature.', src: `${M}/b_cool.webp`, read: { 'NSET*': '25.6 °C', 'Air temp': '25.3 °C', Humidity: '65 %', GSR: '573', 'Skin wettedness': '71 %', 'Thermal sensation': '+3' } },
} as const;
type ModeKey = keyof typeof MODES;

const GALLERY: StoryImage[] = [
  img('b_field1', 612, 428, 'Researcher interviewing a patient in a hospital waiting area', 'Questionnaires on the ward.'),
  img('b_field2', 592, 428, 'Measuring instruments on a tripod in a hospital corridor', 'Measuring the environment.'),
  img('b_field3', 600, 428, 'Team members interviewing patients in a hospital hall', 'Three hospitals.'),
  img('b_ward1', 736, 488, 'Ward model, The Second Hospital, 20 °C, 34 % RH', 'The Second Hospital: 20 °C, 34 % RH, 0.1 m/s.'),
  img('b_ward2', 832, 488, 'Ward model, Traditional Chinese Hospital, 17 °C, 21 % RH', 'Traditional Chinese Hospital: 17 °C, 21 % RH, still air.'),
  img('b_ward3', 784, 488, 'Ward model, The First Affiliated Hospital, 24 °C, 25 % RH', 'The First Affiliated Hospital: 24 °C, 25 % RH, still air.'),
  ...[1, 2, 3, 4, 5, 6].map(i => img(`b_s${i}`, 676, 328, 'A patient choosing a feeling card at the bedside', 'The card test on the ward.')),
  img('b_wet', 560, 500, 'The DHT-22 temperature and humidity sensor in a hand', 'Skin wettedness: DHT-22, 1–2 mm from the skin.'),
  img('b_gsr', 620, 500, 'The GSR board and its finger electrodes', 'GSR: electrodes in fabric finger cots.'),
  img('b_finger1', 552, 408, 'GSR electrodes worn on two fingers', 'GSR on the second knuckle.'),
  img('b_finger2', 552, 408, 'The skin wettedness sensor taped to a finger', 'Wettedness sensor on the finger.'),
  img('b_ice', 764, 532, 'A bowl of ice next to the sensors', 'Cold: 10 °C, ice and air conditioning.'),
  img('b_sun', 764, 536, 'A sunny window high above a river', 'Hot: 37 °C, direct sun and ventilation.'),
  img('b_g1a', 516, 380, 'Participant with sensors, initial state', 'Group 1, initial state.'),
  img('b_g1b', 516, 380, 'Participant holding a hand over ice', 'Group 1, cold.'),
  img('b_g1c', 540, 380, 'Participant with sensors in the sun', 'Group 1, hot.'),
  img('b_g2a', 512, 380, 'Second participant with sensors, initial state', 'Group 2, initial state.'),
  img('b_g2b', 516, 380, 'Second participant over ice', 'Group 2, cold.'),
  img('b_g2c', 540, 380, 'Second participant in the sun', 'Group 2, hot.'),
  img('b_gsrplot', 1244, 392, 'GSR over time through the cold and hot phases', 'GSR: it falls in the cold and climbs steeply in the heat.'),
  img('b_wetplot', 1244, 400, 'Skin wettedness over time through the cold and hot phases', 'Skin wettedness follows the same course.'),
  img('b_schem', 1800, 357, 'Block diagram and schematics: MCU, battery, pulse and SpO2, GSR, wettedness', 'Schematic: demo board and sensor circuits.'),
  img('b_layout', 776, 420, 'PCB layout in JLCPCB EDA', 'Layout.'),
  img('b_pcbfb', 816, 424, 'PCB front and back layers', 'Front and back.'),
  img('b_fpc1', 508, 420, 'Flexible circuit worn across the fingers', 'FPC on the hand.'),
  img('b_fpc2', 372, 420, 'The flexible circuit held up', 'Flexible.'),
  img('b_fpc3', 368, 420, 'The bare flexible printed circuit', 'The board.'),
  img('b_pcb1', 696, 516, 'Close-up of the flexible circuit before assembly', 'Before assembly.'),
  img('b_pcb2', 696, 516, 'Close-up of the assembled flexible circuit', 'Assembled.'),
  img('b_sketch', 1608, 736, 'Hand sketches of a wearable that wraps the fingers', 'Sketches.'),
  img('b_alias', 1104, 736, 'Modelling the wearable in Alias', 'Modelling in Alias.'),
  img('b_glove', 660, 1068, 'Wearable shell with GSR, MCU, USB-C, battery, pulse and wettedness marked', 'Where everything sits.'),
  img('b_proto1', 796, 1068, 'The working prototype on a hand, with battery and flexible circuit', 'Working prototype.'),
  img('b_simA', 664, 404, 'Micro-slit air supply model on the bed rail', 'Micro-slit air supply.'),
  img('b_simB', 668, 404, 'Direct fan air supply model on the bed rail', 'Direct fan air supply.'),
  img('b_simAr', 664, 412, 'Gentle airflow streamlines from the micro-slit rail', 'Gentle airflow, PMV 0.032.'),
  img('b_simBr', 668, 412, 'Sharp airflow streamlines from the fans', 'Sharp airflow, PMV −0.279.'),
  img('b_mod1', 928, 544, 'Modelling the bed rail in SolidWorks', 'Modelling the rail.'),
  img('b_mod2', 928, 544, 'Rendering the bed in KeyShot', 'Rendering.'),
  img('b_bed', 1800, 1350, 'The bed with its screen, electric fan unit and infrared heating rails called out', 'Screen, electric machinery and heating system.'),
  img('b_heat', 1800, 669, 'The bed glowing warm with the heating on', 'Heating.'),
  img('b_cool', 1800, 669, 'The bed with cool air flowing along it', 'Cooling.'),
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

/* ---------- questionnaire chart ---------- */
const Votes = () => {
  const [k, setK] = useState<VoteKey>('sensation');
  const d = VOTES[k];
  const max = Math.max(...d.v);
  const total = d.v.reduce((a, b) => a + b, 0);
  return (
    <div className="bi-votes">
      <div className="bi-tabs" role="tablist" aria-label="Question">
        {(Object.keys(VOTES) as VoteKey[]).map(x => (
          <button key={x} type="button" role="tab" aria-selected={x === k} onClick={() => setK(x)}>{VOTES[x].label}</button>
        ))}
      </div>
      <p className="bi-votes-q">{d.q}</p>
      <div className="bi-bars" style={{ '--n': d.v.length } as CSSProperties} key={k}>
        {d.v.map((v, i) => (
          <div key={i} className={`bi-bar ${v === max ? 'is-max' : ''}`}>
            <span className="val">{v}</span>
            <span className="col" style={{ height: `${Math.max(2, (v / max) * 100)}%`, animationDelay: `${i * 50}ms` }} />
            <span className="tick">{d.ticks[i]}</span>
          </div>
        ))}
      </div>
      <div className="bi-votes-foot">
        <span>{d.ends[0]}</span>
        <span className="cs-label">{total} responses</span>
        <span>{d.ends[1]}</span>
      </div>
    </div>
  );
};

/* ---------- comfort curves ---------- */
const X0 = 15, X1 = 29, W = 640, H = 260;
const sx = (t: number) => ((t - X0) / (X1 - X0)) * W;
const curve = (mu: number, sd: number) => {
  const pts: string[] = [];
  for (let t = X0; t <= X1 + 0.001; t += 0.05) {
    const y = Math.exp(-0.5 * ((t - mu) / sd) ** 2);
    pts.push(`${sx(t).toFixed(1)},${(H - 16 - y * (H - 40)).toFixed(1)}`);
  }
  return `M${pts.join(' L')}`;
};
const Curves = () => {
  const [at, setAt] = useState(0);
  const c = GROUPS[at];
  return (
    <div className="bi-curves">
      <Reveal>
        <svg viewBox={`-10 0 ${W + 20} ${H + 30}`} className="bi-curve-svg" role="img" aria-label="Comfort curves of the three patient groups">
          {[16, 18, 20, 22, 24, 26, 28].map(t => (
            <g key={t}>
              <line x1={sx(t)} x2={sx(t)} y1={10} y2={H - 16} className="grid" />
              <text x={sx(t)} y={H + 6} className="ax">{t}°</text>
            </g>
          ))}
          <line x1={0} x2={W} y1={H - 16} y2={H - 16} className="base" />
          {GROUPS.map((x, i) => (
            <path key={x.k} d={curve(x.nset, x.sd)} stroke={x.color} className={`bi-c ${i === at ? 'is-on' : ''}`} />
          ))}
          <line x1={sx(c.nset)} x2={sx(c.nset)} y1={14} y2={H - 16} stroke={c.color} className="nset" />
          <text x={sx(c.nset) + 6} y={22} className="ax nset-t" fill={c.color}>NSET* {c.nset}°</text>
          <text x={W} y={H + 24} className="ax end">SET* (°C)</text>
        </svg>
      </Reveal>
      <Reveal delay={100}>
        <div className="bi-groups" role="radiogroup" aria-label="Patient group">
          {GROUPS.map((x, i) => (
            <button key={x.k} type="button" role="radio" aria-checked={i === at} onClick={() => setAt(i)}>
              <span className="dot" style={{ background: x.color }} />
              <span className="k">{x.k}</span>
              <span className="n">{x.name}</span>
            </button>
          ))}
        </div>
        <dl className="bi-group-facts" key={c.k}>
          <div><dt>NSET*</dt><dd>{c.nset} °C</dd></div>
          <div><dt>Comfort range</dt><dd>{c.lo}–{c.hi} °C</dd></div>
          <div><dt>Preference</dt><dd>{c.pref}</dd></div>
          <div><dt>Sensitivity</dt><dd>{c.sens}</dd></div>
        </dl>
      </Reveal>
    </div>
  );
};

/* ---------- heating / cooling ---------- */
const Modes = ({ open }: { open: Open }) => {
  const [m, setM] = useState<ModeKey>('heat');
  const d = MODES[m];
  return (
    <section className={`cs-sec bi-modes is-${m}`} data-nav-dark>
      <div className="cs-wrap">
        <SectionHead index="09" label="How it works" title="Same room, two patients, two responses." />
        <div className="bi-switch" role="radiogroup" aria-label="Response">
          {(Object.keys(MODES) as ModeKey[]).map(k => (
            <button key={k} type="button" role="radio" aria-checked={k === m} onClick={() => setM(k)}>{MODES[k].label}</button>
          ))}
        </div>
        <div className="bi-modes-grid">
          <Reveal>
            <button type="button" className="bi-stage" onClick={() => open(d.src)} aria-label={`View larger: ${MODES[m].label}`}>
              {(Object.keys(MODES) as ModeKey[]).map(k => (
                <img key={k} src={MODES[k].src} alt={k === m ? `The bed, ${MODES[k].label.toLowerCase()}` : ''} className={k === m ? 'is-on' : ''} loading="lazy" />
              ))}
            </button>
            <div className="bi-mode-text" key={m}>
              <h3 className="cs-h3">{d.title}</h3>
              <p className="cs-body">{d.text}</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <dl className="bi-readout">
              {Object.entries(d.read).map(([k, v]) => (
                <div key={k} className={k === 'GSR' || k === 'Skin wettedness' || k === 'Thermal sensation' ? 'is-key' : ''}><dt>{k}</dt><dd key={`${m}-${k}`}>{v}</dd></div>
              ))}
              <div className="bi-action"><dt>Action</dt><dd key={m}>{d.label}</dd></div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const BioCaseStudy = ({ project, prev, next }: { project: ProjectData; prev: ProjectData; next: ProjectData }) => {
  const [at, setAt] = useState<number | null>(null);
  const open = useCallback<Open>(src => {
    const i = GALLERY.findIndex(x => x.src === src);
    if (i >= 0) setAt(i);
  }, []);
  const close = useCallback(() => setAt(null), []);
  const maxStay = STAYS[0].d;

  return (
    <main className="cs bi">
      <Seo title="Bio-Adaptive Microclimate — Thermal Comfort for Orthopedic Wards | Ruipeng Wang" description={project.description} />

      {/* ── Hero ── */}
      <header className="bi-hero" data-nav-dark>
        <img className="bi-hero-img" src={`${M}/D5_H.webp`} alt="A hospital bed drawn in light, warm at one end and cool at the other" fetchPriority="high" />
        <div className="cs-wrap bi-hero-in">
          <Link to="/design" className="cs-back"><ArrowLeft /><span className="cs-label" style={{ color: 'inherit' }}>Design</span></Link>
          <div className="bi-hero-text">
            <div className="cs-label">Interaction Design — 2025 · Research</div>
            <h1 className="bi-title">Bio-Adaptive<br />Microclimate</h1>
            <p className="cs-hero-sub">An interactive thermal comfort system for orthopedic wards.</p>
          </div>
        </div>
      </header>

      {/* ── Overview ── */}
      <section className="cs-sec">
        <div className="cs-wrap">
          <div className="cs-split bi-overview">
            <Reveal>
              <dl className="cs-facts bi-facts">
                <div><dt>Type</dt><dd>Research project<br /><span>with three hospitals in Zhangjiakou</span></dd></div>
                <div><dt>Setting</dt><dd>Orthopedic wards</dd></div>
                <div><dt>Senses</dt><dd>Galvanic skin response (GSR)<br />Skin wettedness</dd></div>
                <div><dt>Methods</dt><dd>Field study, questionnaires<br />Sensor experiments<br />FPC design, CFD simulation</dd></div>
                <div><dt>Timeline</dt><dd>{project.time.replace(' - ', ' – ')}</dd></div>
              </dl>
            </Reveal>
            <Reveal delay={100}>
              <p className="cs-lead">
                At a temperature that is neutral on paper, patients in the same orthopedic ward still feel very
                differently. Bio-Adaptive Microclimate stops regulating the room for an average patient, and adapts the
                air around each bed to the person lying in it.
              </p>
              <div style={{ height: 32 }} />
              <p className="cs-body">
                Non-invasive sensors on flexible printed circuits read skin wettedness and GSR in real time, so a
                patient's perception of their environment can be measured instead of guessed. The interaction logic
                turns those signals into commands for small airflow and heating modules at the bedside: from the
                environment regulating people, to the environment adapting to them.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 01 Field study ── */}
      <section className="cs-sec bi-tint">
        <div className="cs-wrap">
          <SectionHead index="01" label="Field study" title="Long stays, little say." />
          <div className="cs-split cs-split--wide">
            <Reveal>
              <ol className="bi-stays" aria-label="Average hospital stay by department">
                {STAYS.map((s, i) => (
                  <li key={s.k} className={i === 0 ? 'is-top' : ''}>
                    <span className="k">{s.k}</span>
                    <span className="bar"><i style={{ width: `${(s.d / maxStay) * 100}%` }} /></span>
                    <span className="d">{s.d}<small> days</small></span>
                  </li>
                ))}
              </ol>
              <p className="cs-cap">Average length of stay by department.</p>
            </Reveal>
            <Reveal delay={100}>
              <p className="cs-body">
                Orthopedic patients stay in hospital the longest, with limited mobility. Casts, braces and external
                fixators get in the way of losing heat; long bed rest and fixed postures leave them unable to cool or
                warm themselves, and changes in blood circulation alter how they feel heat.
              </p>
              <p className="cs-body">
                With three hospitals in Zhangjiakou, a city on the boundary between the cold and severe cold climate
                zones, the study measured the wards and asked the patients.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <div className="cs-stats bi-stats">
              <div><div className="cs-num">567</div><p>Valid questionnaires.</p></div>
              <div><div className="cs-num">3</div><p>Hospitals.</p></div>
              <div><div className="cs-num">11</div><p>Types of orthopedic disease, in three groups.</p></div>
            </div>
          </Reveal>
          <Reveal>
            <div className="cs-row cs-gap-top">
              {['b_field1', 'b_field2', 'b_field3'].map(n => <Shot key={n} i={g(n)} open={open} />)}
            </div>
          </Reveal>
          <Reveal>
            <div className="cs-row cs-gap-top bi-wards">
              {['b_ward1', 'b_ward2', 'b_ward3'].map(n => <Shot key={n} i={g(n)} open={open} />)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 02 Questionnaire ── */}
      <section className="cs-sec cs-dark bi-dark" data-nav-dark>
        <div className="cs-wrap">
          <SectionHead index="02" label="Questionnaire" title="Mostly neutral, never unanimous." />
          <div className="cs-split cs-split--wide">
            <Reveal>
              <p className="cs-body">
                Standardised thermal scales, checked in a pilot test, asked about sensation, comfort, acceptance and
                preference. Most patients sit near neutral, but not all of them: almost a third report something
                other than neutral, and close to one in five would rather be warmer.
              </p>
              <ul className="bi-indicators">
                <li><b>Tmrt</b>Mean radiant temperature</li>
                <li><b>SET*</b>Standard effective temperature</li>
                <li><b>PMV</b>Predicted mean vote</li>
              </ul>
            </Reveal>
            <Reveal delay={100}><Votes /></Reveal>
          </div>
        </div>
      </section>

      {/* ── 03 Three groups ── */}
      <section className="cs-sec cs-dark bi-dark bi-dark-2" data-nav-dark>
        <div className="cs-wrap">
          <SectionHead index="03" label="Result" title="Three kinds of patient, three comfort zones." />
          <Curves />
        </div>
      </section>

      {/* ── 04 Engagement ── */}
      <section className="cs-sec">
        <div className="cs-wrap">
          <SectionHead index="04" label="Engagement" title="Six cards, no thinking required." />
          <div className="cs-split cs-split--wide">
            <Reveal>
              <ul className="bi-cards" aria-label="Feeling cards">
                {FEELINGS.map(f => <li key={f.zh}><span className="zh" lang="zh-CN">{f.zh}</span><span className="en">{f.en}</span></li>)}
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <p className="cs-body">
                To see how much the neutral temperature differs from one patient to the next, a low cognitive load
                test: six cards with simple feelings written on them, so patients of every kind could choose without
                having to think.
              </p>
              <p className="bi-finding">Patients in the same ward also experience differences in their individual thermal sensation.</p>
            </Reveal>
          </div>
          <Reveal>
            <div className="bi-sessions cs-gap-top">
              {[1, 2, 3, 4, 5, 6].map(i => <Shot key={i} i={g(`b_s${i}`)} open={open} cap={false} />)}
            </div>
          </Reveal>
          <Reveal>
            <div className="bi-hmw cs-gap-top">
              <div className="cs-label">How might we</div>
              <p>establish a method for collecting the most comfortable environmental needs of each patient?</p>
              <ol>
                <li><span className="n">01</span><h4>The patient speaks up</h4><p>Some cannot speak, and many put up with discomfort long before they do.</p></li>
                <li><span className="n">02</span><h4>Staff ask</h4><p>Fully dependent on nursing staff, and patients cannot always say what they feel.</p></li>
                <li><span className="n">03</span><h4>Staff look</h4><p>Treatment makes patients look alike; symptoms show only after a long time uncomfortable.</p></li>
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 05 Sensing ── */}
      <section className="cs-sec bi-tint">
        <div className="cs-wrap">
          <SectionHead index="05" label="Sensing" title="Reading comfort from the skin." />
          <div className="cs-split cs-split--wide">
            <Reveal>
              <div className="cs-row">
                <Shot i={g('b_wet')} open={open} />
                <Shot i={g('b_gsr')} open={open} />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <p className="cs-body">
                Cortisol was ruled out: molecularly imprinted polymers need special cleaning, and organic
                electrochemical transistors are costly. GSR and skin wettedness are fast and non-invasive.
              </p>
              <p className="cs-body">
                The GSR electrodes sit on the second knuckle, held by a fabric finger cot: dense sweat glands, a
                sensitive signal and little motion interference. The wettedness sensor rests 1 to 2 mm from the skin.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <div className="cs-row cs-gap-top">
              <Shot i={g('b_finger1')} open={open} />
              <Shot i={g('b_finger2')} open={open} />
              <Shot i={g('b_ice')} open={open} />
              <Shot i={g('b_sun')} open={open} />
            </div>
          </Reveal>
          <Reveal>
            <div className="bi-groups-exp cs-gap-top">
              {[
                { g: 'Group 1', t: '13:08', temp: '30.7 °C', rh: '70.4 %', gsr: '≈ 210', imgs: ['b_g1a', 'b_g1b', 'b_g1c'] },
                { g: 'Group 2', t: '13:17', temp: '29.3 °C', rh: '68.4 %', gsr: '≈ 200', imgs: ['b_g2a', 'b_g2b', 'b_g2c'] },
              ].map(x => (
                <div key={x.g} className="bi-exp">
                  <dl>
                    <div><dt>{x.g}</dt><dd>Start {x.t}</dd></div>
                    <div><dt>Temp</dt><dd>{x.temp}</dd></div>
                    <div><dt>Humidity</dt><dd>{x.rh}</dd></div>
                    <div><dt>GSR</dt><dd>{x.gsr} <small>ADC</small></dd></div>
                  </dl>
                  <div className="cs-row">{x.imgs.map(n => <Shot key={n} i={g(n)} open={open} cap={false} />)}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <div className="bi-plots cs-gap-top">
              <Shot i={g('b_gsrplot')} open={open} />
              <Shot i={g('b_wetplot')} open={open} />
            </div>
          </Reveal>
          <Reveal>
            <ol className="bi-results cs-gap-top">
              <li><span className="n">01</span>The GSR sensor effectively detects the patient's feedback on temperature change.</li>
              <li><span className="n">02</span>Skin wettedness is consistent with how patients say the environment feels.</li>
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ── 06 Hardware ── */}
      <section className="cs-sec cs-dark bi-dark" data-nav-dark>
        <div className="cs-wrap">
          <SectionHead index="06" label="Hardware" title="A circuit that bends with the hand." />
          <div className="cs-split">
            <div />
            <Reveal>
              <p className="cs-body">
                To fit a wearable, the board is a flexible printed circuit, designed in JLCPCB EDA from schematic to
                layout to fabrication: battery, MCU, Type-C and the sensor circuits for pulse and SpO<sub>2</sub>{' '}
                (MAX30102), GSR (MCP6001) and skin wettedness (SHTC3).
              </p>
            </Reveal>
          </div>
          <Reveal><div className="cs-gap-top"><Shot i={g('b_schem')} open={open} /></div></Reveal>
          <Reveal>
            <div className="cs-row cs-gap-top">
              <Shot i={g('b_layout')} open={open} />
              <Shot i={g('b_pcbfb')} open={open} />
            </div>
          </Reveal>
          <Reveal>
            <div className="cs-row cs-gap-top">
              <Shot i={g('b_fpc1')} open={open} />
              <Shot i={g('b_fpc2')} open={open} />
              <Shot i={g('b_fpc3')} open={open} />
            </div>
          </Reveal>
          <Reveal>
            <div className="cs-row cs-gap-top">
              <Shot i={g('b_pcb1')} open={open} />
              <Shot i={g('b_pcb2')} open={open} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 07 Wearable ── */}
      <section className="cs-sec">
        <div className="cs-wrap">
          <SectionHead index="07" label="Wearable" title="Sketched, modelled, worn." />
          <Reveal>
            <div className="cs-row">
              <Shot i={g('b_sketch')} open={open} />
              <Shot i={g('b_alias')} open={open} />
            </div>
          </Reveal>
          <Reveal>
            <div className="cs-row cs-gap-top">
              <Shot i={g('b_glove')} open={open} />
              <Shot i={g('b_proto1')} open={open} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 08 Bed ── */}
      <section className="cs-sec bi-tint">
        <div className="cs-wrap">
          <SectionHead index="08" label="The bed" title="Air that moves gently." />
          <div className="cs-split cs-split--wide">
            <Reveal>
              <div className="bi-sim">
                <Shot i={g('b_simA')} open={open} cap={false} />
                <Shot i={g('b_simB')} open={open} cap={false} />
                <Shot i={g('b_simAr')} open={open} cap={false} />
                <Shot i={g('b_simBr')} open={open} cap={false} />
                <div className="bi-sim-k"><b>Micro-slit</b>PMV 0.032</div>
                <div className="bi-sim-k"><b>Direct fan</b>PMV −0.279</div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <p className="cs-body">
                Two air supplies on the bed rail were compared with flow simulation in SolidWorks: the direction and
                path of the air, and how its velocity affects the patient's comfort.
              </p>
              <p className="cs-body">
                The micro-slit rail uses the Bernoulli principle to move air gently around the patient. It cools
                while keeping comfort: PMV 0.032, almost exactly neutral, where direct fans give −0.279.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <div className="cs-row cs-gap-top">
              <Shot i={g('b_mod1')} open={open} />
              <Shot i={g('b_mod2')} open={open} />
            </div>
          </Reveal>
          <Reveal><div className="cs-gap-top"><Shot i={g('b_bed')} open={open} /></div></Reveal>
        </div>
      </section>

      {/* ── 09 How it works ── */}
      <Modes open={open} />

      {/* ── Close ── */}
      <section className="cs-close">
        <div className="cs-wrap">
          <Reveal>
            <span className="bi-close-dot" aria-hidden="true" />
            <p className="cs-lead">Not the right temperature for the ward. The right temperature for the patient.</p>
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

export default BioCaseStudy;
