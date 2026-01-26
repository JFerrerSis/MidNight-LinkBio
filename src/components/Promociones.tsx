import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Search, Share2, X, Heart } from 'lucide-react';
import { PRODUCTS } from '../types/products';

const HeartParticles = () => {
    const [particles] = useState(() =>
        Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 60 + 20,
            size: Math.random() * (22 - 12) + 12,
            delay: Math.random() * 0.5
        }))
    );

    return (
        <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ opacity: 0, scale: 0, y: 0 }}
                    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.8], y: -120 }}
                    transition={{ duration: 2.5, delay: p.delay, ease: "easeOut" }}
                    style={{ left: `${p.x}%`, top: `${p.y}%`, position: 'absolute' }}
                >
                    <Heart size={p.size} fill="#00B8A0" className="text-[#00B8A0] opacity-60" />
                </motion.div>
            ))}
        </div>
    );
};

export const Promociones = ({ onBack, theme }: { onBack: () => void, theme: string }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

    const promoProducts = useMemo(() => {
        const term = searchTerm.toLowerCase().trim();
        const basePromos = PRODUCTS.filter(p =>
            p.id.toLowerCase().includes('promo') || (p as any).isPromo === true
        );
        if (!term) return basePromos;
        return basePromos.filter(p => p.name.toLowerCase().includes(term) || p.id.includes(term));
    }, [searchTerm]);

    const shareProduct = async (product: any) => {
        const shareData = {
            title: `¡PROMO! MidNight Studio - ${product.name}`,
            text: `🔥 ¡Mira esta oferta en MidNight Studio! 🔥\n\n✨ ${product.name}\n💰 Precio Especial: $${product.price}\n🆔 Código: #${product.id}\n\n¡Aprovecha antes de que se agote!`,
            url: window.location.href
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
                alert('✨ ¡Enlace de promo copiado!');
            }
        } catch (err) { console.log('Cancelado'); }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="z-10 w-full max-w-7xl px-4 mx-auto flex flex-col items-center min-h-screen relative"
        >
            <HeartParticles />

            {/* Header Fijo - Responsive y Transparente */}
            <div className="sticky top-0 z-50 w-full pt-4 pb-4 backdrop-blur-sm transition-all duration-500 bg-transparent">
                <div className="flex items-center justify-between max-w-5xl mx-auto px-4 gap-2">
                    
                    {/* Botón Atrás */}
                    <button
                        onClick={onBack}
                        className={`p-2.5 sm:p-3 rounded-2xl transition-all shrink-0 active:scale-90 ${
                            theme === 'dark'
                                ? 'glass text-[#00B8A0] shadow-lg shadow-black/20'
                                : 'bg-white/40 text-[#00B8A0] border border-white/20 shadow-sm backdrop-blur-md'
                        }`}
                    >
                        <ArrowLeft size={20} />
                    </button>

                    {/* Título: Columna en móvil, Fila en desktop */}
                    <div className="flex-1 text-center flex flex-col items-center justify-center">
                        <h2 className="font-black tracking-tighter italic flex flex-col sm:flex-row items-center justify-center gap-0 sm:gap-3 
                            text-[8vw] sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-sm leading-[0.9] sm:leading-none">
                            <span className={theme === 'dark' ? 'text-white' : 'text-black'}>NUESTRAS</span>
                            <span className="text-[#00B8A0]">PROMOS</span>
                        </h2>
                    </div>

                    {/* Espaciador para equilibrar el layout */}
                    <div className="w-10 sm:w-12 invisible" />
                </div>
            </div>

            {/* Buscador */}
            <div className="w-full max-w-4xl mt-6 mb-10 px-2">
                <div className="relative group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#00B8A0] opacity-50" size={20} />
                    <input
                        type="text"
                        placeholder="Encuentra tu oferta favorita..."
                        className={`w-full pl-12 pr-12 py-4 rounded-2xl glass border border-white/10 outline-none focus:border-[#00B8A0] transition-all ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button onClick={() => setSearchTerm('')} className="absolute right-6 top-1/2 -translate-y-1/2 text-[#00B8A0]">
                            <X size={20} />
                        </button>
                    )}
                </div>
            </div>

            {/* Grid de Productos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full pb-20">
                {promoProducts.map((product, index) => (
                    <div
                        key={product.id}
                        style={{ animation: `fadeInUp 0.5s ease forwards ${index * 0.05}s`, opacity: 0 }}
                        className="group relative rounded-[2.5rem] p-4 glass border border-white/5 flex flex-col hover:scale-[1.02] transition-all duration-300"
                    >
                        <div className="absolute -top-2 -right-2 z-20 bg-[#00B8A0] text-black text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg rotate-12 uppercase tracking-tighter">
                            Oferta
                        </div>

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
                                className="absolute top-3 right-3 p-2.5 rounded-xl bg-black/40 backdrop-blur-md text-white hover:bg-[#00B8A0] transition-all border border-white/10 active:scale-90"
                            >
                                <Share2 size={16} />
                            </button>
                        </div>

                        <div className="px-2">
                            <span className="text-[10px] text-[#00B8A0] font-bold uppercase tracking-widest block mb-1">🔥 Promo Limitada</span>
                            <h3 className={`text-lg font-bold leading-tight mb-4 line-clamp-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                {product.name}
                            </h3>
                        </div>

                        <div className="flex items-center justify-between mt-auto p-2 bg-white/5 rounded-2xl border border-white/5">
                            <span className="text-xl font-black text-[#00B8A0] ml-2">
                                ${product.price}
                            </span>
                            <button
                                onClick={() => window.open(`https://wa.me/584246498029?text=Hola! 🔥 Me interesa la promo: *${product.name}* (#${product.id})`, '_blank')}
                                className="p-3 rounded-xl bg-[#00B8A0] text-black shadow-lg hover:rotate-6 active:scale-90 transition-all shadow-[#00B8A0]/20"
                            >
                                <ShoppingBag size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {promoProducts.length === 0 && (
                <div className="py-20 text-center opacity-40">
                    <Heart size={40} className="mx-auto mb-4 text-[#00B8A0] animate-pulse" />
                    <p className="text-xl font-bold uppercase tracking-[0.2em]">Pronto nuevas ofertas</p>
                </div>
            )}

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
            `}</style>
        </motion.div>
    );
};