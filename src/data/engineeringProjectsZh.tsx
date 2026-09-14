import { Cpu, Wind, Code, Globe } from 'lucide-react';
import type { ProjectData } from './types';

// 工程项目详情页的中文数据源：与 engineeringProjects.tsx 一一对应（相同 id），
// 但标题/描述/正文都是重新撰写的中文表达，不是逐句翻译。
// tech 数组保留原始工具/技术名称（React、COMSOL 等专有名词不翻译）。
export const engineeringProjectsZh: ProjectData[] = [
  {
    id: 0,
    title: '个人作品集网站',
    subtitle: '架构设计与前端工程',
    tech: ['React 19', 'Vite', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    description: '一个高性能、响应式的作品集平台，包含自建的设计系统、动态内容渲染引擎和流畅的动效交互。',
    icon: <Globe size={40} />,
    status: '已上线',
    time: '2025.01 - 至今',
    content: [
      {
        type: 'text-full',
        title: '// 技术栈与架构',
        content:
          "基于 React 19 与 Vite 生态搭建，这个项目同时看重开发体验和终端用户的加载性能。\n\n- TypeScript 核心：严格的类型检查保证了复杂数据结构与组件 props 在迭代中的稳定性。\n- 组件化设计：应用原子设计（Atomic Design）原则，构建可复用的 UI 元素。\n- 性能优先：借助 Vite 极速的 HMR 与优化后的构建流程，实现毫秒级的加载体验。",
        marginBottom: 'medium',
      },
      {
        type: 'text-full',
        title: '// 动态内容引擎',
        content:
          "页面的核心是一套 'BlockRenderer' 内容渲染系统，让每个页面都由数据驱动，而不是手写死代码。我设计了一套结构化的内容 schema，支持多种区块类型：\n\n- 布局区块：text-full（纯文字）、text-and-image（图文）、image-grid（图片网格）、image-full（通栏图片）。\n- 交互区块：支持视频、引用和自定义动效。\n- 数据分离：所有项目内容都存放在独立的 TypeScript 数据文件中，方便后续更新和维护。",
        marginBottom: 'medium',
      },
      {
        type: 'text-full',
        title: '// 设计系统与动效',
        content:
          "整体视觉语言融合了极简主义和工程感的精确。\n\n- Tailwind CSS：自定义配置定义了品牌的色板、间距和字体系统（技术性内容使用 JetBrains Mono 等宽字体）。\n- Framer Motion：驱动一套统一的动效系统，包括页面转场、列表错位进场动画，以及不破坏布局稳定性的精细 hover 状态。\n- 响应式工程：每个组件都遵循移动优先原则开发，保证在各种设备尺寸下都有一致的体验。",
        marginBottom: 'medium',
      },
    ],
  },
  {
    id: 1,
    title: '复合材料拓扑优化',
    subtitle: '地铁座椅支架工程',
    tech: ['COMSOL Multiphysics', 'FEA', '3D 打印', '复合材料'],
    description: '面向西安地铁 15 号线的座椅支架轻量化设计与工程实现，结合复合材料拓扑优化与高级有限元仿真。',
    icon: <Cpu size={40} />,
    status: '研究中',
    time: '2025.04 - 至今',
    content: [
      {
        type: 'text-full',
        title: '// 项目概述与仿真',
        content:
          '这项研究把工业设计与先进制造结合起来，用 COMSOL Multiphysics 完成复杂的拓扑优化。目标是在保证结构强度和乘坐舒适性的前提下，最大化地铁座椅支架的刚重比。\n\n- 多物理场建模：用 COMSOL 仿真复合材料特性与结构载荷之间的相互作用。\n- 轻量化工程：采用基于密度的拓扑优化方法，在不牺牲安全标准的前提下减少材料用量。',
        marginBottom: 'medium',
      },
      {
        type: 'text-full',
        title: '// 有限元分析（FEA）',
        content:
          '通过一套严谨的 FEA 流程，在真实工况下验证设计性能。\n\n- 静力分析：评估结构在标准乘客载荷和峰值冲击力下的响应。\n- 模态分析：识别结构固有频率，避免在地铁车厢环境中发生共振。\n- 应力分布：绘制 Von Mises 应力云图，定位并加强优化几何中的潜在薄弱点。',
        marginBottom: 'medium',
      },
      {
        type: 'text-full',
        title: '// 工程验证',
        content:
          '通过高精度制造工艺，把优化后的数字模型转化为实体样件。\n\n- 复合材料 3D 打印：使用纤维增强材料，还原仿真中设定的正交各向异性材料属性。\n- 结构测试：将实测的载荷-变形数据与 FEA 预测结果比对，验证仿真模型的准确性。',
        marginBottom: 'medium',
      },
    ],
  },
  {
    id: 2,
    title: '流体仿真（CFD）',
    subtitle: '医疗设备散热系统分析',
    tech: ['ANSYS Fluent', 'CFD', 'ParaView'],
    description: '针对一套专用骨科病房散热系统，分析气流模式与静压分布。',
    icon: <Wind size={40} />,
    status: '分析中',
    time: '2025.01 - 2025.04',
    content: [
      {
        type: 'text-full',
        title: '// CFD 流程与热管理',
        content:
          "这项仿真是「生物自适应微气候」系统（设计项目 5）中不可或缺的一环。我用 ANSYS Fluent 分析了病床通风系统的散热效率。\n\n- 气流形态分析：可视化速度矢量场与流线，确保患者皮肤表面获得均匀的冷却覆盖。\n- 静压分布：优化风道几何形状与风扇选型，在保持低噪音、高效散热的同时维持稳定气压。",
        marginBottom: 'medium',
      },
      {
        type: 'text-full',
        title: '// 工程验证',
        content:
          '仿真结果为散热系统的硬件设计提供了关键数据支撑。\n\n- 湍流建模：采用 K-epsilon 湍流模型，精确预测皮肤-空气交界面的换热系数。\n- 设计迭代：基于压降分析重新设计微喷嘴阵列后，CFD 结果显示气流均匀性提升了 20%。',
        marginBottom: 'medium',
      },
    ],
  },
  {
    id: 3,
    title: 'PCB 设计与原型制作',
    subtitle: '可穿戴健康监测系统',
    tech: ['EasyEDA', 'FPC 柔性电路', 'Arduino', 'SMD 贴片工艺'],
    description: '把一款健康监测原型从 Arduino 面包板电路，转化为紧凑的柔性电路（FPC）可穿戴系统。',
    icon: <Code size={40} />,
    status: '原型阶段',
    time: '2025.01 - 2025.04',
    content: [
      {
        type: 'text-full',
        title: '// 从原型到产品',
        content:
          "作为「生物自适应微气候」（设计项目 5）的一部分，我主导了硬件从笨重的 Arduino 概念验证电路，到专业可穿戴方案的转化过程。\n\n- 原理图设计：用 EasyEDA 把面包板上复杂的传感器网络（GSR 皮电、皮肤湿度）转化为优化后的正式原理图。\n- 形态优化：将系统体积压缩了 70%，保证佩戴舒适、不引人注意。",
        marginBottom: 'medium',
      },
      {
        type: 'text-full',
        title: '// 柔性电路技术与制造',
        content:
          '为满足可穿戴医疗设备对柔性的要求，项目采用了柔性印刷电路（FPC）技术。\n\n- 柔性层叠设计：设计双层 FPC 结构，让设备能够贴合患者肢体弯曲，同时不牺牲信号完整性。\n- 元器件选型：从传统直插元件迁移到 SMD 贴片封装，实现更纤薄的外形。\n- 原型制作与组装：独立完成从 Gerber 文件生成、专业 PCB 打样，到首批测试样机手工贴片焊接的全流程。',
        marginBottom: 'medium',
      },
    ],
  },
  {
    id: 4,
    title: '逆运动学与机器人控制',
    subtitle: '机械臂运动规划',
    tech: ['MATLAB Robotics Toolbox', '逆运动学', 'C++', 'MCU'],
    description: '为自主机械臂开发运动控制系统，用 MATLAB 完成运动学建模，用 MCU 驱动实体硬件。',
    icon: <Code size={40} />,
    status: '进行中',
    time: '2025.06 - 至今',
    content: [
      {
        type: 'text-full',
        title: '// 机器人运动学与建模',
        content:
          "作为「AeroVertex」（设计项目 7）的核心技术模块，这个项目聚焦于寄生式对接机械臂的精确运动控制。我用 MATLAB Robotics Toolbox 搭建了机械臂的高精度 DH 参数模型。\n\n- 运动学分析：求解复杂的逆运动学（IK）方程，把目标对接坐标转化为精确的关节角度。\n- 轨迹规划：在关节空间中生成平滑、无碰撞的运动路径，确保在不同环境条件下都能稳定捕获 eVTOL 飞行器。",
        marginBottom: 'medium',
      },
      {
        type: 'text-full',
        title: '// 硬件驱动与 MCU 实现',
        content:
          '从数学模型到实体运动，靠一套专门的嵌入式控制系统来实现。\n\n- MCU 集成：把运动控制算法部署到微控制器（MCU）上，驱动高精度舵机。\n- 实时执行：用 C++ 处理实时反馈回路与信号处理，让实体机械臂以最小延迟贴合仿真轨迹。\n- 持续开发中：系统目前正在进行实体测试与标定。敬请期待。',
        marginBottom: 'medium',
      },
    ],
  },
  {
    id: 5,
    title: 'SparkPilot AI-AR 系统',
    subtitle: '交互式学习平台',
    tech: ['React', 'Coze AI 平台', 'WebAR', '计算机视觉', 'Node.js'],
    description: '一套端到端的硬件教育系统，结合 AI 驱动的电路设计辅助与 AR 引导焊接指导。',
    icon: <Cpu size={40} />,
    status: '已完成',
    time: '2025.10 - 2026.01',
    externalLink: 'https://github.com/RUIPENG215/SparkPilot',
    content: [
      {
        type: 'text-full',
        title: '// 系统架构与集成',
        content:
          'SparkPilot 基于现代全栈架构搭建，为实时教学互动而设计。\n\n- 前端框架：使用 React 18+ 构建响应式、高性能的网页版 EDA 环境。\n- 通信层：集成 WebSocket / REST API，实现网页 IDE 与 AI 后端之间的无缝数据交换。\n- 技术流程：通过同步的数据流，打通数字原理图逻辑与实体硬件落地之间的鸿沟。',
        marginBottom: 'medium',
      },
      {
        type: 'text-full',
        title: '// 多模态 AI Agent（Coze）',
        content:
          '系统的核心是基于 Coze 平台搭建的 AI Agent，利用多模态大模型处理复杂的工程数据。\n\n- 多模态处理：能够理解自然语言提问，分析电路图（JPG/PNG），并解析元器件数据手册（PDF）。\n- 上下文知识库：注入了精心整理的电子工程文档，提供准确且符合教学逻辑的指导。\n- 逻辑校验：自动检查用户设计的原理图是否符合最佳实践，并给出实时反馈与优化建议。',
        marginBottom: 'medium',
      },
      {
        type: 'text-full',
        title: '// WebAR 与投影系统',
        content:
          'AR 引导系统基于 WebAR 实现，无需安装即可在浏览器中运行，核心是精确的视觉对齐与清晰的指引呈现。\n\n- 投影映射：在数字设计数据与实体 PCB 坐标之间做动态坐标变换，生成视觉叠加层。\n- 低延迟渲染：优化后的渲染管线，确保焊接指引和元件高亮在实体组装过程中始终精确对齐。\n- 面向未来的可扩展性：目前实时计算机视觉（CV）与姿态估计尚未完全实现，但系统架构已经预留了 CV 集成接口，为未来实现自动化元件追踪与对齐留出扩展空间。',
        marginBottom: 'medium',
      },
    ],
  },
  {
    id: 6,
    title: '计算机视觉与 AR 可视化',
    subtitle: '车道检测系统研究',
    tech: ['OpenCV', 'Python', 'Unity', 'C#', 'TCP/IP Socket'],
    description: '一套跨平台计算机视觉系统，实现实时车道检测与基于 AR 的可视化，服务于汽车安全场景。',
    icon: <Cpu size={40} />,
    status: '原型阶段',
    time: '2025.05 - 2025.08',
    content: [
      {
        type: 'text-full',
        title: '// 技术框架',
        content:
          "作为「MTA-CoDrive」（设计项目 6）的核心技术研究模块，这个项目实现了从原始视频采集到 AR 叠加显示的完整数据管线。\n\n- 数据采集：高速摄像头实时采集视频流用于分析。\n- 数据处理（Python / OpenCV）：视频帧依次经过灰度化、高斯模糊和 Canny 边缘检测，再通过 ROI 掩膜和霍夫变换提取车道线，随后进行直线拟合与方向判断。\n- 数据传输：通过高性能 Socket TCP/IP 通信，输出'车道关键点（Unity 世界坐标）+ 车道方向'数据。",
        marginBottom: 'medium',
      },
      {
        type: 'text-full',
        title: '// AR 可视化与渲染（Unity）',
        content:
          "可视化层基于 Unity 搭建，为驾驶员提供直观的 AR 体验。\n\n- 数据解析：Unity 端通过 TCP/IP 接收坐标数据，并解析到三维空间中。\n- AR 叠加：用 'LineRenderer' 生成动态引导线，用 'WebCamTexture' 渲染摄像头画面作为背景。\n- 最终呈现：通过手动纹理混合，实现'摄像头画面 + AR 引导线'的无缝叠加，为车道位置提供实时视觉反馈。",
        marginBottom: 'medium',
      },
    ],
  },
];
