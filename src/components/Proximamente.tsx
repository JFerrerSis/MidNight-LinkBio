import { motion } from 'framer-motion';
import { ArrowLeft, Timer, Sparkles } from 'lucide-react';

export const Proximante = ({ onBack, theme }: { onBack: () => void, theme: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="flex flex-col items-center justify-center min-h-[70vh] w-full max-w-2xl mx-auto px-6 text-center"
        >
            {/* Decoración de fondo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00B8A0]/10 blur-[120px] rounded-full" />
            </div>

            {/* Icono Principal Animado */}
            <motion.div 
                animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="mb-8 p-6 rounded-[2.5rem] bg-[#00B8A0]/10 border border-[#00B8A0]/20 text-[#00B8A0]"
            >
                <Timer size={48} strokeWidth={1.5} />
            </motion.div>

            {/* Texto de Impacto */}
            <h2 className="text-[#00B8A0] font-black tracking-[0.3em] text-xs mb-4 uppercase">
                Próximamente
            </h2>
            
            <h1 className={`text-4xl sm:text-6xl font-black italic mb-6 leading-tight ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                PREPARANDO <br />
                <span className="text-[#00B8A0]">LO NUEVO</span>
            </h1>

            <p className={`text-sm sm:text-base opacity-60 max-w-md mb-10 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Nuestras promociones se han tomado un respiro. Estamos diseñando nuevas ofertas exclusivas que te van a encantar. ⚡
            </p>

            {/* Botón de Retorno con Estilo del Header */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBack}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-sm transition-all shadow-xl ${
                    theme === 'dark' 
                    ? 'glass text-[#00B8A0] border border-white/10 shadow-[#00B8A0]/5' 
                    : 'bg-white text-[#00B8A0] border border-black/5 shadow-black/5'
                }`}
            >
                <ArrowLeft size={18} strokeWidth={3} />
                VOLVER AL INICIO
            </motion.button>

            {/* Footer sutil */}
            <div className="mt-12 flex items-center gap-2 text-[10px] font-bold tracking-widest opacity-30 uppercase">
                <Sparkles size={12} /> MidNight Studio Exclusive
            </div>
        </motion.div>
    );
};