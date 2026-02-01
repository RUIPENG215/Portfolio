import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Cpu, Layers, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { experiences, projectSummaries, education, skillGroups, honors } from '../data/resumeData';

const Resume = () => {
  const [showSecondaryEducation, setShowSecondaryEducation] = useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="w-full py-6 md:py-10">
      
      <div className="space-y-12 md:space-y-20">
        
        {/* Section 1: Education - Moved to Top with Large Heading */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-gray-900 text-white rounded-xl shadow-lg">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Education</h3>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {education.filter(edu => !edu.isSecondary).map((edu, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="group relative bg-white rounded-[2rem] p-8 md:p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700 ease-out"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                  <div className="flex items-center gap-12 flex-1">
                    {edu.logo && (
                      <div className="w-48 h-12 flex items-center justify-start transition-all duration-500 shrink-0">
                        <img 
                          src={edu.logo} 
                          alt={`${edu.school} logo`} 
                          style={{ transform: `scale(${edu.logoScale || 1})` }}
                          className="max-w-full max-h-full object-contain object-left filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 origin-left"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="text-gray-300"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg></div>';
                          }}
                        />
                      </div>
                    )}
                    <div>
                      <div className="text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">{edu.period}</div>
                      <h4 className="text-3xl font-black text-gray-900 mb-2 group-hover:text-design-primary transition-colors leading-tight">
                        {edu.school}
                      </h4>
                      <p className="text-xl text-gray-600 font-medium">{edu.major}</p>
                    </div>
                  </div>
                  {edu.degree && (
                    <div className="relative z-10 hidden lg:block text-right shrink-0">
                      <div className="px-5 py-2.5 bg-gray-50 text-gray-900 rounded-2xl font-black text-sm uppercase tracking-widest border border-gray-100 group-hover:bg-design-primary group-hover:text-white group-hover:border-design-primary transition-all duration-500 shadow-sm">
                        {edu.degree}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Collapsible Secondary Education (e.g. ECUST) */}
            <div className="mt-4">
              <button 
                onClick={() => setShowSecondaryEducation(!showSecondaryEducation)}
                className="flex items-center gap-3 text-sm font-black text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest px-4 py-2 rounded-xl hover:bg-gray-50"
              >
                {showSecondaryEducation ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                {showSecondaryEducation ? 'Hide Previous Education' : 'Show Previous Education'}
              </button>
              
              <AnimatePresence>
                {showSecondaryEducation && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6 space-y-6">
                      {education.filter(edu => edu.isSecondary).map((edu, index) => (
                        <motion.div 
                          key={index}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className="group relative bg-white/50 rounded-[2rem] p-8 md:p-10 border border-dashed border-gray-200 hover:border-solid hover:border-gray-300 transition-all duration-500"
                        >
                          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                            <div className="flex items-center gap-12 flex-1">
                              {edu.logo && (
                                <div className="w-48 h-12 flex items-center justify-start shrink-0 opacity-40 group-hover:opacity-100 transition-all duration-500">
                                  <img 
                                    src={edu.logo} 
                                    alt={`${edu.school} logo`} 
                                    style={{ transform: `scale(${edu.logoScale || 1})` }}
                                    className="max-w-full max-h-full object-contain object-left filter grayscale group-hover:grayscale-0 transition-all duration-500"
                                  />
                                </div>
                              )}
                              <div>
                                <div className="text-xs font-black text-gray-300 mb-2 uppercase tracking-widest">{edu.period}</div>
                                <h4 className="text-2xl font-black text-gray-400 mb-2 group-hover:text-gray-900 transition-colors leading-tight">
                                  {edu.school}
                                </h4>
                                <p className="text-lg text-gray-400 font-medium group-hover:text-gray-600 transition-colors">{edu.major}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.section>

        {/* Section 2: Professional Experience */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
           <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-gray-900 text-white rounded-xl shadow-lg">
                <Briefcase size={24} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Experience</h3>
          </div>

          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              variants={fadeInUp}
              className="group relative bg-white rounded-[2rem] p-8 md:p-12 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden mb-6 last:mb-0"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50 rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-150 duration-700 ease-out"></div>
              
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                  <div>
                    <h4 className="text-4xl font-black text-gray-900 mb-2">{exp.company}</h4>
                    <p className="text-xl text-gray-500 font-medium">{exp.role}</p>
                  </div>
                  <div className="px-4 py-2 bg-gray-100 text-gray-900 rounded-full font-mono text-sm font-bold">
                    {exp.period}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-4 text-lg text-gray-600 leading-relaxed">
                    {exp.description.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                  {exp.achievement && (
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                      <strong className="block text-gray-900 mb-2 text-sm uppercase tracking-wider">{exp.achievement.label}</strong>
                      <p className="text-gray-700">
                        {exp.achievement.text}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* Section 3: Selected Projects */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-gray-900 text-white rounded-xl shadow-lg">
                <Layers size={24} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Featured Projects</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectSummaries.map((project, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className={`group p-8 rounded-[2rem] border transition-all duration-500 relative overflow-hidden ${
                  project.ongoing 
                    ? "bg-white border-purple-100 shadow-sm hover:shadow-2xl hover:border-purple-200" 
                    : "bg-white border-gray-100 shadow-sm hover:shadow-2xl"
                }`}
              >
                {/* Background Pattern */}
                <div className={`absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500 ${
                  project.ongoing ? "text-purple-600" : "text-gray-900"
                }`}>
                  {project.icon}
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-4 rounded-2xl ${project.ongoing ? "bg-purple-50 text-purple-600" : project.colorClass}`}>
                      {project.icon}
                    </div>
                    {project.ongoing ? (
                      <div className="flex flex-col items-end gap-1">
                        <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-[10px] font-black uppercase tracking-wider border border-purple-200">Ongoing</span>
                        <span className="text-[10px] font-mono text-gray-400 font-bold">{project.period}</span>
                      </div>
                    ) : (
                      <span className="text-xs font-mono text-gray-400 mt-2">{project.period}</span>
                    )}
                  </div>
                  <h4 className={`text-2xl font-bold mb-3 transition-colors ${
                    project.ongoing ? "text-gray-900 group-hover:text-purple-600" : `text-gray-900 group-hover:${project.textColorClass}`
                  }`}>
                    {project.title}
                  </h4>
                  <p className={`mb-6 leading-relaxed ${project.ongoing ? "text-gray-600" : "text-gray-600"}`}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map(tag => (
                      <span 
                        key={tag} 
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${
                          project.ongoing ? "bg-purple-50 text-purple-600" : "bg-gray-50 text-gray-600"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 4: Honors & Recognition */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-10"
        >
          <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-gray-900 text-white rounded-xl shadow-lg">
                <Cpu size={24} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Expertise & Recognition</h3>
          </div>

          {/* Honors Card */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-yellow-50 text-yellow-600 rounded-xl">
                <Award size={20} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Honors & Awards</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {honors.map((honor, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeInUp}
                  className="flex flex-col p-6 rounded-3xl bg-gray-50/50 border border-gray-100/50 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500 group"
                >
                  <div className="mb-4">
                    <Star size={20} className="text-yellow-500 fill-yellow-500 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900 leading-tight mb-2 group-hover:text-design-primary transition-colors">{honor.title}</div>
                    <div className="text-xs text-gray-500 font-medium leading-relaxed">{honor.org}</div>
                  </div>
                  {honor.year && (
                    <div className="mt-4 pt-4 border-t border-gray-200/50 text-[10px] font-mono text-gray-400 font-bold uppercase tracking-widest">
                      {honor.year}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills Card */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <Cpu size={20} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Skills & Technical Proficiency</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {skillGroups.map((group, i) => (
                <div key={i} className="space-y-6 flex flex-col">
                  <div className="space-y-4">
                    <h5 className="text-xs font-black text-gray-900 uppercase tracking-widest bg-gray-100 px-3 py-1.5 rounded-lg inline-block">{group.category}</h5>
                    {group.description && (
                      <p className="text-sm text-gray-500 leading-relaxed font-medium italic">
                        "{group.description}"
                      </p>
                    )}
                  </div>
                  <div className="space-y-5 mt-auto">
                    {group.skills.map((skill, si) => (
                      <div key={si} className="group">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-900 font-bold group-hover:text-design-primary transition-colors">{skill.name}</span>
                          <span className="text-[10px] font-mono text-gray-400 font-bold">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.2 + (si * 0.1) }}
                            className="h-full bg-gray-900 group-hover:bg-design-primary transition-colors"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Resume;