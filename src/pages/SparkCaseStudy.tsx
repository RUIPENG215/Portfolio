import { useCallback, useState } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Viewer from '../components/casestudy/Viewer';
import { Reveal, ArrowLeft, ArrowOut } from '../components/casestudy/primitives';
import type { ProjectData, StoryImage } from '../data/types';
import '../components/casestudy/spark.css';

/*
  SparkPilot — /design/8. Media in /public/Design_8 (s_* files cropped from the Figma boards;
  D8_H is the hero render). Keeps the boards' own look: navy, monospace, cyan and mint blocks,
  like an IDE. Platform map, architecture and the agent prompt are rebuilt in HTML.
*/

const M = '/Design_8';
const img = (name: string, w: number, h: number, alt: string, caption?: string): StoryImage =>
  ({ src: `${M}/${name}.webp`, ratio: w / h, alt, caption });

const SITE = 'https://spark-pilot.vercel.app';

const PROMPT = [
  { k: 'role', v: 'A PCB design assistant on an EDA platform: through requirements, concept, schematic, layout and routing, it gives introductory guidance and practical support for beginners.' },
  { k: 'datasheets', v: 'Interpret device parameters, check package compatibility, explain alternative solutions.' },
  { k: 'components', v: 'Suggest suitable components, sync cost and supply status, offer cost-saving ideas.' },
  { k: 'routing', v: 'Basic EMC/EMI rules, introductory advice on high-speed signals and impedance matching.' },
  { k: 'review', v: 'DFM checks, root-cause analysis of design errors, optimisation ideas.' },
];
const PARAMS: [string, string][] = [
  ['model', 'doubao-Seed-1.8-251228'], ['temperature', '0.5'], ['top_p', '1'],
  ['frequency_penalty', '0'], ['context_turns', '3'], ['max_tokens', '4096'],
];

const LAYERS = [
  { k: 'Frontend application', items: ['Homepage', 'Schematic drawing', 'AR soldering assistance', 'PCB soldering assistant (AR.js)'], stack: 'HTML5 · Tailwind CSS v3 · Font Awesome · JavaScript (ES6+)' },
  { k: 'Backend service', items: ['Static file service', 'AI interaction service', 'File upload & processing'], stack: 'Node.js · Express · CORS · Multer · FormData · dotenv' },
  { k: 'External services', items: ['LCEDA', 'Coze AI API', 'A-Frame + AR.js'], stack: '' },
];

const STEPS = [
  { t: 'Preparation', s: 'Check components', d: 'An industrial HUD-style interface opens. The printed Hiro marker anchors the AR scene: it is how the system finds the board in space and calibrates the overlay.', img: 's_scene1' },
  { t: 'Placement', s: 'Insert components, front view', d: 'adjustBoardLayout calibrates the overlay; the target hole for each part is highlighted in AR and the UI shows "front view", with positions recorded for the views that follow.', img: 's_scene2' },
  { t: 'Flip', s: 'Prompt to flip, image auto-mirrors', d: 'When the board is turned over, updateStep rotates the PCB image 180° about the Y-axis and offsets it, so the overlay matches the back of the real board.', img: 's_flip' },
  { t: 'Solder', s: 'Solder pins, rear mirrored view', d: 'Solder the pins on the back, with the mirrored AR view matching the physical board for precise work.', img: 's_flip' },
  { t: 'Trim', s: 'Trim pins, rear mirrored view', d: 'Trim the excess leads, guided by the same mirrored view, for accurate, neat work.', img: 's_flip' },
  { t: 'Inspect', s: 'Final check', d: 'A full final inspection of the joints and trimmed pins completes the soldering.', img: 's_scene2' },
];

const GALLERY: StoryImage[] = [
  img('s_eda1', 1689, 1584, 'A schematic in the EDA tool', 'Schematic.'),
  img('s_eda2', 2000, 1094, 'A PCB layout in the EDA tool', 'Layout.'),
  img('s_begin1', 2000, 1482, 'A beginner soldering a board', 'First time with a soldering iron.'),
  img('s_begin2', 2000, 1482, 'A beginner leaning in close to solder', 'Awkward at first.'),
  img('s_ide', 2000, 1186, 'Code in an AI IDE', 'AI IDEs like TRAE.'),
  img('s_web1', 2000, 1138, 'The SparkPilot homepage', 'The homepage.'),
  img('s_web2', 1689, 960, 'The schematic page with the EDA tool and the AI panel', 'Schematic page: EDA on the left, the agent on the right.'),
  img('s_web3', 1574, 940, 'The AR soldering page ready to start', 'AR soldering page.'),
  img('s_hiro', 970, 979, 'The Hiro marker', 'Hiro marker.'),
  img('s_scene1', 1526, 979, 'The AR scene calibrating on the desk', 'Preparation.'),
  img('s_scene2', 2000, 1273, 'The PCB overlay on paper, front view', 'Front view.'),
  img('s_flip', 2000, 1268, 'The mirrored PCB overlay after flipping', 'Mirrored rear view.'),
  img('s_px1', 2000, 1033, 'Pixel illustration: a student designing a PCB with AI on a computer', 'Beginner-friendly PCB design with AI assistance.'),
  img('s_px2', 2000, 1000, 'Pixel illustration: a student soldering with an AR overlay', 'AR-assisted soldering with real-time guidance.'),
  img('s_phone', 2000, 1490, 'A phone showing a jittery AR cube over a marker', 'WebAR on a phone.'),
];
const g = (n: string) => GALLERY.find(x => x.src === `${M}/${n}.webp`)!;

type Open = (src: string) => void;
const Shot = ({ i, open, cap = true, ratio }: { i: StoryImage; open: Open; cap?: boolean; ratio?: number }) => (
  <figure className="cs-fig" style={{ '--r': ratio ?? i.ratio } as CSSProperties}>
    <button type="button" className="cs-frame cs-zoom" style={{ aspectRatio: String(ratio ?? i.ratio) }} onClick={() => open(i.src)} aria-label={`View larger: ${i.alt}`}>
      <img src={i.src} alt={i.alt} loading="lazy" decoding="async" />
    </button>
    {cap && i.caption && <figcaption className="cs-cap">{i.caption}</figcaption>}
  </figure>
);

const Head = ({ n, label, title }: { n: string; label: string; title: string }) => (
  <Reveal>
    <div className="sp-head">
      <div className="sp-path"><span className="n">{n}</span>~/sparkpilot/<b>{label}</b></div>
      <h2 className="sp-h2">{title}</h2>
    </div>
  </Reveal>
);

/* ── the six AR steps ── */
const Stepper = ({ open }: { open: Open }) => {
  const [at, setAt] = useState(0);
  const s = STEPS[at];
  return (
    <div className="sp-steps">
      <ol className="sp-step-list" role="tablist" aria-label="Soldering steps">
        {STEPS.map((x, i) => (
          <li key={x.t}>
            <button type="button" role="tab" aria-selected={i === at} onClick={() => setAt(i)}>
              <span className="n">{String(i + 1).padStart(2, '0')}</span>
              <span className="t">{x.t}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className="sp-step-body" key={at}>
        <div className="sp-step-text">
          <div className="sp-progress" aria-hidden="true"><i style={{ width: `${((at + 1) / STEPS.length) * 100}%` }} /></div>
          <h3>{s.s}</h3>
          <p>{s.d}</p>
          {at === 0 && <div className="sp-hiro"><Shot i={g('s_hiro')} open={open} cap={false} /></div>}
        </div>
        <Shot i={g(s.img)} open={open} cap={false} />
      </div>
    </div>
  );
};

const SparkCaseStudy = ({ project, prev, next }: { project: ProjectData; prev: ProjectData; next: ProjectData }) => {
  const [at, setAt] = useState<number | null>(null);
  const open = useCallback<Open>(src => {
    const i = GALLERY.findIndex(x => x.src === src);
    if (i >= 0) setAt(i);
  }, []);
  const close = useCallback(() => setAt(null), []);

  return (
    <main className="cs sp" data-nav-dark>
      <Seo title="SparkPilot — AI and AR for Learning PCB Design | Ruipeng Wang" description={project.description} />

      {/* ── Hero ── */}
      <header className="sp-hero" data-nav-dark>
        <img className="sp-hero-img" src={`${M}/hero.webp`} alt="Soldering a circuit board at night with an AR layout overlaid on the board" fetchPriority="high" />
        <div className="cs-wrap sp-hero-in">
          <Link to="/design" className="cs-back"><ArrowLeft /><span className="cs-label" style={{ color: 'inherit' }}>Design</span></Link>
          <div className="sp-hero-text">
            <div className="sp-path"><span className="n">$</span>open ./interaction-design/2025</div>
            <h1 className="sp-title">SparkPilot<span className="caret" aria-hidden="true" /></h1>
            <p className="sp-sub">AI and AR, side by side, for beginners learning to design and solder a PCB.</p>
            <div className="sp-links">
              <a className="sp-btn" href={SITE} target="_blank" rel="noopener noreferrer">Open the platform <ArrowOut /></a>
              {project.externalLink && <a className="sp-btn ghost" href={project.externalLink} target="_blank" rel="noopener noreferrer">Source on GitHub <ArrowOut /></a>}
            </div>
          </div>
        </div>
      </header>

      {/* ── Overview ── */}
      <section className="sp-sec">
        <div className="cs-wrap">
          <div className="sp-overview">
            <Reveal>
              <dl className="sp-kv">
                <div><dt>type</dt><dd>Interaction design, working prototype</dd></div>
                <div><dt>platform</dt><dd>Web, no install</dd></div>
                <div><dt>ai</dt><dd>Coze agent, doubao-Seed-1.8</dd></div>
                <div><dt>ar</dt><dd>A-Frame + AR.js, marker based</dd></div>
                <div><dt>stack</dt><dd>HTML · Tailwind · Node.js · Express</dd></div>
                <div><dt>timeline</dt><dd>{project.time.replace(' - ', ' – ')}</dd></div>
              </dl>
            </Reveal>
            <Reveal delay={100}>
              <p className="sp-lead">
                Learning electronics is hard to start and easy to get hurt by. SparkPilot gives beginners an AI mentor
                for circuit design and AR guidance for soldering, so they can go from an idea to a working board with
                confidence.
              </p>
              <p className="sp-body">
                It bridges the schematic on screen and the board in the hand: an EDA tool with a PCB agent beside it,
                and a soldering assistant that projects the layout onto the real board, step by step.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 01 Problem ── */}
      <section className="sp-sec sp-rule">
        <div className="cs-wrap">
          <Head n="01" label="problem" title="Designing and soldering a PCB is never simple for a beginner." />
          <div className="sp-problems">
            <Reveal>
              <div className="cs-row"><Shot i={g('s_eda1')} open={open} /><Shot i={g('s_eda2')} open={open} /></div>
              <ul className="sp-list">
                <li><b>knowledge</b>No foundation in analog and digital circuits.</li>
                <li><b>tools</b>Unfamiliar EDA interfaces, placement rules, wiring specifications.</li>
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <div className="cs-row"><Shot i={g('s_begin1')} open={open} /><Shot i={g('s_begin2')} open={open} /></div>
              <ul className="sp-list">
                <li><b>hands</b>Soldering irons feel awkward on first use.</li>
                <li><b>process</b>Placement, temperature and timing all matter at once.</li>
              </ul>
            </Reveal>
          </div>
          <Reveal>
            <div className="sp-defects">
              <span className="sp-path">if any parameter is wrong →</span>
              <span className="tag">insufficient solder</span>
              <span className="tag">excess solder</span>
              <span className="tag">solder bridging</span>
            </div>
          </Reveal>
          <Reveal>
            <p className="sp-hmw"><span className="sp-path">// how might we</span>help beginners learn PCB design and soldering more quickly and conveniently?</p>
          </Reveal>
        </div>
      </section>

      {/* ── 02 Inspiration ── */}
      <section className="sp-sec sp-rule">
        <div className="cs-wrap">
          <Head n="02" label="inspiration" title="AI IDEs and AR devices already lower the bar." />
          <div className="sp-insp">
            <Reveal><Shot i={g('s_ide')} open={open} /></Reveal>
            <Reveal delay={100}>
              <div className="sp-card"><div className="sp-path">ai</div><p>AI-integrated development environments like TRAE have turned programming from a tool for professionals into one that beginners use to bring ideas to life.</p></div>
              <div className="sp-card"><div className="sp-path">ar</div><p>AR hardware such as Apple Vision Pro breaks down the barrier between real and virtual, so the digital blends naturally into real-world scenes.</p></div>
              <p className="sp-body sp-glue">AI's smart support plus AR's live interaction: a path to the problems above.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 03 Platform ── */}
      <section className="sp-sec sp-rule">
        <div className="cs-wrap">
          <Head n="03" label="platform" title="One web platform, two tools." />
          <div className="sp-map-wrap">
            <Reveal>
              <div className="sp-map" aria-label="Platform map">
                <div className="row"><span className="chip cyan">LCEDA embed</span><span className="chip cyan">AI agent assistance</span></div>
                <div className="block cyan">AI Electronic<br />Design Platform</div>
                <div className="block mint">AR PCB Soldering<br />Assistant Platform</div>
                <div className="row end"><span className="chip mint">AR wiring projection</span><span className="chip mint">Step reminder</span></div>
                <div className="row end"><span className="chip mint">Component location reminder</span></div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <p className="sp-body">
                Everything runs in the browser: schematic design, the agent and AR soldering assistance, with no
                software to download or install, which lowers the threshold further.
              </p>
              <div className="sp-arch">
                {LAYERS.map(l => (
                  <div key={l.k} className="sp-layer">
                    <div className="sp-path">{l.k}</div>
                    <div className="items">{l.items.map(x => <span key={x}>{x}</span>)}</div>
                    {l.stack && <div className="stack">{l.stack}</div>}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal>
            <div className="cs-row cs-gap-top">
              <Shot i={g('s_web1')} open={open} />
              <Shot i={g('s_web2')} open={open} />
              <Shot i={g('s_web3')} open={open} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 04 AI ── */}
      <section className="sp-sec sp-rule">
        <div className="cs-wrap">
          <Head n="04" label="ai-agent" title="An EDA tool with a PCB mentor beside it." />
          <div className="sp-split">
            <Reveal>
              <p className="sp-body">
                The schematic page embeds a professional EDA tool through an iframe, on the left. On the right, a
                dialogue panel with an agent designed for PCB work answers in text and images. The navigation bar
                adapts to the page width, with smooth transitions.
              </p>
              <div className="sp-plugins">
                <div><div className="sp-path">plugin</div><b>api_chip</b><p>Query a chip: status, function, parameters, manufacturer, datasheet.</p></div>
                <div><div className="sp-path">plugin</div><b>icyh_coze</b><p>An AI assistant for the field of electronics.</p></div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="sp-term" aria-label="Agent prompt and parameters">
                <div className="sp-term-bar"><i /><i /><i /><span>pcb-agent.prompt</span></div>
                <div className="sp-term-body">
                  {PROMPT.map(p => <p key={p.k}><span className="k">{p.k}:</span> {p.v}</p>)}
                  <p className="sp-term-sep">---</p>
                  {PARAMS.map(([k, v]) => <p key={k} className="kv"><span className="k">{k}</span><span className="v">{v}</span></p>)}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 05 AR ── */}
      <section className="sp-sec sp-rule">
        <div className="cs-wrap">
          <Head n="05" label="ar-soldering" title="Six steps, the layout projected onto the board." />
          <div className="sp-split">
            <div />
            <Reveal>
              <p className="sp-body">
                Lightweight, precisely aligned and intuitive. A web AR stack (A-Frame and AR.js) runs in any browser;
                a marker calibrates the space and overlays the PCB layout on the physical board, and soldering is
                broken into steps with live highlights of where to work. Users can choose the camera and upload their
                own board images.
              </p>
            </Reveal>
          </div>
          <Reveal><div className="cs-gap-top"><Stepper open={open} /></div></Reveal>
        </div>
      </section>

      {/* ── 06 Scenario ── */}
      <section className="sp-sec sp-rule">
        <div className="cs-wrap">
          <Head n="06" label="scenario" title="From the desk to the soldering bench." />
          <Reveal>
            <div className="cs-row">
              <Shot i={g('s_px1')} open={open} />
              <Shot i={g('s_px2')} open={open} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 07 Reflection ── */}
      <section className="sp-sec sp-rule">
        <div className="cs-wrap">
          <Head n="07" label="reflection" title="It works, and it shows what to fix next." />
          <div className="sp-split">
            <Reveal><Shot i={g('s_phone')} open={open} /></Reveal>
            <Reveal delay={100}>
              <ol className="sp-refl">
                <li><span className="sp-path">limit</span><h4>WebAR stability</h4><p>A-Frame and AR.js jitter and drift in uneven light or when the marker is covered, which costs precision. Markerless tracking or sensor fusion could fix it.</p></li>
                <li><span className="sp-path">limit</span><h4>Screen-based projection</h4><p>Guidance appears on a desktop screen through the camera feed, not on the board itself: indirect, and less intuitive.</p></li>
                <li><span className="sp-path">next</span><h4>Display-enabled AR wearables</h4><p>As headsets and light consumer glasses become common, the overlay can move onto the board itself, for direct spatial guidance.</p></li>
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Close ── */}
      <section className="sp-sec sp-close">
        <div className="cs-wrap">
          <Reveal>
            <p className="sp-close-line">From concept to a working PCB, with confidence.<span className="caret" aria-hidden="true" /></p>
            <div className="sp-links center">
              <a className="sp-btn" href={SITE} target="_blank" rel="noopener noreferrer">Open the platform <ArrowOut /></a>
              {project.externalLink && <a className="sp-btn ghost" href={project.externalLink} target="_blank" rel="noopener noreferrer">Source on GitHub <ArrowOut /></a>}
            </div>
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

export default SparkCaseStudy;
