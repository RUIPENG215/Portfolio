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
  degree: string;
  period: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
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
    title: "Tech Research",
    period: "Ongoing",
    description: "Multidisciplinary research including Thermal Comfort (Arduino), PCB Design, Ansys Fluent Simulation, and Computer Vision (OpenCV).",
    tags: ["Hardware", "Simulation"],
    icon: <Cpu size={24} />,
    colorClass: "bg-white/10",
    textColorClass: "text-purple-300",
    ongoing: true
  }
];

export const education: Education[] = [
  {
    school: "Xi'an Jiaotong Univ.",
    degree: "Industrial Design",
    period: "2022 - Present"
  },
  {
    school: "Politecnico di Milano",
    degree: "Ind. Prod. Engineering",
    period: "2022 - Present"
  },
  {
    school: "ECUST",
    degree: "Process Engineering",
    period: "2018 - 2020"
  }
];

export const skillGroups: SkillGroup[] = [
  {
    category: "Design",
    skills: ['Solidworks', 'Keyshot', 'Alias', 'Figma', 'Rhino']
  },
  {
    category: "Dev & Creative",
    skills: ['Unity', 'React', 'Arduino', 'Adobe Suite']
  }
];

export const honors: Honor[] = [
  {
    title: "3rd Prize, \"Tengfei Cup\"",
    org: "2022-2023 Innovation Track"
  },
  {
    title: "Third Class Scholarship",
    org: "Xi'an Jiaotong University"
  },
  {
    title: "Second Class Scholarship",
    org: "Joint Design School"
  }
];
