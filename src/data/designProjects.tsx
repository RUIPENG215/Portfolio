import type { ReactNode } from 'react';
import { Layout, PenTool, Image as ImageIcon } from 'lucide-react';
import type { ContentBlock } from './types';

export type { ContentBlock };

export interface DesignProjectData {
  id: number;
  title: string;
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
    icon: <Layout size={40} />,
    color: "bg-red-100 text-red-600",
    status: "COMPLETED",
    tags: ["Industrial Design", "Lighting", "Portability", "Mechanism"],
    time: "2023.06 - 2023.07",
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
    id: 2,
    title: "Eco Hydration",
    category: "Sustainability",
    description: "Biodegradable water bottle design with ergonomic grip patterns. Aiming to reduce plastic waste while maintaining durability.",
    image: "https://placehold.co/800x600/14b8a6/white?text=Eco+Hydration",
    heroImage: "https://placehold.co/800x600/14b8a6/white?text=Eco+Hydration",
    icon: <PenTool size={40} />,
    color: "bg-teal-100 text-teal-600",
    status: "CONCEPT",
    time: "2024.01 - 2024.03",
    content: [
      {
        type: 'text-full',
        title: "Sustainability First",
        content: "Utilizing a novel PHA-based bioplastic, this bottle is fully compostable. The unique ribbed texture provides structural integrity with less material usage."
      },
      {
        type: 'image-grid',
        images: [
          "https://placehold.co/800x600/14b8a6/white?text=Eco+Hydration+1",
          "https://placehold.co/800x600/14b8a6/white?text=Eco+Hydration+2"
        ],
        columns: 2
      }
    ]
  },
  {
    id: 3,
    title: "Health Monitor App",
    category: "UX/UI",
    description: "User interface for elderly patients to monitor vital signs easily. High contrast and large touch targets for accessibility.",
    image: "https://placehold.co/800x600/a855f7/white?text=Health+Monitor",
    heroImage: "https://placehold.co/800x600/a855f7/white?text=Health+Monitor",
    icon: <ImageIcon size={40} />,
    color: "bg-purple-100 text-purple-600",
    status: "IN_PROGRESS",
    time: "2024.06 - PRESENT",
    content: [
      {
        type: 'text-and-image',
        title: "Accessibility Research",
        content: "The interface was refined through multiple rounds of A/B testing with the target demographic. Key features include voice commands, medication reminders, and direct emergency contact.",
        src: "https://placehold.co/800x600/a855f7/white?text=User+Research",
        imageLeft: true
      }
    ]
  },
  {
    id: 4,
    title: "Product Project 4",
    category: "Industrial Design",
    description: "Brief description of your fourth industrial design project.",
    image: "https://placehold.co/800x600/fca5a5/white?text=Product+4",
    heroImage: "https://placehold.co/800x600/fca5a5/white?text=Product+4+Hero",
    icon: <Layout size={40} />,
    color: "bg-red-100 text-red-600",
    status: "CONCEPT",
    time: "2024.01 - 2024.03",
    content: [
      {
        type: 'text-full',
        title: "Project Overview",
        content: "Detailed description of the project..."
      }
    ]
  },
  {
    id: 5,
    title: "Interaction Project 1",
    category: "Interaction Design",
    description: "Brief description of your first interaction design project.",
    image: "https://placehold.co/800x600/60a5fa/white?text=Interaction+1",
    heroImage: "https://placehold.co/800x600/60a5fa/white?text=Interaction+1+Hero",
    icon: <ImageIcon size={40} />,
    color: "bg-blue-100 text-blue-600",
    status: "COMPLETED",
    time: "2023.09 - 2023.12",
    content: [
      {
        type: 'text-full',
        title: "Project Overview",
        content: "Detailed description of the project..."
      }
    ]
  },
  {
    id: 6,
    title: "Interaction Project 2",
    category: "Interaction Design",
    description: "Brief description of your second interaction design project.",
    image: "https://placehold.co/800x600/60a5fa/white?text=Interaction+2",
    heroImage: "https://placehold.co/800x600/60a5fa/white?text=Interaction+2+Hero",
    icon: <ImageIcon size={40} />,
    color: "bg-blue-100 text-blue-600",
    status: "COMPLETED",
    time: "2023.01 - 2023.05",
    content: [
      {
        type: 'text-full',
        title: "Project Overview",
        content: "Detailed description of the project..."
      }
    ]
  },
  {
    id: 7,
    title: "Interaction Project 3",
    category: "Interaction Design",
    description: "Brief description of your third interaction design project.",
    image: "https://placehold.co/800x600/60a5fa/white?text=Interaction+3",
    heroImage: "https://placehold.co/800x600/60a5fa/white?text=Interaction+3+Hero",
    icon: <ImageIcon size={40} />,
    color: "bg-blue-100 text-blue-600",
    status: "CONCEPT",
    time: "2022.09 - 2022.12",
    content: [
      {
        type: 'text-full',
        title: "Project Overview",
        content: "Detailed description of the project..."
      }
    ]
  },
  {
    id: 8,
    title: "Interaction Project 4",
    category: "Interaction Design",
    description: "Brief description of your fourth interaction design project.",
    image: "https://placehold.co/800x600/60a5fa/white?text=Interaction+4",
    heroImage: "https://placehold.co/800x600/60a5fa/white?text=Interaction+4+Hero",
    icon: <ImageIcon size={40} />,
    color: "bg-blue-100 text-blue-600",
    status: "CONCEPT",
    time: "2022.01 - 2022.06",
    content: [
      {
        type: 'text-full',
        title: "Project Overview",
        content: "Detailed description of the project..."
      }
    ]
  }
];
