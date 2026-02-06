import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Github } from 'lucide-react';
import { designProjects } from '../data/designProjects';
import ContentBlockRenderer from '../components/ContentBlockRenderer';

const DesignProject = () => {
  const { id } = useParams();
  const project = designProjects.find(p => p.id === Number(id));
  const currentIndex = designProjects.findIndex(p => p.id === Number(id));
  const nextProject = designProjects[(currentIndex + 1) % designProjects.length];
  const prevProject = designProjects[(currentIndex - 1 + designProjects.length) % designProjects.length];

  if (!project) return <div className="p-20 text-center">Project not found</div>;

  const isInteractionProject = project.category === 'Interaction Design';

  return (
    <motion.div 
      className="min-h-screen bg-white text-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* 1. Hero Section */}
      {isInteractionProject ? (
        <div className="relative h-screen w-full overflow-hidden bg-gray-900 flex items-center">
          {/* Background Image */}
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <img 
              src={project.heroImage} 
              alt={project.title} 
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
          </motion.div>

          <div className="max-w-7xl mx-auto w-full relative z-10 h-full flex flex-col justify-center pt-32 px-4 md:px-8">
            {/* Back Button */}
            <div className="absolute top-24 md:top-32">
              <Link to="/design" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-all group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">Back to Portfolio</span>
              </Link>
            </div>

            <div className="max-w-4xl">
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-7xl font-black text-white mb-3 tracking-tight italic leading-[1.1]">
                  {project.title.split(' ').map((word, i) => (
                    <span key={i} className="block mb-2 last:mb-0">
                      {word}
                    </span>
                  ))}
                </h1>
                {project.subtitle && (
                  <p className="text-xl md:text-2xl text-white/80 font-light italic mb-12">
                    {project.subtitle}
                  </p>
                )}

                {/* Description Box */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl max-w-2xl"
                >
                  <p className="text-white/90 leading-[1.8] font-normal text-sm md:text-base tracking-wide">
                    {project.aboutProject || project.description}
                  </p>
                </motion.div>
                
                {project.externalLink && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="mt-8 flex justify-start"
                  >
                    <a 
                      href={project.externalLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-bold text-sm hover:bg-white/90 transition-all group shadow-xl shadow-white/5"
                    >
                      {project.externalLink.includes('github.com') ? (
                        <>
                          View on GitHub <Github size={16} className="group-hover:scale-110 transition-transform" />
                        </>
                      ) : (
                        <>
                          Visit Live Project <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </>
                      )}
                    </a>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
            <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
          </div>
        </div>
      ) : (
        <div className="relative h-screen w-full overflow-hidden bg-[#f8f8f8] flex items-center">
          <div className="absolute inset-0 z-[1] pointer-events-none shadow-[inset_0_0_150px_rgba(248,248,248,1)]" />
          <div className="max-w-7xl mx-auto w-full relative z-10 h-full flex flex-col justify-center px-4 md:px-8">
            <div className="absolute top-24 md:top-32">
              <Link to="/design" className="inline-flex items-center gap-2 text-gray-400 hover:text-black transition-all group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">Back to Portfolio</span>
              </Link>
            </div>

            <div className="flex flex-col md:flex-row items-start justify-between w-full md:pt-24">
              <div className="w-full md:w-[45%] mt-32 md:mt-0">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
                  <span className="text-red-500 font-bold tracking-[0.3em] uppercase text-xs block mb-8 border-l-2 border-red-500 pl-4">
                    {project.category}
                  </span>
                  <h1 className="text-6xl md:text-[6rem] font-black text-gray-800 tracking-tighter leading-[0.9] mb-12">
                    {project.title.split(' ').map((word, i) => (
                      <span key={i} className="block">{word}</span>
                    ))}
                  </h1>

                  <div className="max-w-lg mb-12">
                    <p className="text-base md:text-lg text-gray-500 leading-relaxed font-light italic">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
                {project.externalLink && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="mt-8"
                  >
                    <a 
                      href={project.externalLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-gray-800 transition-all group shadow-lg shadow-black/10"
                    >
                      {project.externalLink.includes('github.com') ? (
                        <>
                          View on GitHub <Github size={16} className="group-hover:scale-110 transition-transform" />
                        </>
                      ) : (
                        <>
                          Visit Live Project <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </>
                      )}
                    </a>
                  </motion.div>
                )}
              </div>
              <div className="w-full md:w-[55%] flex justify-center md:justify-end items-center md:items-start relative group mt-12 md:mt-0">
                <motion.div initial={{ opacity: 0, x: 100, scale: 1.1 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} className="relative z-0">
                  <img 
                    src={project.heroImage} 
                    alt={project.title} 
                    className="max-w-full max-h-[50vh] md:max-h-[85vh] object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.1)] translate-x-0 md:translate-x-24 transition-transform duration-700 ease-in-out group-hover:scale-105" 
                    loading="eager"
                  />
                </motion.div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#f8f8f8] via-transparent to-transparent pointer-events-none z-[2]" />
        </div>
      )}

      {/* 2. Dynamic Content Blocks */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-24">
        {project.content && project.content.map((block, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <ContentBlockRenderer block={block} projectId={project.id} theme="light" />
          </motion.div>
        ))}
      </div>

      {/* 3. Footer Info & Navigation */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-24">
          
          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-32">
            <div className="md:col-span-2">
              <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">About Project</h4>
              <p className="text-base text-gray-500 leading-loose max-w-md italic">
                {project.aboutProject || project.description}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Timeline</h4>
              <p className="text-base text-gray-500 italic">{project.time}</p>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">{project.tags ? 'Keywords' : 'Status'}</h4>
              <div className="text-base text-gray-500 italic flex flex-col gap-1">
                {project.tags ? (
                  project.tags.map((tag, i) => (
                    <span key={i}>{tag}</span>
                  ))
                ) : (
                  project.status
                )}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="border-t border-gray-200 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <Link 
              to={`/design/${prevProject.id}`}
              className="group flex items-center gap-4 text-gray-500 hover:text-black transition-colors"
            >
              <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-black group-hover:bg-black group-hover:text-white transition-all">
                <ArrowLeft size={20} />
              </div>
              <div className="text-right md:text-left">
                <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Previous</div>
                <div className="font-medium">{prevProject.title}</div>
              </div>
            </Link>

            <Link 
              to={`/design/${nextProject.id}`}
              className="group flex flex-row-reverse md:flex-row items-center gap-4 text-gray-500 hover:text-black transition-colors"
            >
              <div className="text-left md:text-right">
                <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Next</div>
                <div className="font-medium">{nextProject.title}</div>
              </div>
              <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-black group-hover:bg-black group-hover:text-white transition-all">
                <ArrowRight size={20} />
              </div>
            </Link>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default DesignProject;