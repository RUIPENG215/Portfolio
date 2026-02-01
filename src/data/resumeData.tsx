import { Zap, Star, Code, Cpu } from 'lucide-react';
import type { ReactNode } from 'react';

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  achievement?: {
    label: string;
    text: string;
  };
}

export interface ProjectSummary {
  title: string;
  period: string;
  description: string;
  tags: string[];
  icon: ReactNode;
  colorClass: string;
  textColorClass: string;
  ongoing?: boolean;
}

export interface Education {
  school: string;
  degree?: string;
  major?: string;
  period: string;
  logo?: string;
  logoScale?: number;
  isSecondary?: boolean;
}

export interface SkillGroup {
  category: string;
  skills: { name: string; level: number }[];
  description?: string;
}

export interface Honor {
  title: string;
  org: string;
  year?: string;
}

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
    period: "2024 - Present",
    description: "Engineering research on 3D-printed lightweight seat supports for Xi'an Metro Line 15. Utilizing topology optimization and additive manufacturing.",
    tags: ["3D Printing", "Topology Optimization", "CAD/CAE"],
    icon: <Cpu size={24} />,
    colorClass: "bg-blue-50",
    textColorClass: "text-blue-600",
    ongoing: true
  },
  {
    title: "Hequ Restaurant",
    period: "Apr - Jun 2025",
    description: "Immersive VR simulation game built with Unity. Designed core gameplay mechanics and environmental interactions for PICO VR hardware.",
    tags: ["Unity", "VR/XR"],
    icon: <Zap size={24} />,
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
    title: "Advanced Tech Research",
    period: "Ongoing",
    description: "Ongoing exploration in Thermal Comfort (Arduino), Ansys Fluent CFD, and Computer Vision. Focused on integrating simulation data with physical prototypes.",
    tags: ["Hardware", "Simulation", "OpenCV"],
    icon: <Cpu size={24} />,
    colorClass: "bg-purple-50",
    textColorClass: "text-purple-600",
    ongoing: true
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
    category: "Design & Visualization",
    description: "Proficient in design thinking and user-centric methodologies. Experienced in leading design teams to deliver high-quality creative solutions.",
    skills: [
      { name: 'Solidworks', level: 90 },
      { name: 'Rhino/Grasshopper', level: 85 },
      { name: 'Keyshot', level: 85 },
      { name: 'Alias', level: 75 },
      { name: 'Figma', level: 80 },
      { name: 'Adobe Suite', level: 90 }
    ]
  },
  {
    category: "Development & Engineering",
    description: "Strong foundation in mechanical engineering and frontend development. Skilled in bridging the gap between physical prototypes and digital systems.",
    skills: [
      { name: 'React/TypeScript', level: 85 },
      { name: 'Node.js', level: 75 },
      { name: 'Unity', level: 80 },
      { name: 'Arduino/ESP32', level: 85 },
      { name: 'ROS', level: 70 },
      { name: 'OpenFOAM/Ansys', level: 75 }
    ]
  },
  {
    category: "AI & Specialized",
    description: "Focusing on the intersection of AI and human-computer interaction. Expert in leveraging LLMs and CV for innovative design automation.",
    skills: [
      { name: 'LLM Agents', level: 85 },
      { name: 'AR Projection', level: 80 },
      { name: 'Computer Vision', level: 75 },
      { name: 'Topology Optimization', level: 85 }
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
