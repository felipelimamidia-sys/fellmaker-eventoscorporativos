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
        url: "https://res.cloudinary.com/dgzarnbl8/video/upload/v1780340869/01_zfzmtu.mp4",
        caption: "Cobertura dinâmica em tempo real para a Convenção Rede 28"
      },
      {
        id: "r2",
        url: "https://res.cloudinary.com/dgzarnbl8/video/upload/v1780340868/02_m4qnae.mp4",
        caption: "Cortes rápidos e dinâmicos de alta energia focados em branding corporativo"
      },
      {
        id: "r3",
        url: "https://res.cloudinary.com/dgzarnbl8/video/upload/v1780340874/03_hegq9u.mp4",
        caption: "Transições inteligentes e filmagem 100% mobile otimizada para o Instagram"
      },
      {
        id: "r4",
        url: "https://res.cloudinary.com/dgzarnbl8/video/upload/v1780340867/04_yzkked.mp4",
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
        url: "https://res.cloudinary.com/dgzarnbl8/video/upload/v1780341391/01_blxkam.mov",
        caption: "A energia vibrante do maior evento de beleza e estética nacional"
      },
      {
        id: "b2",
        url: "https://res.cloudinary.com/dgzarnbl8/video/upload/v1780341407/03_opeymw.mov",
        caption: "Captura de detalhes preciosos, texturas e maquiagem com precisão móvel"
      },
      {
        id: "b3",
        url: "https://res.cloudinary.com/dgzarnbl8/video/upload/v1780341399/05_yzi27r.mov",
        caption: "Interações rápidas e dinâmicas nos stands mais movimentados do evento"
      },
      {
        id: "b4",
        url: "https://res.cloudinary.com/dgzarnbl8/video/upload/v1780341410/02_rprrq2.mov",
        caption: "Presets cinematográficos e cortes rápidos para máxima retenção de atenção"
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
        url: "https://res.cloudinary.com/dgzarnbl8/video/upload/v1780341418/01_vpii22.mov",
        caption: "Posicionamento premium e vídeos de alta autoridade para o Dr. Gabriel Maia"
      },
      {
        id: "g2",
        url: "https://res.cloudinary.com/dgzarnbl8/video/upload/v1780341417/02_ncrkxi.mov",
        caption: "Cortes precisos para Médicos de Resultado gerarem conexão e conversão"
      },
      {
        id: "g3",
        url: "https://res.cloudinary.com/dgzarnbl8/video/upload/v1780341417/03_m7zrhz.mov",
        caption: "Dinâmica moderna para simplificar conhecimentos complexos em formatos magnéticos"
      },
      {
        id: "g4",
        url: "https://res.cloudinary.com/dgzarnbl8/video/upload/v1780341419/04_izzp0q.mov",
        caption: "Iluminação requintada e áudio cristalino focado em redes profissionais"
      },
      {
        id: "g5",
        url: "https://res.cloudinary.com/dgzarnbl8/video/upload/v1780341419/08_yeei6u.mov",
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
        url: "https://res.cloudinary.com/dgzarnbl8/video/upload/v1780341454/01_vreia1.mov",
        caption: "Energia, força e atitude captada de forma ágil com iPhone em alta taxa de frames"
      },
      {
        id: "e2",
        url: "https://res.cloudinary.com/dgzarnbl8/video/upload/v1780341452/02_irl4x0.mov",
        caption: "Cortes ultra velozes que geram desejo imediato e valorizam a infraestrutura"
      },
      {
        id: "e3",
        url: "https://res.cloudinary.com/dgzarnbl8/video/upload/v1780341453/04_qh90jy.mov",
        caption: "Linguagem nativa do TikTok e Reels para impulsionar o engajamento da Evoque Academias"
      },
      {
        id: "e4",
        url: "https://res.cloudinary.com/dgzarnbl8/video/upload/v1780341454/08_wdiscr.mov",
        caption: "Acompanhamento dinâmico durante as sessões de treino mantendo foco estético total"
      },
      {
        id: "e5",
        url: "https://res.cloudinary.com/dgzarnbl8/video/upload/v1780341453/05_siuzdv.mov",
        caption: "Design sonoro envolvente casado com a intensidade dos movimentos"
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
        url: "https://res.cloudinary.com/dgzarnbl8/video/upload/v1780341495/1_leip8a.mov",
        caption: "Cobertura de liderança e mentoria Mulher de Alta Performance"
      },
      {
        id: "m2",
        url: "https://res.cloudinary.com/dgzarnbl8/video/upload/v1780341494/11_s6oaf1.mp4",
        caption: "Frames polidos com foco na força, autenticidade e conexão corporativa das participantes"
      },
      {
        id: "m3",
        url: "https://res.cloudinary.com/dgzarnbl8/video/upload/v1780341501/3_ata33m.mov",
        caption: "Captura de feedbacks imediatos e networking ao vivo transformados em Reels magnéticos"
      },
      {
        id: "m4",
        url: "https://res.cloudinary.com/dgzarnbl8/video/upload/v1780341494/2_kqcyn5.mp4",
        caption: "Visão estratégica de palco, palestrantes e emoções reais registradas na hora"
      },
      {
        id: "m5",
        url: "https://res.cloudinary.com/dgzarnbl8/video/upload/v1780341494/24_i4cxo9.mp4",
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
        url: "https://res.cloudinary.com/dgzarnbl8/video/upload/v1780341530/Story_1_wzit1u.mov",
        caption: "Sofisticação gourmet e amor à mesa retratados sob luz suave e captação lenta"
      },
      {
        id: "a2",
        url: "https://res.cloudinary.com/dgzarnbl8/video/upload/v1780341531/Story_10_nvns6m.mov",
        caption: "Storytelling visual estimulante que eleva o requinte e gera desejo pelos produtos"
      },
      {
        id: "a3",
        url: "https://res.cloudinary.com/dgzarnbl8/video/upload/v1780341532/Story_8_gjgw4u.mov",
        caption: "Enquadramentos macro limpos com foco na qualidade, cores e design de mesa posta"
      },
      {
        id: "a4",
        url: "https://res.cloudinary.com/dgzarnbl8/video/upload/v1780341532/Story_6_xtgxom.mov",
        caption: "Textura dinâmica e transições fluidas que dão vontade de experimentar na hora"
      },
      {
        id: "a5",
        url: "https://res.cloudinary.com/dgzarnbl8/video/upload/v1780341530/Story_13_ekaf7e.mov",
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
