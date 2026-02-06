import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { socialLinks } from '../data/socialLinks';

interface FooterProps {
  darkMode?: boolean;
  lineArt?: boolean;
  paddingBottom?: string;
}

const Footer = ({ darkMode = false, lineArt = false, paddingBottom = "pb-4" }: FooterProps) => {
  const [activeQr, setActiveQr] = useState<string | null>(null);

  if (lineArt) {
    return (
      <footer className="w-full text-gray-900 mt-0">
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_minmax(0,1280px)_1fr] w-full border-b border-black/20">
          <div className="border-r border-black/20 hidden lg:block bg-gray-50/5"></div>
          
          <div className="p-6 md:p-8 lg:border-r border-black/20 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col gap-1 text-center md:text-left">
              <div className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-gray-800">
                © 2026 Wang Ruipeng
              </div>
              <div className="text-[10px] font-mono text-gray-700 uppercase tracking-[0.1em]">
                Built with passion & curiosity
              </div>
            </div>

            <div className="flex items-center gap-8 md:gap-12">
              <div className="hidden sm:flex gap-4 items-center">
                <div className="w-2 h-2 bg-black/10 rounded-full"></div>
                <span className="text-[10px] font-mono text-gray-700 uppercase tracking-widest">Global Connection</span>
              </div>

              <div className="flex gap-4">
                {socialLinks.map((social, i) => (
                  <div key={i} className="relative flex flex-col items-center justify-center w-fit">
                    <a 
                      href={social.link} 
                      className="w-8 h-8 border border-black/10 flex items-center justify-center text-gray-700 hover:text-black hover:border-black transition-all bg-white"
                      aria-label={social.name}
                      onMouseEnter={() => social.qrCode && setActiveQr(social.name)}
                      onMouseLeave={() => setActiveQr(null)}
                      onClick={(e) => {
                        if (social.qrCode) {
                          e.preventDefault();
                          setActiveQr(activeQr === social.name ? null : social.name);
                        }
                      }}
                    >
                      <div className="scale-75">
                        {social.icon}
                      </div>
                    </a>
                    
                    <AnimatePresence>
                      {social.qrCode && activeQr === social.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          className="absolute bottom-full mb-4 p-2 bg-white border border-black/10 shadow-xl z-50 w-32 h-auto flex flex-col items-center"
                        >
                          <img src={social.qrCode} alt={`${social.name} QR Code`} className="w-full h-auto object-contain" />
                          <div 
                            className="absolute -bottom-2 w-4 h-4 bg-white border-r border-b border-black/10 rotate-45 left-1/2 -translate-x-1/2"
                          ></div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden lg:block bg-gray-50/5"></div>
        </div>
        
        {/* Bottom decorative bar */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_minmax(0,1280px)_1fr] w-full lg:h-8 bg-black/5">
          <div className="border-r border-black/10 hidden lg:block"></div>
          <div className="lg:border-r border-black/10 flex items-center p-4 lg:py-0 lg:px-8 justify-between">
            <div className="text-[8px] font-mono text-gray-700 uppercase tracking-[0.5em]">System_End_Line</div>
            <div className="flex gap-4">
              <div className="w-2 h-2 border border-black/20 rotate-45"></div>
              <div className="w-2 h-2 border border-black/20 rotate-45"></div>
            </div>
          </div>
          <div className="hidden lg:block"></div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={`w-full mt-20 ${
      darkMode ? 'text-engineering-muted' : 'text-gray-700'
    }`}>
      {/* Separator Line */}
      <div className={`w-full h-[1px] mb-12 ${
        darkMode ? 'bg-engineering-border' : 'bg-gray-200'
      }`} />
      
      <div className={`flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left ${paddingBottom}`}>
        <div className="text-sm font-medium">
          © 2026 Wang Ruipeng. Built with passion & curiosity.
        </div>
        
        <div className="flex gap-6">
          {socialLinks.map((social, i) => (
            <div key={i} className="relative flex flex-col items-center justify-center w-fit">
              <a 
                href={social.link} 
                className={`transition-colors flex items-center justify-center ${
                  darkMode 
                    ? 'text-engineering-muted hover:text-engineering-hover' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                aria-label={social.name}
                onMouseEnter={() => social.qrCode && setActiveQr(social.name)}
                onMouseLeave={() => setActiveQr(null)}
                onClick={(e) => {
                  if (social.qrCode) {
                    e.preventDefault();
                    setActiveQr(activeQr === social.name ? null : social.name);
                  }
                }}
              >
                {social.icon}
              </a>

              <AnimatePresence>
                {social.qrCode && activeQr === social.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className={`absolute bottom-full mb-4 p-2 shadow-xl z-50 w-32 h-auto flex flex-col items-center ${
                      darkMode ? 'bg-[#161b22] border border-[#30363d]' : 'bg-white border border-gray-200'
                    }`}
                  >
                    <img src={social.qrCode} alt={`${social.name} QR Code`} className="w-full h-auto object-contain" />
                    <div 
                      className={`absolute -bottom-2 w-4 h-4 rotate-45 left-1/2 -translate-x-1/2 ${
                        darkMode ? 'bg-[#161b22] border-r border-b border-[#30363d]' : 'bg-white border-r border-b border-gray-200'
                      }`}
                    ></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
