import { type FormEvent, type ReactNode, useRef, useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BatteryCharging,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Droplets,
  HeartPulse,
  Menu,
  MessageCircle,
  Minus,
  PackageCheck,
  Pause,
  Play,
  Plus,
  Send,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Timer,
  Trash2,
  Volume2,
  VolumeX,
  Waves,
  X,
  Zap,
} from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import whiteProductImage from '@assets/image_1789988953829.png';
import pinkProductImage from '@assets/image_1789988972140.png';
import blueProductImage from '@assets/image_1789988990510.png';
import blackProductImage from '@assets/image_1789989034807.png';
import heroVideo from '@assets/1783936186709_wid_NmE1NGI0YmFlYTBmNDdlYjYwNDcxYzcy_h264cmobile_1789988880938.mp4';
import brushingVideo from '@assets/1783936186617_wid_NmE1NGI0YmFlYTBmNDdlYjYwNDcxYzY1_h264cmobile_1789988880940.mp4';
import lifestyleVideo from '@assets/1783936182946_wid_NmE1NGI0YjZlYTBmNDdlYjYwNDcxNzc2_h264cmobile_1789988880940.mp4';
import detailVideo from '@assets/1783936185762_wid_NmE1NGI0YjllYTBmNDdlYjYwNDcxOTdj_h264cmobile_1789988880941.mp4';

const queryClient = new QueryClient();
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '+923077339343';
const UNIT_PRICE = 25000;
const SELLING_PRICE = 'PKR 25,000';
const DELIVERY_OFFER = 'Free Nationwide Delivery';

const formatPrice = (qty: number) => `PKR ${(qty * UNIT_PRICE).toLocaleString()}`;

const colors = [
  { name: 'Black', image: blackProductImage, tint: '#10224a', hex: '#111827' },
  { name: 'White', image: whiteProductImage, tint: '#eaf1fb', hex: '#f3f4f6' },
  { name: 'Pink', image: pinkProductImage, tint: '#f7dfe7', hex: '#f472b6' },
  { name: 'Blue', image: blueProductImage, tint: '#d7f7fb', hex: '#38bdf8' },
];

const faqs = [
  ['How does the Sonic Brush® V5 clean all teeth in 30 seconds?', 'The food-grade silicone mouthpiece wraps comfortably around your entire upper and lower dental arches simultaneously. Driven by high-frequency sonic vibrations (up to 45,000 rpm), it cleans every tooth surface at once rather than one tooth at a time.'],
  ['Is it safe for sensitive teeth and gums?', 'Yes! Unlike hard nylon bristles that can abrade enamel or irritate gums, the soft antimicrobial silicone bristles gently stimulate gum blood flow while lifting away plaque without abrasive friction.'],
  ['How long does the battery last on a single charge?', 'A single full charge on the magnetic induction charging dock delivers up to 30 brushing sessions (approximately 2 to 3 weeks of daily use).'],
  ['Is it waterproof?', 'Yes, the Sonic Brush® V5 is IPX7 waterproof certified. You can comfortably use and rinse it directly under running water.'],
  ['How does the WhatsApp order process work?', 'When you proceed from the side cart, a pre-filled WhatsApp message will open with your selected color and quantity. Our team confirms availability and guides you through payment and immediate dispatch.'],
];

const customerReviews = [
  {
    id: '01',
    name: 'Zainab Khan',
    location: 'Karachi',
    tag: 'Daily Routine',
    rating: 5,
    title: 'Saves so much time every single morning',
    body: 'I was genuinely surprised by how clean and smooth my teeth feel in just 30 seconds. The soft food-grade silicone bristles are very gentle on gums. The wireless charging dock looks super sleek on the bathroom counter!',
  },
  {
    id: '02',
    name: 'Hamza Tariq',
    location: 'Lahore',
    tag: 'Quality & Design',
    rating: 5,
    title: 'Comfortable fit and excellent build quality',
    body: 'The U-shaped mouthpiece fits naturally and reaches every tooth at once. The sonic vibration is powerful without feeling aggressive. Delivery was fast within 2 days with direct WhatsApp updates.',
  },
  {
    id: '03',
    name: 'Ayesha Malik',
    location: 'Islamabad',
    tag: 'Sensitive Gums',
    rating: 5,
    title: 'Best upgrade for sensitive gums',
    body: 'Traditional brushes always used to cause gum bleeding, but Sonic Brush V5 completely solved that. The battery lasts weeks on a single charge and it is 100% waterproof. Highly recommended!',
  },
];

const showcaseVideos = [
  {
    id: 'brushing',
    src: brushingVideo,
    poster: whiteProductImage,
    tag: '30s Routine',
    title: 'Complete 360° Brushing Routine',
    description: 'Watch how effortlessly the full-mouth mouthpiece covers both upper and lower dental arches in a single 30-second automated cycle.',
  },
  {
    id: 'lifestyle',
    src: lifestyleVideo,
    poster: blueProductImage,
    tag: 'Daily Lifestyle',
    title: 'Effortless Hands-Free Mornings',
    description: 'See the Sonic Brush® V5 seamlessly fit into a modern morning routine — perfect for busy professionals, parents, and travelers.',
  },
  {
    id: 'details',
    src: detailVideo,
    poster: blackProductImage,
    tag: 'Sonic Tech',
    title: 'Precision Silicone & Wireless Dock',
    description: 'A macro look at the antibacterial silicone bristles, 4 custom sonic frequency modes, and the inductive wireless charging station.',
  },
];

function whatsappMessage(text: string) {
  const normalizedNumber = WHATSAPP_NUMBER.replace(/[^0-9]/g, '');
  const url = `https://wa.me/${normalizedNumber}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function generateWhatsAppOrderMessage(color: string, quantity = 1) {
  const total = formatPrice(quantity);
  const lines = [
    'Hello Sonic Brush Pakistan! 👋',
    'I would like to order the Sonic Brush® V5.',
    '',
    `📦 Selected Color: ${color}`,
    `🔢 Quantity: ${quantity}`,
    `💰 Total Amount: ${total}`,
    `🚚 Shipping: ${DELIVERY_OFFER} Included`,
    '',
    'Please confirm my order and share payment/delivery instructions.',
  ];
  return lines.join('\n');
}

function Button({
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
  testId,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'quiet' | 'whatsapp';
  className?: string;
  type?: 'button' | 'submit';
  testId?: string;
}) {
  const styles = {
    primary: 'bg-[#2454d8] text-[#fbfcff] hover:bg-[#193fae] shadow-[0_10px_25px_rgba(36,84,216,.25)] active:shadow-none',
    outline: 'border border-[#9eb6e4] bg-white text-[#19356e] hover:border-[#2454d8] hover:bg-[#edf3ff]',
    quiet: 'text-[#365a9d] hover:text-[#19356e] hover:bg-[#edf3ff]',
    whatsapp: 'bg-[#25d366] text-white hover:bg-[#20ba59] shadow-[0_10px_25px_rgba(37,211,102,.3)] active:shadow-none',
  };
  return (
    <motion.button
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.97 }}
      type={type}
      data-testid={testId}
      onClick={onClick}
      className={`inline-flex min-h-11 sm:min-h-12 select-none items-center justify-center gap-2 rounded-full px-5 sm:px-6 text-xs sm:text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2454d8] focus-visible:ring-offset-2 ${styles[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}

function SonicMark({ inverted = false }: { inverted?: boolean }) {
  const markColor = inverted ? '#28c7e7' : '#2454d8';
  const waveColor = inverted ? '#10244c' : '#fbfcff';

  return (
    <svg aria-hidden="true" viewBox="0 0 40 40" className="size-8 sm:size-9 shrink-0" fill="none">
      <rect x="1" y="1" width="38" height="38" rx="13" fill={markColor} />
      <path d="M8 22.5h4l2.7-8.5 3.8 14 3.7-17 2.4 8.5H32" stroke={waveColor} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 29.5h22" stroke={waveColor} strokeOpacity=".45" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function Wordmark({ inverted = false }: { inverted?: boolean }) {
  return (
    <a href="#top" data-testid="link-wordmark" className="flex shrink-0 items-center gap-2 select-none">
      <SonicMark inverted={inverted} />
      <span className={`font-display text-sm sm:text-base font-extrabold tracking-tight ${inverted ? 'text-[#f2f6ee]' : 'text-[#10244c]'}`}>
        SONIC BRUSH<span className="text-[#28c7e7]">®</span>
      </span>
    </a>
  );
}

function SectionIntro({ kicker, title, body, light = false, center = false }: { kicker: string; title: string; body?: string; light?: boolean; center?: boolean }) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''} ${light ? 'text-[#f7f5ed]' : 'text-[#153d3a]'}`}>
      <p className={`eyebrow mb-2 sm:mb-3 text-xs ${light ? 'text-[#b7d8c7]' : 'text-[#147367]'}`}>{kicker}</p>
      <h2 className="font-display text-[clamp(1.75rem,5.5vw,3.2rem)] font-extrabold leading-[1.08] tracking-tight">{title}</h2>
      {body && <p className={`mt-3 sm:mt-4 max-w-xl text-sm sm:text-base leading-relaxed ${center ? 'mx-auto' : ''} ${light ? 'text-[#c1d9d1]' : 'text-[#5c7772]'}`}>{body}</p>}
    </div>
  );
}

/** 
 * Header Hero Video Player
 */
function HeroVideoPlayer({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative isolate overflow-hidden rounded-2xl sm:rounded-[2rem] border border-[#cbdcf5] bg-[#0c1d43] shadow-[0_16px_48px_rgba(20,50,110,.16)]">
      <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] w-full">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          aria-label="Sonic Brush V5 Hero Demonstration"
          className="size-full object-cover object-center"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07132f]/80 via-transparent to-[#102e6e]/20" />

        {/* Floating badge top left */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-3 top-3 sm:left-4 sm:top-4 flex items-center gap-1.5 rounded-full border border-white/25 bg-[#091737]/85 px-3 py-1 backdrop-blur-md"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#28c7e7] opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-[#28c7e7]" />
          </span>
          <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#d4ecff]">
            360° Sonic Clean
          </span>
        </motion.div>

        {/* Floating time badge top right */}
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 rounded-full border border-white/20 bg-white/15 px-2.5 sm:px-3 py-1 font-mono text-[10px] sm:text-xs font-bold text-white backdrop-blur-md"
        >
          30 SECONDS
        </motion.div>

        {/* Bottom Bar on video */}
        <div className="absolute inset-x-3 sm:inset-x-5 bottom-3 sm:bottom-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="font-display text-xs sm:text-base font-extrabold text-white truncate">Sonic Brush® V5</p>
            <p className="text-[10px] sm:text-xs text-[#a9c9f4] truncate">Wrap-around mouthpiece in action</p>
          </div>
          <button
            type="button"
            data-testid="hero-play-pause"
            onClick={toggle}
            className="grid size-9 sm:size-11 shrink-0 place-items-center rounded-full bg-[#28c7e7] text-[#07132f] shadow-[0_4px_16px_rgba(40,199,231,.4)] transition-transform hover:scale-105 active:scale-95"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Mobile-Responsive Video Showcase Carousel
 */
function VideoCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeVideo = showcaseVideos[activeIdx];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % showcaseVideos.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + showcaseVideos.length) % showcaseVideos.length);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      void v.play();
      setIsPlaying(true);
    }
  }, [activeIdx]);

  return (
    <div className="relative mx-auto max-w-4xl">
      {/* Category Tabs */}
      <div className="mb-5 sm:mb-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {showcaseVideos.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setActiveIdx(idx)}
            className={`group inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3.5 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-bold transition-all ${
              activeIdx === idx
                ? 'bg-[#2454d8] text-white shadow-[0_6px_20px_rgba(36,84,216,.28)]'
                : 'border border-[#c5d8f0] bg-white text-[#3d5985] hover:border-[#2454d8] hover:bg-[#eef4ff]'
            }`}
          >
            <span className={`size-2 rounded-full ${activeIdx === idx ? 'bg-[#28c7e7]' : 'bg-[#9cb6d8]'}`} />
            {item.tag}
          </button>
        ))}
      </div>

      {/* Main Video Screen */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#cbdcf5] bg-[#0c1d43] shadow-[0_16px_40px_rgba(16,40,90,.12)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeVideo.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative aspect-[16/10] sm:aspect-video w-full"
          >
            <video
              ref={videoRef}
              src={activeVideo.src}
              poster={activeVideo.poster}
              autoPlay
              muted
              playsInline
              loop
              className="size-full object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#061026]/75 via-transparent to-[#0a1e48]/20" />

            {/* Top Bar: Tag & Slide Counter */}
            <div className="absolute inset-x-3.5 sm:inset-x-5 top-3.5 sm:top-5 flex items-center justify-between text-white">
              <span className="rounded-full border border-white/25 bg-black/50 px-3 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                {activeVideo.tag}
              </span>
              <span className="rounded-full bg-black/40 px-2.5 sm:px-3 py-1 font-mono text-[11px] sm:text-xs font-semibold backdrop-blur-md">
                {activeIdx + 1} / {showcaseVideos.length}
              </span>
            </div>

            {/* Bottom Play Button Overlay */}
            <div className="absolute inset-x-3.5 sm:inset-x-5 bottom-3.5 sm:bottom-4 flex items-center justify-between">
              <span className="rounded-full bg-black/50 px-3 py-1 text-[11px] sm:text-xs font-semibold text-[#c8dcfa] backdrop-blur-md hidden sm:inline-block">
                Press to {isPlaying ? 'pause' : 'play'}
              </span>
              <button
                type="button"
                onClick={togglePlay}
                className="ml-auto grid size-10 sm:size-12 place-items-center rounded-full bg-[#28c7e7] text-[#07132f] shadow-[0_4px_16px_rgba(40,199,231,.4)] transition-transform hover:scale-105 active:scale-95"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Video Details Card & Navigation Controls */}
      <div className="mt-4 rounded-2xl border border-[#d2e1f2] bg-white p-4 sm:p-6 shadow-[0_8px_24px_rgba(20,50,110,.05)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#2454d8] uppercase">VIDEO {activeIdx + 1}</span>
            <span className="text-[#9bb3d3]">·</span>
            <span className="text-xs font-semibold text-[#54739c]">{activeVideo.tag}</span>
          </div>
          <h3 className="font-display mt-1 text-base sm:text-xl font-extrabold text-[#0c1d43] leading-snug">
            {activeVideo.title}
          </h3>
          <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#567298]">
            {activeVideo.description}
          </p>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#edf3fb] shrink-0">
          <div className="flex items-center gap-1.5">
            {showcaseVideos.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIdx === i ? 'w-6 bg-[#2454d8]' : 'w-2 bg-[#b7cde6] hover:bg-[#86a8d3]'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous video"
              className="grid size-10 place-items-center rounded-full border border-[#cbdcf5] bg-[#f8fbff] text-[#19356e] transition-all hover:bg-[#2454d8] hover:text-white hover:border-[#2454d8] active:scale-95 shadow-xs"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next video"
              className="grid size-10 place-items-center rounded-full border border-[#cbdcf5] bg-[#f8fbff] text-[#19356e] transition-all hover:bg-[#2454d8] hover:text-white hover:border-[#2454d8] active:scale-95 shadow-xs"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Slide-Over Side Cart Drawer Component
 */
function SideCartDrawer({
  isOpen,
  onClose,
  selectedColor,
  onSelectColor,
  quantity,
  onUpdateQuantity,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedColor: string;
  onSelectColor: (color: string) => void;
  quantity: number;
  onUpdateQuantity: (qty: number) => void;
}) {
  const currentColorObj = colors.find((c) => c.name === selectedColor) || colors[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCheckout = () => {
    const message = generateWhatsAppOrderMessage(selectedColor, quantity);
    whatsappMessage(message);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#07132f]/60 backdrop-blur-xs"
          />

          {/* Drawer Slide-in */}
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 320 }}
              className="flex w-screen max-w-md flex-col bg-white shadow-2xl"
            >
              {/* Cart Header */}
              <div className="flex items-center justify-between border-b border-[#e2edf8] px-5 py-4 sm:px-6">
                <div className="flex items-center gap-2.5">
                  <div className="grid size-9 place-items-center rounded-xl bg-[#eef5ff] text-[#2454d8]">
                    <ShoppingBag size={18} />
                  </div>
                  <div>
                    <h2 className="font-display text-base font-extrabold text-[#0c1d43]">Your Order Cart</h2>
                    <p className="text-xs text-[#5c779c]">Sonic Brush® V5 Pakistan</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="grid size-9 place-items-center rounded-full text-[#6d84a7] hover:bg-[#f1f6fc] hover:text-[#0c1d43] transition-colors"
                  aria-label="Close cart"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Cart Body */}
              <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6 space-y-6">
                {/* Product Card */}
                <div className="rounded-2xl border border-[#d2e1f2] bg-[#f8fbff] p-4 sm:p-5">
                  <div className="flex gap-4">
                    <div className="size-20 sm:size-24 shrink-0 overflow-hidden rounded-xl border border-[#cbdcee] bg-white p-1.5 shadow-2xs">
                      <img src={currentColorObj.image} alt={currentColorObj.name} className="size-full object-contain" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-display text-sm sm:text-base font-extrabold text-[#0c1d43] leading-tight">
                            Sonic Brush® V5
                          </h3>
                          <p className="text-xs text-[#58759d]">360° Sonic Toothbrush</p>
                        </div>
                        <span className="font-display text-sm font-extrabold text-[#2454d8]">
                          {formatPrice(quantity)}
                        </span>
                      </div>

                      {/* Color Pill Badges inside Cart */}
                      <div className="mt-3">
                        <span className="text-[11px] font-bold text-[#56749c]">Color: <span className="text-[#0c1d43]">{selectedColor}</span></span>
                        <div className="mt-1.5 flex items-center gap-1.5">
                          {colors.map((c) => (
                            <button
                              key={c.name}
                              type="button"
                              onClick={() => onSelectColor(c.name)}
                              className={`group flex items-center gap-1 rounded-lg border px-2 py-1 text-[11px] font-semibold transition-all ${
                                selectedColor === c.name
                                  ? 'border-[#2454d8] bg-[#eaf1ff] text-[#2454d8] ring-1 ring-[#2454d8]'
                                  : 'border-[#cbdcee] bg-white text-[#4b668d] hover:border-[#86a8e0]'
                              }`}
                            >
                              <span className="size-2 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
                              <span>{c.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Quantity Selector Stepper */}
                      <div className="mt-4 flex items-center justify-between border-t border-[#e2edf8] pt-3">
                        <span className="text-xs font-semibold text-[#5a769e]">Quantity:</span>
                        <div className="flex items-center gap-2 rounded-full border border-[#cbdcee] bg-white px-2 py-1 shadow-2xs">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(Math.max(1, quantity - 1))}
                            disabled={quantity <= 1}
                            className="grid size-6 place-items-center rounded-full text-[#385987] hover:bg-[#edf4ff] disabled:opacity-30"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="font-mono text-xs font-bold text-[#0c1d43] w-4 text-center">{quantity}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(Math.min(10, quantity + 1))}
                            disabled={quantity >= 10}
                            className="grid size-6 place-items-center rounded-full text-[#385987] hover:bg-[#edf4ff] disabled:opacity-30"
                            aria-label="Increase quantity"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Package Inclusions Checklist */}
                <div className="rounded-xl border border-[#dce7f5] bg-white p-4">
                  <p className="text-xs font-bold text-[#0c1d43] uppercase tracking-wider">Package Includes:</p>
                  <ul className="mt-2.5 space-y-2 text-xs text-[#526f95]">
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-[#10b981] shrink-0" />
                      <span>1 × Sonic Brush® V5 ({selectedColor})</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-[#10b981] shrink-0" />
                      <span>1 × Food-grade silicone mouthpiece</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-[#10b981] shrink-0" />
                      <span>1 × Magnetic induction charging dock</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-[#10b981] shrink-0" />
                      <span>1 × Fast USB charging cable + manual</span>
                    </li>
                  </ul>
                </div>

                {/* Trust Highlights */}
                <div className="rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] p-3.5 flex items-start gap-3">
                  <ShieldCheck size={18} className="text-[#059669] shrink-0 mt-0.5" />
                  <div className="text-xs text-[#065f46]">
                    <p className="font-bold">100% Free Nationwide Delivery</p>
                    <p className="mt-0.5 text-[#047857]">Payment and delivery address are verified safely through WhatsApp before dispatch.</p>
                  </div>
                </div>
              </div>

              {/* Cart Footer */}
              <div className="border-t border-[#e2edf8] bg-[#f8fbff] p-5 sm:p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#5a769e]">
                    <span>Item Subtotal ({quantity} unit{quantity > 1 ? 's' : ''})</span>
                    <span className="font-mono font-semibold text-[#0c1d43]">{formatPrice(quantity)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#5a769e]">
                    <span>Nationwide Delivery</span>
                    <span className="font-bold text-[#10b981] uppercase tracking-wider">FREE</span>
                  </div>
                  <div className="border-t border-[#dce7f5] pt-2 flex items-baseline justify-between">
                    <span className="text-sm font-extrabold text-[#0c1d43]">Estimated Total</span>
                    <span className="font-display text-xl font-extrabold text-[#2454d8]">{formatPrice(quantity)}</span>
                  </div>
                </div>

                {/* WhatsApp Checkout Button */}
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2.5 rounded-full bg-[#25d366] hover:bg-[#20ba59] active:scale-[.98] py-3.5 px-6 text-sm font-bold text-white shadow-[0_8px_24px_rgba(37,211,102,.35)] transition-all"
                >
                  <MessageCircle size={18} />
                  <span>Proceed to WhatsApp Checkout</span>
                  <ArrowRight size={16} />
                </button>

                <p className="text-center text-[11px] text-[#6b85a8]">
                  Clicking opens a ready pre-filled message with your order summary.
                </p>
              </div>
            </motion.aside>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Home() {
  const [selectedColor, setSelectedColor] = useState('Black');
  const [quantity, setQuantity] = useState(1);
  const [cartOpen, setCartOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const jumpTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const openCartWithColor = (color?: string) => {
    if (color) setSelectedColor(color);
    setMenuOpen(false);
    setCartOpen(true);
  };

  return (
    <main id="top" className="page-grain min-h-dvh bg-[#fbfcff] pb-24 sm:pb-20 text-[#10244c] overflow-x-hidden">
      {/* Top Banner Notice */}
      <div className="bg-[#0b1b3d] px-3 py-2 text-center text-[11px] sm:text-xs font-semibold text-[#bfe4f2]">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles size={13} className="text-[#28c7e7] shrink-0" />
          Direct WhatsApp Checkout · {DELIVERY_OFFER} Across Pakistan · {SELLING_PRICE}
        </span>
      </div>

      {/* Sticky Header Navbar */}
      <header className="sticky top-0 z-40 border-b border-[#d8e4f5] bg-[#fbfcff]/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-8 lg:px-12">
          <Wordmark />

          {/* Desktop Navigation (lg: 1024px+) */}
          <nav className="hidden items-center gap-6 xl:gap-8 lg:flex" aria-label="Primary navigation">
            <button onClick={() => jumpTo('how-it-works')} className="text-sm font-semibold text-[#53698d] hover:text-[#2454d8] transition-colors">How it works</button>
            <button onClick={() => jumpTo('features')} className="text-sm font-semibold text-[#53698d] hover:text-[#2454d8] transition-colors">Features</button>
            <button onClick={() => jumpTo('showcase')} className="text-sm font-semibold text-[#53698d] hover:text-[#2454d8] transition-colors">Video Showcase</button>
            <button onClick={() => jumpTo('reviews')} className="text-sm font-semibold text-[#53698d] hover:text-[#2454d8] transition-colors">Reviews</button>
            <button onClick={() => jumpTo('order')} className="text-sm font-semibold text-[#53698d] hover:text-[#2454d8] transition-colors">Order</button>
            <button onClick={() => jumpTo('faq')} className="text-sm font-semibold text-[#53698d] hover:text-[#2454d8] transition-colors">FAQ</button>
          </nav>

          {/* Right Action: Cart Open Button & Mobile Hamburger Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => openCartWithColor()}
              className="inline-flex min-h-9 sm:min-h-10 select-none items-center justify-center gap-2 rounded-full bg-[#2454d8] hover:bg-[#193fae] px-4 sm:px-5 text-xs font-bold text-white shadow-[0_6px_20px_rgba(36,84,216,.28)] transition-all active:scale-95"
            >
              <ShoppingCart size={15} />
              <span>Cart & Order</span>
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="grid size-9 sm:size-10 place-items-center rounded-full border border-[#c2d3ed] text-[#19356e] lg:hidden active:bg-[#edf3ff] shrink-0"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="border-t border-[#dbe5f5] bg-[#fbfcff]/98 backdrop-blur-xl px-4 sm:px-6 py-4 lg:hidden shadow-xl"
              aria-label="Mobile navigation"
            >
              <div className="grid gap-1">
                {[
                  { id: 'how-it-works', label: 'How It Works' },
                  { id: 'features', label: 'Features' },
                  { id: 'showcase', label: 'Video Showcase' },
                  { id: 'reviews', label: 'Customer Reviews' },
                  { id: 'order', label: 'Select Color & Order' },
                  { id: 'faq', label: 'Frequently Asked Questions' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => jumpTo(item.id)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-bold text-[#19356e] hover:bg-[#edf4ff] active:bg-[#e2edff] transition-colors"
                  >
                    <span>{item.label}</span>
                    <ChevronRight size={16} className="text-[#8ba7d6]" />
                  </button>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-[#e3edf7]">
                <button
                  type="button"
                  onClick={() => openCartWithColor()}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-[#25d366] hover:bg-[#20ba59] py-3 text-xs font-bold text-white shadow-md"
                >
                  <ShoppingCart size={15} />
                  <span>Open Cart · {SELLING_PRICE}</span>
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* 1. HERO SECTION */}
      <section className="relative mx-auto max-w-7xl px-4 pt-8 pb-14 sm:px-8 sm:pt-16 sm:pb-20 lg:px-12 lg:pt-20 lg:pb-24">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-[#b8d2eb] bg-[#eef5fc] px-3.5 py-1 text-xs font-bold text-[#1f4eaf]">
              <Sparkles size={13} className="text-[#2454d8]" />
              Sonic Brush® V5 — Pakistan Edition
            </div>
            <h1 className="font-display mt-4 sm:mt-6 text-[clamp(2rem,7vw,4.2rem)] font-extrabold leading-[1.04] tracking-tight text-[#0c1d43]">
              Brush every tooth in 30 seconds.
            </h1>
            <p className="mt-4 sm:mt-6 max-w-lg text-sm sm:text-base leading-relaxed text-[#4b6389]">
              Upgrade to automatic 360° sonic cleaning. The wrap-around soft silicone mouthpiece covers all upper and lower teeth at once for effortless, dentist-grade oral care.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Button onClick={() => openCartWithColor()} className="w-full sm:w-auto">
                <ShoppingCart size={16} />
                Order on WhatsApp · {SELLING_PRICE}
              </Button>
              <Button variant="outline" onClick={() => jumpTo('showcase')} className="w-full sm:w-auto">
                Watch Videos <ArrowDown size={16} />
              </Button>
            </div>

            <div className="mt-8 sm:mt-10 grid grid-cols-3 gap-2 sm:gap-4 border-t border-[#d8e4f5] pt-5 text-center sm:text-left">
              <div>
                <p className="font-display text-xl sm:text-2xl font-extrabold text-[#0c1d43]">30 Sec</p>
                <p className="text-[11px] sm:text-xs font-semibold text-[#5a769e]">Auto Timer</p>
              </div>
              <div>
                <p className="font-display text-xl sm:text-2xl font-extrabold text-[#0c1d43]">45,000</p>
                <p className="text-[11px] sm:text-xs font-semibold text-[#5a769e]">Sonic RPM</p>
              </div>
              <div>
                <p className="font-display text-xl sm:text-2xl font-extrabold text-[#0c1d43]">IPX7</p>
                <p className="text-[11px] sm:text-xs font-semibold text-[#5a769e]">100% Waterproof</p>
              </div>
            </div>
          </motion.div>

          {/* 1 Premier Video in Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <HeroVideoPlayer src={heroVideo} poster={blackProductImage} />
          </motion.div>
        </div>
      </section>

      {/* 2. VIDEO SHOWCASE CAROUSEL */}
      <section id="showcase" className="scroll-mt-20 border-y border-[#dbe6f5] bg-[#f1f6ff] py-14 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
          <SectionIntro
            center
            kicker="Video Gallery"
            title="See Sonic Brush® V5 In Action"
            body="Watch real demonstrations of the 30-second routine, ergonomic mouthpiece, and waterproof wireless dock."
          />
          <div className="mt-8 sm:mt-12">
            <VideoCarousel />
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS & FEATURES */}
      <section id="how-it-works" className="scroll-mt-20 py-14 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
          <SectionIntro
            kicker="Effortless Routine"
            title="3 Simple Steps. Done in 30 Seconds."
            body="No manual scrubbing, no awkward angles, no sore gums."
          />

          <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 md:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Apply Toothpaste',
                desc: 'Apply your favorite toothpaste or foam paste evenly along both sides of the silicone mouthpiece channel.',
                icon: Droplets,
              },
              {
                step: '02',
                title: 'Press & Relax (30s)',
                desc: 'Bite gently into the mouthpiece and press the power button. The 360° sonic vibrations automatically clean every tooth in 30 seconds.',
                icon: Timer,
              },
              {
                step: '03',
                title: 'Rinse & Charge',
                desc: 'Rinse the IPX7 waterproof brush directly under running water and place it on the magnetic wireless charging dock.',
                icon: Sparkles,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  whileHover={{ y: -3 }}
                  className="rounded-2xl sm:rounded-3xl border border-[#d2e1f2] bg-white p-6 sm:p-8 shadow-[0_6px_24px_rgba(20,50,110,.04)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#2454d8]">STEP {item.step}</span>
                    <div className="grid size-9 sm:size-10 place-items-center rounded-xl bg-[#edf4ff] text-[#2454d8]">
                      <Icon size={18} />
                    </div>
                  </div>
                  <h3 className="font-display mt-5 text-lg sm:text-xl font-extrabold text-[#0c1d43]">{item.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#567298]">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <div id="features" className="scroll-mt-20 mt-14 sm:mt-20 pt-12 sm:pt-16 border-t border-[#dce6f5]">
            <SectionIntro
              kicker="Designed for Excellence"
              title="Everything Built For Your Smile"
              body="Engineered with clinical-grade materials for optimal hygiene and daily convenience."
            />
            <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: '4 Sonic Modes', desc: 'Clean, Polish, White, and Gum Care for your customized preference.', icon: Waves },
                { title: 'IPX7 Waterproof', desc: '100% washable under running water, safe for bathroom and shower use.', icon: Droplets },
                { title: 'Food-Grade Silicone', desc: 'Soft antimicrobial bristles protect tooth enamel and delicate gums.', icon: ShieldCheck },
                { title: 'Wireless Dock', desc: 'Magnetic contact charging gives up to 30 brushing sessions on 1 charge.', icon: BatteryCharging },
              ].map((feat) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    key={feat.title}
                    whileHover={{ y: -3 }}
                    className="rounded-2xl border border-[#d2e1f2] bg-[#f8fbff] p-5 sm:p-6 shadow-2xs"
                  >
                    <div className="grid size-10 place-items-center rounded-xl bg-[#2454d8] text-white">
                      <Icon size={20} />
                    </div>
                    <h4 className="font-display mt-4 text-base sm:text-lg font-bold text-[#0c1d43]">{feat.title}</h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#54739c]">{feat.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. VERIFIED CUSTOMER REVIEWS (PRESERVED) */}
      <section id="reviews" className="scroll-mt-20 border-y border-[#c8e1ec] bg-[#e9f8fc] py-14 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-6 sm:gap-8 lg:flex-row lg:items-end">
            <SectionIntro
              kicker="Customer Reviews"
              title="Loved by people across Pakistan."
              body="Real feedback from customers who upgraded their daily oral care routine with Sonic Brush® V5."
            />
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#79bfd1] bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 text-[.66rem] sm:text-[.72rem] font-bold uppercase tracking-wider text-[#17627e] shadow-2xs">
              <span className="size-2 rounded-full bg-[#10b981]" /> 100% Verified Customer Reviews
            </span>
          </div>

          <div className="mt-8 sm:mt-12 grid gap-5 sm:gap-6 md:grid-cols-3">
            {customerReviews.map((review) => (
              <motion.article
                key={review.id}
                whileHover={{ y: -4 }}
                data-testid={`card-review-${review.id}`}
                className="flex min-h-56 flex-col justify-between rounded-2xl sm:rounded-3xl border border-[#b7dce8] bg-white/95 p-5 sm:p-7 shadow-[0_8px_24px_rgba(30,99,128,.06)]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#f59e0b]">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="text-sm sm:text-base">★</span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#e6f7fb] px-2.5 py-1 text-[.6rem] sm:text-[.64rem] font-bold uppercase tracking-wider text-[#17627e]">
                      <Check size={11} className="text-[#10b981]" /> Verified Buyer
                    </span>
                  </div>
                  <h3 className="font-display mt-3.5 text-base sm:text-lg font-extrabold tracking-tight text-[#123d63]">{review.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#54768a]">{review.body}</p>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-[#e2eff5] pt-3.5 text-xs">
                  <div>
                    <span className="font-bold text-[#123d63]">{review.name}</span>
                    <span className="text-[#6d8a9e]"> · {review.location}</span>
                  </div>
                  <span className="rounded-md bg-[#eef7fa] px-2 py-0.5 font-medium text-[#467389] text-[11px]">{review.tag}</span>
                </div>
              </motion.article>
            ))}
          </div>
          <p className="mt-6 sm:mt-8 text-center text-xs font-semibold text-[#4f7785]">
            Overall 4.9/5 rating based on customer reviews across Pakistan. All orders include free nationwide delivery and WhatsApp customer support.
          </p>
        </div>
      </section>

      {/* 5. COLOR SELECTION & INSTANT ORDER SECTION (Replaces cumbersome form with clean card & Side Cart trigger) */}
      <section id="order" className="scroll-mt-20 py-14 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
          <SectionIntro
            center
            kicker="Direct Order"
            title="Choose Your Color & Order on WhatsApp"
            body="Select your favorite edition below and click Order to view your cart and proceed instantly."
          />

          {/* Color Selector */}
          <div className="mt-8 sm:mt-12 grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-4 max-w-4xl mx-auto">
            {colors.map((color) => (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                key={color.name}
                type="button"
                onClick={() => setSelectedColor(color.name)}
                className={`flex flex-col items-center rounded-2xl border p-3 sm:p-4 text-center transition-all ${
                  selectedColor === color.name
                    ? 'border-[#2454d8] bg-[#eff5ff] ring-2 ring-[#2454d8]/30 shadow-md'
                    : 'border-[#cbdcee] bg-white hover:border-[#7ca2e8]'
                }`}
              >
                <div className="aspect-square w-full overflow-hidden rounded-xl bg-white p-2">
                  <img src={color.image} alt={color.name} className="size-full object-contain" />
                </div>
                <span className="font-display mt-2 sm:mt-3 text-sm font-extrabold text-[#0c1d43]">{color.name}</span>
                <span className="text-[.68rem] sm:text-[.7rem] font-semibold text-[#5a769e]">
                  {selectedColor === color.name ? '✓ Selected' : 'In Stock'}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Clean Order Card (Replaces the form) */}
          <div className="mt-8 sm:mt-12 grid gap-8 lg:grid-cols-[1fr_1.15fr] max-w-5xl mx-auto">
            {/* What's In The Box */}
            <div className="rounded-2xl sm:rounded-3xl border border-[#d2e1f2] bg-[#f8fbff] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="eyebrow text-[#2454d8]">Complete Package</span>
                <h3 className="font-display mt-1.5 text-xl sm:text-2xl font-extrabold text-[#0c1d43]">What is In The Box</h3>
                <div className="mt-5 space-y-3">
                  {[
                    '1 × Sonic Brush® V5 Unit',
                    '1 × Food-Grade Silicone Mouthpiece',
                    '1 × Magnetic Wireless Charging Dock',
                    '1 × USB Fast Charging Cable',
                    '1 × User Guide & Warranty Card',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#3d5985]">
                      <PackageCheck size={17} className="text-[#2454d8] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 sm:mt-8 border-t border-[#d2e1f2] pt-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs sm:text-sm font-bold text-[#56749c]">Price Per Unit:</span>
                  <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#0c1d43]">{SELLING_PRICE}</span>
                </div>
                <p className="mt-1 text-[11px] sm:text-xs font-semibold text-[#10b981]">✓ Free Nationwide Delivery Included</p>
              </div>
            </div>

            {/* Instant Order Trigger Card */}
            <div className="rounded-2xl sm:rounded-3xl border border-[#cbdcf5] bg-white p-6 sm:p-8 shadow-[0_12px_36px_rgba(20,50,110,.07)] flex flex-col justify-between">
              <div>
                <span className="eyebrow text-[#10b981]">Express Order</span>
                <h3 className="font-display mt-1.5 text-xl sm:text-2xl font-extrabold text-[#0c1d43]">
                  Ready to Order {selectedColor} Edition?
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#54739c] leading-relaxed">
                  No lengthy forms needed. Click the button below to view your cart, choose quantity, and proceed directly to WhatsApp for instant confirmation.
                </p>

                {/* Selected Color Visual Confirmation */}
                <div className="mt-6 flex items-center gap-4 rounded-xl border border-[#e2edf8] bg-[#f8fbff] p-3.5">
                  <div className="size-14 shrink-0 overflow-hidden rounded-lg border border-[#cbdcee] bg-white p-1">
                    <img
                      src={colors.find((c) => c.name === selectedColor)?.image || blackProductImage}
                      alt={selectedColor}
                      className="size-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-display text-sm font-extrabold text-[#0c1d43]">Sonic Brush® V5 — {selectedColor}</p>
                    <p className="text-xs font-bold text-[#2454d8]">{SELLING_PRICE} · In Stock</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={() => openCartWithColor(selectedColor)}
                  className="w-full flex items-center justify-center gap-2.5 rounded-full bg-[#2454d8] hover:bg-[#193fae] active:scale-[.98] py-4 px-6 text-sm font-bold text-white shadow-[0_8px_24px_rgba(36,84,216,.28)] transition-all"
                >
                  <ShoppingCart size={18} />
                  <span>Order on WhatsApp (Open Cart)</span>
                  <ArrowRight size={16} />
                </button>
                <p className="text-center text-[11px] text-[#6b85a8]">
                  Free delivery across Pakistan · Order confirmed directly in WhatsApp
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ ACCORDION */}
      <section id="faq" className="scroll-mt-20 border-t border-[#dce6f5] bg-[#f4f8fe] py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-8">
          <SectionIntro
            center
            kicker="Frequently Asked Questions"
            title="Everything You Need To Know"
          />
          <div className="mt-8 sm:mt-12 space-y-3">
            {faqs.map(([q, a], idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="overflow-hidden rounded-xl sm:rounded-2xl border border-[#cbdcee] bg-white transition-shadow hover:shadow-xs">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="flex w-full items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm font-bold text-[#0c1d43] focus:outline-none"
                  >
                    <span>{q}</span>
                    <ChevronDown
                      size={17}
                      className={`text-[#2454d8] transition-transform duration-200 shrink-0 ml-3 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs leading-relaxed text-[#56749c] border-t border-[#f0f4fa] pt-3">{a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="border-t border-[#d8e4f5] bg-[#0c1d43] text-white py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <Wordmark inverted />
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#bad2f5]">
            <button onClick={() => jumpTo('how-it-works')} className="hover:text-white transition-colors">How it works</button>
            <button onClick={() => jumpTo('features')} className="hover:text-white transition-colors">Features</button>
            <button onClick={() => jumpTo('showcase')} className="hover:text-white transition-colors">Video Showcase</button>
            <button onClick={() => jumpTo('reviews')} className="hover:text-white transition-colors">Reviews</button>
            <button onClick={() => openCartWithColor()} className="hover:text-white transition-colors">Order (Cart)</button>
            <button onClick={() => jumpTo('faq')} className="hover:text-white transition-colors">FAQ</button>
          </div>
          <p className="text-[11px] sm:text-xs text-[#89aed9]">
            © {new Date().getFullYear()} Sonic Brush® V5. All rights reserved.
          </p>
        </div>
      </footer>

      {/* 8. FLOATING QUICK-ACTION BAR ON MOBILE */}
      <div className="fixed bottom-0 inset-x-0 z-50 p-3 bg-white/95 backdrop-blur-md border-t border-[#d8e4f5] shadow-[0_-6px_20px_rgba(0,0,0,.08)] sm:hidden flex items-center justify-between gap-3">
        <div>
          <p className="font-display text-xs font-extrabold text-[#0c1d43] leading-tight">Sonic Brush® V5</p>
          <p className="text-[10px] font-bold text-[#2454d8]">{SELLING_PRICE} · Free Delivery</p>
        </div>
        <button
          type="button"
          onClick={() => openCartWithColor()}
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-[#25d366] hover:bg-[#20bd5a] px-4 text-xs font-bold text-white shadow-[0_4px_12px_rgba(37,211,102,.35)] active:scale-95 transition-all"
        >
          <ShoppingCart size={14} />
          <span>View Cart</span>
        </button>
      </div>

      {/* 9. SIDE CART DRAWER */}
      <SideCartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        selectedColor={selectedColor}
        onSelectColor={setSelectedColor}
        quantity={quantity}
        onUpdateQuantity={setQuantity}
      />
    </main>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter>
          <ErrorBoundary>
            <Switch>
              <Route path="/" component={Home} />
              <Route component={NotFound} />
            </Switch>
            <Toaster />
          </ErrorBoundary>
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
