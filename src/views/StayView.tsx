import { useState, useEffect, useCallback } from 'react';
import { ChevronRight, ArrowRight, ArrowLeft, MapPin, Clock, Lightbulb, X, Bed, Users, Sparkles, Play, Pause, Compass, Check } from 'lucide-react';
import { amenities, amenityCategories, bedrooms, propertyStory, residents, tourStops } from '@/data/content';
import { Reveal } from '@/components/Reveal';
import { BackButton } from '@/components/BackButton';
import type { Amenity, Bedroom } from '@/types';

interface StayViewProps {
  onBack: () => void;
}

export function StayView({ onBack }: StayViewProps) {
  const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null);
  const [selectedBedroom, setSelectedBedroom] = useState<Bedroom | null>(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);
  const [tourIndex, setTourIndex] = useState<number | null>(null);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [selectedAmenity, selectedBedroom, tourIndex]);

  // Autoplay timer effect for Digital Tour
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (tourIndex !== null && isAutoplay) {
      timer = setInterval(() => {
        setTourIndex((prev) => {
          if (prev === null) return null;
          return (prev + 1) % tourStops.length;
        });
      }, 5500);
    }
    return () => clearInterval(timer);
  }, [tourIndex, isAutoplay]);

  // Keyboard navigation & spacebar autoplay toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (tourIndex === null) return;
      if (e.key === 'ArrowRight') {
        setTourIndex((prev) => (prev !== null ? (prev + 1) % tourStops.length : null));
      } else if (e.key === 'ArrowLeft') {
        setTourIndex((prev) => (prev !== null ? (prev - 1 + tourStops.length) % tourStops.length : null));
      } else if (e.key === 'Escape') {
        setTourIndex(null);
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsAutoplay((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [tourIndex]);

  // Digital Tour Overlay Mode
  if (tourIndex !== null) {
    const currentStop = tourStops[tourIndex];

    return (
      <div className="fixed inset-0 z-50 flex flex-col justify-between bg-ink-950/98 backdrop-blur-2xl animate-fade-in text-ivory-100 overflow-hidden select-none">
        {/* Top Segmented Progress Bar */}
        <div className="absolute top-0 left-0 right-0 z-40 flex gap-1 p-1.5 bg-ink-950/60 backdrop-blur-xs">
          {tourStops.map((stop, idx) => (
            <button
              key={stop.id}
              onClick={() => setTourIndex(idx)}
              className="h-1 flex-1 rounded-full overflow-hidden bg-ivory-200/20 transition-all duration-300 relative group"
              title={`Stop ${stop.number}: ${stop.title}`}
            >
              <div
                className={`h-full transition-all ${
                  idx === tourIndex
                    ? 'bg-champagne-400 w-full'
                    : idx < tourIndex
                    ? 'bg-ivory-200/80 w-full'
                    : 'w-0'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Smooth Background Image Cross-fade */}
        {tourStops.map((stop, idx) => (
          <div
            key={stop.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none ${
              idx === tourIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={stop.image}
              alt={stop.title}
              className="h-full w-full object-cover animate-slow-zoom brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-900/60 to-ink-950/90" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(26,24,22,0.4)_0%,_rgba(26,24,22,0.85)_100%)]" />
          </div>
        ))}

        {/* Header Bar */}
        <header className="relative z-30 flex items-center justify-between p-6 pt-8 lg:px-12 border-b border-ink-700/60 bg-ink-950/60 backdrop-blur-md">
          <BackButton onClick={() => setTourIndex(null)} label="Exit Tour" />

          <div className="hidden sm:flex items-center gap-3 bg-ink-900/80 border border-ink-700/80 px-5 py-2 backdrop-blur-md rounded-full shadow-lg">
            <Compass className="h-4 w-4 text-champagne-400 animate-spin-slow" />
            <span className="font-serif text-sm font-light text-ivory-50 tracking-wider">
              FINCA LIBIA DIGITAL TOUR
            </span>
          </div>

          <button
            onClick={() => setIsAutoplay(!isAutoplay)}
            className={`no-tap-highlight flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-widest backdrop-blur-md transition-all shadow-xl ${
              isAutoplay
                ? 'border-champagne-400 bg-champagne-500 text-ink-900 font-semibold'
                : 'border-ivory-200/20 bg-ink-900/70 text-ivory-100 hover:border-champagne-400 hover:text-champagne-300'
            }`}
          >
            {isAutoplay ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current" />}
            <span>{isAutoplay ? 'Autoplay ON' : 'Autoplay OFF'}</span>
          </button>
        </header>

        {/* Bottom Typography Showcase */}
        <div className="relative z-20 mx-auto max-w-3xl px-6 text-center mt-auto mb-4 space-y-2">
          <span className="text-[11px] uppercase tracking-widest-3 text-champagne-400 font-medium block">
            {currentStop.category}
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-light text-ivory-50 hero-text-shadow leading-tight">
            {currentStop.title}
          </h2>

          <p className="font-serif text-base sm:text-lg font-light italic text-ivory-100/90 hero-text-shadow max-w-2xl mx-auto leading-relaxed">
            {currentStop.description}
          </p>
        </div>

        {/* Interactive Bottom Control Strip & Thumbnail Carousel */}
        <footer className="relative z-30 border-t border-ink-700/80 bg-ink-950/90 backdrop-blur-xl p-6 lg:px-12 space-y-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <button
              onClick={() => setTourIndex((prev) => (prev !== null ? (prev - 1 + tourStops.length) % tourStops.length : 0))}
              className="no-tap-highlight inline-flex items-center gap-2 text-xs uppercase tracking-widest text-ivory-200 transition-colors hover:text-champagne-300"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous Stop</span>
            </button>

            <span className="font-mono text-xs text-stone-400 tracking-widest">
              {tourIndex + 1} / {tourStops.length}
            </span>

            <button
              onClick={() => setTourIndex((prev) => (prev !== null ? (prev + 1) % tourStops.length : 0))}
              className="no-tap-highlight inline-flex items-center gap-2 text-xs uppercase tracking-widest text-champagne-300 transition-colors hover:text-champagne-200"
            >
              <span>Next Stop</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Thumbnail Selector Strip */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none max-w-7xl mx-auto pt-2 border-t border-ink-800/60">
            {tourStops.map((stop, idx) => (
              <button
                key={stop.id}
                onClick={() => setTourIndex(idx)}
                className={`group flex items-center gap-2 shrink-0 p-1.5 rounded-lg border transition-all duration-300 text-left ${
                  idx === tourIndex
                    ? 'border-champagne-400 bg-ink-800/90 shadow-lg scale-105'
                    : 'border-ink-700/50 bg-ink-900/50 opacity-60 hover:opacity-100 hover:border-ink-600'
                }`}
              >
                <div className="h-10 w-14 overflow-hidden rounded bg-ink-800 shrink-0">
                  <img src={stop.image} alt={stop.title} className="h-full w-full object-cover" />
                </div>
                <div className="pr-2">
                  <span className="block text-[10px] text-champagne-400 font-mono">
                    #{stop.number}
                  </span>
                  <span className="block text-xs font-serif text-ivory-100 max-w-[120px] truncate">
                    {stop.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </footer>
      </div>
    );
  }

  // Bedroom Modal Detail View
  if (selectedBedroom) {
    const allPhotos = [...selectedBedroom.photos, ...(selectedBedroom.bathroomPhotos || [])];
    const currentPhoto = allPhotos[activePhotoIdx] || allPhotos[0];

    return (
      <div className="min-h-screen bg-ink-900 text-ivory-100">
        <div className="relative h-[55vh] w-full overflow-hidden bg-ink-950">
          <img
            src={currentPhoto}
            alt={selectedBedroom.name}
            className="h-full w-full object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-900/50 via-transparent to-ink-900" />
          <div className="absolute top-6 left-6 z-10">
            <BackButton onClick={() => setSelectedBedroom(null)} />
          </div>

          {/* Photo Carousel Nav */}
          {allPhotos.length > 1 && (
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-10">
              <span className="text-xs font-mono text-champagne-300 bg-ink-900/80 px-3 py-1 rounded-full border border-ink-700">
                Photo {activePhotoIdx + 1} of {allPhotos.length}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setActivePhotoIdx((prev) => (prev > 0 ? prev - 1 : allPhotos.length - 1))}
                  className="rounded-full bg-ink-900/80 p-2 text-ivory-100 hover:text-champagne-300 border border-ink-700"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setActivePhotoIdx((prev) => (prev < allPhotos.length - 1 ? prev + 1 : 0))}
                  className="rounded-full bg-ink-900/80 p-2 text-ivory-100 hover:text-champagne-300 border border-ink-700"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Thumbnail Gallery */}
        <div className="px-6 py-4 bg-ink-950/80 border-b border-ink-700 flex gap-3 overflow-x-auto">
          {allPhotos.map((img, i) => (
            <button
              key={i}
              onClick={() => setActivePhotoIdx(i)}
              className={`relative h-16 w-24 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                activePhotoIdx === i ? 'border-champagne-400 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>

        {/* Bedroom Details */}
        <div className="mx-auto max-w-2xl px-6 pt-10 pb-44 space-y-8">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest-2 text-champagne-400 font-medium">{selectedBedroom.pdfName}</span>
              <span className="text-stone-500">•</span>
              <span className="text-xs text-stone-400">{selectedBedroom.capacity}</span>
            </div>
            <h1 className="mt-2 font-serif text-4xl font-light text-ivory-50">{selectedBedroom.name}</h1>
            <p className="mt-2 font-serif text-lg font-light italic text-stone-300">{selectedBedroom.subtitle}</p>
          </Reveal>

          <Reveal delay={100}>
            <p className="text-sm leading-relaxed text-ivory-200">{selectedBedroom.description}</p>
          </Reveal>

          <Reveal delay={150}>
            <div className="grid grid-cols-2 gap-4 border-y border-ink-700 py-6">
              <div className="flex items-center gap-3">
                <Bed className="h-5 w-5 text-champagne-400" strokeWidth={1.5} />
                <div>
                  <p className="text-[10px] uppercase tracking-widest-2 text-stone-400">Bed Configuration</p>
                  <p className="text-xs font-serif text-ivory-100 mt-0.5">{selectedBedroom.bedType}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-champagne-400" strokeWidth={1.5} />
                <div>
                  <p className="text-[10px] uppercase tracking-widest-2 text-stone-400">Occupancy</p>
                  <p className="text-xs font-serif text-ivory-100 mt-0.5">{selectedBedroom.capacity}</p>
                </div>
              </div>
            </div>
          </Reveal>

          {selectedBedroom.features && selectedBedroom.features.length > 0 && (
            <Reveal delay={200}>
              <h3 className="font-serif text-xl font-light text-ivory-50">Suite Features</h3>
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-stone-300">
                {selectedBedroom.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 rounded-xl bg-ink-800/60 p-3 border border-ink-700">
                    <Sparkles className="h-3.5 w-3.5 text-champagne-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </div>
    );
  }

  // Amenity Detail View
  if (selectedAmenity) {
    const amenityPhotos = selectedAmenity.photos || [selectedAmenity.image];
    const currentPhoto = amenityPhotos[activePhotoIdx] || selectedAmenity.image;

    return (
      <div className="min-h-screen bg-ink-900">
        <div className="relative h-[50vh] w-full overflow-hidden bg-ink-950">
          <img
            src={currentPhoto}
            alt={selectedAmenity.name}
            className="h-full w-full object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-900/40 via-transparent to-ink-900" />
          <div className="absolute top-6 left-6 z-10">
            <BackButton onClick={() => { setSelectedAmenity(null); setActivePhotoIdx(0); }} />
          </div>

          {amenityPhotos.length > 1 && (
            <div className="absolute top-6 right-6 z-10 flex items-center gap-2">
              <span className="text-xs font-mono text-champagne-300 bg-ink-900/80 px-3 py-1 rounded-full border border-ink-700 backdrop-blur-md">
                {activePhotoIdx + 1} / {amenityPhotos.length}
              </span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setActivePhotoIdx((prev) => (prev > 0 ? prev - 1 : amenityPhotos.length - 1))}
                  className="no-tap-highlight rounded-full bg-ink-900/80 p-2 text-ivory-100 hover:text-champagne-300 border border-ink-700 backdrop-blur-md transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setActivePhotoIdx((prev) => (prev < amenityPhotos.length - 1 ? prev + 1 : 0))}
                  className="no-tap-highlight rounded-full bg-ink-900/80 p-2 text-ivory-100 hover:text-champagne-300 border border-ink-700 backdrop-blur-md transition-colors"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mx-auto max-w-2xl px-6 pb-44 -mt-20 relative z-10">
          <Reveal>
            <h1 className="font-serif text-5xl font-light text-ivory-50">{selectedAmenity.name}</h1>
            <p className="mt-3 font-serif text-xl font-light italic text-stone-300">
              {selectedAmenity.tagline}
            </p>
          </Reveal>

          {amenityPhotos.length > 1 && (
            <Reveal delay={50}>
              <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
                {amenityPhotos.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePhotoIdx(i)}
                    className={`no-tap-highlight relative h-16 w-24 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                      activePhotoIdx === i ? 'border-champagne-400 scale-105 shadow-lg' : 'border-ink-700/80 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </Reveal>
          )}

          <Reveal delay={100}>
            <p className="mt-8 text-base leading-relaxed text-ivory-200">
              {selectedAmenity.description}
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-10 space-y-6">
              <div className="flex gap-4">
                <MapPin className="h-5 w-5 shrink-0 text-stone-500" strokeWidth={1.5} />
                <div>
                  <p className="text-xs uppercase tracking-widest-2 text-stone-500">Location</p>
                  <p className="mt-1 text-sm text-ivory-200">{selectedAmenity.location}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="h-5 w-5 shrink-0 text-stone-500" strokeWidth={1.5} />
                <div>
                  <p className="text-xs uppercase tracking-widest-2 text-stone-500">Best time</p>
                  <p className="mt-1 text-sm text-ivory-200">{selectedAmenity.bestTime}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Lightbulb className="h-5 w-5 shrink-0 text-champagne-400" strokeWidth={1.5} />
                <div>
                  <p className="text-xs uppercase tracking-widest-2 text-champagne-400/70">Insider tip</p>
                  <p className="mt-1 text-sm font-serif italic text-ivory-200">{selectedAmenity.insiderTip}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-10 border-t border-ink-700 pt-8">
              <p className="text-xs uppercase tracking-widest-2 text-stone-500">Instructions</p>
              <p className="mt-3 text-sm leading-relaxed text-stone-300">{selectedAmenity.instructions}</p>
            </div>
          </Reveal>

          <Reveal delay={250}>
            <button
              onClick={() => {
                const tourStartIdx = tourStops.findIndex(
                  (s) => s.title.toLowerCase().includes(selectedAmenity.id) || s.id === selectedAmenity.id
                );
                setTourIndex(tourStartIdx >= 0 ? tourStartIdx : 0);
              }}
              className="no-tap-highlight group mt-10 inline-flex items-center gap-2 text-champagne-400 transition-colors hover:text-champagne-300"
            >
              <span className="text-sm tracking-wide">Start tour from here</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
            </button>
          </Reveal>
        </div>
      </div>
    );
  }

  // Main Stay Page
  return (
    <div className="min-h-screen bg-ink-900 pb-44">
      {/* Hero */}
      <section className="relative h-[55vh] w-full overflow-hidden">
        <img
          src={propertyStory[0].image}
          alt="Finca Libia Estate"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/30 to-ink-900" />
        <div className="absolute top-6 left-6 z-10">
          <BackButton onClick={onBack} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 pb-10">
          <Reveal>
            <p className="text-xs uppercase tracking-widest-3 text-ivory-200/70">The Estate</p>
            <h1 className="mt-3 font-serif text-5xl font-light text-ivory-50 hero-text-shadow">Explore the Estate</h1>
          </Reveal>
        </div>
      </section>

      {/* Digital Tour Banner */}
      <section className="px-6 py-8">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-champagne-400/35 bg-gradient-to-br from-ink-800/90 via-ink-800/70 to-champagne-950/25 p-7 sm:p-8 backdrop-blur-md shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 gold-border-glow">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-champagne-400 animate-pulse" />
                  <p className="text-[10px] uppercase tracking-widest-3 text-champagne-400 font-medium">Digital Estate Tour</p>
                </div>
                <p className="font-serif text-2xl font-light text-ivory-50 mt-1.5 hero-text-shadow">
                  Take an interactive tour of the property.
                </p>
                <p className="text-xs text-stone-300 mt-1 font-serif italic">
                  Guided 360-degree walkthrough of all 18 estate chapters & amenities.
                </p>
              </div>
              <button
                onClick={() => setTourIndex(0)}
                className="no-tap-highlight group flex items-center gap-2.5 rounded-full bg-champagne-500/90 px-6 py-3 text-xs uppercase tracking-widest-2 font-medium text-ink-900 transition-all duration-300 hover:bg-champagne-400 hover:shadow-lg hover:shadow-champagne-500/20 active:scale-95 shrink-0"
              >
                <span>Start the tour</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Master Bedrooms Showcase */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="text-xs uppercase tracking-widest-3 text-champagne-400/80 font-medium">Accommodations</p>
            <h2 className="mt-2 font-serif text-4xl font-light text-ivory-50">6 Master Bedroom Suites</h2>
            <p className="mt-2 text-sm text-stone-400">Click any suite to view all photos, specs, and ensuite bath details.</p>
          </Reveal>

          <div className="mt-8 grid grid-cols-2 gap-3.5 sm:gap-5 items-stretch">
            {bedrooms.map((bedroom, idx) => (
              <Reveal key={bedroom.id} delay={idx * 60} className="h-full flex flex-col w-full">
                <button
                  onClick={() => {
                    setSelectedBedroom(bedroom);
                    setActivePhotoIdx(0);
                  }}
                  className="no-tap-highlight group flex flex-col justify-between text-left h-full w-full overflow-hidden rounded-2xl border border-ink-700/80 bg-ink-800/40 backdrop-blur-md transition-all duration-300 hover:border-champagne-400/60 hover:bg-ink-800/70 hover:shadow-xl flex-1"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden shrink-0">
                    <img
                      src={bedroom.photos[0]}
                      alt={bedroom.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 rounded-full bg-ink-900/80 px-2 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-[10px] uppercase tracking-widest-2 text-champagne-300 border border-champagne-400/30 backdrop-blur-sm">
                      {bedroom.capacity}
                    </div>
                  </div>
                  <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between w-full">
                    <div>
                      <h3 className="font-serif text-base sm:text-2xl font-light text-ivory-100 transition-colors group-hover:text-champagne-300 leading-tight">
                        {bedroom.name}
                      </h3>
                      <p className="mt-1 text-[11px] sm:text-xs text-stone-400 leading-relaxed line-clamp-2">
                        {bedroom.subtitle}
                      </p>
                    </div>
                    <div className="mt-3 sm:mt-4 flex items-center justify-between text-[10px] sm:text-xs text-stone-400 border-t border-ink-700/60 pt-2.5 sm:pt-3">
                      <span className="truncate pr-1">{bedroom.bedType}</span>
                      <span className="text-champagne-400 group-hover:translate-x-1 transition-transform shrink-0">Explore →</span>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities & Featured Grounds */}
      <section className="px-6 py-16 bg-ink-800/20 border-t border-ink-700">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="text-xs uppercase tracking-widest-3 text-champagne-400 font-medium">Estate Highlights</p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-light text-ivory-50">Featured Amenities</h2>
          </Reveal>
          <div className="mt-8 space-y-px">
            {amenities.map((amenity, i) => (
              <Reveal key={amenity.id} delay={i * 50}>
                <button
                  onClick={() => setSelectedAmenity(amenity)}
                  className="no-tap-highlight group flex w-full items-center justify-between border-b border-ink-700 py-6 text-left transition-colors hover:border-champagne-500/30"
                >
                  <div className="flex-1">
                    <h3 className="font-serif text-3xl font-light text-ivory-100 transition-colors group-hover:text-champagne-300">
                      {amenity.name}
                    </h3>
                    <p className="mt-1 font-serif text-base font-light italic text-stone-400">
                      {amenity.tagline}
                    </p>
                  </div>
                  <ChevronRight className="h-6 w-6 text-stone-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-champagne-400" strokeWidth={1.5} />
                </button>
              </Reveal>
            ))}
          </div>

          {/* Complete Categorized Amenities Breakdown */}
          <div className="mt-20 pt-12 border-t border-ink-700/80">
            <Reveal>
              <div className="flex items-center gap-2 text-champagne-400">
                <Sparkles className="h-4 w-4" strokeWidth={1.5} />
                <span className="text-[10px] uppercase tracking-widest-3 font-medium">Amenities</span>
              </div>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-light text-ivory-50">
                What This Place Offers
              </h2>
              <p className="mt-2 text-sm text-stone-400 leading-relaxed font-serif italic">
                Every luxury, convenience, and entertainment feature included with your stay at Finca Libia.
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-6">
              {amenityCategories.map((cat, i) => (
                <Reveal key={cat.id} delay={i * 40}>
                  <div className="rounded-2xl border border-ink-700/80 bg-ink-900/60 p-6 backdrop-blur-md space-y-4 hover:border-champagne-500/30 transition-all">
                    <h3 className="font-serif text-xl font-light text-ivory-100 border-b border-ink-700/60 pb-3">
                      {cat.title}
                    </h3>
                    <ul className="space-y-3">
                      {cat.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs">
                          <Check className="h-4 w-4 text-champagne-400 shrink-0 mt-0.5" strokeWidth={2} />
                          <div>
                            <p className="text-ivory-100 font-medium">{item.name}</p>
                            {item.detail && (
                              <p className="text-[11px] text-stone-400 leading-normal mt-0.5">{item.detail}</p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>



    </div>
  );
}
