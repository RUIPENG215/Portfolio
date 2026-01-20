import type { ReactNode } from 'react';
import { Cpu, Wind, Code, Globe } from 'lucide-react';
import type { ContentBlock } from './types';

export interface EngineeringProjectData {
  id: number;
  title: string;
  subtitle: string;
  tech: string[];
  description: string;
  icon: ReactNode;
  status: 'COMPLETED' | 'ANALYSIS' | 'DEPLOYED' | string;
  time: string;
  content: ContentBlock[];
}

export const engineeringProjects: EngineeringProjectData[] = [
  {
    id: 0,
    title: "Personal Portfolio Website",
    subtitle: "Frontend Development",
    tech: ["React 19", "TypeScript", "Tailwind CSS", "Framer Motion"],
    description: "A modern, responsive portfolio platform built from scratch. Features component-driven architecture, seamless page transitions, and a custom design system.",
    icon: <Globe size={40} />,
    status: "LIVE",
    time: "2025.01 - PRESENT",
    content: [
      {
        type: 'text-full',
        title: "// ARCHITECTURE & TECH STACK",
        content: "Built on the Vite ecosystem for optimal performance. The application utilizes React 19 for the UI layer and TypeScript for type safety. Routing is handled by React Router v6 with a custom animated transition wrapper."
      },
      {
        type: 'text-and-image',
        title: "// DESIGN SYSTEM IMPLEMENTATION",
        content: "I developed a custom utility-first design system using Tailwind CSS. The interface features a minimalist aesthetic with 'JetBrains Mono' for technical elements. Framer Motion powers the complex enter/exit animations and layout shifts.",
        src: "https://placehold.co/800x600/1e293b/4f46e5?text=Code+Structure",
        imageLeft: true
      },
      {
        type: 'text-full',
        title: "// ENGINEERING CHALLENGES",
        content: "Key challenges included designing a flexible data structure to render diverse project layouts (grid, full-width, text-image) dynamically without code duplication. The 'PageWrapper' component manages scroll restoration and animation lifecycles."
      }
    ]
  },
  {
    id: 1,
    title: "Composite Topology Optimization",
    subtitle: "Graduation Project",
    tech: ["MATLAB", "ANSYS", "Python"],
    description: "Algorithm development for optimizing material distribution in composite structures to maximize stiffness-to-weight ratio.",
    icon: <Cpu size={40} />,
    status: "COMPLETED",
    time: "2023.09 - 2024.06",
    content: [
      {
        type: 'text-full',
        title: "// SYSTEM OVERVIEW",
        content: "This research focused on implementing the SIMP (Solid Isotropic Material with Penalization) method for multi-material topology optimization. The algorithm was validated using ANSYS mechanical simulations."
      },
      {
        type: 'text-and-image',
        title: "// SIMULATION ANALYSIS",
        content: "The optimized design showed a 15% weight reduction while maintaining structural integrity. The stress distribution was analyzed across 10,000+ iterations.",
        src: "https://placehold.co/800x600/0d1117/58a6ff?text=Simulation+Result",
        imageLeft: false
      },
      {
        type: 'quote',
        text: "Optimization is the bridge between imagination and physical reality.",
        author: "Engineering Lead"
      }
    ]
  },
  {
    id: 2,
    title: "Fluid Simulation (CFD)",
    subtitle: "Biomedical Engineering",
    tech: ["OpenFOAM", "C++", "ParaView"],
    description: "Simulation of laminar flow in micro-channels for biomedical applications, analyzing shear stress on cell walls.",
    icon: <Wind size={40} />,
    status: "ANALYSIS",
    time: "2024.03 - 2024.08",
    content: [
      {
        type: 'text-full',
        title: "// CFD WORKFLOW",
        content: "Implemented a custom solver in OpenFOAM to handle non-Newtonian fluid characteristics of blood. Mesh sensitivity analysis was performed to ensure accuracy."
      }
    ]
  },
  {
    id: 3,
    title: "Autonomous Path Planning",
    subtitle: "Robotics Research",
    tech: ["ROS", "Python", "Lidar"],
    description: "Development of a real-time obstacle avoidance algorithm using A* and Dynamic Window Approach (DWA).",
    icon: <Code size={40} />,
    status: "DEPLOYED",
    time: "2024.10 - PRESENT",
    content: [
      {
        type: 'text-full',
        title: "// ALGORITHM DESIGN",
        content: "The system integrates sensory data from 2D Lidar and IMU to create a local costmap. The A* algorithm provides global paths while DWA handles local dynamics."
      }
    ]
  }
];
