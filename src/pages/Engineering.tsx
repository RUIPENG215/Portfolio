import { motion } from 'framer-motion';
import { Terminal, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { engineeringProjects } from '../data/engineeringProjects';

const Engineering = () => {
  const projects = engineeringProjects;

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-mono pt-24 pb-10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center mb-12 border-b border-[#30363d] pb-4">
          <div className="flex items-center text-[#8b949e] text-sm">
            <Terminal size={16} className="mr-2" />
            <span>engineering@portfolio:~/projects</span>
          </div>
          <div className="hidden md:block text-xs text-[#8b949e] opacity-50 uppercase tracking-widest">
            System: Stable
          </div>
        </div>
        
        <header className="mb-16">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-[#e6edf3] mb-4 tracking-tight">
              <span className="text-[#ff7b72]">const</span> <span className="text-[#d2a8ff]">Engineer</span> = <span className="text-[#79c0ff]">{'{'}</span>
            </h1>
            <div className="pl-8 md:pl-16 text-[#8b949e] space-y-2 text-lg">
              <p>background: [<span className="text-[#a5d6ff]">'Mechanical Engineering'</span>, <span className="text-[#a5d6ff]">'Computer Science'</span>, <span className="text-[#a5d6ff]">'Electronics'</span>, <span className="text-[#a5d6ff]">'Communication'</span>],</p>
              <p>skills: [<span className="text-[#a5d6ff]">'Structural Optimization'</span>, <span className="text-[#a5d6ff]">'Frontend Development'</span>, <span className="text-[#a5d6ff]">'Circuit & PCB Design'</span>, <span className="text-[#a5d6ff]">'CAE Simulation'</span>],</p>
              <p>passion: <span className="text-[#a5d6ff]">'Solving Complex Engineering Problems'</span></p>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-[#79c0ff] mt-4">{'}'}</h1>
          </motion.div>
        </header>

        <div className="grid gap-6">
          {projects.map((project, index) => (
            <Link to={`/engineering/${project.id}`} key={index}>
              <motion.div 
                className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 hover:border-[#58a6ff] transition-colors group relative overflow-hidden"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-12 h-12 rounded bg-[#21262d] flex items-center justify-center text-[#79c0ff] group-hover:text-[#58a6ff] group-hover:scale-110 transition-all">
                      {project.icon}
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-[#e6edf3]">{project.title}</h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] border border-[#30363d] text-[#8b949e]">
                        {project.subtitle}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] border border-[#30363d] text-[#8b949e]">
                        {project.time}
                      </span>
                      <span className="ml-auto text-xs font-bold text-[#238636] flex items-center gap-1">
                        <Activity size={12} /> {project.status}
                      </span>
                    </div>
                    
                    <p className="text-[#8b949e] mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t, i) => (
                        <span key={i} className="px-3 py-1 text-xs bg-[#21262d] text-[#79c0ff] rounded-md font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
        <Footer darkMode={true} />
      </div>
    </div>
  );
};

export default Engineering;
