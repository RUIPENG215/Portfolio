import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

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

/* ---------- Case-study story (data-driven pages in the Wisp visual language) ---------- */

/** One image. `ratio` is width / height of the file, so the layout never jumps. */
export interface StoryImage {
  src: string;
  alt: string;
  ratio: number;
  caption?: string;
  /** Show the whole image (drawings, boards) instead of cropping to the frame. */
  contain?: boolean;
}

export type StoryMedia =
  /** Justified row: each image takes room in proportion to its ratio. */
  | { kind: 'row'; items: StoryImage[] }
  /** One image across the full text width. */
  | { kind: 'full'; item: StoryImage }
  /** Uniform grid, every cell cropped to the same ratio. */
  | { kind: 'grid'; items: StoryImage[]; cols: 2 | 3 | 4; ratio: number; caption?: string }
  /** Presentation boards with small text: shown large, tap to read in the viewer. */
  | { kind: 'boards'; items: StoryImage[] }
  /** Image and short title + text per item, as a row of cards. */
  | { kind: 'features'; items: (StoryImage & { title: string; text: string })[] }
  | { kind: 'film'; src: string; poster: string; label: string; caption?: string };

export interface StorySection {
  /** Mono label next to the index, e.g. "Context". */
  label: string;
  /** Section headline. */
  title: string;
  /** Paragraphs, shown in the right-hand column under the headline. */
  body?: string[];
  media?: StoryMedia[];
  /** Paragraphs shown after the media. */
  after?: string[];
  tone?: 'paper' | 'tint' | 'dark';
}

export interface CaseStory {
  hero: { src: string; alt: string; ratio: number; position?: string; dark?: boolean };
  /** Short line under the title. */
  sub: string;
  /** Up to three short hero facts. */
  meta: { k: string; v: string }[];
  /** Fact list in the overview. */
  facts: { k: string; v: string }[];
  lead: string;
  body?: string[];
  sections: StorySection[];
  /** Closing line. */
  close?: string;
  credits?: string;
}

export interface ProjectData {
  id: number;
  title: string;
  subtitle?: string;
  category?: string;
  tech?: string[];
  description: string;
  aboutProject?: string;
  image?: string;
  /** Image for the Design list (4:3). Falls back to `image`. */
  thumb?: string;
  heroImage?: string;
  icon: ReactNode;
  color?: string;
  status: string;
  tags?: string[];
  time: string;
  externalLink?: string;
  content: ContentBlock[];
  /** Kept in the data but left out of the Design list and prev/next navigation. */
  hidden?: boolean;
  /** 'case-study' pages render their own bespoke layout instead of content blocks. */
  layout?: 'blocks' | 'case-study';
  /** When set, the project renders with the shared case-study template instead of `content`. */
  story?: CaseStory;
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
  icon: LucideIcon;
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
  ratio?: 'horizontal' | 'vertical' | 'square' | 'wide';
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
  summary: string;
  description: string[];
  achievement?: {
    label: string;
    text: string;
  };
  details: DetailSection[];
}

export interface DetailSection {
  label: string;
  title: string;
  body: string;
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
  details: DetailSection[];
}

export interface Education {
  school: string;
  degree?: string;
  major?: string;
  period: string;
  logo?: string;
  logoScale?: number;
  logoOffsetX?: number;
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
