import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimerProps {
  theme: string;
  variant: 'overlay' | 'mini';
}

export const ValentineTimer = ({ theme, variant }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState({ días: 0, horas: 0, min: 0, seg: 0 });

  useEffect(() => {
    const target = new Date('February 14, 2026 23:59:59').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;
      if (distance < 0) {
        clearInterval(interval);
        return;
      }
      setTimeLeft({
        días: Math.floor(distance / (1000 * 60 * 60 * 24)),
        horas: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        min: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seg: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const isOverlay = variant === 'overlay';

  return (
    <div className={`flex items-center justify-center ${isOverlay ? 'gap-4 sm:gap-6' : 'gap-2 sm:gap-3 scale-90 sm:scale-100'}`}>
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="flex flex-col items-center">
          <div className="relative overflow-hidden px-1">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={value} // Esto dispara la animación cada vez que el número cambia
                initial={{ y: isOverlay ? 40 : 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: isOverlay ? -40 : -20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`block font-black tabular-nums leading-none 
                  ${isOverlay 
                    ? 'text-5xl sm:text-7xl text-white drop-shadow-[0_0_15px_rgba(0,184,160,0.5)]' 
                    : `text-xl sm:text-2xl ${theme === 'dark' ? 'text-white' : 'text-black'}`
                  }`}
              >
                {value.toString().padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
          </div>
          
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: isOverlay ? [0.4, 1, 0.4] : 0.6 }}
            transition={{ repeat: Infinity, duration: 2 }}
            className={`font-bold uppercase tracking-tighter text-[#00B8A0] 
              ${isOverlay ? 'text-xs mt-2' : 'text-[8px] sm:text-[10px]'}`}
          >
            {label}
          </motion.span>
        </div>
      ))}
    </div>
  );
};