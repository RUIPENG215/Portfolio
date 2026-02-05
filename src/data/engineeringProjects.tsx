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
  status: 'COMPLETED' | 'ANALYSIS' | 'DEPLOYED' | 'PROTOTYPE' | 'DESIGN PHASE' | 'RESEARCH' | string;
  time: string;
  externalLink?: string;
  content: ContentBlock[];
}

export const engineeringProjects: EngineeringProjectData[] = [
  {
    id: 0,
    title: "Personal Portfolio Website",
    subtitle: "Architecture & Frontend Engineering",
    tech: ["React 19", "Vite", "TypeScript", "Tailwind CSS", "Framer Motion"],
    description: "A high-performance, responsive portfolio platform featuring a custom-built design system, dynamic content rendering engine, and fluid motion interactions.",
    icon: <Globe size={40} />,
    status: "LIVE",
    time: "2025.01 - PRESENT",
    content: [
      {
        type: 'text-full',
        title: "// TECH STACK & ARCHITECTURE",
        content: "Built with the modern React 19 and Vite ecosystem, this project prioritizes developer experience and end-user performance. \n\n- TypeScript Core: Strict type-checking ensures stability across complex data structures and component props.\n- Component-Driven Design: Atomic design principles are applied to create reusable UI elements.\n- Performance First: Leverages Vite's fast HMR and optimized build process for lightning-fast load times.",
        marginBottom: 'medium'
      },
      {
        type: 'text-full',
        title: "// DYNAMIC CONTENT ENGINE",
        content: "A central 'BlockRenderer' system enables flexible, data-driven page layouts. Instead of hardcoding pages, I designed a structured content schema that supports various block types:\n\n- Layout Blocks: text-full, text-and-image, image-grid, and image-full.\n- Interactive Blocks: Support for video, quotes, and custom animations.\n- Data Separation: All project content is stored in decoupled TypeScript data files, allowing for easy updates and maintenance.",
        marginBottom: 'medium'
      },
      {
        type: 'text-full',
        title: "// DESIGN SYSTEM & MOTION",
        content: "The aesthetic is a blend of minimalism and technical precision.\n\n- Tailwind CSS: A custom configuration defines the brand's color palette, spacing, and typography (JetBrains Mono for technical elements).\n- Framer Motion: Powers a cohesive animation system, including page transitions, stagger-entry lists, and sophisticated hover states that maintain layout stability.\n- Responsive Engineering: Every component is engineered with a mobile-first approach, ensuring a seamless experience across all device sizes.",
        marginBottom: 'medium'
      }
    ]
  },
  {
    id: 1,
    title: "Composite Topology Optimization",
    subtitle: "Metro Seat Support Engineering",
    tech: ["COMSOL Multiphysics", "FEA", "3D Printing", "Composite Materials"],
    description: "Lightweight design and engineering application of subway seat supports for Xi'an Metro Line 15. Integrating composite topology optimization with advanced FEA simulations.",
    icon: <Cpu size={40} />,
    status: "RESEARCH",
    time: "2025.04 - PRESENT",
    content: [
      {
        type: 'text-full',
        title: "// PROJECT OVERVIEW & SIMULATION",
        content: "This research combines industrial design with advanced manufacturing, utilizing COMSOL Multiphysics for complex topology optimization. The goal is to maximize the stiffness-to-weight ratio for subway seat supports, ensuring both structural integrity and passenger comfort.\n\n- Multiphysics Modeling: Utilizing COMSOL to simulate the interaction between composite material properties and structural loads.\n- Lightweight Engineering: Implementing density-based topology optimization to reduce material usage without compromising safety standards.",
        marginBottom: 'medium'
      },
      {
        type: 'text-full',
        title: "// FINITE ELEMENT ANALYSIS (FEA)",
        content: "A rigorous FEA workflow is implemented to validate the design performance under real-world operating conditions.\n\n- Static Analysis: Evaluating structural response under standard passenger loads and peak impact forces.\n- Modal Analysis: Identifying natural frequencies to avoid resonance within the subway car environment.\n- Stress Distribution: Mapping Von Mises stress to identify and reinforce potential weak points in the optimized geometry.",
        marginBottom: 'medium'
      },
      {
        type: 'text-full',
        title: "// ENGINEERING VALIDATION",
        content: "The transition from optimized digital models to physical prototypes is achieved through high-precision manufacturing.\n\n- Composite 3D Printing: Utilizing fiber-reinforced materials to match the simulated orthotropic properties.\n- Structural Testing: Comparing experimental load-deflection data with FEA predictions to verify the accuracy of the simulation model.",
        marginBottom: 'medium'
      }
    ]
  },
  {
    id: 2,
    title: "Fluid Simulation (CFD)",
    subtitle: "Medical Device Cooling System Analysis",
    tech: ["ANSYS Fluent", "CFD", "ParaView"],
    description: "Simulation and analysis of airflow patterns and static pressure distribution for a specialized orthopedic ward cooling system.",
    icon: <Wind size={40} />,
    status: "ANALYSIS",
    time: "2025.01 - 2025.04",
    content: [
      {
        type: 'text-full',
        title: "// CFD WORKFLOW & THERMAL MANAGEMENT",
        content: "This simulation project was an integral part of the 'Bio-Adaptive Microclimate' system (Design Project 5). I utilized ANSYS Fluent to analyze the cooling efficiency of the ward bed's ventilation system.\n\n- Airflow Pattern Analysis: Visualizing the velocity vectors and streamlines to ensure uniform cooling coverage across the patient's skin surface.\n- Static Pressure Distribution: Optimizing the duct geometry and fan specifications to maintain consistent pressure for low-noise, high-efficiency cooling.",
        marginBottom: 'medium'
      },
      {
        type: 'text-full',
        title: "// ENGINEERING VALIDATION",
        content: "The simulation results provided critical data for the hardware design of the cooling system.\n\n- Turbulence Modeling: Implementing K-epsilon turbulence models to accurately predict the heat transfer coefficient at the skin-air interface.\n- Design Iteration: CFD results led to a 20% improvement in airflow uniformity by redesigning the micro-nozzle array based on pressure drop analysis.",
        marginBottom: 'medium'
      }
    ]
  },
  {
    id: 3,
    title: "PCB Design & Prototyping",
    subtitle: "Wearable Health Monitoring System",
    tech: ["EasyEDA", "FPC (Flexible Printed Circuit)", "Arduino", "SMD Assembly"],
    description: "Transformation of a health monitoring prototype from Arduino breadboard to a compact, wearable FPC-based system.",
    icon: <Code size={40} />,
    status: "PROTOTYPE",
    time: "2025.01 - 2025.04",
    content: [
      {
        type: 'text-full',
        title: "// FROM PROTOTYPE TO PRODUCT",
        content: "As part of the 'Bio-Adaptive Microclimate' (Design Project 5), I led the hardware transition from a bulky Arduino-based proof-of-concept to a professional wearable solution.\n\n- Schematic Design: Translating complex sensor networks (GSR, Skin Moisture) from breadboard circuits into optimized schematics using EasyEDA.\n- Form Factor Optimization: Reducing the system footprint by 70% to ensure patient comfort and device unobtrusiveness.",
        marginBottom: 'medium'
      },
      {
        type: 'text-full',
        title: "// FPC TECHNOLOGY & MANUFACTURING",
        content: "To meet the flexibility requirements of wearable medical devices, the project utilized Flexible Printed Circuit (FPC) technology.\n\n- Flexible Layer Stack: Designing a 2-layer FPC to allow the device to conform to the patient's limb without compromising signal integrity.\n- Component Selection: Migrating from through-hole components to SMD (Surface Mount Device) packages to achieve a slim profile.\n- Prototyping & Assembly: Managing the full cycle from Gerber file generation to professional PCB fabrication and manual SMD soldering for the initial test units.",
        marginBottom: 'medium'
      }
    ]
  },
  {
    id: 4,
    title: "Inverse Kinematics & Robotics Control",
    subtitle: "Robotic Arm Motion Planning",
    tech: ["MATLAB Robotics Toolbox", "Inverse Kinematics", "C++", "MCU (STM32/Arduino/Seeed XIAO MG24)"],
    description: "Development of a motion control system for an autonomous robotic arm, utilizing MATLAB for kinematic modeling and MCU for physical hardware driving.",
    icon: <Code size={40} />,
    status: "IN PROGRESS",
    time: "2025.06 - PRESENT",
    content: [
      {
        type: 'text-full',
        title: "// ROBOTIC KINEMATICS & MODELING",
        content: "As a core technical component of 'AeroVertex' (Design Project 7), this project focuses on the precise motion control of the parasitic docking arm. I utilize the MATLAB Robotics Toolbox to build a high-fidelity DH-parameter model of the arm.\n\n- Kinematic Analysis: Solving complex inverse kinematics (IK) equations to translate target docking coordinates into precise joint angles.\n- Trajectory Planning: Generating smooth, collision-free paths in joint space to ensure stable capturing of eVTOL aircraft under varying environmental conditions.",
        marginBottom: 'medium'
      },
      {
        type: 'text-full',
        title: "// HARDWARE DRIVING & MCU IMPLEMENTATION",
        content: "The transition from mathematical models to physical motion is achieved through a dedicated embedded control system.\n\n- MCU Integration: Implementing the motion control algorithms on a microcontroller (MCU) to drive high-precision servo motors.\n- Real-time Execution: Utilizing C++ to handle real-time feedback loops and signal processing, ensuring the physical arm matches the simulated trajectories with minimal latency.\n- Ongoing Development: The system is currently undergoing physical testing and calibration. [ 敬请期待 / Stay Tuned ]",
        marginBottom: 'medium'
      }
    ]
  },
  {
    id: 5,
    title: "SparkPilot AI-AR System",
    subtitle: "Interactive Learning Platform",
    tech: ["React", "Coze AI Platform", "WebAR", "Computer Vision", "Node.js"],
    description: "An end-to-end hardware education system that combines AI-driven circuit design assistance with AR-guided soldering instructions.",
    icon: <Cpu size={40} />,
    status: "COMPLETED",
    time: "2025.10 - 2026.01",
    externalLink: "https://github.com/RUIPENG215/SparkPilot",
    content: [
      {
        type: 'text-full',
        title: "// SYSTEM ARCHITECTURE & INTEGRATION",
        content: "SparkPilot is built on a modern full-stack architecture designed for real-time educational interaction. \n\n- Frontend Framework: React 18+ for building a responsive, high-performance web-based EDA environment.\n- Communication Layer: Integrated WebSocket/REST APIs for seamless data exchange between the web IDE and the AI backend.\n- Technical Workflow: Bridging the gap between digital schematic logic and physical hardware realization through synchronized data streams.",
        marginBottom: 'medium'
      },
      {
        type: 'text-full',
        title: "// MULTIMODAL AI AGENT (COZE)",
        content: "The heart of the system is an advanced AI Agent built on the Coze platform, utilizing multimodal LLMs to process complex engineering data.\n\n- Multimodal Processing: Capable of interpreting natural language queries, analyzing circuit diagrams (JPG/PNG), and parsing component datasheets (PDF).\n- Contextual Knowledge Base: Injected with curated electronics engineering documentation to provide accurate, pedagogically-sound guidance.\n- Logic Verification: Automatically checking user-designed schematics against best practices and providing real-time feedback and optimization suggestions.",
        marginBottom: 'medium'
      },
      {
        type: 'text-full',
        title: "// WEBAR & PROJECTION SYSTEM",
        content: "The AR guidance system is engineered for browser-based delivery via WebAR, focusing on precise visual alignment and instructional clarity.\n\n- Projection Mapping: Dynamic coordinate transformation between digital design data and physical PCB coordinates for visual overlays.\n- Low-Latency Rendering: Optimized rendering pipeline ensuring soldering guides and component highlights remain perfectly aligned during physical assembly.\n- Future Scalability: While real-time Computer Vision (CV) and pose estimation are not yet fully implemented, the system architecture already includes reserved interfaces for CV integration, allowing for future expansion into automated component tracking and alignment.",
        marginBottom: 'medium'
      }
    ]
  },
  {
    id: 6,
    title: "Computer Vision & AR Visualization",
    subtitle: "Lane Detection System Research",
    tech: ["OpenCV", "Python", "Unity", "C#", "TCP/IP Socket"],
    description: "A cross-platform computer vision system that performs real-time lane detection and AR-based visualization for automotive safety.",
    icon: <Cpu size={40} />,
    status: "PROTOTYPE",
    time: "2025.05 - 2025.08",
    content: [
      {
        type: 'text-full',
        title: "// TECHNICAL FRAMEWORK",
        content: "As a core technical research component of 'MTA-CoDrive' (Design Project 6), this project implements a complete data pipeline from raw video capture to AR overlay.\n\n- Data Collection: High-speed camera captures real-time video streams for analysis.\n- Data Processing (Python/OpenCV): Converting video frames through grayscale, Gaussian blur, and Canny edge detection. Lane lines are extracted using ROI masking and Hough Transform, followed by linear fitting and direction judgment.\n- Data Transmission: Outputting 'lane key points (Unity world coordinates) + lane direction' via high-performance Socket-based TCP/IP communication.",
        marginBottom: 'medium'
      },
      {
        type: 'text-full',
        title: "// AR VISUALIZATION & RENDERING (UNITY)",
        content: "The visualization layer is built in Unity to provide an intuitive AR experience for the driver.\n\n- Data Parsing: Unity receives coordinate data via TCP/IP and parses it into 3D space.\n- AR Overlay: Utilizing 'LineRenderer' to generate dynamic guide lines and 'WebCamTexture' for camera feed background rendering.\n- Final Output: Manual texture blending creates a seamless 'camera feed + AR guide lines' overlay, providing real-time visual feedback on lane positioning.",
        marginBottom: 'medium'
      }
    ]
  }
];
