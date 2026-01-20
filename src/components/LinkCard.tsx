import { motion } from 'framer-motion';
import type { LinkItem } from '../types';

export const LinkCard = ({ link, index }: { link: LinkItem; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      
      // Optimizamos para que el hover no sea molesto en móvil
      whileHover={{ 
        scale: 1.02, 
        backgroundColor: "rgba(0, 184, 160, 0.05)" 
      }}
      // El tap es lo más importante en responsive
      whileTap={{ scale: 0.96 }}
      
      className={`
        relative overflow-hidden flex items-center w-full p-4 mb-3 
        glass rounded-2xl border border-white/10 transition-all duration-300 group
        cursor-pointer touch-manipulation
      `}
    >
      <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl bg-[#00B8A0]/10 text-[#00B8A0]">
        <link.icon size={20} className="sm:size-[22px]" strokeWidth={2} />
      </div>
      
      <span className="flex-grow text-center font-bold tracking-wide text-sm sm:text-base transition-colors duration-300 group-hover:text-[#00B8A0]">
        {link.title}
      </span>

      <div className="w-10 sm:w-11 flex justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-[#00B8A0] opacity-0 group-hover:opacity-100 shadow-[0_0_8px_#00B8A0]" />
      </div>
    </motion.div>
  );
};