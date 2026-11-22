import type { ReactNode } from 'react';
import type { DrawingId } from '../../data/engineeringSheets';

/*
  Line drawings for the engineering sheets. Schematic only (principle, load case, block
  diagram) — no invented results. Classes:
    .ln   object line, plotted on when the sheet enters view (pathLength set in Sheet)
    .lt   thin line (hatching, dimensions, leaders), also plotted
    .lc   centre / phantom line (dashed), fades in
    .tx   annotation text, fades in
    .ac   accent (load, signal)
*/

const Arrow = ({ x1, y1, x2, y2, cls = 'lt' }: { x1: number; y1: number; x2: number; y2: number; cls?: string }) => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const h = 7;
  const p1 = `${x2 - h * Math.cos(a - 0.4)},${y2 - h * Math.sin(a - 0.4)}`;
  const p2 = `${x2 - h * Math.cos(a + 0.4)},${y2 - h * Math.sin(a + 0.4)}`;
  return (
    <g>
      <line className={cls} x1={x1} y1={y1} x2={x2} y2={y2} />
      <path className={`${cls} head`} d={`M${p1} L${x2},${y2} L${p2}`} />
    </g>
  );
};

const Hatch = ({ x, y, w, h, step = 9, dir = 1 }: { x: number; y: number; w: number; h: number; step?: number; dir?: 1 | -1 }) => {
  const lines: ReactNode[] = [];
  for (let i = -h; i < w; i += step) {
    const x1 = x + i, x2 = x + i + h;
    const cx1 = Math.max(x, x1), cx2 = Math.min(x + w, x2);
    if (cx2 <= cx1) continue;
    const y1 = dir === 1 ? y + h - (cx1 - x1) : y + (cx1 - x1);
    const y2 = dir === 1 ? y + h - (cx2 - x1) : y + (cx2 - x1);
    lines.push(<line key={i} className="lt" x1={cx1} y1={y1} x2={cx2} y2={y2} />);
  }
  return <g>{lines}</g>;
};

/* ENG-01 — cantilever seat support, load case + optimised material layout */
const Bracket = () => (
  <>
    <line className="ln" x1="70" y1="36" x2="70" y2="262" />
    <Hatch x={52} y={36} w={18} h={226} step={10} />
    {/* adjacent part: seat pan (phantom) */}
    <rect className="lc" x="70" y="54" width="372" height="10" />
    {/* support outline */}
    <path className="ln" d="M70 70 L414 70 L414 94 Q250 120 70 236 Z" />
    {/* material removed by optimisation */}
    <ellipse className="ln" cx="132" cy="140" rx="40" ry="38" />
    <ellipse className="ln" cx="232" cy="113" rx="40" ry="22" />
    <ellipse className="ln" cx="321" cy="93" rx="30" ry="11" />
    {/* distributed passenger load */}
    {[130, 210, 290, 370, 430].map((x) => <Arrow key={x} x1={x} y1={16} x2={x} y2={50} cls="lt ac" />)}
    <line className="lt ac" x1="130" y1="16" x2="430" y2="16" />
    <text className="tx ac" x="440" y="22">q</text>
    {/* span dimension */}
    <line className="lt" x1="414" y1="98" x2="414" y2="284" />
    <Arrow x1={242} y1={278} x2={72} y2={278} />
    <Arrow x1={242} y1={278} x2={412} y2={278} />
    <text className="tx" x="236" y="272">L</text>
    <text className="tx sm" x="80" y="256">FIXED</text>
    <text className="tx sm" x="300" y="210">ρ ∈ [0, 1]</text>
  </>
);

/* ENG-02 — wheeled inverted pendulum, free-body sketch */
const Pendulum = () => {
  const cx = 250, cy = 214;
  return (
    <>
      <line className="ln" x1="70" y1="250" x2="430" y2="250" />
      <Hatch x={70} y={250} w={360} h={14} step={12} dir={-1} />
      <circle className="ln" cx={cx} cy={cy} r="36" />
      <circle className="ln" cx={cx} cy={cy} r="4" />
      <line className="lc" x1={cx} y1="34" x2={cx} y2="262" />
      <line className="lc" x1={cx - 50} y1={cy} x2={cx + 50} y2={cy} />
      <g transform={`rotate(13 ${cx} ${cy})`}>
        <rect className="ln" x={cx - 17} y="58" width="34" height="140" rx="3" />
        <circle className="ln" cx={cx} cy="112" r="9" />
        <path className="ln" d={`M${cx} 103 L${cx} 112 L${cx + 9} 112`} />
        <line className="lc" x1={cx} y1="40" x2={cx} y2="58" />
      </g>
      {/* tilt angle */}
      <path className="lt ac" d={`M${cx} 128 A86 86 0 0 1 ${cx + 86 * Math.sin(0.227)} ${cy - 86 * Math.cos(0.227)}`} />
      <text className="tx ac" x={cx + 8} y="122">θ</text>
      {/* wheel torque */}
      <path className="lt" d={`M${cx - 48} ${cy + 10} A50 50 0 0 0 ${cx - 20} ${cy + 46}`} />
      <path className="lt head" d={`M${cx - 26} ${cy + 49} L${cx - 20} ${cy + 46} L${cx - 22} ${cy + 39}`} />
      <text className="tx" x={cx - 76} y={cy + 30}>τ</text>
      {/* travel */}
      <Arrow x1={cx + 60} y1={234} x2={cx + 130} y2={234} />
      <text className="tx" x={cx + 134} y="238">x</text>
      <text className="tx sm" x={cx + 34} y="70">m, l</text>
      <text className="tx sm" x="80" y="40">ẋ = Ax + Bu</text>
    </>
  );
};

/* ENG-03 — flexible sensing board + ward airflow */
const Fpc = () => (
  <>
    {/* finger straps + main body, one continuous flex outline */}
    <path className="ln" d="M150 210 L150 104 Q150 92 162 92 L168 92 L168 42 Q168 34 176 34 L196 34 Q204 34 204 42 L204 92 L214 92 L214 42 Q214 34 222 34 L242 34 Q250 34 250 42 L250 92 L318 92 Q330 92 330 104 L330 210 Q330 222 318 222 L162 222 Q150 222 150 210 Z" />
    {/* pads on the straps */}
    <rect className="ln" x="174" y="46" width="24" height="20" rx="2" />
    <rect className="ln" x="220" y="46" width="24" height="20" rx="2" />
    {/* MCU */}
    <rect className="ln" x="218" y="134" width="44" height="44" rx="2" />
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={i}>
        <line className="lt" x1={224 + i * 8} y1="128" x2={224 + i * 8} y2="134" />
        <line className="lt" x1={224 + i * 8} y1="178" x2={224 + i * 8} y2="184" />
      </g>
    ))}
    {/* sensors */}
    <rect className="ln" x="168" y="120" width="26" height="18" rx="2" />
    <rect className="ln" x="168" y="170" width="22" height="16" rx="2" />
    <rect className="ln" x="286" y="112" width="20" height="16" rx="2" />
    {/* traces */}
    <path className="lt" d="M186 66 L186 104 L200 118 L200 150 L218 150" />
    <path className="lt" d="M232 66 L232 112 L240 120 L240 128" />
    <path className="lt" d="M194 129 L210 129 L210 140 L218 140" />
    <path className="lt" d="M190 178 L206 178 L206 168 L218 168" />
    <path className="lt" d="M286 120 L276 120 L276 146 L262 146" />
    {/* leaders */}
    <line className="lt" x1="296" y1="112" x2="350" y2="58" />
    <text className="tx sm" x="354" y="56">MAX30102 · SpO₂</text>
    <line className="lt" x1="168" y1="129" x2="96" y2="129" />
    <text className="tx sm" x="58" y="124">GSR</text>
    <line className="lt" x1="168" y1="178" x2="96" y2="196" />
    <text className="tx sm" x="58" y="200">RH</text>
    {/* airflow */}
    {[150, 178, 206].map((y) => (
      <g key={y}>
        <path className="lt ac" d={`M352 ${y} C380 ${y - 14} 404 ${y + 14} 432 ${y} S470 ${y - 8} 474 ${y - 6}`} />
        <path className="lt ac head" d={`M466 ${y - 10} L474 ${y - 6} L467 ${y - 1}`} />
      </g>
    ))}
    <text className="tx sm ac" x="360" y="240">AIRFLOW · FLUENT</text>
  </>
);

/* ENG-04 — Wisp system block diagram */
const Wisp = () => {
  const dots = Array.from({ length: 18 }, (_, i) => {
    const a = (i / 18) * Math.PI * 2;
    return <circle key={i} className="ln" cx={430 + 40 * Math.cos(a)} cy={150 + 40 * Math.sin(a)} r="3.2" />;
  });
  const blocks = ['PRESENCE', 'MUSIC · BLACKHOLE', 'MIC LEVEL', 'AGENT · LLM'];
  return (
    <>
      <rect className="ln" x="36" y="54" width="180" height="192" rx="6" />
      <text className="tx sm" x="48" y="74">macOS APP</text>
      {blocks.map((b, i) => (
        <g key={b}>
          <rect className="ln" x="50" y={88 + i * 38} width="150" height="28" rx="3" />
          <text className="tx sm" x="60" y={106 + i * 38}>{b}</text>
        </g>
      ))}
      <Arrow x1={218} y1={150} x2={294} y2={150} cls="lt ac" />
      <text className="tx sm ac" x="224" y="140">USB SERIAL</text>
      <rect className="ln" x="298" y="118" width="64" height="64" rx="3" />
      <text className="tx sm" x="306" y="146">nRF</text>
      <text className="tx sm" x="306" y="162">52840</text>
      <Arrow x1={364} y1={150} x2={384} y2={150} />
      <circle className="lc" cx="430" cy="150" r="40" />
      {dots}
      <text className="tx sm" x="400" y="216">LED RING</text>
    </>
  );
};

/* ENG-05 — character recognition pipeline (generic glyphs) */
const Ocr = () => {
  const glyphs = (dx: number) => (
    <>
      <path className="ln thick" d={`M${62 + dx} 196 L${82 + dx} 108 L${102 + dx} 196 M${70 + dx} 162 L${94 + dx} 162`} />
      <path className="ln thick" d={`M${122 + dx} 118 L${132 + dx} 108 L${132 + dx} 196`} />
      <path className="ln thick" d={`M${148 + dx} 110 L${176 + dx} 110 L${148 + dx} 196 L${176 + dx} 196`} />
    </>
  );
  return (
    <>
      <rect className="ln" x="40" y="80" width="150" height="140" />
      {glyphs(0)}
      <Arrow x1={196} y1={150} x2={218} y2={150} />
      <rect className="ln" x="224" y="80" width="150" height="140" />
      {glyphs(184)}
      <rect className="lc ac" x="240" y="100" width="50" height="104" />
      <rect className="lc ac" x="300" y="100" width="24" height="104" />
      <rect className="lc ac" x="326" y="100" width="40" height="104" />
      <Arrow x1={380} y1={150} x2={402} y2={150} />
      {['A', '1', 'Z'].map((g, i) => (
        <g key={g}>
          <rect className="ln" x="412" y={92 + i * 40} width="44" height="30" rx="2" />
          <text className="tx big" x="426" y={114 + i * 40}>{g}</text>
        </g>
      ))}
      <text className="tx sm" x="40" y="246">01 BINARISE</text>
      <text className="tx sm" x="224" y="246">02 SEGMENT</text>
      <text className="tx sm" x="400" y="246">03 CLASSIFY</text>
    </>
  );
};

const map: Record<DrawingId, () => ReactNode> = {
  bracket: Bracket, pendulum: Pendulum, fpc: Fpc, wisp: Wisp, ocr: Ocr,
};

export const Drawing = ({ id }: { id: DrawingId }) => {
  const D = map[id];
  return (
    <svg className="eg-svg" viewBox="0 0 500 300" aria-hidden="true">
      <D />
    </svg>
  );
};
