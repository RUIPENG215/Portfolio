import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import LightRing from '../components/casestudy/LightRing';
import type { RingState } from '../components/casestudy/LightRing';
import { Reveal, SectionHead, Figure, Row, Film, ArrowLeft, ArrowOut, ArrowDown } from '../components/casestudy/primitives';
import type { ProjectData } from '../data/types';

/*
  Wisp — /design/9. The QR codes on the poster, slides, report and film point here,
  so the id must stay 9. Media lives in /public/Design_9.

  Hero: hero_lamp.webp (daytime close-up). Film: wisp_demo.mp4, the 104 s film with sound, 1600 px.
*/

const M = '/Design_9';
const HERO: 'ring' | 'photo' = 'ring';

const STATES: { id: RingState; name: string; by: string; text: string }[] = [
  { id: 'present', name: 'Present', by: 'Keyboard or trackpad', text: 'A slow amber band flows around the ring, with almost no breathing.' },
  { id: 'voice', name: 'Voice', by: 'Microphone level', text: 'White sparks appear over the flow, denser as the room gets louder.' },
  { id: 'clap', name: 'Clap', by: 'Sudden rise in level', text: 'A flash, then a comet that laps the ring in about 1.6 seconds.' },
  { id: 'away', name: 'Away', by: 'No input for 10 s', text: 'The light dims, slows and turns blue with a deep breath. Fully blue after 45 seconds.' },
  { id: 'return', name: 'Return', by: 'Input after an absence', text: 'A blink, then a warm swell back to amber.' },
  { id: 'music', name: 'Music', by: 'System audio, bass', text: 'Flow nearly stops. The ring is almost dark between kicks and opens fully on each; the hue steps through a rainbow and the strongest kicks bleach to white.' },
  { id: 'think', name: 'Thinking', by: 'Agent turn', text: 'While the language model composes its reply, a band circles the ring.' },
];

const TOOLS = ['set_light', 'blink', 'play_effect', 'say', 'gesture', 'save_look', 'recall_look', 'remind', 'set_reflex', 'feel', 'remember', 'observe'];
const GESTURES = ['think', 'nod', 'shake', 'happy', 'shy', 'sulk', 'surprise', 'wave'];
const PERFORMANCES = ['candle', 'heartbeat', 'ocean', 'aurora'];

const ink = { fill: 'none', stroke: '#6f6a62', strokeWidth: 1.2 } as const;
const artLabel = { fontFamily: 'JetBrains Mono, monospace', fontSize: 9, fill: '#6f6a62', letterSpacing: 1, textAnchor: 'middle' } as const;

// Stages 2 and 3 have no photos: simple line drawings instead.
const InflatableArt = () => (
  <svg viewBox="0 0 200 250" width="100%" height="100%" aria-hidden="true" style={{ display: 'block' }}>
    <g {...ink}>
      <path d="M58 182c-20-40-14-92 42-106 56 14 62 66 42 106z" />
      <path d="M50 190c-26-48-18-110 50-126 68 16 76 78 50 126" strokeDasharray="3 5" opacity="0.6" />
      <rect x="54" y="182" width="92" height="22" rx="3" />
      <path d="M146 196c18 0 26 2 30 10" strokeDasharray="2 4" />
      <circle cx="178" cy="214" r="8" />
    </g>
    <text x="178" y="240" {...artLabel}>PUMP</text>
  </svg>
);

const LouvreArt = () => (
  <svg viewBox="0 0 200 250" width="100%" height="100%" aria-hidden="true" style={{ display: 'block' }}>
    <g {...ink}>
      <circle cx="100" cy="72" r="48" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const x = 100 + Math.cos(a) * 40, y = 72 + Math.sin(a) * 40;
        const t = a + 0.6;
        return <path key={i} d={`M${x - Math.cos(t) * 9} ${y - Math.sin(t) * 9}L${x + Math.cos(t) * 9} ${y + Math.sin(t) * 9}`} />;
      })}
      <circle cx="100" cy="72" r="5" />
      {Array.from({ length: 9 }, (_, i) => <rect key={i} x={46 + i * 12} y={150} width={6} height={64} rx={1} transform={`skewX(${i % 2 ? -8 : 8})`} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />)}
      <path d="M40 222h120" />
    </g>
    <text x="100" y="138" {...artLabel}>TOP</text>
    <text x="100" y="242" {...artLabel}>FRONT</text>
  </svg>
);

const BehaviourSim = () => {
  const [active, setActive] = useState<RingState>('present');
  const touched = useRef(false);
  // Walk through the states on its own until someone picks one.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => {
      if (touched.current) return;
      setActive(prev => STATES[(STATES.findIndex(s => s.id === prev) + 1) % STATES.length].id);
    }, 6500);
    return () => window.clearInterval(id);
  }, []);
  const current = STATES.find(s => s.id === active) ?? STATES[0];
  return (
    <div className="cs-sim">
      <Reveal>
        <div className="cs-sim-stage">
          <LightRing state={active} />
          <div className="cs-sim-tag">
            <div className="cs-label" style={{ color: 'rgba(255,255,255,0.5)' }}>{current.name}</div>
          </div>
        </div>
      </Reveal>
      <Reveal delay={120}>
        <ul className="cs-states">
          {STATES.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                aria-pressed={s.id === active}
                onClick={() => { touched.current = true; setActive(s.id); }}
              >
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <span className="t">{s.name}</span>
                <span className="d">{s.by}</span>
                <span className="x">{s.text}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="cs-cap">A simulation of the ring drawn in the browser. The real lamp renders the same kinds of parameters (hue, flow, breath, sparkle) at 50 frames per second.</p>
      </Reveal>
    </div>
  );
};

const WispCaseStudy = ({ project, prev, next }: { project: ProjectData; prev: ProjectData; next: ProjectData }) => (
  <main className="cs">
    <Seo
      title="Wisp — An Ambient Lamp as the Body of an AI Agent | Ruipeng Wang"
      description={project.description}
    />

    {/* ── Hero ─────────────────────────────────────────────
         HERO = 'ring': dark, the live ring sketch. HERO = 'photo': light, daytime close-up. */}
    {HERO === 'ring' ? (
      <header className="cs-hero cs-hero--ring" data-nav-dark>
        <div className="cs-wrap cs-hero-grid">
          <div className="cs-hero-text">
            <Link to="/design" className="cs-back"><ArrowLeft /><span className="cs-label" style={{ color: 'inherit' }}>Design</span></Link>
            <div className="cs-hero-in">
              <div className="cs-label">Interaction Design — 2026</div>
              <h1 className="cs-title">Wisp</h1>
              <p className="cs-hero-sub">An ambient lamp as the body of an AI agent.</p>
              <div className="cs-hero-meta">
                <span><b>Course</b>ID5402, NUS</span>
                <span><b>Type</b>Individual</span>
                <span><b>Built</b>Basswood, paper, LEDs, LLM</span>
              </div>
            </div>
          </div>
          <figure className="cs-hero-ring" style={{ margin: 0 }}>
            <LightRing state="present" />
            <figcaption className="cs-label">32 LEDs · present, quiet room</figcaption>
          </figure>
        </div>
      </header>
    ) : (
      <header className="cs-hero">
        <div className="cs-wrap cs-hero-grid">
          <div className="cs-hero-text">
            <Link to="/design" className="cs-back"><ArrowLeft /><span className="cs-label" style={{ color: 'inherit' }}>Design</span></Link>
            <div className="cs-hero-in">
              <div className="cs-label">Interaction Design — 2026</div>
              <h1 className="cs-title">Wisp<span className="cs-orb" /></h1>
              <p className="cs-hero-sub">An ambient lamp as the body of an AI agent.</p>
              <div className="cs-hero-meta">
                <span><b>Course</b>ID5402, NUS</span>
                <span><b>Type</b>Individual</span>
                <span><b>Built</b>Basswood, paper, LEDs, LLM</span>
              </div>
            </div>
          </div>
          <figure className="cs-hero-photo">
            <img src={`${M}/hero_lamp.webp`} alt="Wisp in daylight: a tracing-paper shade on a slotted basswood base, beside a laptop" fetchPriority="high" />
          </figure>
        </div>
      </header>
    )}

    {/* ── 01 Overview ────────────────────────────────────── */}
    <section className="cs-sec">
      <div className="cs-wrap">
        <div className="cs-split">
          <Reveal>
            <dl className="cs-facts">
              <div><dt>Type</dt><dd>Individual project</dd></div>
              <div><dt>Course</dt><dd>ID5402 Cybernetic Systems, National University of Singapore</dd></div>
              <div><dt>Advisor</dt><dd>Irmandy Wicaksono</dd></div>
              <div><dt>Timeline</dt><dd>{project.time}</dd></div>
              <div><dt>Role</dt><dd>Concept, form, fabrication, firmware, software and agent design</dd></div>
              <div><dt>Built with</dt><dd>Feather nRF52840 Sense, WS2812B, Python, pywebview, DeepSeek</dd></div>
            </dl>
          </Reveal>
          <Reveal delay={100}>
            <p className="cs-lead">
              Wisp gives a large language model a physical body. Instead of living in a chat window, the agent
              inhabits a lamp: it senses the room through the laptop and answers through the behaviour of light,
              with a small glowing ring floating on the screen as its face.
            </p>
            <div style={{ height: 32 }} />
            <p className="cs-body">
              A ring of 32 LEDs glows behind a single sheet of tracing paper on a laser-cut basswood frame, slotted
              together without glue. On the laptop, a ring the size of an icon mirrors the lamp and shows what the
              agent says. Underneath, two loops run at two speeds: a reflex that ties the light to sound, music and
              presence 25 times a second, and a language model that wakes only when something happens and answers
              with a gesture, a look and a sentence.
            </p>
            <div className="cs-links">
              <a className="cs-btn" href="#film"><ArrowDown /> Watch the film</a>
              {project.externalLink && (
                <a className="cs-btn cs-btn--ghost" href={project.externalLink} target="_blank" rel="noopener noreferrer">Source code <ArrowOut /></a>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    {/* ── 02 Film ────────────────────────────────────────── */}
    <section className="cs-sec cs-dark" id="film" data-nav-dark>
      <div className="cs-wrap">
        <SectionHead index="01" label="Film" title="One lamp, one evening." />
        <Reveal>
          <Film src={`${M}/wisp_demo.mp4`} poster={`${M}/music.webp`} label="Play film — 1:44, sound on" />
          <p className="cs-cap">Presence, absence and return; the agent's gestures and moods; then music.</p>
        </Reveal>
      </div>
    </section>

    {/* ── 03 One body of light ───────────────────────────── */}
    <section className="cs-sec">
      <div className="cs-wrap">
        <SectionHead index="02" label="Concept" title="Two bodies, one light." />
        <Reveal>
          <Row>
            <Figure src={`${M}/day.webp`} alt="Wisp in daylight beside a laptop" ratio={4 / 3} caption={<><b>On the desk.</b> Basswood, tracing paper and a ring of 32 LEDs.</>} />
            <Figure src={`${M}/ring_bubble.webp`} alt="The floating ring on the Mac screen with a speech bubble" ratio={460 / 450} caption={<><b>On the screen.</b> The same light, with words.</>} />
          </Row>
        </Reveal>
        <div className="cs-split" style={{ marginTop: 'clamp(48px, 6vw, 80px)' }}>
          <div />
          <Reveal>
            <p className="cs-body">
              The lamp sits on the desk; its twin floats in a corner of the screen. Both are drawn from the same
              fourteen numbers, so when the agent changes its mind, paper and pixels change together. The ring gives
              the agent a face where the person is already looking, and gives the lamp a way to be understood: a new
              user sees the bubble and the light change at once, and reads the light as an intention.
            </p>
          </Reveal>
        </div>
      </div>
    </section>

    {/* ── 04 Behaviour ───────────────────────────────────── */}
    <section className="cs-sec cs-dark" data-nav-dark>
      <div className="cs-wrap">
        <SectionHead index="03" label="Behaviour" title="Still by default, moving only in reply." />
        <div className="cs-split" style={{ marginBottom: 'clamp(48px, 6vw, 88px)' }}>
          <div />
          <Reveal>
            <p className="cs-body">
              Reflexes make the lamp visibly responsive without any model in the loop. Tuning them took most of the
              iteration time: early versions breathed as a whole and looked as if the lamp were changing by itself.
              The final behaviour holds a steady flow while someone is there, and changes clearly when they leave.
              Music needed its own treatment: following loudness made the ring spin, so it follows the bass instead.
            </p>
          </Reveal>
        </div>
        <BehaviourSim />
        <Reveal>
          <Row className="cs-gap-top">
            <Figure src={`${M}/warm.webp`} alt="The lamp glowing warm while a hand rests on the trackpad" ratio={480 / 740} caption={<><b>Present.</b> Warm, slow flow.</>} />
            <Figure src={`${M}/music.webp`} alt="The lamp in rainbow colours beside a laptop playing music" ratio={16 / 9} caption={<><b>Music.</b> The ring opens on each kick and steps through the hues.</>} />
            <Figure src={`${M}/rainbow.webp`} alt="Close-up of the lamp in rainbow light" ratio={480 / 740} />
          </Row>
        </Reveal>

        <div className="cs-split" style={{ marginTop: 'clamp(88px, 11vw, 150px)' }}>
          <Reveal><div className="cs-label">Body language</div></Reveal>
          <Reveal>
            <h3 className="cs-h3">A vocabulary for the agent.</h3>
            <p className="cs-body">
              Beyond the reflexes, the agent has body language of its own: eight gestures and a set of longer
              performances. It chooses them itself, through its <code>gesture</code> and <code>play_effect</code> tools,
              as part of a reply, alongside a look and a sentence. In the film they are shown one by one for the camera.
            </p>
            <div style={{ display: 'grid', gap: 18, marginTop: 32 }}>
              <ul className="cs-chips">{GESTURES.map(g => <li key={g}>{g}</li>)}</ul>
              <ul className="cs-chips cs-chips--amber">{PERFORMANCES.map(g => <li key={g}>{g}</li>)}</ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    {/* ── 05 Desktop companion ───────────────────────────── */}
    <section className="cs-sec">
      <div className="cs-wrap">
        <SectionHead index="04" label="Desktop companion" title="A ring on the screen." />
        <div className="cs-split cs-split--wide">
          <Reveal>
            <Figure src={`${M}/ring_desktop.webp`} alt="The floating ring and speech bubble on the macOS desktop" ratio={1239 / 1044} />
          </Reveal>
          <Reveal delay={100}>
            <p className="cs-body">
              The companion is a frameless, always-on-top window drawn with the same rendering maths as the firmware,
              so the screen and the lamp show the same light at the same moment. When the agent speaks, its words appear
              in a bubble beside the ring, and it speaks first only when something has happened.
            </p>
            <p className="cs-body">
              Clicking the ring opens a panel for talking, colour and play. The whole thing is packaged as a
              double-click Mac app; closing it puts the lamp out.
            </p>
          </Reveal>
        </div>
        <div className="cs-panels">
          <Reveal><Figure src={`${M}/ui_talk.webp`} alt="Talk panel" ratio={780 / 1280} caption={<><b>Talk.</b> A conversation with the lamp.</>} /></Reveal>
          <Reveal delay={90}><Figure src={`${M}/ui_colour.webp`} alt="Colour panel" ratio={780 / 1280} caption={<><b>Colour.</b> The look laid open: two hues, rainbow, richness, brightness, flow and sparkle. Saved looks can be recalled by the agent.</>} /></Reveal>
          <Reveal delay={180}><Figure src={`${M}/ui_play.webp`} alt="Play panel" ratio={780 / 1280} caption={<><b>Play.</b> The agent's gestures and performances, the same set it draws on when it replies.</>} /></Reveal>
        </div>
      </div>
    </section>

    {/* ── 06 Agent ───────────────────────────────────────── */}
    <section className="cs-sec">
      <div className="cs-wrap">
        <SectionHead index="05" label="The agent" title="A character, not a command parser." />
        <div className="cs-split cs-split--even">
          <Reveal>
            <p className="cs-body">
              The agent's prompt describes a lamp with a temperament, four slowly changing drives (energy, curiosity,
              security and bond) and a memory of facts it has chosen to keep. The host wakes it only when the situation
              changes in a way that matters: someone returns or leaves, music starts or stops, the room turns loud or
              quiet, it gets late, a message goes unanswered. It also wakes when it is written to, and on a ten-minute
              heartbeat.
            </p>
            <p className="cs-body">
              A language model is too slow and too variable for real-time feedback, but well suited to occasional
              decisions about meaning. So the agent changes <em>what</em> the lamp is doing, and the reflexes decide
              <em> how</em> it moves from moment to moment. A cap of 60 calls an hour and a circuit breaker keep cost and
              failures contained; if the model is unreachable, the reflexes carry on.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="cs-label" style={{ marginBottom: 14 }}>One turn, 22:53</div>
            <div className="cs-log" role="figure" aria-label="One logged turn of the agent">
              <div className="cs-log-row"><span className="t">22:53</span><span className="k">wake</span><span>back at the desk · late evening</span></div>
              <div className="cs-log-row"><span className="t" /><span className="k">think</span><span>band circles the ring while the model replies</span></div>
              <div className="cs-log-row"><span className="t" /><span className="k">set_light</span><span>hue 28 · brightness 130</span></div>
              <div className="cs-log-row"><span className="t" /><span className="k">say</span>
                <span><span className="q">啊，回来了。这么晚了，我把灯调得暖暖的，陪你把这一天收个尾。</span><br />
                  <span className="en">“Ah, you're back. It's late, so I've made the light warm to keep you company while you wrap up the day.”</span></span>
              </div>
              <div className="cs-log-row"><span className="t" /><span className="k">turn</span><span>1,678 ms</span></div>
            </div>
            <div className="cs-counts">
              <div><div className="cs-num">12</div><div className="cs-label" style={{ marginTop: 8 }}>Tools</div></div>
              <div><div className="cs-num">8</div><div className="cs-label" style={{ marginTop: 8 }}>Gestures</div></div>
              <div><div className="cs-num">4</div><div className="cs-label" style={{ marginTop: 8 }}>Drives</div></div>
            </div>
            <ul className="cs-chips" style={{ marginTop: 24 }}>{TOOLS.map(t => <li key={t}>{t}</li>)}</ul>
          </Reveal>
        </div>
      </div>
    </section>

    {/* ── 07 Process ─────────────────────────────────────── */}
    <section className="cs-sec" style={{ background: 'var(--paper-2)' }}>
      <div className="cs-wrap">
        <SectionHead index="06" label="Process" title="Five stages, three subtractions." />
        <Reveal>
          <ol className="cs-stages" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            <li className="cs-stage">
              <span className="cs-label">Stage 1</span>
              <Figure src={`${M}/forms_e.webp`} alt="Concept sketch of form E, a hollow table lamp that listens to the room" contain />
              <h4>Five forms</h4>
              <p>Handheld, table, soft, layered, and a hollow lamp that listens. Form E sits where a person already works and makes the room the input.</p>
              <span className="cs-verdict">Kept form E</span>
            </li>
            <li className="cs-stage">
              <span className="cs-label">Stage 2</span>
              <div className="cs-frame" style={{ aspectRatio: '4 / 5', margin: '6px 0 18px', padding: '12%' }}><InflatableArt /></div>
              <h4>Inflatable body</h4>
              <p>A shade that swells and relaxes, after feedback pointing to soft robotics. The pump would drown out the sound the lamp listens to.</p>
              <span className="cs-verdict">Dropped</span>
            </li>
            <li className="cs-stage">
              <span className="cs-label">Stage 3</span>
              <div className="cs-frame" style={{ aspectRatio: '4 / 5', margin: '6px 0 18px', padding: '12%' }}><LouvreArt /></div>
              <h4>Louvres on a linkage</h4>
              <p>Vertical louvres turned by servos to steer the light. A circular linkage was too complex to assemble reliably in time.</p>
              <span className="cs-verdict">Dropped</span>
            </li>
            <li className="cs-stage">
              <span className="cs-label">Stage 4</span>
              <Figure src={`${M}/servo1.webp`} alt="A paper shading panel on a servo inside the LED ring" />
              <h4>Servo shading panel</h4>
              <p>Built and tested, then removed: too slow to follow music, audible in a quiet room, and less expressive than finely controlled light.</p>
              <span className="cs-verdict">Built, removed</span>
            </li>
            <li className="cs-stage is-kept">
              <span className="cs-label">Stage 5</span>
              <Figure src={`${M}/day.webp`} alt="The finished lamp" />
              <h4>Light, Mac and agent</h4>
              <p>All expression moves into the behaviour of light, sensing moves to the laptop, and the agent gains a second body on the screen.</p>
              <span className="cs-verdict">Final</span>
            </li>
          </ol>
        </Reveal>
        <div className="cs-split" style={{ marginTop: 'clamp(56px, 7vw, 96px)' }}>
          <div />
          <Reveal>
            <p className="cs-body">
              Sensing moved because the shade encloses the board: its proximity sensor only answered a hand almost
              touching it, and the lamp's own light spoils an ambient-light reading. The laptop already knows whether
              someone is typing, what the room sounds like and whether music is playing.
            </p>
          </Reveal>
        </div>
      </div>
    </section>

    {/* ── 08 Made by hand ────────────────────────────────── */}
    <section className="cs-sec">
      <div className="cs-wrap">
        <SectionHead index="07" label="Made by hand" title="Wood, paper, friction." />
        <Reveal>
          <Figure src={`${M}/dxf.webp`} alt="Cutting file for four sheets of 3 mm basswood" ratio={1920 / 360} contain caption="Cutting file: four A4 sheets of 3 mm basswood." />
        </Reveal>
        <Reveal>
          <Row className="cs-gap-top">
            <Figure src={`${M}/flatlay.webp`} alt="The laser-cut basswood sheets laid flat beside the laptop and a sheet of tracing paper" ratio={4 / 3} caption={<><b>Parts.</b> Cut basswood sheets and the tracing paper for the shade.</>} />
            <Figure src={`${M}/frame.webp`} alt="The assembled frame with the LED ring lit" ratio={1200 / 1601} caption={<><b>Frame.</b> Friction-fit, no glue, the ring lit on the top disc.</>} />
          </Row>
        </Reveal>
        <div className="cs-split" style={{ marginTop: 'clamp(48px, 6vw, 80px)' }}>
          <div />
          <Reveal>
            <p className="cs-body">
              Three discs of 150 mm diameter are held by six slotted uprights, so the frame assembles by friction and
              comes apart again without tools. The lower discs carry the Feather board and wiring; the top disc carries
              a ring of 32 WS2812B LEDs, 90 mm inside and 103 mm outside. A single layer of tracing paper is enough to
              hide the individual LEDs while keeping the moving band of light legible.
            </p>
          </Reveal>
        </div>
      </div>
    </section>

    {/* ── 09 System ──────────────────────────────────────── */}
    <section className="cs-sec" style={{ background: 'var(--paper-2)' }}>
      <div className="cs-wrap">
        <SectionHead index="08" label="System" title="Three layers, two speeds." />
        <Reveal>
          <div className="cs-sys" role="figure" aria-label="System architecture: sense, reflex, body, light, with the agent above the reflex layer and the desktop ring beside it">
            <div className="cs-node cs-node--mind">
              <span className="cs-label">Mind</span>
              <h5>LLM agent</h5>
              <p>DeepSeek, event-driven, about 1.7 s a turn. Never in the real-time path.</p>
            </div>
            <div className="cs-v"><span><em>situation</em></span><span><em>look · gesture · words</em></span></div>
            <div className="cs-main">
              <div className="cs-node">
                <span className="cs-label">Sense · Mac</span>
                <h5>Sensor threads</h5>
                <p>Microphone at 20 Hz; system-audio bass and treble at 50 Hz; keyboard and trackpad idle time.</p>
              </div>
              <div className="cs-node">
                <span className="cs-label">Reflex · Python</span>
                <h5>Look engine, 25 Hz</h5>
                <p>Base look, then gesture, then reflex. The only writer to the serial port.</p>
              </div>
              <div className="cs-node">
                <span className="cs-label">Body · Firmware</span>
                <h5>Feather nRF52840</h5>
                <p>Renders 50 fps from a 14-number look frame. Falls back to an amber breath if frames stop.</p>
              </div>
              <div className="cs-node cs-node--light">
                <span className="cs-label">Light</span>
                <h5>32 × WS2812B</h5>
                <p>One data line, 5 V, behind a single sheet of tracing paper.</p>
              </div>
            </div>
            <div className="cs-v cs-v--dash"><span><em>same look, on screen</em></span></div>
            <div className="cs-node cs-node--face">
              <span className="cs-label">Face · Desktop</span>
              <h5>Floating ring and panel</h5>
              <p>A pywebview window drawn with the firmware's maths, so screen and lamp show the same light.</p>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="cs-stats">
            <div><div className="cs-num">50<small style={{ fontSize: '0.4em' }}> fps</small></div><p>Firmware render rate.</p></div>
            <div><div className="cs-num">25<small style={{ fontSize: '0.4em' }}> Hz</small></div><p>Look frames over USB serial, about 58 bytes each.</p></div>
            <div><div className="cs-num">1.5<small style={{ fontSize: '0.4em' }}> s</small></div><p>Without frames, the lamp falls back to a slow amber breath and stays a lamp.</p></div>
            <div><div className="cs-num">5,200</div><p>Lines of Python on the Mac.</p></div>
            <div><div className="cs-num">1,000</div><p>Lines of firmware.</p></div>
            <div><div className="cs-num">119</div><p>Unit tests, runnable against a simulated board.</p></div>
          </div>
        </Reveal>
      </div>
    </section>

    {/* ── 10 Reflection ──────────────────────────────────── */}
    <section className="cs-sec">
      <div className="cs-wrap">
        <SectionHead index="09" label="Reflection" title="What four people noticed." />
        <div className="cs-split cs-split--even">
          <Reveal>
            <div className="cs-label" style={{ marginBottom: 16 }}>Worked</div>
            <ul className="cs-list">
              <li>Fun to be around, and atmospheric at night.</li>
              <li>Pairing an agent with a lamp read as a fresh idea.</li>
              <li>Light following music was the behaviour people returned to most.</li>
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <div className="cs-label" style={{ marginBottom: 16 }}>Fell short, and next</div>
            <ul className="cs-list">
              <li>The light trails music by about 100 ms. Predict beats rather than react to them.</li>
              <li>The agent rarely speaks first. Give it more occasions, and more confidence, to begin.</li>
              <li>Moods were sometimes too subtle. Widen the contrast between gestures.</li>
              <li>The lamp only senses through the laptop. A sensor outside the shade would let it stand alone.</li>
            </ul>
          </Reveal>
        </div>
        <Reveal>
          <div className="cs-ethics">
            <div>
              <h4>Privacy</h4>
              <p>Audio is reduced to loudness and band envelopes and never recorded; the keyboard is read only as time since the last input. The cloud model still receives a summary of the situation, including the song playing, which describes a routine.</p>
            </div>
            <div>
              <h4>Attachment</h4>
              <p>Its feelings are four numbers and a prompt. Wisp has no voice or face, speaks rarely and does not chase engagement. Making it more proactive would sharpen that question, not settle it.</p>
            </div>
            <div>
              <h4>Accessibility</h4>
              <p>Amber and blue are doubled by brightness and speed, but the music mode flashes. A deployed version needs flash limits and a reduced-motion setting.</p>
            </div>
            <div>
              <h4>Sustainability</h4>
              <p>Basswood and paper held by friction can be repaired, recycled or re-shaded. Every agent turn, though, spends energy in a data centre on something decorative.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    {/* ── Close ──────────────────────────────────────────── */}
    <section className="cs-close">
      <div className="cs-wrap">
        <Reveal>
          <span className="cs-orb" style={{ display: 'block' }} />
          <p className="cs-lead">Wisp began as an interactive lamp and ended as a body for an agent. The decisive changes were subtractions.</p>
          <p className="cs-credits">
            Wang Ruipeng · ID5402 Cybernetic Systems, Department of Design, NUS<br />
            Advised by Irmandy Wicaksono · Thanks to the four friends who tried it
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
  </main>
);

export default WispCaseStudy;
