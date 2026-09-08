import { Fragment, useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLoading } from '../context/useLoading';
import { socialLinks } from '../data/socialLinks';

const educationMain = [
  { school: '新加坡国立大学', major: '机械工程', degree: '硕士', period: '2026 — 至今' },
  { school: '西安交通大学', major: '工业设计', degree: '工学学士', period: '2022 — 2026' },
  { school: '米兰理工大学', major: '工业产品工程（双学位）', degree: '工学学士', period: '2022 — 2026' },
];

const educationPrior = [
  { school: '华东理工大学', major: '过程装备与控制工程', degree: undefined, period: '2018 — 2020' },
];

const featuredProjects = [
  {
    title: '地铁座椅支架轻量化研究',
    period: '2025.01 — 2026.06',
    desc: '通过 COMSOL 拓扑优化、CAD/CAE 验证与复合材料 3D 打印，把一款既有地铁座椅支架的重量降低了 39.5% 以上。',
    tags: ['COMSOL', '拓扑优化', 'CAD/CAE', '复合材料 3D 打印'],
  },
  {
    title: 'iHarbour 智慧校巴系统',
    period: '2025.10 — 2025.12',
    desc: '用用户研究、路线规划和一套整合的乘客-运营体验，把校园交通重新定义成一项连接服务。',
    tags: ['PSS 服务设计', 'React Native', 'JavaScript', '服务设计'],
  },
  {
    title: '智能恒温夹克',
    period: '2024.09 — 2024.12',
    desc: '基于 Arduino 的可穿戴原型，结合温度感应与石墨烯加热，并设计了一套自主控温的交互概念。',
    tags: ['Arduino', '蓝牙 Mesh', '石墨烯加热', 'UI/UX 原型'],
  },
  {
    title: '吃点什么',
    period: '2024.09 — 2024.12',
    desc: '独立开发的 React Native 应用，把"吃什么"的选择困难变成一次抽卡，再把结果标在地图上。',
    tags: ['React Native', '地图 API', 'UI/UX', 'JavaScript'],
  },
  {
    title: '合趣餐厅',
    period: '2025.04 — 2025.06',
    desc: '在 Unity 中主导开发一款 PICO 餐厅经营 VR 游戏的完整流程，重点打磨动作特效与声音设计。',
    tags: ['Unity', 'PICO VR', '特效', '声音设计'],
  },
  {
    title: 'RnB 表情包',
    period: '2024.12 — 2025.01',
    desc: '创作了一套角色化的 R&B 律动表情包，上线微信后分享量超过 10 万次（截至 2026 年 1 月）。',
    tags: ['角色设计', 'After Effects', '动效'],
  },
];

const honors = [
  { title: '二等奖学金', org: '联合设计学院（院级）', year: '2024–2025' },
  { title: '二等奖学金', org: '联合设计学院（院级）', year: '2023–2024' },
  { title: '"腾飞杯"三等奖', org: '西安交大创新赛道', year: '2022–2023' },
  { title: '三等奖学金', org: '西安交通大学', year: '2022–2023' },
];

const skillGroups = [
  {
    category: '产品设计与用户体验',
    skills: [
      ['全流程设计', '用户研究、概念草图、造型美学、方案落地'],
      ['用户体验', '人物画像、旅程地图、可用性测试、体验优化'],
      ['设计思维', '双钻模型、竞品分析、创新方案'],
      ['专业工具', 'SolidWorks、Alias、Keyshot、Figma、Adobe 全家桶、原型制作'],
    ],
  },
  {
    category: '机械工程与制造',
    skills: [
      ['结构工程', '结构设计、工程制图、SolidWorks、力学分析'],
      ['仿真与优化', '有限元分析（ANSYS/Abaqus）、拓扑优化、结构迭代'],
      ['先进制造', '3D 打印（FDM/FRP）、复合材料设计与加工'],
      ['数据与计算', 'MATLAB、数据可视化、参数化分析、技术文档'],
    ],
  },
  {
    category: '电子、物联网与通信',
    skills: [
      ['嵌入式系统', 'Arduino、STM32、ESP32 编程、外设驱动开发'],
      ['硬件设计', '原理图设计、PCB/FPC 布局、硬件原型组装'],
      ['物联网与组网', 'WiFi/蓝牙/Zigbee、通信协议、智能家居联动'],
      ['传感融合', '数据采集与处理、物联网系统架构、硬件调试'],
    ],
  },
  {
    category: '数字产品与创意编程',
    skills: [
      ['前端开发', 'HTML/CSS/JavaScript、响应式网页设计、交互效果'],
      ['编程语言', 'C（硬件逻辑）、C#（Unity）、JavaScript（前端）、Python（计算机视觉、数据处理）'],
      ['交互媒体', 'Unity 3D 开发、XR 交互、虚拟原型与游戏化设计'],
    ],
  },
  {
    category: '视觉传达与多媒体',
    skills: [
      ['影像与动效', 'Premiere Pro、After Effects、节奏把控、叙事表达'],
      ['视觉产出', '作品集制作、设计可视化、动态演示制作'],
      ['平面设计', '印刷排版、字体设计、海报设计、视觉系统、信息图形设计'],
    ],
  },
  {
    category: '跨界实践与兴趣',
    skills: [
      ['3C 产品探索', '产品调研、技术拆解、趋势洞察、软硬件融合分析、用户体验'],
      ['汽车与出行', '汽车结构、车辆动力学、赛车技术'],
      ['跨学科协同', '设计-机械-电子-软件整合、跨领域协作'],
    ],
  },
];

const works = [
  {
    numeral: '壹',
    title: '设计',
    subtitle: '产品、平面与用户体验',
    desc: '以美学回应真实需求。',
    href: '/design',
    accent: '#c85a4a',
  },
  {
    numeral: '贰',
    title: '工程',
    subtitle: '机械、电子与仿真',
    desc: '让想法经得起验证。',
    href: '/engineering',
    accent: '#3b6ea5',
  },
  {
    numeral: '叁',
    title: '人文',
    subtitle: '摄影、音乐与艺术',
    desc: '记录感受，也表达自己。',
    href: '/humanities',
    accent: '#a87a4a',
  },
];

const fields = ['设计', '工程', '人文'];

const RULE = '#d9d4c8';

const LandingZh = () => {
  const { isLoaded } = useLoading();
  const reduceMotion = useReducedMotion();
  const [showPriorEducation, setShowPriorEducation] = useState(false);
  const [activeQr, setActiveQr] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen w-full bg-[#faf9f6]">
      {/* Hero -- 版式借鉴古籍界栏/界行：细线把内容切成规整的栏目，
          左侧留一道窄的"界行"缺口，姓名、题眼、领域各占一行，
          线条在加载时"写入"展开，取代之前深色底的光斑/尘埃动效。 */}
      <section className="relative flex min-h-screen flex-col px-6 pb-8 pt-24 md:px-16 md:pb-10 md:pt-28">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col">
          {/* 顶部横线交给导航栏底边承担，这里不再重复画一条不同宽度的线 */}
          <div className="grid flex-1 grid-cols-1 md:grid-cols-[56px_1px_1fr]">
            {/* 左侧界行缺口 */}
            <div className="hidden flex-col items-center justify-between py-10 md:flex">
              <motion.span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full border border-[#171310]"
                animate={reduceMotion ? {} : { opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span
                style={{ writingMode: 'vertical-rl' }}
                className="text-[11px] tracking-[0.4em] text-[#a39c8f]"
              >
                创意空间
              </span>
            </div>
            <motion.div
              aria-hidden="true"
              style={{ transformOrigin: 'top', background: RULE }}
              className="hidden w-px md:block"
              initial={{ scaleY: 0 }}
              animate={isLoaded ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            />

            <div className="flex flex-col md:pl-12">
              {/* 姓名 / 身份行 */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-3 border-b py-6 md:flex-row md:items-baseline md:justify-between md:py-7"
                style={{ borderColor: RULE }}
              >
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-serif text-2xl font-semibold tracking-[0.06em] text-[#171310] md:text-3xl">
                    王睿鹏
                  </span>
                  <span className="text-sm tracking-wide text-[#8a8378]">工业设计师 · 创意工程师</span>
                </div>
                <span className="text-xs tracking-wide text-[#a39c8f]">
                  新加坡国立大学 · 机械工程硕士在读
                </span>
              </motion.div>

              {/* 题眼句：在剩余空间里居中，让整段撑满一屏；右侧一个极淡的巨字水印填充空白 */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-1 items-center overflow-hidden border-b py-10"
                style={{ borderColor: RULE }}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-4 top-1/2 hidden -translate-y-1/2 select-none font-serif text-[36vw] leading-none text-[#171310] opacity-[0.035] md:block"
                >
                  永
                </span>
                <p className="relative max-w-2xl font-serif text-3xl font-medium leading-[1.65] tracking-wide text-[#171310] md:text-[44px]">
                  在美学与逻辑之间，
                  <br />
                  寻找答案。
                </p>
              </motion.div>

              {/* 领域行 */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-10 py-6"
              >
                {fields.map((field) => (
                  <span key={field} className="text-sm tracking-[0.3em] text-[#8a8378]">
                    {field}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section
        className="border-t px-6 py-20 md:px-16 md:py-24"
        style={{ borderColor: RULE }}
      >
        <div className="mx-auto w-full max-w-7xl">
          {/* 标题 + 简介算一个整体，照片相对这整体垂直居中 */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_180px] md:items-center md:gap-16">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mb-8 flex items-center gap-5"
              >
                <div className="h-px w-10 bg-[#171310]" />
                <span className="text-[13px] tracking-[0.08em] text-[#6b6459]">关于</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="mb-12 font-serif text-3xl font-medium leading-[1.6] tracking-wide text-[#171310] md:mb-16 md:text-[44px]"
              >
                设计与工程，
                <br />
                <span className="text-[#a39c8f]">始于人文关怀。</span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-4 text-[13px] tracking-[0.08em] text-[#a39c8f]">简介</div>
                <div className="mb-2 font-serif text-2xl font-semibold tracking-[0.04em] text-[#171310]">
                  王睿鹏
                </div>
                <div className="mb-6 text-sm tracking-wide text-[#8a8378]">工业设计师 · 创意工程师</div>
                <p className="mb-7 max-w-xl text-base font-light leading-[1.95] text-[#4a453e]">
                  用设计回应需求，用工程验证想法，用人文记录感受、表达自己。
                </p>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2.5 text-xs font-bold tracking-wide text-[#171310]"
                >
                  联系我
                  <span className="h-px w-6 bg-[#171310] transition-all group-hover:w-9" />
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-32 md:w-[180px]"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-sm bg-[#e5e2dc]">
                <img
                  src="/profile.webp"
                  alt="王睿鹏"
                  className="h-full w-full object-cover grayscale-[15%]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Works */}
      <section className="border-t border-[#e2ded4] px-6 py-20 md:px-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 flex items-center gap-5"
          >
            <div className="h-px w-10 bg-[#171310]" />
            <span className="text-[13px] tracking-[0.08em] text-[#6b6459]">作品</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-3xl font-medium tracking-wide text-[#171310] md:text-[44px]"
          >
            三个领域，<span className="text-[#a39c8f]">同一双手。</span>
          </motion.h2>

          <div className="mt-10 grid grid-cols-1 gap-14 md:mt-12 md:grid-cols-[1fr_1px_1fr_1px_1fr] md:gap-12">
            {works.map((work, i) => (
              <Fragment key={work.title}>
                {i > 0 && <div className="hidden w-px bg-[#e2ded4] md:block" />}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="mb-6 font-serif text-[15px] tracking-[0.12em] text-[#a39c8f]">
                    {work.numeral}
                  </div>
                  <h3 className="mb-2 font-serif text-2xl font-semibold tracking-[0.02em] text-[#171310] md:text-[30px]">
                    {work.title}
                  </h3>
                  <div className="mb-5 text-[13px] tracking-wide text-[#a39c8f]">{work.subtitle}</div>
                  <p className="mb-7 max-w-[280px] text-[15px] font-light leading-[1.85] text-[#4a453e]">
                    {work.desc}
                  </p>
                  <Link
                    to={work.href}
                    className="group inline-flex items-center gap-2 text-xs font-bold tracking-wide"
                    style={{ color: work.accent }}
                  >
                    查看{work.title}
                    <span
                      className="h-px w-5 transition-all group-hover:w-8"
                      style={{ background: work.accent }}
                    />
                  </Link>
                </motion.div>
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 履历：教育 + 见习 */}
      <section
        className="border-t px-6 py-20 md:px-16 md:py-24"
        style={{ borderColor: RULE }}
      >
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 flex items-center gap-5"
          >
            <div className="h-px w-10 bg-[#171310]" />
            <span className="text-[13px] tracking-[0.08em] text-[#6b6459]">履历</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14 font-serif text-3xl font-medium leading-[1.6] tracking-wide text-[#171310] md:mb-16 md:text-[44px]"
          >
            求学路上，
            <br />
            <span className="text-[#a39c8f]">也在真实世界里做事。</span>
          </motion.h2>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            {/* 教育 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-6 text-[13px] tracking-[0.08em] text-[#a39c8f]">教育</div>
              <div>
                {educationMain.map((edu) => (
                  <div
                    key={edu.school}
                    className="flex flex-col gap-1 border-b py-5 first:pt-0"
                    style={{ borderColor: RULE }}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-serif text-lg font-semibold text-[#171310]">{edu.school}</span>
                      <span className="shrink-0 text-xs tracking-wide text-[#a39c8f]">{edu.period}</span>
                    </div>
                    <span className="text-sm text-[#8a8378]">
                      {edu.major} · {edu.degree}
                    </span>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => setShowPriorEducation((v) => !v)}
                  className="mt-5 text-xs tracking-wide text-[#a39c8f] underline decoration-[#d9d4c8] underline-offset-4 transition-colors hover:text-[#171310]"
                >
                  {showPriorEducation ? '收起更早的教育经历' : '展开更早的教育经历'}
                </button>

                <AnimatePresence>
                  {showPriorEducation && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      {educationPrior.map((edu) => (
                        <div key={edu.school} className="flex flex-col gap-1 pt-5">
                          <div className="flex items-baseline justify-between gap-3">
                            <span className="font-serif text-lg font-semibold text-[#a39c8f]">{edu.school}</span>
                            <span className="shrink-0 text-xs tracking-wide text-[#a39c8f]">{edu.period}</span>
                          </div>
                          <span className="text-sm text-[#a39c8f]">{edu.major}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* 实习 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-6 text-[13px] tracking-[0.08em] text-[#a39c8f]">见习</div>
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-serif text-lg font-semibold text-[#171310]">吉利汽车宝鸡制造基地</span>
                <span className="shrink-0 text-xs tracking-wide text-[#a39c8f]">2025.06 — 2025.07</span>
              </div>
              <div className="mt-1 text-sm text-[#8a8378]">设计与制造见习生</div>
              <p className="mt-5 text-base font-light leading-[1.9] text-[#4a453e]">
                把造型语言放进量产的现实约束里检验，最终为新一代博越 L 完成三套外观轮毂提案。
              </p>
              <div className="mt-6 border-l-2 pl-5" style={{ borderColor: RULE }}>
                <div className="mb-1 text-xs tracking-wide text-[#a39c8f]">核心成果</div>
                <p className="text-sm text-[#4a453e]">
                  为新一代吉利博越 L（FX11-A3）完成外观轮毂设计，交付三套最终方案。
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 精选项目 */}
      <section className="border-t px-6 py-20 md:px-16 md:py-24" style={{ borderColor: RULE }}>
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 flex items-center gap-5"
          >
            <div className="h-px w-10 bg-[#171310]" />
            <span className="text-[13px] tracking-[0.08em] text-[#6b6459]">项目</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14 font-serif text-3xl font-medium tracking-wide text-[#171310] md:mb-16 md:text-[44px]"
          >
            六个项目，<span className="text-[#a39c8f]">六次真实练习。</span>
          </motion.h2>

          <div className="grid grid-cols-1 gap-x-12 gap-y-0 md:grid-cols-2">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="border-b py-8"
                style={{ borderColor: RULE }}
              >
                <div className="mb-3 flex items-baseline justify-between gap-3">
                  <h3 className="font-serif text-xl font-semibold text-[#171310]">{project.title}</h3>
                  <span className="shrink-0 text-xs tracking-wide text-[#a39c8f]">{project.period}</span>
                </div>
                <p className="mb-4 text-[15px] font-light leading-[1.85] text-[#4a453e]">{project.desc}</p>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs tracking-wide text-[#a39c8f]">
                  {project.tags.map((tag, ti) => (
                    <span key={tag}>
                      {tag}
                      {ti < project.tags.length - 1 && <span className="ml-3 text-[#d9d4c8]">·</span>}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 荣誉 */}
      <section className="border-t px-6 py-20 md:px-16 md:py-24" style={{ borderColor: RULE }}>
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 flex items-center gap-5"
          >
            <div className="h-px w-10 bg-[#171310]" />
            <span className="text-[13px] tracking-[0.08em] text-[#6b6459]">荣誉</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14 font-serif text-3xl font-medium tracking-wide text-[#171310] md:mb-16 md:text-[44px]"
          >
            一些认可，<span className="text-[#a39c8f]">不是终点。</span>
          </motion.h2>

          <div className="grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {honors.map((honor, i) => (
              <motion.div
                key={`${honor.title}-${honor.year}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="border-t pt-5"
                style={{ borderColor: RULE }}
              >
                <div className="font-serif text-base font-semibold leading-snug text-[#171310]">
                  {honor.title}
                </div>
                <div className="mt-2 text-sm text-[#8a8378]">{honor.org}</div>
                <div className="mt-4 text-xs tracking-wide text-[#a39c8f]">{honor.year}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 专长 */}
      <section className="border-t px-6 py-20 md:px-16 md:py-24" style={{ borderColor: RULE }}>
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 flex items-center gap-5"
          >
            <div className="h-px w-10 bg-[#171310]" />
            <span className="text-[13px] tracking-[0.08em] text-[#6b6459]">专长</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14 font-serif text-3xl font-medium tracking-wide text-[#171310] md:mb-16 md:text-[44px]"
          >
            六个板块，<span className="text-[#a39c8f]">各自扎实。</span>
          </motion.h2>

          <div className="grid grid-cols-1 gap-x-12 gap-y-14 md:grid-cols-2">
            {skillGroups.map((group, i) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="mb-6 border-b pb-4 font-serif text-lg font-semibold text-[#171310]" style={{ borderColor: RULE }}>
                  {group.category}
                </h3>
                <div className="space-y-5">
                  {group.skills.map(([title, detail]) => (
                    <div key={title} className="border-l-2 pl-4" style={{ borderColor: '#e2ded4' }}>
                      <div className="text-sm font-semibold text-[#171310]">{title}</div>
                      <div className="mt-1 text-sm font-light leading-relaxed text-[#8a8378]">{detail}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#e2ded4] px-6 py-8 md:px-16">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div className="text-xs tracking-wide text-[#a39c8f]">
            © 2026 王睿鹏 · 保持好奇，继续动手。
          </div>

          <div className="flex items-center gap-5">
            {socialLinks.map((social) => (
              <div key={social.name} className="relative flex flex-col items-center">
                <a
                  href={social.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  className="flex items-center justify-center text-[#8a8378] transition-colors hover:text-[#171310]"
                  onMouseEnter={() => social.qrCode && setActiveQr(social.name)}
                  onMouseLeave={() => setActiveQr(null)}
                  onClick={(e) => {
                    if (social.qrCode) {
                      e.preventDefault();
                      setActiveQr(activeQr === social.name ? null : social.name);
                    }
                  }}
                >
                  <div className="scale-90">{social.icon}</div>
                </a>

                <AnimatePresence>
                  {social.qrCode && activeQr === social.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-full z-10 mb-3 w-28 border bg-[#faf9f6] p-1.5 shadow-sm"
                      style={{ borderColor: RULE }}
                    >
                      <img src={social.qrCode} alt={social.name} className="h-full w-full object-contain" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingZh;
