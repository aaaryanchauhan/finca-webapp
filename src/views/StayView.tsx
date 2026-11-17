import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, ArrowRight, ArrowLeft, MapPin, Clock, Lightbulb, X, Bed, Users, Sparkles, Check } from 'lucide-react';
import { amenities, amenityCategories, bedrooms, propertyStory, residents, collageChapters } from '@/data/content';
import { Reveal } from '@/components/Reveal';
import { BackButton } from '@/components/BackButton';
import { EstateCollage } from '@/components/EstateCollage';
import type { Amenity, Bedroom } from '@/types';

interface StayViewProps {
  onBack: () => void;
  /** Open straight into the photo tour (e.g. from the home page link). */
  autoOpenTour?: boolean;
  onTourOpened?: () => void;
}

export function StayView({ onBack, autoOpenTour = false, onTourOpened }: StayViewProps) {
  const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null);
  const [selectedBedroom, setSelectedBedroom] = useState<Bedroom | null>(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);
  const [tourOpen, setTourOpen] = useState<boolean>(autoOpenTour);

  useEffect(() => {
    if (autoOpenTour) onTourOpened?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [tourChapter, setTourChapter] = useState<string | undefined>(undefined);

  const openTour = (chapterId?: string) => {
    setTourChapter(chapterId);
    setTourOpen(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [selectedAmenity, selectedBedroom, tourOpen]);

  // Estate collage (visual tour)
  if (tourOpen) {
    return <EstateCollage onClose={() => setTourOpen(false)} startChapterId={tourChapter} />;
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
              onClick={() =>
                openTour(collageChapters.find((c) => c.amenityIds?.includes(selectedAmenity.id))?.id)
              }
              className="no-tap-highlight group mt-10 inline-flex items-center gap-2 text-champagne-400 transition-colors hover:text-champagne-300"
            >
              <span className="text-sm tracking-wide">See it in the collage</span>
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

      {/* Estate collage teaser: a light, full-bleed panel so it breaks from the dark page */}
      <section className="bg-ivory-100 px-6 py-14 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <button
              type="button"
              onClick={() => openTour()}
              className="no-tap-highlight group block w-full text-left"
              aria-label="Open the photo tour of the estate"
            >
              <div className="grid aspect-[16/10] grid-cols-3 grid-rows-2 gap-2 overflow-hidden">
                <div className="col-span-2 row-span-2 overflow-hidden">
                  <img
                    src="/photos/exterior/exterior_10.jpeg"
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                </div>
                <div className="overflow-hidden">
                  <img
                    src="/photos/pool/pool_01.jpeg"
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                </div>
                <div className="overflow-hidden">
                  <img
                    src="/photos/dining_area/dining_area_01.jpeg"
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                </div>
              </div>

              <h2 className="mt-9 font-serif text-5xl font-light leading-[1.02] tracking-tight text-ink-900 sm:text-6xl">
                The estate, <em className="font-normal italic text-champagne-600">in photographs.</em>
              </h2>
              <p className="mt-4 max-w-[44ch] font-serif text-xl italic leading-relaxed text-ink-600">
                A walk through the house, the grounds, and the company you will keep.
              </p>
              <span className="mt-8 inline-flex min-h-[52px] items-center gap-3 rounded-full bg-ink-900 px-8 py-4 text-xs font-medium uppercase tracking-widest-2 text-ivory-50 transition-all duration-300 group-hover:bg-ink-700 group-active:scale-95">
                <span>Open the photo tour</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
              </span>
            </button>
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
          <div className="mt-20 border-t border-ink-700/80 pt-14">
            <Reveal>
              <h2 className="font-serif text-4xl font-light leading-tight text-ivory-50 sm:text-5xl">
                What this place offers.
              </h2>
              <p className="mt-3 max-w-[48ch] font-serif text-lg italic text-stone-300">
                Every convenience and entertainment feature included with your stay, by room and by season.
              </p>
            </Reveal>

            <Reveal>
              <div className="mt-10 divide-y divide-ink-700/70 border-y border-ink-700/70">
                {amenityCategories.map((cat, i) => (
                  <details key={cat.id} className="group" open={i === 0}>
                    <summary className="no-tap-highlight flex min-h-[68px] cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
                      <span className="font-serif text-2xl font-light text-ivory-100 transition-colors group-open:text-champagne-300 group-hover:text-champagne-300">
                        {cat.title}
                      </span>
                      <span className="flex shrink-0 items-center gap-3 text-sm text-stone-400">
                        <span aria-label={`${cat.items.length} items`}>{cat.items.length}</span>
                        <ChevronDown
                          className="h-5 w-5 transition-transform duration-300 group-open:rotate-180"
                          strokeWidth={1.5}
                        />
                      </span>
                    </summary>
                    <ul className="pb-6 sm:columns-2 sm:gap-x-12">
                      {cat.items.map((item) => (
                        <li key={item.name} className="break-inside-avoid border-t border-ink-700/40 py-3.5 first:border-t-0">
                          <p className="text-[15px] leading-snug text-ivory-100">{item.name}</p>
                          {item.detail && (
                            <p className="mt-1 text-[13px] leading-snug text-stone-400">{item.detail}</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>



    </div>
  );
}
