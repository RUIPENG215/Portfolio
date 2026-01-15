import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Camera, X, MapPin, Calendar } from 'lucide-react';
import Footer from '../components/Footer';
import { photography, musicTracks } from '../data/humanitiesData';
import type { HumanitiesPhotoData, HumanitiesMusicData } from '../data/humanitiesData';

// Memoized Photo Card Component to prevent unnecessary re-renders
const PhotoCard = memo(({ 
  photo, 
  index, 
  onClick 
}: { 
  photo: HumanitiesPhotoData; 
  index: number; 
  onClick: (photo: HumanitiesPhotoData) => void;
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
        delay: (index % 6) * 0.1, 
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
          loading="lazy"
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

  return (
    <div className={`min-h-screen bg-humanities-bg text-gray-800 font-serif pt-32 pb-10 ${selectedPhoto ? 'overflow-hidden' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <header className="mb-20 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity" }}
          >
            <span className="block text-humanities-primary italic text-xl mb-2">The Soul of the Maker</span>
            <h1 className="text-6xl md:text-8xl text-gray-900 mb-6">Humanities</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-sans font-light">
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
            transition={{ duration: 0.8 }}
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
            {musicTracks.map((track: HumanitiesMusicData, i) => (
              <motion.div 
                key={track.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-humanities-secondary/30 flex items-center gap-4 hover:shadow-md transition-shadow"
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: (i % 4) * 0.1, 
                  duration: 0.8,
                  ease: "easeOut" 
                }}
                whileHover={{ x: 5 }} // Reduced movement
                style={{ willChange: "transform, opacity" }}
              >
                <div className="w-12 h-12 bg-humanities-primary/20 rounded-full flex items-center justify-center text-humanities-primary">
                  {track.icon || <Music size={20} />}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{track.title}</h3>
                  <p className="text-sm text-gray-500">{track.type} • {track.duration}</p>
                </div>
              </motion.div>
            ))}
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
              className="relative w-fit max-w-[95vw] md:max-w-[90vw] max-h-[90vh] bg-[#121212] rounded-lg overflow-hidden flex flex-col md:flex-row border border-white/5" // Removed large shadow
            >
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-6 right-6 z-20 p-2 text-white/40 hover:text-white transition-colors bg-black/20 rounded-full" // Removed backdrop-blur
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-auto md:h-[90vh] bg-black flex items-center justify-center overflow-hidden">
                <motion.img 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  src={selectedPhoto.image} 
                  alt={selectedPhoto.title} 
                  className="w-full h-auto md:w-auto md:h-full object-contain block"
                />
              </div>

              <div 
                className={`w-full flex-shrink-0 flex flex-col bg-[#121212] transition-all duration-500 ease-in-out overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent ${
                  selectedPhoto.description.length > 200 ? 'md:w-[450px] lg:w-[550px]' : 'md:w-80 lg:w-96'
                }`}
              >
                <div className="p-10 md:p-14">
                  <div className="max-w-xl mx-auto md:mx-0">
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <span className="text-humanities-primary font-sans text-[10px] tracking-[0.4em] uppercase mb-6 block opacity-80">
                        {selectedPhoto.category}
                      </span>
                      <h2 className="text-3xl md:text-4xl text-white font-light mb-8 leading-tight tracking-tight">
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

                      <p className="text-white/70 leading-relaxed font-sans font-light text-sm md:text-base italic tracking-wide whitespace-pre-wrap">
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
