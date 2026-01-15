import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { designProjects } from '../data/designProjects';

const Design = () => {
  const projects = designProjects;

  return (
    <div className="min-h-screen bg-design-bg text-gray-800 pt-24 md:pt-32 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <header className="mb-16">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">Design Portfolio</h1>
          <p className="text-xl text-gray-600 max-w-2xl font-light italic">
            A collection of my work in product design, graphic arts, and user experience. 
            Blending function with aesthetic form.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Link to={`/design/${project.id}`} key={index}>
              <motion.div 
                className="group relative bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer h-[350px] overflow-hidden border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Default State: Icon & Description */}
                <div className="p-8 h-full flex flex-col transition-opacity duration-500 group-hover:opacity-0">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${project.color} shadow-sm`}>
                    {project.icon}
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">{project.category}</div>
                    <div className="text-[10px] text-gray-300 uppercase tracking-widest px-2 py-0.5 border border-gray-100 rounded-full">{project.time}</div>
                  </div>
                  <h3 className="text-3xl font-bold mb-3 text-gray-800">{project.title}</h3>
                  <p className="text-gray-500 leading-relaxed font-light max-w-lg">
                    {project.description}
                  </p>
                </div>

                {/* Hover State: Full Image & Title */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="text-xs font-bold tracking-[0.3em] uppercase text-design-primary mb-2">{project.category}</div>
                      <h3 className="text-4xl font-bold text-white mb-2 tracking-tight">{project.title}</h3>
                      <div className="w-16 h-1.5 bg-design-primary rounded-full"></div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Design;
