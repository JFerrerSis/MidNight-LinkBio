import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Search, Share2, X, Heart, Plus, Minus, Send, Phone, MapPin, Package, Truck, MessageSquare } from 'lucide-react';
import { PRODUCTS } from '../types/products';

// Componente de partículas optimizado
const HeartParticles = () => {
    const [particles] = useState(() =>
        Array.from({ length: 8 }).map((_, i) => ({
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
    const [cart, setCart] = useState<{ product: any, quantity: number }[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [customerData, setCustomerData] = useState({
        nombre: '',
        ciudad: '',
        telefono: '',
        metodo: 'Delivery',
        pago: 'Dólares Efectivo', // Nuevo campo
        notas: ''
    });

    // --- LÓGICA DEL CARRITO ---
    const addToCart = (product: any) => {
        setCart(prev => {
            const existing = prev.find(item => item.product.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { product, quantity: 1 }];
        });
    };

    const updateQuantity = (id: string, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.product.id === id) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const removeFromCart = (id: string) => {
        setCart(prev => prev.filter(item => item.product.id !== id));
    };

    const totalCart = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

    // --- ENVÍO A WHATSAPP ---
const sendOrder = () => {
    const { nombre, ciudad, telefono, metodo, pago, notas } = customerData;
    if (!nombre || !ciudad || !telefono) {
        alert("Por favor, completa los campos obligatorios para procesar tu promo ⚡");
        return;
    }

    const productList = cart.map(item =>
        `• *${item.product.name}* (x${item.quantity}) - $${item.product.price * item.quantity}`
    ).join('\n');

    const message = [
        `*NUEVA PROMO - MIDNIGHT STUDIO* 🌙`,
        `----------------------------------`,
        `👤 *Cliente:* ${nombre}`,
        `📞 *Telf:* ${telefono}`,
        `📍 *Dirección:* ${ciudad}`,
        `🛵 *Entrega:* ${metodo}`,
        `💳 *Pago:* ${pago}`, // Se integra aquí
        `----------------------------------`,
        `🛍️ *DETALLE:*`,
        productList,
        `----------------------------------`,
        `💵 *TOTAL A PAGAR:* $${totalCart}`,
        `----------------------------------`,
        notas ? `📝 *Notas:* ${notas}\n----------------------------------` : '',
        `_Enviado desde la sección de promos ⚡_`
    ].filter(line => line !== '').join('\n');
    
    window.open(`https://wa.me/584246334784?text=${encodeURIComponent(message)}`, '_blank');
};
    // --- FILTRADO DE PROMOS ---
    const promoProducts = useMemo(() => {
        const term = searchTerm.toLowerCase().trim();
        const basePromos = PRODUCTS.filter(p =>
            p.id.toLowerCase().includes('promo') || (p as any).isPromo === true
        );
        return term 
            ? basePromos.filter(p => p.name.toLowerCase().includes(term) || p.id.includes(term))
            : basePromos;
    }, [searchTerm]);

    const shareProduct = async (product: any) => {
        const shareData = {
            title: `¡PROMO! MidNight Studio - ${product.name}`,
            text: `🔥 ¡Mira esta oferta! 🔥\n\n✨ ${product.name}\n💰 Precio Especial: $${product.price}\n🆔 Código: #${product.id}`,
            url: window.location.href
        };
        try {
            if (navigator.share) await navigator.share(shareData);
            else {
                await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
                alert('✨ ¡Enlace de promo copiado!');
            }
        } catch (err) { console.log('Cancelado'); }
    };

    useEffect(() => {
        document.body.style.overflow = isCartOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isCartOpen]);

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="z-10 w-full max-w-7xl px-4 mx-auto flex flex-col items-center min-h-screen relative"
        >
            <HeartParticles />

            {/* Header */}
            <header className={`sticky top-0 z-50 w-full pt-4 pb-4 bg-transparent backdrop-blur-sm transition-opacity ${isCartOpen ? 'opacity-0' : 'opacity-100'}`}>
                <div className="flex items-center justify-between max-w-5xl mx-auto px-4 gap-2">
                    <button onClick={onBack} className={`p-3 rounded-2xl transition-all active:scale-90 ${theme === 'dark' ? 'glass text-[#00B8A0] shadow-lg shadow-black/20' : 'bg-white/40 text-[#00B8A0] border border-white/20 shadow-sm'}`}>
                        <ArrowLeft size={20} />
                    </button>
                    <div className="flex-1 text-center">
                        <h2 className={`font-black tracking-tighter italic flex flex-col sm:flex-row items-center justify-center gap-0 sm:gap-3 text-[8vw] sm:text-5xl drop-shadow-sm leading-none`}>
                            <span className={theme === 'dark' ? 'text-white' : 'text-black'}>NUESTRAS</span>
                            <span className="text-[#00B8A0]">PROMOS</span>
                        </h2>
                    </div>
                    <div className="w-12 invisible" />
                </div>
            </header>

            {/* Buscador */}
            <div className="w-full max-w-4xl mt-6 mb-10 px-2">
                <div className="relative">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#00B8A0] opacity-50" size={20} />
                    <input
                        type="text"
                        placeholder="Encuentra tu oferta favorita..."
                        className={`w-full pl-14 pr-12 py-4 rounded-2xl glass border border-white/10 outline-none focus:border-[#00B8A0] transition-all ${theme === 'dark' ? 'text-white' : 'text-black'}`}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full pb-32">
                {promoProducts.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="group relative rounded-[2.5rem] p-4 glass border border-white/5 flex flex-col hover:scale-[1.02] transition-all duration-300"
                    >
                        <div className="absolute -top-2 -right-2 z-20 bg-[#00B8A0] text-black text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg rotate-12 uppercase">Oferta</div>

                        <div className="relative h-56 w-full rounded-[1.8rem] overflow-hidden mb-4 bg-white/[0.03]">
                            {!loadedImages[product.id] && <div className="absolute inset-0 skeleton-pulse" />}
                            <img
                                src={product.image}
                                onLoad={() => setLoadedImages(prev => ({ ...prev, [product.id]: true }))}
                                className={`w-full h-full object-cover transition-opacity duration-700 ${loadedImages[product.id] ? 'opacity-100' : 'opacity-0'}`}
                                alt={product.name}
                            />
                            <button onClick={() => shareProduct(product)} className="absolute top-3 right-3 p-2.5 rounded-xl bg-black/40 backdrop-blur-md text-white border border-white/10 active:scale-90">
                                <Share2 size={16} />
                            </button>
                        </div>

                        <div className="px-2">
                            <span className="text-[10px] text-[#00B8A0] font-bold uppercase tracking-widest block mb-1">🔥 Promo Limitada</span>
                            <h3 className={`text-lg font-bold leading-tight mb-4 line-clamp-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{product.name}</h3>
                        </div>

                        <div className="flex items-center justify-between mt-auto p-2 bg-white/5 rounded-2xl border border-white/5">
                            <span className="text-xl font-black text-[#00B8A0] ml-2">${product.price}</span>
                            <button
                                onClick={() => addToCart(product)}
                                className="p-3 rounded-xl bg-[#00B8A0] text-black shadow-lg hover:rotate-6 active:scale-90 transition-all shadow-[#00B8A0]/20"
                            >
                                <ShoppingBag size={20} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

      {/* --- CARRITO --- */}
      <AnimatePresence>
        {cart.length > 0 && !isCartOpen && (
          <motion.button
            initial={{ scale: 0, y: 100 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0, y: 100 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-6 right-6 z-[60] bg-[#00B8A0] text-black p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-2xl flex items-center gap-3 font-black transition-all hover:scale-110"
          >
            <div className="relative">
              <ShoppingBag size={24} />
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#00B8A0]">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            </div>
            <span className="hidden sm:inline text-sm">REVISAR PEDIDO (${totalCart})</span>
            <span className="sm:hidden text-sm">${totalCart}</span>
          </motion.button>
        )}

        {isCartOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`relative w-full sm:max-w-md h-[100dvh] sm:h-full flex flex-col border-l transition-colors backdrop-blur-xl ${theme === 'dark' ? 'bg-black border-white/10 text-white' : 'bg-white border-black/10 text-black'}`}
            >
              {/* Header Carrito - X Izquierda y Título Centrado */}
              <div className={`p-4 sm:p-6 flex items-center border-b relative ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className={`relative z-[110] p-3 rounded-xl transition-all active:scale-95 group border ${theme === 'dark'
                    ? 'bg-[#00B8A0]/10 border-[#00B8A0]/30 text-[#00B8A0] hover:bg-[#00B8A0]/20'
                    : 'bg-black/5 border-black/10 text-black hover:bg-black/10'
                    }`}
                >
                  <X size={22} strokeWidth={3} className="drop-shadow-[0_0_8px_rgba(0,184,160,0.4)]" />
                </button>

                <div className="flex-1 text-center">
                  <h3 className="text-xl font-black italic leading-none">
                    MI <span className="text-[#00B8A0]">PEDIDO</span>
                  </h3>
                  <p className="text-[9px] sm:text-[10px] opacity-50 uppercase font-bold tracking-widest mt-1">
                    {cart.length} productos seleccionados
                  </p>
                </div>

                <div className="w-[48px] sm:w-[50px]" />
              </div>

              {/* Lista de Productos */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 no-scrollbar">
                {cart.map((item) => (
                  <div key={item.product.id} className={`flex gap-4 p-3 rounded-2xl items-center border ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-black/5 border-black/5'}`}>
                    <img src={item.product.image} className="w-16 h-16 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">{item.product.name}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className={`flex items-center gap-2 rounded-lg p-1 ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`}>
                          <button onClick={() => updateQuantity(item.product.id, -1)} className="p-1 hover:text-[#00B8A0]"><Minus size={14} /></button>
                          <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, 1)} className="p-1 hover:text-[#00B8A0]"><Plus size={14} /></button>
                        </div>
                        <span className="text-[#00B8A0] font-black text-sm ml-auto">${item.product.price * item.quantity}</span>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.product.id)} className={`transition-colors p-1 ${theme === 'dark' ? 'text-red-500/30 hover:text-red-500' : 'text-red-600/40 hover:text-red-600'}`}><X size={18} /></button>
                  </div>
                ))}
              </div>

              {/* Formulario y Checkout */}
              <div className={`p-4 border-t space-y-3 ${theme === 'dark' ? 'bg-black/80 border-white/10' : 'bg-gray-50 border-black/10'}`}>

                {/* Grid de Datos Compacto */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative group col-span-1">
                    <input type="text" placeholder="Nombre" className={`w-full p-2.5 pl-9 rounded-xl border text-xs outline-none focus:border-[#00B8A0] transition-all ${theme === 'dark' ? 'bg-black/40 border-white/10 text-white' : 'bg-white border-black/10 text-black'}`}
                      onChange={(e) => setCustomerData({ ...customerData, nombre: e.target.value })} />
                    <ArrowLeft className="absolute left-3 top-1/2 -translate-y-1/2 rotate-180 opacity-30" size={14} />
                  </div>

                  <div className="relative group col-span-1">
                    <input type="tel" placeholder="Teléfono" className={`w-full p-2.5 pl-9 rounded-xl border text-xs outline-none focus:border-[#00B8A0] transition-all ${theme === 'dark' ? 'bg-black/40 border-white/10 text-white' : 'bg-white border-black/10 text-black'}`}
                      onChange={(e) => setCustomerData({ ...customerData, telefono: e.target.value })} />
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30" size={14} />
                  </div>

                  <div className="relative group col-span-2">
                    <input type="text" placeholder="Dirección exacta" className={`w-full p-2.5 pl-9 rounded-xl border text-xs outline-none focus:border-[#00B8A0] transition-all ${theme === 'dark' ? 'bg-black/40 border-white/10 text-white' : 'bg-white border-black/10 text-black'}`}
                      onChange={(e) => setCustomerData({ ...customerData, ciudad: e.target.value })} />
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30" size={14} />
                  </div>

                  <div className="relative group col-span-2">
                    <textarea
                      placeholder="Notas adicionales..."
                      rows={1}
                      className={`w-full p-2.5 pl-9 rounded-xl border text-xs outline-none focus:border-[#00B8A0] transition-all resize-none ${theme === 'dark' ? 'bg-black/40 border-white/10 text-white' : 'bg-white border-black/10 text-black'}`}
                      onChange={(e) => setCustomerData({ ...customerData, notas: e.target.value })}
                    />
                    <MessageSquare className="absolute left-3 top-3 opacity-30" size={14} />
                  </div>
                </div>

                {/* Métodos de Entrega */}
                <div className={`flex gap-1 p-1 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`}>
                  <button onClick={() => setCustomerData({ ...customerData, metodo: 'Delivery' })} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-all text-[10px] font-black ${customerData.metodo === 'Delivery' ? 'bg-[#00B8A0] text-black shadow-sm' : 'opacity-40'}`}>
                    <Truck size={12} /> DELIVERY
                  </button>
                  <button onClick={() => setCustomerData({ ...customerData, metodo: 'Pickup' })} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-all text-[10px] font-black ${customerData.metodo === 'Pickup' ? 'bg-[#00B8A0] text-black shadow-sm' : 'opacity-40'}`}>
                    <Package size={12} /> PICKUP
                  </button>
                </div>
                {/* Selector de Métodos de Pago */}
                <div className="space-y-2">
                  <p className="text-[10px] font-black opacity-40 uppercase ml-1">Selecciona Método de Pago</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'Dólares Efectivo', icon: '💵' },
                      { id: 'Pago Móvil', icon: '📱' },
                      { id: 'Binance', icon: '🔶' }
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setCustomerData({ ...customerData, pago: m.id })}
                        className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all active:scale-95 ${customerData.pago === m.id
                            ? 'bg-[#00B8A0] border-[#00B8A0] text-black shadow-lg shadow-[#00B8A0]/20'
                            : theme === 'dark'
                              ? 'bg-white/5 border-white/10 text-white/50'
                              : 'bg-black/5 border-black/10 text-black/50'
                          }`}
                      >
                        <span className="text-lg mb-1">{m.icon}</span>
                        <span className="text-[8px] font-black uppercase tracking-tighter leading-none">{m.id}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Aviso dinámico según selección */}
                <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${theme === 'dark' ? 'bg-[#00B8A0]/5 border-[#00B8A0]/20' : 'bg-black/5 border-black/5'}`}>
                  <MessageSquare size={14} className="text-[#00B8A0]" />
                  <p className="text-[9px] leading-tight opacity-70">
                    {customerData.pago === 'Pago Móvil' || customerData.pago === 'Binance'
                      ? 'Al enviar el pedido, te suministraremos los datos para realizar la transferencia.'
                      : 'Ten el monto exacto disponible al momento de la entrega (Pasar foto del billete).'}
                  </p>
                </div>

                {/* Footer en una sola fila */}
                <div className="pt-2 flex items-center justify-between gap-3 border-t border-white/5 mt-1">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black uppercase opacity-40 leading-none">Total</span>
                    <span className="text-xl font-black text-[#00B8A0] leading-none">${totalCart}</span>
                  </div>
                  <button onClick={sendOrder} className="flex-1 py-3 bg-[#00B8A0] text-black font-black rounded-xl shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all hover:brightness-110 text-[11px]">
                    ENVIAR PEDIDO <Send size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .glass { background: ${theme === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.9)'}; backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }
                .skeleton-pulse { 
                    background: linear-gradient(90deg, transparent 25%, rgba(0, 184, 160, 0.1) 50%, transparent 75%);
                    background-size: 200% 100%;
                    animation: skeleton-loading 2s infinite ease-in-out;
                }
                @keyframes skeleton-loading { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
            `}</style>
        </motion.div>
    );
};