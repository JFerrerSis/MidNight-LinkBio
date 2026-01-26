import { useState, useEffect, memo } from 'react';
import logoDark from './assets/logodark.png';
import logoLight from './assets/logolight.png';
import { Instagram, Send, Sun, Moon, Toolbox, Heart, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LinkCard } from './components/LinkCard';
import { ParticlesBackground } from './components/ParticlesBackground'; 
import { Catalogo } from './components/Catalogo'; 
import { Promociones } from './components/Promociones'; // 1. Importar la nueva vista
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
  // 2. Actualizar el tipo de vista para incluir 'promos'
  const [view, setView] = useState<'links' | 'catalogo' | 'promos'>('links');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const currentLogo = theme === 'dark' ? logoDark : logoLight;

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center px-4 sm:px-6 py-8 sm:py-12 overflow-x-hidden overflow-y-auto transition-colors duration-500">
      <MemoizedParticles theme={theme} />

      {/* Botón de Tema */}
      <button 
        onClick={toggleTheme}
        className="z-50 fixed top-4 right-4 sm:top-6 sm:right-6 p-2.5 sm:p-3 rounded-full glass hover:scale-110 active:scale-90 transition-all shadow-xl"
      >
        {theme === 'dark' ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-slate-700" />}
      </button>

      <AnimatePresence mode="wait">
        {/* VISTA PRINCIPAL (LINKS) */}
        {view === 'links' && (
          <motion.div 
            key="links"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            className="z-10 w-full max-w-[420px] flex flex-col items-center"
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
                    // 3. Lógica de navegación actualizada
                    if (link.title === 'Catalogo') setView('catalogo');
                    else if (link.title === 'Promociones') setView('promos');
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
        )}

        {/* VISTA CATÁLOGO */}
        {view === 'catalogo' && (
          <motion.div
            key="catalogo"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full flex justify-center"
          >
            <Catalogo 
              theme={theme} 
              onBack={() => setView('links')} 
            />
          </motion.div>
        )}

        {/* VISTA PROMOCIONES (Nueva) */}
        {view === 'promos' && (
          <motion.div
            key="promos"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full flex justify-center"
          >
            <Promociones 
              theme={theme} 
              onBack={() => setView('links')} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;