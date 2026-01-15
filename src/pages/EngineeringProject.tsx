import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Quote } from 'lucide-react';
import { engineeringProjects } from '../data/engineeringProjects';
import type { ContentBlock } from '../data/types';

const EngineeringBlockRenderer = ({ block }: { block: ContentBlock }) => {
  switch (block.type) {
    case 'text-full':
      return (
        <section className="mb-12">
          {block.title && <h3 className="text-lg font-bold text-[#e6edf3] mb-4">{block.title}</h3>}
          <p className="text-[#8b949e] leading-relaxed text-lg">{block.content}</p>
        </section>
      );
    case 'image-full':
      return (
        <section className="mb-12">
          <div className="rounded-xl overflow-hidden border border-[#30363d] bg-[#0d1117]">
            <img src={block.src} alt={block.caption} className="w-full h-auto object-cover opacity-90" />
          </div>
          {block.caption && <p className="mt-3 text-sm text-[#8b949e] font-mono italic">// {block.caption}</p>}
        </section>
      );
    case 'image-grid':
      return (
        <section className={`grid grid-cols-1 md:grid-cols-${block.columns} gap-4 mb-12`}>
          {block.images.map((img, i) => (
            <div key={i} className="rounded-xl overflow-hidden border border-[#30363d] bg-[#0d1117] aspect-square">
              <img src={img} alt={`Grid ${i}`} className="w-full h-full object-cover opacity-90" />
            </div>
          ))}
        </section>
      );
    case 'text-and-image':
      return (
        <section className={`flex flex-col ${block.imageLeft ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-start mb-12`}>
          <div className="w-full md:w-1/2">
            {block.title && <h3 className="text-lg font-bold text-[#e6edf3] mb-4">{block.title}</h3>}
            <p className="text-[#8b949e] leading-relaxed">{block.content}</p>
          </div>
          <div className="w-full md:w-1/2">
            <div className="rounded-xl overflow-hidden border border-[#30363d] bg-[#0d1117] aspect-video">
              <img src={block.src} alt={block.title} className="w-full h-full object-cover opacity-90" />
            </div>
          </div>
        </section>
      );
    case 'quote':
      return (
        <section className="mb-12 py-8 border-y border-[#30363d] relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-5 -mr-4">
            <Quote size={80} />
          </div>
          <blockquote className="text-xl italic text-[#79c0ff] mb-4 relative z-10">
            "{block.text}"
          </blockquote>
          {block.author && <cite className="text-xs font-bold uppercase tracking-widest text-[#8b949e] block">— {block.author}</cite>}
        </section>
      );
    default:
      return null;
  }
};

const EngineeringProject = () => {
  const { id } = useParams();
  
  const projects = engineeringProjects;

  const project = projects.find(p => p.id === Number(id));

  if (!project) return <div className="p-20 text-center font-mono text-white bg-[#0d1117] min-h-screen">Project not found</div>;

  return (
    <motion.div 
      className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-mono pt-32 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col mb-16 border-b border-[#30363d] pb-12">
          <Link to="/engineering" className="inline-flex items-center gap-2 text-[#8b949e] hover:text-[#58a6ff] mb-12 transition-all group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
            <span className="text-sm font-bold">cd ..</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <div className="flex flex-col gap-10">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-[#e6edf3] tracking-tight">{project.title}</h1>
                <h2 className="text-xl md:text-2xl text-[#79c0ff] font-light italic opacity-80">{project.subtitle}</h2>
              </div>
              
              <div className="font-mono py-4 relative">
                {/* Subtle vertical line to enhance the "code block" feel */}
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[#30363d]/50" />
                
                <div className="pl-6 md:pl-10">
                  <h3 className="text-lg md:text-xl font-bold text-[#e6edf3] mb-4">
                    <span className="text-[#ff7b72]">const</span> <span className="text-[#d2a8ff]">ProjectMeta</span> = <span className="text-[#79c0ff]">{'{'}</span>
                  </h3>
                  <div className="pl-6 md:pl-10 space-y-2 text-sm md:text-base">
                    <p className="text-[#8b949e]">time: <span className="text-[#a5d6ff]">'{project.time}'</span>,</p>
                    <p className="text-[#8b949e]">status: <span className="text-[#a5d6ff]">'{project.status}'</span>,</p>
                    <p className="text-[#8b949e]">tech: [<span className="text-[#a5d6ff]">{project.tech.map(t => `'${t}'`).join(', ')}</span>]</p>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-[#79c0ff] mt-4">{'}'}</h3>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="relative">
          {/* Decorative side element */}
          <div className="absolute -left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#30363d] via-[#30363d]/20 to-transparent hidden xl:block" />
          
          <div className="w-full">
            {project.content.map((block, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <EngineeringBlockRenderer block={block} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EngineeringProject;