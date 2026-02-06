import type { ReactNode } from 'react';

export type ContentBlock = 
  | { type: 'text-full'; title?: string; content: string; subtitle?: string; align?: 'left' | 'center'; marginBottom?: 'none' | 'small' | 'medium' | 'normal'; width?: 'standard' | 'full' }
  | { type: 'image-full'; src: string; caption?: string }
  | { type: 'image-grid'; images: string[]; columns: number; caption?: string; keepAspectRatio?: boolean }
  | { 
      type: 'text-and-image'; 
      title?: string; 
      content: string; 
      src: string; 
      imageLeft?: boolean;
      imageAspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
      textSize?: 'sm' | 'md' | 'lg';
      imageWidth?: 'full' | '4/5' | '3/4' | '2/3' | '1/2';
    }
  | { type: 'quote'; text: string; author?: string }
  | { type: 'video'; src: string; caption?: string; poster?: string; autoPlay?: boolean; loop?: boolean; muted?: boolean; controls?: boolean; width?: 'full' | 'standard' | 'narrow' };

export interface ProjectData {
  id: number;
  title: string;
  subtitle?: string;
  category?: string;
  tech?: string[];
  description: string;
  aboutProject?: string;
  image?: string;
  heroImage?: string;
  icon: ReactNode;
  color?: string;
  status: string;
  tags?: string[];
  time: string;
  externalLink?: string;
  content: ContentBlock[];
}

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

export interface HumanitiesPhotoData {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  location?: string;
  date?: string;
  ratio?: 'horizontal' | 'vertical' | 'square';
}

export interface HumanitiesMusicData {
  id: number;
  title: string;
  type: string;
  duration: string;
  icon?: ReactNode;
  description?: string;
}

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
  skills: string[];
  description?: string;
}

export interface Honor {
  title: string;
  org: string;
  year?: string;
}

export interface LoadingContextType {
  isLoaded: boolean;
  setIsLoaded: (value: boolean) => void;
}

export interface SocialLink {
  icon: ReactNode;
  name: string;
  link: string;
  qrCode?: string;
}

export interface Work {
  title: string;
  tags?: string[];
  time?: string;
  externalLink?: string;
  content?: ContentBlock[];
}
