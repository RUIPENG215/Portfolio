import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
    <div className="min-h-screen overflow-x-hidden w-full">
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
      <div className="relative z-10 bg-gray-50 mb-[10vh] md:mb-[20vw] shadow-2xl">
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
              <span className="text-white/40 text-xs md:text-sm tracking-[0.5em] uppercase mb-3">Creative Space</span>
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
              className="text-white/40 max-w-[80%] md:max-w-lg text-sm md:text-base leading-relaxed font-light border-l-2 border-white/40 pl-6"
            >
              Exploring the convergence of aesthetic form, technical logic, and human expression. 
              Currently studying Industrial Design at Xi'an Jiaotong University.
            </motion.p>
          </motion.div>
        </Hero>

        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 pt-20 md:pt-32 pb-16 bg-gray-50">
          
          <motion.div 
            className="w-full mt-12 md:mt-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Bold Profile Section */}
            <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 items-center">
              {/* Massive Name Background (Desktop only) */}
              <div className="hidden md:block absolute -top-32 -left-10 text-[12rem] font-black text-black/[0.03] select-none pointer-events-none tracking-tighter leading-none">
                ABOUT
              </div>

              {/* Text Content - Spans left and middle */}
               <div className="md:col-span-8 z-10">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="flex flex-col h-full justify-center"
                  >
                    <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tight leading-[1.1]">
                      Where <span className="text-gray-400 italic font-serif font-light border-b-2 border-gray-100">humanity</span> meets <br/>
                      <span className="text-gray-900">design & engineering.</span>
                    </h2>
  
                    <div className="flex flex-col md:flex-row gap-12">
                      <div className="flex-1">
                        <div className="mb-2 text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">Profile</div>
                        <p className="text-2xl md:text-4xl text-gray-900 font-black mb-4 tracking-tighter leading-none">
                          WANG <br/>
                          RUIPENG
                        </p>
                        <p className="text-sm md:text-base text-gray-500 font-bold uppercase tracking-widest mb-6">
                          Industrial Designer & <br/>
                          Creative Engineer
                        </p>
                        <Link to="/contact" className="group inline-flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-gray-900 hover:text-gray-600 transition-colors">
                          Contact Me
                          <span className="w-8 h-px bg-gray-900 group-hover:w-12 transition-all" />
                        </Link>
                      </div>
                      <div className="flex-1 flex flex-col justify-end">
                        <p className="text-base md:text-lg text-gray-500 leading-relaxed font-light">
                          Bridging the gap between human experience, physical form, and technical logic. Passionate about creating intuitive solutions that solve complex problems through integrated design thinking.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

              {/* Photo Container - Smaller and Balanced */}
              <div className="md:col-span-4 flex justify-center md:justify-end items-center mt-20 md:mt-0">
                <div className="relative w-[75vw] md:w-full max-w-[320px] md:max-w-[280px]">
                  {/* Mobile Decoration - Subtle rotated background */}
                  <div className="absolute inset-0 bg-gray-100 rounded-[2rem] -z-10 md:hidden transform rotate-6 scale-105" />
                  <div className="absolute inset-0 border-2 border-gray-100 rounded-[2rem] -z-10 md:hidden transform -rotate-3 scale-105" />
                  
                  <motion.div 
                    className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-gray-100"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{ willChange: "transform" }}
                  >
                    <img 
                      src="/profile.webp" 
                      alt="Wang Ruipeng" 
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </motion.div>
                  
                  {/* Floating caption for photo */}
                  <div className="absolute -bottom-6 -right-6 md:-bottom-6 md:-right-4 bg-white p-4 md:p-5 shadow-xl rounded-xl max-w-[140px] md:max-w-[160px] z-20 border border-gray-100">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-1">Based in</p>
                    <p className="text-xs font-bold text-gray-900 text-right">Xi'an, China</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bold Transition to Interests - Grid Layout */}
            <div className="relative mt-40 md:mt-64 mb-24">
              {/* Massive Background Text */}
              <div className="hidden md:block absolute -top-20 -right-20 text-[14rem] font-black text-black/[0.02] select-none pointer-events-none tracking-tighter leading-none">
                FIELDS
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end relative z-10">
                <motion.div 
                  className="md:col-span-5"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-px bg-gray-900" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Selected Works</span>
                  </div>
                  <h3 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter leading-[0.9]">
                    Exploring <br/> 
                    The Synergy.
                  </h3>
                </motion.div>

                <motion.div 
                  className="md:col-span-7 pb-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <p className="text-xl md:text-2xl text-gray-500 font-medium leading-tight max-w-2xl">
                    A multidisciplinary approach to <span className="text-gray-900">problem solving</span>, bridging human experience with technical logic.
                  </p>
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-20">
              {interests.map((interest) => (
                <InterestCard key={interest.id} interest={interest} variants={itemVariants} />
              ))}
            </div>

          <Resume />
          <Footer />
        </motion.div>
      </div>
    </div>

      {/* Fixed Footer Reveal */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 h-[10vh] md:h-[20vw] bg-[#050505] flex items-end justify-center z-0 pointer-events-none overflow-hidden pb-0"
        initial={{ opacity: 1 }} // Force initial opacity to 1
        animate={{ opacity: 1 }} // Maintain opacity
        exit={{ opacity: 0, transition: { duration: 0 } }} 
      >
        <div className="w-full flex justify-center items-end">
          <h1 className="text-[26.5vw] md:text-[25vw] font-black text-[#1a1a1a] select-none tracking-tighter leading-none whitespace-nowrap -mb-[1.5vh] md:-mb-10">
            RUIPENG
          </h1>
        </div>
      </motion.div>
    </div>
  );
};

export default Landing;
