import { useState, useEffect } from 'react';
import {
  ChevronRight,
  ArrowLeft,
  Navigation,
  MapPin,
  Instagram,
  Clock,
  Sparkles,
  MessageCircle,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { exploreCategories, guideIntro } from '@/data/content';
import { Reveal } from '@/components/Reveal';
import { BackButton } from '@/components/BackButton';
import { NavigationModal, type NavigationTarget } from '@/components/NavigationModal';
import type { Recommendation } from '@/types';

interface ExploreViewProps {
  onBack: () => void;
  onNavigate?: (view: string) => void;
}

export function ExploreView({ onBack, onNavigate }: ExploreViewProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedRec, setSelectedRec] = useState<Recommendation | null>(null);
  const [navTarget, setNavTarget] = useState<NavigationTarget | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [activeCategory, selectedRec]);

  const currentCategory = exploreCategories.find((c) => c.id === activeCategory);

  const openNavigation = (rec: Recommendation, categoryLabel?: string) => {
    if (rec.mapUrl) {
      window.open(rec.mapUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    setNavTarget({
      name: rec.name,
      category: categoryLabel || currentCategory?.label || 'Recommendation',
      distance: rec.distance,
      description: rec.note,
      insiderTip: rec.quote,
      mapUrl: rec.mapUrl,
      type: 'off_estate',
    });
  };

  const handleRequestDriver = () => {
    if (onNavigate) {
      onNavigate('concierge');
    }
  };

  const getInstagramUrl = (handle?: string) => {
    if (!handle) return '';
    const clean = handle.replace('@', '').trim();
    return `https://instagram.com/${clean}`;
  };

  if (selectedRec) {
    const isRestaurant = currentCategory?.id === 'restaurants';
    const isInHouse =
      selectedRec.distance.toLowerCase().includes('on estate') ||
      selectedRec.distance.toLowerCase().includes('in-villa') ||
      selectedRec.distance.toLowerCase().includes('on request') ||
      (currentCategory && (currentCategory.id === 'do' || currentCategory.id === 'in-house' || currentCategory.id === 'available-services'));

    return (
      <div className="min-h-screen bg-ink-900 text-ivory-100">
        <NavigationModal
          target={navTarget}
          onClose={() => setNavTarget(null)}
          onRequestDriver={handleRequestDriver}
        />
        <div className="relative h-[45vh] sm:h-[55vh] w-full overflow-hidden">
          <img
            src={selectedRec.image}
            alt={selectedRec.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-900/40 via-ink-900/30 to-ink-900" />
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 pt-safe">
            <BackButton onClick={() => setSelectedRec(null)} />
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-4 sm:px-6 py-6 sm:py-10 pb-44 space-y-6 sm:space-y-8">
          <Reveal>
            {!isRestaurant && (
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {selectedRec.tag && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-champagne-400/40 bg-champagne-500/10 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] font-medium uppercase tracking-widest text-champagne-300">
                    {selectedRec.tag === 'MUST SEE' && <Sparkles className="h-3 w-3 text-amber-400" />}
                    {selectedRec.tag}
                  </span>
                )}
                {selectedRec.distance && selectedRec.distance.toLowerCase().startsWith('approx') && (
                  <span className="inline-flex items-center gap-1 text-xs uppercase tracking-widest-2 text-stone-400 font-mono">
                    <Clock className="h-3.5 w-3.5 text-champagne-400/70" />
                    {selectedRec.distance}
                  </span>
                )}
              </div>
            )}

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ivory-50 leading-tight">
              {selectedRec.name}
            </h1>
            {!isRestaurant && selectedRec.note && (
              <p className="mt-2 sm:mt-3 font-serif text-base sm:text-lg font-light italic text-stone-300">
                {selectedRec.note}
              </p>
            )}
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-2xl border border-ink-700/80 bg-ink-800/40 p-5 sm:p-6 backdrop-blur-md space-y-4">
              <p className="font-serif text-lg sm:text-xl font-light leading-relaxed text-ivory-100">
                "{selectedRec.quote}"
              </p>

              {!isRestaurant && selectedRec.reservations && (
                <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/30 bg-amber-950/20 p-3.5 text-xs text-amber-200">
                  <AlertCircle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                  <span>{selectedRec.reservations}</span>
                </div>
              )}

              {!isRestaurant && selectedRec.bestTimes && selectedRec.bestTimes.length > 0 && (
                <div className="mt-4 pt-4 border-t border-ink-700/60">
                  <p className="text-[10px] uppercase tracking-widest-3 text-champagne-400 font-medium mb-2">
                    Best Times to Visit
                  </p>
                  <ul className="space-y-1.5 text-xs text-stone-300 font-serif">
                    {selectedRec.bestTimes.map((time, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-champagne-400 shrink-0" />
                        <span>{time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {!isRestaurant && selectedRec.highlights && selectedRec.highlights.length > 0 && (
                <div className="mt-4 pt-4 border-t border-ink-700/60">
                  <p className="text-[10px] uppercase tracking-widest-3 text-champagne-400 font-medium mb-2">
                    Available Activities
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedRec.highlights.map((item, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 rounded-full border border-ink-600 bg-ink-900/60 px-2.5 py-1 text-xs text-stone-200"
                      >
                        <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {!isRestaurant && selectedRec.actionText && (
                <div className="mt-4 rounded-xl border border-champagne-500/30 bg-champagne-500/10 p-4 space-y-3">
                  <p className="text-xs text-champagne-200 italic font-serif leading-relaxed">
                    {selectedRec.actionText}
                  </p>
                  {onNavigate && (
                    <button
                      onClick={() => onNavigate('concierge')}
                      className="no-tap-highlight inline-flex items-center gap-2 rounded-full bg-champagne-500 px-4 py-2 text-[11px] font-medium uppercase tracking-wider text-ink-900 transition-colors hover:bg-champagne-400 active:scale-95"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>Contact Concierge / Host</span>
                    </button>
                  )}
                </div>
              )}

              {!isRestaurant && selectedRec.instagram && (
                <div className="pt-3 border-t border-ink-700/60 flex items-center justify-between">
                  <span className="text-xs text-stone-400 font-mono">Instagram</span>
                  <a
                    href={getInstagramUrl(selectedRec.instagram)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-tap-highlight inline-flex items-center gap-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1.5 text-xs text-pink-300 transition-colors hover:bg-pink-500/20 active:scale-95"
                  >
                    <Instagram className="h-3.5 w-3.5" />
                    <span>{selectedRec.instagram}</span>
                  </a>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              {!isInHouse && (
                <button
                  onClick={() => openNavigation(selectedRec)}
                  className="no-tap-highlight w-full sm:flex-1 flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-champagne-500/90 py-3.5 text-xs uppercase tracking-widest-2 font-medium text-ink-900 transition-colors hover:bg-champagne-400 active:scale-95"
                >
                  <Navigation className="h-4 w-4" strokeWidth={1.5} />
                  <span>Get Directions</span>
                </button>
              )}
              <button
                onClick={() => {
                  setSelectedRec(null);
                }}
                className="no-tap-highlight group inline-flex min-h-[44px] items-center justify-center gap-2 text-stone-400 transition-colors hover:text-ivory-100 py-2 active:scale-95"
              >
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={1.5} />
                <span className="text-xs uppercase tracking-widest-2">Back to List</span>
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    );
  }

  if (currentCategory) {
    const isRestaurantCategory = currentCategory.id === 'restaurants';

    return (
      <div className="min-h-screen bg-ink-900 text-ivory-100">
        <NavigationModal
          target={navTarget}
          onClose={() => setNavTarget(null)}
          onRequestDriver={handleRequestDriver}
        />
        <div className="px-4 sm:px-6 pt-6 sm:pt-8 pb-3 pt-safe">
          <BackButton onClick={() => setActiveCategory(null)} />
        </div>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-44">
          <Reveal>
            <p className="text-xs uppercase tracking-widest-3 text-champagne-400 font-medium">Finca Libia Curations</p>
            <h1 className="mt-1.5 font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ivory-50">{currentCategory.label}</h1>
            {!isRestaurantCategory && (
              <p className="mt-2 text-xs font-serif italic text-stone-400 leading-relaxed">
                {guideIntro.disclaimer}
              </p>
            )}
          </Reveal>
          <div className="mt-8 sm:mt-10 space-y-4 sm:space-y-5">
            {currentCategory.recommendations.map((rec, i) => {
              const isAvailableServices = currentCategory.id === 'available-services';

              return (
                <Reveal key={rec.id} delay={i * 50}>
                  <div className="group overflow-hidden rounded-2xl border border-ink-700/70 bg-ink-800/30 p-4 sm:p-6 transition-all duration-300 hover:border-champagne-500/40 hover:bg-ink-800/60 active:scale-[0.99]">
                    {isAvailableServices ? (
                      <div className="text-left">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-serif text-xl sm:text-2xl font-light text-ivory-100">
                            {rec.name}
                          </h3>
                          <span className="text-[10px] uppercase tracking-widest-2 text-stone-500 font-mono shrink-0">
                            {rec.distance}
                          </span>
                        </div>
                        <p className="mt-1 font-mono text-[11px] sm:text-xs uppercase tracking-wider text-champagne-400">
                          {rec.note}
                        </p>
                        <p className="mt-2.5 text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                          {rec.quote}
                        </p>
                      </div>
                    ) : isRestaurantCategory ? (
                      /* Clean Restaurant Card: Name, Short Description, Directions Button */
                      <div className="flex flex-col gap-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-2.5 sm:gap-3">
                            <span className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full border border-champagne-500/30 bg-ink-900/60 font-mono text-[11px] sm:text-xs text-champagne-300 mt-0.5">
                              {i + 1}
                            </span>
                            <h3
                              onClick={() => setSelectedRec(rec)}
                              className="cursor-pointer font-serif text-xl sm:text-2xl md:text-3xl font-light text-ivory-100 transition-colors group-hover:text-champagne-300"
                            >
                              {rec.name}
                            </h3>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => openNavigation(rec, currentCategory.label)}
                              className="no-tap-highlight inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-ink-600 bg-ink-900/80 px-3 py-1.5 text-[11px] sm:text-xs uppercase tracking-widest-2 text-champagne-400 transition-all hover:bg-ink-700 hover:border-champagne-400/50 active:scale-95"
                              title="Get Directions"
                            >
                              <Navigation className="h-3.5 w-3.5" strokeWidth={1.5} />
                              <span>Directions</span>
                            </button>
                            <button
                              onClick={() => setSelectedRec(rec)}
                              className="no-tap-highlight min-h-[36px] min-w-[36px] flex items-center justify-center p-2 text-stone-400 hover:text-champagne-400 transition-colors active:scale-95"
                              title="View Full Details"
                            >
                              <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                            </button>
                          </div>
                        </div>

                        <p
                          onClick={() => setSelectedRec(rec)}
                          className="cursor-pointer text-xs sm:text-sm text-stone-300 font-serif italic leading-relaxed pl-8 sm:pl-10"
                        >
                          "{rec.quote}"
                        </p>
                      </div>
                    ) : (
                      /* Other categories (Excursions etc.) */
                      <div className="flex flex-col gap-3 sm:gap-4">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                          <div className="flex items-start gap-2.5 sm:gap-3">
                            <span className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full border border-champagne-500/30 bg-ink-900/60 font-mono text-[11px] sm:text-xs text-champagne-300 mt-0.5">
                              {i + 1}
                            </span>
                            <div>
                              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                <h3
                                  onClick={() => setSelectedRec(rec)}
                                  className="cursor-pointer font-serif text-xl sm:text-2xl md:text-3xl font-light text-ivory-100 transition-colors group-hover:text-champagne-300"
                                >
                                  {rec.name}
                                </h3>
                                {rec.tag && (
                                  <span className="inline-flex items-center gap-1 rounded-full border border-champagne-400/30 bg-champagne-500/10 px-2 py-0.5 text-[9px] sm:text-[10px] font-medium uppercase tracking-wider text-champagne-300">
                                    {rec.tag === 'MUST SEE' && <Sparkles className="h-2.5 w-2.5 text-amber-400" />}
                                    {rec.tag}
                                  </span>
                                )}
                              </div>
                              {rec.note && (
                                <p className="mt-0.5 text-xs text-stone-400 font-mono">
                                  {rec.note}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 pl-8 sm:pl-0">
                            {rec.instagram && (
                              <a
                                href={getInstagramUrl(rec.instagram)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="no-tap-highlight inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-ink-600 bg-ink-900/80 px-2.5 py-1.5 text-xs text-pink-300 transition-colors hover:border-pink-500/50 hover:bg-pink-500/10 active:scale-95"
                                title="View on Instagram"
                              >
                                <Instagram className="h-3.5 w-3.5" />
                                <span className="font-mono text-[11px]">{rec.instagram}</span>
                              </a>
                            )}
                            {!(
                              currentCategory.id === 'in-house' ||
                              currentCategory.id === 'do' ||
                              rec.distance.toLowerCase().includes('on estate') ||
                              rec.distance.toLowerCase().includes('in-villa') ||
                              rec.distance.toLowerCase().includes('on request')
                            ) && (
                              <button
                                onClick={() => openNavigation(rec, currentCategory.label)}
                                className="no-tap-highlight inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-ink-600 bg-ink-900/80 px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs uppercase tracking-widest-2 text-champagne-400 transition-all hover:bg-ink-700 hover:border-champagne-400/50 active:scale-95"
                                title="Get Directions"
                              >
                                <Navigation className="h-3.5 w-3.5" strokeWidth={1.5} />
                                <span>Directions</span>
                              </button>
                            )}
                            <button
                              onClick={() => setSelectedRec(rec)}
                              className="no-tap-highlight min-h-[36px] min-w-[36px] flex items-center justify-center p-2 text-stone-400 hover:text-champagne-400 transition-colors active:scale-95"
                              title="View Full Details"
                            >
                              <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                            </button>
                          </div>
                        </div>

                        <p
                          onClick={() => setSelectedRec(rec)}
                          className="cursor-pointer text-xs sm:text-sm text-stone-300 font-serif italic leading-relaxed pl-8 sm:pl-10"
                        >
                          "{rec.quote}"
                        </p>

                        {rec.reservations && (
                          <div className="ml-8 sm:ml-10 flex items-center gap-2 text-xs text-amber-300/90 font-sans">
                            <AlertCircle className="h-3.5 w-3.5 shrink-0 text-amber-400" />
                            <span>{rec.reservations}</span>
                          </div>
                        )}

                        {rec.bestTimes && rec.bestTimes.length > 0 && (
                          <div className="ml-8 sm:ml-10 rounded-xl bg-ink-900/50 border border-ink-700/60 p-3 text-xs text-stone-300 space-y-1">
                            <p className="text-[10px] uppercase tracking-wider text-champagne-400 font-medium">Best times to visit:</p>
                            {rec.bestTimes.map((bt, idx) => (
                              <p key={idx} className="font-serif italic text-stone-300 pl-2">· {bt}</p>
                            ))}
                          </div>
                        )}

                        {rec.highlights && rec.highlights.length > 0 && (
                          <div className="ml-8 sm:ml-10 flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                            {rec.highlights.map((hl, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1 rounded-full border border-ink-700 bg-ink-900/60 px-2.5 py-0.5 text-[10px] sm:text-[11px] text-stone-300"
                              >
                                <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                                {hl}
                              </span>
                            ))}
                          </div>
                        )}

                        {rec.actionText && (
                          <div className="ml-8 sm:ml-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-champagne-400/30 bg-champagne-500/10 p-3 text-xs text-champagne-200">
                            <span className="font-serif italic">{rec.actionText}</span>
                            {onNavigate && (
                              <button
                                onClick={() => onNavigate('concierge')}
                                className="no-tap-highlight shrink-0 text-[10px] uppercase tracking-wider font-semibold underline text-champagne-300 hover:text-champagne-100 py-1"
                              >
                                Ask Concierge →
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-900 text-ivory-100">
      <NavigationModal
        target={navTarget}
        onClose={() => setNavTarget(null)}
        onRequestDriver={handleRequestDriver}
      />
      {/* Hero */}
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[65vh] w-full overflow-hidden">
        <img
          src="/photos/discover_medellin.jpg"
          alt="Medellín & Antioquia Guide"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/40 via-ink-900/60 to-ink-900" />
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 pt-safe">
          <BackButton onClick={onBack} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 pb-8 sm:pb-10 max-w-3xl mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-widest-3 text-champagne-400 font-medium">FINCA LIBIA</p>
            <h1 className="mt-2 sm:mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ivory-50 hero-text-shadow leading-tight">
              {guideIntro.title}
            </h1>
            <p className="mt-3 sm:mt-4 max-w-xl font-serif text-sm sm:text-base md:text-lg font-light italic text-ivory-200/90 hero-text-shadow leading-relaxed">
              {guideIntro.subtitle}
            </p>
            <p className="mt-2 sm:mt-3 text-[11px] sm:text-xs text-champagne-400/90 font-mono tracking-wide">
              {guideIntro.disclaimer}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 sm:px-6 py-8 sm:py-12 pb-44">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-px">
            {exploreCategories.map((cat, i) => (
              <Reveal key={cat.id} delay={i * 50}>
                <button
                  onClick={() => setActiveCategory(cat.id)}
                  className="no-tap-highlight group flex w-full items-center justify-between border-b border-ink-700/80 py-5 sm:py-8 text-left transition-all duration-300 hover:border-champagne-500/40 active:scale-[0.99]"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <span className="font-mono text-xs font-light text-champagne-400/60 pt-1.5 sm:pt-2 shrink-0">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-ivory-100 transition-colors group-hover:text-champagne-300">
                        {cat.label}
                      </h3>
                      <p className="mt-1 text-xs text-stone-400 font-serif italic">
                        {cat.recommendations.length} {cat.recommendations.length === 1 ? 'curated selection' : 'curated selections'}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-stone-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-champagne-400 shrink-0" strokeWidth={1.5} />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


