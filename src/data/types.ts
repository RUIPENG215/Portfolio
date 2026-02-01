export type ContentBlock = 
  | { type: 'text-full'; title?: string; content: string; subtitle?: string; align?: 'left' | 'center'; marginBottom?: 'small' | 'normal'; width?: 'standard' | 'full' }
  | { type: 'image-full'; src: string; caption?: string }
  | { type: 'image-grid'; images: string[]; columns: number; caption?: string }
  | { 
      type: 'text-and-image'; 
      title?: string; 
      content: string; 
      src: string; 
      imageLeft?: boolean;
      // 新增属性
      imageAspectRatio?: 'square' | 'video' | 'portrait' | 'auto'; // 默认为 'square' 以兼容，或 'auto'
      textSize?: 'sm' | 'md' | 'lg'; // 默认为 'lg'
      imageWidth?: 'full' | '4/5' | '3/4' | '2/3' | '1/2'; // 图片宽度比例
    }
  | { type: 'quote'; text: string; author?: string }
  | { type: 'video'; src: string; caption?: string; poster?: string; autoPlay?: boolean; loop?: boolean; muted?: boolean; controls?: boolean; width?: 'full' | 'standard' | 'narrow' };

export interface Work {
  title: string;
  tags?: string[];
  time?: string;
  externalLink?: string;
  content?: ContentBlock[];
}
