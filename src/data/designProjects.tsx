import { Lamp, Utensils, DoorOpen, Zap, Activity, Car, Plane, Cpu, Sparkles } from 'lucide-react';
import type { ProjectData } from './types';

export const designProjects: ProjectData[] = [
  {
    // Wisp — id must stay 9: the poster, slides, report and film link to /design/9.
    // The page itself is src/pages/WispCaseStudy.tsx; media in /public/Design_9.
    id: 9,
    title: "Wisp",
    subtitle: "An Ambient Lamp as the Body of an AI Agent",
    category: "Interaction Design",
    description: "A paper lamp and a ring floating on the screen share one body of light, driven by sound, music, presence and a language-model agent.",
    aboutProject: "Wisp gives a large language model a physical body. The agent inhabits a lamp: it senses the room through the laptop and answers through the behaviour of light, with a small glowing ring on the screen as its face.",
    image: "/Design_9/cover.webp",
    thumb: "/Design_9/thumb.webp",
    heroImage: "/Design_9/hero.webp",
    icon: <Sparkles size={40} />,
    color: "bg-amber-100 text-amber-600",
    status: "COMPLETED",
    tags: ["Interaction Design", "Embodied AI", "Ambient Light", "LLM Agent", "Physical Computing"],
    time: "2026.10 - 2026.11",
    externalLink: "https://github.com/RUIPENG215/ambient-light",
    layout: 'case-study',
    content: [],
  },
  {
    id: 1,
    title: "Luminous Tower Crane",
    category: "Industrial Design",
    description: "A sculptural, foldable lamp that transitions seamlessly from a focused work light to a warm ambient glow, merging tactile interaction with effortless portability for life on the go.",
    aboutProject: "Beyond portability and function, this lamp is an exploration of how light can adapt to our lives—whether we're working, resting, or moving between spaces. It's not just a lamp; it's a companion that brings warmth wherever you go.",
    image: "/Design_1/Hero_lamp.webp",
    heroImage: "/Design_1/Hero_lamp.webp",
    icon: <Lamp size={40} />,
    color: "bg-red-100 text-red-600",
    status: "COMPLETED",
    tags: ["Industrial Design", "Lighting", "Portability", "Mechanism"],
    time: "2024.06 - 2024.07",
    content: []
  },
 {
    "id": 2,
    hidden: true, // early concept, kept reachable by URL but out of the list
    "title": "Foodbox",
    "category": "Industrial Design",
    "description": "For space station astronauts, interrupting missions to dine is inefficient. FOODBOX is a portable, heatable container that automates meal pairing, heating, and serving—letting astronauts eat at workstations without delays.",
    "aboutProject": "Space missions demand every moment count. FOODBOX reimagines astronaut dining as a seamless, human-centered solution: merging functionality with zero-gravity usability to support both productivity and well-being in extreme environments.",
    "image": "/Design_2/D2_2.webp",
    "heroImage": "/Design_2/D2_1.webp",
    icon: <Utensils size={40} />,
    "color": "bg-blue-100 text-blue-600",
    "status": "COMPLETED",
    "tags": ["Industrial Design", "Space Product", "Portable Heating", "Smart Interaction"],
    "time": "2024.10 - 2024.12",
    "content": [
      {
        "type": "text-and-image",
        "title": "",
        "content": "Currently, astronauts must use the station's kitchen and its complex microwaves to heat meals. This design lets them skip the trip.",
        "src": "/Design_2/D2_8.webp",
        "imageLeft": true,
        "imageAspectRatio": "auto",
        "textSize": "md",
        "imageWidth": "full"
      },
      {
        "type": "image-full",
        "src": "/Design_2/D2_3.webp",
        "caption": "FOODBOX"
      },      
      {
        "type": "text-and-image",
        "title": "",
        "content": "Fits pre-packaged spherical meals. Tap the screen for auto-matching, heating, and dispensing to an attachable tray.",
        "src": "/Design_2/D2_5.webp",
        "imageLeft": false,
        "imageAspectRatio": "auto",
        "textSize": "md",
        "imageWidth": "full"
      },
      {
        "type": "text-and-image",
        "title": "",
        "content": "Adhesive base for zero-gravity mounting. Rear refilling port + screen for scheduling/preferences.",
        "src": "/Design_2/D2_4.webp",
        "imageLeft": true,
        "imageAspectRatio": "auto",
        "textSize": "md"
      },
      {
        "type": "image-full",
        "src": "/Design_2/D2_s1.webp",
        "caption": "Storyboard 1 of FOODBOX"
      },
      {
        "type": "image-full",
        "src": "/Design_2/D2_s2.webp",
        "caption": "Storyboard 2 of FOODBOX"
      },
      {
        "type": "image-full",
        "src": "/Design_2/D2_s3.webp",
        "caption": "Storyboard 3 of FOODBOX"
      },
      {
        "type": "image-grid",
        "images": ["/Design_2/D2_6.webp", "/Design_2/D2_7.webp"],
        "columns": 2,
        "caption": "Appearance and usage"
      },
      {
        "type": "image-full",
        "src": "/Design_2/D2_2.webp",
        "caption": "FOODBOX"
      },
      {
        "type": "quote",
        "text": "Warm, nutritious meals—anytime, anywhere in space.",
        "author": ""
      }
    ]
  },
 {
  "id": 3,
  "title": "KNOBER",
  "category": "Industrial Design",
  "description": "Dormitory door handles face three key pain points: inconvenient operation with full hands, frequent battery failures of electric models, and outdated aesthetics. KNOBER integrates mechanical durability with smart card-swiping functionality to solve these daily frustrations for students.",
  "aboutProject": "Derived from in-depth research on student dormitory life, KNOBER adheres to the design concept of 'simplicity solves complexity'. It abandons redundant functions, retains core needs of convenience and reliability, and adds a minimalist aesthetic design. The product not only optimizes the door-opening experience but also fits the youthful atmosphere of dormitories, proving that small daily necessities can be upgraded through human-centered design to enhance quality of life.",
  "image": "/Design_3/k_door.webp",
  "heroImage": "/Design_3/k_hero.webp",
  icon: <DoorOpen size={40} />,
  "color": "bg-green-100 text-green-600",
  "status": "COMPLETED",
  "tags": ["Industrial Design", "Smart Hardware", "Dormitory Product", "Human-Computer Interaction", "Mechanical & Intelligent Integration"],
  "time": "2025.03 - 2025.04",
  "content": [
      {
      "type": "image-full",
      "src": "/Design_3/De1.webp",
      "caption": ""
      },
      {
      "type": "image-full",
      "src": "/Design_3/De2.webp",
      "caption": ""
      },
      {
      "type": "image-full",
      "src": "/Design_3/De3.webp",
      "caption": ""
      },
      {
      "type": "image-full",
      "src": "/Design_3/De4.webp",
      "caption": ""
      },
      {
      "type": "image-full",
      "src": "/Design_3/De5.webp",
      "caption": ""
      },{
      "type": "image-full",
      "src": "/Design_3/De6.webp",
      "caption": ""
      },{
      "type": "image-full",
      "src": "/Design_3/De7.webp",
      "caption": ""
      },{
      "type": "image-full",
      "src": "/Design_3/De8.webp",
      "caption": ""
      },{
      "type": "image-full",
      "src": "/Design_3/De9.webp",
      "caption": ""
      },{
      "type": "image-full",
      "src": "/Design_3/De10.webp",
      "caption": ""
      },{
      "type": "image-full",
      "src": "/Design_3/De11.webp",
      "caption": ""
      },
      {
      "type": "image-full",
      "src": "/Design_3/De12.webp",
      "caption": ""
      },{
      "type": "image-full",
      "src": "/Design_3/De13.webp",
      "caption": ""
      },{
      "type": "image-full",
      "src": "/Design_3/De14.webp",
      "caption": ""
      },{
      "type": "image-full",
      "src": "/Design_3/De15.webp",
      "caption": ""
      },{
      "type": "image-full",
      "src": "/Design_3/De16.webp",
      "caption": ""
      },{
      "type": "image-full",
      "src": "/Design_3/De17.webp",
      "caption": ""
      },{
      "type": "image-full",
      "src": "/Design_3/De18.webp",
      "caption": ""
      },{
      "type": "image-full",
      "src": "/Design_3/De19.webp",
      "caption": ""
      },{
      "type": "image-full",
      "src": "/Design_3/De20.webp",
      "caption": ""
      },{
      "type": "image-full",
      "src": "/Design_3/De21.webp",
      "caption": ""
      },{
      "type": "image-full",
      "src": "/Design_3/De22.webp",
      "caption": ""
      },{
      "type": "image-full",
      "src": "/Design_3/De23.webp",
      "caption": ""
      },{
      "type": "image-full",
      "src": "/Design_3/De24.webp",
      "caption": ""
      },{
      "type": "image-full",
      "src": "/Design_3/De25.webp",
      "caption": ""
      },{
      "type": "image-full",
      "src": "/Design_3/De26.webp",
      "caption": ""
      },
      {
      "type": "image-full",
      "src": "/Design_3/De27.webp",
      "caption": ""
      },{
      "type": "image-full",
      "src": "/Design_3/De28.webp",
      "caption": ""
      },{
      "type": "image-full",
      "src": "/Design_3/De29.webp",
      "caption": ""
      },{
      "type": "image-full",
      "src": "/Design_3/De30.webp",
      "caption": ""
      },{
      "type": "image-full",
      "src": "/Design_3/De31.webp",
      "caption": ""
      },{
      "type": "image-full",
      "src": "/Design_3/De32.webp",
      "caption": ""
      },{
      "type": "image-full",
      "src": "/Design_3/De33.webp",
      "caption": ""
      },{
      "type": "image-full",
      "src": "/Design_3/De34.webp",
      "caption": ""
      },{
      "type": "image-full",
      "src": "/Design_3/De35.webp",
      "caption": ""
      },{
      "type": "image-full",
      "src": "/Design_3/De36.webp",
      "caption": ""
      },{
      "type": "image-full",
      "src": "/Design_3/De37.webp",
      "caption": ""
      },
      {
        "type": "quote",
        "text": "Hands full? No problem. Unlock with ease.",
        "author": ""
      }
    ]
  },
  {
  "id": 4,
  "title": "Xidie Portable Charger",
  "category": "Industrial Design",
  "description": "Blending Xi'an food culture with 65W GaN fast-charging tech, XIDIE breaks the 'decorative-only' stereotype of cultural and creative products.",
  "aboutProject": "XIDIE reimagines the fusion of traditional culture and modern technology: extracting iconic elements from Xi'an's dietary culture (hand-pulled noodles, old porcelain bowls, ancient city walls) and integrating them into GaN charger design, making traditional culture a tangible part of daily life while meeting the practical needs of young consumers.",
  "image": "/Design_4/x_three_quarter.webp",
  "heroImage": "/Design_4/x_top.webp",
  icon: <Zap size={40} />,
  "color": "bg-yellow-100 text-yellow-600",  
  "tags": ["Industrial Design", "Cultural and Creative Product", "GaN Technology", "Portable Charger", "Cross-disciplinary Design"],
    status: "CONCEPT",
    time: "2025.10 - 2025.12",
    content: []
  },
  {
    id: 5,
    title: "Bio-Adaptive Microclimate",
    subtitle: "An Interactive Thermal Comfort System for Orthopedic Wards",
    category: "Interaction Design",
    description: "An interactive thermal comfort system for orthopedic wards, using flexible sensors and real-time feedback to personalize microclimates.",
    aboutProject: "This project originated from a key issue identified in my research: thermal comfort in orthopedic wards varies drastically among patients. To address this, I developed an interactive system called 'Bio-Adaptive Microclimate'. The system integrates multiple sensors on flexible printed circuits (FPCs) to monitor patients' skin moisture and galvanic skin response (GSR) in real-time, enabling accurate quantification of their environmental perception.",
    image: "/Design_5/hero.webp",
    thumb: "/Design_5/thumb.webp",
    heroImage: "/Design_5/hero.webp",
    icon: <Activity size={40} />,
    color: "bg-blue-100 text-blue-600",
    status: "RESEARCH PROJECT",
    tags: ["Interaction Design", "Medical Design", "Sensor Integration", "Thermal Comfort"],
    time: "2025.01 - 2025.04",
    content: []
  },
  {
    id: 6,
    title: "MTA-CoDrive",
    subtitle: "Multimodal Teleoperation & Human-Machine Co-Driving System",
    category: "Interaction Design",
    description: "An attention-awakening interaction system integrating AR-HUD and multimodal feedback to ensure safety during autonomous driving takeovers.",
    aboutProject: "As autonomous driving levels increase, the 'takeover' process remains a critical safety challenge. MTA-CoDrive introduces a multimodal teleoperation system that monitors driver state and uses AR-HUD, haptic feedback on the steering wheel, and spatial audio to awaken driver attention and ensure a smooth transition from machine to human control.",
    image: "/Design_6/hero.webp",
    thumb: "/Design_6/thumb.webp",
    heroImage: "/Design_6/hero.webp",
    icon: <Car size={40} />,
    color: "bg-slate-100 text-slate-600",
    status: "RESEARCH PROJECT",
    tags: ["Interaction Design", "Automotive", "HMI", "AR-HUD", "Human-Machine Co-Driving"],
    time: "2025.05 - 2025.08",
    content: []
  },
  {
    id: 7,
    hidden: true, // unfinished; shown again once the project is ready
    title: "AeroVertex",
    subtitle: "Adaptive Urban Docking for Low-Altitude Mobility",
    category: "Interaction Design",
    description: "A parasitic docking system that utilizes underused 'negative spaces' on high-rise buildings to facilitate efficient eVTOL transit.",
    aboutProject: "As the low-altitude economy scales, the demand for vertiports is outstripping urban space. AeroVertex proposes a solution that doesn't require new land: repurposing the 'negative spaces' of existing architecture. By designing a specialized robotic docking arm capable of securing eVTOLs on the corners and edges of buildings, we can turn every high-rise into a potential mobility node, seamlessly integrating air transit into the existing urban fabric.",
    image: "/Design_7/D7_H.webp",
    heroImage: "/Design_7/D7_H.webp",
    icon: <Plane size={40} />,
    color: "bg-indigo-100 text-indigo-600",
    status: "CONCEPT IN PROGRESS",
    tags: ["Interaction Design", "Urban Planning", "eVTOL", "Parasitic Architecture", "Low-altitude Economy"],
    time: "2025.06 - PRESENT",
    content: [
      {
        type: 'text-full',
        title: "Project Under Development",
        content: "This project is currently in the final stages of modeling and visualization. I am exploring the mechanical feasibility of the 'Vertex-Grab' system and its integration with existing building structural systems. Stay tuned for the full design process, including spatial mapping, mechanical simulations, and user journey maps.",
        align: 'center',
        width: 'full'
      },
      {
        type: 'quote',
        text: "The future of urban flight isn't just about where we go, but how we anchor it to the spaces we've already built.",
        author: "Coming Soon"
      }
    ]
  },
  {
    id: 8,
    title: "SparkPilot",
    subtitle: "AI-AR Assisted Interactive Learning System for PCB Design",
    category: "Interaction Design",
    description: "An innovative hardware education platform that integrates Large Language Models (LLM) and Augmented Reality (AR) to lower the entry barrier for electronic engineering.",
    aboutProject: "Traditional electronic design and soldering education faces a high learning curve and safety concerns. SparkPilot transforms this process by introducing an 'AI Mentor' for circuit design and 'AR Guidance' for physical soldering. By bridging the gap between digital schematics and physical hardware through real-time projection and intelligent agents, we empower beginners to move from concept to functional PCB with confidence and precision.",
    image: "/Design_8/hero.webp",
    thumb: "/Design_8/thumb.webp",
    heroImage: "/Design_8/hero.webp",
    icon: <Cpu size={40} />,
    color: "bg-orange-50 text-orange-600",
    status: "PROTOTYPE COMPLETED",
    tags: ["Interaction Design", "Electronic Engineering","AI Agent", "Augmented Reality", "Large Language Model" ],
    time: "2025.10 - 2026.01",
    externalLink: "https://github.com/RUIPENG215/SparkPilot",
    content: []
  }
];

/** Projects shown in the Design list and used for prev/next navigation, newest first. */
const startKey = (time: string) => time.match(/\d{4}\.\d{2}/)?.[0] ?? '';
export const visibleDesignProjects = designProjects
  .filter(p => !p.hidden)
  .sort((a, b) => startKey(b.time).localeCompare(startKey(a.time)));
