/* Pizza do Juca - Painel de Gestão e Operação */

// Estado inicial padrão
const DEFAULT_ORDERS = [
  {
    id: 1054,
    customer: "Rodrigo Almeida",
    channel: "iFood",
    items: ["1x Pizza Portuguesa Tradicional (Grande 40cm)", "1x Borda Recheada Catupiry Original", "1x Guaraná Antarctica 2L"],
    payment: "Pago no iFood (Online)",
    price: "R$ 72,50",
    minutes: 2,
    status: "recebido",
    phone: "(21) 98774-2109",
    address: "Rua Amaral Costa, 142 - Apto 302",
    neighborhood: "Campo Grande",
    notes: "Interfone 302 bloco B. Portaria autorizada a subir.",
    createdAt: "19:42"
  },
  {
    id: 1053,
    customer: "Dona Maria das Graças",
    channel: "Site do Juca",
    items: ["1x Pizza Calabresa Especial com Cebola Roxa (Grande)", "1x Pizza Doce Nutella com Morango (Média)"],
    payment: "Pix (Confirmado)",
    price: "R$ 84,00",
    minutes: 4,
    status: "recebido",
    phone: "(21) 99312-4055",
    address: "Rua Santa Cruz, 885",
    neighborhood: "Paciência",
    notes: "Massa bem fininha e bem assadinha, por favor!",
    createdAt: "19:40"
  },
  {
    id: 1052,
    customer: "Marcos Vinícius",
    channel: "99Food",
    items: ["1x Pizza Frango com Catupiry (Grande)", "1x Coca-Cola 2L Gelada"],
    payment: "Pago na 99Food",
    price: "R$ 61,00",
    minutes: 6,
    status: "recebido",
    phone: "(21) 99120-4491",
    address: "Estrada da Posse, 1200",
    neighborhood: "Santíssimo",
    notes: "Caprichar no orégano e azeitonas pretas.",
    createdAt: "19:38"
  },
  {
    id: 1051,
    customer: "Cláudio Pimenta",
    channel: "WhatsApp",
    items: ["1x Pizza Quatro Queijos Nobres (Média 35cm)", "1x Guaraná Antarctica 2L"],
    payment: "Dinheiro (Troco p/ R$ 100)",
    price: "R$ 52,00",
    minutes: 8,
    status: "recebido",
    phone: "(21) 97411-8820",
    address: "Rua dos Pioneiros, 310",
    neighborhood: "Paciência",
    notes: "Sem azeitona preta. Troco para R$ 100 em dinheiro.",
    createdAt: "19:35"
  },
  {
    id: 1050,
    customer: "Camila Guimarães",
    channel: "Site do Juca",
    items: ["1x Pizza Carne Seca com Catupiry (Gigante 45cm)", "1x Borda Recheada Cheddar Cremoso"],
    payment: "Cartão (Levar maquininha)",
    price: "R$ 79,90",
    minutes: 11,
    status: "preparando",
    phone: "(21) 99884-3321",
    address: "Rua das Flores, 54",
    neighborhood: "Paciência",
    notes: "Cebola bem fininha, massa bem crocante!",
    createdAt: "19:28"
  },
  {
    id: 1049,
    customer: "Felipe Siqueira",
    channel: "iFood",
    items: ["1x Pizza Calabresa com Bacon Crocante (Grande)", "1x Borda Chocolate ao Leite"],
    payment: "Pago no iFood",
    price: "R$ 68,00",
    minutes: 14,
    status: "preparando",
    phone: "(21) 98112-9903",
    address: "Estrada do Mendanha, 410",
    neighborhood: "Campo Grande",
    notes: "Caprichar no molho de tomate caseiro.",
    createdAt: "19:24"
  },
  {
    id: 1048,
    customer: "Seu Geraldo",
    channel: "Balcão",
    items: ["1x Pizza Dois Queijos Tradicional (Grande)"],
    payment: "Pix (Pago no Balcão)",
    price: "R$ 44,00",
    minutes: 16,
    status: "preparando",
    phone: "(21) 97002-1144",
    address: "Retirada no Balcão",
    neighborhood: "Paciência",
    notes: "Cliente aguardando na mesa do balcão.",
    createdAt: "19:20"
  },
  {
    id: 1047,
    customer: "Larissa Manoela",
    channel: "Site do Juca",
    items: ["1x Pizza Especial do Juca (Gigante 45cm)", "1x Guaraná Antarctica 2L", "1x Borda Recheada Catupiry"],
    payment: "Pix (Confirmado)",
    price: "R$ 89,00",
    minutes: 21,
    status: "pronto",
    phone: "(21) 99402-5511",
    address: "Av. Brasil, 42100",
    neighborhood: "Paciência",
    notes: "Embalagem reforçada para viagem.",
    createdAt: "19:10"
  },
  {
    id: 1046,
    customer: "Lucas Peixoto",
    channel: "99Food",
    items: ["1x Pizza Marguerita Especial (Grande)", "1x Calzone 4 Queijos"],
    payment: "Pago na 99Food",
    price: "R$ 63,50",
    minutes: 23,
    status: "pronto",
    phone: "(21) 98223-1190",
    address: "Rua Silva Cardoso, 219",
    neighborhood: "Santa Cruz",
    notes: "Aguardando entregador da 99 encostar na pizzaria.",
    createdAt: "19:08"
  },
  {
    id: 1045,
    customer: "Mariana Costa",
    channel: "Site do Juca",
    items: ["1x Pizza Frango com Catupiry (Grande)", "1x Borda Recheada Catupiry", "1x Coca-Cola 2L"],
    payment: "Pix (Confirmado)",
    price: "R$ 68,00",
    minutes: 7,
    status: "entrega",
    courier: "Patrick Teixeira",
    phone: "(21) 98821-4452",
    address: "Rua Nova Esperança, 88",
    neighborhood: "Paciência",
    notes: "Interfone 204. Casa do fundo.",
    createdAt: "18:55"
  },
  {
    id: 1044,
    customer: "Bruno Fagundes",
    channel: "WhatsApp",
    items: ["1x Pizza Calabresa (Grande)", "1x Pizza Doce Banana Nevada com Canela (Broto)"],
    payment: "Cartão (Levar maquininha)",
    price: "R$ 62,00",
    minutes: 12,
    status: "entrega",
    courier: "Tiago Santos",
    phone: "(21) 99119-0022",
    address: "Estrada da Ubaia, 340",
    neighborhood: "Paciência",
    notes: "Casa com muro verde em frente à padaria.",
    createdAt: "18:48"
  }
];

const DEFAULT_COURIERS = [
  { name: "Rafael Lima", status: "Disponível", deliveries: "12 entregas hoje", tone: "green" },
  { name: "Diego Souza", status: "Disponível", deliveries: "8 entregas hoje", tone: "green" },
  { name: "Matheus Alves", status: "Em entrega", deliveries: "9 entregas hoje", tone: "amber" },
  { name: "Bruno Costa", status: "Disponível", deliveries: "6 entregas hoje", tone: "green" }
];

const DEFAULT_SOLD_OUT = [
  "Borda Recheada de Cheddar",
  "Pizza Especial de Camarão",
  "Guaracamp 285ml"
];

const DEFAULT_COURIER_AVAILABLE = [
  {
    id: 1048,
    store: "Pizza do Juca",
    customer: "João Silva",
    phone: "(21) 99142-7730",
    address: "Rua das Flores, 123",
    neighborhood: "Paciência",
    distance: "1,8 km",
    fee: "R$ 7,50",
    payment: "Pix",
    minutes: 12,
    image: "/combo-calabresa-guarana.webp",
    items: ["1x Pizza Calabresa Especial (Grande)", "1x Coca-Cola 2L"],
    notes: "Sem cebola. Portão cinza ao lado do mercado."
  },
  {
    id: 1049,
    store: "Pizza do Juca",
    customer: "Mariana Costa",
    phone: "(21) 98821-4452",
    address: "Estrada do Mendanha, 840",
    neighborhood: "Campo Grande",
    distance: "3,4 km",
    fee: "R$ 9,00",
    payment: "Cartão",
    minutes: 15,
    image: "/hero-pizza.webp",
    items: ["1x Pizza Frango c/ Catupiry (Grande)", "1x Borda Catupiry"],
    notes: "Interfone 204."
  },
  {
    id: 1050,
    store: "Pizza do Juca",
    customer: "Carlos Ribeiro",
    phone: "(21) 98044-5012",
    address: "Rua Pioneiros, 789",
    neighborhood: "Paciência",
    distance: "2,2 km",
    fee: "R$ 7,00",
    payment: "Dinheiro",
    minutes: 10,
    image: "/fatia-calabresa-catupiry.webp",
    items: ["1x Pizza Quatro Queijos (Média)", "1x Guaraná 2L"],
    notes: "Troco para R$ 50."
  }
];

const DEFAULT_COURIER_ACTIVE = [
  {
    id: 1045,
    store: "Pizza do Juca",
    customer: "Ana Paula",
    phone: "(21) 97420-1188",
    address: "Rua Silva Cardoso, 91",
    neighborhood: "Santa Cruz",
    distance: "2,6 km",
    fee: "R$ 8,00",
    payment: "Pix",
    minutes: 8,
    image: "/hero-calabresa-catupiry.webp",
    items: ["1x Pizza Portuguesa Tradicional (Grande)", "1x Coca-Cola 2L"],
    notes: "Casa com portão branco e muro alto.",
    stage: "a_caminho"
  }
];

const DEFAULT_COURIER_HISTORY = [
  {
    id: 1038,
    store: "Pizza do Juca",
    customer: "Rafael Gomes",
    phone: "(21) 98001-2291",
    address: "Rua Limites, 44",
    neighborhood: "Realengo",
    distance: "3,1 km",
    fee: "R$ 9,50",
    payment: "Pix",
    minutes: 14,
    image: "/combo-calabresa-guarana.webp",
    items: ["1x Pizza Dois Queijos (Grande)"],
    deliveredAt: "21:14"
  },
  {
    id: 1036,
    store: "Pizza do Juca",
    customer: "Bianca Santos",
    phone: "(21) 99731-3302",
    address: "Av. Brasil, 4120",
    neighborhood: "Bangu",
    distance: "4,0 km",
    fee: "R$ 10,00",
    payment: "Cartão",
    minutes: 18,
    image: "/hero-pizza.webp",
    items: ["1x Pizza Calabresa (Grande)", "1x Guaravita"],
    deliveredAt: "20:42"
  },
  {
    id: 1032,
    store: "Pizza do Juca",
    customer: "Pedro Henrique",
    phone: "(21) 97570-9011",
    address: "Rua Oliveira Braga, 77",
    neighborhood: "Campo Grande",
    distance: "1,8 km",
    fee: "R$ 7,50",
    payment: "Dinheiro",
    minutes: 11,
    image: "/fatia-calabresa-catupiry.webp",
    items: ["1x Pizza Frango Crocante (Grande)"],
    deliveredAt: "19:58"
  },
  {
    id: 1029,
    store: "Pizza do Juca",
    customer: "Larissa Melo",
    phone: "(21) 98111-4020",
    address: "Rua Amaral Costa, 210",
    neighborhood: "Santa Cruz",
    distance: "2,7 km",
    fee: "R$ 8,50",
    payment: "Pix",
    minutes: 16,
    image: "/hero-calabresa-catupiry.webp",
    items: ["1x Pizza Especial do Juca (Gigante 45cm)", "1x Coca-Cola 2L"],
    deliveredAt: "19:31"
  }
];

// Categorias padrão do cardápio (Pizzas, Pastéis, Hambúrgueres, Bebidas, etc.)
const DEFAULT_CATEGORIES = [
  { id: "pizzas-salgadas", name: "Pizzas Salgadas", icon: "🍕", desc: "Pizzas grandes, médias e gigantes na massa tradicional ou fininha crocante.", active: true },
  { id: "pizzas-doces", name: "Pizzas Doces", icon: "🍫", desc: "Sobremesas artesanais recheadas com Nutella, morango e chocolate nobre.", active: true },
  { id: "hamburgueres", name: "Hambúrgueres", icon: "🍔", desc: "Hambúrgueres artesanais suculentos no pão brioche selado na manteiga.", active: true },
  { id: "pasteis", name: "Pastéis", icon: "🥟", desc: "Pastéis crocantes e sequinhos fritos na hora com recheio farto e saboroso.", active: true },
  { id: "bordas", name: "Bordas Recheadas", icon: "🧀", desc: "Bordas generosas de Catupiry legítimo original e Cheddar cremoso.", active: true },
  { id: "bebidas", name: "Bebidas & Refrigerantes", icon: "🥤", desc: "Refrigerantes 2 Litros trincando de gelados, latas e sucos para acompanhar.", active: true }
];

// Produtos padrão com suporte completo a ingredientes individuais, canais de venda e disponibilidade temporal
const DEFAULT_PRODUCTS = [
  { 
    id: 1, 
    name: "Pizza Calabresa Especial (Grande)", 
    category: "Pizzas Salgadas", 
    price: 49.90, 
    sales: 58, 
    active: true, 
    availabilityType: "always",
    availableDays: ["seg", "ter", "qua", "qui", "sex", "sab", "dom"],
    availableHours: { start: "18:00", end: "23:59" },
    channels: ["site", "presencial", "ifood", "99food"],
    ingredients: ["Molho pomodoro pelati artesanal", "Muçarela de primeira", "Calabresa fatiada defumada", "Cebola roxa fresca", "Orégano chileno"],
    description: "Molho pomodoro pelati, muçarela de cura, calabresa defumada, cebola roxa e orégano.", 
    badge: "Mais Pedida",
    image: "/combo-calabresa-guarana.webp" 
  },
  { 
    id: 2, 
    name: "Pizza Quatro Queijos Nobres (Grande)", 
    category: "Pizzas Salgadas", 
    price: 54.90, 
    sales: 46, 
    active: true, 
    availabilityType: "always",
    availableDays: ["seg", "ter", "qua", "qui", "sex", "sab", "dom"],
    availableHours: { start: "18:00", end: "23:59" },
    channels: ["site", "presencial", "ifood", "99food"],
    ingredients: ["Molho pomodoro artesanal", "Muçarela de primeira", "Provolone defumado", "Gorgonzola suave", "Catupiry legítimo", "Orégano"],
    description: "Muçarela de cura, provolone defumado, gorgonzola e catupiry original.", 
    badge: "Especial",
    image: "/hero-pizza.webp" 
  },
  { 
    id: 3, 
    name: "Pizza Frango com Catupiry (Grande)", 
    category: "Pizzas Salgadas", 
    price: 52.90, 
    sales: 41, 
    active: true, 
    availabilityType: "always",
    availableDays: ["seg", "ter", "qua", "qui", "sex", "sab", "dom"],
    availableHours: { start: "18:00", end: "23:59" },
    channels: ["site", "presencial", "ifood", "99food"],
    ingredients: ["Molho de tomate artesanal", "Peito de frango desfiado temperado", "Catupiry cremoso", "Muçarela", "Milho verde selecionado"],
    description: "Peito de frango desfiado com ervas finas e legítimo catupiry cremoso.", 
    badge: "Favorita",
    image: "/fatia-calabresa-catupiry.webp" 
  },
  { 
    id: 4, 
    name: "Pizza Nutella com Morango (Média)", 
    category: "Pizzas Doces", 
    price: 44.90, 
    sales: 38, 
    active: true, 
    availabilityType: "always",
    availableDays: ["seg", "ter", "qua", "qui", "sex", "sab", "dom"],
    availableHours: { start: "18:00", end: "23:59" },
    channels: ["site", "presencial", "ifood"],
    ingredients: ["Massa doce crocante", "Nutella pura italiana", "Morangos frescos fatiados", "Leite condensado Moça"],
    description: "Nutella pura com morangos frescos fatiados e leite condensado.", 
    badge: "Sobremesa",
    image: "/fatia-calabresa-catupiry.webp" 
  },
  { 
    id: 5, 
    name: "Pastel de Carne Especial", 
    category: "Pastéis", 
    price: 12.00, 
    sales: 72, 
    active: true, 
    availabilityType: "always",
    availableDays: ["seg", "ter", "qua", "qui", "sex", "sab", "dom"],
    availableHours: { start: "18:00", end: "23:59" },
    channels: ["site", "presencial", "ifood", "99food"],
    ingredients: ["Carne bovina moída temperada", "Cebola roxa picadinha", "Alho dourado", "Azeitona verde fatiada", "Ovo cozido picadinho", "Cheiro-verde fresco", "Massa crocante artesanal"],
    description: "Pastel crocante e sequinho frito na hora com recheio farto de carne moída de primeira, azeitona e ovo.", 
    badge: "Mais Pedido",
    image: "/combo-calabresa-guarana.webp" 
  },
  { 
    id: 6, 
    name: "Pastel de Frango com Catupiry", 
    category: "Pastéis", 
    price: 13.00, 
    sales: 54, 
    active: true, 
    availabilityType: "always",
    availableDays: ["seg", "ter", "qua", "qui", "sex", "sab", "dom"],
    availableHours: { start: "18:00", end: "23:59" },
    channels: ["site", "presencial", "ifood", "99food"],
    ingredients: ["Peito de frango desfiado suculento", "Catupiry legítimo original cremoso", "Milho verde crocante", "Tempero especial da casa"],
    description: "Recheio cremoso e farto com frango desfiado artesanal e legítimo catupiry derretido.", 
    badge: "Cremoso",
    image: "/hero-calabresa-catupiry.webp" 
  },
  { 
    id: 7, 
    name: "Pastel de Queijo com Orégano", 
    category: "Pastéis", 
    price: 11.00, 
    sales: 49, 
    active: true, 
    availabilityType: "always",
    availableDays: ["seg", "ter", "qua", "qui", "sex", "sab", "dom"],
    availableHours: { start: "18:00", end: "23:59" },
    channels: ["site", "presencial", "ifood", "99food"],
    ingredients: ["Muçarela de primeira qualidade dobrada", "Orégano chileno aromático", "Toque de azeite extra virgem"],
    description: "Massa sequinha super recheada de queijo muçarela derretendo a cada mordida com orégano.", 
    badge: "Clássico",
    image: "/hero-pizza.webp" 
  },
  { 
    id: 8, 
    name: "Pastel Especial de Costela ao Barbecue (Fim de Semana)", 
    category: "Pastéis", 
    price: 16.50, 
    sales: 68, 
    active: true, 
    availabilityType: "schedule",
    availableDays: ["sex", "sab", "dom"],
    availableHours: { start: "18:00", end: "23:59" },
    channels: ["site", "presencial", "ifood"],
    ingredients: ["Costela bovina desfiada marinada 12h", "Molho barbecue artesanal", "Queijo muçarela derretido", "Cebola caramelizada"],
    description: "Edição especial de fim de semana! Costela desfiada que desmancha na boca com barbecue defumado.", 
    badge: "Só Sex, Sáb e Dom",
    image: "/combo-calabresa-guarana.webp" 
  },
  { 
    id: 9, 
    name: "X-Burger Artesanal do Juca", 
    category: "Hambúrgueres", 
    price: 28.90, 
    sales: 63, 
    active: true, 
    availabilityType: "always",
    availableDays: ["seg", "ter", "qua", "qui", "sex", "sab", "dom"],
    availableHours: { start: "18:00", end: "23:59" },
    channels: ["site", "presencial", "ifood", "99food"],
    ingredients: ["Pão brioche selado na manteiga", "Blend bovino 160g grelhado", "Queijo cheddar duplo", "Maionese artesanal verde da casa"],
    description: "Blend artesanal suculento de 160g no pão brioche dourado com queijo cheddar cremoso e maionese verde.", 
    badge: "Artesanal",
    image: "/hero-pizza.webp" 
  },
  { 
    id: 10, 
    name: "Borda Recheada de Catupiry", 
    category: "Bordas Recheadas", 
    price: 12.00, 
    sales: 52, 
    active: true, 
    availabilityType: "always",
    availableDays: ["seg", "ter", "qua", "qui", "sex", "sab", "dom"],
    availableHours: { start: "18:00", end: "23:59" },
    channels: ["site", "presencial", "ifood", "99food"],
    ingredients: ["Legítimo Catupiry original cremoso"],
    description: "Borda generosa recheada com legítimo Catupiry.", 
    badge: "",
    image: "/hero-pizza.webp" 
  },
  { 
    id: 11, 
    name: "Coca-Cola 2 Litros Gelada", 
    category: "Bebidas & Refrigerantes", 
    price: 14.00, 
    sales: 64, 
    active: true, 
    availabilityType: "always",
    availableDays: ["seg", "ter", "qua", "qui", "sex", "sab", "dom"],
    availableHours: { start: "18:00", end: "23:59" },
    channels: ["site", "presencial", "ifood", "99food"],
    ingredients: ["Garrafa 2 Litros original Coca-Cola trincando de gelada"],
    description: "Garrafa 2 Litros trincando de gelada.", 
    badge: "Gelada",
    image: "/combo-calabresa-guarana.webp" 
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
window.JucaPanel = {
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
