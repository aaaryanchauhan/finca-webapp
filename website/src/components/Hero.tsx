import { useState, useEffect } from 'react';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { villaInfo } from '../data/villaData';

interface HeroProps {
  onOpenDigitalTour: () => void;
}

export function Hero({ onOpenDigitalTour }: HeroProps) {
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % villaInfo.heroImages.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const nextBg = () => {
    setCurrentBg((prev) => (prev + 1) % villaInfo.heroImages.length);
  };

  const prevBg = () => {
    setCurrentBg((prev) => (prev - 1 + villaInfo.heroImages.length) % villaInfo.heroImages.length);
  };

  return (
    <section id="overview" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image Carousel */}
      {villaInfo.heroImages.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-[2.5s] ease-in-out ${
            index === currentBg ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={img}
            alt="Finca Libia Estate"
            className="h-full w-full object-cover animate-slow-zoom"
          />
        </div>
      ))}

      {/* Multi-layered Contrast Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900/90 via-ink-900/50 to-ink-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(26,24,22,0.65)_0%,_rgba(26,24,22,0)_75%)] pointer-events-none" />

      {/* Hero Central Content */}
      <div className="relative z-20 mx-auto max-w-4xl px-6 text-center mt-12">
        <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight text-ivory-50 hero-text-shadow drop-shadow-2xl animate-fade-up">
          Finca Libia
        </h1>

        <p className="mt-6 max-w-3xl mx-auto font-serif text-xl sm:text-2xl font-light italic leading-relaxed text-ivory-100 hero-text-shadow drop-shadow-md animate-fade-up animate-delay-100">
          Escape to Finca Libia, a luxury estate unlike any other. Designed with exquisite attention to detail, this newly built farmhouse redefines countryside elegance.
        </p>

        {/* Action Button: Featured Digital Tour */}
        <div className="mt-10 flex justify-center animate-fade-up animate-delay-200">
          <button
            onClick={onOpenDigitalTour}
            className="no-tap-highlight group inline-flex items-center justify-center gap-3 border border-champagne-400/60 bg-champagne-500/90 px-8 py-4 text-xs font-semibold uppercase tracking-widest-2 text-ink-900 shadow-2xl backdrop-blur-md transition-all duration-300 hover:bg-champagne-300 hover:shadow-champagne-500/40 hover:scale-105 active:scale-95"
          >
            <Play className="h-4 w-4 fill-ink-900 text-ink-900 transition-transform group-hover:scale-110" />
            <span>Digital Tour</span>
          </button>
        </div>
      </div>

      {/* Carousel Controls & Indicators */}
      <div className="absolute bottom-8 left-6 right-6 z-20 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          {villaInfo.heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentBg(idx)}
              className={`h-1.5 transition-all duration-500 ${
                idx === currentBg ? 'w-8 bg-champagne-400' : 'w-2 bg-ivory-200/40 hover:bg-ivory-200/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={prevBg}
            className="p-2 border border-ivory-200/20 bg-ink-900/50 text-ivory-100 backdrop-blur-md transition-all hover:bg-ink-900 hover:border-champagne-400"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={nextBg}
            className="p-2 border border-ivory-200/20 bg-ink-900/50 text-ivory-100 backdrop-blur-md transition-all hover:bg-ink-900 hover:border-champagne-400"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
