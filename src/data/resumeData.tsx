import { Star, Code, Navigation, Thermometer, Gamepad2, Train } from 'lucide-react';
import type { Experience, ProjectSummary, Education, SkillGroup, Honor } from './types';

export const experiences: Experience[] = [
  {
    company: "Geely Auto",
    role: "Design & Manufacturing Intern",
    period: "2025.06 - 2025.07",
    summary: "Connected automotive design intent with the realities of mass production, culminating in three exterior wheel-hub proposals for the next-generation Boyue L.",
    description: [
      "Worked across product design and manufacturing to understand how styling decisions are translated through stamping, welding, painting, and final assembly.",
      "Applied that production perspective while developing exterior wheel-hub proposals for the Geely Boyue L (FX11-A3)."
    ],
    achievement: {
      label: "Key Achievement",
      text: "Developed the exterior wheel-hub design for the next-generation Geely Boyue L (FX11-A3), delivering three final proposals."
    },
    details: [
      {
        label: "Context",
        title: "Design beyond the studio",
        body: "The internship placed automotive design inside Geely's production ecosystem, where every visual decision must move through tooling, materials, process planning, and large-scale manufacturing."
      },
      {
        label: "My Role",
        title: "Connecting form and production",
        body: "I studied the complete vehicle-manufacturing flow across stamping, welding, painting, and assembly, working with cross-functional perspectives to understand how styling intent is preserved—or reshaped—on the factory floor."
      },
      {
        label: "Contribution",
        title: "Boyue L wheel-hub proposals",
        body: "I developed three final exterior wheel-hub proposals for the next-generation Geely Boyue L (FX11-A3), balancing proportion, surface language, brand character, and manufacturing constraints."
      },
      {
        label: "Takeaway",
        title: "A production-grounded design practice",
        body: "The experience strengthened my understanding of automotive product development: design quality depends not only on form, but on the engineering and cross-functional decisions that carry that form into mass production."
      }
    ]
  }
];

export const projectSummaries: ProjectSummary[] = [
  {
    title: "Metro Seat Support Research",
    period: "Jan 2025 - Jun 2026",
    description: "Reduced an existing metro seat support's weight by over 39.5% using COMSOL topology optimization, CAD/CAE validation, and composite 3D printing.",
    tags: ["COMSOL", "Topology Optimization", "CAD/CAE", "Composite 3D Printing"],
    icon: <Train size={24} />,
    colorClass: "bg-blue-50",
    textColorClass: "text-blue-600",
    details: [
      {
        label: "Challenge",
        title: "Less material, dependable structure",
        body: "The original train seat support needed to retain its structural performance while reducing mass and material use. The project explored how its load paths could be reworked for a new composite 3D-printed structure."
      },
      {
        label: "My Role",
        title: "Mechanical design and validation",
        body: "As an active project contributor, I developed the lightweight support concept, translated performance requirements into CAD geometry, and evaluated structural behaviour through simulation-led iteration."
      },
      {
        label: "Approach",
        title: "Topology-led development",
        body: "I used the density method in COMSOL to optimize the original support, then combined the topology result with CAD/CAE simulation and design-for-additive-manufacturing principles to create a printable composite structure."
      },
      {
        label: "Outcome",
        title: "More than 39.5% lighter",
        body: "The final concept reduced the support's weight by over 39.5% while meeting the required performance targets, demonstrating a viable lightweight direction for Xi'an Metro Line 15."
      }
    ]
  },
  {
    title: "iHarbour Smart Bus System",
    period: "Oct - Dec 2025",
    description: "Reframing campus transit as a connected service through user research, route planning, and an integrated rider-and-operations experience.",
    tags: ["PSS Design", "React Native", "JavaScript", "Service Design"],
    icon: <Navigation size={24} />,
    colorClass: "bg-emerald-50",
    textColorClass: "text-emerald-600",
    details: [
      {
        label: "Challenge",
        title: "A fragmented campus journey",
        body: "Campus transport is not only a vehicle problem. Unclear demand, route planning, waiting uncertainty, and operational coordination all shape the passenger experience."
      },
      {
        label: "My Role",
        title: "Product-service system design",
        body: "As a core team member, I worked across user research, service definition, route planning, and software prototyping to connect passenger needs with the operational side of the bus system."
      },
      {
        label: "Approach",
        title: "From research to system architecture",
        body: "The project translated user-demand research into optimized route logic and operating strategies. I also helped build the React Native application prototype in JavaScript to connect the service's rider and management touchpoints."
      },
      {
        label: "Outcome",
        title: "One coherent mobility proposal",
        body: "The final PSS proposal brings the physical journey and digital service into one system, demonstrating how coordinated design decisions can improve both passenger clarity and operational visibility."
      }
    ]
  },
  {
    title: "Smart Thermal Jacket",
    period: "Sep - Dec 2024",
    description: "Built an Arduino-based wearable prototype using temperature sensing and graphene heating, supported by an interface concept for autonomous thermal control.",
    tags: ["Arduino", "Bluetooth Mesh", "Graphene Heating", "UI/UX Prototype"],
    icon: <Thermometer size={24} />,
    colorClass: "bg-orange-50",
    textColorClass: "text-orange-600",
    details: [
      {
        label: "Challenge",
        title: "Comfort changes with context",
        body: "A fixed heating level cannot respond intelligently to changing weather, activity, or individual preference. The project explored how a wearable could make temperature control more adaptive and less demanding."
      },
      {
        label: "My Role",
        title: "Product and system design",
        body: "As project lead, I developed the product concept, device form, heating-control logic, and UI design, treating the jacket as an integrated wearable rather than a collection of disconnected electronic features."
      },
      {
        label: "Approach",
        title: "Arduino-driven thermal control",
        body: "An Arduino reads the temperature sensor and controls the graphene heating element. Bluetooth Mesh, weather API data, and user preferences were incorporated into the wider system concept for autonomous adjustment."
      },
      {
        label: "Outcome",
        title: "An integrated wearable system",
        body: "I completed the overall system design, device styling, full app UI design, hardware prototype, and validation testing, bringing the wearable concept into a coherent product experience."
      }
    ]
  },
  {
    title: "What to Eat",
    period: "Sep - Dec 2024",
    description: "Independently developed a React Native app that turns restaurant decision fatigue into a card draw, then locates the result on an embedded map.",
    tags: ["React Native", "Map API", "UI/UX", "JavaScript"],
    icon: <Code size={24} />,
    colorClass: "bg-blue-50",
    textColorClass: "text-blue-600",
    details: [
      {
        label: "Challenge",
        title: "Too many choices, too little certainty",
        body: "Choosing where to eat is a small but repetitive source of decision fatigue. The project reframed selection as a moment of discovery rather than another filter-heavy task."
      },
      {
        label: "My Role",
        title: "Independent product development",
        body: "As project lead and sole developer, I defined the product concept and completed the mobile app's UI, interaction, selection logic, and map API integration using React Native and JavaScript."
      },
      {
        label: "Approach",
        title: "A purposeful gacha mechanic",
        body: "A card-draw flow reduces cognitive load. Once a restaurant is selected, the embedded map uses an external map API to display its location directly inside the app, connecting playful discovery with a practical next step."
      },
      {
        label: "Outcome",
        title: "A complete functional prototype",
        body: "The completed mobile application demonstrates the full path from product idea and UX decisions to independent interface, interaction, selection logic, and embedded-map implementation."
      }
    ]
  },
  {
    title: "Hequ Restaurant",
    period: "Apr - Jun 2025",
    description: "Led the complete development of a PICO restaurant-management VR game in Unity, with a focus on action VFX and sound production.",
    tags: ["Unity", "PICO VR", "VFX", "Sound Design"],
    icon: <Gamepad2 size={24} />,
    colorClass: "bg-indigo-50",
    textColorClass: "text-indigo-600",
    details: [
      {
        label: "Challenge",
        title: "Making a virtual place feel responsive",
        body: "A convincing VR restaurant depends on more than visual atmosphere: actions, objects, feedback, and pacing must work together so the user can understand and inhabit the experience naturally."
      },
      {
        label: "My Role",
        title: "XR interaction and development",
        body: "As project lead, I completed the game's end-to-end development in Unity for PICO hardware, taking responsibility for the experience from implementation through headset deployment."
      },
      {
        label: "Approach",
        title: "Action feedback through image and sound",
        body: "I focused particularly on action VFX and sound production, coordinating visual and audio feedback so that player actions remained readable and satisfying inside the immersive environment."
      },
      {
        label: "Outcome",
        title: "A playable end-to-end VR experience",
        body: "The finished prototype brings experience design and technical execution together in a coherent simulation, from interaction logic to deployment on the target headset."
      }
    ]
  },
  {
    title: "RnB Expressions",
    period: "Dec 2024 - Jan 2025",
    description: "Created a character-led R&B motion sticker system that launched on WeChat and surpassed 100,000 shares by January 2026.",
    tags: ["Character Design", "After Effects", "Motion"],
    icon: <Star size={24} />,
    colorClass: "bg-pink-50",
    textColorClass: "text-pink-600",
    details: [
      {
        label: "Challenge",
        title: "Expression in a few moving frames",
        body: "Stickers need to communicate emotion immediately while still feeling distinctive enough to become part of someone's everyday visual language."
      },
      {
        label: "My Role",
        title: "Character and motion direction",
        body: "As a core team member, I created the character expression system and defined how pose, timing, and movement could carry the relaxed confidence and musicality associated with R&B culture."
      },
      {
        label: "Approach",
        title: "Rhythm as a design rule",
        body: "Animation guidelines in After Effects established a consistent vocabulary of timing, exaggeration, and loop behaviour, keeping the pack cohesive while giving each reaction its own personality."
      },
      {
        label: "Outcome",
        title: "Over 100,000 shares",
        body: "The full animated sticker series launched on WeChat and had been shared more than 100,000 times by January 2026, validating both its expressive clarity and real-world appeal."
      }
    ]
  }
];

export const education: Education[] = [
  {
    school: "National University of Singapore",
    degree: "Master of Science",
    major: "Mechanical Engineering",
    period: "2026 - Present",
    logo: "/logos/nus-logo.webp",
    logoScale: 2.8,
    logoOffsetX: -12
  },
  {
    school: "Xi'an Jiaotong University",
    degree: "Bachelor of Engineering",
    major: "Industrial Design",
    period: "2022 - 2026",
    logo: "/logos/xjtu-logo.webp",
    logoScale: 1.0
  },
  {
    school: "Politecnico di Milano",
    degree: "Bachelor of Engineering",
    major: "Industrial Product Engineering (Double Degree)",
    period: "2022 - 2026",
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
