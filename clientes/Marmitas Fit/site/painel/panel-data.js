/* Marmitas Fit - Painel de Gestão e Operação Operacional */

// Estado inicial padrão de pedidos
const DEFAULT_ORDERS = [
  {
    id: 4821,
    customer: "Juliana Medeiros",
    channel: "Site Marmitas Fit",
    items: [
      "4x Strogonoff de Frango Fit (com Arroz Integral e Legumes)",
      "3x Patinho Moído com Purê de Mandioquinha",
      "3x Frango Grelhado com Batata Doce & Vagem",
      "2x Suco Verde Termogênico 300ml"
    ],
    payment: "Pix (Confirmado)",
    price: "R$ 265,80",
    minutes: 3,
    status: "recebido",
    phone: "(21) 98721-4410",
    address: "Rua Dias da Cruz, 620 - Apto 402",
    neighborhood: "Méier",
    notes: "Entregar em sacola térmica. Interfone 402.",
    createdAt: "10:45"
  },
  {
    id: 4820,
    customer: "Rodrigo Vasconcelos",
    channel: "WhatsApp Oficial",
    items: [
      "1x Combo 20 Marmitas Mensal Fit (Seleção Proteica)",
      "4x Suco Detox Laranja com Cenoura 300ml"
    ],
    payment: "Pix (Confirmado)",
    price: "R$ 464,60",
    minutes: 6,
    status: "recebido",
    phone: "(21) 99310-8822",
    address: "Rua Clarimundo de Melo, 340",
    neighborhood: "Piedade",
    notes: "Pode deixar com a portaria se eu não estiver no momento.",
    createdAt: "10:42"
  },
  {
    id: 4819,
    customer: "Dra. Camila Nogueira",
    channel: "Site Marmitas Fit",
    items: [
      "5x Filé de Tilápia Grelhada com Legumes Assados",
      "5x Salmão Grelhado com Quinoa e Brócolis",
      "2x Mousse de Maracujá Fit com Whey"
    ],
    payment: "Cartão (Online Aprovado)",
    price: "R$ 298,00",
    minutes: 9,
    status: "recebido",
    phone: "(21) 99120-7741",
    address: "Rua Conde de Bonfim, 412 - Bloco 2",
    neighborhood: "Tijuca",
    notes: "Marmitas bem congeladas para guardar no freezer do consultório.",
    createdAt: "10:38"
  },
  {
    id: 4818,
    customer: "Marcos Paulo Silveira",
    channel: "Balcão (Piedade)",
    items: [
      "2x Carne de Panela Desfiada com Mandioca",
      "2x Strogonoff de Frango Fit",
      "1x Brownie Fit 70% Cacau"
    ],
    payment: "Pix (Pago no Balcão)",
    price: "R$ 108,70",
    minutes: 12,
    status: "preparando",
    phone: "(21) 97412-3390",
    address: "Retirada no Balcão (Rua José Mariano, 10)",
    neighborhood: "Piedade",
    notes: "Cliente vai retirar no balcão às 11:30.",
    createdAt: "10:35"
  },
  {
    id: 4817,
    customer: "Beatriz Fontes",
    channel: "Site Marmitas Fit",
    items: [
      "1x Combo 10 Marmitas Personalizado (Linha Low Carb)",
      "2x Suco Verde Termogênico 300ml"
    ],
    payment: "Cartão (Online Aprovado)",
    price: "R$ 246,80",
    minutes: 15,
    status: "preparando",
    phone: "(21) 99882-6614",
    address: "Rua Cirne Maia, 115",
    neighborhood: "Cachambi",
    notes: "Casa com muro branco e portão de alumínio.",
    createdAt: "10:30"
  },
  {
    id: 4816,
    customer: "Felipe Guedes",
    channel: "WhatsApp Oficial",
    items: [
      "4x Frango ao Curry com Arroz de Couve-Flor",
      "4x Escondidinho de Batata Doce com Frango",
      "2x Brownie Fit 70% Cacau"
    ],
    payment: "Pix (Confirmado)",
    price: "R$ 208,60",
    minutes: 19,
    status: "preparando",
    phone: "(21) 98114-5509",
    address: "Rua Santos Titara, 89",
    neighborhood: "Todos os Santos",
    notes: "Chamar no WhatsApp quando o motoboy estiver saindo.",
    createdAt: "10:24"
  },
  {
    id: 4815,
    customer: "Larissa Amaral",
    channel: "Site Marmitas Fit",
    items: [
      "5x Patinho Moído com Purê de Mandioquinha",
      "5x Frango Grelhado com Batata Doce & Vagem"
    ],
    payment: "Pix (Confirmado)",
    price: "R$ 239,00",
    minutes: 24,
    status: "pronto",
    phone: "(21) 99401-2299",
    address: "Estrada do Portela, 150 - Apto 601",
    neighborhood: "Madureira",
    notes: "Separado no freezer. Aguardando saída do motoboy da rota Madureira.",
    createdAt: "10:15"
  },
  {
    id: 4814,
    customer: "Marcelo Dutra",
    channel: "Site Marmitas Fit",
    items: [
      "6x Carne de Panela Desfiada com Mandioca",
      "4x Filé de Tilápia com Legumes Assados"
    ],
    payment: "Cartão (Online Aprovado)",
    price: "R$ 268,00",
    minutes: 10,
    status: "entrega",
    courier: "Patrick Teixeira",
    phone: "(21) 98820-1133",
    address: "Rua Medina, 210",
    neighborhood: "Méier",
    notes: "Em rota de entrega na sacola térmica.",
    createdAt: "09:55"
  },
  {
    id: 4813,
    customer: "Fernanda Lins",
    channel: "WhatsApp Oficial",
    items: [
      "1x Combo 10 Marmitas Variadas",
      "1x Mousse de Maracujá Fit"
    ],
    payment: "Pix (Confirmado)",
    price: "R$ 240,90",
    minutes: 14,
    status: "entrega",
    courier: "Tiago Santos",
    phone: "(21) 99118-7744",
    address: "Rua Torres de Oliveira, 75",
    neighborhood: "Piedade",
    notes: "Entregando na mesma rua da operação de Piedade.",
    createdAt: "09:48"
  }
];

const DEFAULT_COURIERS = [
  { name: "Patrick Teixeira", status: "Em rota", deliveries: "14 entregas hoje", tone: "amber" },
  { name: "Tiago Santos", status: "Em rota", deliveries: "11 entregas hoje", tone: "amber" },
  { name: "Bruno Costa", status: "Disponível", deliveries: "9 entregas hoje", tone: "green" },
  { name: "Rafael Lima", status: "Disponível", deliveries: "12 entregas hoje", tone: "green" }
];

const DEFAULT_SOLD_OUT = [
  "Salmão Grelhado com Quinoa",
  "Suco Detox de Frutas Vermelhas"
];

const DEFAULT_COURIER_AVAILABLE = [
  {
    id: 4815,
    store: "Marmitas Fit (Piedade)",
    customer: "Larissa Amaral",
    phone: "(21) 99401-2299",
    address: "Estrada do Portela, 150",
    neighborhood: "Madureira",
    distance: "3,2 km",
    fee: "R$ 7,00",
    payment: "Pix",
    minutes: 12,
    image: "https://pd-clientes-all.s3.us-west-2.amazonaws.com/marmitasfitsaudavel/upload/banner/b1_08112024031714.webp",
    items: ["5x Patinho com Mandioquinha", "5x Frango c/ Batata Doce"],
    notes: "Sacola térmica com 10 marmitas congeladas."
  },
  {
    id: 4817,
    store: "Marmitas Fit (Piedade)",
    customer: "Beatriz Fontes",
    phone: "(21) 99882-6614",
    address: "Rua Cirne Maia, 115",
    neighborhood: "Cachambi",
    distance: "2,8 km",
    fee: "R$ 6,50",
    payment: "Cartão",
    minutes: 15,
    image: "https://pd-clientes-all.s3.us-west-2.amazonaws.com/marmitasfitsaudavel/upload/banner/b1_08112024031714.webp",
    items: ["1x Combo 10 Low Carb", "2x Suco Verde"],
    notes: "Interfone bloco B."
  }
];

const DEFAULT_COURIER_ACTIVE = [
  {
    id: 4814,
    store: "Marmitas Fit (Piedade)",
    customer: "Marcelo Dutra",
    phone: "(21) 98820-1133",
    address: "Rua Medina, 210",
    neighborhood: "Méier",
    distance: "2,4 km",
    fee: "R$ 6,00",
    payment: "Cartão",
    minutes: 8,
    image: "https://pd-clientes-all.s3.us-west-2.amazonaws.com/marmitasfitsaudavel/upload/banner/b1_08112024031714.webp",
    items: ["6x Carne de Panela Desfiada", "4x Tilápia com Legumes"],
    notes: "Sacola térmica fechada com lacre de segurança.",
    stage: "a_caminho"
  }
];

const DEFAULT_COURIER_HISTORY = [
  {
    id: 4809,
    store: "Marmitas Fit (Piedade)",
    customer: "Tatiana Rezende",
    phone: "(21) 98002-9911",
    address: "Rua Santos Titara, 44",
    neighborhood: "Todos os Santos",
    distance: "2,1 km",
    fee: "R$ 6,00",
    payment: "Pix",
    minutes: 14,
    image: "https://pd-clientes-all.s3.us-west-2.amazonaws.com/marmitasfitsaudavel/upload/banner/b1_08112024031714.webp",
    items: ["1x Combo 10 Marmitas Fit"],
    deliveredAt: "10:14"
  },
  {
    id: 4805,
    store: "Marmitas Fit (Piedade)",
    customer: "Gustavo Albuquerque",
    phone: "(21) 99730-1122",
    address: "Rua Silva Rabelo, 120",
    neighborhood: "Méier",
    distance: "2,9 km",
    fee: "R$ 6,50",
    payment: "Cartão",
    minutes: 18,
    image: "https://pd-clientes-all.s3.us-west-2.amazonaws.com/marmitasfitsaudavel/upload/banner/b1_08112024031714.webp",
    items: ["1x Combo 20 Marmitas Mensal"],
    deliveredAt: "09:42"
  }
];

// Categorias padrão da Marmitas Fit
const DEFAULT_CATEGORIES = [
  { id: "marmitas-frango", name: "Linha Frango", icon: "🍗", desc: "Marmitas nutritivas com peito de frango selecionado, baixo teor de gordura.", active: true },
  { id: "marmitas-carne", name: "Linha Carne Bovina", icon: "🥩", desc: "Patinho moído de primeira e carne de panela desfiada magra.", active: true },
  { id: "marmitas-peixe", name: "Linha Peixes & Frutos", icon: "🐟", desc: "Filés de tilápia e salmão ricos em ômega-3 grelhados com perfeição.", active: true },
  { id: "low-carb", name: "Linha Low Carb", icon: "🥦", desc: "Pratos cetogênicos e funcionais sem carboidratos simples refinados.", active: true },
  { id: "combos-kits", name: "Combos & Kits Semanais", icon: "📦", desc: "Pacotes de 10 a 20 marmitas congeladas com o melhor custo-benefício.", active: true },
  { id: "sucos-detox", name: "Sucos Naturais & Detox", icon: "🥤", desc: "Sucos prensados a frio, sem adição de açúcar ou conservantes.", active: true },
  { id: "sobremesas-fit", name: "Doces & Sobremesas Fit", icon: "🍮", desc: "Mousses com Whey e brownies 70% cacau funcionais sem culpa.", active: true }
];

// Produtos padrão do cardápio Marmitas Fit
const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "Strogonoff de Frango Fit (350g)",
    category: "Linha Frango",
    price: 24.90,
    sales: 142,
    active: true,
    availabilityType: "always",
    availableDays: ["seg", "ter", "qua", "qui", "sex", "sab", "dom"],
    availableHours: { start: "08:00", end: "20:00" },
    channels: ["site", "presencial", "whatsapp"],
    ingredients: ["150g Peito de frango em cubos", "120g Arroz integral soltinho", "80g Legumes no vapor", "Molho de creme de leite leve com champignon"],
    description: "Cremoso strogonoff com molho leve à base de creme de leite light, arroz integral e legumes no vapor.",
    badge: "Mais Pedido",
    image: "https://pd-clientes-all.s3.us-west-2.amazonaws.com/marmitasfitsaudavel/upload/banner/b1_08112024031714.webp"
  },
  {
    id: 2,
    name: "Patinho Moído com Purê de Mandioquinha (350g)",
    category: "Linha Carne Bovina",
    price: 25.90,
    sales: 128,
    active: true,
    availabilityType: "always",
    availableDays: ["seg", "ter", "qua", "qui", "sex", "sab", "dom"],
    availableHours: { start: "08:00", end: "20:00" },
    channels: ["site", "presencial", "whatsapp"],
    ingredients: ["150g Patinho moído magro refogado", "120g Purê rústico de mandioquinha", "80g Brócolis e cenoura no vapor"],
    description: "Patinho bovino moído de primeira temperado com alho e cheiro verde, purê aveludado de mandioquinha e legumes.",
    badge: "Proteico",
    image: "https://pd-clientes-all.s3.us-west-2.amazonaws.com/marmitasfitsaudavel/upload/banner/b1_08112024031714.webp"
  },
  {
    id: 3,
    name: "Frango Grelhado com Batata Doce & Vagem (350g)",
    category: "Linha Frango",
    price: 23.90,
    sales: 115,
    active: true,
    availabilityType: "always",
    availableDays: ["seg", "ter", "qua", "qui", "sex", "sab", "dom"],
    availableHours: { start: "08:00", end: "20:00" },
    channels: ["site", "presencial", "whatsapp"],
    ingredients: ["150g Filé de frango grelhado com ervas", "120g Batata doce assada", "80g Vagem refogada no azeite"],
    description: "O clássico fitness perfeito para pré e pós treino. Suculento filé de peito com batata doce e vagem crocante.",
    badge: "Favorito Treino",
    image: "https://pd-clientes-all.s3.us-west-2.amazonaws.com/marmitasfitsaudavel/upload/banner/b1_08112024031714.webp"
  },
  {
    id: 4,
    name: "Filé de Tilápia com Legumes Assados (350g)",
    category: "Linha Peixes & Frutos",
    price: 26.90,
    sales: 84,
    active: true,
    availabilityType: "always",
    availableDays: ["seg", "ter", "qua", "qui", "sex", "sab", "dom"],
    availableHours: { start: "08:00", end: "20:00" },
    channels: ["site", "presencial", "whatsapp"],
    ingredients: ["150g Filé de tilápia grelhada no azeite", "120g Arroz branco com açafrão", "80g Abobrinha e cenoura assadas"],
    description: "Tilápia fresca marinada no limão siciliano e ervas, grelhada com arroz de açafrão e legumes assados.",
    badge: "Leve & Saudável",
    image: "https://pd-clientes-all.s3.us-west-2.amazonaws.com/marmitasfitsaudavel/upload/banner/b1_08112024031714.webp"
  },
  {
    id: 5,
    name: "Carne de Panela Desfiada com Mandioca (350g)",
    category: "Linha Carne Bovina",
    price: 27.90,
    sales: 96,
    active: true,
    availabilityType: "always",
    availableDays: ["seg", "ter", "qua", "qui", "sex", "sab", "dom"],
    availableHours: { start: "08:00", end: "20:00" },
    channels: ["site", "presencial", "whatsapp"],
    ingredients: ["150g Acém bovino cozido lentamente e desfiado", "120g Mandioca cozida macia", "80g Couve refogada no alho"],
    description: "Carne bovina de panela desfiada desmanchando, regada ao caldo do próprio cozimento com mandioca e couve.",
    badge: "Confort Food",
    image: "https://pd-clientes-all.s3.us-west-2.amazonaws.com/marmitasfitsaudavel/upload/banner/b1_08112024031714.webp"
  },
  {
    id: 6,
    name: "Frango ao Curry com Arroz de Couve-Flor (350g)",
    category: "Linha Low Carb",
    price: 25.90,
    sales: 78,
    active: true,
    availabilityType: "always",
    availableDays: ["seg", "ter", "qua", "qui", "sex", "sab", "dom"],
    availableHours: { start: "08:00", end: "20:00" },
    channels: ["site", "presencial", "whatsapp"],
    ingredients: ["150g Peito de frango com curry e leite de coco light", "120g Arroz de couve-flor refogada", "80g Vagem e abobrinha"],
    description: "100% Low carb! Iscas de frango ao curry aromático acompanhadas de falso arroz de couve-flor.",
    badge: "100% Low Carb",
    image: "https://pd-clientes-all.s3.us-west-2.amazonaws.com/marmitasfitsaudavel/upload/banner/b1_08112024031714.webp"
  },
  {
    id: 7,
    name: "Combo 10 Marmitas Personalizado",
    category: "Combos & Kits Semanais",
    price: 229.00,
    sales: 112,
    active: true,
    availabilityType: "always",
    availableDays: ["seg", "ter", "qua", "qui", "sex", "sab", "dom"],
    availableHours: { start: "08:00", end: "20:00" },
    channels: ["site", "presencial", "whatsapp"],
    ingredients: ["10 Marmitas 350g selecionadas pelo cliente", "Embaladas para congelador"],
    description: "Economize pedindo o kit da semana! Escolha 10 pratos à sua escolha no cardápio com desconto exclusivo.",
    badge: "Melhor Custo-Benefício",
    image: "https://pd-clientes-all.s3.us-west-2.amazonaws.com/marmitasfitsaudavel/upload/banner/b1_08112024031714.webp"
  },
  {
    id: 8,
    name: "Combo 20 Marmitas Mensal Fit",
    category: "Combos & Kits Semanais",
    price: 429.00,
    sales: 64,
    active: true,
    availabilityType: "always",
    availableDays: ["seg", "ter", "qua", "qui", "sex", "sab", "dom"],
    availableHours: { start: "08:00", end: "20:00" },
    channels: ["site", "presencial", "whatsapp"],
    ingredients: ["20 Marmitas 350g selecionadas", "Frete Grátis incluso em todo o Rio"],
    description: "Garanta almoço e jantar fitness para o mês inteiro. 20 refeições completas com Frete Grátis garantido.",
    badge: "Frete Grátis",
    image: "https://pd-clientes-all.s3.us-west-2.amazonaws.com/marmitasfitsaudavel/upload/banner/b1_08112024031714.webp"
  },
  {
    id: 9,
    name: "Suco Verde Termogênico 300ml",
    category: "Sucos Naturais & Detox",
    price: 8.90,
    sales: 148,
    active: true,
    availabilityType: "always",
    availableDays: ["seg", "ter", "qua", "qui", "sex", "sab", "dom"],
    availableHours: { start: "08:00", end: "20:00" },
    channels: ["site", "presencial", "whatsapp"],
    ingredients: ["Couve orgânica", "Limão tahiti", "Gengibre fresco", "Maçã verde", "Água mineral"],
    description: "Detox revigorante sem adição de açúcares ou conservantes. Ajuda no metabolismo e digestão.",
    badge: "Refrescante",
    image: "https://pd-clientes-all.s3.us-west-2.amazonaws.com/marmitasfitsaudavel/upload/banner/b1_08112024031714.webp"
  },
  {
    id: 10,
    name: "Brownie Fit 70% Cacau com Batata Doce",
    category: "Doces & Sobremesas Fit",
    price: 9.90,
    sales: 92,
    active: true,
    availabilityType: "always",
    availableDays: ["seg", "ter", "qua", "qui", "sex", "sab", "dom"],
    availableHours: { start: "08:00", end: "20:00" },
    channels: ["site", "presencial", "whatsapp"],
    ingredients: ["Cacau belga 70%", "Massa de batata doce", "Ovos", "Óleo de coco", "Adoçante xilitol natural"],
    description: "Massa molhadinha e densa de chocolate com zero glúten, zero lactose e adoçado com xilitol natural.",
    badge: "Zero Açúcar",
    image: "https://pd-clientes-all.s3.us-west-2.amazonaws.com/marmitasfitsaudavel/upload/banner/b1_08112024031714.webp"
  }
];

// Funções utilitárias de Storage
function getStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

// Helpers para Toast
function showToast(msg) {
  const existing = document.getElementById("panel-toast");
  if (existing) existing.remove();
  const toast = document.createElement("div");
  toast.id = "panel-toast";
  toast.className = "fixed bottom-6 right-6 z-[130] rounded-2xl bg-slate-950 px-4 py-3 text-xs font-extrabold text-white shadow-2xl transition-all duration-300";
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 2300);
}

// Export global para páginas
window.MarmitasPanel = {
  DEFAULT_ORDERS,
  DEFAULT_COURIERS,
  DEFAULT_SOLD_OUT,
  DEFAULT_COURIER_AVAILABLE,
  DEFAULT_COURIER_ACTIVE,
  DEFAULT_COURIER_HISTORY,
  DEFAULT_CATEGORIES,
  DEFAULT_PRODUCTS,
  getStorage,
  setStorage,
  showToast
};

// Aliases para compatibilidade total com os scripts clonados de Juca
window.JucaPanel = window.MarmitasPanel;
