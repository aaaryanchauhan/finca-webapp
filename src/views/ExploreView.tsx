import { useState, useEffect } from 'react';
import { ChevronRight, ArrowLeft, Navigation, MapPin } from 'lucide-react';
import { exploreCategories } from '@/data/content';
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
    setNavTarget({
      name: rec.name,
      category: categoryLabel || currentCategory?.label || 'Recommendation',
      distance: rec.distance,
      description: rec.note,
      insiderTip: rec.quote,
      type: 'off_estate',
    });
  };

  const handleRequestDriver = () => {
    if (onNavigate) {
      onNavigate('concierge');
    }
  };

  if (selectedRec) {
    const isInHouse =
      selectedRec.distance.toLowerCase().includes('on estate') ||
      selectedRec.distance.toLowerCase().includes('in-villa') ||
      (currentCategory && (currentCategory.id === 'do' || currentCategory.id === 'in-house'));

    return (
      <div className="min-h-screen bg-ink-900">
        <NavigationModal
          target={navTarget}
          onClose={() => setNavTarget(null)}
          onRequestDriver={handleRequestDriver}
        />
        <div className="relative h-[55vh] w-full overflow-hidden">
          <img
            src={selectedRec.image}
            alt={selectedRec.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-900/30 to-ink-900" />
          <div className="absolute top-6 left-6 z-10">
            <BackButton onClick={() => setSelectedRec(null)} />
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-6 py-10 pb-44 space-y-8">
          <Reveal>
            <h1 className="font-serif text-5xl font-light text-ivory-50">{selectedRec.name}</h1>
            <p className="mt-3 font-serif text-xl font-light italic text-stone-300">
              {selectedRec.note}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs uppercase tracking-widest-2 text-stone-500">
                {selectedRec.distance}
              </p>
              {!isInHouse && (
                <button
                  onClick={() => openNavigation(selectedRec)}
                  className="no-tap-highlight inline-flex items-center gap-2 rounded-full border border-champagne-500/40 bg-champagne-500/10 px-4 py-2 text-xs uppercase tracking-widest-2 text-champagne-400 transition-all hover:bg-champagne-500/20"
                >
                  <Navigation className="h-3.5 w-3.5" strokeWidth={1.5} />
                  <span>Get Directions</span>
                </button>
              )}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-8 border-l-2 border-champagne-500/30 pl-6">
              <p className="font-serif text-2xl font-light italic text-ivory-200">
                "{selectedRec.quote}"
              </p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-10 flex items-center gap-4">
              <button
                onClick={() => openNavigation(selectedRec)}
                className="no-tap-highlight flex-1 flex items-center justify-center gap-2 rounded bg-champagne-500/90 py-3 text-xs uppercase tracking-widest-2 font-medium text-ink-900 transition-colors hover:bg-champagne-400"
              >
                <MapPin className="h-4 w-4" strokeWidth={1.5} />
                <span>Navigate to Location</span>
              </button>
              <button
                onClick={() => {
                  setSelectedRec(null);
                  setActiveCategory(null);
                }}
                className="no-tap-highlight group inline-flex items-center gap-2 text-stone-400 transition-colors hover:text-ivory-100"
              >
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={1.5} />
                <span className="text-xs uppercase tracking-widest-2">Back</span>
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    );
  }

  if (currentCategory) {
    return (
      <div className="min-h-screen bg-ink-900">
        <NavigationModal
          target={navTarget}
          onClose={() => setNavTarget(null)}
          onRequestDriver={handleRequestDriver}
        />
        <div className="px-6 pt-8 pb-4">
          <BackButton onClick={() => setActiveCategory(null)} />
        </div>
        <div className="mx-auto max-w-3xl px-6 pb-44">
          <Reveal>
            <p className="text-xs uppercase tracking-widest-3 text-stone-500">Medellín</p>
            <h1 className="mt-3 font-serif text-5xl font-light text-ivory-50">{currentCategory.label}</h1>
          </Reveal>
          <div className="mt-10 space-y-4">
            {currentCategory.recommendations.map((rec, i) => (
              <Reveal key={rec.id} delay={i * 80}>
                <div className="group flex w-full flex-col sm:flex-row sm:items-center justify-between border-b border-ink-700 py-6 transition-colors hover:border-champagne-500/30">
                  <button
                    onClick={() => setSelectedRec(rec)}
                    className="no-tap-highlight flex-1 text-left pr-4"
                  >
                    <h3 className="font-serif text-2xl font-light text-ivory-100 transition-colors group-hover:text-champagne-300">
                      {rec.name}
                    </h3>
                    <p className="mt-1 font-serif text-base font-light italic text-stone-400">
                      {rec.note}
                    </p>
                    {rec.address && (
                      <p className="mt-1 text-xs text-stone-300">
                        {rec.address}
                      </p>
                    )}
                    <p className="mt-1 text-[11px] uppercase tracking-widest-2 text-champagne-400/80">
                      {rec.distance}
                    </p>
                  </button>

                  <div className="mt-4 sm:mt-0 flex items-center gap-3">
                    {!(
                      currentCategory.id === 'in-house' ||
                      currentCategory.id === 'do' ||
                      rec.distance.toLowerCase().includes('on estate') ||
                      rec.distance.toLowerCase().includes('in-villa')
                    ) && (
                      <button
                        onClick={() => openNavigation(rec, currentCategory.label)}
                        className="no-tap-highlight inline-flex items-center gap-1.5 rounded border border-ink-600 bg-ink-800/80 px-3.5 py-2 text-xs uppercase tracking-widest-2 text-champagne-400 transition-all hover:bg-ink-700 hover:border-champagne-400/50"
                        title="Get Directions"
                      >
                        <Navigation className="h-3.5 w-3.5" strokeWidth={1.5} />
                        <span>Navigate</span>
                      </button>
                    )}

                    <button
                      onClick={() => setSelectedRec(rec)}
                      className="no-tap-highlight p-2 text-stone-500 hover:text-champagne-400 transition-colors"
                      title="View Details"
                    >
                      <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-900">
      <NavigationModal
        target={navTarget}
        onClose={() => setNavTarget(null)}
        onRequestDriver={handleRequestDriver}
      />
      {/* Hero */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <img
          src="/photos/discover_medellin.jpg"
          alt="Medellín Metrocable"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/20 to-ink-900" />
        <div className="absolute top-6 left-6 z-10">
          <BackButton onClick={onBack} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 pb-10">
          <Reveal>
            <p className="text-xs uppercase tracking-widest-3 text-ivory-200/70">Beyond the estate</p>
            <h1 className="mt-3 font-serif text-5xl font-light text-ivory-50 hero-text-shadow">Discover Medellín</h1>
            <p className="mt-4 max-w-md font-serif text-lg font-light italic text-ivory-200/90 hero-text-shadow">
              Curated by the family — the places we love, the things we do, the secrets we keep.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 py-12 pb-44">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-px">
            {exploreCategories.map((cat, i) => (
              <Reveal key={cat.id} delay={i * 60}>
                <button
                  onClick={() => setActiveCategory(cat.id)}
                  className="no-tap-highlight group flex w-full items-center justify-between border-b border-ink-700/80 py-8 text-left transition-all duration-300 hover:border-champagne-500/40"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xs font-light text-champagne-400/60 pt-2">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-serif text-3xl sm:text-4xl font-light text-ivory-100 transition-colors group-hover:text-champagne-300">
                        {cat.label}
                      </h3>
                      <p className="mt-1.5 text-xs text-stone-400 font-serif italic">
                        {cat.recommendations.length} {cat.recommendations.length === 1 ? 'curated selection' : 'curated selections'}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-6 w-6 text-stone-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-champagne-400 shrink-0" strokeWidth={1.5} />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
