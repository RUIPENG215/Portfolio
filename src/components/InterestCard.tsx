import { motion, useReducedMotion, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { MotionStyle, MotionValue } from 'framer-motion';
import type { Interest } from '../data/types';
import { useTilt } from '../hooks/useTilt';

interface InterestCardProps {
  interest: Interest;
  index: number;
  progress: MotionValue<number>;
}

const InterestCard = ({ interest, index, progress }: InterestCardProps) => {
  const prefersReducedMotion = useReducedMotion();
  const start = index * 0.12;
  const end = 0.76 + index * 0.12;
  const scale = useTransform(progress, [start, end], [0.96, 1]);
  const opacity = useTransform(progress, [start, end], [0.58, 1]);
  const tilt = useTilt(6);

  const scrollStyle: MotionStyle = prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity, scale };
  const cardStyle: MotionStyle = tilt.enabled
    ? { ...scrollStyle, rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformPerspective: 1100 }
    : scrollStyle;

  return (
    <Link to={interest.path} className="group">
      <motion.div
        className={`h-96 ${interest.bgClass} ${interest.borderClass} ${interest.textClass} ${interest.isMono ? 'font-mono' : ''} border rounded-2xl p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-[box-shadow,border-color,background-color] duration-500 relative overflow-hidden`}
        style={cardStyle}
        {...tilt.handlers}
      >
        {tilt.enabled && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0"
            style={{ backgroundImage: tilt.glare, opacity: tilt.glareOpacity }}
          />
        )}
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <div className={interest.accentClass}>
            {interest.icon}
          </div>
        </div>
        <div className="relative z-10">
          <h2 className={`text-3xl font-bold mb-2 group-hover:${interest.accentClass} transition-colors ${!interest.isMono && interest.id === 'humanities' ? 'font-serif' : ''}`}>
            {interest.title}
          </h2>
          <p className={interest.isMono ? 'text-engineering-muted' : 'text-gray-600'}>
            {interest.subtitle}
          </p>
        </div>
        <div className="relative z-10 mt-4">
          <p className={`text-sm ${interest.isMono ? 'text-engineering-muted opacity-80' : 'text-gray-500'}`}>
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
