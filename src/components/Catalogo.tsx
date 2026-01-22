import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Search, Share2, X } from 'lucide-react'; // Añadido X
import { PRODUCTS } from '../types/products'; 
import logoDark from '../assets/logodark.png';
import logoLight from '../assets/logolight.png';

// Función de utilidad para búsqueda inteligente (Fuzzy Match)
const fuzzyMatch = (text: string, query: string) => {
  const q = query.toLowerCase().replace(/\s/g, '');
  const t = text.toLowerCase().replace(/\s/g, '');
  let qIdx = 0;
  for (let tIdx = 0; tIdx < t.length && qIdx < q.length; tIdx++) {
    if (t[tIdx] === q[qIdx]) qIdx++;
  }
  return qIdx === q.length;
};

export const Catalogo = ({ onBack, theme }: { onBack: () => void, theme: string }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const categories = useMemo(() => ['Todos', ...new Set(PRODUCTS.map(p => p.category))], []);

  // LÓGICA DE BÚSQUEDA INTELIGENTE
  const filteredProducts = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    
    // Filtrado base por categoría
    const categoryFiltered = PRODUCTS.filter(p => 
      selectedCategory === 'Todos' || p.category === selectedCategory
    );

    if (!term) return categoryFiltered;

    // 1. Intentar búsqueda exacta primero
    const exactMatches = categoryFiltered.filter(p => 
      p.name.toLowerCase().includes(term) || p.id.includes(term)
    );

    if (exactMatches.length > 0) return exactMatches;

    // 2. Si no hay exactos, usar lógica inteligente (Fuzzy)
    return categoryFiltered.filter(p => fuzzyMatch(p.name, term));
  }, [searchTerm, selectedCategory]);

  const shareProduct = async (product: any) => {
    const shareData = {
      title: `MidNight Studio - ${product.name}`,
      text: `¡Mira lo que encontré en MidNight Studio! 🔥\n\n✨ Producto: ${product.name}\n💰 Precio: $${product.price}\n🆔 Código: #${product.id}\n\n¿Qué te parece? 👇`,
      url: window.location.href 
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
        alert('✨ ¡Enlace copiado con éxito! Ya puedes pegarlo donde quieras.');
      }
    } catch (err) {
      console.log('Compartir cancelado');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="z-10 w-full max-w-7xl px-4 py-10 flex flex-col items-center min-h-screen"
    >
      {/* Header Corregido y Cuadrado */}
      <div className="w-full flex items-center justify-between mb-8 max-w-5xl px-2">
        {/* Botón de Atrás */}
        <button 
          onClick={onBack} 
          className="p-3 rounded-2xl glass text-[#00B8A0] active:scale-90 transition-all shadow-lg shrink-0"
        >
          <ArrowLeft size={24} />
        </button>

        {/* Contenedor Central: Logo + Texto */}
        <div className="flex items-center gap-3 sm:gap-4 flex-1 justify-center">
          <motion.img 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={theme === 'dark' ? logoDark : logoLight} 
            alt="MidNight Logo" 
            className="h-25 sm:h-15 w-auto object-contain" // Quitamos sombras raras para que cuadre mejor
          />
          
          <div className="flex flex-col justify-center leading-none">
            <h2 className={`text-xl sm:text-3xl font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              NUESTRO
            </h2>
            <h2 className="text-xl sm:text-3xl font-black tracking-tighter text-[#00B8A0]">
              CATÁLOGO
            </h2>
          </div>
        </div>

        {/* Espaciador invisible para mantener el centro perfecto */}
        <div className="w-[48px] shrink-0" /> 
      </div>

      {/* Buscador y Filtros */}
      <div className="w-full max-w-4xl space-y-6 mb-12">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00B8A0] opacity-50" size={20} />
          <input 
            type="text" placeholder="¿Qué estás buscando hoy?..."
            className={`w-full pl-12 pr-12 py-4 rounded-2xl glass border border-white/10 outline-none focus:border-[#00B8A0] transition-all ${theme === 'dark' ? 'text-white' : 'text-black'}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Botón de limpiar búsqueda (X) */}
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#00B8A0] hover:scale-110 active:scale-90 transition-all"
            >
              <X size={20} />
            </button>
          )}
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar justify-start sm:justify-center">
          {categories.map((cat) => (
            <button
              key={cat} onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                selectedCategory === cat ? 'bg-[#00B8A0] text-black scale-105 shadow-lg shadow-[#00B8A0]/20' : 'glass opacity-50 hover:opacity-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {filteredProducts.map((product, index) => (
          <div 
            key={product.id}
            style={{ animation: `fadeInUp 0.5s ease forwards ${index * 0.05}s`, opacity: 0 }}
            className="group relative rounded-[2.5rem] p-4 glass border border-white/5 flex flex-col hover:scale-[1.02] transition-all duration-300"
          >
            <div className="relative h-56 w-full rounded-[1.8rem] overflow-hidden mb-4 bg-white/[0.03]">
              {!loadedImages[product.id] && (
                <div className="absolute inset-0 skeleton-pulse bg-gradient-to-r from-transparent via-[#00B8A0]/10 to-transparent" />
              )}
              <img 
                src={product.image} 
                onLoad={() => setLoadedImages(prev => ({ ...prev, [product.id]: true }))}
                className={`w-full h-full object-cover transition-opacity duration-700 ${loadedImages[product.id] ? 'opacity-100' : 'opacity-0'}`} 
                alt={product.name}
              />
              
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-[#00B8A0] text-[10px] font-black px-3 py-1 rounded-full border border-white/10">
                #{product.id}
              </div>
              
              <button 
                onClick={() => shareProduct(product)}
                className="absolute top-3 right-3 p-2.5 rounded-xl bg-black/40 backdrop-blur-md text-white hover:bg-[#00B8A0] hover:text-black transition-all border border-white/10 active:scale-90"
              >
                <Share2 size={16} />
              </button>
            </div>
            
            <div className="px-2">
              <span className="text-[10px] text-[#00B8A0] font-bold uppercase tracking-tighter">{product.category}</span>
              <h3 className={`text-lg font-bold leading-tight mb-4 line-clamp-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                {product.name}
              </h3>
            </div>
            
            <div className="flex items-center justify-between mt-auto p-2 bg-white/5 rounded-2xl">
              <span className="text-xl font-black text-[#00B8A0] ml-2">
                ${product.price}
              </span>
              <button 
                onClick={() => window.open(`https://wa.me/584246498029?text=Hola! 👋 Me interesa el producto: *${product.name}* (#${product.id})`, '_blank')}
                className="p-3 rounded-xl bg-[#00B8A0] text-black shadow-lg hover:rotate-6 active:scale-90 transition-all"
              >
                <ShoppingBag size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .skeleton-pulse {
          background-size: 200% 100%;
          animation: skeleton-loading 2s infinite ease-in-out;
        }
        @keyframes skeleton-loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {filteredProducts.length === 0 && (
        <div className="py-20 text-center opacity-30">
          <p className="text-xl font-bold uppercase tracking-[0.3em]">No hay resultados</p>
        </div>
      )}
    </motion.div>
  );
};