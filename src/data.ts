/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface StoryVideo {
  id: string;
  url: string;
  caption: string;
  duration?: number; // duration in seconds
}

export interface ClientHighlight {
  id: string;
  name: string;
  coverUrl: string;
  driveUrl: string;
  stories: StoryVideo[];
}

export const HIGHLIGHTS: ClientHighlight[] = [
  {
    id: "rede-28",
    name: "Rede 28",
    coverUrl: "/Rede 28.jpg",
    driveUrl: "https://drive.google.com/drive/folders/1I2wwFdjlUogazeIFMOXMH9uyHlFBQaxX?usp=drive_link",
    stories: [
      {
        id: "r1",
        url: "https://lh3.googleusercontent.com/d/1hk2tu6pl8-CL8cvEbIOefGrpuFo0hUU-",
        caption: "Cobertura dinâmica em tempo real para a Convenção Rede 28"
      },
      {
        id: "r2",
        url: "https://lh3.googleusercontent.com/d/13DIGOW0LsXpAt7iXf-OVUvn9yLPW1UHO",
        caption: "Cortes rápidos e dinâmicos de alta energia focados em branding corporativo"
      },
      {
        id: "r3",
        url: "https://lh3.googleusercontent.com/d/1ehNndjlVKFlKPsqEae4T-YPM5b31t2Es",
        caption: "Transições inteligentes e filmagem 100% mobile otimizada para o Instagram"
      },
      {
        id: "r4",
        url: "https://lh3.googleusercontent.com/d/1umjsVHtWQ93S4frjJzYEjMoCaUze3hLZ",
        caption: "Entrega em tempo recorde mantendo as redes sociais aquecidas do início ao fim"
      }
    ]
  },
  {
    id: "beauty-fair",
    name: "Beauty Fair",
    coverUrl: "/Beauty Fair.jpg",
    driveUrl: "https://drive.google.com/drive/folders/1gt4_5CONzjhr7082u7JZKKs2ceDZex3n?usp=drive_link",
    stories: [
      {
        id: "b1",
        url: "https://lh3.googleusercontent.com/d/151GOm7XSil5jDQBMOIJPeTWx-GCxwmJJ",
        caption: "A energia vibrante do maior evento de beleza e estética nacional"
      },
      {
        id: "b2",
        url: "https://lh3.googleusercontent.com/d/1izrdf3of3fLh-bMugIFoPSzKcVsVy4ti",
        caption: "Captura de detalhes preciosos, texturas e maquiagem com precisão móvel"
      },
      {
        id: "b3",
        url: "https://lh3.googleusercontent.com/d/1rUSBmSayWb3ExhhziAeG0hYvZh0haAZC",
        caption: "Interações rápidas e dinâmicas nos stands mais movimentados do evento"
      },
      {
        id: "b4",
        url: "https://lh3.googleusercontent.com/d/14OCkdKRbj115Z9k7PDkO5LlqkZX7C1Op",
        caption: "Presets cinematográficos e cortes rápidos para máxima retenção de atenção"
      },
      {
        id: "b5",
        url: "https://lh3.googleusercontent.com/d/1ruH7nxzybezyzdxJm8m2kr1WN8-KQxEK",
        caption: "Entrega impecável do dia de cobertura em múltiplos formatos inovadores"
      }
    ]
  },
  {
    id: "dr-gabriel-maia",
    name: "Dr. Gabriel",
    coverUrl: "/Médicos de resultado.jpg",
    driveUrl: "https://drive.google.com/drive/folders/1qHQ0VOWd8AnZwNwozU5OkAynieTmAfoR?usp=drive_link",
    stories: [
      {
        id: "g1",
        url: "https://lh3.googleusercontent.com/d/1rxPk_N9Cy6TML_TOvSzUHEdXX7otOEoO",
        caption: "Posicionamento premium e vídeos de alta autoridade para o Dr. Gabriel Maia"
      },
      {
        id: "g2",
        url: "https://lh3.googleusercontent.com/d/1sEWzs9Jrh9g8FfEEHTLKRlPj5hiiGeTo",
        caption: "Cortes precisos para Médicos de Resultado gerarem conexão e conversão"
      },
      {
        id: "g3",
        url: "https://lh3.googleusercontent.com/d/13azv_rAuJlgtS23V-31L_B9GNHZzZL-t",
        caption: "Dinâmica moderna para simplificar conhecimentos complexos em formatos magnéticos"
      },
      {
        id: "g4",
        url: "https://lh3.googleusercontent.com/d/1Poe7dbFHkGmqH_VpTAkT8lBdb8A3NTLu",
        caption: "Iluminação requintada e áudio cristalino focado em redes profissionais"
      },
      {
        id: "g5",
        url: "https://lh3.googleusercontent.com/d/19nBSHCDwXKZxto9ln95I-EMB4pabBtLR",
        caption: "Roteirização e captação estética estratégica para impulsionar negócios digitais"
      }
    ]
  },
  {
    id: "evoque-academias",
    name: "Evoque",
    coverUrl: "/Evoque.jpeg",
    driveUrl: "https://drive.google.com/drive/folders/1FC5-RfYgvUBabJiw_CZIy1DnDFQiRmB5?usp=drive_link",
    stories: [
      {
        id: "e1",
        url: "https://lh3.googleusercontent.com/d/13rYoQt_HE-1POhCfqOlEpbw5qJIP14Yc",
        caption: "Energia, força e atitude captada de forma ágil com iPhone em alta taxa de frames"
      },
      {
        id: "e2",
        url: "https://lh3.googleusercontent.com/d/12d7xx6F6euBLyUNrpnEtcCtmdno-kQHD",
        caption: "Cortes ultra velozes que geram desejo imediato e valorizam a infraestrutura"
      },
      {
        id: "e3",
        url: "https://lh3.googleusercontent.com/d/1lyPzgzxB_MDfaggK_beRhdnhg2cm6eOf",
        caption: "Linguagem nativa do TikTok e Reels para impulsionar o engajamento da Evoque Academias"
      },
      {
        id: "e4",
        url: "https://lh3.googleusercontent.com/d/1TqREKe-JLOnhzNXkxUhgL9-pi4V1M__2",
        caption: "Acompanhamento dinâmico durante as sessões de treino mantendo foco estético total"
      },
      {
        id: "e5",
        url: "https://lh3.googleusercontent.com/d/1bU8O4EHe8N7nfmKjT8-3C9l7t0M8eB3O",
        caption: "Design sonoro envolvente casado with a intensidade dos movimentos"
      }
    ]
  },
  {
    id: "mulher-alta-performance",
    name: "Mulher AP",
    coverUrl: "/Mulher de alta perfomance.jpg",
    driveUrl: "https://drive.google.com/drive/folders/1XQOpe5p2tdHe5Ttrz4ofC6-TGD-VZ8aR?usp=drive_link",
    stories: [
      {
        id: "m1",
        url: "https://lh3.googleusercontent.com/d/1M9mNU_C0IKf2XfLuvAmsecOiwtAcdEMj",
        caption: "Cobertura de liderança e mentoria Mulher de Alta Performance"
      },
      {
        id: "m2",
        url: "https://lh3.googleusercontent.com/d/1KEoaLhzoGNw0oa90Vhl12rfotasMK-cp",
        caption: "Frames polidos com foco na força, autenticidade e conexão corporativa das participantes"
      },
      {
        id: "m3",
        url: "https://lh3.googleusercontent.com/d/1Il1EeQJFZC5iqO8NsmcHS-JN8dibdD89",
        caption: "Captura de feedbacks imediatos e networking ao vivo transformados em Reels magnéticos"
      },
      {
        id: "m4",
        url: "https://lh3.googleusercontent.com/d/1lIWw6yDMWzpj8Qna_3H1e-h8YyPyM91P",
        caption: "Visão estratégica de palco, palestrantes e emoções reais registradas na hora"
      },
      {
        id: "m5",
        url: "https://lh3.googleusercontent.com/d/1RbYmpHyfHYCFuVA-UaApcsFFsSkhPj26",
        caption: "Estrutura premium e valor agregado transmitido através do mobile impecável"
      }
    ]
  },
  {
    id: "amora-mesa",
    name: "Amora Mesa",
    coverUrl: "/Amora.jpg",
    driveUrl: "https://drive.google.com/drive/folders/1E8W4FdeWgwOvMqfxsbUK5UAEMAHp_y3b?usp=drive_link",
    stories: [
      {
        id: "a1",
        url: "https://lh3.googleusercontent.com/d/1eKhDNPEXyCht8MEQN9yLlksctlzQOZCE",
        caption: "Sofisticação gourmet e amor à mesa retratados sob luz suave e captação lenta"
      },
      {
        id: "a2",
        url: "https://lh3.googleusercontent.com/d/1i-nc9QqmiFbZ7GaHCKmG4lJbXKeqeIGk",
        caption: "Storytelling visual estimulante que eleva o requinte e gera desejo pelos produtos"
      },
      {
        id: "a3",
        url: "https://lh3.googleusercontent.com/d/1nVOyM6j2-dxhclqRJXFb4wSvvjyZe1_A",
        caption: "Enquadramentos macro limpos com foco na qualidade, cores e design de mesa posta"
      },
      {
        id: "a4",
        url: "https://lh3.googleusercontent.com/d/13rQBI4jCOgeck1fBeIM1ZRqsQFmmVvl0",
        caption: "Textura dinâmica e transições fluidas que dão vontade de experimentar na hora"
      },
      {
        id: "a5",
        url: "https://lh3.googleusercontent.com/d/1eV_KyaGQbSObGSMXb4Nnbe1wtw_oyXmc",
        caption: "Direção de arte mobile refinada com foco em beleza culinária e conexão afetiva"
      }
    ]
  }
];

export interface DifferenceCard {
  title: string;
  description: string;
  iconName: string;
}

export const DIFFERENCES: DifferenceCard[] = [
  {
    title: "Conteúdo em tempo real",
    description: "Stories e pílulas postadas durante o evento, mantendo sua audiência aquecida e engajada de imediato.",
    iconName: "Zap"
  },
  {
    title: "Agilidade na entrega",
    description: "Chega de esperar semanas. Formatos otimizados e finalizados no mesmo dia, ideais para o ritmo digital.",
    iconName: "Clock"
  },
  {
    title: "Captação estratégica",
    description: "Cada enquadramento tem um objetivo de marketing: reforçar autoridade, gerar vendas e gerar desejo.",
    iconName: "Compass"
  },
  {
    title: "Linguagem para redes sociais",
    description: "Vídeos no formato 9:16 nativos, com cores vibrantes e cortes dinâmicos que retêm a atenção nos primeiros segundos.",
    iconName: "Smartphone"
  },
  {
    title: "Experiência em grandes eventos",
    description: "Atuação comprovada em mega feiras como Beauty Fair e Fenagra, lidando com grandes públicos e pressão.",
    iconName: "Award"
  },
  {
    title: "Equipamento profissional mobile",
    description: "Uso de iPhones de última geração e assessórios dedicados que entregam agilidade de movimentação extrema.",
    iconName: "Camera"
  },
  {
    title: "Visual premium",
    description: "Direção de arte e pós-produção cinematográfica com paleta equilibrada e sofisticação luxuosa.",
    iconName: "Sparkles"
  },
  {
    title: "Atendimento personalizado",
    description: "Interação consultiva pré-evento para alinhar cronogramas, roteiros, personas e objetivos prioritários.",
    iconName: "Users"
  }
];

export interface HighlightCard {
  title: string;
  description: string;
  iconName: string;
}

export const ABOUT_CARDS: HighlightCard[] = [
  {
    title: "Eventos Corporativos",
    description: "Posicionamento institucional de alto padrão visual focado em negócios, marcas e conexões.",
    iconName: "Building2"
  },
  {
    title: "Storymaker em Tempo Real",
    description: "Conteúdo capturado, editado e postado imediatamente mantendo as redes sociais de alta vibração.",
    iconName: "TrendingUp"
  },
  {
    title: "Videomaker Mobile",
    description: "Mobilidade extrema com iPhone de última geração garantindo 4K cinematográfico e agilidade de posicionamento.",
    iconName: "Smartphone"
  },
  {
    title: "Conteúdo para Redes Sociais",
    description: "Estratégia nativa de conteúdo engajador (Reels, TikTok) feito exatamente para reter e converter.",
    iconName: "Video"
  },
  {
    title: "Feiras e Convenções",
    description: "Vídeos robustos captando a grandiosidade de stands, estandes corporativos, movimentação e painéis.",
    iconName: "Compass"
  },
  {
    title: "Cobertura Estratégica",
    description: "Acompanhamento consultivo para mapear os pontos fortes das palestras, autoridades e parceiros de negócios.",
    iconName: "Briefcase"
  }
];
