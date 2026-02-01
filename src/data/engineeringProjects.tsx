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
    subtitle: "Metro Seat Support Engineering",
    tech: ["MATLAB", "ANSYS", "3D Printing", "Composite Materials"],
    description: "Lightweight design and engineering application of subway seat supports for Xi'an Metro Line 15. Integrating composite topology optimization with additive manufacturing.",
    icon: <Cpu size={40} />,
    status: "RESEARCH",
    time: "2023.09 - PRESENT",
    content: [
      {
        type: 'text-full',
        title: "// PROJECT OVERVIEW",
        content: "This research combines industrial design with advanced manufacturing, utilizing 3D printing and topology optimization to design a new lightweight train seat support. The goal is to maximize the stiffness-to-weight ratio while releasing physical space under the seat for diverse passenger needs."
      },
      {
        type: 'text-and-image',
        title: "// TOPOLOGY OPTIMIZATION",
        content: "Implemented the SIMP (Solid Isotropic Material with Penalization) method for multi-material topology optimization. Iterative design targeting 'structural lightweighting' and 'space maximization' was validated using ANSYS mechanical simulations, achieving significant weight reduction while maintaining structural integrity.",
        src: "https://placehold.co/800x600/f8f9fa/4f46e5?text=Topology+Optimization+Analysis",
        imageLeft: false
      },
      {
        type: 'text-full',
        title: "// ENGINEERING VALIDATION",
        content: "Prototypes are manufactured using fiber-reinforced composite 3D printing. Performance is verified through experimental analysis under static and impact loads, ensuring the engineering feasibility of the design scheme in real-world rail transit environments."
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
    time: "2024.09 - 2024.12",
    content: [
      {
        type: 'text-full',
        title: "// ALGORITHM DESIGN",
        content: "Implemented a hybrid path planning strategy. Global path is generated using an optimized A* search on an occupancy grid, while local avoidance is handled by DWA (Dynamic Window Approach) to account for robot kinematics."
      }
    ]
  },
  {
    id: 4,
    title: "SparkPilot AI-AR System",
    subtitle: "Interactive Learning Platform",
    tech: ["React", "Node.js", "OpenAI API", "AR Projection"],
    description: "An end-to-end hardware education system that combines AI-driven circuit design assistance with AR-guided soldering instructions.",
    icon: <Cpu size={40} />,
    status: "PROTOTYPE",
    time: "2024.11 - 2024.12",
    content: [
      {
        type: 'text-full',
        title: "// SYSTEM ARCHITECTURE",
        content: "SparkPilot utilizes a custom-built React frontend for interactive circuit exploration. The backend integrates with OpenAI's GPT-4o to analyze user requirements and generate real-time circuit logic and BOM (Bill of Materials)."
      },
      {
        type: 'text-and-image',
        title: "// AR GUIDANCE ENGINE",
        content: "The AR component uses computer vision to track the PCB position and projects dynamic soldering guides directly onto the physical board, highlighting the next component to be placed.",
        src: "https://placehold.co/800x600/1e293b/f97316?text=AR+Projection+Logic",
        imageLeft: true
      }
    ]
  },
  {
    id: 5,
    title: "AeroVertex Docking Interface",
    subtitle: "Urban Air Mobility",
    tech: ["Rhino/Grasshopper", "Robotics", "Mechanical Design"],
    description: "Design and simulation of a robotic arm system for capturing and docking eVTOL aircraft in underutilized urban high-rise spaces.",
    icon: <Wind size={40} />,
    status: "DESIGN PHASE",
    time: "2024.12 - PRESENT",
    content: [
      {
        type: 'text-full',
        title: "// DESIGN RATIONALE",
        content: "Addressing the space constraints of urban drone landing pads by utilizing building 'dead zones'. The system features a multi-degree-of-freedom mechanical arm that captures aircraft mid-air and safely docks them."
      }
    ]
  },
  {
    id: 6,
    title: "Computer Vision & Hardware",
    subtitle: "Advanced Tech Research",
    tech: ["OpenCV", "Arduino", "Thermal Simulation"],
    description: "Ongoing exploration in Thermal Comfort (Arduino), Ansys Fluent CFD, and Computer Vision. Focused on integrating simulation data with physical prototypes.",
    icon: <Cpu size={40} />,
    status: "RESEARCH",
    time: "2024 - PRESENT",
    content: [
      {
        type: 'text-full',
        title: "// RESEARCH FOCUS",
        content: "Exploring the integration of real-time sensor data with high-fidelity simulations to create responsive physical environments."
      }
    ]
  }
];
