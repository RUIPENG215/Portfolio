import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Cpu, Layers, Star } from 'lucide-react';
import { experiences, projectSummaries, education, skillGroups, honors } from '../data/resumeData';

const Resume = () => {
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
        
        {/* Section 1: Professional Experience */}
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

        {/* Section 2: Selected Projects */}
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
              <h3 className="text-3xl font-bold text-gray-900">Key Projects</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectSummaries.map((project, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp} 
                className={`group rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 ${
                  project.ongoing 
                    ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-lg hover:shadow-2xl" 
                    : "bg-white"
                }`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-3 rounded-2xl group-hover:scale-110 transition-transform ${
                    project.ongoing ? "bg-white/10 backdrop-blur-sm" : project.colorClass
                  } ${project.textColorClass}`}>
                    {project.icon}
                  </div>
                  {project.ongoing ? (
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-bold border border-purple-500/30">Ongoing</span>
                  ) : (
                    <span className="text-xs font-mono text-gray-400 mt-2">{project.period}</span>
                  )}
                </div>
                <h4 className={`text-2xl font-bold mb-3 transition-colors ${
                  project.ongoing ? "text-white" : `text-gray-900 group-hover:${project.textColorClass}`
                }`}>
                  {project.title}
                </h4>
                <p className={`mb-6 leading-relaxed ${project.ongoing ? "text-gray-300" : "text-gray-600"}`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        project.ongoing ? "bg-white/10 text-gray-200" : "bg-gray-50 text-gray-600"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 3: The "Grid" - Education, Skills, Honors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Education */}
          <motion.section 
            className="space-y-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-2">
               <GraduationCap className="text-gray-400" size={20} />
               <h3 className="text-xl font-bold text-gray-900">Education</h3>
            </div>
            <motion.div 
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm h-full hover:shadow-lg transition-shadow duration-300"
              whileHover={{ y: -5 }}
            >
               <div className="space-y-8">
                  {education.map((edu, i) => (
                    <div key={i} className="group">
                      <div className="text-xs font-bold text-gray-400 mb-1 group-hover:text-gray-600 transition-colors">{edu.period}</div>
                      <div className="font-bold text-lg group-hover:text-design-primary transition-colors">{edu.school}</div>
                      <div className="text-gray-600">{edu.degree}</div>
                    </div>
                  ))}
               </div>
            </motion.div>
          </motion.section>

          {/* Skills */}
          <motion.section 
            className="space-y-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-2">
               <Cpu className="text-gray-400" size={20} />
               <h3 className="text-xl font-bold text-gray-900">Skills</h3>
            </div>
            <motion.div 
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm h-full hover:shadow-lg transition-shadow duration-300"
              whileHover={{ y: -5 }}
            >
               <div className="space-y-6">
                  {skillGroups.map((group, i) => (
                    <div key={i}>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{group.category}</div>
                      <div className="flex flex-wrap gap-2">
                        {group.skills.map(s => (
                          <span key={s} className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-sm hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-default">{s}</span>
                        ))}
                      </div>
                    </div>
                  ))}
               </div>
            </motion.div>
          </motion.section>

          {/* Honors */}
          <motion.section 
            className="space-y-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-2">
               <Award className="text-gray-400" size={20} />
               <h3 className="text-xl font-bold text-gray-900">Honors</h3>
            </div>
            <motion.div 
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm h-full hover:shadow-lg transition-shadow duration-300"
              whileHover={{ y: -5 }}
            >
               <ul className="space-y-6">
                  {honors.map((honor, i) => (
                    <li key={i} className="flex gap-3 group">
                      <Star className="text-yellow-400 shrink-0 mt-1 group-hover:scale-110 transition-transform" size={16} />
                      <div>
                        <div className="font-bold text-gray-900 group-hover:text-design-primary transition-colors">{honor.title}</div>
                        <div className="text-sm text-gray-500">{honor.org} {honor.year}</div>
                      </div>
                    </li>
                  ))}
               </ul>
            </motion.div>
          </motion.section>

        </div>

      </div>
    </div>
  );
};

export default Resume;