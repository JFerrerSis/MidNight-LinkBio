// IMPORTACIÓN DE IMÁGENES
// Asegúrate de que los nombres de archivos coincidan con lo que tienes en assets
import p3 from '../assets/products/polaroid3.jpeg';
import p6 from '../assets/products/polaroid6.jpeg';
import p9 from '../assets/products/polaroid9.jpeg';
import tira from '../assets/products/tiras.jpeg';
import tazaB from '../assets/products/tazablanca.jpeg';
import tazaM from '../assets/products/tazamagica.jpeg';
import micro from '../assets/products/microdurazno.jpeg';
import algodon from '../assets/products/algodon.jpeg';
import over from '../assets/products/oversize.jpeg';
import over3 from '../assets/products/oversize_mayor.jpeg';
import carta from '../assets/products/dft_carta.jpeg';
import tabloide from '../assets/products/dft_tabloide.jpeg';
import marca from '../assets/products/marcapaginas.jpeg';

export const PRODUCTS = [
  // --- FOTOGRAFÍA ---
  {
    id: '00003',
    name: "Foto Polaroid x 3",
    price: "1.50",
    image: p3,
    category: "Fotografía"
  },
  {
    id: '00004',
    name: "Foto Polaroid x 6",
    price: "2.50",
    image: p6,
    category: "Fotografía"
  },
  {
    id: '00005',
    name: "Fotos Polaroid x 9",
    price: "4.00",
    image: p9,
    category: "Fotografía"
  },
  {
    id: '00006',
    name: "Tira de Fotos x 2",
    price: "5.00",
    image: tira,
    category: "Fotografía"
  },

  // --- TAZAS ---
  {
    id: '00001',
    name: "Taza Blanca Estampada",
    price: "5.00",
    image: tazaB,
    category: "Tazas"
  },
  {
    id: '00002',
    name: "Tazas Mágicas Negras 11oz",
    price: "8.00",
    image: tazaM,
    category: "Tazas"
  },

  // --- TEXTIL ---
  {
    id: '00008',
    name: "Franela Microdurazno Estampada",
    price: "13.00",
    image: micro,
    category: "Textil"
  },
  {
    id: '00012',
    name: "Franela Algodón Básica Estampada",
    price: "18.00",
    image: algodon,
    category: "Textil"
  },
  {
    id: '00007',
    name: "Franela Oversize Estampada",
    price: "26.00",
    image: over,
    category: "Textil"
  },
  {
    id: '00013',
    name: "Oversize Estampada (Mayor a 3 piezas)",
    price: "23.00",
    image: over3,
    category: "Textil"
  },

  // --- SERVICIOS DE ESTAMPADO (DFT) ---
  {
    id: '00009',
    name: "Estampado DFT Tipo Carta",
    price: "5.00",
    image: carta,
    category: "Servicios"
  },
  {
    id: '00010',
    name: "Estampado DFT Tabloide",
    price: "8.00",
    image: tabloide,
    category: "Servicios"
  },

  // --- OTROS ---
  {
    id: '00014',
    name: "Marcapáginas Personalizado",
    price: "2.00",
    image: marca,
    category: "Papelería"
  },
];