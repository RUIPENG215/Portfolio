import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { designProjects } from '../data/designProjects';

const Design = () => {
  const projects = designProjects;

  return (
    <div className="min-h-screen bg-design-bg text-gray-800 pt-24 md:pt-32 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
        <header className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h1 className="text-6xl font-black text-gray-900 mb-6 tracking-tight leading-[1.2] relative z-10">Design Portfolio</h1>
            <p className="text-xl text-gray-500 max-w-2xl font-medium leading-relaxed relative z-10">
              A collection of my work in product design, graphic arts, and user experience. 
              Blending function with aesthetic form.
            </p>
            <div className="w-20 h-1.5 bg-gray-900 mt-8 rounded-full relative z-10"></div>
          </motion.div>
        </header>

        <div className="relative">
          {/* Section Background Decoration (Desktop) */}
          <div className="hidden md:block absolute -top-24 right-0 text-[6.5rem] font-black text-black/[0.02] select-none pointer-events-none tracking-tighter leading-none uppercase">
            Works
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Link to={`/design/${project.id}`} key={index} className="group">
                <motion.div 
                  className="relative bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-700 cursor-pointer h-auto md:h-[400px] overflow-hidden border border-gray-100 group-hover:border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  style={{ willChange: "transform, opacity" }}
                >
                  {/* Mobile Image (Visible only on mobile) */}
                  <div className="md:hidden w-full aspect-[16/10] relative overflow-hidden border-b border-gray-100">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                      crossOrigin="anonymous"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
                  </div>

                  {/* Background Decoration Circle */}
                  <div className="hidden md:block absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-gray-50 rounded-full group-hover:scale-150 group-hover:bg-gray-100 transition-all duration-700 ease-out" style={{ willChange: "transform" }} />

                  {/* Default State: Icon & Description */}
                  <div className="p-6 md:p-10 h-full flex flex-col relative z-10 transition-all duration-500 md:group-hover:opacity-0 md:group-hover:-translate-y-4">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 md:mb-8 ${project.color} shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                      {project.icon}
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-xs font-black tracking-[0.2em] uppercase text-gray-400">{project.category}</div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest px-3 py-1 bg-gray-50 border border-gray-100 rounded-full">{project.time}</div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black mb-4 text-gray-900 tracking-tight leading-tight group-hover:text-design-primary transition-colors">{project.title}</h3>
                    <p className="text-gray-500 leading-relaxed font-medium text-sm md:text-base max-w-lg mb-6 md:mb-0">
                      {project.description}
                    </p>
                    
                    {/* Bottom Arrow Indicator */}
                    <div className="mt-auto flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-300 group-hover:text-design-primary transition-colors">
                      View Project
                      <span className="w-8 h-[1px] bg-gray-200 group-hover:bg-design-primary group-hover:w-12 transition-all duration-500"></span>
                    </div>
                  </div>

                  {/* Hover State: Full Image Reveal (Circular Mask) - Desktop Only */}
                  <div 
                    className="reveal-mask hidden md:block absolute inset-0 pointer-events-none z-20 transition-all duration-1000 ease-in-out"
                    style={{ willChange: "clip-path" }}
                  >
                    <div className="absolute inset-0 group-hover:scale-100 scale-110 transition-transform duration-1000" style={{ willChange: "transform" }}>
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                        loading="lazy"
                        decoding="async"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">
                        <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 delay-100">
                          <div className="text-xs font-black tracking-[0.3em] uppercase text-design-primary mb-3">Exploring</div>
                          <h3 className="text-4xl font-black text-white mb-4 tracking-tight">{project.title}</h3>
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-1 bg-design-primary rounded-full"></div>
                            <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em]">{project.category}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* CSS for custom clip-path transition since Tailwind doesn't support clip-path transitions out of the box easily */}
          <style dangerouslySetInnerHTML={{ __html: `
            @media (min-width: 768px) {
              .group:hover .reveal-mask {
                clip-path: circle(150% at calc(100% - 32px) 32px) !important;
                -webkit-clip-path: circle(150% at calc(100% - 32px) 32px) !important;
              }
              .reveal-mask {
                clip-path: circle(40px at calc(100% - 32px) 32px);
                -webkit-clip-path: circle(40px at calc(100% - 32px) 32px);
              }
            }
          `}} />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Design;
