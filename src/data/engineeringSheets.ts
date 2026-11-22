/*
  Engineering drawing set (/engineering).
  Each project is one "sheet" in the register. Content is bilingual in one place so the
  EN and ZH index pages render from the same source.
  `ready`: the sheet links to its detail page only once that page has been redone.
*/

export type Lang = 'en' | 'zh';
type T = { en: string; zh: string };

export type DrawingId = 'bracket' | 'pendulum' | 'fpc' | 'wisp' | 'ocr';

export interface EngineeringSheet {
  /** Detail-page id: /engineering/:id */
  id: number;
  no: string;
  drawing: DrawingId;
  title: T;
  subtitle: T;
  discipline: T;
  type: T;
  year: string;
  summary: T;
  tools: string[];
  /** One headline number or status, shown in the title block. */
  key?: { value: string; label: T };
  /** Real photo shown when the sheet is hovered. */
  photo?: { src: string; fit?: 'cover' | 'contain' };
  ready?: boolean;
}

export const engineeringSheets: EngineeringSheet[] = [
  {
    id: 1,
    no: 'ENG-01',
    drawing: 'bracket',
    title: { en: 'Metro Seat Support', zh: '地铁座椅支架轻量化' },
    subtitle: { en: 'Composite topology optimisation', zh: '复合材料拓扑优化' },
    discipline: { en: 'Structures · CAE', zh: '结构 · CAE' },
    type: { en: 'Bachelor thesis · XJTU', zh: '本科毕业设计 · 西安交通大学' },
    year: '2025–26',
    summary: {
      en: 'Bachelor thesis within the larger Xi\'an Metro Line 15 programme: optimisation design and FEA of a composite seat support in COMSOL, carried through to a 3D-printed prototype that was load-tested.',
      zh: '本科毕业设计。面向西安地铁 15 号线车辆座椅支架，基于变密度拓扑优化与连续碳纤维复合材料 3D 打印开展轻量化与空间协同设计，完成结构优化与有限元仿真，减重 44.02%。',
    },
    tools: ['COMSOL', 'SolidWorks', 'SIMP', 'FEA'],
    key: { value: '−44%', label: { en: 'mass · 3.93 → 2.20 kg', zh: '减重 · 3.93 → 2.20 kg' } },
    ready: true,
  },
  {
    id: 2,
    no: 'ENG-02',
    drawing: 'pendulum',
    title: { en: 'Self-Balancing Two-Wheeler', zh: '两轮自平衡车控制' },
    subtitle: { en: 'State-space control design', zh: '状态空间控制器设计' },
    discipline: { en: 'Control', zh: '控制' },
    type: { en: 'NUS EE5101 / ME5401', zh: 'NUS EE5101 / ME5401' },
    year: '2026',
    summary: {
      en: 'Modelling and controller design for a stationary self-balancing two-wheeled vehicle, worked through all six tasks of the course project.',
      zh: '静止两轮自平衡车的建模与控制器设计，完整完成课程项目的全部六个任务。',
    },
    tools: ['MATLAB', 'State space'],
  },
  {
    id: 3,
    no: 'ENG-03',
    drawing: 'fpc',
    title: { en: 'Bio-Adaptive Microclimate', zh: 'Bio-Adaptive 微气候系统' },
    subtitle: { en: 'Airflow simulation & flexible sensing board', zh: '气流仿真与柔性传感电路' },
    discipline: { en: 'Thermal-fluids · Electronics', zh: '热流体 · 电子' },
    type: { en: 'Research · paper under review', zh: '科研项目 · 论文在审' },
    year: '2025',
    summary: {
      en: 'The engineering under the ward-bed cooling system: airflow simulation in Fluent, and a flexible PCB for pulse/SpO₂, GSR and skin-wetness sensing.',
      zh: '骨科病床降温系统背后的工程部分：Fluent 气流仿真，以及集成心率血氧、皮电与皮肤湿度传感的柔性电路板。',
    },
    tools: ['ANSYS Fluent', 'EasyEDA', 'FPC'],
    photo: { src: '/Design_5/b_pcb1.webp' },
  },
  {
    id: 4,
    no: 'ENG-04',
    drawing: 'wisp',
    title: { en: 'Wisp — System', zh: 'Wisp 系统实现' },
    subtitle: { en: 'macOS sensing, serial link, LLM agent', zh: 'Mac 端感知、串口通信与 LLM agent' },
    discipline: { en: 'Embedded · Software', zh: '嵌入式 · 软件' },
    type: { en: 'NUS ID5402 · individual', zh: 'NUS ID5402 · 个人项目' },
    year: '2026',
    summary: {
      en: 'What runs the Wisp lamp: presence, music and noise sensed on the Mac, streamed over USB serial to a Feather nRF52840 driving the LED ring, with an LLM agent packaged as a desktop-pet app.',
      zh: 'Wisp 灯背后的系统：Mac 端感知人在不在、音乐与环境噪声，经 USB 串口发给 Feather nRF52840 驱动灯环；LLM agent 打包成桌宠 App。',
    },
    tools: ['Python', 'Arduino', 'Serial', 'LLM'],
    photo: { src: '/Design_9/frame.webp', fit: 'contain' },
  },
  {
    id: 5,
    no: 'ENG-05',
    drawing: 'ocr',
    title: { en: 'Character Recognition', zh: '字符识别' },
    subtitle: { en: 'Segmentation & classification', zh: '分割与分类' },
    discipline: { en: 'Machine vision', zh: '机器视觉' },
    type: { en: 'NUS ME5405 · group, Task 1', zh: 'NUS ME5405 · 小组，负责 Task 1' },
    year: '2026',
    summary: {
      en: 'Task 1 of a machine-vision group project: from a raw image to recognised characters through preprocessing, segmentation and classification.',
      zh: '机器视觉小组项目中负责的 Task 1：从原始图像出发，经预处理、分割到分类，识别出字符。',
    },
    tools: ['Python'],
  },
];

export const engineeringCopy = {
  en: {
    eyebrow: 'Wang Ruipeng — Drawing set',
    title: 'Engineering',
    intro: 'Structures, control, fluids, electronics and software — each project drawn up as one sheet.',
    register: 'Drawing register',
    cols: ['No.', 'Title', 'Discipline', 'Year'],
    set: [['Set', 'ENG'], ['Sheets', '05'], ['Rev.', 'C · 2026.11'], ['Units', 'SI']] as [string, string][],
    meta: { discipline: 'Discipline', type: 'Type', year: 'Year', tools: 'Tools' },
    open: 'Open sheet',
    draft: 'Draft',
    photo: 'Photo',
  },
  zh: {
    eyebrow: '王睿鹏 — 图纸集',
    title: '工程',
    intro: '结构、控制、流体、电子与软件——每个项目整理成一张图纸。',
    register: '图纸目录',
    cols: ['图号', '名称', '专业', '年份'],
    set: [['图集', 'ENG'], ['张数', '05'], ['版本', 'C · 2026.11'], ['单位', 'SI']] as [string, string][],
    meta: { discipline: '专业', type: '类型', year: '年份', tools: '工具' },
    open: '打开图纸',
    draft: '绘制中',
    photo: '实物',
  },
};
