import { useState, memo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Camera, X, MapPin, Calendar } from 'lucide-react';
import Footer from '../components/Footer';
import { photography, musicTracks, musicBio } from '../data/humanitiesData';
import type { HumanitiesPhotoData, HumanitiesMusicData } from '../data/types';

// Memoized Photo Card Component to prevent unnecessary re-renders
const PhotoCard = memo(({ 
  photo, 
  index, 
  onClick,
  priority = false
}: { 
  photo: HumanitiesPhotoData; 
  index: number; 
  onClick: (photo: HumanitiesPhotoData) => void;
  priority?: boolean;
}) => {
  // Precise aspect ratio styles to prevent layout shift
  const aspectStyle = photo.ratio === 'horizontal' 
    ? { aspectRatio: '567 / 520' } 
    : photo.ratio === 'vertical' 
      ? { aspectRatio: '441 / 646' } 
      : { aspectRatio: '1 / 1' };

  return (
    <motion.div 
      className="break-inside-avoid relative group cursor-pointer mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        delay: 0.3 + (index % 6) * 0.1, 
        duration: 0.8, // Reduced duration for snappier feel
        ease: [0.22, 1, 0.36, 1]
      }}
      style={{ willChange: "transform, opacity" }}
      onClick={() => onClick(photo)}
    >
      <div 
        className="bg-[#1a1a1a] rounded-sm overflow-hidden"
        style={aspectStyle}
      >
        <img 
          src={photo.image} 
          alt={photo.title} 
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]" // Reduced scale and duration for performance
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6">
          <p className="text-white font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase mb-1">{photo.title}</p>
          <div className="w-6 h-px bg-humanities-primary"></div>
        </div>
      </div>
    </motion.div>
  );
});

const Humanities = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<HumanitiesPhotoData | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedPhoto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPhoto]);

  return (
    <div className="min-h-screen bg-humanities-bg text-gray-800 font-serif pt-32 pb-10 overflow-x-hidden w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <header className="mb-20 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={{ willChange: "transform, opacity" }}
          >
            <span className="block text-humanities-primary italic text-xl mb-2">The Soul of the Maker</span>
            <h1 className="text-6xl md:text-8xl text-gray-900 mb-6">Humanities</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-serif font-light leading-relaxed">
              "Art is the elimination of the unnecessary." <br/>
              Exploring the world through the lens of a camera and the notes of a melody.
            </p>
          </motion.div>
        </header>

        <section className="mb-24">
          <motion.div 
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Camera className="text-humanities-primary" />
            <h2 className="text-3xl italic">Photography</h2>
          </motion.div>
          
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 min-h-[400px]">
            {photography.map((photo, i) => (
              <PhotoCard 
                key={photo.id} 
                photo={photo} 
                index={i} 
                onClick={setSelectedPhoto} 
                priority={i < 6}
              />
            ))}
          </div>
        </section>

        <section className="mb-24">
          <motion.div 
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Music className="text-humanities-primary" />
            <h2 className="text-3xl italic">Music</h2>
          </motion.div>
          
          <div className="relative">
            {/* Background Decorative Element */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-humanities-primary/5 rounded-full blur-3xl -z-10" />
            
            <motion.div 
              className="bg-white/40 backdrop-blur-sm border border-humanities-secondary/20 rounded-2xl p-8 md:p-12 shadow-[0_4px_20px_rgb(0,0,0,0.03)] relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Subtle grid pattern background */}
              <div className="absolute inset-0 opacity-[0.015] pointer-events-none" 
                   style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

              <div className="relative z-10 w-full">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="flex items-center gap-3 mb-8"
                >
                  <div className="h-px w-8 bg-humanities-primary/40" />
                  <span className="text-xs tracking-[0.3em] uppercase text-humanities-primary/60 font-serif font-medium">
                    Musical Philosophy
                  </span>
                </motion.div>

                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light mb-10 font-serif text-justify">
                  {musicBio}
                </p>
                
                <div className="flex flex-wrap gap-x-8 gap-y-4">
                  {[
                    { label: 'Symphony', icon: '01' },
                    { label: 'Jazz', icon: '02' },
                    { label: 'Clarinet', icon: '03' },
                    { label: 'AI Synthesis', icon: '04' }
                  ].map((tag, idx) => (
                    <motion.div 
                      key={tag.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + (idx * 0.1), duration: 0.5 }}
                      className="flex items-baseline gap-2 group/tag"
                    >
                      <span className="text-[10px] font-serif text-humanities-primary/30 group-hover/tag:text-humanities-primary/60 transition-colors">
                        {tag.icon}
                      </span>
                      <span className="text-sm tracking-widest uppercase text-gray-500 group-hover/tag:text-gray-900 transition-colors font-serif">
                        {tag.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Elegant floating icon */}
              <div className="absolute -bottom-10 -right-10 opacity-[0.02] text-humanities-primary rotate-[-15deg] group-hover:rotate-0 transition-transform duration-1000 pointer-events-none">
                <Music size={220} strokeWidth={0.5} />
              </div>
            </motion.div>

            {musicTracks.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                {musicTracks.map((track: HumanitiesMusicData, i) => (
                  <motion.div 
                    key={track.id}
                    className="group bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-humanities-secondary/10 hover:border-humanities-primary/20 hover:shadow-xl hover:shadow-humanities-primary/5 transition-all duration-500"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-full bg-humanities-primary/5 flex items-center justify-center text-humanities-primary group-hover:bg-humanities-primary group-hover:text-white transition-all duration-500">
                        {track.icon || <Music size={24} strokeWidth={1.5} />}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1 group-hover:text-humanities-primary transition-colors">{track.title}</h3>
                        <p className="text-xs tracking-widest uppercase text-gray-400">{track.type} • {track.duration}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
        <Footer />
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setSelectedPhoto(null)}
              className="absolute inset-0 bg-black/95" // Removed backdrop-blur-md for performance
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[95vw] md:max-w-fit h-[85vh] md:h-[90vh] md:max-h-[90vh] bg-[#121212] rounded-lg overflow-hidden flex flex-col md:flex-row border border-white/5 shadow-2xl"
            >
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-2 text-white/40 hover:text-white transition-colors bg-black/40 backdrop-blur-md rounded-full"
              >
                <X size={20} />
              </button>

              {/* Mobile: Scrollable Container for Image + Text */}
              <div className="md:hidden flex-1 overflow-y-auto scrollbar-hide">
                 {/* Image Section - Natural Height */}
                 <div className="w-full bg-[#121212] relative">
                   <img 
                     src={selectedPhoto.image} 
                     alt={selectedPhoto.title} 
                     className="w-full h-auto object-contain block"
                   />
                   <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#121212]/50 pointer-events-none" />
                 </div>

                 {/* Text Section - Immediately follows image */}
                 <div className="bg-[#121212] p-8 pb-20">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <span className="text-humanities-primary font-sans text-[10px] tracking-[0.4em] uppercase mb-4 block opacity-80">
                        {selectedPhoto.category}
                      </span>
                      <h2 className="text-3xl text-white font-light mb-6 leading-tight tracking-tight">
                        {selectedPhoto.title}
                      </h2>
                      
                      <div className="space-y-4 mb-8">
                        {selectedPhoto.location && (
                          <div className="flex items-center gap-3 text-white/50 font-sans text-xs tracking-wider">
                            <MapPin size={12} className="text-humanities-primary" />
                            {selectedPhoto.location}
                          </div>
                        )}
                        {selectedPhoto.date && (
                          <div className="flex items-center gap-3 text-white/50 font-sans text-xs tracking-wider">
                            <Calendar size={12} className="text-humanities-primary" />
                            {selectedPhoto.date}
                          </div>
                        )}
                      </div>

                      <div className="w-10 h-px bg-white/10 mb-8" />

                      <p className="text-white/70 leading-relaxed font-sans font-light text-sm italic tracking-wide whitespace-pre-wrap">
                        {selectedPhoto.description}
                      </p>
                    </motion.div>
                 </div>
              </div>

              {/* Desktop Layout (Hidden on Mobile) */}
              <div className="hidden md:flex w-auto h-full bg-[#121212] items-center justify-center overflow-hidden">
                <motion.img 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  src={selectedPhoto.image} 
                  alt={selectedPhoto.title} 
                  className="h-full w-auto max-w-[70vw] object-contain block"
                />
              </div>

              <div 
                className={`hidden md:flex flex-shrink-0 flex-col bg-[#121212] transition-all duration-500 ease-in-out overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent ${
                  selectedPhoto.description.length > 200 ? 'w-[450px] lg:w-[550px]' : 'w-80 lg:w-96'
                }`}
              >
                <div className="p-14">
                  <div className="max-w-xl mx-0">
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <span className="text-humanities-primary font-sans text-[10px] tracking-[0.4em] uppercase mb-6 block opacity-80">
                        {selectedPhoto.category}
                      </span>
                      <h2 className="text-4xl text-white font-light mb-8 leading-tight tracking-tight">
                        {selectedPhoto.title}
                      </h2>
                      
                      <div className="space-y-5 mb-10">
                        {selectedPhoto.location && (
                          <div className="flex items-center gap-3 text-white/50 font-sans text-xs tracking-wider">
                            <MapPin size={12} className="text-humanities-primary" />
                            {selectedPhoto.location}
                          </div>
                        )}
                        {selectedPhoto.date && (
                          <div className="flex items-center gap-3 text-white/50 font-sans text-xs tracking-wider">
                            <Calendar size={12} className="text-humanities-primary" />
                            {selectedPhoto.date}
                          </div>
                        )}
                      </div>

                      <div className="w-10 h-px bg-white/10 mb-10" />

                      <p className="text-white/70 leading-relaxed font-sans font-light text-base italic tracking-wide whitespace-pre-wrap">
                        {selectedPhoto.description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Humanities;
