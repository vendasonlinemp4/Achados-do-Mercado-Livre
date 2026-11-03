/* ============================================================
   ACHADOS DO MERCADO LIVRE — Catálogo de produtos
   ------------------------------------------------------------
   COMO ADICIONAR UM NOVO PRODUTO:
   copie um bloco { ... } abaixo, cole antes do "];" e preencha:

     nome        -> nome do produto (aparece em destaque)
     descricao   -> detalhes curtos (tela, material, medida...)
     categoria   -> "cordas" ou "notebooks" (ou crie uma nova abaixo)
     marca       -> fabricante (aparece como etiqueta)
     imagem      -> link direto da imagem
     preco       -> preço em número, ex: 19.40  (use ponto, sem milhar)
     precoDe     -> preço original/riscado (opcional)
     condicao    -> "no Pix" | "à vista" | vazio
     extra       -> linha secundária, ex: "ou 10x de R$ 359,90 sem juros"
     selo        -> "Mais vendido" | "Melhor preço" | "Novidade" | null
     link        -> seu link de afiliado (meli.la/...)
     destaque    -> true para aparecer maior no topo (opcional)
   ============================================================ */

const CATEGORIAS = [
  { id: "todos", nome: "Todos os achados" },
  { id: "cordas", nome: "Cordas & Encordoamentos" },
  { id: "notebooks", nome: "Notebooks" }
];

const PRODUTOS = [
  /* ---------------- CORDAS & ENCORDOAMENTOS ---------------- */
  {
    id: "giannini-canario-genw-5921",
    nome: "Giannini Canário GENW 5921",
    descricao: "Encordoamento de nylon para violão, 6 cordas com bolinha. Timbre macio, afinação estável e o melhor custo-benefício da seleção.",
    categoria: "cordas",
    marca: "Giannini",
    imagem: "https://http2.mlstatic.com/D_Q_NP_2X_692954-MLA99597610822_122025-V.webp",
    preco: 19.4,
    precoDe: 25.74,
    condicao: "no Pix",
    extra: "ou R$ 21,09 em outros meios",
    selo: "Mais vendido",
    link: "https://meli.la/1be3eHi",
    destaque: false
  },
  {
    id: "giannini-classico-tensao-media",
    nome: "Giannini Clássico Tensão Média",
    descricao: "Jogo de nylon tensão média para violão clássico. Equilíbrio entre conforto na mão esquerda e projeção de som no palco.",
    categoria: "cordas",
    marca: "Giannini",
    imagem: "https://http2.mlstatic.com/D_Q_NP_2X_846485-MLA99781580808_122025-V.webp",
    preco: 42.07,
    precoDe: 59,
    condicao: "no Pix",
    extra: "6 cordas · tensão média",
    selo: null,
    link: "https://meli.la/2NoLGmo"
  },
  {
    id: "strinberg-ws10",
    nome: "Strinberg WS10 Bronze",
    descricao: "Encordoamento de aço extra light .010 para violão folk. Bronze com brilho definido e resposta rápida em dedilhados.",
    categoria: "cordas",
    marca: "Strinberg",
    imagem: "https://http2.mlstatic.com/D_Q_NP_2X_990050-MLA100074862325_122025-V.webp",
    preco: 27.7,
    precoDe: null,
    condicao: "",
    extra: "Aço · Bronze · .010",
    selo: null,
    link: "https://meli.la/1hWUqMY"
  },
  {
    id: "ernie-ball-earthwood-2006",
    nome: "Ernie Ball Earthwood 2006",
    descricao: "Aço 80/20 bronze, extra light .010–.050. O clássico da Ernie Ball para violão acústico: timbre aberto e durabilidade.",
    categoria: "cordas",
    marca: "Ernie Ball",
    imagem: "https://http2.mlstatic.com/D_Q_NP_2X_975914-MLA99498367284_112025-V.webp",
    preco: 48.66,
    precoDe: 52.81,
    condicao: "no Pix",
    extra: "80/20 Bronze · .010–.050",
    selo: null,
    link: "https://meli.la/1UgbsLG"
  },
  {
    id: "sg-niquel-011-049",
    nome: "SG Níquel para Guitarra",
    descricao: "Encordoamento de níquel tensão média .011–.049 para guitarra elétrica. Ataque firme e sustain consistente.",
    categoria: "cordas",
    marca: "SG",
    imagem: "https://http2.mlstatic.com/D_Q_NP_2X_737246-MLA98088676098_112025-V.webp",
    preco: 25.72,
    precoDe: 30.36,
    condicao: "no Pix",
    extra: "Nickel Wound · .011–.049",
    selo: null,
    link: "https://meli.la/27Uts7y"
  },

  /* ------------------------ NOTEBOOKS ------------------------ */
  {
    id: "positivo-vision-c15m",
    nome: "Positivo Vision C15M",
    descricao: "Tela 15,6\" Full HD, Intel Celeron, 8 GB de RAM e 256 GB SSD. O notebook de entrada com o melhor preço da curadoria.",
    categoria: "notebooks",
    marca: "Positivo",
    imagem: "https://http2.mlstatic.com/D_Q_NP_2X_904445-MLA109214668076_042026-V.webp",
    preco: 2184,
    precoDe: 4299,
    condicao: "no Pix",
    extra: "ou R$ 2.299 em outros meios",
    selo: "Melhor preço",
    link: "https://meli.la/29T2c2i"
  },
  {
    id: "vaio-fe16",
    nome: "VAIO FE16",
    descricao: "Tela 16\" IPS Full HD antirreflexo, AMD Ryzen 3 7330U, 8 GB e 256 GB SSD. Construção premium com upgrade de RAM e SSD.",
    categoria: "notebooks",
    marca: "VAIO",
    imagem: "https://http2.mlstatic.com/D_Q_NP_2X_704811-MLA118636981993_102026-V.webp",
    preco: 3419,
    precoDe: 5999,
    condicao: "no Pix",
    extra: "ou 10x de R$ 359,90 sem juros",
    selo: "Curadoria",
    link: "https://meli.la/2hn29M3"
  },
  {
    id: "asus-vivobook-go-e1504ga",
    nome: "ASUS VivoBook Go 15",
    descricao: "Tela 15,6\" Full HD, Intel Core i3 N305, 4 GB e 256 GB SSD. Leve, prateado e feito para o dia a dia.",
    categoria: "notebooks",
    marca: "ASUS",
    imagem: "https://http2.mlstatic.com/D_Q_NP_2X_717894-MLA100005232963_122025-V.webp",
    preco: 2575,
    precoDe: 2999,
    condicao: "no Pix",
    extra: "ou 10x de R$ 279,90 sem juros",
    selo: null,
    link: "https://meli.la/2gnZyC1"
  },
  {
    id: "acer-aspire-5-r043",
    nome: "Acer Aspire 5",
    descricao: "Tela 15,6\" Full HD, AMD Ryzen 5 5500U, 16 GB de RAM e 512 GB SSD. Potência de sobra para estudo, trabalho e criação.",
    categoria: "notebooks",
    marca: "Acer",
    imagem: "https://http2.mlstatic.com/D_Q_NP_2X_872069-MLA96255973058_102025-V.webp",
    preco: 3989,
    precoDe: 5799,
    condicao: "no Pix",
    extra: "ou 6x de R$ 700 sem juros",
    selo: "Mais vendido",
    link: "https://meli.la/2Y6WyVs"
  },
  {
    id: "acer-aspire-go-15-touch",
    nome: "Acer Aspire Go 15 Touch",
    descricao: "Tela 15,6\" Full HD touchscreen IPS, Intel Core i7 de 13ª geração, 16 GB DDR5 e 512 GB SSD. O topo da seleção.",
    categoria: "notebooks",
    marca: "Acer",
    imagem: "https://http2.mlstatic.com/D_Q_NP_2X_707936-MLA116704651852_092026-V.webp",
    preco: 5299,
    precoDe: 8786,
    condicao: "",
    extra: "ou 10x de R$ 529,90 sem juros",
    selo: "Top da seleção",
    link: "https://meli.la/2BmXfPd"
  }
];

/* Configurações gerais do site */
const SITE = {
  nome: "Achados do Mercado Livre",
  cidade: "Brasil",
  instagram: "", // ex.: "https://instagram.com/seuperfil" — o botão só aparece se preenchido
  atualizadoEm: "03/11/2026"
};

window.CATEGORIAS = CATEGORIAS;
window.PRODUTOS = PRODUTOS;
window.SITE = SITE;
