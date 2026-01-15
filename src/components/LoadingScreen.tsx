import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        y: "-100%",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
      }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] text-white shadow-[0_10px_40px_-10px_rgba(255,255,255,0.2)] border-b border-white/5"
    >
      <div className="relative overflow-hidden mb-4">
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="text-4xl md:text-6xl font-black tracking-tighter uppercase"
        >
          RUIPENG
        </motion.div>
      </div>
      
      <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute inset-0 bg-white w-1/2"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-[10px] tracking-[0.4em] text-white/40 uppercase font-mono"
      >
        Initialising Creative Space
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
