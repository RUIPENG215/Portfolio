import { Star, Code, Navigation, Thermometer, Gamepad2, Train } from 'lucide-react';
import type { Experience, ProjectSummary, Education, SkillGroup, Honor } from './types';

export const experiences: Experience[] = [
  {
    company: "Geely Auto",
    role: "Design & Manufacturing Intern",
    period: "2025.06 - 2025.07",
    description: [
      "Immersed in the complete automobile manufacturing ecosystem at Geely's production facility. Gained hands-on experience across the four major manufacturing workshops: Stamping, Welding, Painting, and Assembly.",
      "Collaborated with cross-functional teams to understand the synergy between design aesthetics and engineering constraints in mass production."
    ],
    achievement: {
      label: "Key Achievement",
      text: "Executed the exterior wheel hub design for the Geely Boyue L (FX11-A3), delivering final design proposals."
    }
  }
];

export const projectSummaries: ProjectSummary[] = [
  {
    title: "Metro Seat Support Research",
    period: "2025 - Present",
    description: "Engineering research on 3D-printed lightweight seat supports for Xi'an Metro Line 15. Utilizing topology optimization and additive manufacturing.",
    tags: ["3D Printing", "Topology Optimization", "CAD/CAE"],
    icon: <Train size={24} />,
    colorClass: "bg-blue-50",
    textColorClass: "text-blue-600",
    ongoing: true
  },
  {
    title: "Hequ Restaurant",
    period: "Apr - Jun 2025",
    description: "Immersive VR simulation game built with Unity. Designed core gameplay mechanics and environmental interactions for PICO VR hardware.",
    tags: ["Unity", "VR/XR"],
    icon: <Gamepad2 size={24} />,
    colorClass: "bg-indigo-50",
    textColorClass: "text-indigo-600"
  },
  {
    title: "RnB Expressions",
    period: "Dec 2024 - Jan 2025",
    description: "Created a dynamic sticker pack using After Effects. Defined character motion guidelines and animation style matching RnB culture.",
    tags: ["After Effects", "Animation"],
    icon: <Star size={24} />,
    colorClass: "bg-pink-50",
    textColorClass: "text-pink-600"
  },
  {
    title: "What to Eat",
    period: "Sep - Dec 2024",
    description: "Developed a restaurant selector web app with JavaScript. Implemented \"gacha\" mechanics and integrated restaurant data APIs.",
    tags: ["JavaScript", "Frontend"],
    icon: <Code size={24} />,
    colorClass: "bg-blue-50",
    textColorClass: "text-blue-600"
  },
  {
    title: "Smart Thermal Jacket",
    period: "Sep - Dec 2024",
    description: "An IoT-driven wearable system utilizing Bluetooth Mesh to synchronize real-time sensor data, weather APIs, and user preferences for autonomous temperature regulation.",
    tags: ["IoT", "Bluetooth Mesh", "App Development", "Sensor Fusion"],
    icon: <Thermometer size={24} />,
    colorClass: "bg-orange-50",
    textColorClass: "text-orange-600"
  },
  {
    title: "iHarbour Smart Bus System",
    period: "Oct - Dec 2025",
    description: "A Product-Service System (PSS) design optimizing campus transit through user demand research, new route planning, and an integrated management application.",
    tags: ["PSS Design", "Service Design", "UI/UX", "System Architecture"],
    icon: <Navigation size={24} />,
    colorClass: "bg-emerald-50",
    textColorClass: "text-emerald-600"
  }
];

export const education: Education[] = [
  {
    school: "Xi'an Jiaotong University",
    degree: "Bachelor of Engineering",
    major: "Industrial Design",
    period: "2022 - Present",
    logo: "/logos/xjtu-logo.webp",
    logoScale: 1.0
  },
  {
    school: "Politecnico di Milano",
    degree: "Bachelor of Engineering",
    major: "Industrial Product Engineering (Double Degree)",
    period: "2022 - Present",
    logo: "/logos/polimi-logo.webp",
    logoScale: 1.1
  },
  {
    school: "East China University of Science and Technology",
    major: "Process Equipment and Control Engineering",
    period: "2018 - 2020",
    logo: "/logos/ecust-logo.webp",
    logoScale: 0.91,
    isSecondary: true
  }
];

export const skillGroups: SkillGroup[] = [
  {
    category: "Product Design & User Experience",
    skills: [
      "End-to-End Design: User research, conceptual sketching, form aesthetics, solution implementation",
      "User Experience: Persona development, journey mapping, usability testing, experience optimization",
      "Design Thinking: Double Diamond model, competitive analysis, innovative solutions",
      "Expert Tools: SolidWorks, Alias, Keyshot, Figma, Adobe Suite, Prototyping"
    ]
  },
  {
    category: "Mechanical Engineering & Manufacturing",
    skills: [
      "Structural Engineering: Structural design, engineering drafting, SolidWorks, mechanical analysis",
      "Simulation & Optimization: FEA (ANSYS/Abaqus), topology optimization, structural iteration",
      "Advanced Manufacturing: 3D Printing (FDM/FRP), composite material design & processing",
      "Data & Computation: MATLAB, data visualization, parametric analysis, technical documentation"
    ]
  },
  {
    category: "Electronics, IoT & Communication",
    skills: [
      "Embedded Systems: Arduino, STM32, ESP32 programming, peripheral driver development",
      "Hardware Design: Schematic design, PCB/FPC layout, hardware prototype assembly",
      "IoT & Networking: WiFi/Bluetooth/Zigbee, communication protocols, smart home linkage",
      "Sensor Fusion: Data acquisition & processing, IoT system architecture, hardware debugging"
    ]
  },
  {
    category: "Digital Product & Creative Coding",
    skills: [
      "Frontend Development: HTML/CSS/JavaScript, responsive web design, interactive effects",
      "Programming Languages: C (hardware logic), C# (Unity), JavaScript (frontend), Python (computer vision, data processing)",
      "Interactive Media: Unity 3D development, XR interaction, virtual prototyping & gamified design"
    ]
  },
  {
    category: "Visual Communication & Multimedia",
    skills: [
      "Video & Motion: Premiere Pro, After Effects, pacing control, narrative expression",
      "Visual Output: Portfolio production, design visualization, dynamic presentation creation",
      "Graphic Design:Print layout, typography, poster design, visual system, information graphic design"
    ]
  },
  {
    category: "Integrated Practice & Interests",
    skills: [
      "3C Product Exploration: 3C product research, technical teardown, trend insight, Hardware-software integration analysis, user experience",
      "Automotive & Mobility: Automotive structure, vehicle dynamics, motorsport technology",
      "Interdisciplinary Synergy: Design-Mechanical-Electrical-Software integration, Cross-domain collaboration"
    ]
  }
];

export const honors: Honor[] = [
  {
    title: "Second Class Scholarship",
    org: "Joint Design School (College Level)",
    year: "2024-2025"
  },
  {
    title: "Second Class Scholarship",
    org: "Joint Design School (College Level)",
    year: "2023-2024"
  },
  {
    title: "3rd Prize, \"Tengfei Cup\"",
    org: "XJTU Innovation Track",
    year: "2022-2023"
  },
  {
    title: "Third Class Scholarship",
    org: "Xi'an Jiaotong University",
    year: "2022-2023"
  }
];
