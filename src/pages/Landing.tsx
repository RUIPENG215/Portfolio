import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Resume from '../components/Resume';
import Footer from '../components/Footer';
import InterestCard from '../components/InterestCard';
import { interests, heroFields } from '../data/landingData';
import { useLoading } from '../context/LoadingContext';

const Landing = () => {
  const { isLoaded } = useLoading();

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* SVG Filter for clean outline */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="clean-outline">
            <feMorphology in="SourceAlpha" result="expanded" operator="dilate" radius="1"/>
            <feComposite in="expanded" in2="SourceAlpha" operator="out" result="outline"/>
            <feFlood floodColor="rgba(255,255,255,0.3)" result="color"/>
            <feComposite in="color" in2="outline" operator="in"/>
          </filter>
        </defs>
      </svg>
      {/* Main Content Wrapper - moves up to reveal footer */}
      <div className="relative z-10 bg-gray-50 mb-[30vw] md:mb-[20vw] shadow-2xl">
        <Hero>
          <motion.div 
            className="flex flex-col items-start text-left w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex flex-col mb-6"
            >
              <span className="text-white/40 text-xs md:text-sm tracking-[0.5em] uppercase mb-3">Creative Portfolio</span>
              <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.9] mb-2">
                <span className="outline-text">WANG</span><br />
                RUIPENG
              </h1>
            </motion.div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-3 mb-10">
              {heroFields.map((field, i) => (
                <motion.div 
                  key={field.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                  transition={{ 
                    delay: 0.2 + (i * 0.08), 
                    duration: 0.4,
                    ease: [0.23, 1, 0.32, 1] 
                  }}
                  className="group flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <field.icon size={14} className={`${field.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
                  <span className="text-xs md:text-sm font-semibold tracking-wide text-white/90 group-hover:text-white transition-colors">
                    {field.label}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="text-white/40 max-w-lg text-sm md:text-base leading-relaxed font-light border-l-2 border-white/40 pl-6"
            >
              Exploring the convergence of aesthetic form, technical logic, and human expression. 
              Currently studying Industrial Design at Xi'an Jiaotong University.
            </motion.p>
          </motion.div>
        </Hero>

        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 bg-gray-50">
          
          <motion.div 
            className="w-full mb-12 md:20 mt-6 md:mt-10 text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Profile Intro Section */}
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 mb-16 md:mb-24">
              {/* Photo Container */}
              <div className="w-48 md:w-64 shrink-0 relative group">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white">
                  <img 
                    src="/profile.webp" 
                    alt="Wang Ruipeng" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left flex flex-col justify-center h-full">
                <div className="inline-block px-3 py-1 bg-black text-white text-xs font-bold rounded-full mb-4 self-center md:self-start">
                  OPEN TO WORK
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight">
                  Wang Ruipeng
                </h2>
                <p className="text-xl md:text-2xl text-gray-500 font-medium mb-6">
                  Industrial Designer & Creative Technologist
                </p>
                <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto md:mx-0">
                  Bridging the gap between physical form and digital experience. Passionate about creating intuitive products that solve real-world problems through design thinking and engineering precision.
                </p>
                
                <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
                   <a href="#contact" className="px-8 py-3 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 transition-colors">
                     Contact Me
                   </a>
                   <button className="px-8 py-3 bg-white text-gray-900 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-colors">
                     Download CV
                   </button>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 my-16"></div>

            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Fields of interests</h2>
            <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
              Dive into my multidisciplinary journey. From industrial design aesthetics to rigorous engineering solutions and artistic expression.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-20">
            {interests.map((interest) => (
              <InterestCard key={interest.id} interest={interest} variants={itemVariants} />
            ))}
          </div>

          <Resume />
          <Footer />
        </div>
      </div>

      {/* Fixed Footer Reveal */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 h-[30vw] md:h-[20vw] bg-[#050505] flex items-end justify-center z-0 pointer-events-none overflow-hidden pb-0"
        exit={{ opacity: 0, transition: { duration: 0 } }} // Instantly hide on exit to prevent artifacts
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full flex justify-center items-end"
        >
          <h1 className="text-[25vw] font-black text-[#1a1a1a] select-none tracking-tighter leading-none whitespace-nowrap -mb-4 md:-mb-10">
            RUIPENG
          </h1>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Landing;
