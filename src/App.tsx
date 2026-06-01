/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { 
  motion, 
  AnimatePresence 
} from "motion/react";
import { 
  Zap, 
  Clock, 
  Compass, 
  Smartphone, 
  Award, 
  Camera, 
  Sparkles, 
  Users,
  Building2,
  TrendingUp,
  Video,
  Briefcase,
  Play,
  Pause,
  X,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Check,
  ExternalLink,
  Instagram,
  ChevronDown,
  FileVideo,
  FolderOpen
} from "lucide-react";
import { 
  HIGHLIGHTS, 
  DIFFERENCES, 
  ABOUT_CARDS, 
  ClientHighlight, 
  StoryVideo 
} from "./data";

// Custom auto-counting hook for stats section
function CountingNumber({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [target, duration]);

  return (
    <span className="font-mono text-4xl lg:text-5xl font-extrabold tracking-tight text-secondary">
      {count}{suffix}
    </span>
  );
}

// Helper to transform Google Drive values to raw embed preview URLs
function getGoogleDriveEmbedUrl(url: string) {
  if (!url) return "";
  
  // Custom check for lh3.googleusercontent.com/d/[ID]
  if (url.includes("lh3.googleusercontent.com/d/")) {
    const parts = url.split("/d/");
    if (parts.length > 1) {
      const id = parts[1].split(/[?#]/)[0];
      return `https://drive.google.com/file/d/${id}/preview?autoplay=1`;
    }
  }

  // Check for standard drive.google.com link
  if (url.includes("drive.google.com")) {
    const regExp = /\/file\/d\/([a-zA-Z0-9_-]+)/;
    const matches = url.match(regExp);
    if (matches && matches[1]) {
      return `https://drive.google.com/file/d/${matches[1]}/preview?autoplay=1`;
    }
  }
  
  return url;
}

// Extract Google Drive ID to generate direct streaming link for HTML5 <video>
function getGoogleDriveStreamUrl(url: string) {
  if (!url) return "";
  let id = "";
  if (url.includes("lh3.googleusercontent.com/d/")) {
    const parts = url.split("/d/");
    if (parts.length > 1) {
      id = parts[1].split(/[?#]/)[0];
    }
  } else if (url.includes("drive.google.com")) {
    const regExp = /\/file\/d\/([a-zA-Z0-9_-]+)/;
    const matches = url.match(regExp);
    if (matches && matches[1]) {
      id = matches[1];
    } else {
      try {
        const urlObj = new URL(url);
        id = urlObj.searchParams.get("id") || "";
      } catch (e) {
        if (url.includes("id=")) {
          id = url.split("id=")[1].split(/[&?#]/)[0];
        }
      }
    }
  }
  if (id) {
    return `https://drive.google.com/uc?export=download&id=${id}`;
  }
  return url;
}

export default function App() {
  // Navigation & Scrolling states
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Instagram Stories Modal States
  const [activeHighlight, setActiveHighlight] = useState<ClientHighlight | null>(null);
  const [activeStoryIndex, setActiveStoryIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [storyProgress, setStoryProgress] = useState<number>(0);
  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(true);

  // Native Google Drive video playback fallback tracker
  const [googleDriveFailedNatively, setGoogleDriveFailedNatively] = useState<Record<string, boolean>>({});

  // Computed Values
  const storyUrl = activeHighlight?.stories[activeStoryIndex]?.url || "";
  const isGoogleDriveUrl = storyUrl.includes("drive.google.com") || storyUrl.includes("googleusercontent.com");
  const showIframeForStory = isGoogleDriveUrl && googleDriveFailedNatively[storyUrl];

  // References and Interval Timers
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressIntervalRef = useRef<number | null>(null);
  const STORY_DURATION_MS = 8000; // 8 seconds per story preview

  // Handle transparent to dark blue navbar transformation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Story progression logic
  useEffect(() => {
    if (!activeHighlight) {
      // Clear progress and return if no active highlight
      setStoryProgress(0);
      return;
    }

    // Reset progress when moving to a new story
    setStoryProgress(0);
    setIsVideoLoading(true);

    // If the timer is already running, clean it up
    if (progressIntervalRef.current) {
      window.clearInterval(progressIntervalRef.current);
    }

    // Timer logic running every 30ms for smooth transitions
    const stepTime = 30;
    progressIntervalRef.current = window.setInterval(() => {
      // Direct guard to skip timer ticks if video is paused, still buffer loading, or a Google Drive video
      if (isPaused || isVideoLoading || showIframeForStory) {
        return;
      }

      setStoryProgress((prev) => {
        const nextProgress = prev + (stepTime / STORY_DURATION_MS) * 100;
        if (nextProgress >= 100) {
          // If 100% reached, navigate forward
          handleNextStory();
          return 0;
        }
        return nextProgress;
      });
    }, stepTime);

    return () => {
      if (progressIntervalRef.current) {
        window.clearInterval(progressIntervalRef.current);
      }
    };
  }, [activeHighlight, activeStoryIndex, isPaused, isVideoLoading, showIframeForStory]);

  // Sync mute state with video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted, activeStoryIndex, activeHighlight]);

  // Helper selectors and handlers for Stories
  const handleOpenHighlight = (highlight: ClientHighlight) => {
    setActiveHighlight(highlight);
    setActiveStoryIndex(0);
    setIsPaused(false);
    setStoryProgress(0);
    setIsVideoLoading(true);
    document.body.style.overflow = "hidden"; // Prevent background scroll
  };

  const handleCloseHighlight = () => {
    setActiveHighlight(null);
    setActiveStoryIndex(0);
    setStoryProgress(0);
    document.body.style.overflow = ""; // Restore background scroll
  };

  const handleNextStory = () => {
    if (!activeHighlight) return;

    if (activeStoryIndex < activeHighlight.stories.length - 1) {
      // Go to next story of same highlight
      setActiveStoryIndex((prev) => prev + 1);
    } else {
      // End of current highlight. Go to next highlight's first story
      const currentIndex = HIGHLIGHTS.findIndex((h) => h.id === activeHighlight.id);
      if (currentIndex !== -1 && currentIndex < HIGHLIGHTS.length - 1) {
        setActiveHighlight(HIGHLIGHTS[currentIndex + 1]);
        setActiveStoryIndex(0);
      } else {
        // No more highlights, close modal
        handleCloseHighlight();
      }
    }
    setStoryProgress(0);
    setIsVideoLoading(true);
  };

  const handlePrevStory = () => {
    if (!activeHighlight) return;

    if (activeStoryIndex > 0) {
      // Go to previous story of same highlight
      setActiveStoryIndex((prev) => prev - 1);
    } else {
      // Start of current highlight. Go to previous highlight's last story
      const currentIndex = HIGHLIGHTS.findIndex((h) => h.id === activeHighlight.id);
      if (currentIndex > 0) {
        const prevHighlight = HIGHLIGHTS[currentIndex - 1];
        setActiveHighlight(prevHighlight);
        setActiveStoryIndex(prevHighlight.stories.length - 1);
      } else {
        // Very first story of the first highlight, reset progress
        setStoryProgress(0);
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
        }
      }
    }
    setIsVideoLoading(true);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
    if (videoRef.current) {
      if (!isPaused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  // Video playback callbacks to maintain precise progress sync
  const handleVideoWaiting = () => {
    setIsVideoLoading(true);
  };

  const handleVideoCanPlay = () => {
    setIsVideoLoading(false);
    if (videoRef.current && !isPaused) {
      videoRef.current.play().catch(() => {});
    }
  };

  // Get matching UI icons for difference and about cards dynamically
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Zap": return <Zap className="w-6 h-6 text-secondary" />;
      case "Clock": return <Clock className="w-6 h-6 text-secondary" />;
      case "Compass": return <Compass className="w-6 h-6 text-secondary" />;
      case "Smartphone": return <Smartphone className="w-6 h-6 text-secondary" />;
      case "Award": return <Award className="w-6 h-6 text-secondary" />;
      case "Camera": return <Camera className="w-6 h-6 text-secondary" />;
      case "Sparkles": return <Sparkles className="w-6 h-6 text-secondary" />;
      case "Users": return <Users className="w-6 h-6 text-secondary" />;
      case "Building2": return <Building2 className="w-6 h-6 text-secondary" />;
      case "TrendingUp": return <TrendingUp className="w-6 h-6 text-secondary" />;
      case "Video": return <Video className="w-6 h-6 text-secondary" />;
      case "Briefcase": return <Briefcase className="w-6 h-6 text-secondary" />;
      default: return <Sparkles className="w-6 h-6 text-secondary" />;
    }
  };

  // Pre-configured URLs
  const BUDGET_WHATSAPP_URL = "https://wa.me/5511939218711?text=Fell%2C%20vi%20seu%20portf%C3%B3lio%20e%20tenho%20interesse%20no%20seu%20servi%C3%A7o%20para%20o%20meu%20evento!";
  const FELLI_AVATAR = "https://lh3.googleusercontent.com/d/1oIUiMHnAZuaND7gTjJmd_C-G8LHFo30A";
  const FELLI_LOGO = "https://lh3.googleusercontent.com/d/18s9BR1Zk6XcwNFaetbYXitRIroXF3Amu";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-150 antialiased font-sans selection:bg-secondary/30 selection:text-white">
      
      {/* 1. HEADER / NAVIGATION */}
      <header 
        id="main-nav"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled 
            ? "bg-slate-950/95 backdrop-blur-md shadow-lg border-b border-white/10 py-3" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between">
          
          {/* Logo Brand Layer */}
          <a href="#" className="flex items-center group focus:outline-none" id="nav-brand">
            <img 
              src={FELLI_LOGO} 
              alt="Fellmaker Logo" 
              className={`${
                isScrolled ? "h-14 md:h-18" : "h-22 md:h-28"
              } w-auto object-contain group-hover:scale-110 transition-all duration-300`}
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Fallback dynamically if download quota limitations trigger
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="font-display font-black tracking-widest text-lg text-white group-hover:text-secondary transition-colors leading-none block md:hidden max-[380px]:hidden ml-2">
              FELL<span className="text-secondary">MAKER</span>
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-slate-300">
            <a href="#sobre" className="hover:text-secondary transition-colors font-medium">Sobre Felipe</a>
            <a href="#grandes-eventos" className="hover:text-secondary transition-colors font-medium">Grandes Eventos</a>
            <a href="#portfolio" className="hover:text-secondary transition-colors font-medium relative py-1">
              Portfólio 
              <span className="absolute -top-1 -right-4 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
            </a>
            <a href="#diferenciais" className="hover:text-secondary transition-colors font-medium">Diferenciais</a>
          </nav>

          {/* Contact Nav Action Button */}
          <div className="flex items-center gap-4">
            <a 
              href={BUDGET_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="cta-nav"
              className="bg-secondary hover:bg-[#a67444] text-white px-5 py-2.5 rounded-full text-xs md:text-sm font-bold tracking-wider transition-all duration-300 shadow-md hover:shadow-secondary/20 active:scale-95 flex items-center gap-2"
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              SOLICITAR ORÇAMENTO
            </a>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section 
        id="hero" 
        className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-primary"
      >
        {/* Cinematic Backdrop Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1600&auto=format&fit=crop&q=80" 
            alt="Cinematic production setup" 
            className="w-full h-full object-cover opacity-25 object-center mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-primary/40"></div>
          {/* Subtle gold grid pattern or radial light glow */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Content Column */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Visual Micro-Badge */}
            <div className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/30 rounded-full px-4 py-1.5 w-fit mb-6 animate-pulse">
              <span className="h-2 w-2 rounded-full bg-secondary"></span>
              <span className="text-[10px] md:text-xs font-bold tracking-widest text-secondary uppercase font-mono">
                Storymaker Mobile Premium
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-black text-4xl sm:text-5xl xl:text-6xl text-white tracking-tight leading-tight mb-6">
              Seu evento termina.<br />
              <span className="text-secondary bg-clip-text bg-gradient-to-r from-secondary to-[#e6b383]">
                O conteúdo continua
              </span><br />
              gerando valor.
            </h1>

            {/* Subheadline description */}
            <p className="text-slate-300 text-base md:text-lg lg:text-xl font-light leading-relaxed mb-8 max-w-2xl">
              Cobertura estratégica para eventos corporativos, feiras, convenções e marcas que desejam transformar momentos em conteúdo de alto impacto visual e engajamento dinâmico.
            </p>

            {/* Hero CTA Block */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-fit">
              <a 
                href={BUDGET_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary hover:bg-[#a67444] text-white px-8 py-4 rounded-full text-sm font-bold tracking-wider transition-all duration-300 shadow-xl shadow-secondary/15 flex items-center justify-center gap-3 hover:-translate-y-0.5 active:scale-98"
                id="hero-cta-whatsapp"
              >
                <Zap className="w-4 h-4 fill-white" />
                SOLICITAR ORÇAMENTO
              </a>
              
              <a 
                href="#portfolio"
                className="bg-white/5 hover:bg-white/10 active:bg-white/20 text-white border border-white/10 hover:border-white/20 px-8 py-4 rounded-full text-sm font-bold tracking-wider transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm shadow-md"
                id="hero-cta-portfolio"
              >
                <FileVideo className="w-4 h-4 text-secondary" />
                VER PORTFÓLIO
              </a>
            </div>

            {/* Credibility checkpoints block */}
            <div className="grid grid-cols-2 gap-y-3.5 gap-x-4 border-t border-white/15 pt-8 max-w-xl">
              {[
                "Entrega em tempo real",
                "Especialista em Storymaker",
                "Cobertura de grandes eventos",
                "Conteúdo estratégico para redes"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs md:text-sm font-medium text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-secondary/15 flex items-center justify-center text-secondary border border-secondary/20 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{text}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Photo Column with Luxury border */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-72 h-96 sm:w-80 sm:h-[420px] lg:w-96 lg:h-[460px] group">
              
              {/* Backglow decorative */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-secondary to-primary rounded-2xl blur opacity-30 group-hover:opacity-55 transition duration-1000 group-hover:duration-200"></div>
              
              {/* Main Photo Frame */}
              <div className="relative w-full h-full bg-slate-900 border border-secondary/30 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center">
                <img 
                  src={FELLI_AVATAR} 
                  alt="Felipe Lima" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback visually if direct access token is constrained
                    e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80";
                  }}
                />
                
                {/* Visual Camera lens look Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                
                {/* On-Lens Text Indicator */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-mono tracking-widest text-secondary font-black">FELLMAKER</span>
                    <span className="text-white font-display font-extrabold text-sm tracking-wide mt-0.5">Felipe Lima</span>
                  </div>
                  <div className="bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold text-slate-200 tracking-wider">
                    Storymaker & Videomaker
                  </div>
                </div>
              </div>

              {/* Decorative Floating Widget: Real-time coverage tag */}
              <div className="absolute -top-4 -right-4 bg-slate-900/90 backdrop-blur-md border border-secondary/30 px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2.5 select-none animate-bounce">
                <span className="flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
                </span>
                <span className="text-xs font-mono font-bold tracking-widest text-white">LIVE COBO</span>
              </div>
            </div>
          </div>

        </div>

        {/* Scroll downstream indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 shrink-0 z-10 select-none opacity-80">
          <span className="text-[10px] font-mono tracking-widest text-slate-400">DESCUBRA MAIS</span>
          <a href="#sobre" className="animate-bounce p-1 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-secondary transition-colors" id="scroll-prompt">
            <ChevronDown className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* 3. SOBRE SECTION (Quem está por trás das lentes) */}
      <section id="sobre" className="py-14 md:py-20 bg-slate-950 relative overflow-hidden">
        
        {/* Glow element */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10">
          
          {/* Main Section Head */}
          <div className="max-w-3xl mb-10 md:mb-12">
            <span className="text-xs font-mono font-bold tracking-widest text-secondary block mb-3 uppercase">
              Direção Criativa
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-white tracking-tight leading-tight">
              Quem está por trás das lentes
            </h2>
            <div className="w-16 h-1 bg-secondary mt-5"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Biography visual column */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-slate-300 text-sm md:text-base leading-relaxed font-light">
              
              <div className="space-y-6">
                <p className="font-medium text-white text-base md:text-lg leading-relaxed">
                  Sou <strong className="text-secondary font-semibold">Felipe Lima</strong>, conhecido profissionalmente como <strong className="text-secondary font-semibold">Fell</strong>, um Storymaker e Videomaker com atuação especializada na criação de conteúdos estratégicos de alto impacto visual para marcas e eventos de prestígio. Com ampla bagagem de cobertura técnica nos maiores circuitos nacionais — incluindo <strong className="text-white font-medium">Beauty Fair 2024 / 2025</strong>, a grande feira farmacêutica e agro <strong className="text-white font-medium">Fenagra 2025</strong>, o refinado circuito automotivo <strong className="text-white font-medium">AutoBless</strong> e as convenções da <strong className="text-white font-medium">Rede 28</strong> —, atuo de forma versátil liderando desde produções corporativas sofisticadas até documentações premium de canais de mídias para influenciadores, igrejas e celebrações sociais de elite.
                </p>
                
                <p className="leading-relaxed">
                  Minha metodologia de produção é <strong className="text-white font-medium">100% mobile</strong>, utilizando o iPhone de ponta como câmera cinematográfica e ilha de edição imediata. Essa mobilidade ultra ágil me consente filmar, lapidar e veicular Reels e Stories magnéticos em tempo real diretamente de dentro do fluxo da sua audiência, garantindo velocidade de trânsito implacável e sofisticação luxuosa com a nitidez impecável do 4K.
                </p>
              </div>

              {/* Biography CTA */}
              <div className="pt-4">
                <a 
                  href={BUDGET_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-secondary hover:text-white font-bold tracking-wider text-sm transition-colors duration-300 underline underline-offset-4 decoration-2 focus:outline-none"
                >
                  Falar diretamente com o Fell no WhatsApp
                  <ExternalLink className="w-4 h-4 shrink-0" />
                </a>
              </div>

            </div>

            {/* Quick Cards Grid Column */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ABOUT_CARDS.map((card, i) => (
                <div 
                  key={i}
                  className="bg-primary/20 border border-white/5 hover:border-secondary/30 rounded-xl p-5 hover:bg-primary/30 transition-all duration-300 group flex flex-col gap-3.5 shadow-lg shadow-black/10"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {getIconComponent(card.iconName)}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-display font-bold text-sm text-white group-hover:text-secondary transition-colors uppercase tracking-wider">
                      {card.title}
                    </h3>
                    <p className="text-slate-400 text-xs font-light leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 4. EXPERIÊNCIA E GRANDES EVENTOS */}
      <section id="grandes-eventos" className="py-14 bg-gradient-to-b from-slate-950 via-primary/35 to-slate-950 relative overflow-hidden">
        
        {/* Lights backgrounds */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Achievements Left Panel */}
            <div className="lg:col-span-5 flex flex-col">
              <span className="text-xs font-mono font-bold tracking-widest text-secondary block mb-3 uppercase">
                Grandes Circuitos Nacionais
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-black text-white tracking-tight leading-tight mb-6">
                Ampla experiência à frente das maiores audiências do mercado.
              </h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light mb-8">
                Lidar com a complexidade estrutural de mega convenções é um dom para poucos profissionais. Exige sintonia estrita, plano estético claro, adaptabilidade constante e equipamentos sem chance de falhas.
              </p>

              {/* Event Logos/Titles Layout */}
              <div className="flex flex-wrap gap-2.5">
                {[
                  "Beauty Fair 2024",
                  "Beauty Fair 2025",
                  "Fenagra 2025",
                  "AutoBless",
                  "Convenção Rede 28"
                ].map((ev, i) => (
                  <span 
                    key={i}
                    className="bg-slate-900 border border-secondary/20 hover:border-secondary/40 px-3.5 py-1.5 rounded-md text-[10px] sm:text-xs font-mono font-bold text-slate-150 uppercase tracking-widest transition-colors cursor-default"
                  >
                    ✦ {ev}
                  </span>
                ))}
              </div>
            </div>

            {/* Numbers Block Panel right - Count-up simulation */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              
              {/* Stat Card 1 */}
              <div className="bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-xl p-8 hover:border-secondary/20 transition-colors flex flex-col gap-2.5">
                <CountingNumber target={100} suffix="+" />
                <div className="flex flex-col">
                  <h3 className="font-display font-extrabold text-sm uppercase text-white tracking-wide">
                    Horas de Cobertura
                  </h3>
                  <p className="text-slate-400 text-xs font-light mt-1">
                    Operação constante em feiras e plenários de alta exaustão tática.
                  </p>
                </div>
              </div>

              {/* Stat Card 2 */}
              <div className="bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-xl p-8 hover:border-secondary/20 transition-colors flex flex-col gap-2.5">
                <CountingNumber target={1000} suffix="+" />
                <div className="flex flex-col">
                  <h3 className="font-display font-extrabold text-sm uppercase text-white tracking-wide">
                    Materiais Entregues
                  </h3>
                  <p className="text-slate-400 text-xs font-light mt-1">
                    Cortes dinâmicos finalizados sob medida no mesmo dia do evento.
                  </p>
                </div>
              </div>

              {/* Stat Card 3 */}
              <div className="bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-xl p-8 hover:border-secondary/20 transition-colors flex flex-col sm:col-span-2 md:col-span-1 gap-2.5">
                <span className="font-mono text-4xl lg:text-5xl font-extrabold tracking-tight text-secondary">
                  100%
                </span>
                <div className="flex flex-col">
                  <h3 className="font-display font-extrabold text-sm uppercase text-white tracking-wide">
                    Mobile Mobile
                  </h3>
                  <p className="text-slate-400 text-xs font-light mt-1">
                    Total flexibilidade do iPhone: o workflow livre de fios e setups pesados.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 5. PORTFÓLIO INTERATIVO (Instagram Stories Style) */}
      <section id="portfolio" className="py-14 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
            <span className="text-xs font-mono font-bold tracking-widest text-secondary block mb-3 uppercase">
              Selecione e Assista
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight">
              Portfólio Interativo
            </h2>
            <p className="text-slate-400 text-sm md:text-base font-light mt-4">
              Cada cliente é um destaque. Clique nas bolhas abaixo para assistir aos vídeos verticais exatamente no formato de Stories (9:16).
            </p>
            <div className="w-12 h-1 bg-secondary mx-auto mt-6"></div>
          </div>

          {/* INSTAGRAM HIGHLIGHTS ROW */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-12" id="highlights-container">
            {HIGHLIGHTS.map((highlight) => (
              <button 
                key={highlight.id}
                onClick={() => handleOpenHighlight(highlight)}
                className="flex flex-col items-center gap-3.5 focus:outline-none group cursor-pointer"
                id={`highlight-btn-${highlight.id}`}
              >
                {/* Bubble Container */}
                <div className="relative">
                  {/* Luxury Animated Ring Boundary */}
                  <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-[#bd8653] via-[#ffcd9a] to-primary p-[2.5px] group-hover:scale-105 transition-all duration-300 animate-spin-slow">
                    <div className="w-full h-full rounded-full bg-slate-950 p-[2px]">
                      <div className="w-full h-full rounded-full bg-slate-950"></div>
                    </div>
                  </div>

                  {/* Circle Cover Image */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-26 md:h-26 rounded-full overflow-hidden border-2 border-slate-950 group-hover:scale-95 transition-transform duration-300">
                    <img 
                      src={highlight.coverUrl} 
                      alt={highlight.name}
                      className="w-full h-full object-cover filter brightness-95 group-hover:brightness-105 transition duration-300"
                    />
                    
                    {/* Shadow layer for indicator clarity */}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                  </div>

                  {/* Play floating badge */}
                  <div className="absolute -bottom-1 right-1 bg-secondary text-white w-6 h-6 rounded-full flex items-center justify-center border-2 border-slate-950 shadow-md transform scale-90 group-hover:scale-110 transition-transform">
                    <Play className="w-2.5 h-2.5 fill-white" />
                  </div>
                </div>

                {/* Name descriptor beneath the bubble */}
                <div className="flex flex-col items-center">
                  <span className="font-display font-extrabold text-xs tracking-wider text-slate-100 group-hover:text-secondary transition-colors uppercase">
                    {highlight.name}
                  </span>
                  <span className="text-[9px] font-mono font-medium tracking-wide text-slate-500 mt-0.5">
                    {highlight.stories.length} stories
                  </span>
                </div>
              </button>
            ))}
          </div>

        </div>

        {/* 6. INSTAGRAM FULLSCREEN STORIES MODAL DIALOG */}
        <AnimatePresence>
          {activeHighlight && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-0 md:p-4 select-none"
              onClick={handleCloseHighlight}
            >
              
              {/* Outer Closing Cross Button (Desktop comfort) */}
              <button 
                onClick={handleCloseHighlight}
                className="absolute top-6 right-6 z-50 text-slate-400 hover:text-white transition-colors cursor-pointer hidden md:flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10"
              >
                <span className="text-xs font-mono font-semibold">Fechar</span>
                <X className="w-5 h-5" />
              </button>

              {/* Central Player Frame Container */}
              <div 
                className="relative w-full h-full md:max-w-[430px] md:h-[90vh] md:max-h-[840px] md:rounded-2xl overflow-hidden bg-slate-900 border-none md:border md:border-white/10 shadow-3xl text-white flex flex-col"
                onClick={(e) => {
                  e.stopPropagation(); // Avoid shutting modal by mistake
                }}
              >
                
                {/* TOP STORY LAYERS - PROGRESS SEGMENTS */}
                <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent p-4 pb-12 z-20 flex flex-col gap-3">
                  
                  {/* SEGMENTED PROGRESS BARS */}
                  <div className="flex items-center gap-1.5 w-full">
                    {activeHighlight.stories.map((_, index) => {
                      let fillPercentage = 0;
                      if (index < activeStoryIndex) {
                        fillPercentage = 100;
                      } else if (index === activeStoryIndex) {
                        fillPercentage = showIframeForStory ? 100 : storyProgress;
                      }

                      return (
                        <div key={index} className="h-[3px] flex-1 bg-white/20 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-secondary transition-all ease-linear"
                            style={{ 
                              width: `${fillPercentage}%`,
                              // Disable transition resets to ensure snap responsive jumps
                              transitionDuration: index === activeStoryIndex && !isVideoLoading && !showIframeForStory ? "30ms" : "0ms"
                            }}
                          ></div>
                        </div>
                      );
                    })}
                  </div>

                  {/* CLIENT METADATA & CONTROL ROW */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Avatar inside story */}
                      <div className="relative w-9 h-9 rounded-full overflow-hidden border border-secondary/40 p-[1.5px] bg-slate-900">
                        <img 
                          src={activeHighlight.coverUrl} 
                          alt={activeHighlight.name} 
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      
                      {/* Labels */}
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5 text-xs font-bold leading-none">
                          <span className="uppercase tracking-wider">{activeHighlight.name}</span>
                          <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                          <span className="text-[10px] text-slate-300 font-mono font-medium lowercase">fellmaker</span>
                        </div>
                        <span className="text-[9.5px] text-slate-300 tracking-wide mt-1 font-mono">
                          Story {activeStoryIndex + 1} de {activeHighlight.stories.length}
                        </span>
                      </div>
                    </div>

                    {/* Interactive Widgets row inside Story */}
                    <div className="flex items-center gap-3 bg-black/25 px-2 py-1 rounded-full border border-white/5">
                      
                      {!showIframeForStory && (
                        <>
                          {/* Play / Pause Toggle button */}
                          <button 
                            onClick={togglePause}
                            className="p-1 hover:text-secondary rounded transition-colors focus:outline-none"
                            title={isPaused ? "Retomar" : "Pausar"}
                          >
                            {isPaused ? <Play className="w-4 h-4 fill-white" /> : <Pause className="w-4 h-4" />}
                          </button>

                          {/* Mute toggle button */}
                          <button 
                            onClick={() => setIsMuted((m) => !m)}
                            className="p-1 hover:text-secondary rounded transition-colors focus:outline-none"
                            title={isMuted ? "Ativar som" : "Desativar som"}
                          >
                            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                          </button>
                        </>
                      )}

                      {/* Mobile Visible Close Toggle */}
                      <button 
                        onClick={handleCloseHighlight}
                        className="p-1 hover:text-secondary rounded transition-colors focus:outline-none md:hidden"
                      >
                        <X className="w-4 h-4" />
                      </button>

                    </div>
                  </div>

                </div>

                {/* MAIN PLAYER - 9:16 VIDEO CANVAS STAGE */}
                <div className="relative flex-1 w-full bg-slate-950 flex items-center justify-center">
                  
                  {/* LEFT CHEVRON */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); handlePrevStory(); }}
                    className={`absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 items-center justify-center hover:bg-slate-900 transition-all text-white focus:outline-none cursor-pointer ${
                      showIframeForStory ? "flex" : "hidden md:flex"
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* RIGHT CHEVRON */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleNextStory(); }}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 items-center justify-center hover:bg-slate-900 transition-all text-white focus:outline-none cursor-pointer ${
                      showIframeForStory ? "flex" : "hidden md:flex"
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* LEFT AND RIGHT TOUCH ZONES (Mobile-focused invisible overlays) */}
                  {!showIframeForStory && (
                    <div className="absolute inset-0 z-10 flex">
                      {/* Left Tap target */}
                      <div 
                        className="w-1/3 h-full cursor-w-resize active:bg-white/[0.02]"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrevStory();
                        }}
                        title="Anterior"
                      ></div>
                      
                      {/* Centered Pause-Hold target area / Play control indicator */}
                      <div 
                        className="w-1/3 h-full cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePause();
                        }}
                      ></div>

                      {/* Right Tap target */}
                      <div 
                        className="w-1/3 h-full cursor-e-resize active:bg-white/[0.02]"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNextStory();
                        }}
                        title="Próximo"
                      ></div>
                    </div>
                  )}

                  {/* BUFFER LOADING DOCK SPINNER */}
                  {isVideoLoading && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/70 p-5 text-center gap-4">
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        {/* Shutter ring spinner */}
                        <div className="absolute inset-0 rounded-full border-4 border-white/10 border-t-secondary animate-spin"></div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-mono tracking-widest text-[#bd8653] font-bold uppercase">FELLMAKER REC</span>
                        <span className="text-[10px] text-slate-400 mt-1">Carregando vídeo...</span>
                      </div>
                    </div>
                  )}

                  {/* TRUE MP4 REAL-STREAM VIDEO OBJECT OR GOOGLE DRIVE EMBED */}
                  {showIframeForStory ? (
                    <iframe
                      src={getGoogleDriveEmbedUrl(storyUrl)}
                      className="w-full h-full border-0 bg-slate-950 rounded-b-2xl"
                      allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                      title={activeHighlight.stories[activeStoryIndex]?.caption}
                      onLoad={() => setIsVideoLoading(false)}
                    />
                  ) : (
                    <video 
                      ref={videoRef}
                      src={isGoogleDriveUrl ? getGoogleDriveStreamUrl(storyUrl) : storyUrl}
                      className="w-full h-full object-cover"
                      playsInline
                      autoPlay={!isPaused}
                      loop={false}
                      muted={isMuted}
                      onWaiting={handleVideoWaiting}
                      onPlaying={handleVideoCanPlay}
                      onCanPlay={handleVideoCanPlay}
                      onEnded={handleNextStory}
                      onError={(e) => {
                        console.warn("Direct stream failed natively, switching to iframe fallback.", e);
                        if (isGoogleDriveUrl) {
                          setGoogleDriveFailedNatively((prev) => ({ ...prev, [storyUrl]: true }));
                        }
                        setIsVideoLoading(false);
                      }}
                    />
                  )}

                  {/* Overlay indicating Muted state */}
                  {!showIframeForStory && isMuted && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); setIsMuted(false); }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-5 py-3 hover:bg-slate-950 hover:border-secondary flex items-center gap-2.5 shadow-xl animate-fade-in group cursor-pointer"
                    >
                      <VolumeX className="w-4 h-4 text-secondary group-hover:scale-110 transition-transform" />
                      <span className="text-[11px] font-mono font-bold tracking-widest text-slate-100 group-hover:text-secondary uppercase">Toque para Ativar Som</span>
                    </button>
                  )}

                  {/* CAPTION TEXT OVERLAY */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 pt-16 z-20 flex flex-col gap-4">
                    <p className="text-slate-100 text-xs sm:text-sm font-light leading-relaxed tracking-wide">
                      {activeHighlight.stories[activeStoryIndex]?.caption}
                    </p>

                    {/* Quick call to action inside the active highlight story drawer */}
                    <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                      
                      {/* Primary WhatsApp Direct */}
                      <a 
                        href={BUDGET_WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-secondary hover:bg-[#a67444] text-white py-2 px-4 rounded-lg text-[10px] font-bold tracking-wider flex items-center justify-center gap-1.5 uppercase transition-colors"
                      >
                        <Zap className="w-3.5 h-3.5 fill-white" />
                        Quero orçamento igual a este
                      </a>

                      {/* Google Drive Raw Archive Button */}
                      <a 
                        href={activeHighlight.driveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white py-2 px-4 rounded-lg text-[10px] font-bold tracking-wider border border-white/10 flex items-center justify-center gap-1.5 uppercase transition-all"
                      >
                        <ExternalLink className="w-3 h-3 text-secondary" />
                        Ver pasta cheia de vídeo no Google Drive
                      </a>

                    </div>
                  </div>

                </div>

              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 7. DIFERENCIAIS SECTION (Por que empresas contratam a Fellmaker) */}
      <section id="diferenciais" className="py-14 md:py-20 bg-white text-slate-900 relative">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          
          {/* Section Heading */}
          <div className="max-w-3xl mb-10 md:mb-12">
            <span className="text-xs font-mono font-bold tracking-widest text-secondary block mb-3 uppercase">
              Autoridade e Confiança
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-[#003055] tracking-tight leading-tight">
              Por que marcas contratam a Fellmaker?
            </h2>
            <div className="w-16 h-1 bg-secondary mt-5"></div>
          </div>

          {/* Bento-Inspired Differences Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DIFFERENCES.map((diff, i) => (
              <div 
                key={i}
                className="bg-slate-50 border border-slate-100 hover:border-secondary/40 rounded-xl p-7 hover:bg-white hover:shadow-xl transition-all duration-300 group flex flex-col gap-4 relative overflow-hidden"
              >
                {/* Visual Top Decorative Dot */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-slate-200/40 rounded-full blur-xl translate-x-3 -translate-y-3 shrink-0"></div>

                {/* Circular Icon background */}
                <div className="w-11 h-11 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {getIconComponent(diff.iconName)}
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-display font-black text-sm text-[#003055] uppercase tracking-wider group-hover:text-secondary transition-colors">
                    {diff.title}
                  </h3>
                  <p className="text-slate-500 text-xs md:text-sm font-light leading-relaxed">
                    {diff.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. CTA FINAL SECTION */}
      <section 
        id="contato" 
        className="py-14 md:py-20 bg-primary relative text-center overflow-hidden flex items-center justify-center"
      >
        {/* Background Event Atmosphere Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80" 
            alt="Corporate crowds and lighting" 
            className="w-full h-full object-cover opacity-15 mix-blend-color-dodge object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-primary/80"></div>
          {/* Ambient Flare */}
          <div className="absolute -bottom-16 w-80 h-80 bg-secondary/15 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-5 md:px-10 relative z-10">
          
          {/* Logo visual badge */}
          <div className="w-20 h-20 rounded-2xl bg-slate-900/80 border border-secondary/30 mx-auto flex items-center justify-center shadow-2xl shadow-black/60 mb-8 overflow-hidden">
            <img 
              src={FELLI_LOGO} 
              alt="Fellmaker Logo" 
              className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight leading-tight mb-6">
            Seu próximo evento merece<br />
            mais do que apenas registros.
          </h2>

          <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed mb-10 max-w-2xl mx-auto">
            Transforme cada palestra, stand, entrevista e momento autêntico em conteúdos altamente refinados para fortalecer o branding da sua marca e gerar interesse contínuo.
          </p>

          <div className="flex flex-col items-center gap-5">
            <a 
              href={BUDGET_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary hover:bg-[#a67444] text-white px-10 py-5 rounded-full text-base font-bold tracking-wider transition-all duration-300 shadow-2xl shadow-secondary/20 flex items-center justify-center gap-3 hover:-translate-y-0.5 active:translate-y-0 active:scale-98"
              id="falar-com-fell-cta"
            >
              <Zap className="w-5 h-5 fill-white" />
              FALAR COM FELL (WHATSAPP)
            </a>
            
            <span className="text-xs font-mono tracking-widest text-slate-400">
              ✓ ATENDIMENTO IMEDIATO • SÃO PAULO & GRANDES FEIRAS NACIONAIS
            </span>
          </div>

        </div>
      </section>

      {/* 9. LUXURIOUS MINIMALIST FOOTER */}
      <footer className="bg-slate-950 border-t border-white/5 py-12 md:py-16 text-slate-500 font-light relative select-none">
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-display font-black tracking-widest text-white tracking-widest leading-none text-base">
              FELL<span className="text-secondary">MAKER</span>
            </span>
            <span className="text-[10px] font-mono tracking-widest text-slate-400 mt-2 block">
              STORYMAKER & VIDEOMAKER DE ALTO VALOR PERCEBIDO
            </span>
            <p className="text-xs text-slate-400 mt-3 max-w-md">
              Produções cinematográficas em velocidade digital. Coberturas completas e estrategicamente dirigidas pelo celular com rigor de luxo.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end text-center md:text-right gap-3">
            <div className="flex items-center gap-4 text-xs font-medium text-slate-300">
              <a href="#sobre" className="hover:text-secondary transition-colors">Sobre</a>
              <span>•</span>
              <a href="#grandes-eventos" className="hover:text-secondary transition-colors">Grandes Eventos</a>
              <span>•</span>
              <a href="#portfolio" className="hover:text-secondary transition-colors">Destaques</a>
            </div>
            
            <span className="text-[11px] font-mono mt-2 uppercase tracking-widest text-slate-400">
              © {new Date().getFullYear()} Fellmaker • Todos os direitos reservados.
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
}
