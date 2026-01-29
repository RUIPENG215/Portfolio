import type { ReactNode } from 'react';
import { Lamp, Utensils, DoorOpen, Zap, Activity, Car, Plane, Cpu } from 'lucide-react';
import type { ContentBlock } from './types';

export type { ContentBlock };

export interface DesignProjectData {
  id: number;
  title: string;
  subtitle?: string; // Optional subtitle for hero section
  category: string;
  description: string;
  aboutProject?: string; // Detailed description for the footer "About Project" section
  image: string; // Used in list view
  heroImage: string; // Used in detail view
  icon: ReactNode;
  color: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'CONCEPT' | string;
  tags?: string[]; // Keywords to replace status in the footer
  time: string;
  content: ContentBlock[]; // Dynamic content blocks
}

export const designProjects: DesignProjectData[] = [
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
    content: [
      {
        type: 'text-and-image',
        title: "",
        content: "Designed for off-site university students in shared apartments or small studios, this lamp delivers a portable, adaptable lighting solution for reading, studying, working, and decoration.",
        src: "/Design_1/details.81.2.webp",
        imageLeft: false,
        imageAspectRatio: 'auto',
        textSize: 'md',
        imageWidth: 'full' // 稍微缩小一点图片宽度
      },
      {
        type: 'text-and-image',
        title: "",
        content: "This foldable, portable lamp delivers up to 500 lux of focused illumination across a 700x450mm surface, with adjustable brightness and color temperature to create comfortable, eye-friendly lighting for reading, studying, and working.",
        src: "/Design_1/Detail1_lamp.webp",
        imageLeft: true,
        imageAspectRatio: 'auto', // 图片自适应，不裁切
        textSize: 'md' // 文字稍微调小一点
      },
      {
        type: 'image-grid',
        images: [
          "/Design_1/Lamp1.webp",
          "/Design_1/Lamp2.webp",
        ],
        columns: 2,
        caption: "Interaction with the lamp."
      },
      {
        type: 'image-grid',
        images: [
          "/Design_1/details.102.1.webp",
          "/Design_1/details.90.3.webp",
          "/Design_1/details.81.1.webp",
          "/Design_1/details.81.3.webp",
          "/Design_1/details.90.1.webp",
          "/Design_1/2.78.webp",
        ],
        columns: 3,
        caption: "Details and ambient light of the lamp."
      },
      {
        type: 'image-grid',
        images: [
          "/Design_1/details.110.1.webp",
          "/Design_1/details.110.2.webp",
        ],
        columns: 2,
        caption: "Exploded view showing the internal hidden mechanism."
      },
      {
        type: 'image-full',
        src: "/Design_1/Assem drawing.png",
        caption: "Engineering drawing of the lamp."
      },
      {
        type: 'image-grid',
        images: [
          "/Design_1/other colors.112.webp",
          "/Design_1/other colors.114.webp",
          "/Design_1/other color.webp",
          "/Design_1/other colors.115.webp",
        ],
        columns: 4,
        caption: "Colour palette created by other team members."
      },
      {
        type: 'quote',
        text: "Wherever you go, your glow follows.",
        author: ""
      },
    ]
  },
 {
    "id": 2,
    "title": "FOODBOX",
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
  "title": "KONBER",
  "category": "Industrial Design",
  "description": "Dormitory door handles face three key pain points: inconvenient operation with full hands, frequent battery failures of electric models, and outdated aesthetics. KONBER integrates mechanical durability with smart card-swiping functionality to solve these daily frustrations for students.",
  "aboutProject": "Derived from in-depth research on student dormitory life, KONBER adheres to the design concept of 'simplicity solves complexity'. It abandons redundant functions, retains core needs of convenience and reliability, and adds a minimalist aesthetic design. The product not only optimizes the door-opening experience but also fits the youthful atmosphere of dormitories, proving that small daily necessities can be upgraded through human-centered design to enhance quality of life.",
  "image": "/Design_3/D3_1.webp",
  "heroImage": "/Design_3/D3_1.webp",
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
  "title": "XIDIE PORTABLE CHARGER",
  "category": "Industrial Design",
  "description": "Blending Xi'an food culture with 65W GaN fast-charging tech, XIDIE breaks the 'decorative-only' stereotype of cultural and creative products.",
  "aboutProject": "XIDIE reimagines the fusion of traditional culture and modern technology: extracting iconic elements from Xi'an's dietary culture (hand-pulled noodles, old porcelain bowls, ancient city walls) and integrating them into GaN charger design, making traditional culture a tangible part of daily life while meeting the practical needs of young consumers.",
  "image": "/Design_4/D4_7.webp",
  "heroImage": "/Design_4/D4_1.webp",
  icon: <Zap size={40} />,
  "color": "bg-yellow-100 text-yellow-600",  
  "tags": ["Industrial Design", "Cultural and Creative Product", "GaN Technology", "Portable Charger", "Cross-disciplinary Design"],
    status: "CONCEPT",
    time: "2025.10 - 2025.12",
    content: [
      {
        type: 'text-full',
        title: "The Unbroken Flow",
        content: "A continuous, single-take sequence that seamlessly traces the product's contours, connecting form, material, and function in its purest state.",
        align: 'left',
        marginBottom: 'small',
        width: 'full'
      },
      {
        type: 'video',
        src: "/Design_4/Video.mp4",
        caption: "A continuous visual journey exploring the product.",
        autoPlay: false,
        controls: true,
        width: 'full'
      },
    {
      "type": "text-and-image",
      "title": "Market Status",
      "content": "At present, many cultural products focus on decorative functions, adopting simple printing of cultural elements without effectively meeting practical usage requirements.",
      "src": "/Design_4/D4_3.webp",
      "imageLeft": true,
      "imageAspectRatio": "auto",
      "textSize": "md",
      "imageWidth": "full"
    },
    {
      "type": "text-and-image",
      "title": "User Research Insight",
      "content": "Young users favor high-frequency-used, portable digital accessories with understated cultural touches that blend naturally into daily use.",
      "src": "/Design_4/D4_4.webp",
      "imageLeft": false,
      "imageAspectRatio": "auto",
      "textSize": "md",
      "imageWidth": "full"
    },
    {
      "type": "text-full",
      "title": "Design Brief",
      "content": "Project Goal: Create a portable charger that merges Xi'an's food culture with GaN fast-charging tech, breaking the 'decorative-only' stereotype of cultural products.\n\nTarget Users: Young consumers (18-30) who value daily practicality, portability, and understated cultural expression.\n\nKey Constraints:\n1. Cultural elements must blend naturally (not feel forced) with functional charger design.\n2. Product must be pocket-sized (≤10mm thick) to meet portability needs.\n3. Balance technical performance (65W fast charge) with cultural aesthetic.",
      "align": "left",
        width: 'full'
    },
    {
      "type": "text-and-image",
      "title": "Design Concept & Tech Solution",
      "content": "Concept: 'Food Energy Station'. Tech: GaN + planar transformer cuts 40% volume (≤10mm thick); magnetic detachable structure for cable replacement.",
      "src": "/Design_4/D4_5.webp",
      "imageLeft": true,
      "imageAspectRatio": "auto",
      "textSize": "md"
    },
      {
    "type": "image-full",
    "src": "/Design_4/D4_7.webp",
    "caption": "XIDIE Portable Charger: Where Xi'an's Carb Energy Meets Device Power"
  },
    {
    "type": "text-full",
    "title": "",
    "content": "Xi'an is known for its hearty, energy-packed foods—think hand-pulled noodles that fuel locals through the day. XIDIE brings that spirit to daily tech: just as those dishes nourish people with energy, this charger powers your devices. It turns the city's dietary culture into a practical accessory you use every day.",
    "align": "left",
    "width": 'full'
  },
  {
    "type": "text-and-image",
    "title": "Porcelain Bowl & Blue and White Pattern",
    "content": "The retractable cable case takes its shape and pattern from the classic blue and white porcelain bowls that Xi'an locals use to serve hand-pulled noodles. This design wraps a familiar daily dining element into a functional tech accessory.",
    "src": "/Design_4/D4_6.webp",
    "imageLeft": true,
    "imageAspectRatio": "auto",
    "textSize": "md"
  },
  {
    "type": "text-and-image",
    "title": "Shaanxi Dialect '咥' & Noodle Texture",
    "content": "The charger's top bears '咥'—a classic Shaanxi word meaning 'eat', a phrase locals use every day. Its beige surface mirrors the color of Shaanxi hand-pulled noodles, tying the product directly to the city's core food culture.",
    "src": "/Design_4/D4_12.webp",
    "imageLeft": false,
    "imageAspectRatio": "auto",
    "textSize": "md"
  },
  {
    "type": "text-and-image",
    "title": "City Wall Crenelation Texture",
    "content": "The charger's side carries an abstract pattern of Xi'an City Wall crenellations—an iconic mark of the ancient capital. The detail is subtle, so it doesn't interfere with grip, keeping the culture present but unobtrusive, just as users wanted.",
    "src": "/Design_4/D4_10.webp",
    "imageLeft": true,
    "imageAspectRatio": "auto",
    "textSize": "md"
  },
  {
    "type": "image-grid",
    "images": ["/Design_4/D4_9.webp", "/Design_4/D4_8.webp"],
    "columns": 2,
    "caption": "Cultural Details: 'Xi'an Red' Interface & Noodle-shaped Cable Mark"
  },
    {
      "type": "image-full",
      "src": "/Design_4/D4_11.webp",
      "caption": "The foldable plug keeps the charger compact enough for a pocket—true to its role as a daily carry accessory. Its smooth, wall-inspired shape stays true to the cultural aesthetic, without giving up practicality."
    },
    {
      "type": "image-full",
      "src": "/Design_4/D4_2.webp",
      "caption": "XIDIE PORTABLE CHARGER"
    },
    {
      "type": "quote",
      "text": "The energy of Xi'an's food, powering your digital life.",
      "author": ""
    }
    ]
  },
  {
    id: 5,
    title: "Bio-Adaptive Microclimate",
    subtitle: "An Interactive Thermal Comfort System for Orthopedic Wards",
    category: "Interaction Design",
    description: "An interactive thermal comfort system for orthopedic wards, using flexible sensors and real-time feedback to personalize microclimates.",
    aboutProject: "This project originated from a key issue identified in my research: thermal comfort in orthopedic wards varies drastically among patients. To address this, I developed an interactive system called 'Bio-Adaptive Microclimate'. The system integrates multiple sensors on flexible printed circuits (FPCs) to monitor patients' skin moisture and galvanic skin response (GSR) in real-time, enabling accurate quantification of their environmental perception.",
    image: "Design_5/D5_H.webp",
    heroImage: "/Design_5/D5_H.webp",
    icon: <Activity size={40} />,
    color: "bg-blue-100 text-blue-600",
    status: "RESEARCH PROJECT",
    tags: ["Interaction Design", "Medical Design", "Sensor Integration", "Thermal Comfort"],
    time: "2025.01 - 2025.04",
    content: [
      {
        type: 'image-full',
        src: "/Design_5/P1.webp",
        caption: "Research Phase: Identifying the specific thermal comfort challenges and requirements of orthopedic patients."
      },
      {
        type: 'image-full',
        src: "/Design_5/P2.webp",
        caption: "Data Analysis: Synthesizing research findings into actionable thermal indicators and patient profiles."
      },
      {
        type: 'image-full',
        src: "/Design_5/P3.webp",
        caption: "Interaction Concept: A tactile engagement tool bridging the gap between subjective feelings and physiological data."
      },
      {
        type: 'image-full',
        src: "/Design_5/P4.webp",
        caption: "Sensor Development: Prototyping real-time acquisition systems for skin moisture and GSR monitoring."
      },
      {
        type: 'image-full',
        src: "/Design_5/P5.webp",
        caption: "Hardware Refinement: Implementing Flexible Printed Circuit (FPC) technology for a non-intrusive patient experience."
      },
      {
        type: 'image-full',
        src: "/Design_5/P6.webp",
        caption: "Technical Validation: Computational Fluid Dynamics (CFD) simulation for optimized microclimate delivery."
      },
      {
        type: 'image-full',
        src: "/Design_5/P7.webp",
        caption: "Final Integration: The complete Bio-Adaptive Microclimate system operating in a responsive clinical scenario."
      },
      {
        type: 'quote',
        text: "Empowering recovery through responsive environments that breathe with the patient.",
        author: ""
      }
    ]
  },
  {
    id: 6,
    title: "MTA-CoDrive",
    subtitle: "Multimodal Teleoperation & Human-Machine Co-Driving System",
    category: "Interaction Design",
    description: "An attention-awakening interaction system integrating AR-HUD and multimodal feedback to ensure safety during autonomous driving takeovers.",
    aboutProject: "As autonomous driving levels increase, the 'takeover' process remains a critical safety challenge. MTA-CoDrive introduces a multimodal teleoperation system that monitors driver state and uses AR-HUD, haptic feedback on the steering wheel, and spatial audio to awaken driver attention and ensure a smooth transition from machine to human control.",
    image: "/Design_6/H.webp",
    heroImage: "/Design_6/H.webp",
    icon: <Car size={40} />,
    color: "bg-slate-100 text-slate-600",
    status: "RESEARCH PROJECT",
    tags: ["Interaction Design", "Automotive", "HMI", "AR-HUD", "Human-Machine Co-Driving"],
    time: "2025.5 - 2025.10",
    content: [
      {
        type: 'image-full',
        src: "/Design_6/D6_1.webp",
        caption: "1. Problem Identification: ADAS Status and Takeover Dilemma"
      },
      {
        type: 'image-full',
        src: "/Design_6/D6_2.webp",
        caption: "2. Research Foundation: Takeover Metrics and Existing Studies"
      },
      {
        type: 'image-full',
        src: "/Design_6/D6_3.webp",
        caption: "3. Pain Point Deep Dive: Accident Cases and Driver Capability Experiments"
      },
      {
        type: 'image-full',
        src: "/Design_6/D6_4.webp", 
        caption: "4. Goal Setting: Defining Design Objectives and User Behavior Analysis"
      },
      {
        type: 'image-full',
        src: "/Design_6/D6_5.webp",
        caption: "5. Transdisciplinary Inspiration: Insights from Sports Kinesiology and Neuroscience"
      },
      {
        type: 'image-full',
        src: "/Design_6/D6_6.webp", 
        caption: "6. Prototyping: Steering Wheel Iteration and Sensor Testing"
      },
      {
        type: 'image-full',
        src: "/Design_6/D6_7.webp",
        caption: "7. Technical Implementation: Gamified Co-Driving Solution and Technical Framework"
      },
      {
        type: 'image-full',
        src: "/Design_6/D6_8.webp",
        caption: "8. Design Solution: Novel Steering Wheel and HUD Interaction System"
      },
      {
        type: 'image-full',
        src: "/Design_6/D6_9.webp",
        caption: "9. Core Interaction: Defining Human-Machine Co-Driving Takeover Logic"
      },
      {
        type: 'text-full',
        title: "Postscript: Beyond the Takeover",
        content: "This project explores a specific moment in the evolution of mobility—the transition of control. As autonomous systems advance beyond Level 3, the technical necessity for 'takeover' may diminish, yet the philosophical inquiry into human-machine collaboration only deepens. MTA-CoDrive is less about the steering wheel and more about the 'Co'—the shared agency between human intent and algorithmic execution. Regardless of how 'smart' our machines become, the pursuit of a harmonious symbiosis remains an enduring challenge for designers, transcending the temporary limitations of today's technology.",
        align: 'center',
        width: 'full'
      },
      {
        type: 'quote',
        text: "Awakening driver attention through seamless multimodal interaction.",
        author: ""
      }
    ]
  },
  {
    id: 7,
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
    subtitle: "Intelligent AI-AR Assistant for Electronic Design and Soldering",
    category: "Interaction Design",
    description: "A web-based platform combined with AR projection and AI agents to help beginners learn PCB design and soldering efficiently.",
    aboutProject: "Designing and soldering a PCB is often a daunting task for beginners. SparkPilot bridges the gap by providing an AI agent that assists in schematic drawing and an AR assistant that projects real-time soldering instructions onto the physical board, reducing errors and learning time.",
    image: "https://placehold.co/800x600/0c0a09/white?text=SparkPilot+Cover",
    heroImage: "https://placehold.co/1920x1080/0c0a09/white?text=SparkPilot+Hero",
    icon: <Cpu size={40} />,
    color: "bg-stone-100 text-stone-600",
    status: "PROTOTYPE",
    tags: ["Interaction Design", "EdTech", "AI Agent", "AR Projection", "PCB Design"],
    time: "2024.05 - 2024.08",
    content: [
      {
        type: 'text-full',
        title: "The Learning Barrier",
        content: "Beginners often struggle with component placement and soldering techniques. Our research showed that real-time, context-aware guidance significantly improves the learning curve in hardware design.",
        align: 'center',
        width: 'full'
      },
      {
        type: 'image-full',
        src: "https://placehold.co/1200x600/1c1917/white?text=AI+and+AR+Integration",
        caption: "Inspiration from AI IDEs and AR devices applied to electronics education."
      },
      {
        type: 'text-and-image',
        title: "Web-Based Intelligent Interface",
        content: "The platform integrates LCEDA for schematic design, supported by an AI agent that provides real-time design suggestions and error checking.",
        src: "https://placehold.co/800x600/292524/white?text=Web+Interface+Design",
        imageLeft: true,
        imageAspectRatio: 'auto'
      },
      {
        type: 'image-full',
        src: "https://placehold.co/1200x800/0c0a09/white?text=Technical+Architecture",
        caption: "Technical architecture overview: Frontend (Tailwind, JS), Backend (Node.js, Express), and AI/AR service layers."
      }
    ]
  }
];
