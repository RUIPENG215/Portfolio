import { socialLinks } from '../data/socialLinks';

const Footer = () => {
  return (
    <footer className="w-full pt-12 pb-6 border-t border-gray-200 mt-20 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
      <div className="text-gray-500 text-sm font-medium">
        © 2026 Wang Ruipeng. All rights reserved.
      </div>
      
      <div className="flex gap-6">
        {socialLinks.map((social, i) => (
          <a 
            key={i} 
            href={social.link} 
            className="text-gray-400 hover:text-gray-900 transition-colors"
            aria-label={social.name}
          >
            {social.icon}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
