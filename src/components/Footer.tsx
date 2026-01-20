import { socialLinks } from '../data/socialLinks';

interface FooterProps {
  darkMode?: boolean;
}

const Footer = ({ darkMode = false }: FooterProps) => {
  return (
    <footer className={`w-full mt-20 ${
      darkMode ? 'text-[#8b949e]' : 'text-gray-500'
    }`}>
      {/* Separator Line - using div instead of border for better rendering stability */}
      <div className={`w-full h-[1px] mb-12 ${
        darkMode ? 'bg-[#30363d]' : 'bg-gray-200'
      }`} />
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left pb-6">
        <div className="text-sm font-medium">
          © 2026 Wang Ruipeng. All rights reserved.
        </div>
        
        <div className="flex gap-6">
          {socialLinks.map((social, i) => (
            <a 
              key={i} 
              href={social.link} 
              className={`transition-colors ${
                darkMode 
                  ? 'text-[#8b949e] hover:text-[#58a6ff]' 
                  : 'text-gray-400 hover:text-gray-900'
              }`}
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
