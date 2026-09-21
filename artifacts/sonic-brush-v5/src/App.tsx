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
  PackageCheck,
  Pause,
  Play,
  Send,
  ShieldCheck,
  Sparkles,
  Timer,
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
const SELLING_PRICE = 'PKR 25,000';
const DELIVERY_OFFER = 'Delivery included — no additional charge';

const colors = [
  { name: 'Black', image: blackProductImage, tint: '#10224a' },
  { name: 'White', image: whiteProductImage, tint: '#eaf1fb' },
  { name: 'Pink', image: pinkProductImage, tint: '#f7dfe7' },
  { name: 'Blue', image: blueProductImage, tint: '#d7f7fb' },
];

const faqs = [
  ['How does the Sonic Brush® V5 clean all teeth in 30 seconds?', 'The food-grade silicone mouthpiece wraps comfortably around your entire upper and lower dental arches simultaneously. Driven by high-frequency sonic vibrations (up to 45,000 rpm), it cleans every tooth surface at once rather than one tooth at a time.'],
  ['Is it safe for sensitive teeth and gums?', 'Yes! Unlike hard nylon bristles that can abrade enamel or irritate gums, the soft antimicrobial silicone bristles gently stimulate gum blood flow while lifting away plaque without abrasive friction.'],
  ['How long does the battery last on a single charge?', 'A single full charge on the magnetic induction charging dock delivers up to 30 brushing sessions (approximately 2 to 3 weeks of daily use).'],
  ['Is it waterproof?', 'Yes, the Sonic Brush® V5 is IPX7 waterproof certified. You can comfortably use and rinse it directly under running water.'],
  ['How do I place an order?', 'Simply select your preferred color and click "Order on WhatsApp". We confirm your shipping address and prepare your order with free nationwide delivery across Pakistan.'],
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
    tag: '30-Second Clean',
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
    tag: 'Sonic Technology',
    title: 'Precision Silicone & Wireless Dock',
    description: 'A macro look at the antibacterial silicone bristles, 4 custom sonic frequency modes, and the inductive wireless charging station.',
  },
];

function whatsappMessage(text: string) {
  const normalizedNumber = WHATSAPP_NUMBER.replace(/[^0-9]/g, '');
  const url = `https://wa.me/${normalizedNumber}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function orderMessage(color: string, quantity = 1, address = '', city = '', name = '', phone = '') {
  const parts = [
    'Hello, I would like to order the Sonic Brush® V5.',
    `Selected Color: ${color}`,
    `Quantity: ${quantity}`,
    `Price: ${SELLING_PRICE} (Free Delivery Included)`,
  ];
  if (name) parts.push(`Name: ${name}`);
  if (phone) parts.push(`Phone: ${phone}`);
  if (city) parts.push(`City: ${city}`);
  if (address) parts.push(`Delivery Address: ${address}`);
  parts.push('Please confirm availability and share payment/delivery details.');
  return parts.join('\n');
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
  variant?: 'primary' | 'outline' | 'quiet';
  className?: string;
  type?: 'button' | 'submit';
  testId?: string;
}) {
  const styles = {
    primary: 'bg-[#2454d8] text-[#fbfcff] hover:bg-[#193fae] shadow-[0_12px_28px_rgba(36,84,216,.24)] hover:shadow-[0_16px_32px_rgba(36,84,216,.34)]',
    outline: 'border border-[#9eb6e4] bg-white/70 text-[#19356e] hover:border-[#2454d8] hover:bg-[#edf3ff]',
    quiet: 'text-[#365a9d] hover:text-[#19356e] hover:bg-[#edf3ff]',
  };
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      data-testid={testId}
      onClick={onClick}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2454d8] focus-visible:ring-offset-2 ${styles[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}

function SonicMark({ inverted = false }: { inverted?: boolean }) {
  const markColor = inverted ? '#28c7e7' : '#2454d8';
  const waveColor = inverted ? '#10244c' : '#fbfcff';

  return (
    <svg aria-hidden="true" viewBox="0 0 40 40" className="size-9 shrink-0" fill="none">
      <rect x="1" y="1" width="38" height="38" rx="13" fill={markColor} />
      <path d="M8 22.5h4l2.7-8.5 3.8 14 3.7-17 2.4 8.5H32" stroke={waveColor} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 29.5h22" stroke={waveColor} strokeOpacity=".45" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function Wordmark({ inverted = false }: { inverted?: boolean }) {
  return (
    <a href="#top" data-testid="link-wordmark" className="flex shrink-0 items-center gap-2.5">
      <SonicMark inverted={inverted} />
      <span className={`font-display text-[.9rem] font-extrabold tracking-[-.04em] ${inverted ? 'text-[#f2f6ee]' : 'text-[#10244c]'}`}>
        SONIC BRUSH<span className="text-[#28c7e7]">®</span>
      </span>
    </a>
  );
}

function SectionIntro({ kicker, title, body, light = false, center = false }: { kicker: string; title: string; body?: string; light?: boolean; center?: boolean }) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''} ${light ? 'text-[#f7f5ed]' : 'text-[#153d3a]'}`}>
      <p className={`eyebrow mb-3 ${light ? 'text-[#b7d8c7]' : 'text-[#147367]'}`}>{kicker}</p>
      <h2 className="font-display text-[clamp(2rem,6vw,3.6rem)] font-extrabold leading-[1.04] tracking-[-.055em]">{title}</h2>
      {body && <p className={`mt-4 max-w-xl text-base leading-7 ${center ? 'mx-auto' : ''} ${light ? 'text-[#c1d9d1]' : 'text-[#5c7772]'}`}>{body}</p>}
    </div>
  );
}

/** 
 * Header Video Component (The single featured video in hero) 
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
    <div className="relative isolate overflow-hidden rounded-[2.2rem] border border-[#cbdcf5] bg-[#0c1d43] shadow-[0_24px_64px_rgba(20,50,110,.22)]">
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/11]">
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
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07132f]/85 via-transparent to-[#102e6e]/25" />

        {/* Floating pulse badge */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/25 bg-[#091737]/80 px-3.5 py-1.5 backdrop-blur-md"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#28c7e7] opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-[#28c7e7]" />
          </span>
          <span className="font-mono text-[.66rem] font-bold uppercase tracking-wider text-[#d4ecff]">
            360° Sonic Clean
          </span>
        </motion.div>

        {/* Floating time badge */}
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/15 px-3 py-1 font-mono text-[.64rem] font-bold text-white backdrop-blur-md"
        >
          30 SECONDS
        </motion.div>

        {/* Play/Pause Button & Caption */}
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
          <div>
            <p className="font-display text-base font-extrabold text-white sm:text-lg">Sonic Brush® V5</p>
            <p className="text-xs text-[#a9c9f4]">Wrap-around U-shaped mouthpiece in action</p>
          </div>
          <button
            type="button"
            data-testid="hero-play-pause"
            onClick={toggle}
            className="grid size-12 shrink-0 place-items-center rounded-full bg-[#28c7e7] text-[#07132f] shadow-[0_8px_24px_rgba(40,199,231,.35)] transition-transform hover:scale-105 active:scale-95"
          >
            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
            <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Unified Video Showcase Carousel for all other videos
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
    <div className="relative mx-auto max-w-5xl">
      {/* Video tabs selector */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {showcaseVideos.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setActiveIdx(idx)}
            className={`group inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all ${
              activeIdx === idx
                ? 'bg-[#2454d8] text-white shadow-[0_6px_20px_rgba(36,84,216,.28)]'
                : 'border border-[#c5d8f0] bg-white/80 text-[#3d5985] hover:border-[#2454d8] hover:bg-[#eef4ff]'
            }`}
          >
            <span className={`size-1.5 rounded-full ${activeIdx === idx ? 'bg-[#28c7e7]' : 'bg-[#9cb6d8]'}`} />
            {item.tag}
          </button>
        ))}
      </div>

      {/* Main Carousel Screen */}
      <div className="relative overflow-hidden rounded-3xl border border-[#cbdcf5] bg-[#0c1d43] shadow-[0_20px_50px_rgba(16,40,90,.16)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeVideo.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35 }}
            className="relative aspect-video w-full min-h-[300px] sm:min-h-[420px]"
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
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#061026]/90 via-transparent to-[#0a1e48]/30" />

            {/* Top Tag & Slide Counter */}
            <div className="absolute inset-x-5 top-5 flex items-center justify-between text-white">
              <span className="rounded-full border border-white/25 bg-black/40 px-3.5 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                {activeVideo.tag}
              </span>
              <span className="rounded-full bg-white/20 px-3 py-1 font-mono text-xs font-semibold backdrop-blur-md">
                {activeIdx + 1} / {showcaseVideos.length}
              </span>
            </div>

            {/* Bottom Controls & Info */}
            <div className="absolute inset-x-5 bottom-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div className="max-w-xl text-white">
                <h3 className="font-display text-lg font-extrabold tracking-tight sm:text-2xl">{activeVideo.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#bad2f5] sm:text-sm">{activeVideo.description}</p>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="grid size-11 place-items-center rounded-full bg-[#28c7e7] text-[#07132f] shadow-[0_4px_16px_rgba(40,199,231,.4)] transition-transform hover:scale-105 active:scale-95"
                >
                  {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                </button>
                <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 p-1 backdrop-blur-md">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous video"
                    className="grid size-9 place-items-center rounded-full text-white transition-colors hover:bg-white/20"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next video"
                    className="grid size-9 place-items-center rounded-full text-white transition-colors hover:bg-white/20"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot Indicators */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {showcaseVideos.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIdx === i ? 'w-8 bg-[#2454d8]' : 'w-2 bg-[#b7cde6] hover:bg-[#86a8d3]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function Home() {
  const [selectedColor, setSelectedColor] = useState('Black');
  const [openFaq, setOpenFaq] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const jumpTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const submitOrder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const color = String(data.get('color') || selectedColor);
    const quantity = Number(data.get('quantity') || 1);
    const name = String(data.get('name') || '');
    const phone = String(data.get('phone') || '');
    const city = String(data.get('city') || '');
    const address = String(data.get('address') || '');
    const msg = orderMessage(color, quantity, address, city, name, phone);
    setSubmitted(true);
    whatsappMessage(msg);
  };

  return (
    <main id="top" className="page-grain min-h-dvh bg-[#fbfcff] pb-20 text-[#10244c]">
      {/* Top Banner Notice */}
      <div className="bg-[#0b1b3d] px-4 py-2 text-center text-xs font-semibold text-[#bfe4f2]">
        <span className="inline-flex items-center gap-2">
          <Sparkles size={14} className="text-[#28c7e7]" />
          Direct WhatsApp Checkout · {DELIVERY_OFFER} Across Pakistan · {SELLING_PRICE}
        </span>
      </div>

      {/* Sticky Header Navbar */}
      <header className="sticky top-0 z-40 border-b border-[#d8e4f5] bg-[#fbfcff]/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <Wordmark />
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
            <button onClick={() => jumpTo('how-it-works')} className="text-sm font-semibold text-[#53698d] hover:text-[#2454d8] transition-colors">How it works</button>
            <button onClick={() => jumpTo('features')} className="text-sm font-semibold text-[#53698d] hover:text-[#2454d8] transition-colors">Features</button>
            <button onClick={() => jumpTo('showcase')} className="text-sm font-semibold text-[#53698d] hover:text-[#2454d8] transition-colors">Video Showcase</button>
            <button onClick={() => jumpTo('reviews')} className="text-sm font-semibold text-[#53698d] hover:text-[#2454d8] transition-colors">Reviews</button>
            <button onClick={() => jumpTo('order')} className="text-sm font-semibold text-[#53698d] hover:text-[#2454d8] transition-colors">Order Now</button>
            <button onClick={() => jumpTo('faq')} className="text-sm font-semibold text-[#53698d] hover:text-[#2454d8] transition-colors">FAQ</button>
          </nav>
          <div className="hidden sm:block">
            <Button onClick={() => jumpTo('order')} className="!min-h-10 !px-5 text-xs">
              Order on WhatsApp <ArrowUpRight size={15} />
            </Button>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="grid size-11 place-items-center rounded-full border border-[#c2d3ed] text-[#19356e] md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-[#dbe5f5] bg-[#fbfcff] px-5 py-4 md:hidden"
            aria-label="Mobile navigation"
          >
            {['how-it-works', 'features', 'showcase', 'reviews', 'order', 'faq'].map((item) => (
              <button
                key={item}
                onClick={() => jumpTo(item)}
                className="block w-full py-3 text-left text-sm font-bold capitalize text-[#315181]"
              >
                {item.replaceAll('-', ' ')}
              </button>
            ))}
            <Button onClick={() => jumpTo('order')} className="mt-3 w-full">
              Order on WhatsApp <ArrowUpRight size={16} />
            </Button>
          </motion.nav>
        )}
      </header>

      {/* 1. HERO SECTION (Features 1 premier video in header) */}
      <section className="relative mx-auto max-w-7xl px-5 pt-12 pb-16 sm:px-8 sm:pt-16 lg:px-12 lg:pt-20 lg:pb-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#b8d2eb] bg-[#eef5fc] px-4 py-1.5 text-xs font-bold text-[#1f4eaf]">
              <Sparkles size={14} className="text-[#2454d8]" />
              Sonic Brush® V5 — Pakistan Edition
            </div>
            <h1 className="font-display mt-6 text-[clamp(2.4rem,7vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-.06em] text-[#0c1d43]">
              Brush every tooth in 30 seconds.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-[#4b6389] sm:text-lg">
              Upgrade to automatic 360° sonic cleaning. The wrap-around soft silicone mouthpiece covers all upper and lower teeth at once for effortless, dentist-grade oral care.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button onClick={() => jumpTo('order')}>
                Order on WhatsApp · {SELLING_PRICE} <ArrowUpRight size={17} />
              </Button>
              <Button variant="outline" onClick={() => jumpTo('showcase')}>
                Watch Videos <ArrowDown size={17} />
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-[#d8e4f5] pt-6 text-center sm:text-left">
              <div>
                <p className="font-display text-2xl font-extrabold text-[#0c1d43]">30 Sec</p>
                <p className="text-xs font-semibold text-[#5a769e]">Auto Timer</p>
              </div>
              <div>
                <p className="font-display text-2xl font-extrabold text-[#0c1d43]">45,000</p>
                <p className="text-xs font-semibold text-[#5a769e]">Sonic RPM</p>
              </div>
              <div>
                <p className="font-display text-2xl font-extrabold text-[#0c1d43]">IPX7</p>
                <p className="text-xs font-semibold text-[#5a769e]">100% Waterproof</p>
              </div>
            </div>
          </motion.div>

          {/* 1 Video in header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <HeroVideoPlayer src={heroVideo} poster={blackProductImage} />
          </motion.div>
        </div>
      </section>

      {/* 2. VIDEO SHOWCASE CAROUSEL (Unified Carousel for all other videos) */}
      <section id="showcase" className="scroll-mt-24 border-y border-[#dbe6f5] bg-[#f1f6ff] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <SectionIntro
            center
            kicker="Video Gallery"
            title="See Sonic Brush® V5 In Action"
            body="Watch real demonstrations of the 30-second brushing routine, ergonomic mouthpiece, and waterproof wireless dock."
          />
          <div className="mt-12">
            <VideoCarousel />
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS & FEATURES (Unified & Clean) */}
      <section id="how-it-works" className="scroll-mt-24 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <SectionIntro
            kicker="Effortless Routine"
            title="3 Simple Steps. Done in 30 Seconds."
            body="No manual scrubbing, no awkward angles, no sore gums."
          />

          {/* 3 Steps */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
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
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  whileHover={{ y: -4 }}
                  className="rounded-3xl border border-[#d2e1f2] bg-white p-8 shadow-[0_10px_30px_rgba(20,50,110,.05)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#2454d8]">STEP {item.step}</span>
                    <div className="grid size-10 place-items-center rounded-2xl bg-[#edf4ff] text-[#2454d8]">
                      <Icon size={20} />
                    </div>
                  </div>
                  <h3 className="font-display mt-6 text-xl font-extrabold text-[#0c1d43]">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-6 text-[#567298]">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* 4 Core Features */}
          <div id="features" className="scroll-mt-24 mt-20 pt-16 border-t border-[#dce6f5]">
            <SectionIntro
              kicker="Designed for Excellence"
              title="Everything Built For Your Smile"
              body="Engineered with clinical-grade materials for optimal hygiene and daily convenience."
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                    whileHover={{ y: -4 }}
                    className="rounded-2xl border border-[#d2e1f2] bg-[#f8fbff] p-6 shadow-xs"
                  >
                    <div className="grid size-11 place-items-center rounded-xl bg-[#2454d8] text-white">
                      <Icon size={22} />
                    </div>
                    <h4 className="font-display mt-5 text-lg font-bold text-[#0c1d43]">{feat.title}</h4>
                    <p className="mt-2 text-xs leading-5 text-[#54739c]">{feat.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. VERIFIED CUSTOMER REVIEWS (PRESERVED AS REQUESTED) */}
      <section id="reviews" className="scroll-mt-24 border-y border-[#c8e1ec] bg-[#e9f8fc] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionIntro
              kicker="Customer Reviews"
              title="Loved by people across Pakistan."
              body="Real feedback from customers who upgraded their daily oral care routine with Sonic Brush® V5."
            />
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#79bfd1] bg-white/80 px-4 py-2 text-[.72rem] font-bold uppercase tracking-wider text-[#17627e] shadow-xs">
              <span className="size-2 rounded-full bg-[#10b981]" /> 100% Verified Customer Reviews
            </span>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {customerReviews.map((review) => (
              <motion.article
                key={review.id}
                whileHover={{ y: -5 }}
                data-testid={`card-review-${review.id}`}
                className="flex min-h-60 flex-col justify-between rounded-3xl border border-[#b7dce8] bg-white/95 p-7 shadow-[0_12px_32px_rgba(30,99,128,.07)]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#f59e0b]">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="text-base">★</span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#e6f7fb] px-2.5 py-1 text-[.64rem] font-bold uppercase tracking-wider text-[#17627e]">
                      <Check size={12} className="text-[#10b981]" /> Verified Buyer
                    </span>
                  </div>
                  <h3 className="font-display mt-4 text-lg font-extrabold tracking-tight text-[#123d63]">{review.title}</h3>
                  <p className="mt-2.5 text-sm leading-6 text-[#54768a]">{review.body}</p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-[#e2eff5] pt-4 text-xs">
                  <div>
                    <span className="font-bold text-[#123d63]">{review.name}</span>
                    <span className="text-[#6d8a9e]"> · {review.location}</span>
                  </div>
                  <span className="rounded-md bg-[#eef7fa] px-2.5 py-1 font-medium text-[#467389]">{review.tag}</span>
                </div>
              </motion.article>
            ))}
          </div>
          <p className="mt-8 text-center text-xs font-semibold text-[#4f7785]">
            Overall 4.9/5 rating based on customer reviews across Pakistan. All orders include free nationwide delivery and WhatsApp customer support.
          </p>
        </div>
      </section>

      {/* 5. COLOR SELECTION & ORDER SECTION (High Converting) */}
      <section id="order" className="scroll-mt-24 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <SectionIntro
            center
            kicker="Direct Order"
            title="Choose Your Color & Order on WhatsApp"
            body="Fast, manual order confirmation with free nationwide courier delivery."
          />

          {/* Color Selector */}
          <div className="mt-12 grid gap-4 grid-cols-2 sm:grid-cols-4 max-w-4xl mx-auto">
            {colors.map((color) => (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                key={color.name}
                type="button"
                onClick={() => setSelectedColor(color.name)}
                className={`flex flex-col items-center rounded-2xl border p-4 text-center transition-all ${
                  selectedColor === color.name
                    ? 'border-[#2454d8] bg-[#eff5ff] ring-2 ring-[#2454d8]/30 shadow-md'
                    : 'border-[#cbdcee] bg-white hover:border-[#7ca2e8]'
                }`}
              >
                <div className="aspect-square w-full overflow-hidden rounded-xl bg-white p-2">
                  <img src={color.image} alt={color.name} className="size-full object-contain" />
                </div>
                <span className="font-display mt-3 text-sm font-extrabold text-[#0c1d43]">{color.name}</span>
                <span className="text-[.7rem] font-semibold text-[#5a769e]">
                  {selectedColor === color.name ? '✓ Selected' : 'In Stock'}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Order Form & Package Details */}
          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr] max-w-5xl mx-auto">
            {/* What's In The Box & Price */}
            <div className="rounded-3xl border border-[#d2e1f2] bg-[#f8fbff] p-7 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="eyebrow text-[#2454d8]">Complete Package</span>
                <h3 className="font-display mt-2 text-2xl font-extrabold text-[#0c1d43]">What is In The Box</h3>
                <div className="mt-6 space-y-3">
                  {[
                    '1 × Sonic Brush® V5 Unit',
                    '1 × Food-Grade Silicone Mouthpiece',
                    '1 × Magnetic Wireless Charging Dock',
                    '1 × USB Fast Charging Cable',
                    '1 × User Guide & Warranty Card',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm font-semibold text-[#3d5985]">
                      <PackageCheck size={18} className="text-[#2454d8] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 border-t border-[#d2e1f2] pt-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-bold text-[#56749c]">Total Price:</span>
                  <span className="font-display text-3xl font-extrabold text-[#0c1d43]">{SELLING_PRICE}</span>
                </div>
                <p className="mt-1 text-xs font-semibold text-[#10b981]">✓ Free Delivery Nationwide · Verified Payment on WhatsApp</p>
              </div>
            </div>

            {/* Quick Order Form */}
            <form onSubmit={submitOrder} className="rounded-3xl border border-[#cbdcf5] bg-white p-7 sm:p-8 shadow-[0_12px_36px_rgba(20,50,110,.07)]">
              <h3 className="font-display text-xl font-extrabold text-[#0c1d43]">Enter Details for Quick Dispatch</h3>
              <p className="mt-1 text-xs text-[#56749c]">Your pre-filled message will open directly in WhatsApp.</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5d7770]">Full Name</span>
                  <input required name="name" type="text" placeholder="Your name" className="h-11 w-full rounded-xl border border-[#cbdcee] bg-white px-3.5 text-sm text-[#10244c] outline-none focus:border-[#2454d8] focus:ring-2 focus:ring-[#2454d8]/20" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5d7770]">WhatsApp Number</span>
                  <input required name="phone" type="tel" placeholder="+92 300 0000000" className="h-11 w-full rounded-xl border border-[#cbdcee] bg-white px-3.5 text-sm text-[#10244c] outline-none focus:border-[#2454d8] focus:ring-2 focus:ring-[#2454d8]/20" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5d7770]">City</span>
                  <input required name="city" type="text" placeholder="e.g. Lahore, Karachi" className="h-11 w-full rounded-xl border border-[#cbdcee] bg-white px-3.5 text-sm text-[#10244c] outline-none focus:border-[#2454d8] focus:ring-2 focus:ring-[#2454d8]/20" />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5d7770]">Complete Delivery Address</span>
                  <textarea required name="address" rows={2} placeholder="House/Flat #, Street, Area" className="w-full rounded-xl border border-[#cbdcee] bg-white p-3 text-sm text-[#10244c] outline-none focus:border-[#2454d8] focus:ring-2 focus:ring-[#2454d8]/20" />
                </label>
                <input type="hidden" name="color" value={selectedColor} />
                <input type="hidden" name="quantity" value="1" />
              </div>

              <Button type="submit" className="mt-6 w-full">
                Continue on WhatsApp <ArrowUpRight size={17} />
              </Button>
              {submitted && (
                <p className="mt-3 text-center text-xs font-semibold text-[#10b981]">
                  WhatsApp draft opened! Our team will confirm your order details.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* 6. FAQ ACCORDION SECTION */}
      <section id="faq" className="scroll-mt-24 border-t border-[#dce6f5] bg-[#f4f8fe] py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <SectionIntro
            center
            kicker="Frequently Asked Questions"
            title="Everything You Need To Know"
          />
          <div className="mt-12 space-y-3.5">
            {faqs.map(([q, a], idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="overflow-hidden rounded-2xl border border-[#cbdcee] bg-white transition-shadow hover:shadow-xs">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="flex w-full items-center justify-between p-5 text-left text-sm font-bold text-[#0c1d43] focus:outline-none"
                  >
                    <span>{q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-[#2454d8] transition-transform duration-200 shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`}
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
                        <p className="px-5 pb-5 text-xs leading-6 text-[#56749c] border-t border-[#f0f4fa] pt-3">{a}</p>
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
      <footer className="border-t border-[#d8e4f5] bg-[#0c1d43] text-white py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Wordmark inverted />
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#bad2f5]">
            <button onClick={() => jumpTo('how-it-works')} className="hover:text-white transition-colors">How it works</button>
            <button onClick={() => jumpTo('features')} className="hover:text-white transition-colors">Features</button>
            <button onClick={() => jumpTo('showcase')} className="hover:text-white transition-colors">Video Showcase</button>
            <button onClick={() => jumpTo('reviews')} className="hover:text-white transition-colors">Reviews</button>
            <button onClick={() => jumpTo('order')} className="hover:text-white transition-colors">Order</button>
            <button onClick={() => jumpTo('faq')} className="hover:text-white transition-colors">FAQ</button>
          </div>
          <p className="text-xs text-[#89aed9]">
            © {new Date().getFullYear()} Sonic Brush® V5. All rights reserved.
          </p>
        </div>
      </footer>
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
