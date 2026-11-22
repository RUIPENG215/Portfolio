import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import Seo from '../Seo';
import Viewer from '../casestudy/Viewer';
import type { StoryImage } from '../../data/types';
import type { Lang } from '../../data/engineeringSheets';
import '../casestudy/casestudy.css';
import './engineering.css';
import './seat.css';

/*
  ENG-01 — Metro seat support (bachelor thesis, XJTU–PoliMi, 2026).
  Every number on this page comes from the thesis. Images are the thesis figures
  (public/Engineering_1), shown no larger than their native width.
  Role split, as stated by the author: optimisation design and simulation are his;
  fibre-path planning and the physical tests were done by the research group; he took
  part in printing.
*/

const M = '/Engineering_1';
type T = { en: string; zh: string };
const t = (v: T, l: Lang) => v[l];

const img = (name: string, w: number, h: number, en: string, zh: string) =>
  ({ name, src: `${M}/${name}.webp`, w, h, alt: { en, zh } });

const IM = {
  orig_model: img('orig_model', 877, 535, 'Original aluminium seat support', '原铝合金座椅支架'),
  orig_install: img('orig_install', 575, 531, 'Installation drawing of the original support', '原支架安装平面示意'),
  orig_stress: img('orig_stress', 944, 579, 'Original support, von Mises stress under 2250 N', '原支架 2250 N 下 von Mises 应力'),
  orig_disp: img('orig_disp', 944, 579, 'Original support, displacement', '原支架位移云图'),
  td3_density: img('td3_density', 629, 385, '3D topology optimisation, material volume factor', '三维拓扑优化：材料体积因子'),
  td3_solid: img('td3_solid', 629, 385, '3D topology optimisation, thresholded solid', '三维拓扑优化：阈值重构模型'),
  td2_domain_a: img('td2_domain_a', 654, 388, '2D section extracted from the original support', '提取原支架二维截面'),
  td2_domain_b: img('td2_domain_b', 670, 390, '2D design domain', '二维拓扑优化设计域'),
  td2_p1: img('td2_p1', 670, 388, 'Projection slope β = 2', '投影斜率 β = 2'),
  td2_p2: img('td2_p2', 659, 388, 'Projection slope β = 8', '投影斜率 β = 8'),
  td2_p3: img('td2_p3', 694, 407, 'Mean volume factor 0.6', '平均材料体积因子 0.6'),
  td2_p4: img('td2_p4', 661, 393, 'Mean volume factor 0.2', '平均材料体积因子 0.2'),
  td2_p5: img('td2_p5', 621, 367, 'Final: volume factor 0.35, filter lower bound 0.42', '最终：体积因子 0.35，过滤器下界 0.42'),
  td2_final: img('td2_final', 618, 365, 'Final layout, thresholded', '最终构型（阈值重构）'),
  fit_sketch: img('fit_sketch', 663, 394, 'Spline fitting over the density map in SolidWorks', '在 SolidWorks 中用样条曲线拟合密度云图'),
  fit_model: img('fit_model', 845, 501, 'First 3D model from the spline fit', '样条拟合得到的初步三维模型'),
  v1_model: img('v1_model', 944, 579, 'Straight-member truss version', '直线化后的桁架式支架'),
  v1_field: img('v1_field', 944, 579, 'Curvilinear coordinates defining fibre direction', '曲线坐标系求解的纤维方向场'),
  v1_s11: img('v1_s11', 629, 385, 'Truss version, S11 stress', '桁架版本 S11 应力'),
  shell_regions: img('shell_regions', 766, 472, 'Shell model split into 29 regions', '壳体模型划分为 29 个区域'),
  sens: img('sens', 944, 579, 'High-sensitivity load-bearing regions', '高灵敏度核心承力区域'),
  final_front: img('final_front', 684, 399, 'Final support, front view', '最终支架 主视图'),
  final_side: img('final_side', 669, 394, 'Final support, side view', '最终支架 左视图'),
  final_top: img('final_top', 674, 391, 'Final support, top view', '最终支架 俯视图'),
  final_iso: img('final_iso', 682, 397, 'Final support, isometric', '最终支架 轴测图'),
  final_s11: img('final_s11', 629, 385, 'Final support, S11 stress', '最终支架 S11 应力'),
  final_disp: img('final_disp', 944, 579, 'Final support, displacement', '最终支架位移云图'),
  asm_load: img('asm_load', 944, 579, 'Six-seat assembly, 9000 N on the seat pan', '6 人座总装：座面施加 9000 N'),
  asm_s11: img('asm_s11', 629, 385, 'Six-seat assembly, S11 stress', '总装模型 S11 应力'),
  asm_disp: img('asm_disp', 944, 579, 'Six-seat assembly, displacement', '总装模型位移云图'),
  fat_s11: img('fat_s11', 629, 385, 'Fatigue load case, S11 stress', '疲劳工况 S11 应力'),
  print_path: img('print_path', 1001, 381, 'Fibre print path preview and G-code', '打印路径预览与 G 代码'),
  print_a: img('print_a', 494, 659, 'Printed continuous-fibre support', '连续纤维打印的支架'),
  print_b: img('print_b', 279, 931, 'Printed support, side', '打印支架侧面'),
  ct: img('ct', 930, 525, 'CT reconstruction of internal voids', 'CT 内部孔隙三维重构'),
  assembled: img('assembled', 351, 266, 'Assembled support with metal inserts', '装配后的支架实物'),
  sec_side: img('sec_side', 427, 402, 'Assembly, side view', '座椅支架装配侧视图'),
  sec_iso: img('sec_iso', 660, 394, 'Assembly with seat cover hidden', '隐藏座椅覆盖件的装配体'),
  space: img('space', 845, 672, 'Space released under the seat', '座椅下方空间释放效果'),
  scenes: img('scenes', 1355, 934, 'Luggage scenarios', '大件行李使用场景'),
};
type Key = keyof typeof IM;

const ORDER = Object.keys(IM) as Key[];

/* ---------- small building blocks ---------- */

const useInView = <E extends Element>() => {
  const ref = useRef<E>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, { rootMargin: '0px 0px -12% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView] as const;
};

const Reveal = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  const [ref, inView] = useInView<HTMLDivElement>();
  return <div ref={ref} className={`st-reveal ${inView ? 'is-in' : ''} ${className}`}>{children}</div>;
};

type Open = (k: Key) => void;

/** Thesis figure. Never wider than its own pixels; click to view larger. */
const Fig = ({ k, lang, open, cap, flex }: { k: Key; lang: Lang; open: Open; cap?: ReactNode; flex?: boolean }) => {
  const i = IM[k];
  const r = i.w / i.h;
  return (
    <figure className="st-fig" style={flex ? { flex: `${r} 1 0`, maxWidth: i.w } : { maxWidth: i.w }}>
      <button type="button" className="st-frame" style={{ aspectRatio: String(r) }} onClick={() => open(k)} aria-label={t(i.alt, lang)}>
        <img src={i.src} alt={t(i.alt, lang)} loading="lazy" decoding="async" />
      </button>
      <figcaption>{cap ?? t(i.alt, lang)}</figcaption>
    </figure>
  );
};

const Row = ({ children }: { children: ReactNode }) => <div className="st-row">{children}</div>;

const Section = ({ n, label, title, children, id }: { n: string; label: string; title: ReactNode; children: ReactNode; id?: string }) => (
  <section className="st-sec" id={id}>
    <Reveal className="st-sec-head">
      <div className="st-sec-label"><span>{n}</span><span>{label}</span></div>
      <h2>{title}</h2>
    </Reveal>
    {children}
  </section>
);

const P = ({ children }: { children: ReactNode }) => <p className="st-p">{children}</p>;

/* ---------- margin notes: the one figure each section turns on ---------- */

const NOTES: Record<string, { v: string; u?: string; l: T }> = {
  '01': { v: '24.3 / 215', u: 'MPa', l: { en: 'peak stress vs yield strength — a safety margin above 8×', zh: '最大应力 / 屈服强度，强度安全裕度超过 8 倍' } },
  '02': { v: '920 : 35', u: 'MPa', l: { en: 'tensile strength along the fibre vs in-plane shear strength', zh: '纤维方向拉伸强度与面内剪切强度之比' } },
  '03': { v: 'β 8 · V 0.35', l: { en: 'projection slope and mean volume factor of the final run', zh: '最终方案的投影斜率与平均材料体积因子' } },
  '04': { v: '6', u: 'mm', l: { en: 'uniform member thickness of the truss before differential sizing', zh: '差异化厚度设计前的统一杆件厚度' } },
  '05': { v: '53.1 → 25.7', u: 'MPa', l: { en: 'in-plane shear S12 before and after the fix; allowable 35 MPa', zh: '修正前后的面内剪应力 S12，许用值 35 MPa' } },
  '06': { v: '2.20', u: 'kg', l: { en: '44.02% lighter than the 3.93 kg aluminium support', zh: '较原铝合金支架（3.93 kg）减重 44.02%' } },
  '07': { v: '5.17', l: { en: 'lowest safety margin, 1 Hz × 10⁵ cycles (TB/T 3263)', zh: '疲劳工况最低安全裕度（1 Hz，10⁵ 次，TB/T 3263）' } },
  '08': { v: '0.82', u: '%', l: { en: 'overall porosity, 160 kV CT at 0.11 mm', zh: '整体孔隙率（160 kV 工业 CT，分辨率 0.11 mm）' } },
  '09': { v: '380 × 290', u: 'mm', l: { en: 'continuous storage space under the seat', zh: '座椅下方连续贯通储物空间' } },
};

const Note = ({ n, lang }: { n: string; lang: Lang }) => {
  const x = NOTES[n];
  return (
    <aside className="st-mnote">
      <span className="v">{x.v}{x.u && <small>{x.u}</small>}</span>
      <span className="l">{t(x.l, lang)}</span>
    </aside>
  );
};

/* ---------- topology explorer ---------- */

const RUNS: { k: Key; tag: T; param: string; note: T }[] = [
  { k: 'td2_p1', tag: { en: 'β = 2', zh: 'β = 2' }, param: 'β 2',
    note: { en: 'Soft projection: blurred edges, wide grey zones of intermediate density.', zh: '投影斜率过小，边界模糊，存在大量过渡密度区域。' } },
  { k: 'td2_p2', tag: { en: 'β = 8', zh: 'β = 8' }, param: 'β 8',
    note: { en: 'Sharp, continuous load paths and stable convergence. β ≥ 10 oscillated.', zh: '边界锐利清晰，传力路径连续，迭代稳定收敛；β ≥ 10 时迭代振荡、难以收敛。' } },
  { k: 'td2_p3', tag: { en: 'V = 0.6', zh: 'V = 0.6' }, param: 'β 8 · V 0.6',
    note: { en: 'Too much material kept: the paths merge into solid webs again.', zh: '材料保留过多，传力路径趋于连成实体。' } },
  { k: 'td2_p4', tag: { en: 'V = 0.2', zh: 'V = 0.2' }, param: 'β 8 · V 0.2',
    note: { en: 'Too little: thin, broken members that lose stiffness.', zh: '材料过少，杆件纤细且不连续，结构刚度不足。' } },
  { k: 'td2_p5', tag: { en: 'V = 0.35', zh: 'V = 0.35' }, param: 'β 8 · V 0.35 · filter 0.42',
    note: { en: 'Chosen: complete main paths at a light volume fraction.', zh: '最终方案：主传力路径完整，兼顾结构刚度与轻量化目标。' } },
  { k: 'td2_final', tag: { en: 'Threshold', zh: '阈值' }, param: 'solid / void',
    note: { en: 'Thresholded to solid / void — the starting sketch for the truss.', zh: '阈值重构得到的二维拓扑构型，作为后续结构设计的初始轮廓。' } },
];

const TopoExplorer = ({ lang, open }: { lang: Lang; open: Open }) => {
  const [at, setAt] = useState(4);
  const run = RUNS[at];
  const r = 670 / 390;
  return (
    <Reveal className="st-topo">
      <div className="st-topo-bar" role="radiogroup" aria-label={lang === 'zh' ? '拓扑优化参数' : 'Optimisation runs'}>
        {RUNS.map((x, i) => (
          <button key={x.k} type="button" role="radio" aria-checked={i === at} onClick={() => setAt(i)}>
            <span className="n">{String(i + 1).padStart(2, '0')}</span>{t(x.tag, lang)}
          </button>
        ))}
      </div>
      <button type="button" className="st-topo-stage" style={{ aspectRatio: String(r) }} onClick={() => open(run.k)} aria-label={t(IM[run.k].alt, lang)}>
        {RUNS.map((x, i) => (
          <img key={x.k} src={IM[x.k].src} alt="" className={i === at ? 'is-on' : ''} loading="lazy" decoding="async" />
        ))}
      </button>
      <div className="st-topo-read">
        <span className="param">{run.param}</span>
        <span className="note">{t(run.note, lang)}</span>
      </div>
      <input
        className="st-topo-range" type="range" min={0} max={RUNS.length - 1} step={1} value={at}
        onChange={e => setAt(Number(e.target.value))}
        aria-label={lang === 'zh' ? '切换优化结果' : 'Step through runs'}
      />
    </Reveal>
  );
};

/* ---------- stress ratio chart: truss v1 vs final ---------- */

// max stress / allowable, worst of tension and compression (thesis tables 3-1 and 3-3)
const STRESS = [
  { c: 'S11', v1: 343 / 450, fin: 72.3 / 450, v1t: '141 / 343', ft: '84.6 / 72.3', allow: '920 / 450' },
  { c: 'S22', v1: 47.9 / 50, fin: 39.3 / 50, v1t: '40.1 / 47.9', ft: '39.3 / 19.6', allow: '50 / 50' },
  { c: 'S33', v1: 34.1 / 50, fin: 12.2 / 50, v1t: '10.9 / 34.1', ft: '12.2 / 11.1', allow: '50 / 50' },
  { c: 'S12', v1: 53.1 / 35, fin: 25.7 / 35, v1t: '53.1', ft: '25.7', allow: '35' },
  { c: 'S13', v1: 35.3 / 35, fin: 6.69 / 35, v1t: '35.3', ft: '6.69', allow: '35' },
  { c: 'S23', v1: 20.2 / 35, fin: 11.9 / 35, v1t: '20.2', ft: '11.9', allow: '35' },
];
const SCALE = 1.6;

const StressChart = ({ lang }: { lang: Lang }) => {
  const [ref, inView] = useInView<HTMLDivElement>();
  const L = lang === 'zh'
    ? { v1: '直线桁架（初版）', fin: '最终方案', allow: '许用强度', unit: '最大应力 / 许用强度' }
    : { v1: 'Straight truss (v1)', fin: 'Final design', allow: 'Allowable', unit: 'max stress / allowable' };
  return (
    <div ref={ref} className={`st-chart ${inView ? 'is-in' : ''}`} style={{ ['--limit' as string]: `${100 / SCALE}%` }}>
      <div className="st-chart-key">
        <span><i className="k-v1" />{L.v1}</span>
        <span><i className="k-fin" />{L.fin}</span>
        <span className="unit">{L.unit}</span>
      </div>
      {STRESS.map((s) => (
        <div key={s.c} className="st-chart-row">
          <span className="c">{s.c}</span>
          <div className="track">
            <span className={`bar v1 ${s.v1 > 1 ? 'over' : ''}`} style={{ ['--w' as string]: `${(s.v1 / SCALE) * 100}%` }} title={`${s.v1t} MPa`} />
            <span className="bar fin" style={{ ['--w' as string]: `${(s.fin / SCALE) * 100}%` }} title={`${s.ft} MPa`} />
          </div>
          <span className="vals"><b className={s.v1 > 1 ? 'over' : ''}>{s.v1.toFixed(2)}</b> → <b>{s.fin.toFixed(2)}</b></span>
        </div>
      ))}
      <div className="st-chart-axis" aria-hidden="true">
        <span style={{ left: 0 }}>0</span>
        <span style={{ left: `${(0.5 / SCALE) * 100}%` }}>0.5</span>
        <span className="lim" style={{ left: `${100 / SCALE}%` }}>1.0 · {L.allow}</span>
        <span style={{ left: `${(1.5 / SCALE) * 100}%` }}>1.5</span>
      </div>
    </div>
  );
};

/* ---------- copy ---------- */

const C = {
  en: {
    seoT: 'Metro Seat Support — Topology Optimisation | Engineering by Ruipeng Wang',
    seoD: 'Bachelor thesis: a topology-optimised, continuous-carbon-fibre 3D-printed seat support for Xi\'an Metro Line 15 — 44% lighter, with a 380 × 290 mm luggage space under the seat.',
    back: 'Drawing register',
    title: 'Metro Seat Support',
    sub: 'Topology-optimised, continuous carbon-fibre seat support for Xi\'an Metro Line 15',
    meta: [['DWG', 'ENG-01'], ['Type', 'Bachelor thesis'], ['Institution', 'Institute of Advanced Manufacturing Technology, School of Mechanical Engineering, Xi\'an Jiaotong University'], ['Year', '2025–26']],
    before: 'Before · 6063-T5 aluminium', after: 'After · continuous carbon fibre',
    specs: [
      ['−44%', 'mass, 3.93 → 2.20 kg per support'],
      ['0.713 mm', 'max displacement, six-seat assembly at 9000 N'],
      ['5.17', 'lowest safety margin under the fatigue load case'],
      ['380 × 290', 'mm of open space under the seat — fits a 28" suitcase'],
    ],
    roleT: 'Who did what',
    role: [
      ['Mine', 'Problem analysis, topology optimisation, truss redesign, all FEA (single part, assembly, fatigue), space and scenario design.'],
      ['Took part', 'Printing of the prototype.'],
      ['Research group', 'Fibre-path planning algorithm, G-code, CT scanning and assembly tests — the group\'s earlier, validated work.'],
    ],
  },
  zh: {
    seoT: '地铁座椅支架轻量化 — 拓扑优化与连续纤维 3D 打印 | 王睿鹏 工程作品',
    seoD: '本科毕业设计：基于拓扑优化与连续碳纤维复合材料 3D 打印的西安地铁 15 号线座椅支架轻量化与空间设计，减重 44.02%，座下释放 380 × 290 mm 连续储物空间。',
    back: '图纸目录',
    title: '地铁座椅支架轻量化',
    sub: '基于拓扑优化与连续碳纤维复合材料 3D 打印的轨道交通座椅支架轻量化与空间设计',
    meta: [['图号', 'ENG-01'], ['类型', '本科毕业设计（论文）'], ['单位', '西安交通大学 机械工程学院 先进制造技术研究所'], ['年份', '2025–26']],
    before: '原方案 · 6063-T5 铝合金', after: '优化方案 · 连续碳纤维增强复合材料',
    specs: [
      ['−44%', '减重 44.02%，单件 3.93 → 2.20 kg'],
      ['0.713 mm', '6 人座总装模型在 9000 N 载荷下的最大位移'],
      ['5.17', '疲劳工况（TB/T 3263-2011）下的最低安全裕度'],
      ['380 × 290', 'mm 座下连续储物空间，可平放 28 寸行李箱'],
    ],
    roleT: '分工',
    role: [
      ['本人', '现有支架力学与空间分析、拓扑优化、结构重构与细节优化、单件及总装静力学与疲劳仿真、空间与场景设计。'],
      ['参与', '支架样件的 3D 打印试制。'],
      ['课题组', '连续纤维打印路径规划算法、G 代码生成、工业 CT 检测及装配验证（课题组前期已验证的成熟方案）。'],
    ],
  },
};

/* ---------- page ---------- */

const SeatSheet = ({ lang }: { lang: Lang }) => {
  const c = C[lang];
  const zh = lang === 'zh';
  const [at, setAt] = useState<number | null>(null);
  const open = useCallback<Open>((k) => setAt(ORDER.indexOf(k)), []);
  const close = useCallback(() => setAt(null), []);
  const gallery: StoryImage[] = ORDER.map((k) => ({ src: IM[k].src, alt: t(IM[k].alt, lang), ratio: IM[k].w / IM[k].h }));
  const [heroRef, heroIn] = useInView<HTMLDivElement>();

  return (
    <div className={`eg st ${zh ? 'eg--zh' : ''}`} data-nav-dark>
      <Seo title={c.seoT} description={c.seoD} />
      <div className="eg-wrap">
        {/* ---------- head ---------- */}
        <header className="st-head">
          <Link to="/engineering" className="st-back">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M13 7H1m0 0 5.5-5.5M1 7l5.5 5.5" stroke="currentColor" strokeWidth="1.2" /></svg>
            {c.back}
          </Link>
          <h1 className="st-title">{c.title}</h1>
          <p className="st-sub">{c.sub}</p>
          <dl className="st-meta">
            {c.meta.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
          </dl>
        </header>

        {/* ---------- before / after plate ---------- */}
        <div ref={heroRef} className={`st-plate ${heroIn ? 'is-in' : ''}`}>
          <div className="st-plate-cell">
            <div className="st-plate-label"><span>A</span>{c.before}</div>
            <button type="button" className="st-plate-img" onClick={() => open('orig_model')} aria-label={t(IM.orig_model.alt, lang)}>
              <img src={IM.orig_model.src} alt={t(IM.orig_model.alt, lang)} />
            </button>
            <div className="st-mass"><span className="bar" style={{ ['--w' as string]: '100%' }} /><span className="kg">3.93 kg</span></div>
          </div>
          <div className="st-plate-cell">
            <div className="st-plate-label"><span>B</span>{c.after}</div>
            <button type="button" className="st-plate-img" onClick={() => open('final_iso')} aria-label={t(IM.final_iso.alt, lang)}>
              <img src={IM.final_iso.src} alt={t(IM.final_iso.alt, lang)} />
            </button>
            <div className="st-mass"><span className="bar is-after" style={{ ['--w' as string]: `${(2.2 / 3.93) * 100}%` }} /><span className="kg">2.20 kg</span></div>
          </div>
        </div>

        <Reveal className="st-specs">
          {c.specs.map(([v, l]) => <div key={v}><span className="v">{v}</span><span className="l">{l}</span></div>)}
        </Reveal>

        <Reveal className="st-role">
          <div className="st-role-t">{c.roleT}</div>
          {c.role.map(([k, v]) => <div key={k} className="st-role-row"><span className="k">{k}</span><span>{v}</span></div>)}
        </Reveal>

        {/* ---------- 01 problem ---------- */}
        <Section n="01" label={zh ? '问题' : 'Problem'} title={zh ? '强度裕度过高，座下空间利用率低' : <>Eight times stronger than it needs to be — and no room for a suitcase.</>}>
          <Reveal className="st-cols">
            <Note n="01" lang={lang} />
            <P>{zh
              ? '研究对象来源于西安地铁 15 号线车辆座椅系统，6 人座椅通过 4 个 6063-T5 铝合金支架与车体侧墙悬臂连接。依据 UIC 566-1990，单个座位额定承载 150 kg，单个支架承受 2250 N。有限元分析表明，原支架最大 von Mises 应力为 24.3 MPa，远低于 215 MPa 的屈服强度，强度安全裕度超过 8 倍；大部分区域应力低于 10 MPa，材料承载效率较低。'
              : 'On Xi\'an Metro Line 15, each six-seat bench hangs from the side wall on four aluminium supports. At 150 kg per seat (UIC 566) one support carries 2250 N. Simulation puts the peak von Mises stress at 24.3 MPa against a 215 MPa yield strength — most of the part sits below 10 MPa, doing almost nothing.'}</P>
            <P>{zh
              ? '同时，板肋式实心结构填充了座面至车体侧壁之间的过渡区域，座椅下方无有效储物空间，难以满足大件行李放置与无障碍出行需求。据此确立设计目标：减重不低于 25%，并依据 GB/T 10000-2023 与 GB 50763-2012 释放座下连续空间。'
              : 'Its solid plate-and-rib form also fills the whole space between seat and wall, so nothing large fits underneath and there is no room for legs or accessibility rails. The brief was therefore twofold: at least 25% lighter, and give the space under the seat back.'}</P>
          </Reveal>
          <Reveal><Row>
            <Fig k="orig_stress" lang={lang} open={open} flex cap={zh ? '2250 N 下最大 von Mises 应力 24.3 MPa（屈服强度 215 MPa）' : '24.3 MPa peak at 2250 N; yield is 215 MPa'} />
            <Fig k="orig_install" lang={lang} open={open} flex cap={zh ? '安装约束：座面高 435 mm，侧墙三处安装点' : 'Installation envelope: 435 mm seat height, three wall fixings'} />
          </Row></Reveal>
        </Section>

        {/* ---------- 02 material ---------- */}
        <Section n="02" label={zh ? '材料' : 'Material'} title={zh ? '连续碳纤维复合材料的正交各向异性' : 'Very strong along the fibre, weak everywhere else.'}>
          <Reveal className="st-cols">
            <Note n="02" lang={lang} />
            <P>{zh
              ? '支架采用阻燃性 3D 打印连续碳纤维复合材料。依据 ASTM D3039、D3410、D3518 的测试结果建立正交各向异性本构模型：纤维方向（11 方向）拉伸强度取 920 MPa、压缩强度取 450 MPa，横向强度仅为 50 MPa，面内剪切强度为 35 MPa。材料性能的显著各向异性，要求纤维铺放方向与主传力方向保持一致。'
              : 'The new support is 3D-printed in flame-retardant continuous carbon fibre. An orthotropic model was built from ASTM D3039 / D3410 / D3518 tests: 920 MPa in tension along the fibre, but only 35–50 MPa across it and in shear. That gap drives everything that follows — the structure has to let the fibres follow the load.'}</P>
            <table className="st-table">
              <thead><tr><th>{zh ? '方向' : 'Dir.'}</th><th>E (MPa)</th><th>{zh ? '强度' : 'Strength'} (MPa)</th></tr></thead>
              <tbody>
                <tr><td>11</td><td>55 000</td><td>920 / 450 <em>{zh ? '拉 / 压' : 't / c'}</em></td></tr>
                <tr><td>22, 33</td><td>6 000</td><td>50 / 50</td></tr>
                <tr><td>12, 13, 23</td><td>3 000</td><td>35 <em>{zh ? '剪切' : 'shear'}</em></td></tr>
              </tbody>
            </table>
          </Reveal>
        </Section>

        {/* ---------- 03 topology ---------- */}
        <Section n="03" label={zh ? '拓扑优化' : 'Topology optimisation'} title={zh ? '由三维转向二维拓扑优化' : 'Drop the 3D answer; find the load path in the plane.'}>
          <Reveal className="st-cols">
            <Note n="03" lang={lang} />
            <P>{zh
              ? '首先在 COMSOL Multiphysics 中采用变密度法（SIMP）开展三维拓扑优化，求解器为 GCMMA，目标函数为最小化结构柔度，体积分数约束不超过 20%。所得构型传力路径清晰，但存在复杂空间曲面、大角度悬空区域及不规则壁厚，与连续纤维仅能在平面内连续铺放的工艺特性不匹配。'
              : 'A first 3D SIMP run in COMSOL (GCMMA, volume ≤ 20%, minimum compliance) gave a mechanically good answer full of double-curved surfaces, overhangs and varying walls. Continuous fibre can only be laid in a plane; printing that shape would cut the fibres again and again.'}</P>
            <P>{zh
              ? '因此转向二维拓扑优化：提取原支架主承力截面作为设计域，安装接口区域设为非设计域，所得平面传力路径可通过等厚度层叠实现三维成型。下方为二维优化中投影斜率 β 与平均材料体积因子的对比结果。'
              : 'So the problem went 2D: the main load-bearing section of the old support became the design domain, with the mounting faces kept fixed. A planar load path can be built up in equal-thickness layers. Below are the runs compared along the way.'}</P>
          </Reveal>
          <Reveal><Row>
            <Fig k="td3_density" lang={lang} open={open} flex cap={zh ? '三维拓扑优化：材料体积因子分布' : '3D run: sound mechanically'} />
            <Fig k="td3_solid" lang={lang} open={open} flex cap={zh ? '阈值重构模型：难以适配连续纤维打印' : '…but unprintable in continuous fibre'} />
            <Fig k="td2_domain_b" lang={lang} open={open} flex cap={zh ? '二维拓扑优化设计域' : '2D design domain'} />
          </Row></Reveal>
          <TopoExplorer lang={lang} open={open} />
        </Section>

        {/* ---------- 04 truss ---------- */}
        <Section n="04" label={zh ? '几何重构' : 'From density to truss'} title={zh ? '面向连续纤维铺放的几何重构' : 'Turn a density map into straight members fibre can follow.'}>
          <Reveal className="st-cols">
            <Note n="04" lang={lang} />
            <P>{zh
              ? '二维优化结果为离散单元的密度分布，边界呈锯齿状且未定义厚度。首先在 SolidWorks 中以样条曲线拟合轮廓，建立初步三维模型；但曲线型路径会使纤维产生附加弯曲应力，并易引发褶皱等成型缺陷。在完整保留主传力构型的前提下，将大部分曲线段直线化重构，形成直线型桁架式支架。'
              : 'The density map has no thickness and jagged edges. Tracing it with splines in SolidWorks gave a first 3D model — but curved members bend and wrinkle the fibre. Keeping the main load paths, most curves were straightened and the joints reworked into a straight-member truss.'}</P>
            <P>{zh
              ? '仿真中采用扩散法对杆件求解曲线坐标系，据此定义连续纤维的铺放方向场，使材料主方向与杆件轴向保持一致，以准确表征复合材料的各向异性力学行为。'
              : 'Before simulation, a curvilinear coordinate system was solved over the members by diffusion, so the material\'s principal direction runs along each member — the way the fibre will actually be laid.'}</P>
          </Reveal>
          <Reveal><Row>
            <Fig k="fit_sketch" lang={lang} open={open} flex />
            <Fig k="fit_model" lang={lang} open={open} flex />
          </Row></Reveal>
          <Reveal><Row>
            <Fig k="v1_model" lang={lang} open={open} flex />
            <Fig k="v1_field" lang={lang} open={open} flex />
          </Row></Reveal>
        </Section>

        {/* ---------- 05 fail and fix ---------- */}
        <Section n="05" label={zh ? '校核与修正' : 'Check, fail, fix'} title={zh ? '剪切应力超标与基于灵敏度的修正' : 'The first check failed in shear.'}>
          <Reveal className="st-cols">
            <Note n="05" lang={lang} />
            <P>{zh
              ? '在 2250 N 额定载荷下，直线型桁架纤维方向应力储备充足，但节点区域面内剪应力 S12 达 53.1 MPa，超过 35 MPa 的许用值；S13 为 35.3 MPa，亦略超许用值。若对高应力区域整体加厚，将显著增加结构重量，违背轻量化设计初衷。'
              : 'At 2250 N the straight truss was comfortable along the fibre, but in-plane shear S12 at the joints reached 53.1 MPa against a 35 MPa allowable, and S13 hit 35.3 MPa. Thickening everything would fix it — and give back the weight just saved.'}</P>
            <P>{zh
              ? '为此，提取中面建立含 29 个独立区域的壳体模型，采用伴随法计算各区域的刚度灵敏度：对灵敏度绝对值最大的 d7、d21、d10、d24 适度加厚，对灵敏度近乎为零的 d3、d17、d6、d20 合理减薄；同时对杆件交叉节点进行 R1.5 mm 圆角过渡，并在 40–60 mm 五组框架宽度中优选 50 mm。'
              : 'Material went only where it counts. The mid-surface became a shell model of 29 regions, and an adjoint stiffness sensitivity was computed for each. The four most sensitive (d7, d21, d10, d24) were thickened, the four that contribute almost nothing (d3, d17, d6, d20) thinned; joints got R1.5 fillets, and frame width was swept over 40–60 mm, settling on 50 mm.'}</P>
          </Reveal>
          <Reveal><Row>
            <Fig k="shell_regions" lang={lang} open={open} flex />
            <Fig k="sens" lang={lang} open={open} flex />
          </Row></Reveal>
          <Reveal><StressChart lang={lang} /></Reveal>
          <Reveal><p className="st-note">{zh
            ? '各应力分量最大值与相应许用强度之比（拉、压取较不利者）。数据来源：论文表 3-1、表 3-3。'
            : 'Each stress component\'s maximum ÷ its allowable (worse of tension and compression). Data: thesis tables 3-1 and 3-3.'}</p></Reveal>
        </Section>

        {/* ---------- 06 final ---------- */}
        <Section n="06" label={zh ? '最终方案' : 'Final design'} title={zh ? '最终方案：2.20 kg，各应力分量均低于许用值' : '2.20 kg, every component inside its allowable.'}>
          <Reveal className="st-cols">
            <Note n="06" lang={lang} />
            <P>{zh
              ? '顶部整体式座椅连接板简化为两个分体式安装支撑块。最终模型体积为 1.37 × 10⁶ mm³，材料密度 1.6 g/cm³，计算重量约 2.20 kg，较原铝合金支架（3.93 kg）减重 44.02%。单件在 2250 N 载荷下最大位移为 0.605 mm，S12 降至 25.7 MPa，各应力分量均低于材料许用强度。'
              : 'The top seat plate was also split into two separate mounting blocks. At 1.37 × 10⁶ mm³ and 1.6 g/cm³ the final part weighs 2.20 kg — 44.02% lighter than the 3.93 kg original. Under 2250 N it deflects 0.605 mm at most, and S12 is down to 25.7 MPa.'}</P>
            <P>{zh
              ? '按全列车 200 个座椅支架计算，累计减重约 345 kg。'
              : 'Across a train of about 200 supports, that is roughly 345 kg less.'}</P>
          </Reveal>
          <Reveal><Row>
            <Fig k="final_front" lang={lang} open={open} flex />
            <Fig k="final_side" lang={lang} open={open} flex />
          </Row></Reveal>
          <Reveal><Row>
            <Fig k="final_s11" lang={lang} open={open} flex />
            <Fig k="final_disp" lang={lang} open={open} flex cap={zh ? '最大位移 0.605 mm' : 'Max displacement 0.605 mm'} />
          </Row></Reveal>
        </Section>

        {/* ---------- 07 system ---------- */}
        <Section n="07" label={zh ? '服役性能' : 'In the bench'} title={zh ? '总装静力学与疲劳性能校核' : 'Back in the six-seat bench — static and fatigue.'}>
          <Reveal className="st-cols">
            <Note n="07" lang={lang} />
            <P>{zh
              ? '为评估实际服役状态下的力学响应，基于 6 人座椅总装模型开展系统级静力学分析，在座面施加 9000 N 均布载荷。结果表明，最大位移为 0.713 mm，各方向应力均低于材料强度。'
              : 'A single part passing is not enough. In a full six-seat assembly with 9000 N spread over the seat pan, maximum displacement is 0.713 mm and every stress component stays below strength.'}</P>
            <P>{zh
              ? '疲劳分析依据 TB/T 3263-2011：每座坐垫施加 490 N 竖直载荷、靠背施加 245 N 水平向后载荷，频率 1 Hz，循环 10 万次。疲劳载荷下最大应力为 22.1 MPa，最低安全裕度为 5.17，高于 MIL-HDBK-17 低应力水平判据（≥ 3），满足"静力覆盖疲劳"准则。'
              : 'Fatigue followed TB/T 3263: 490 N down on each cushion, 245 N back on each backrest, 1 Hz for 100 000 cycles. Peak stress is 22.1 MPa and the lowest safety margin 5.17 — above the 3 at which MIL-HDBK-17 practice waives fatigue design.'}</P>
          </Reveal>
          <Reveal><Row>
            <Fig k="asm_s11" lang={lang} open={open} flex />
            <Fig k="asm_disp" lang={lang} open={open} flex cap={zh ? '总装模型最大位移 0.713 mm' : 'Assembly max displacement 0.713 mm'} />
          </Row></Reveal>
          <Reveal><Row>
            <Fig k="fat_s11" lang={lang} open={open} flex cap={zh ? '疲劳工况 S11 最大应力 22.1 MPa' : 'Fatigue case: S11 peaks at 22.1 MPa'} />
            <Fig k="sec_iso" lang={lang} open={open} flex />
          </Row></Reveal>
        </Section>

        {/* ---------- 08 manufacture ---------- */}
        <Section n="08" label={zh ? '制造验证 · 课题组' : 'Made · with the research group'} title={zh ? '连续纤维 3D 打印制造验证' : 'Printed, then looked inside with CT.'}>
          <Reveal className="st-credit">
            {zh
              ? '本节所述连续纤维打印路径规划、G 代码生成、工业 CT 检测与装配验证均由课题组完成，采用课题组前期已验证的成熟方案；本人参与了样件的打印试制。'
              : 'Fibre-path planning, G-code, CT scanning and the assembly tests in this section are the research group\'s earlier, validated work. I took part in printing the prototype.'}
          </Reveal>
          <Reveal className="st-cols">
            <Note n="08" lang={lang} />
            <P>{zh
              ? '打印路径基于应力矢量追踪算法沿主应力方向规划，并采用基于 Euler 图的点图重构算法将离散路径重组为两个完整梁单元；交叉区域通过适当增大纤维间距等方式进行优化。样件在自主研发的连续纤维 3D 打印设备上一体化成型。'
              : 'Print paths trace the principal stress directions; an Euler-graph method rejoins them into two continuous beams, with fibre spacing widened where paths cross. The part was printed in one piece on the group\'s own continuous-fibre printer.'}</P>
            <P>{zh
              ? '采用 160 kV 微焦点工业 CT（扫描分辨率 0.11 mm）对固化后的支架进行孔隙三维重构，整体孔隙率为 0.82%，内部致密性良好。连接孔均内嵌金属孔套，装配验证中各接口无干涉。'
              : 'A 160 kV industrial CT scan at 0.11 mm resolution reconstructed the internal voids: overall porosity 0.82%. Every fixing hole carries a metal insert, and the assembly went together without interference.'}</P>
          </Reveal>
          <Reveal><Row>
            <Fig k="print_path" lang={lang} open={open} flex />
          </Row></Reveal>
          <Reveal><Row>
            <Fig k="print_a" lang={lang} open={open} flex />
            <Fig k="ct" lang={lang} open={open} flex cap={zh ? 'CT 孔隙三维重构：孔隙率 0.82%' : 'CT reconstruction: 0.82% porosity'} />
            <Fig k="assembled" lang={lang} open={open} flex />
          </Row></Reveal>
        </Section>

        {/* ---------- 09 space ---------- */}
        <Section n="09" label={zh ? '空间' : 'Space'} title={zh ? '座椅下方空间释放' : 'What came off was not only weight.'}>
          <Reveal className="st-cols">
            <Note n="09" lang={lang} />
            <P>{zh
              ? '桁架结构仅沿主应力路径分布材料，支架上端距地面 353 mm，于座椅下方释放出 380 mm（深）× 290 mm（高）的连续贯通储物空间，无实体隔板分割，可平放 28 寸标准行李箱。'
              : 'With members only along the load paths, the top of the support sits 353 mm above the floor, leaving a continuous, undivided 380 mm deep × 290 mm high space under the seat — a 28-inch suitcase slides in flat.'}</P>
            <P>{zh
              ? '轻量化所释放的重量余量，亦为模块化热插拔座椅、无障碍扶手等后续功能拓展提供了条件。'
              : 'The weight saved also leaves headroom for later ideas: modular, quick-release seats and accessibility rails.'}</P>
          </Reveal>
          <Reveal><Row>
            <Fig k="space" lang={lang} open={open} flex cap={zh ? '座椅下方 380 × 290 mm 储物空间' : '380 × 290 mm under the seat'} />
            <Fig k="scenes" lang={lang} open={open} flex />
          </Row></Reveal>
        </Section>

        <nav className="st-next">
          <Link to="/engineering">
            <span className="lbl">{zh ? '返回' : 'Back to'}</span>
            <span className="t">{c.back}</span>
          </Link>
        </nav>

        <Footer darkMode />
      </div>
      {at !== null && <Viewer items={gallery} index={at} onClose={close} onStep={setAt} />}
    </div>
  );
};

export default SeatSheet;
