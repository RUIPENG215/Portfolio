import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { engineeringProjects } from '../data/engineeringProjects';
import ContentBlockRenderer from '../components/ContentBlockRenderer';

const EngineeringProject = () => {
  const { id } = useParams();
  
  const projects = engineeringProjects;

  const project = projects.find(p => p.id === Number(id));

  if (!project) return <div className="p-20 text-center font-mono text-white bg-engineering-bg min-h-screen">Project not found</div>;

  return (
    <motion.div 
      className="min-h-screen bg-engineering-bg text-engineering-text font-mono pt-32 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col mb-16 border-b border-engineering-border pb-12">
          <Link to="/engineering" className="inline-flex items-center gap-2 text-engineering-muted hover:text-engineering-hover mb-12 transition-all group">
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
                <h1 className="text-4xl md:text-6xl font-bold text-engineering-header tracking-tight">{project.title}</h1>
                <h2 className="text-xl md:text-2xl text-engineering-accent font-light italic opacity-80">{project.subtitle}</h2>
              </div>
              
              <div className="font-mono py-4 relative">
                {/* Subtle vertical line to enhance the "code block" feel */}
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-engineering-border/50" />
                
                <div className="pl-6 md:pl-10">
                  <h3 className="text-lg md:text-xl font-bold text-engineering-header mb-4">
                    <span className="text-[#ff7b72]">const</span> <span className="text-[#d2a8ff]">ProjectMeta</span> = <span className="text-engineering-accent">{'{'}</span>
                  </h3>
                  <div className="pl-6 md:pl-10 space-y-2 text-sm md:text-base">
                    <p className="text-engineering-muted">time: <span className="text-engineering-accent">'{project.time}'</span>,</p>
                    <p className="text-engineering-muted">status: <span className="text-engineering-accent">'{project.status}'</span>,</p>
                    <p className="text-engineering-muted">tech: [<span className="text-engineering-accent">{project.tech?.map(t => `'${t}'`).join(', ')}</span>]</p>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-engineering-accent mt-4">{'}'}</h3>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="relative">
          {/* Decorative side element */}
          <div className="absolute -left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-engineering-border via-engineering-border/20 to-transparent hidden xl:block" />
          
          <div className="w-full">
            {project.content.map((block, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ContentBlockRenderer block={block} theme="dark" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EngineeringProject;