import { useState, useEffect } from 'react';
import logoDark from './assets/logoN.png';
import logoLight from './assets/logo-light.png';
import { Instagram, ExternalLink, Send, Sun, Moon, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LinkCard } from './components/LinkCard';
import { ParticlesBackground } from './components/ParticlesBackground'; 
import type { UserConfig } from './types';

const DATA: UserConfig = {
  name: "MidNight Studio",
  username: "@MidNighttStudio",
  bio: "Creatividad sin límites 🎨 Estampados • Tazas • Fotos • Diseño digital hecho realidad ✨ Delivery & Pick up🛵.",
  avatar: "", 
  links: [
    { id: '1', title: 'Atencion WhatsApp', url: 'https://wa.me/584246498029?text=Hola%20MidNight%20Studio!%20Vengo%20de%20tu%20LinkBio%20y%20quisiera%20hacer%20una%20consulta.', icon: Send },
    { id: '2', title: 'Catalogo', url: '#', icon: ExternalLink },
    { id: '3', title: 'Instagram', url: 'https://www.instagram.com/midnighttstudio/.', icon: Instagram },
  ]
};

// ... (mismos imports anteriores)

function App() {
  const [theme, setTheme] = useState('dark');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const currentLogo = theme === 'dark' ? logoDark : logoLight;

  const handleLinkClick = (linkTitle: string, url: string) => {
    if (linkTitle === 'Catalogo') {
      setIsModalOpen(true);
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    // "overflow-y-auto" permite scroll en móviles largos
    <main className="relative min-h-screen w-full flex flex-col items-center px-4 sm:px-6 py-8 sm:py-12 overflow-x-hidden overflow-y-auto transition-colors duration-500">
      
      <ParticlesBackground theme={theme} />

      {/* Botón Switcher - Ajustado tamaño para móvil */}
      <button 
        onClick={toggleTheme}
        className="z-50 fixed top-4 right-4 sm:top-6 sm:right-6 p-2.5 sm:p-3 rounded-full glass hover:scale-110 active:scale-90 transition-all shadow-xl"
      >
        {theme === 'dark' ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-slate-700" />}
      </button>

      {/* Luces de Fondo - Opacidad reducida en móvil para rendimiento */}
      <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[40%] bg-[#00B8A0]/10 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none" />

      {/* CONTENEDOR CENTRAL - Ancho fluido */}
      <div className="z-10 w-full max-w-[420px] flex flex-col items-center">
        
        <header className="text-center mb-8 sm:mb-12 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative inline-block"
          >
            <div className="absolute inset-0 bg-[#00B8A0] blur-2xl opacity-20 rounded-full animate-spin-slow" />
            <div className={`relative w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-[#00B8A0]/30 flex items-center justify-center overflow-hidden shadow-2xl transition-all ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={theme}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  src={currentLogo}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain p-2"
                  alt="MidNight Studio"
                />
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.h1 className={`text-2xl sm:text-3xl font-extrabold mt-6 tracking-tight px-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {DATA.name}
          </motion.h1>
          <p className="text-[#00B8A0] font-bold text-xs sm:text-sm mt-1 tracking-widest">{DATA.username}</p>
          <p className={`mt-4 text-sm sm:text-base opacity-75 max-w-[290px] sm:max-w-[340px] mx-auto leading-relaxed`}>
            {DATA.bio}
          </p>
        </header>

        {/* Links con padding para no tocar bordes en móvil */}
        <section className="w-full space-y-1 px-2 sm:px-0">
          {DATA.links.map((link, index) => (
            <div key={link.id} onClick={() => handleLinkClick(link.title, link.url)} className="w-full">
              <LinkCard link={link} index={index} />
            </div>
          ))}
        </section>

        <footer className="mt-12 sm:mt-16 py-6 flex flex-col items-center gap-4 w-full">
          <Instagram 
            className="hover:text-[#00B8A0] transition-colors cursor-pointer opacity-40 active:opacity-100" 
            size={22} 
            onClick={() => window.open('https://www.instagram.com/midnighttstudio/', '_blank')}
          />
          <p className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase opacity-25 text-center px-4">
            MidNight Systems — 2026
          </p>
        </footer>
      </div>

      {/* MODAL RESPONSIVO */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ y: "100%", opacity: 0 }} // En móvil sube desde abajo
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              className={`relative w-full max-w-sm p-8 sm:p-10 rounded-t-[2.5rem] sm:rounded-[3rem] border-t sm:border border-[#00B8A0]/30 shadow-2xl flex flex-col items-center text-center ${theme === 'dark' ? 'bg-[#050505]' : 'bg-white'}`}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#00B8A0]/10 rounded-full flex items-center justify-center mb-6">
                <Clock size={32} className="text-[#00B8A0] animate-pulse" />
              </div>

              <h2 className={`text-3xl sm:text-4xl font-black mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                CATÁLOGO
              </h2>
              <p className="text-[#00B8A0] font-bold tracking-[0.2em] text-[10px] mb-6 uppercase">Próximamente</p>
              
              <p className="text-xs sm:text-sm opacity-60 mb-8 leading-relaxed">
                Estamos preparando la mejor vitrina digital para nuestros productos.
              </p>

              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-full py-4 rounded-2xl bg-[#00B8A0] text-black font-black uppercase tracking-widest active:scale-95 shadow-lg shadow-[#00B8A0]/20"
              >
                ¡Lo esperaré!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
