import { Github, Linkedin, Instagram, Send } from 'lucide-react';
import type { ReactNode } from 'react';

export interface SocialLink {
  icon: ReactNode;
  name: string;
  link: string;
}

export const socialLinks: SocialLink[] = [
  { icon: <Github size={20} />, name: "GitHub", link: "#" },
  { icon: <Linkedin size={20} />, name: "LinkedIn", link: "#" },
  { icon: <Instagram size={20} />, name: "Instagram", link: "#" },
  { icon: <Send size={20} />, name: "Telegram", link: "#" }
];
