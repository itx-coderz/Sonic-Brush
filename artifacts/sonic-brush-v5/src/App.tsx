import { type FormEvent, type ReactNode, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowDown,
  ArrowUpRight,
  BatteryCharging,
  Check,
  ChevronDown,
  CircleHelp,
  Grid2X2,
  HeartPulse,
  Menu,
  PackageCheck,
  Pause,
  Play,
  Send,
  ShieldCheck,
  Sparkles,
  X,
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
  ['How does the Sonic Brush® V5 work?', 'It uses sonic vibrations through a wrap-around mouthpiece design to simplify the brushing experience.'],
  ['How long is the brushing cycle?', 'The product is designed around a 30-second full-mouth brushing cycle.'],
  ['What colors are available?', 'Black, White, Pink and Blue, subject to current stock.'],
  ['How do I order?', 'Click any Order on WhatsApp button and send your details. We will confirm availability and provide payment instructions.'],
  ['Is COD available?', 'COD is currently not available. Orders are confirmed after payment verification.'],
  ['How do I pay?', 'After your order details are confirmed through WhatsApp, you will receive the available payment instructions.'],
  ['How many uses per charge?', 'The product information specifies up to 30 uses per charge. Actual battery performance can vary depending on usage.'],
  ['What comes in the box?', '1 Sonic Brush® V5, 1 USB charging cable, 1 charging station and 1 user manual, subject to the actual supplied package.'],
];

function whatsappMessage(message: string) {
  const number = WHATSAPP_NUMBER.replace(/[^\d]/g, '');
  const base = number ? `https://wa.me/${number}` : 'https://wa.me/';
  window.open(`${base}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
}

function orderMessage(color?: string) {
  return `Hi, I'd like to order the Sonic Brush® V5${color ? ` in ${color}` : ''}.\n\nUnit price: ${SELLING_PRICE}\nDelivery: included at no additional charge.\n\nPlease confirm availability and share payment instructions.`;
}

function Button({
  children,
  onClick,
  variant = 'primary',
  className = '',
  testId,
  type = 'button',
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'quiet';
  className?: string;
  testId: string;
  type?: 'button' | 'submit';
}) {
  const styles = {
    primary: 'bg-[#2454d8] text-[#fbfcff] hover:bg-[#193fae] shadow-[0_12px_28px_rgba(36,84,216,.2)]',
    outline: 'border border-[#9eb6e4] bg-transparent text-[#19356e] hover:border-[#2454d8] hover:bg-[#edf3ff]',
    quiet: 'text-[#365a9d] hover:text-[#19356e] hover:bg-[#edf3ff]',
  };
  return (
    <button type={type} data-testid={testId} onClick={onClick} className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold transition-all duration-200 active:scale-[.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2454d8] focus-visible:ring-offset-2 ${styles[variant]} ${className}`}>
      {children}
    </button>
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
      <span className={`font-display text-[.85rem] font-extrabold tracking-[-.04em] ${inverted ? 'text-[#f2f6ee]' : 'text-[#10244c]'}`}>SONIC BRUSH<span className="text-[#28c7e7]">®</span></span>
    </a>
  );
}

function VideoMedia({
  src,
  label,
  title,
  poster,
  large = false,
  autoplay = false,
  controls = false,
  testId,
}: {
  src: string;
  label: string;
  title: string;
  poster: string;
  large?: boolean;
  autoplay?: boolean;
  controls?: boolean;
  testId: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div className={`relative isolate overflow-hidden rounded-4xl border border-[#b8c9e7] bg-[#0c1d43] ${large ? 'min-h-100 sm:min-h-130' : 'min-h-65'}`} data-testid={testId}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoplay}
        muted
        playsInline
        loop
        controls={controls}
        preload={autoplay ? 'auto' : 'metadata'}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        aria-label={title}
        className="absolute inset-0 size-full object-cover object-center"
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#07132f]/80 via-transparent to-[#123f8a]/20" />
      <div className="absolute inset-x-5 top-5 flex items-center justify-between text-[#f6fbff]">
        <span className="eyebrow drop-shadow-sm">{label}</span>
        <span className="rounded-full border border-white/35 bg-[#0a1a3d]/45 px-3 py-1 text-[.62rem] font-bold uppercase tracking-[.12em] backdrop-blur-sm">Product video</span>
      </div>
      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
        <p className="max-w-[18rem] text-sm font-semibold leading-snug text-[#f6fbff] drop-shadow-sm">{title}</p>
        <button type="button" data-testid={`${testId}-play-pause`} onClick={togglePlayback} className="grid size-12 shrink-0 place-items-center rounded-full bg-[#28c7e7] text-[#07132f] shadow-[0_8px_24px_rgba(40,199,231,.25)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#28c7e7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c1d43]">
          {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
          <span className="sr-only">{isPlaying ? 'Pause product video' : 'Play product video'}</span>
        </button>
      </div>
    </div>
  );
}

function SectionIntro({ kicker, title, body, light = false }: { kicker: string; title: string; body?: string; light?: boolean }) {
  return (
    <div className={`max-w-2xl ${light ? 'text-[#f7f5ed]' : 'text-[#153d3a]'}`}>
      <p className={`eyebrow mb-4 ${light ? 'text-[#b7d8c7]' : 'text-[#147367]'}`}>{kicker}</p>
      <h2 className="font-display text-[clamp(2rem,8vw,4.2rem)] font-extrabold leading-[.98] tracking-[-.065em]">{title}</h2>
      {body && <p className={`mt-5 max-w-xl text-base leading-7 ${light ? 'text-[#c1d9d1]' : 'text-[#5c7772]'}`}>{body}</p>}
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

  const submitOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = `Hi! I want to order the Sonic Brush® V5.\n\nName: ${form.get('name') || ''}\nCity: ${form.get('city') || ''}\nAddress: ${form.get('address') || ''}\nPhone: ${form.get('phone') || ''}\nColor: ${form.get('color') || selectedColor}\nQuantity: ${form.get('quantity') || '1'}\n\nUnit price: ${SELLING_PRICE}\nDelivery: included at no additional charge.\n\nPlease confirm availability and share payment instructions.`;
    setSubmitted(true);
    whatsappMessage(message);
  };

  return (
    <main id="top" className="page-grain min-h-dvh bg-[#fbfcff] pb-24">
      <header className="sticky top-0 z-20 border-b border-[#dbe5f5]/80 bg-[#fbfcff]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <Wordmark />
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
            <button data-testid="link-how-it-works" onClick={() => jumpTo('how-it-works')} className="text-sm font-semibold text-[#53698d] hover:text-[#2454d8]">How it works</button>
            <button data-testid="link-features" onClick={() => jumpTo('features')} className="text-sm font-semibold text-[#53698d] hover:text-[#2454d8]">Features</button>
            <button data-testid="link-reviews" onClick={() => jumpTo('reviews')} className="text-sm font-semibold text-[#53698d] hover:text-[#2454d8]">Reviews</button>
            <button data-testid="link-faq" onClick={() => jumpTo('faq')} className="text-sm font-semibold text-[#53698d] hover:text-[#2454d8]">FAQ</button>
          </nav>
          <div className="flex items-center gap-2">
            <Button testId="button-header-order" className="hidden sm:inline-flex" onClick={() => whatsappMessage(orderMessage(selectedColor))}>Order on WhatsApp <ArrowUpRight size={16} /></Button>
            <button data-testid="button-mobile-menu" onClick={() => setMenuOpen(!menuOpen)} className="grid size-11 place-items-center rounded-full border border-[#c2d3ed] text-[#19356e] md:hidden">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
              <span className="sr-only">Open menu</span>
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="border-t border-[#dbe5f5] px-5 py-4 md:hidden" aria-label="Mobile navigation">
            {['how-it-works', 'features', 'reviews', 'faq'].map((item) => (
              <button key={item} data-testid={`link-mobile-${item}`} onClick={() => jumpTo(item)} className="block w-full py-3 text-left text-sm font-bold capitalize text-[#315181]">{item.replaceAll('-', ' ')}</button>
            ))}
          </nav>
        )}
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-12 sm:px-8 sm:pt-20 lg:grid-cols-[.84fr_1.16fr] lg:items-center lg:gap-16 lg:px-12 lg:pb-28 lg:pt-20">
        <div className="reveal">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#acdff0] bg-[#edfaff] px-3.5 py-2 text-[.66rem] font-bold uppercase tracking-[.14em] text-[#195ea3]">
            <span className="size-1.5 rounded-full bg-[#28c7e7]" /> Limited stock available
          </div>
          <h1 className="max-w-2xl font-display text-[clamp(3.2rem,14vw,7.3rem)] font-extrabold leading-[.87] tracking-[-.085em] text-[#10244c]">Meet the <span className="text-[#2454d8]">smarter</span> way to brush.</h1>
           <p className="mt-7 max-w-md text-lg leading-8 text-[#5d6f8b]">Full-mouth sonic cleaning in a simple, hands-free routine. {SELLING_PRICE} per unit, with delivery included at no additional charge.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button testId="button-hero-order" onClick={() => whatsappMessage(orderMessage(selectedColor))}>Order now on WhatsApp <ArrowUpRight size={17} /></Button>
            <Button testId="button-hero-action" variant="outline" onClick={() => jumpTo('action')}>See how it works <ArrowDown size={17} /></Button>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-[#5d6f8b]">
            <span className="inline-flex items-center gap-1.5"><ShieldCheck size={15} className="text-[#2454d8]" /> Manual order confirmation</span>
            <span className="inline-flex items-center gap-1.5"><Check size={15} className="text-[#2454d8]" /> Payment verified via WhatsApp</span>
          </div>
        </div>
        <div className="reveal-delay">
          <VideoMedia src={heroVideo} poster={blackProductImage} label="Video 01 / Product in action" title="A closer look at the wrap-around mouthpiece and the Sonic Brush® V5." large autoplay testId="media-hero-overview" />
        </div>
      </section>

      <section className="border-y border-[#dbe5f5] bg-[#f1f6ff]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.7fr_1.3fr] lg:px-12 lg:py-24">
          <SectionIntro kicker="A small daily friction" title="Still brushing tooth by tooth?" body="Traditional brushing takes time, requires consistent technique, and can be easy to rush when you're busy." />
          <div className="flex flex-col justify-end lg:pl-16">
            <div className="mb-8 h-px w-24 bg-[#82bde9]" />
            <p className="font-display text-[clamp(2rem,7vw,4.5rem)] font-extrabold leading-[.98] tracking-[-.07em] text-[#2454d8]">What if your daily brushing routine could be simpler?</p>
            <button data-testid="button-problem-scroll" onClick={() => jumpTo('action')} className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-bold text-[#315aa8] underline decoration-[#82bde9] underline-offset-8">See the difference <ArrowDown size={16} /></button>
          </div>
        </div>
      </section>

      <section id="action" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionIntro kicker="The product, in focus" title="See the Sonic Brush® V5 in action." body="Designed around a full-mouth brushing experience with sonic vibrations and a wrap-around mouthpiece." />
          <span className="max-w-52 text-sm font-semibold leading-6 text-[#5d6f8b]">Official video showing the Sonic Brush® V5 30-second brushing routine in action.</span>
        </div>
        <div className="mt-10">
          <VideoMedia src={brushingVideo} poster={whiteProductImage} label="Video 02 / 30-second brushing routine" title="Notice the wrap-around mouthpiece and one-press routine." large testId="media-30-second-brushing" />
        </div>
        <div className="flex flex-col justify-between gap-5 border-b border-[#d7e2f2] py-7 sm:flex-row sm:items-center">
          <p className="font-display text-2xl font-extrabold tracking-[-.04em] text-[#10244c]">One press. A simpler brushing routine.</p>
          <Button testId="button-action-order" onClick={() => whatsappMessage(orderMessage(selectedColor))}>Order on WhatsApp <ArrowUpRight size={16} /></Button>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 bg-[#0c1d43] text-[#f6fbff]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <SectionIntro light kicker="Built around 30 seconds" title="Your brushing routine, simplified." body="Sonic Brush® V5 is designed to clean all teeth simultaneously, helping make everyday brushing faster and easier." />
          <div className="mt-14 grid gap-0 border-t border-[#35528c] md:grid-cols-3">
            {[
              ['01', 'Place', 'Position the mouthpiece comfortably around your teeth.'],
              ['02', 'Press', 'Activate the Sonic Brush® V5.'],
              ['03', '30 seconds', 'Enjoy a quick full-mouth brushing routine.'],
            ].map(([number, title, body]) => (
              <div key={number} className="border-b border-[#35528c] py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
                <span className="font-mono text-sm text-[#75d9ef]">{number}</span>
                <h3 className="mt-10 font-display text-3xl font-extrabold tracking-tighter">{title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-6 text-[#c9d8f0]">{body}</p>
              </div>
            ))}
          </div>
          <p className="mt-9 text-xs leading-5 text-[#a9bddd]">The 30-second reference describes the product's designed brushing cycle, not a medical guarantee.</p>
        </div>
      </section>

      <section id="features" className="scroll-mt-24 mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <SectionIntro kicker="Three modes of care" title="More than just brushing." body="A compact oral-care routine with functions designed around everyday use." />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            { icon: Grid2X2, no: '01', title: 'Efficient cleaning', body: 'Sonic vibrations and the wrap-around mouthpiece are designed to make everyday tooth cleaning simple and efficient.' },
            { icon: HeartPulse, no: '02', title: 'Gum massage', body: 'A dedicated gum-massage experience adds another dimension to your daily oral-care routine.' },
            { icon: Sparkles, no: '03', title: 'Cold-light whitening', body: 'The V5 includes a cold-light whitening function designed to support a brighter-looking smile.' },
          ].map(({ icon: Icon, no, title, body }) => (
            <article key={no} data-testid={`card-feature-${no}`} className="group rounded-[1.6rem] border border-[#cfddf2] bg-[#f4f8ff] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#91afe9] hover:bg-[#eef4ff]">
              <div className="flex items-center justify-between"><span className="font-mono text-xs text-[#7188ae]">{no}</span><Icon size={22} strokeWidth={1.7} className="text-[#2454d8]" /></div>
              <h3 className="mt-16 font-display text-2xl font-extrabold capitalize tracking-tighter text-[#10244c]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#5d6f8b]">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#e8f6fb]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:px-12 lg:py-28">
          <SectionIntro kicker="The form follows the function" title="Why is the Sonic Brush® V5 different?" body="A wrap-around format changes the shape of the routine without making bigger promises than the product can support." />
          <div>
            <VideoMedia src={detailVideo} poster={blackProductImage} label="Video 04 / mouthpiece close-up" title="See the bristles, mouthpiece shape and sonic-ready design up close." testId="media-mouthpiece-close-up" />
            <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2">
              {[
                ['Full-mouth design', 'Designed to cover the teeth simultaneously rather than brushing one section at a time.'],
                ['45° angled silicone bristles', 'The silicone bristles use a 45° angled design inspired by the Bass brushing technique.'],
                ['Sonic vibrations', 'Thousands of sonic vibrations provide the brushing action.'],
                ['Hands-free-style experience', 'Designed to reduce the repetitive brushing movements required with a traditional toothbrush.'],
              ].map(([title, body], index) => (
              <div key={title} className="border-t border-[#afd2e6] pt-5">
                <span className="font-mono text-xs text-[#3688b1]">0{index + 1}</span>
                <h3 className="mt-4 font-display text-lg font-extrabold capitalize tracking-[-.03em] text-[#102f62]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5d6f8b]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <SectionIntro kicker="For real-life routines" title="Made for people who want a simpler routine." />
            <div className="mt-8 flex flex-wrap gap-2">
              {['Busy mornings', 'Simple daily routine', 'Travel', 'People who dislike traditional brushing', 'Tech lovers', 'Anyone looking to simplify oral care'].map((label) => (
                <span key={label} className="rounded-full border border-[#c7dcd3] px-3.5 py-2 text-xs font-semibold text-[#426d66]">{label}</span>
              ))}
            </div>
          </div>
          <VideoMedia src={lifestyleVideo} poster={blueProductImage} label="Video 06 / lifestyle use" title="A product-focused look at the Sonic Brush® V5 in an everyday routine." controls testId="media-lifestyle-use" />
        </div>
      </section>

      <section id="reviews" className="scroll-mt-24 border-y border-[#c8e1ec] bg-[#e9f8fc]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionIntro kicker="Customer reviews" title="Loved by people across Pakistan." body="Real feedback from customers who upgraded their daily oral care routine with Sonic Brush® V5." />
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#79bfd1] bg-white/80 px-3.5 py-2 text-[.66rem] font-bold uppercase tracking-[.14em] text-[#17627e]"><span className="size-1.5 rounded-full bg-[#10b981]" /> Verified Customer Reviews</span>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
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
            ].map((review) => (
              <article key={review.id} data-testid={`card-review-${review.id}`} className="flex min-h-56 flex-col justify-between rounded-3xl border border-[#b7dce8] bg-white/90 p-6 shadow-[0_14px_34px_rgba(30,99,128,.08)]">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#f59e0b]">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="text-sm">★</span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#e6f7fb] px-2.5 py-1 text-[.62rem] font-bold uppercase tracking-[.1em] text-[#17627e]">
                      <Check size={11} className="text-[#10b981]" /> Verified Buyer
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-extrabold tracking-[-.03em] text-[#123d63]">{review.title}</h3>
                  <p className="mt-2.5 text-sm leading-6 text-[#54768a]">{review.body}</p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-[#e2eff5] pt-3.5 text-xs">
                  <div>
                    <span className="font-bold text-[#123d63]">{review.name}</span>
                    <span className="text-[#6d8a9e]"> · {review.location}</span>
                  </div>
                  <span className="rounded-md bg-[#eef7fa] px-2 py-0.5 font-medium text-[#467389]">{review.tag}</span>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-6 text-xs font-semibold leading-5 text-[#4f7785]">Overall 4.9/5 rating based on customer reviews across Pakistan. All orders include free nationwide delivery and WhatsApp support.</p>
        </div>
      </section>

      <section className="border-y border-[#d7e2f2] bg-[#f3f7ff]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:px-12 lg:py-28">
          <div>
            <SectionIntro kicker="In the box" title="Everything you need to get started." body="Package composition is based on the current product information and should be updated if the seller's actual supplied package differs." />
            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              {['1 × Sonic Brush® V5', '1 × USB Charging Cable', '1 × Charging Station', '1 × User Manual'].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-[#d0def2] bg-white px-4 py-4 text-sm font-semibold text-[#315181]"><PackageCheck size={17} className="text-[#2454d8]" />{item}</div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="overflow-hidden rounded-4xl border border-[#c2d5ef] bg-white">
              <img src={whiteProductImage} alt="White Sonic Brush V5 product and blue package" loading="lazy" className="aspect-square w-full object-cover" />
              <p className="border-t border-[#dbe7f6] px-5 py-4 text-xs font-semibold text-[#536985]">The supplied package visual shown in White.</p>
            </div>
            <div className="rounded-4xl bg-[#0c1d43] p-7 text-[#f6fbff] sm:p-10">
              <BatteryCharging size={25} className="text-[#28c7e7]" />
              <p className="eyebrow mt-16 text-[#a7c9ff]">Rechargeable convenience</p>
              <p className="mt-3 font-display text-5xl font-extrabold tracking-[-.08em]">Up to 30</p>
              <p className="mt-1 text-sm font-semibold text-[#d4e3fc]">uses per charge</p>
              <p className="mt-6 text-xs leading-5 text-[#aec3e5]">Actual battery performance can vary depending on usage. We do not promise an exact number of days.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionIntro kicker="Make it yours" title="Choose your color." body="Select a color to carry through to your WhatsApp order inquiry. All variants are subject to current stock." />
          <span className="text-sm font-semibold text-[#5d6f8b]">Selected: <span data-testid="text-selected-color" className="text-[#2454d8]">{selectedColor}</span></span>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {colors.map((color) => (
            <button key={color.name} data-testid={`button-color-${color.name.toLowerCase()}`} onClick={() => setSelectedColor(color.name)} style={{ backgroundColor: color.tint }} className={`group relative min-h-44 overflow-hidden rounded-3xl border p-3 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2454d8] ${selectedColor === color.name ? 'border-[#2454d8] ring-2 ring-[#2454d8]/25' : 'border-[#cbd8ed] hover:border-[#6c9ce8]'}`}>
              <span className="absolute right-4 top-4 z-10 grid size-6 place-items-center rounded-full border border-[#9eb5d9] bg-white/60">{selectedColor === color.name && <Check size={14} className="text-[#2454d8]" />}</span>
              <img src={color.image} alt={`${color.name} Sonic Brush V5 product and package`} loading="lazy" className="mx-auto block h-32 w-full object-contain transition-transform group-hover:scale-[1.04]" />
              <span className="mt-1 block text-sm font-bold text-[#10244c]">{color.name}</span>
            </button>
          ))}
        </div>
         <div className="mt-8 flex flex-col gap-4 rounded-3xl border border-[#b9d8ec] bg-[#eef8fc] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
           <div><p className="font-display text-lg font-extrabold text-[#10244c]">Ready for {selectedColor}?</p><p className="mt-1 text-sm text-[#5d6f8b]">{SELLING_PRICE} per unit · {DELIVERY_OFFER}</p></div>
          <Button testId="button-selected-color-order" onClick={() => whatsappMessage(orderMessage(selectedColor))}>Order this color <ArrowUpRight size={16} /></Button>
        </div>
      </section>

      <section className="bg-[#10244c] text-[#f6fbff]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_.8fr] lg:items-center lg:px-12 lg:py-24">
          <div>
            <p className="eyebrow text-[#8ddff1]">Current batch — limited availability</p>
            <h2 className="mt-5 max-w-xl font-display text-[clamp(2.5rem,8vw,5rem)] font-extrabold leading-[.92] tracking-[-.08em]">Limited stock. Available while supplies last.</h2>
            <p className="mt-6 max-w-lg leading-7 text-[#cad8ef]">We currently have a limited quantity available. Once the available stock is sold, orders for this batch may close.</p>
          </div>
          <div className="rounded-[1.7rem] border border-[#3d5c9b] bg-[#172f63] p-6">
             <div className="flex items-center justify-between"><span className="text-sm font-semibold text-[#d4e3fc]">Current batch status</span><span className="size-2 rounded-full bg-[#28c7e7]" /></div>
             <div className="mt-7 border-b border-[#3d5c9b] pb-5"><p className="eyebrow text-[#8ddff1]">Fixed price per unit</p><p data-testid="text-price" className="mt-2 font-display text-2xl font-extrabold tracking-[-.04em] text-[#f6fbff]">{SELLING_PRICE}</p><p className="mt-2 text-sm font-semibold text-[#bdebf3]">{DELIVERY_OFFER}</p></div>
            <div className="my-7 h-1.5 overflow-hidden rounded-full bg-[#3f5c98]"><div className="h-full w-[58%] rounded-full bg-[#28c7e7]" /></div>
             <p className="text-xs leading-5 text-[#b9cae8]">No live stock counter is shown. Availability is confirmed manually through WhatsApp at the fixed offer above.</p>
            <Button testId="button-stock-check" variant="outline" className="mt-6 border-[#84d8ea] text-[#f6fbff] hover:bg-[#244886]" onClick={() => whatsappMessage(orderMessage(selectedColor))}>Check availability <ArrowUpRight size={16} /></Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <SectionIntro kicker="Clear from the first message" title="How to order." body="There is no online checkout. Your order is confirmed manually, with payment instructions shared through WhatsApp." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['01', 'Choose your color', 'Select Black, White, Pink or Blue.'],
            ['02', 'Message us on WhatsApp', 'Click the order button and send your order details.'],
             ['03', 'Confirm availability', `Your fixed offer is ${SELLING_PRICE} per unit, with delivery included at no additional charge.`],
            ['04', 'Complete payment', 'After confirmation, payment instructions are provided through WhatsApp.'],
          ].map(([no, title, body]) => (
            <div key={no} className="rounded-[1.3rem] border border-[#d3e1d9] bg-[#f2f6f1] p-5">
              <span className="font-mono text-xs text-[#6d978c]">{no}</span>
              <h3 className="mt-12 font-display text-lg font-extrabold tracking-[-.04em] text-[#1b4943]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#607a73]">{body}</p>
            </div>
          ))}
        </div>
         <p className="mt-6 text-xs leading-5 text-[#6b827c]">Orders are confirmed after payment is successfully verified. {SELLING_PRICE} per unit; delivery is included at no additional charge.</p>
      </section>

      <section className="bg-[#edf7ff]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:px-12 lg:py-28">
          <div>
            <SectionIntro kicker="Manual, clear, direct" title="Ready to order?" body="Share a few details and we'll open a pre-filled WhatsApp message for you." />
            <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-[#53698d]"><Send size={17} className="text-[#2454d8]" /> WhatsApp is the only checkout step.</div>
          </div>
          <form onSubmit={submitOrder} className="rounded-[1.8rem] border border-[#bdd8cb] bg-[#f8f8f1] p-5 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                ['name', 'Full name', 'Your name', 'text'],
                ['phone', 'Phone number', '+92 300 0000000', 'tel'],
                ['city', 'City', 'Your city', 'text'],
              ].map(([name, label, placeholder, type]) => (
                <label key={name} className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#5d7770]">{label}</span>
                  <input required name={name} type={type} placeholder={placeholder} data-testid={`input-${name}`} className="h-12 w-full rounded-xl border border-[#c9d7ec] bg-white px-3.5 text-sm text-[#10244c] outline-none placeholder:text-[#93a4bd] focus:border-[#2454d8] focus:ring-2 focus:ring-[#b9cbed]" />
                </label>
              ))}
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#5d7770]">Selected color</span>
                <select name="color" defaultValue={selectedColor} key={selectedColor} data-testid="select-color" className="h-12 w-full rounded-xl border border-[#c9d7ec] bg-white px-3.5 text-sm text-[#10244c] outline-none focus:border-[#2454d8]">
                  {colors.map((color) => <option key={color.name}>{color.name}</option>)}
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#5d7770]">Complete delivery address</span>
                <textarea required name="address" placeholder="Street, building, area" data-testid="input-address" className="min-h-24 w-full resize-y rounded-xl border border-[#c9d7ec] bg-white px-3.5 py-3 text-sm text-[#10244c] outline-none placeholder:text-[#93a4bd] focus:border-[#2454d8] focus:ring-2 focus:ring-[#b9cbed]" />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#5d7770]">Quantity</span>
                <input required min="1" max="10" defaultValue="1" name="quantity" type="number" data-testid="input-quantity" className="h-12 w-full rounded-xl border border-[#c9d7ec] bg-white px-3.5 text-sm text-[#10244c] outline-none focus:border-[#2454d8] focus:ring-2 focus:ring-[#b9cbed]" />
              </label>
            </div>
            <Button type="submit" testId="button-form-whatsapp" className="mt-6 w-full">Continue on WhatsApp <ArrowUpRight size={16} /></Button>
             {submitted && <p data-testid="status-form-submitted" className="mt-3 text-center text-xs font-semibold text-[#237266]">Your WhatsApp draft is ready with {SELLING_PRICE} per unit and delivery included at no additional charge.</p>}
             <p className="mt-4 text-center text-[.68rem] leading-5 text-[#82958f]">{SELLING_PRICE} per unit · {DELIVERY_OFFER}. Payment is shared through WhatsApp; COD is currently not available.</p>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="rounded-4xl border border-[#cbdcf2] bg-[#f3f7ff] p-7 sm:p-10">
          <SectionIntro kicker="Trust, without the fine print theatre" title="Simple. Clear. Transparent." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {['Product information clearly displayed', 'Manual order confirmation', 'Payment verified before order confirmation', 'WhatsApp customer support'].map((point) => (
              <div key={point} className="flex items-start gap-3 border-t border-[#cbdcf2] pt-4 text-sm font-semibold leading-6 text-[#53698d]"><Check size={17} className="mt-0.5 shrink-0 text-[#2454d8]" />{point}</div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 border-t border-[#d8e3db] bg-[#f0f4ed]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[.65fr_1.35fr] lg:px-12 lg:py-28">
          <div><SectionIntro kicker="Questions, answered" title="Before you message us." body="If your question is not here, WhatsApp is the fastest way to confirm current details." /><CircleHelp size={30} className="mt-8 text-[#2454d8]" /></div>
          <div className="border-t border-[#c8dcd2]">
            {faqs.map(([question, answer], index) => (
              <div key={question} className="border-b border-[#c8dcd2]">
                <button data-testid={`button-faq-${index}`} onClick={() => setOpenFaq(openFaq === index ? -1 : index)} className="flex min-h-16 w-full items-center justify-between gap-5 text-left text-sm font-bold text-[#294c83] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2454d8]">
                  <span>{question}</span><ChevronDown size={18} className={`shrink-0 transition-transform ${openFaq === index ? 'rotate-180 text-[#2454d8]' : 'text-[#7c91b5]'}`} />
                </button>
                {openFaq === index && <p data-testid={`text-faq-answer-${index}`} className="max-w-2xl pb-5 pr-10 text-sm leading-6 text-[#638079]">{answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#bdebf3]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:py-24">
           <div><p className="eyebrow text-[#285d84]">Sonic Brush® V5</p><h2 className="mt-4 max-w-3xl font-display text-[clamp(2.6rem,9vw,6.5rem)] font-extrabold leading-[.9] tracking-[-.085em] text-[#10244c]">Ready to make your brushing routine simpler?</h2><p className="mt-5 text-[#4f688c]">{SELLING_PRICE} per unit · {DELIVERY_OFFER}</p></div>
           <div className="shrink-0"><Button testId="button-final-order" onClick={() => whatsappMessage(orderMessage(selectedColor))}>Order Sonic Brush® V5 on WhatsApp <ArrowUpRight size={17} /></Button><p className="mt-3 text-center text-[.68rem] font-semibold text-[#53698d]">Availability and payment are manually confirmed.</p></div>
        </div>
      </section>

      <footer className="bg-[#0c1d43] text-[#d5e1f4]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_auto] lg:px-12">
           <div><Wordmark inverted /><p className="mt-5 max-w-xs text-sm leading-6 text-[#a8bad9]">A simpler brushing routine, with a fixed {SELLING_PRICE} offer and delivery included at no additional charge.</p></div>
           <div className="grid grid-cols-2 content-start gap-x-10 gap-y-4 text-sm font-semibold text-[#d4e0f4]">
            <button data-testid="footer-order" onClick={() => whatsappMessage(orderMessage(selectedColor))} className="text-left hover:text-[#28c7e7]">Order via WhatsApp</button>
            <button data-testid="footer-faq" onClick={() => jumpTo('faq')} className="text-left hover:text-[#28c7e7]">FAQ</button>
          </div>
        </div>
         <div className="border-t border-[#29477e] px-5 py-5 text-center text-[.65rem] font-semibold uppercase tracking-[.14em] text-[#829ac5]">{DELIVERY_OFFER} · Orders handled through WhatsApp</div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-[#cbdcf2] bg-[#fbfcff]/95 p-3 backdrop-blur-lg sm:hidden">
        <Button testId="button-sticky-order" className="w-full" onClick={() => whatsappMessage(orderMessage(selectedColor))}>Order on WhatsApp <ArrowUpRight size={16} /></Button>
      </div>
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;