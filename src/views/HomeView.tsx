import { useState, useEffect } from 'react';
import { ChevronRight, ArrowRight, Phone, Sparkles } from 'lucide-react';
import { property } from '@/data/content';
import { FullScreenImage } from '@/components/FullScreenImage';
import { Reveal } from '@/components/Reveal';

interface HomeViewProps {
  onNavigate: (view: string) => void;
}

export function HomeView({ onNavigate }: HomeViewProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const heroImagePairs = [
    { mobile: property.heroImage, desktop: property.heroImageDesktop },
    { mobile: property.heroImageAlt, desktop: property.heroImageAltDesktop },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImagePairs.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [heroImagePairs.length]);

  return (
    <div className="min-h-screen">
      {/* Cinematic Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        {heroImagePairs.map((pair, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-[2s] ${
              i === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <picture className="block h-full w-full">
              <source media="(min-width: 768px)" srcSet={pair.desktop} />
              <img
                src={pair.mobile}
                alt="Finca Libia"
                className="h-full w-full object-cover"
                style={{
                  transform: i === currentImage ? 'scale(1)' : 'scale(1.05)',
                  transition: 'transform 7s ease-out',
                }}
              />
            </picture>
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/85 via-ink-900/50 to-ink-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(26,24,22,0.65)_0%,_rgba(26,24,22,0)_75%)] pointer-events-none" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="animate-fade-in flex flex-col items-center">
            <p className="text-xs font-medium uppercase tracking-widest-3 text-champagne-300 drop-shadow-md">
              Welcome to
            </p>
          </div>
          <h1 className="animate-fade-up animate-delay-100 mt-3 font-serif text-5xl font-light tracking-tight text-ivory-50 hero-text-shadow drop-shadow-xl sm:text-6xl md:text-7xl">
            {property.name}
          </h1>
          <p className="animate-fade-up animate-delay-200 mt-4 max-w-md px-4 font-serif text-lg font-light italic leading-relaxed text-ivory-100 hero-text-shadow drop-shadow-md sm:text-xl">
            {property.tagline}
          </p>

          <button
            onClick={() => onNavigate('stay')}
            className="animate-fade-up animate-delay-300 no-tap-highlight mt-8 group inline-flex items-center gap-3 rounded-full border border-champagne-400/40 bg-ink-900/70 px-7 py-3.5 text-xs font-medium uppercase tracking-widest-2 text-ivory-100 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-champagne-300 hover:bg-champagne-500 hover:text-ink-900 hover:shadow-champagne-500/20 active:scale-95"
          >
            <span>Explore your stay</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
          <div className="h-12 w-px bg-ivory-200/30 animate-shimmer" />
        </div>
      </section>

      {/* Your Stay */}
      <section className="relative bg-ink-900 px-6 py-16 pb-44">
        <div className="mx-auto max-w-2xl">
          {/* Highlighted Itinerary Box */}
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-champagne-400/35 bg-gradient-to-br from-ink-800/90 via-ink-800/70 to-champagne-950/25 p-7 sm:p-9 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-champagne-400/60 gold-border-glow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-champagne-400">
                  <Sparkles className="h-4 w-4" strokeWidth={1.5} />
                  <span className="text-[10px] uppercase tracking-widest-3 font-medium">Daily Itinerary</span>
                </div>
                <span className="text-[10px] font-mono text-champagne-400/70 uppercase tracking-widest-2">Bespoke Concierge</span>
              </div>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-light text-ivory-50">
                You have no plans yet.
              </h2>
              <p className="mt-2 text-sm sm:text-base text-stone-300 font-serif italic">
                Let us help you make the most of today.
              </p>
              <button
                onClick={() => onNavigate('itinerary')}
                className="no-tap-highlight group mt-7 inline-flex items-center gap-3 rounded-full bg-champagne-500/90 px-6 py-3 text-xs font-medium uppercase tracking-widest-2 text-ink-900 shadow-lg transition-all duration-300 hover:bg-champagne-400 hover:shadow-champagne-500/20 active:scale-95"
              >
                <span>Create my itinerary</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
              </button>
            </div>
          </Reveal>

          {/* Know Your Host */}
          <Reveal delay={200}>
            <div className="mt-12 overflow-hidden rounded-3xl border border-ink-700 bg-ink-800/40 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-champagne-500/30">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
                <div className="relative shrink-0">
                  <img
                    src={property.host.image}
                    alt={property.host.name}
                    className="h-20 w-20 sm:h-24 sm:w-24 rounded-full border-2 border-champagne-400/50 object-cover shadow-xl"
                  />
                  <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-ink-900 bg-emerald-400 shadow-md" title="On-site" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-widest-3 text-champagne-400 font-medium">Know your host</p>
                  <h3 className="mt-1 font-serif text-3xl font-light text-ivory-50">{property.host.name}</h3>
                  <p className="text-xs text-stone-400 font-serif italic">{property.host.title}</p>
                </div>
                <a
                  href={`tel:${property.host.phone.replace(/[^0-9+]/g, '')}`}
                  className="no-tap-highlight inline-flex items-center gap-2 rounded-full border border-champagne-400/40 bg-champagne-500/10 px-4 py-2 text-xs font-medium uppercase tracking-wider text-champagne-300 transition-colors hover:bg-champagne-500 hover:text-ink-900"
                >
                  <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
                  <span>Call Host</span>
                </a>
              </div>

              <div className="mt-6 border-t border-ink-700/80 pt-5">
                <p className="font-serif text-lg font-light italic leading-relaxed text-ivory-200">
                  "{property.host.bio}"
                </p>
              </div>
            </div>
          </Reveal>

          {/* Quick section links */}
          <Reveal delay={300}>
            <div className="mt-16 space-y-px">
              {[
                { num: '01', label: 'Explore the estate', view: 'stay', desc: 'Pool, sauna, tennis, bar & self-guided digital tour' },
                { num: '02', label: 'Discover Medellín', view: 'explore', desc: 'Curated recommendations from the family' },
                { num: '03', label: 'House guide & essentials', view: 'guide', desc: 'WiFi credentials, taxis, YouTube videos & rules' },
                { num: '04', label: 'Pre-arrival guide', view: 'pre-arrival', desc: 'Arrival details, airport transport & preferences' },
                { num: '05', label: 'Guest memories', view: 'memories', desc: 'Stories & guestbook from those who stayed before' },
                { num: '06', label: 'Checkout & guestbook', view: 'checkout', desc: 'Departure checklist and leave your memories' },
              ].map((item) => (
                <button
                  key={item.view}
                  onClick={() => onNavigate(item.view)}
                  className="no-tap-highlight group flex w-full items-center justify-between border-b border-ink-700/80 py-5 text-left transition-all duration-300 hover:border-champagne-500/40"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-serif text-xs font-light text-champagne-400/60 pt-1 font-mono">
                      {item.num}
                    </span>
                    <div>
                      <p className="font-serif text-xl font-light text-ivory-100 transition-colors group-hover:text-champagne-300">
                        {item.label}
                      </p>
                      <p className="mt-1 text-xs text-stone-500">{item.desc}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-stone-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-champagne-400 shrink-0" strokeWidth={1.5} />
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
