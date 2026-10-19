import { Fragment, useEffect, useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { useLoading } from '../context/useLoading';
import { socialLinks } from '../data/socialLinks';
import SplitText from '../components/motion/SplitText';
import type { SplitLine } from '../components/motion/SplitText';
import GuideLines from '../components/motion/GuideLines';
import Magnetic from '../components/motion/Magnetic';
import ParallaxImage from '../components/motion/ParallaxImage';

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
    details: [
      {
        label: '挑战',
        title: '减重不能牺牲可靠性',
        body: '原有的地铁座椅支架需要在减重的同时保持结构性能，项目探索了如何为新的复合材料 3D 打印结构重新规划受力路径。',
      },
      {
        label: '我的角色',
        title: '机械设计与验证',
        body: '作为项目的主要参与者，我提出了轻量化支架方案，把性能要求转化为 CAD 几何模型，并通过仿真驱动的迭代验证结构表现。',
      },
      {
        label: '方法',
        title: '拓扑优化驱动的开发流程',
        body: '用 COMSOL 的密度法对原支架做拓扑优化，再把拓扑结果和 CAD/CAE 仿真、面向增材制造的设计原则结合，做出可打印的复合材料结构。',
      },
      {
        label: '成果',
        title: '减重超过 39.5%',
        body: '最终方案在满足性能指标的前提下，把支架重量降低了 39.5% 以上，为西安地铁 15 号线验证了一条可行的轻量化路径。',
      },
    ],
  },
  {
    title: 'iHarbour 智慧校巴系统',
    period: '2025.10 — 2025.12',
    desc: '用用户研究、路线规划和一套整合的乘客-运营体验，把校园交通重新定义成一项连接服务。',
    tags: ['PSS 服务设计', 'React Native', 'JavaScript', '服务设计'],
    details: [
      {
        label: '挑战',
        title: '碎片化的校园通勤体验',
        body: '校园交通不只是车辆问题——需求不明确、路线规划、等车的不确定性、运营协调，都在影响乘客体验。',
      },
      {
        label: '我的角色',
        title: '产品服务系统设计',
        body: '作为核心成员，我横跨用户研究、服务定义、路线规划和软件原型，把乘客需求和公交系统的运营端连接起来。',
      },
      {
        label: '方法',
        title: '从调研到系统架构',
        body: '把用户需求调研转化为优化后的路线逻辑和运营策略，同时用 JavaScript 参与搭建 React Native 应用原型，连接乘客端和管理端的触点。',
      },
      {
        label: '成果',
        title: '一套连贯的出行方案',
        body: '最终的 PSS 方案把物理出行和数字服务整合成一个系统，证明了协同的设计决策能同时提升乘客的清晰感和运营的可见性。',
      },
    ],
  },
  {
    title: '智能恒温夹克',
    period: '2024.09 — 2024.12',
    desc: '基于 Arduino 的可穿戴原型，结合温度感应与石墨烯加热，并设计了一套自主控温的交互概念。',
    tags: ['Arduino', '蓝牙 Mesh', '石墨烯加热', 'UI/UX 原型'],
    details: [
      {
        label: '挑战',
        title: '舒适感会随场景变化',
        body: '固定档位的加热没法智能响应天气、活动强度或个人偏好的变化，项目探索如何让可穿戴设备的温控更自适应、更省心。',
      },
      {
        label: '我的角色',
        title: '产品与系统设计',
        body: '作为项目负责人，我确定了产品概念、设备形态、控温逻辑和 UI 设计，把夹克当作一套完整的可穿戴系统来做，而不是拼凑几个电子功能。',
      },
      {
        label: '方法',
        title: 'Arduino 驱动的温控逻辑',
        body: 'Arduino 读取温度传感器数据并控制石墨烯加热片，蓝牙 Mesh、天气 API 数据和用户偏好一起被纳入自主调节的系统概念里。',
      },
      {
        label: '成果',
        title: '一套完整的可穿戴系统',
        body: '完成了整体系统设计、设备造型、完整的 App UI 设计、硬件原型和验证测试，把这个可穿戴概念做成了一个连贯的产品体验。',
      },
    ],
  },
  {
    title: '吃点什么',
    period: '2024.09 — 2024.12',
    desc: '独立开发的 React Native 应用，把"吃什么"的选择困难变成一次抽卡，再把结果标在地图上。',
    tags: ['React Native', '地图 API', 'UI/UX', 'JavaScript'],
    details: [
      {
        label: '挑战',
        title: '选择太多，确定太少',
        body: '去哪吃饭是个不起眼但反复出现的决策负担，项目想把"选"这件事重新变成一次发现，而不是又一轮层层筛选。',
      },
      {
        label: '我的角色',
        title: '独立产品开发',
        body: '作为项目负责人兼唯一开发者，我确定了产品概念，独立完成了这款移动应用的 UI、交互、抽选逻辑和地图 API 集成，用的是 React Native 和 JavaScript。',
      },
      {
        label: '方法',
        title: '有目的的抽卡机制',
        body: '抽卡式的选餐流程降低了决策负担；选定餐厅后，内嵌地图通过外部地图 API 直接在应用里显示位置，把趣味发现和实际行动连接起来。',
      },
      {
        label: '成果',
        title: '一个完整可用的原型',
        body: '完成的移动应用展示了从产品想法、体验决策到独立完成界面、交互、抽选逻辑和地图集成的完整链路。',
      },
    ],
  },
  {
    title: '合趣餐厅',
    period: '2025.04 — 2025.06',
    desc: '在 Unity 中主导开发一款 PICO 餐厅经营 VR 游戏的完整流程，重点打磨动作特效与声音设计。',
    tags: ['Unity', 'PICO VR', '特效', '声音设计'],
    details: [
      {
        label: '挑战',
        title: '让一个虚拟场所有反馈感',
        body: '一个有说服力的 VR 餐厅不只靠视觉氛围——动作、物件、反馈和节奏都得配合好，玩家才能自然地理解和融入这个体验。',
      },
      {
        label: '我的角色',
        title: 'XR 交互与开发',
        body: '作为项目负责人，我在 Unity 里为 PICO 硬件完成了游戏的端到端开发，从实现到上机部署全程负责。',
      },
      {
        label: '方法',
        title: '用画面和声音做动作反馈',
        body: '重点打磨了动作特效和声音制作，让视觉和听觉反馈保持协调，玩家的每个操作在沉浸环境里都清晰、有满足感。',
      },
      {
        label: '成果',
        title: '一段可玩的完整 VR 体验',
        body: '完成的原型把体验设计和技术实现整合进一套连贯的模拟系统，从交互逻辑到目标设备部署都跑通了。',
      },
    ],
  },
  {
    title: 'RnB 表情包',
    period: '2024.12 — 2025.01',
    desc: '创作了一套角色化的 R&B 律动表情包，上线微信后分享量超过 10 万次（截至 2026 年 1 月）。',
    tags: ['角色设计', 'After Effects', '动效'],
    details: [
      {
        label: '挑战',
        title: '在几帧动画里传达情绪',
        body: '表情包得让人一眼get到情绪，同时还要有足够的辨识度，才能真正变成别人日常斗图的一部分。',
      },
      {
        label: '我的角色',
        title: '角色与动效方向',
        body: '作为核心成员，我搭建了角色表情体系，定义姿态、时间节奏和运动方式如何传递 R&B 文化里那种松弛的自信感和律动感。',
      },
      {
        label: '方法',
        title: '把节奏当作设计准则',
        body: '在 After Effects 里定了一套时间、夸张幅度和循环方式的动画规范，让整个系列保持统一，又让每个表情有自己的个性。',
      },
      {
        label: '成果',
        title: '分享量超过 10 万次',
        body: '整套动态表情包在微信上线，截至 2026 年 1 月分享量已超过 10 万次，验证了它的表达力和真实的传播效果。',
      },
    ],
  },
  {
    title: '生物自适应微气候系统',
    period: '2025.01 — 2025.04',
    desc: '面向骨科病房的交互式热舒适系统，用柔性传感器和实时反馈为每位患者定制微气候。',
    tags: ['交互设计', '医疗设计', '传感器集成', '热舒适'],
    details: [
      {
        label: '挑战',
        title: "每个人对'舒适'的感受都不同",
        body: '研究发现骨科病房里，不同患者对热环境的舒适感差异很大，项目想找到一种能感知这种差异、并作出响应的方式。',
      },
      {
        label: '我的角色',
        title: '从研究到系统集成',
        body: '我主导了从需求研究、传感器开发到 CFD 仿真验证的完整流程，把主观感受转化成可量化的生理指标。',
      },
      {
        label: '方法',
        title: '柔性电路上的实时感知',
        body: '在柔性印刷电路（FPC）上集成多个传感器，实时监测患者的皮肤湿度和皮肤电反应（GSR），并用计算流体力学仿真优化微气候的输送方式。',
      },
      {
        label: '成果',
        title: '会呼吸的康复环境',
        body: '完成了从传感器原型到系统集成的全流程验证，让病房环境能随患者的生理状态实时调整，为康复体验提供更贴合个体的支持。',
      },
    ],
  },
  {
    title: 'MTA-CoDrive',
    period: '2025.05 — 2025.08',
    desc: '整合 AR-HUD 与多模态反馈的注意力唤醒交互系统，确保自动驾驶接管过程中的安全。',
    tags: ['交互设计', '汽车', '人机交互', 'AR-HUD', '人车协同驾驶'],
    details: [
      {
        label: '挑战',
        title: "'接管'仍是自动驾驶最危险的一刻",
        body: '随着自动驾驶等级提升，人从系统手里重新接管车辆控制权的过程，依然是最大的安全隐患之一。',
      },
      {
        label: '我的角色',
        title: '多模态交互系统设计',
        body: '我主导设计了一套监测驾驶员状态的远程操作系统，整合 AR-HUD、方向盘触觉反馈和空间音频，唤醒驾驶员注意力。',
      },
      {
        label: '方法',
        title: '跨学科的灵感来源',
        body: '从运动机能学和神经科学中寻找线索，重新设计方向盘的交互方式和传感器布局，让"接管"的过程更符合人的本能反应。',
      },
      {
        label: '成果',
        title: '更平顺的人机交接',
        body: '最终方案把接管从一次生硬的控制权切换，变成一场人和算法共同参与的协作过程，为方向盘交互和 HUD 系统提出了新的设计语言。',
      },
    ],
  },
  {
    title: 'SparkPilot',
    period: '2025.10 — 2026.01',
    desc: '整合大语言模型和增强现实技术的硬件教育平台，降低电子工程的入门门槛。',
    tags: ['交互设计', '电子工程', 'AI Agent', '增强现实', '大语言模型'],
    details: [
      {
        label: '挑战',
        title: '电子设计和焊接，对新手门槛很高',
        body: '缺乏电路基础知识、不熟悉 EDA 工具操作、实际焊接时容易出现虚焊或连锡，几重障碍同时压在初学者身上。',
      },
      {
        label: '我的角色',
        title: 'AI 与 AR 双引擎的产品设计',
        body: '作为项目负责人，我把 AI 集成开发环境和 AR 硬件设备的思路结合起来，设计了一套贯穿数字电路设计和物理焊接指导的完整学习体验。',
      },
      {
        label: '方法',
        title: 'AI Agent + AR 投影',
        body: '第一阶段用基于 Coze 平台搭建的 AI Agent 充当"导师"而不是代笔者，通过自然语言和图片识别提供讲解建议；第二阶段用自研的 AR 投影装置把元件位置和焊接顺序投在实体 PCB 板上，实时纠错。',
      },
      {
        label: '成果',
        title: '从电路图到能用的 PCB',
        body: '完成了从 Web 端 EDA 工具、Coze 智能体到 AR 焊接引导的完整技术闭环，让电子设计新手也能带着理解、而不只是照葫芦画瓢，完成一块真正可用的电路板。',
      },
    ],
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

// 标题逐字揭示用的行数据（放在模块级，引用稳定）
const heroHeadlineLines: SplitLine[] = ['在美学与逻辑之间，', '寻找答案。'];
const aboutHeadingLines: SplitLine[] = [
  '设计与工程，',
  [{ text: '始于人文关怀。', className: 'text-[#a39c8f]' }],
];
const worksHeadingLines: SplitLine[] = [
  [
    { text: '三个领域，' },
    { text: '同一双手。', className: 'text-[#a39c8f]' },
  ],
];

const RULE = '#d9d4c8';

type FeaturedProject = (typeof featuredProjects)[number];
const detailNumerals = ['壹', '贰', '叁', '肆'];

// 项目详情面板：跟英文版功能一致（点击展开四段式详情），
// 但视觉上完全按中文首页自己的细线+衬线体风格做，不套用英文版那套圆角卡片。
const ProjectDetailPanel = ({
  project,
  onClose,
}: {
  project: FeaturedProject | null;
  onClose: () => void;
}) => {
  useEffect(() => {
    if (!project) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label={project.title}>
          <motion.button
            type="button"
            aria-label="关闭详情"
            className="absolute inset-0 bg-[#171310]/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          <motion.aside
            key={project.title}
            className="absolute right-0 top-0 flex h-full w-full flex-col overflow-y-auto border-l bg-[#faf9f6] md:w-[560px]"
            style={{ borderColor: RULE }}
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b px-6 py-6 md:px-10" style={{ borderColor: RULE }}>
              <div>
                <div className="text-[13px] tracking-[0.08em] text-[#a39c8f]">项目笔记</div>
                <div className="mt-1 text-xs tracking-wide text-[#a39c8f]">{project.period}</div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="border px-3 py-1.5 text-xs tracking-wide text-[#8a8378] transition-colors hover:text-[#171310]"
                style={{ borderColor: RULE }}
              >
                关闭
              </button>
            </div>

            <div className="px-6 py-10 md:px-10">
              <h2 className="mb-3 font-serif text-3xl font-semibold leading-tight text-[#171310]">
                {project.title}
              </h2>
              <div className="mb-6 text-xs tracking-wide text-[#a39c8f]">{project.tags.join(' · ')}</div>
              <p className="mb-12 max-w-xl text-base font-light leading-[1.9] text-[#4a453e]">{project.desc}</p>

              <div className="space-y-10">
                {project.details.map((section, idx) => (
                  <div key={section.label} className="border-t pt-6" style={{ borderColor: RULE }}>
                    <div className="mb-3 flex items-baseline gap-3">
                      <span className="font-serif text-sm text-[#a39c8f]">{detailNumerals[idx]}</span>
                      <span className="text-xs tracking-[0.1em] text-[#a39c8f]">{section.label}</span>
                    </div>
                    <h3 className="mb-2 font-serif text-lg font-semibold text-[#171310]">{section.title}</h3>
                    <p className="text-[15px] font-light leading-[1.85] text-[#4a453e]">{section.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

const LandingZh = () => {
  const { isLoaded } = useLoading();
  const reduceMotion = useReducedMotion();
  const [showPriorEducation, setShowPriorEducation] = useState(false);
  const [activeQr, setActiveQr] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<FeaturedProject | null>(null);

  return (
    <div className="relative min-h-[100svh] w-full bg-[#faf9f6]">
      {/* Hero -- 版式借鉴古籍界栏/界行：细线把内容切成规整的栏目，
          左侧留一道窄的"界行"缺口，姓名、题眼、领域各占一行，
          线条在加载时"写入"展开，取代之前深色底的光斑/尘埃动效。 */}
      <section className="relative flex min-h-[100svh] flex-col px-6 pb-8 pt-24 md:px-16 md:pb-10 md:pt-28">
        <GuideLines />
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col">
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
                  <SplitText
                    lines={heroHeadlineLines}
                    active={isLoaded}
                    delay={0.55}
                    stagger={0.05}
                    duration={1}
                  />
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

              <h2 className="mb-12 font-serif text-3xl font-medium leading-[1.6] tracking-wide text-[#171310] md:mb-16 md:text-[44px]">
                <SplitText lines={aboutHeadingLines} inView stagger={0.045} />
              </h2>

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
                <Magnetic>
                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-2.5 py-3 text-xs font-bold tracking-wide text-[#171310] md:py-0"
                  >
                    联系我
                    <span className="h-px w-6 bg-[#171310] transition-all group-hover:w-9" />
                  </Link>
                </Magnetic>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-32 md:w-[180px]"
            >
              <ParallaxImage
                src="/profile.webp"
                alt="王睿鹏"
                className="aspect-[3/4] rounded-sm bg-[#e5e2dc]"
                imgClassName="grayscale-[15%]"
              />
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

          <h2 className="font-serif text-3xl font-medium tracking-wide text-[#171310] md:text-[44px]">
            <SplitText lines={worksHeadingLines} inView stagger={0.05} />
          </h2>

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
                  <Magnetic>
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
                  </Magnetic>
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
                  className="mt-5 py-3 text-xs tracking-wide text-[#a39c8f] underline md:py-0 decoration-[#d9d4c8] underline-offset-4 transition-colors hover:text-[#171310]"
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
            九个项目，<span className="text-[#a39c8f]">九次真实练习。</span>
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
                <button
                  type="button"
                  aria-haspopup="dialog"
                  aria-label={`查看${project.title}详情`}
                  onClick={() => setSelectedProject(project)}
                  className="group w-full text-left"
                >
                  <div className="mb-3 flex items-baseline justify-between gap-3">
                    <h3 className="font-serif text-xl font-semibold text-[#171310] transition-colors group-hover:text-[#8a8378]">
                      {project.title}
                    </h3>
                    <span className="shrink-0 text-xs tracking-wide text-[#a39c8f]">{project.period}</span>
                  </div>
                  <p className="mb-4 text-[15px] font-light leading-[1.85] text-[#4a453e]">{project.desc}</p>
                  <div className="mb-5 flex flex-wrap gap-x-3 gap-y-1 text-xs tracking-wide text-[#a39c8f]">
                    {project.tags.map((tag, ti) => (
                      <span key={tag}>
                        {tag}
                        {ti < project.tags.length - 1 && <span className="ml-3 text-[#d9d4c8]">·</span>}
                      </span>
                    ))}
                  </div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wide text-[#171310]">
                    查看详情
                    <span className="h-px w-5 bg-[#171310] transition-all group-hover:w-8" />
                  </div>
                </button>
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

      <ProjectDetailPanel project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
};

export default LandingZh;
