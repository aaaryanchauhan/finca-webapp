import { useEffect, useRef, useState } from 'react';
import { ChevronRight, ArrowRight, Phone } from 'lucide-react';
import { property } from '@/data/content';
import { Reveal } from '@/components/Reveal';

interface HomeViewProps {
  onNavigate: (view: string) => void;
}

const quickLinks = [
  { label: 'Explore the estate', view: 'stay-tour', desc: 'A photo tour of the house, the grounds, and every room' },
  { label: 'Discover Medellín', view: 'explore', desc: 'Curated recommendations from the family' },
  { label: 'House guide & essentials', view: 'guide', desc: 'WiFi, taxis, video guides and house rules' },
  { label: 'Pre-arrival guide', view: 'pre-arrival', desc: 'Arrival details, airport transport and preferences' },
  { label: 'Guest memories', view: 'memories', desc: 'Stories and guestbook from those who stayed before' },
  { label: 'Checkout & guestbook', view: 'checkout', desc: 'Departure checklist, and leave your own memory' },
];

export function HomeView({ onNavigate }: HomeViewProps) {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const heroRef = useRef<HTMLImageElement>(null);

  // A cached image can finish before React attaches onLoad.
  useEffect(() => {
    if (heroRef.current?.complete && heroRef.current.naturalWidth > 0) setHeroLoaded(true);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-ink-900">
        <picture className="absolute inset-0 block">
          <source media="(min-width: 768px)" srcSet={property.heroImageDesktop} />
          <img
            ref={heroRef}
            src={property.heroImage}
            alt="The Finca Libia facade, framed by stone seats and lawn"
            decoding="async"
            onLoad={() => setHeroLoaded(true)}
            className={`hero-img h-full w-full object-cover object-[42%_center] ${heroLoaded ? 'is-loaded' : ''}`}
          />
        </picture>

        {/* Keep the photo bright; darken only where text sits. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/55 via-40% to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-ink-900/70 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 z-10 mx-auto flex max-w-5xl flex-col items-start px-6 pb-[calc(env(safe-area-inset-bottom)+7.5rem)] sm:px-10">
          <h1
            className="hero-in font-serif text-6xl font-light leading-[0.98] tracking-tight text-ivory-50 sm:text-7xl md:text-[6rem]"
            style={{ ['--i' as string]: 0 }}
          >
            {property.name}
          </h1>
          <p
            className="hero-in mt-4 max-w-md font-serif text-xl font-light italic leading-relaxed text-ivory-100 sm:text-2xl"
            style={{ ['--i' as string]: 1 }}
          >
            {property.tagline}
          </p>
          <button
            onClick={() => onNavigate('stay')}
            className="hero-in no-tap-highlight group mt-8 inline-flex min-h-[48px] items-center gap-3 rounded-full bg-champagne-500 px-7 py-3.5 text-xs font-medium uppercase tracking-widest-2 text-ink-900 shadow-lg shadow-black/30 transition-all duration-300 hover:bg-champagne-400 active:scale-95"
            style={{ ['--i' as string]: 2 }}
          >
            <span>Explore your stay</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
          </button>
        </div>
      </section>

      {/* Your stay */}
      <section className="relative bg-ink-900 px-6 pb-44 pt-6">
        <div className="mx-auto max-w-2xl divide-y divide-ink-700/70">
          {/* Itinerary */}
          <Reveal>
            <div className="py-14">
              <h2 className="font-serif text-4xl font-light leading-tight text-ivory-50 sm:text-5xl">
                You have no plans yet.
              </h2>
              <p className="mt-3 font-serif text-lg italic text-stone-300 sm:text-xl">
                Let us help you make the most of today.
              </p>
              <button
                onClick={() => onNavigate('itinerary')}
                className="no-tap-highlight group mt-8 inline-flex min-h-[48px] items-center gap-3 rounded-full bg-champagne-500 px-7 py-3.5 text-xs font-medium uppercase tracking-widest-2 text-ink-900 transition-all duration-300 hover:bg-champagne-400 active:scale-95"
              >
                <span>Create my itinerary</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
              </button>
            </div>
          </Reveal>

          {/* Host */}
          <Reveal>
            <div className="py-14">
              <div className="flex items-center gap-5">
                <img
                  src={property.host.image}
                  alt={property.host.name}
                  loading="lazy"
                  className="h-20 w-20 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-3xl font-light text-ivory-50">{property.host.name}</h3>
                  <p className="font-serif text-base italic text-stone-300">{property.host.title}</p>
                </div>
              </div>
              <p className="mt-7 max-w-[52ch] font-serif text-xl font-light italic leading-relaxed text-ivory-200">
                “{property.host.bio}”
              </p>
              <a
                href={`tel:${property.host.phone.replace(/[^0-9+]/g, '')}`}
                className="no-tap-highlight mt-7 inline-flex min-h-[44px] items-center gap-2.5 text-xs font-medium uppercase tracking-widest-2 text-champagne-300 transition-colors hover:text-champagne-200"
              >
                <Phone className="h-4 w-4" strokeWidth={1.5} />
                <span>Call {property.host.name}</span>
              </a>
            </div>
          </Reveal>

          {/* Video guides */}
          <Reveal>
            <div className="py-14">
              <h2 className="font-serif text-4xl font-light leading-tight text-ivory-50 sm:text-5xl">
                Learn how everything works.
              </h2>
              <p className="mt-3 max-w-[48ch] font-serif text-lg italic text-stone-300 sm:text-xl">
                Short video walk-throughs for the sliding doors, steam room, sauna, grill, and more.
              </p>
              <a
                href={property.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="no-tap-highlight group mt-8 block overflow-hidden"
                aria-label="Watch the instruction videos on YouTube"
              >
                <img
                  src="/photos/youtube_guides.jpg"
                  alt="A phone showing the Finca Libia instruction videos"
                  loading="lazy"
                  className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </a>
              <a
                href={property.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="no-tap-highlight group mt-6 inline-flex min-h-[44px] items-center gap-2.5 text-xs font-medium uppercase tracking-widest-2 text-champagne-300 transition-colors hover:text-champagne-200"
              >
                <span>Watch on YouTube</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
              </a>
            </div>
          </Reveal>

          {/* Everything else */}
          <Reveal>
            <nav aria-label="More in this guide" className="py-6">
              {quickLinks.map((item) => (
                <button
                  key={item.view}
                  onClick={() => onNavigate(item.view)}
                  className="no-tap-highlight group flex min-h-[72px] w-full items-center justify-between gap-4 border-b border-ink-700/60 py-5 text-left last:border-b-0"
                >
                  <div>
                    <p className="font-serif text-2xl font-light text-ivory-100 transition-colors group-hover:text-champagne-300">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm text-stone-400">{item.desc}</p>
                  </div>
                  <ChevronRight
                    className="h-5 w-5 shrink-0 text-stone-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-champagne-400"
                    strokeWidth={1.5}
                  />
                </button>
              ))}
            </nav>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
