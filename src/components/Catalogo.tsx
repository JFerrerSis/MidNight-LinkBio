import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Search, Share2, X } from 'lucide-react';
import { PRODUCTS } from '../types/products';

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

  const filteredProducts = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    const categoryFiltered = PRODUCTS.filter(p =>
      selectedCategory === 'Todos' || p.category === selectedCategory
    );
    if (!term) return categoryFiltered;
    const exactMatches = categoryFiltered.filter(p =>
      p.name.toLowerCase().includes(term) || p.id.includes(term)
    );
    if (exactMatches.length > 0) return exactMatches;
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
      className="z-10 w-full max-w-7xl px-4 flex flex-col items-center min-h-screen relative"
    >
      {/* Header Fijo (Sticky) */}
      <div className="sticky top-0 z-50 w-full pt-4 pb-4 bg-black/5 backdrop-blur-xl">
        <div className="flex items-center justify-between max-w-5xl mx-auto px-2 gap-1 sm:gap-4">
          
          {/* Lado Izquierdo: Botón Atrás */}
          <button
            onClick={onBack}
            className="p-2.5 sm:p-3 rounded-2xl glass text-[#00B8A0] active:scale-90 transition-all shadow-lg shrink-0"
          >
            <ArrowLeft size={20} className="sm:w-[22px]" />
          </button>

          {/* Centro: Título Adaptativo (Vertical en móvil, Horizontal en Desktop) */}
          <div className="flex-1 flex flex-col items-center justify-center min-w-0 px-1">
            <h2 className={`font-black tracking-tighter italic leading-[0.85] flex flex-col sm:flex-row items-center sm:gap-3
              text-[7vw] xs:text-[6vw] sm:text-3xl md:text-5xl lg:text-6xl
            `}>
              <span className={theme === 'dark' ? 'text-white' : 'text-black'}>NUESTRO</span>
              <span className="text-[#00B8A0]">CATÁLOGO</span>
            </h2>
            
        
          </div>

          
        </div>
      </div>

      {/* Buscador y Filtros */}
      <div className="w-full max-w-4xl space-y-6 mb-12 mt-8">
        <div className="relative group px-2">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#00B8A0] opacity-50" size={20} />
          <input
            type="text" placeholder="¿Qué estás buscando hoy?..."
            className={`w-full pl-12 pr-12 py-4 rounded-2xl glass border border-white/10 outline-none focus:border-[#00B8A0] transition-all ${theme === 'dark' ? 'text-white' : 'text-black'}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-[#00B8A0] hover:scale-110 active:scale-90 transition-all"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar justify-start sm:justify-center px-2">
          {categories.map((cat) => (
            <button
              key={cat} onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all shrink-0 ${
                selectedCategory === cat ? 'bg-[#00B8A0] text-black scale-105 shadow-lg shadow-[#00B8A0]/20' : 'glass opacity-50 hover:opacity-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full pb-20">
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
                onClick={() => window.open(`https://wa.me/584246498029?text=Hola MidNight! 👋 Me interesa el producto: *${product.name}* #${product.id}`, '_blank')}
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