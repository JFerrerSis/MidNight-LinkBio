import { useState, useEffect, memo } from 'react';
import logoDark from './assets/logodark.png';
import logoLight from './assets/logolight.png';
import { Instagram, ExternalLink, Send, Sun, Moon, Toolbox, Heart } from 'lucide-react'; // Añadí X
import { motion, AnimatePresence } from 'framer-motion';
import { LinkCard } from './components/LinkCard';
import { ParticlesBackground } from './components/ParticlesBackground'; 
import { Catalogo } from './components/Catalogo'; 
import type { UserConfig } from './types';

const MemoizedParticles = memo(ParticlesBackground);

const DATA: UserConfig = {
  name: "MidNight Studio",
  username: "@MidNighttStudio",
  bio: "Creatividad sin límites 🎨 Estampados • Tazas • Fotos • Diseño digital hecho realidad ✨ Delivery & Pick up🛵.",
  avatar: "", 
  links: [
    { id: '1', title: 'WhatsApp', url: 'https://wa.me/584246498029?text=Hola!%20MidNight%20Vengo%20de%20Instagram%20y%20estoy%20interesad@%20en%20tus%20servicios', icon: Send },
    { id: '2', title: 'Catalogo', url: '#', icon: ExternalLink },
    { id: '3', title: 'Promociones', url: '#', icon: Heart },
    { id: '4', title: 'Instagram', url: 'https://www.instagram.com/midnighttstudio/.', icon: Instagram },
    { id: '5', title: 'Herramientas', url: 'https://midnight-studio-systems.vercel.app/', icon: Toolbox },
  ]
};

function App() {
  const [theme, setTheme] = useState('dark');
  const [view, setView] = useState<'links' | 'catalogo'>('links');
  // 1. Nuevo estado para el modal
  const [showPromoModal, setShowPromoModal] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const currentLogo = theme === 'dark' ? logoDark : logoLight;

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center px-4 sm:px-6 py-8 sm:py-12 overflow-x-hidden overflow-y-auto transition-colors duration-500">
      <MemoizedParticles theme={theme} />

      <button 
        onClick={toggleTheme}
        className="z-50 fixed top-4 right-4 sm:top-6 sm:right-6 p-2.5 sm:p-3 rounded-full glass hover:scale-110 active:scale-90 transition-all shadow-xl"
      >
        {theme === 'dark' ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-slate-700" />}
      </button>

      <AnimatePresence mode="wait">
        {view === 'links' ? (
          <motion.div 
            key="links"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="z-10 w-full max-w-[420px] flex flex-col items-center will-change-transform"
          >
            <header className="text-center mb-8 sm:mb-12 w-full">
              <div className={`relative w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-[#00B8A0]/30 flex items-center justify-center overflow-hidden shadow-2xl mx-auto ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
                <img src={currentLogo} className="w-16 h-16 sm:w-20 sm:h-20 object-contain p-2" alt="Logo" />
              </div>
              <h1 className={`text-2xl sm:text-3xl font-extrabold mt-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{DATA.name}</h1>
              <p className="text-[#00B8A0] font-bold text-xs sm:text-sm mt-1 tracking-widest">{DATA.username}</p>
              <p className="mt-4 text-sm sm:text-base opacity-75 leading-relaxed">{DATA.bio}</p>
            </header>

            <section className="w-full space-y-2">
              {DATA.links.map((link, index) => (
                <div 
                  key={link.id} 
                  onClick={() => {
                    // 2. Lógica para abrir modal o catálogo
                    if (link.title === 'Catalogo') setView('catalogo');
                    else if (link.title === 'Promociones') setShowPromoModal(true);
                    else window.open(link.url, '_blank');
                  }}
                  className="w-full cursor-pointer transition-transform active:scale-[0.98]"
                >
                  <LinkCard link={link} index={index} />
                </div>
              ))}
            </section>

            <footer className="mt-12 py-6 flex flex-col items-center gap-4">
              <Instagram 
                className="hover:text-[#00B8A0] transition-colors cursor-pointer opacity-40" 
                size={22} 
                onClick={() => window.open('https://www.instagram.com/midnighttstudio/', '_blank')}
              />
              <p className="text-[9px] tracking-[0.3em] uppercase opacity-25">&copy; {new Date().getFullYear()} Jferrer | MidNight Systems</p>
            </footer>
          </motion.div>
        ) : (
          <motion.div
            key="catalogo-wrapper"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full flex justify-center will-change-transform"
          >
            <Catalogo 
              theme={theme} 
              onBack={() => setView('links')} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Componente Modal de Promociones */}
      <AnimatePresence>
        {showPromoModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay (Fondo oscuro) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPromoModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Contenido del Modal */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`relative z-10 w-full max-w-sm p-8 rounded-3xl shadow-2xl text-center glass border border-[#00B8A0]/20 ${theme === 'dark' ? 'bg-[#0f0f0f]/90' : 'bg-white/90'}`}
            >
              <div className="w-16 h-16 bg-[#00B8A0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-[#00B8A0]" size={32} />
              </div>
              
              <h2 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                ¡Próximamente!
              </h2>
              
              <p className={`text-sm opacity-70 mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Estamos preparando las mejores ofertas para ti. Vuelve pronto para no perdértelas.
              </p>

              <button
                onClick={() => setShowPromoModal(false)}
                className="w-full py-3 px-6 bg-[#00B8A0] hover:bg-[#009e8a] text-white font-bold rounded-xl transition-all active:scale-95 shadow-lg shadow-[#00B8A0]/20"
              >
                Volver al inicio
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;