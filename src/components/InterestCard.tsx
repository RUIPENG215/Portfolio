import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Interest } from '../data/landingData';

interface InterestCardProps {
  interest: Interest;
  variants: any;
}

const InterestCard = ({ interest, variants }: InterestCardProps) => {
  return (
    <Link to={interest.path} className="group">
      <motion.div 
        className={`h-96 ${interest.bgClass} ${interest.borderClass} ${interest.textClass} ${interest.isMono ? 'font-mono' : ''} border rounded-2xl p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden`}
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <div className={interest.accentClass}>
            {interest.icon}
          </div>
        </div>
        <div>
          <h2 className={`text-3xl font-bold mb-2 group-hover:${interest.accentClass} transition-colors ${!interest.isMono && interest.id === 'humanities' ? 'font-serif' : ''}`}>
            {interest.title}
          </h2>
          <p className={interest.isMono ? 'text-[#8b949e]' : 'text-gray-600'}>
            {interest.subtitle}
          </p>
        </div>
        <div className="mt-4">
          <p className={`text-sm ${interest.isMono ? 'text-[#8b949e] opacity-80' : 'text-gray-500'}`}>
            {interest.description}
          </p>
        </div>
        <div className={`absolute bottom-4 right-4 ${interest.exploreBtnClass} text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0`}>
          <span className="font-bold">Explore &rarr;</span>
        </div>
      </motion.div>
    </Link>
  );
};

export default InterestCard;
