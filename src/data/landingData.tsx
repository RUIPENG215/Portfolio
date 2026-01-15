import { Palette, Settings, Camera } from 'lucide-react';
import type { ReactNode } from 'react';

export interface Interest {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  path: string;
  icon: ReactNode;
  bgClass: string;
  borderClass: string;
  textClass: string;
  accentClass: string;
  isMono?: boolean;
  exploreBtnClass: string;
}

export interface HeroField {
  label: string;
  icon: any;
  color: string;
}

export const heroFields: HeroField[] = [
  { label: 'Design', icon: Palette, color: 'text-blue-400' },
  { label: 'Engineering', icon: Settings, color: 'text-emerald-400' },
  { label: 'Humanities', icon: Camera, color: 'text-purple-400' }
];

export const interests: Interest[] = [
  {
    id: 'design',
    title: 'Design',
    subtitle: 'Product, Graphic, UX',
    description: 'Focus on user experience & aesthetics.',
    path: '/design',
    icon: <Palette size={120} />,
    bgClass: 'bg-design-bg',
    borderClass: 'border-design-secondary/20',
    textClass: 'text-gray-800',
    accentClass: 'text-design-primary',
    exploreBtnClass: 'bg-design-primary',
  },
  {
    id: 'engineering',
    title: 'Engineering',
    subtitle: 'Mechanical, Electronics, Simulation',
    description: 'Rigorous technical implementation.',
    path: '/engineering',
    icon: <Settings size={120} />,
    bgClass: 'bg-[#0d1117]',
    borderClass: 'border-[#30363d]',
    textClass: 'text-[#c9d1d9]',
    accentClass: 'text-[#58a6ff]',
    isMono: true,
    exploreBtnClass: 'bg-[#238636]',
  },
  {
    id: 'humanities',
    title: 'Humanities',
    subtitle: 'Photography, Music, Art',
    description: 'Pure expression & artistic soul.',
    path: '/humanities',
    icon: <Camera size={120} />,
    bgClass: 'bg-humanities-bg',
    borderClass: 'border-humanities-secondary/20',
    textClass: 'text-gray-800',
    accentClass: 'text-humanities-primary',
    exploreBtnClass: 'bg-humanities-primary',
  }
];
