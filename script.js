// ==========================================
// ESTADO GLOBAL E BANCO DE DADOS (112 ITENS)
// ==========================================
let descontoAtivo = false;
let promoTimerInterval;

const products = [
    // --- SMARTPHONES (SAMSUNG, XIAOMI E REALME ORIGINAIS) ---
    { id: 1, name: "Samsung Galaxy A06 - 128GB", cat: "Smartphone", price: 899, img: "img/a06.webp", type: 'pop', rating: 4.5, reviews: 124, specs: "Tela 6.7', 4GB RAM, Bateria 5000mAh, Câmera Dual 50MP." },
    { id: 2, name: "Samsung Galaxy M14 5G", cat: "Smartphone", price: 1100, img: "img/m14.JPG", type: 'pop', rating: 4.7, reviews: 89, specs: "Tela 6.6' 90Hz, Processador Exynos 1330 5G, 128GB, Bateria gigante de 6000mAh." },
    { id: 3, name: "Samsung Galaxy A15 4G", cat: "Smartphone", price: 950, img: "img/a15.webp", type: 'pop', rating: 4.6, reviews: 210, specs: "Tela Super AMOLED, Processador Helio G99, 128GB, Câmera Tripla de 50MP." },
    { id: 4, name: "Samsung Galaxy A16 5G", cat: "Smartphone", price: 1599, img: "img/a16.webp", type: 'premium', rating: 4.8, reviews: 45, specs: "Conexão 5G Ultra, Tela 6.7' FHD+, 6GB RAM, Design moderno e fino." },
    { id: 5, name: "Samsung Galaxy A25 5G", cat: "Smartphone", price: 1899, img: "img/a25.webp", type: 'premium', rating: 4.9, reviews: 132, specs: "Tela Vision Booster 120Hz, Exynos 1280, 8GB RAM, Estabilização Óptica (OIS)." },
    { id: 6, name: "Samsung Galaxy A36", cat: "Smartphone", price: 2199, img: "img/a36.webp", type: 'premium', rating: 4.7, reviews: 28, specs: "Nova geração, Processador Octa-Core, Tela AMOLED Dinâmica, Som Stereo Dolby Atmos." },
    { id: 7, name: "Samsung Galaxy A56 Ultra", cat: "Smartphone", price: 2899, img: "img/a56.webp", type: 'premium', rating: 5.0, reviews: 315, specs: "Câmera de Nível Profissional, IA Integrada, Resistência IP67 contra água e poeira." },
    { id: 8, name: "Xiaomi Redmi Note 13", cat: "Smartphone", price: 1299, img: "img/redminote13.webp", type: 'pop', rating: 4.8, reviews: 540, specs: "Tela AMOLED 120Hz, Câmera de 108MP, Snapdragon 685, Carregamento Rápido 33W." },
    { id: 9, name: "Realme C67", cat: "Smartphone", price: 1050, img: "img/realmec67.jpg", type: 'pop', rating: 4.6, reviews: 112, specs: "Câmera de 108MP, Snapdragon 685, 8GB RAM + 8GB Virtual, Som Dual Stereo." },

    // --- PÁSCOA (OVOS ORIGINAIS) ---
    { id: 10, name: "Ovo de Páscoa Cacau Show 500g", cat: "Pascoa", price: 119.90, img: "img/cacaushow.webp", type: 'pop', rating: 4.9, reviews: 340, specs: "Ovo de chocolate ao leite com trufas sortidas no interior." },
    { id: 11, name: "Ovo Kinder Bueno Gigante 350g", cat: "Pascoa", price: 89.90, img: "img/kinder.jpeg", type: 'pop', rating: 4.8, reviews: 890, specs: "Ovo de Páscoa Kinder com surpresa especial e casca de avelã." },
    { id: 12, name: "Kit Páscoa Premium Ferrero", cat: "Pascoa", price: 159.00, img: "img/kitferrero.webp", type: 'premium', rating: 5.0, reviews: 215, specs: "4 Barras de Ferro Para Você aproveitar." },

    // --- SMARTPHONES (APPLE - IPHONES) ---
    { id: 13, name: "iPhone 11 - 64GB Preto", cat: "Smartphone", price: 2499, img: "img/iphone11.png", type: 'pop', rating: 4.8, reviews: 2150, specs: "O clássico custo-benefício. Câmera dupla 12MP, Chip A13 Bionic e Face ID." },
    { id: 14, name: "iPhone 13 - 128GB Meia-Noite", cat: "Smartphone", price: 3899, img: "img/iphone13.jpg", type: 'premium', rating: 4.9, reviews: 4500, specs: "Tela Super Retina XDR 6.1', Modo Cinematográfico e Bateria duradoura." },
    { id: 15, name: "iPhone 14 - 128GB Estelar", cat: "Smartphone", price: 4499, img: "img/iphone14.webp", type: 'premium', rating: 4.9, reviews: 1800, specs: "Câmera frontal aprimorada, detecção de acidente e Chip A15 Bionic." },
    { id: 16, name: "iPhone 15 - 128GB Rosa", cat: "Smartphone", price: 5499, img: "img/iphone15.jpg", type: 'premium', rating: 5.0, reviews: 950, specs: "Dynamic Island, Câmera 48MP, USB-C e Design em vidro colorido na massa." },
    { id: 17, name: "iPhone 15 Pro Max - 256GB Titânio", cat: "Smartphone", price: 8999, img: "img/iphone15pro.webp", type: 'premium', rating: 5.0, reviews: 420, specs: "Construção em Titânio, Chip A17 Pro (Console games), Zoom Óptico 5x." },
    { id: 18, name: "iPhone 12 - 64GB Branco", cat: "Smartphone", price: 2999, img: "img/iphone12.webp", type: 'pop', rating: 4.7, reviews: 3100, specs: "5G, Tela OLED, Ceramic Shield e design com bordas planas." },

    // --- SMARTPHONES (MOTOROLA & MAIS XIAOMI) ---
    { id: 19, name: "Motorola Moto G04 - 128GB", cat: "Smartphone", price: 699, img: "img/motog04.jpg", type: 'pop', rating: 4.4, reviews: 680, specs: "Celular barato e bonito. Tela 90Hz, 4GB RAM e cores vibrantes." },
    { id: 20, name: "Motorola Moto G54 5G - 256GB", cat: "Smartphone", price: 1199, img: "img/motog54.webp", type: 'pop', rating: 4.7, reviews: 1250, specs: "Muito espaço: 256GB, 8GB RAM, Câmera 50MP com OIS e Som Dolby Atmos." },
    //{ id: 21, name: "Motorola Moto G84 5G - 256GB", cat: "Smartphone", price: 1699, img: "img/motog84.webp", type: 'premium', rating: 4.8, reviews: 890, specs: "Tela pOLED de cinema, Design em Vegan Leather (couro) e Câmera Ultra-Pixel." },
    //{ id: 22, name: "Motorola Edge 40 Neo 5G", cat: "Smartphone", price: 2199, img: "img/edge40.webp", type: 'premium', rating: 4.8, reviews: 430, specs: "À prova d'água (IP68), Tela curva 144Hz e Carregador Turbo 68W na caixa." },
    { id: 23, name: "Poco X6 Pro 5G - 256GB", cat: "Smartphone", price: 2399, img: "img/pocox6.webp", type: 'premium', rating: 4.9, reviews: 1560, specs: "Monstro dos jogos! Processador MediaTek Dimensity 8300-Ultra e Tela AMOLED 1.5K." },
    { id: 24, name: "Xiaomi Redmi Note 13 Pro 5G", cat: "Smartphone", price: 1999, img: "img/note13pro.webp", type: 'premium', rating: 4.8, reviews: 880, specs: "Câmera impressionante de 200MP, Carregamento 67W e Tela 120Hz." },
    { id: 25, name: "Samsung Galaxy S23 FE 5G", cat: "Smartphone", price: 2799, img: "img/s23fe.png", type: 'premium', rating: 4.8, reviews: 1100, specs: "Experiência de topo de linha. Galaxy AI, Câmera Nightography e Resistência à água." },
    { id: 26, name: "Samsung Galaxy S24 Ultra", cat: "Smartphone", price: 7999, img: "img/s24ultra.webp", type: 'premium', rating: 5.0, reviews: 340, specs: "O melhor Android do mercado. S-Pen embutida, Titânio, Inteligência Artificial pura." },

    // --- TVs (O QUE O BRASILEIRO AMA) ---
    { id: 27, name: "Smart TV 32\" AOC Roku TV", cat: "TV", price: 999, img: "img/aocroku.png", type: 'pop', rating: 4.6, reviews: 3400, specs: "Ideal para quarto. Sistema Roku super rápido, Netflix, YouTube e Globoplay." },
    { id: 28, name: "Smart TV 43\" Samsung Crystal 4K", cat: "TV", price: 1799, img: "img/4kcristal.webp", type: 'pop', rating: 4.8, reviews: 4500, specs: "Imagem Crystal UHD, Design sem bordas, Alexa built-in e Samsung TV Plus grátis." },
    //{ id: 29, name: "Smart TV 50\" LG ThinQ AI 4K", cat: "TV", price: 2199, img: "img/lgsmart.webp", type: 'premium', rating: 4.8, reviews: 3800, specs: "Inteligência Artificial, Controle Smart Magic, HDR10 Pro e Modo Game Otimizado." },
    //{ id: 30, name: "Smart TV 55\" TCL QLED 4K", cat: "TV", price: 2499, img: "img/tcl50.webp", type: 'premium', rating: 4.7, reviews: 1200, specs: "Cores vivas com tecnologia QLED, Google TV, Comando de voz Hands-Free e Dolby Vision." },
    { id: 31, name: "Smart TV 65\" Samsung QLED 4K", cat: "TV", price: 3999, img: "img/tv65qled.jpeg", type: 'premium', rating: 4.9, reviews: 850, specs: "Cinema em casa! Processador Quantum, Som em Movimento e Modo Arte." },
    { id: 32, name: "Smart TV 43\" Philco Roku TV", cat: "TV", price: 1399, img: "img/philcoroku.jpg", type: 'pop', rating: 4.5, reviews: 900, specs: "Full HD, Sistema ROKU fluido e espelhamento de tela fácil." },
    { id: 33, name: "Smart TV 32\" LG ThinQ AI HD", cat: "TV", price: 1099, img: "img/lgsmart.webp", type: 'pop', rating: 4.7, reviews: 2100, specs: "Bluetooth de áudio, WebOS intuitivo e ótima durabilidade." },
    { id: 34, name: "Smart TV 70\" LG 4K UHD", cat: "TV", price: 4599, img: "img/tv70lg.png", type: 'premium', rating: 4.9, reviews: 410, specs: "Tamanho gigante! Processador a5 Gen6, Alerta de Esportes e Filmmaker Mode." },
    { id: 35, name: "Smart TV 50\" TCL 4K UHD", cat: "TV", price: 1899, img: "img/tcl50.webp", type: 'pop', rating: 4.6, reviews: 1450, specs: "Bordas finíssimas, Google Assistente e Micro Dimming para melhor contraste." },
    { id: 36, name: "Smart Monitor Samsung 27\"", cat: "TV", price: 1199, img: "img/monitorsamsung.webp", type: 'pop', rating: 4.7, reviews: 560, specs: "É monitor e TV! Tem Tizen, Netflix, pacote Office sem precisar de PC." },

    // --- MAIS PÁSCOA ---
    { id: 37, name: "Ovo Lacta Diamante Negro 277g", cat: "Pascoa", price: 54.90, img: "img/diamantenegro.webp", type: 'pop', rating: 4.8, reviews: 3120, specs: "O clássico chocolate com cristais crocantes de açúcar e castanha." },
    { id: 38, name: "Ovo Nestlé Alpino 337g", cat: "Pascoa", price: 69.90, img: "img/alpino.webp", type: 'pop', rating: 4.9, reviews: 2800, specs: "Sabor inconfundível dos Alpes Suíços. Acompanha bombons Alpino." },
    { id: 39, name: "Ovo Garoto Baton Ao Leite 172g", cat: "Pascoa", price: 39.90, img: "img/baton.png", type: 'pop', rating: 4.7, reviews: 1540, specs: "O favorito das crianças. Chocolate ao leite derrete na boca." },
    { id: 40, name: "Ovo KitKat Nestlé 332g", cat: "Pascoa", price: 64.90, img: "img/kitkat.webp", type: 'pop', rating: 4.8, reviews: 2400, specs: "Casca com pedaços crocantes de wafer KitKat. Irresistível!" },
    { id: 41, name: "Ovo Lacta Sonho de Valsa 277g", cat: "Pascoa", price: 54.90, img: "img/sonhodevalsa.png", type: 'pop', rating: 4.8, reviews: 3500, specs: "Casca de chocolate ao leite e bombons Sonho de Valsa originais dentro." },
    { id: 42, name: "Ovo Bis Ao Leite Lacta 318g", cat: "Pascoa", price: 59.90, img: "img/bis.webp", type: 'pop', rating: 4.7, reviews: 1900, specs: "Muito mais Bis! Casca com textura exclusiva de pedaços de Bis." },
    { id: 43, name: "Ovo Talento Avelã Garoto 350g", cat: "Pascoa", price: 68.90, img: "img/talento.png", type: 'pop', rating: 4.9, reviews: 1200, specs: "Chocolate com textura cremosa e pedaços de avelã na casca." },
    { id: 44, name: "Ovo Caribe Garoto 215g (RARO)", cat: "Pascoa", price: 89.90, img: "img/caribe.jpeg", type: 'premium', rating: 5.0, reviews: 850, specs: "Edição Limitada! O amado ovo de banana com cobertura de chocolate." },
    { id: 45, name: "Caixa de Bombom Garoto (Amarela)", cat: "Pascoa", price: 14.99, img: "img/caixagaroto.webp", type: 'pop', rating: 4.8, reviews: 9000, specs: "A tradicional caixa amarela. Ideal para presentear e economizar." },
    { id: 46, name: "Caixa de Bombom Nestlé Especialidades", cat: "Pascoa", price: 15.99, img: "img/caixanestle.jpg", type: 'pop', rating: 4.8, reviews: 8500, specs: "Prestígio, Sensação, Alpino... todos os clássicos reunidos." },
    { id: 47, name: "Ovo Lindt Lindor Ao Leite 260g", cat: "Pascoa", price: 189.90, img: "img/lindt.webp", type: 'premium', rating: 5.0, reviews: 420, specs: "Sofisticação Suíça. Casca macia que derrete na boca e trufas Lindor." },
    //{ id: 48, name: "Ovo Cacau Show LaCreme 360g", cat: "Pascoa", price: 89.90, img: "img/lacreme.webp", type: 'premium', rating: 4.9, reviews: 2100, specs: "Mais leite, mais cremosidade. O ovo mais macio da Cacau Show." },

    // --- ELETRODOMÉSTICOS & ELETROPORTÁTEIS (CASA DOS BRASILEIROS) ---
    { id: 49, name: "Air Fryer Mondial Family 4 Litros", cat: "Eletrodomésticos", price: 299.90, img: "img/airfryermondial.webp", type: 'pop', rating: 4.8, reviews: 15000, specs: "Cesto antiaderente quadrado, 1500W de potência. A queridinha do Brasil!" },
    //{ id: 50, name: "Air Fryer Philco Oven 12 Litros", cat: "Eletrodomésticos", price: 699.90, img: "img/airfryerphilco.webp", type: 'premium', rating: 4.7, reviews: 3200, specs: "Frita sem óleo e assa. Formato de forno com grelhas e espeto rotativo." },
    { id: 51, name: "Ventilador Arno Xtreme Force 40cm", cat: "Eletrodomésticos", price: 219.90, img: "img/arno.webp", type: 'pop', rating: 4.8, reviews: 8400, specs: "Super potente e silencioso. 6 pás e repelente líquido integrado." },
    { id: 52, name: "Ventilador Mondial Turbo 40cm", cat: "Eletrodomésticos", price: 149.90, img: "img/ventiladormondial.webp", type: 'pop', rating: 4.6, reviews: 12000, specs: "O melhor custo-benefício contra o calor. Vento forte e fácil de limpar." },
    //{ id: 53, name: "Máquina de Café Dolce Gusto Genio S", cat: "Eletrodomésticos", price: 429.90, img: "img/dolcegusto.webp", type: 'premium', rating: 4.8, reviews: 4100, specs: "Cafés espressos, capuccinos e chás. Painel touch e design compacto." },
    { id: 54, name: "Cafeteira Três Corações Lov", cat: "Eletrodomésticos", price: 349.90, img: "img/trescoracoes.png", type: 'pop', rating: 4.7, reviews: 3800, specs: "Prepara cafés filtrados, expressos e bebidas cremosas. Fácil de usar." },
    { id: 55, name: "Liquidificador Britânia Diamante", cat: "Eletrodomésticos", price: 119.90, img: "img/liquidificador.webp", type: 'pop', rating: 4.5, reviews: 5600, specs: "Copo de acrílico resistente de 2.6L, filtro para suco e 900W de potência." },
    //{ id: 56, name: "Liquidificador Osterizer Clássico Aço", cat: "Eletrodomésticos", price: 329.90, img: "img/oster.webp", type: 'premium', rating: 4.9, reviews: 2900, specs: "Copo de vidro que não pega cheiro, motor super potente e peças de metal." },
    { id: 57, name: "Panela de Pressão Elétrica Mondial", cat: "Eletrodomésticos", price: 359.90, img: "img/panelapressao.jpg", type: 'pop', rating: 4.8, reviews: 3100, specs: "Totalmente segura, silenciosa, não solta vapor durante o cozimento." },
    { id: 58, name: "Panela de Arroz Britânia 10 Xícaras", cat: "Eletrodomésticos", price: 189.90, img: "img/panelaarroz.webp", type: 'pop', rating: 4.7, reviews: 4200, specs: "Acompanha bandeja para cozinhar legumes no vapor simultaneamente." },
    { id: 59, name: "Aspirador de Pó Vertical Philco 1250W", cat: "Eletrodomésticos", price: 179.90, img: "img/aspirador.webp", type: 'pop', rating: 4.6, reviews: 7500, specs: "Vassoura elétrica. Prático para limpar a casa e tapetes sem cansar as costas." },
    { id: 60, name: "Aspirador Robô WAP Robot W100", cat: "Eletrodomésticos", price: 499.90, img: "img/wap.jpg", type: 'pop', rating: 4.4, reviews: 2800, specs: "Varre, aspira e passa pano. Deixa ele limpando a sala enquanto você descansa." },
    //{ id: 61, name: "Aspirador Robô Xiaomi Robot Vacuum", cat: "Eletrodomésticos", price: 1899.00, img: "img/xiaomivacuum.webp", type: 'premium', rating: 4.9, reviews: 1100, specs: "Mapeamento a laser (LDS), controla pelo celular e volta pra base sozinho." },
    { id: 62, name: "Ferro de Passar a Vapor Black+Decker", cat: "Eletrodomésticos", price: 99.90, img: "img/ferro.jpg", type: 'pop', rating: 4.8, reviews: 9200, specs: "Base com revestimento antiaderente que desliza fácil na roupa." },
    { id: 63, name: "Micro-ondas Electrolux 20L", cat: "Eletrodomésticos", price: 599.90, img: "img/microondas.webp", type: 'pop', rating: 4.7, reviews: 6500, specs: "Tira o odor interno fácil, menu dia a dia e descongelamento rápido." },

    // --- ACESSÓRIOS & ÁUDIO (CAIXAS JBL, FONES, ETC) ---
    { id: 64, name: "Caixa de Som JBL Go 3", cat: "Acessórios", price: 259.90, img: "img/jblgo3.jpg", type: 'pop', rating: 4.8, reviews: 11000, specs: "Pequena, som potente e com graves. Totalmente à prova d'água (IP67)." },
    //{ id: 65, name: "Caixa de Som JBL Flip 6", cat: "Acessórios", price: 699.90, img: "img/jblflip6.webp", type: 'premium', rating: 4.9, reviews: 4500, specs: "Som alto e claro, bateria para 12 horas e permite conectar várias JBLs juntas." },
    //{ id: 66, name: "Caixa de Som JBL Boombox 3", cat: "Acessórios", price: 2499.00, img: "img/jblboombox.webp", type: 'premium', rating: 5.0, reviews: 1800, specs: "A rainha da festa! Grave monstruoso, bateria de 24h e alça de metal." },
    { id: 67, name: "Fone de Ouvido Apple AirPods (2ª Geração)", cat: "Acessórios", price: 999.00, img: "img/airpods2.webp", type: 'premium', rating: 4.8, reviews: 8900, specs: "Configuração mágica no iPhone, áudio de alta qualidade e bateria longa." },
    { id: 68, name: "Fone Bluetooth Samsung Galaxy Buds FE", cat: "Acessórios", price: 399.90, img: "img/budsfe.webp", type: 'pop', rating: 4.7, reviews: 3100, specs: "Cancelamento de Ruído Ativo (ANC) absurdo por um preço acessível." },
    { id: 69, name: "Fone de Ouvido Xiaomi Redmi Buds 4 Active", cat: "Acessórios", price: 129.90, img: "img/redmibuds.webp", type: 'pop', rating: 4.6, reviews: 5400, specs: "Bateria para 28h (com estojo), graves potentes e conexão rápida Bluetooth 5.3." },
    { id: 70, name: "Headset Gamer Havit H2002d", cat: "Acessórios", price: 169.90, img: "img/havit.webp", type: 'pop', rating: 4.8, reviews: 4200, specs: "Um dos melhores do mercado pelo preço. Som limpo, microfone destacável." },
    { id: 71, name: "Carregador Turbo iPhone 20W Baseus", cat: "Acessórios", price: 89.90, img: "img/baseus20w.jpg", type: 'pop', rating: 4.8, reviews: 2900, specs: "Carrega 50% em 30 minutos. Homologado e não vicia a bateria." },
    { id: 72, name: "Cabo USB-C para Lightning 1 Metro", cat: "Acessórios", price: 49.90, img: "img/caboiphone.jpeg", type: 'pop', rating: 4.5, reviews: 1200, specs: "Cabo trançado de nylon, resistente a dobras e puxões." },
    //{ id: 73, name: "Smartwatch Apple Watch SE (GPS, 40mm)", cat: "Acessórios", price: 1999.00, img: "img/applewatchse.webp", type: 'premium', rating: 4.9, reviews: 3400, specs: "Monitora exercícios, sono e coração. O relógio perfeito para quem tem iPhone." },
    { id: 74, name: "Smartband Xiaomi Mi Band 8", cat: "Acessórios", price: 259.90, img: "img/miband8.jpg", type: 'pop', rating: 4.8, reviews: 6700, specs: "Tela AMOLED 60Hz super fluida, bateria para 16 dias, resistente a água." },
    //{ id: 75, name: "Smartwatch Samsung Galaxy Watch 6", cat: "Acessórios", price: 1299.00, img: "img/watch6.webp", type: 'premium', rating: 4.8, reviews: 1500, specs: "Bordas mais finas, tela maior, mede até pressão arterial (em celulares Galaxy)." },
    //{ id: 76, name: "Película de Vidro 3D iPhone (Qualquer Modelo)", cat: "Acessórios", price: 29.90, img: "img/pelicula.webp", type: 'pop', rating: 4.5, reviews: 800, specs: "Proteção total de borda a borda contra quedas e arranhões." },
    //{ id: 77, name: "Kit Capinha Anti-impacto + Película", cat: "Acessórios", price: 49.90, img: "img/kitcapa.webp", type: 'pop', rating: 4.6, reviews: 1250, specs: "Case transparente com cantos reforçados (Airbag) para máxima proteção." },
    { id: 78, name: "Tripé Ring Light Para Celular 10 Polegadas", cat: "Acessórios", price: 79.90, img: "img/ringlight.webp", type: 'pop', rating: 4.4, reviews: 3100, specs: "Ideal para gravar TikToks, Reels ou maquiagem. 3 tons de luz de LED." },
    { id: 79, name: "Carregador Portátil Power Bank 10000mAh", cat: "Acessórios", price: 119.90, img: "img/powerbank.jpg", type: 'pop', rating: 4.7, reviews: 4500, specs: "Garante até 3 recargas completas no celular. Leve para qualquer viagem." },
    { id: 80, name: "Suporte de Celular Para Carro Saída de Ar", cat: "Acessórios", price: 39.90, img: "img/suportecarro.webp", type: 'pop', rating: 4.5, reviews: 2100, specs: "Presilha firme emborrachada, o celular não cai nem passando em buraco." },

    // --- INFORMÁTICA & PERIFÉRICOS ---
    //{ id: 81, name: "Notebook Samsung Galaxy Book2 (Core i5, 8GB)", cat: "Informática", price: 2899.00, img: "img/book2.webp", type: 'premium', rating: 4.7, reviews: 1400, specs: "SSD 256GB rápido, ideal para estudar, pacote Office e trabalho remoto." },
    { id: 82, name: "Notebook Dell Inspiron 15 (Core i3, 8GB)", cat: "Informática", price: 2499.00, img: "img/dellinspiron.jpg", type: 'pop', rating: 4.6, reviews: 2200, specs: "Windows 11 de fábrica, tela 15.6 Full HD antirreflexo e bateria durável." },
    //{ id: 83, name: "Notebook Gamer Acer Nitro 5 (GTX 1650)", cat: "Informática", price: 4299.00, img: "img/nitro5.webp", type: 'premium', rating: 4.8, reviews: 1100, specs: "Roda tudo! Teclado retroiluminado vermelho, Core i5 H, 512GB SSD." },
    //{ id: 84, name: "MacBook Air M1 13\" - 256GB Apple", cat: "Informática", price: 5499.00, img: "img/macbookm1.webp", type: 'premium', rating: 5.0, reviews: 3100, specs: "O melhor notebook do mundo em bateria e desempenho. Não esquenta." },
    { id: 85, name: "Mouse Sem Fio Logitech M170 Preto", cat: "Informática", price: 59.90, img: "img/m170.png", type: 'pop', rating: 4.8, reviews: 15000, specs: "Pilha dura até 1 ano, conexão via USB (adaptador) super estável." },
    { id: 86, name: "Mouse Gamer Redragon Cobra M711", cat: "Informática", price: 129.90, img: "img/redragoncobra.webp", type: 'pop', rating: 4.9, reviews: 8400, specs: "Luzes RGB, 10.000 DPI e cliques macios. O melhor custo-benefício gamer." },
    { id: 87, name: "Teclado Mecânico T-Dagger Corvette", cat: "Informática", price: 189.90, img: "img/tecladomecanico.jpg", type: 'pop', rating: 4.7, reviews: 2300, specs: "Formato compacto (TKL), switch azul barulhento e iluminação RGB." },
    { id: 88, name: "Combo Teclado e Mouse sem fio Dell", cat: "Informática", price: 169.90, img: "img/combodell.webp", type: 'pop', rating: 4.7, reviews: 3100, specs: "Design minimalista, teclas silenciosas, excelente para escritório." },
    //{ id: 89, name: "Monitor Gamer LG UltraGear 24\" 144Hz", cat: "Informática", price: 999.00, img: "img/monitorlg.webp", type: 'premium', rating: 4.8, reviews: 2600, specs: "Tela IPS, sem rastro na imagem (1ms), perfeito para CS:GO e Valorant." },
    { id: 90, name: "Monitor Samsung 24\" Full HD 75Hz", cat: "Informática", price: 649.90, img: "img/monitorsamsung24.webp", type: 'pop', rating: 4.7, reviews: 5100, specs: "Bordas ultrafinas, tecnologia FreeSync e painel IPS para cores reais." },
    //{ id: 91, name: "Impressora Multifuncional Epson EcoTank L3250", cat: "Informática", price: 1199.00, img: "img/ecotank.webp", type: 'premium', rating: 4.9, reviews: 6200, specs: "Imprime milhares de páginas com 1 refil. Tem Wi-Fi, imprime direto do celular." },
    { id: 92, name: "Impressora HP DeskJet Ink Advantage (Wi-Fi)", cat: "Informática", price: 399.90, img: "img/hpdeskjet.webp", type: 'pop', rating: 4.4, reviews: 4728, specs: "Ideal para trabalhos escolares. Compacta e cartuchos fáceis de achar." },
    //{ id: 93, name: "Webcam Full HD 1080p com Microfone", cat: "Informática", price: 119.90, img: "img/webcam.webp", type: 'pop', rating: 4.5, reviews: 1800, specs: "Ótima para reuniões no Zoom/Meet. Foco automático e imagem limpa." },

    // --- GAMES E CONSOLES ---
    { id: 94, name: "Console PlayStation 5 (PS5) c/ Leitor", cat: "Games", price: 3999.00, img: "img/ps5.webp", type: 'premium', rating: 5.0, reviews: 4500, specs: "SSD ultrarrápido, gráficos 4K e controle DualSense com gatilhos adaptáveis." },
    { id: 95, name: "Console Xbox Series S - 512GB", cat: "Games", price: 2199.00, img: "img/xboxs.jpg", type: 'premium', rating: 4.9, reviews: 5200, specs: "100% Digital. O passaporte perfeito para assinar o Game Pass." },
   // { id: 96, name: "Console Nintendo Switch (OLED)", cat: "Games", price: 2149.00, img: "img/switch.webp", type: 'premium', rating: 4.9, reviews: 271, specs: "Tela OLED vibrante, joga na TV ou modo portátil. Mario e Zelda rodam aqui!" },
    //{ id: 97, name: "Controle DualSense PS5 Branco Original", cat: "Games", price: 449.90, img: "img/dualsense.webp", type: 'premium', rating: 4.8, reviews: 474, specs: "Sensação tátil revolucionária. Serve no PC também." },
    //{ id: 98, name: "Controle Xbox Wireless Preto Original", cat: "Games", price: 429.90, img: "img/controlexbox.webp", type: 'premium', rating: 4.9, reviews: 271, specs: "Compatível com Xbox One, Series X|S, PC e Celular via Bluetooth." },
    //{ id: 99, name: "Cadeira Gamer ThunderX3 TGC12 Preta", cat: "Games", price: 999.00, img: "img/cadeiragamer.webp", type: 'premium', rating: 4.7, reviews: 2800, specs: "Couro sintético, reclina até 180 graus e acompanha almofadas cervical/lombar." },

    // --- SMART HOME (CASA INTELIGENTE & STREAMING) ---
    { id: 100, name: "Echo Dot 5ª Geração (Alexa)", cat: "Acessórios", price: 399.90, img: "img/echodot5.webp", type: 'pop', rating: 4.9, reviews: 427, specs: "O smart speaker de maior sucesso. Melhoria nos graves e som muito mais limpo." },
    { id: 101, name: "Fire TV Stick Lite Amazon", cat: "Acessórios", price: 269.90, img: "img/firetv.webp", type: 'pop', rating: 4.8, reviews: 2722, specs: "Transforme sua TV velha em Smart. Controle com Alexa por voz." },
    { id: 102, name: "Roku Express - Streaming Player", cat: "Acessórios", price: 249.90, img: "img/roku.jpg", type: 'pop', rating: 4.7, reviews: 7475, specs: "Interface super fácil de usar, acesso à Netflix, Disney+, Globoplay, etc." },
    { id: 103, name: "Lâmpada Inteligente Positivo Smart Wi-Fi", cat: "Acessórios", price: 59.90, img: "img/lampada.jpg", type: 'pop', rating: 4.6, reviews: 27, specs: "Mude a cor da luz (16 milhões de cores) pelo celular ou falando com a Alexa." },
    { id: 104, name: "Tomada Inteligente Smart Plug Wi-Fi", cat: "Acessórios", price: 79.90, img: "img/tomada.jpg", type: 'pop', rating: 4.7, reviews: 141, specs: "Ligue o ventilador ou a cafeteira por voz antes mesmo de levantar da cama!" },
    { id: 105, name: "Câmera de Segurança Wi-Fi Intelbras Mibo", cat: "Acessórios", price: 229.90, img: "img/camera.webp", type: 'pop', rating: 4.8, reviews: 14, specs: "Visão noturna, áudio bidirecional (dá pra falar por ela) e alerta no celular." },

    // --- MISCELÂNEA BRASILEIRA EXTRAS ---
    { id: 106, name: "Máquina de Cortar Cabelo Wahl Clipper", cat: "Eletrodomésticos", price: 129.90, img: "img/wahl.png", type: 'pop', rating: 4.6, reviews: 8100, specs: "Motor super potente e resistente. Acompanha os pentes guias essenciais." },
    { id: 107, name: "Aparador de Pelos Philips Multigroom", cat: "Eletrodomésticos", price: 169.90, img: "img/philipsgroom.webp", type: 'pop', rating: 4.8, reviews: 1728, specs: "Barba, cabelo e corpo. Bateria de longa duração e lâminas que não perdem o fio." },
    //{ id: 108, name: "Secador de Cabelo Taiff Tourmaline 2000W", cat: "Eletrodomésticos", price: 289.90, img: "img/taiff.webp", type: 'premium', rating: 4.9, reviews: 900, specs: "Potência de salão. Emissão de íons negativos que deixam o cabelo sem frizz." },
    //{ id: 109, name: "Chapinha Prancha Taiff Titanium 450", cat: "Eletrodomésticos", price: 219.90, img: "img/pranchataiff.webp", type: 'premium', rating: 4.8, reviews: 141, specs: "Alisa super rápido, atinge 200ºC constantes, cabo longo e giratório." },
    //{ id: 110, name: "Parafusadeira e Furadeira Makita 12V", cat: "Eletrodomésticos", price: 349.90, img: "img/makita.webp", type: 'premium', rating: 4.9, reviews: 3800, specs: "A ferramenta obrigatória em casa. Acompanha maleta, bit e bateria de lítio." },
    { id: 111, name: "Kit Chaves de Fenda 31 em 1 (Mini)", cat: "Acessórios", price: 19.90, img: "img/kitchaves.jpg", type: 'pop', rating: 4.5, reviews: 1500, specs: "Conserta celular, óculos, notebook. Estojo magnético baratinho e salva-vidas." },
    //{ id: 112, name: "Balança Digital de Cozinha 10kg", cat: "Eletrodomésticos", price: 29.90, img: "img/balanca.webp", type: 'pop', rating: 4.7, reviews: 8800, specs: "Ideal para pesar comida, fazer dieta ou medir ingredientes para receitas." }
];

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// ==========================================
// RENDERIZAÇÃO INTELIGENTE (VERIFICA O DESCONTO)
// ==========================================
function render(listaProdutos = products) {
    const gridPop = document.getElementById('grid-popular');
    const gridPre = document.getElementById('grid-premium');
    if (gridPop) gridPop.innerHTML = "";
    if (gridPre) gridPre.innerHTML = "";

    if (listaProdutos.length === 0) {
        if(gridPop) gridPop.innerHTML = "<p style='grid-column: 1/-1; text-align:center;'>Nenhum produto encontrado.</p>";
        return;
    }

    listaProdutos.forEach(p => {
        // Aplica o desconto de 40% apenas se a variável 'descontoAtivo' for verdadeira
        const precoAtual = descontoAtivo ? (p.price * 0.6) : p.price;
        const parcelas = (precoAtual / 12);
        const imgTag = p.img ? `<img src="${p.img}" onerror="this.style.display='none'">` : `<div style="height:150px; background:#f0f0f0; display:flex; align-items:center; justify-content:center; color:#ccc; border-radius:8px; margin-bottom:10px;"><i class="fas fa-image fa-3x"></i></div>`;

        // Se o desconto estiver ativo, mostra o preço original riscado. Se não, oculta para não sujar o visual.
        const tagPrecoAntigo = descontoAtivo ? `<span class="old-p">${formatarMoeda(p.price)}</span>` : `<span class="old-p" style="opacity: 0;">-</span>`;

        const html = `
            <div class="card">
                <div class="f-gratis"><i class="fas fa-truck"></i> FRETE GRÁTIS</div>
                <div class="img-box">${imgTag}</div>
                <div class="rating">
                    <i class="fas fa-star"></i> ${p.rating} <span>(${p.reviews})</span>
                </div>
                <h3 class="p-title">${p.name}</h3>
                ${tagPrecoAntigo}
                <span class="new-p" style="color: ${descontoAtivo ? 'var(--green)' : 'var(--primary)'}">${formatarMoeda(precoAtual)}</span>
                <p class="parc">12x de ${formatarMoeda(parcelas)} sem juros</p>
                <div class="card-buttons" style="display: flex; gap: 8px; margin-top: auto;">
                    <button class="btn-details" onclick="showSpecs(${p.id})">DETALHES</button>
                    <button class="btn-buy" onclick="addCart(${p.id})">ADICIONAR</button>
                </div>
            </div>
        `;
        if(p.type === 'pop' && gridPop) gridPop.innerHTML += html;
        else if(gridPre) gridPre.innerHTML += html;
    });
}

// ==========================================
// SISTEMA DE OFERTA TEMPORIZADA (20 SEGUNDOS)
// ==========================================
setTimeout(() => {
    if (!descontoAtivo) {
        const modalPromo = document.getElementById('modal-promo');
        if(modalPromo) {
            modalPromo.style.display = 'block';
            iniciarBarraDeTempo();
        }
    }
}, 20000);

function iniciarBarraDeTempo() {
    let tempoRestante = 15; // 15 segundos para decidir
    const totalTempo = 15;
    const barra = document.getElementById('promo-progress');

    promoTimerInterval = setInterval(() => {
        tempoRestante--;
        if(barra) barra.style.width = ((tempoRestante / totalTempo) * 100) + '%';

        if (tempoRestante <= 0) {
            clearInterval(promoTimerInterval);
            recusarDesconto(); // Auto-recusa se o tempo acabar
        }
    }, 1000);
}

function aceitarDesconto() {
    descontoAtivo = true;
    clearInterval(promoTimerInterval);
    document.getElementById('modal-promo').style.display = 'none';

    // Atualiza os itens que já estavam no carrinho antes do desconto
    let cart = JSON.parse(localStorage.getItem('eletroShopCart')) || [];
    cart = cart.map(item => {
        const produtoOriginal = products.find(p => p.id === item.id);
        return { ...item, price: produtoOriginal.price * 0.6 };
    });
    localStorage.setItem('eletroShopCart', JSON.stringify(cart));

    // Refaz a tela inteira com os novos preços
    render();
    atualizarCarrinhoLateral();
    showToast("🎉 Oferta ativada! Aproveite seus 40% OFF.");
}

function recusarDesconto() {
    clearInterval(promoTimerInterval);
    const modalPromo = document.getElementById('modal-promo');
    if(modalPromo) modalPromo.style.display = 'none';
    // O site continua rodando normalmente com os preços cheios
}

// ==========================================
// BUSCA E FILTROS
// ==========================================
function buscarProduto() {
    const termo = document.getElementById('mainSearch').value.toLowerCase();
    const filtrados = products.filter(p => p.name.toLowerCase().includes(termo));
    render(filtrados);
}

function filter(cat) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    if (event) event.target.classList.add('active');

    if(cat === 'todos') {
        render(products);
    } else {
        const filtrados = products.filter(p => p.cat === cat);
        render(filtrados);
    }
}

// ==========================================
// LÓGICA DO CARRINHO
// ==========================================
function addCart(id) {
    const p = products.find(prod => prod.id === id);
    const precoMomento = descontoAtivo ? (p.price * 0.6) : p.price;

    let cart = JSON.parse(localStorage.getItem('eletroShopCart')) || [];
    cart.push({ id: p.id, name: p.name, price: precoMomento, img: p.img });
    localStorage.setItem('eletroShopCart', JSON.stringify(cart));

    updateCartCount();
    atualizarCarrinhoLateral();
    abrirCarrinhoLateral();
    showToast(`<strong>${p.name}</strong> adicionado ao carrinho!`);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('eletroShopCart')) || [];
    const countEl = document.getElementById('cart-count');
    if (countEl) countEl.innerText = cart.length;
}

function abrirCarrinhoLateral() {
    document.getElementById('cart-sidebar').classList.add('open');
    document.getElementById('cart-overlay').style.display = 'block';
    atualizarCarrinhoLateral();
}

function fecharCarrinhoLateral() {
    document.getElementById('cart-sidebar').classList.remove('open');
    document.getElementById('cart-overlay').style.display = 'none';
}

function atualizarCarrinhoLateral() {
    const cart = JSON.parse(localStorage.getItem('eletroShopCart')) || [];
    const container = document.getElementById('sidebar-items');
    const totalEl = document.getElementById('sidebar-total');
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = "<p style='text-align:center; color:#888; margin-top:50px'>Seu carrinho está vazio.</p>";
        totalEl.innerText = formatarMoeda(0);
        return;
    }

    container.innerHTML = "";
    cart.forEach((item, index) => {
        total += item.price;
        const img = item.img ? `<img src="${item.img}">` : `<div style="width:50px; height:50px; background:#eee; border-radius:5px"></div>`;

        container.innerHTML += `
            <div class="sidebar-item">
                ${img}
                <div class="sidebar-item-info">
                    <h4>${item.name}</h4>
                    <p>${formatarMoeda(item.price)}</p>
                </div>
                <button class="btn-remove-sidebar" onclick="removerItemLateral(${index})"><i class="fas fa-trash"></i></button>
            </div>
        `;
    });
    totalEl.innerText = formatarMoeda(total);
}

function removerItemLateral(index) {
    let cart = JSON.parse(localStorage.getItem('eletroShopCart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('eletroShopCart', JSON.stringify(cart));
    updateCartCount();
    atualizarCarrinhoLateral();
}

// ==========================================
// MODAL DE HARDWARE E TOASTS
// ==========================================
function showSpecs(id) {
    const p = products.find(prod => prod.id === id);
    document.getElementById('spec-title').innerText = p.name;
    document.getElementById('spec-text').innerText = p.specs;
    document.getElementById('modal-specs').style.display = 'flex';
}

function closeSpecs() { document.getElementById('modal-specs').style.display = 'none'; }

function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas fa-check-circle" style="color:var(--green)"></i> <div>${message}</div>`;

    container.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease-in forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ==========================================
// GERADOR DE AVALIAÇÕES AUTOMÁTICO
// ==========================================
const nomesClientes = [
    "Ana Silva", "Carlos Eduardo", "Mariana Costa", "João Pedro",
    "Beatriz Souza", "Lucas Fernandes", "Juliana Alves", "Rafael Santos",
    "Camila Rocha", "Fernando Lima", "Larissa Gomes", "Thiago Ribeiro"
];

const comentariosClientes = [
    "Chegou em 3 dias! Aparelho perfeito, embalagem lacrada.",
    "Melhor preço que encontrei na internet. Recomendo muito!",
    "Comprei com receio, mas a entrega foi super rápida e o celular é incrível.",
    "Atendimento excelente e o produto é original com nota fiscal.",
    "Peguei a promoção de 40% e valeu cada centavo. Muito satisfeito!",
    "O celular não trava nada, bateria dura 2 dias tranquilo.",
    "Site muito seguro, me mandaram até código de rastreio no WhatsApp.",
    "Já é minha segunda compra na EletroShop. Sempre impecável!"
];

const modelosComprados = products.map(p => p.name);

function gerarAvaliacoes() {
    const track = document.getElementById('review-track');
    if (!track) return;

    let htmlAvaliacoes = '';

    for (let i = 0; i < 12; i++) {
        const nome = nomesClientes[Math.floor(Math.random() * nomesClientes.length)];
        const comentario = comentariosClientes[Math.floor(Math.random() * comentariosClientes.length)];
        const produto = modelosComprados[Math.floor(Math.random() * modelosComprados.length)];
        const inicial = nome.charAt(0);

        const estrelasHTML = Math.random() > 0.4
            ? '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>'
            : '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>';

        htmlAvaliacoes += `
            <div class="review-card">
                <div class="review-header">
                    <div class="avatar-cliente">${inicial}</div>
                    <div class="reviewer-info">
                        <h4>${nome} <i class="fas fa-check-circle verificado" title="Compra Verificada"></i></h4>
                        <div class="stars">${estrelasHTML}</div>
                    </div>
                </div>
                <p class="review-text">"${comentario}"</p>
                <span class="review-product">Comprou: ${produto}</span>
            </div>
        `;
    }

    track.innerHTML = htmlAvaliacoes + htmlAvaliacoes;
}

// ==========================================
// LÓGICA DA MEGA PÁSCOA
// ==========================================

// Dispara a explosão do Modal de Páscoa 1 segundo após entrar no site
window.addEventListener('load', () => {
    setTimeout(() => {
        const modalPascoa = document.getElementById('modal-pascoa');
        if (modalPascoa) {
            modalPascoa.style.display = 'flex';
        }
    }, 1000);
});

function fecharModalPascoa() {
    const modalPascoa = document.getElementById('modal-pascoa');
    if (modalPascoa) {
        modalPascoa.style.display = 'none';
    }
}

function ativarPascoa() {
    fecharModalPascoa();

    // Simula o clique no botão "Páscoa" do menu para filtrar os produtos
    const btnPascoa = document.querySelector('.tab-pascoa');
    if(btnPascoa) {
        // Remove a classe active dos outros botões e coloca no da Páscoa
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        btnPascoa.classList.add('active');
    }

    filter('Pascoa');

    // Mostra um toast bonitinho
    showToast("🐰 Bem-vindo à seção secreta de Páscoa!");
}

// ==========================================
// SISTEMA DE LOGIN E VALIDAÇÃO (MOCK)
// ==========================================

let modoCadastro = false;

// Verifica se o usuário já está logado ao carregar a página
window.addEventListener('load', () => {
    atualizarHeaderUsuario();
});

function abrirModalLogin() {
    // Se já estiver logado, não precisa abrir o modal para logar de novo
    if (localStorage.getItem('eletroShopUserLogado') === 'true') {
        showToast("Você já está conectado na sua conta!");
        return;
    }
    document.getElementById('modal-login').style.display = 'flex';
}

function fecharModalLogin() {
    document.getElementById('modal-login').style.display = 'none';
}

function alternarModoLogin() {
    modoCadastro = !modoCadastro;

    document.getElementById('login-title').innerText = modoCadastro ? 'Criar Nova Conta' : 'Acesse sua Conta';
    document.getElementById('btn-submit-login').innerText = modoCadastro ? 'CRIAR CONTA' : 'ENTRAR';
    document.getElementById('login-toggle-text').innerText = modoCadastro ? 'Já tem uma conta?' : 'Não tem uma conta?';
    document.getElementById('login-toggle-link').innerText = modoCadastro ? 'Faça Login' : 'Cadastre-se';
}

function realizarLoginMock(event) {
    event.preventDefault(); // Impede a página de recarregar

    const btnSubmit = document.getElementById('btn-submit-login');
    const textoOriginal = btnSubmit.innerText;

    // Efeito de carregamento
    btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Validando...';
    btnSubmit.disabled = true;

    // Simula o tempo do servidor (1.5 segundos)
    setTimeout(() => {
        // Salva a sessão no navegador
        localStorage.setItem('eletroShopUserLogado', 'true');

        fecharModalLogin();
        atualizarHeaderUsuario();

        showToast(modoCadastro ? "🎉 Conta criada com sucesso! Bem-vindo(a)." : "✅ Login realizado com sucesso!");

        btnSubmit.innerText = textoOriginal;
        btnSubmit.disabled = false;

        // Se o usuário estava no carrinho tentando comprar, abre o carrinho de novo
        const cart = JSON.parse(localStorage.getItem('eletroShopCart')) || [];
        if (cart.length > 0) {
            abrirCarrinhoLateral();
        }
    }, 1500);
}

function atualizarHeaderUsuario() {
    const logado = localStorage.getItem('eletroShopUserLogado') === 'true';
    const textoSaudacao = document.getElementById('user-greeting');

    if (textoSaudacao) {
        textoSaudacao.innerText = logado ? 'Olá, Cliente' : 'Entrar';
        textoSaudacao.style.color = logado ? '#facc15' : 'white'; // Amarelo se estiver logado
    }
}

// NOVO FLUXO DO BOTÃO FINALIZAR COMPRA
function tentarFinalizarCompra() {
    const logado = localStorage.getItem('eletroShopUserLogado') === 'true';

    if (logado) {
        // Usuário logado, pode prosseguir pro pagamento
        location.href = 'pagar.html';
    } else {
        // Usuário não logado, bloqueia e pede login
        fecharCarrinhoLateral();
        showToast("⚠️ Faça login ou cadastre-se para finalizar a compra.");
        setTimeout(() => {
            abrirModalLogin();
        }, 500);
    }
}

// INICIALIZAÇÃO DA LOJA
gerarAvaliacoes();
updateCartCount();
render(products);