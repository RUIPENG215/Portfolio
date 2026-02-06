import { Quote } from 'lucide-react';
import type { ContentBlock } from '../data/types';

interface ContentBlockRendererProps {
  block: ContentBlock;
  theme?: 'light' | 'dark';
  projectId?: number;
}

const ContentBlockRenderer = ({ block, theme = 'light', projectId }: ContentBlockRendererProps) => {
  const isDark = theme === 'dark';

  const getTitle = (b: ContentBlock) => {
    if (b.type === 'text-full' || b.type === 'text-and-image') {
      return b.title;
    }
    return undefined;
  };

  const title = getTitle(block);
  const isTechnicalTitle = title?.startsWith('//');
  
  // Font logic: Project 8 uses mono font for captions, others use sans (for light theme)
  // Dark theme (engineering) defaults to mono
  const captionFontClass = isDark ? 'font-mono' : (projectId === 8 ? 'font-mono' : 'font-sans');
  
  // Theme-based classes
  const titleColorClass = isDark ? 'text-engineering-header' : (isTechnicalTitle ? 'text-blue-600' : 'text-gray-900');
  const textColorClass = isDark ? 'text-engineering-muted' : 'text-gray-600/90';
  const bgColorClass = isDark ? 'bg-engineering-bg' : 'bg-gray-50';
  const borderColorClass = isDark ? 'border-engineering-border' : 'border-gray-100';
  const quoteColorClass = isDark ? 'text-engineering-accent' : 'text-gray-800';
  const quoteIconColorClass = isDark ? 'text-engineering-border' : 'text-gray-200';

  const marginBottomClass = (mb?: string) => {
    switch (mb) {
      case 'none': return 'mb-0';
      case 'small': return 'mb-8';
      case 'medium': return 'mb-16';
      case 'normal': 
      default: return 'mb-24';
    }
  };

  switch (block.type) {
    case 'text-full':
      // Width logic: engineering theme (isDark) uses wider layout to match navbar
      const maxWidthClass = isDark ? 'max-w-7xl' : (block.width === 'full' ? 'w-full' : 'max-w-4xl');

      return (
        <section className={`${maxWidthClass} ${block.align === 'left' ? 'mx-0' : 'mx-auto'} ${marginBottomClass(block.marginBottom)}`}>
          {title && (
            <h3 className={`text-2xl font-bold mb-8 tracking-tight ${isTechnicalTitle ? 'font-mono' : (isDark ? '' : 'text-3xl')} ${titleColorClass}`}>
              {title}
            </h3>
          )}
          <div className={`text-lg leading-[1.8] font-normal whitespace-pre-line tracking-wide ${textColorClass} ${isTechnicalTitle ? `border-l-2 ${isDark ? 'border-[#30363d]' : 'border-gray-100'} pl-6` : ''}`}>
            {block.content}
          </div>
        </section>
      );

    case 'image-full':
      return (
        <section className={marginBottomClass('normal')}>
          <div className={`rounded-lg overflow-hidden shadow-sm border ${bgColorClass} ${borderColorClass}`}>
            <img 
              src={block.src} 
              alt={block.caption} 
              className={`w-full h-auto ${isDark ? 'opacity-90' : ''}`} 
              loading="lazy" 
              decoding="async" 
            />
          </div>
          {block.caption && (
            <p className={`mt-4 text-center text-xs ${captionFontClass} ${isDark ? 'text-engineering-muted' : 'text-gray-400'} italic tracking-widest`}>
              {isDark ? `// ${block.caption}` : block.caption}
            </p>
          )}
        </section>
      );

    case 'image-grid':
      const gridColsClass = block.columns === 2 ? 'md:grid-cols-2' :
                           block.columns === 3 ? 'md:grid-cols-3' :
                           block.columns === 4 ? 'md:grid-cols-4' :
                           'md:grid-cols-2';

      const shouldCrop = block.columns >= 3 && !block.keepAspectRatio;

      return (
        <section className={marginBottomClass('normal')}>
          <div className={`grid grid-cols-1 ${gridColsClass} gap-8`}>
            {block.images.map((img, i) => (
              <div key={i} className={`rounded-lg overflow-hidden shadow-sm border group ${bgColorClass} ${borderColorClass} ${shouldCrop ? 'aspect-square' : ''}`}>
                <img 
                  src={img} 
                  alt={`Grid ${i}`} 
                  className={`w-full ${shouldCrop ? 'h-full object-cover' : 'h-auto'} ${isDark ? 'opacity-90' : ''} transition-transform duration-700 ease-in-out group-hover:scale-105`} 
                  loading="lazy" 
                  decoding="async" 
                />
              </div>
            ))}
          </div>
          {block.caption && (
            <p className={`mt-4 text-center text-xs ${captionFontClass} ${isDark ? 'text-engineering-muted' : 'text-gray-400'} italic tracking-widest`}>
              {isDark ? `// ${block.caption}` : block.caption}
            </p>
          )}
        </section>
      );

    case 'text-and-image':
      const textSizeClass = block.textSize === 'sm' ? 'text-base' :
                           block.textSize === 'md' ? 'text-lg' :
                           'text-lg';

      const isAuto = block.imageAspectRatio === 'auto';
      const aspectRatioClass = block.imageAspectRatio === 'video' ? 'aspect-video' :
                              block.imageAspectRatio === 'portrait' ? 'aspect-[3/4]' :
                              'aspect-square';

      const widthClass = block.imageWidth === '4/5' ? 'w-full md:w-[80%]' :
                        block.imageWidth === '3/4' ? 'w-full md:w-[75%]' :
                        block.imageWidth === '2/3' ? 'w-full md:w-[66%]' :
                        block.imageWidth === '1/2' ? 'w-full md:w-[50%]' :
                        'w-full';

      return (
        <section className={`flex flex-col ${block.imageLeft ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center ${marginBottomClass('normal')}`}>
          <div className="w-full md:w-1/2">
            {title && (
              <h3 className={`text-2xl font-bold mb-8 tracking-tight ${isTechnicalTitle ? 'font-mono' : (isDark ? '' : 'text-3xl')} ${titleColorClass}`}>
                {title}
              </h3>
            )}
            <div className={`${textSizeClass} leading-[1.8] font-normal whitespace-pre-line tracking-wide ${textColorClass} ${isTechnicalTitle ? `border-l-2 ${isDark ? 'border-[#30363d]' : 'border-gray-100'} pl-6` : ''}`}>
              {block.content}
            </div>
          </div>
          <div className={`w-full md:w-1/2 flex ${block.imageLeft ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-lg overflow-hidden shadow-sm border group ${bgColorClass} ${borderColorClass} ${isAuto ? '' : aspectRatioClass} ${widthClass}`}>
              <img 
                src={block.src} 
                alt={title} 
                className={`w-full ${isAuto ? 'h-auto' : 'h-full object-cover'} ${isDark ? 'opacity-90' : ''} transition-transform duration-700 ease-in-out group-hover:scale-105`} 
                loading="lazy" 
                decoding="async" 
              />
            </div>
          </div>
        </section>
      );

    case 'quote':
      return (
        <section className={`${marginBottomClass('normal')} py-16 border-y ${borderColorClass} flex flex-col items-center text-center relative overflow-hidden ${isDark ? 'max-w-7xl mx-auto' : ''}`}>
          <div className={`absolute top-0 right-0 opacity-5 -mr-4 ${isDark ? '' : 'hidden'}`}>
            <Quote size={80} />
          </div>
          <Quote size={40} className={`${quoteIconColorClass} mb-8 ${isDark ? 'hidden' : ''}`} />
          <blockquote className={`text-4xl font-serif italic mb-6 ${isDark ? 'max-w-5xl' : 'max-w-3xl'} relative z-10 ${quoteColorClass}`}>
            "{block.text}"
          </blockquote>
          {block.author && <cite className={`text-sm font-bold uppercase tracking-widest ${isDark ? 'text-engineering-muted' : 'text-gray-400'} block`}>— {block.author}</cite>}
        </section>
      );

    case 'video':
      const videoMaxWidthClass = isDark ? 'max-w-7xl' : (
        block.width === 'narrow' ? 'max-w-4xl' :
        block.width === 'standard' ? 'max-w-5xl' :
        'w-full'
      );
      return (
        <section className={`${marginBottomClass('normal')} ${videoMaxWidthClass} mx-auto`}>
          <div className={`rounded-lg overflow-hidden shadow-sm ${bgColorClass}`}>
            <video 
              src={block.src} 
              poster={block.poster}
              controls={block.controls ?? true}
              autoPlay={block.autoPlay}
              loop={block.loop}
              muted={block.muted}
              className="w-full h-auto"
            >
              Your browser does not support the video tag.
            </video>
          </div>
          {block.caption && <p className={`mt-4 text-center text-sm italic ${isDark ? 'text-engineering-muted' : 'text-gray-400'}`}>{block.caption}</p>}
        </section>
      );

    default:
      return null;
  }
};

export default ContentBlockRenderer;
