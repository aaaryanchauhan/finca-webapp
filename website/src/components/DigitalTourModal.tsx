import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Play, Pause, Compass, Sparkles } from 'lucide-react';
import { websiteTourStops } from '../data/villaData';

interface DigitalTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DigitalTourModal({ isOpen, onClose }: DigitalTourModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const currentStop = websiteTourStops[currentIndex];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % websiteTourStops.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + websiteTourStops.length) % websiteTourStops.length);
  }, []);

  // Autoplay timer effect for Digital Tour
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isPlaying && isOpen) {
      timer = setInterval(() => {
        handleNext();
      }, 5500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, isOpen, handleNext]);

  // Keyboard navigation & spacebar play/pause toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-ink-950/98 backdrop-blur-2xl animate-fade-in text-ivory-100 overflow-hidden select-none">
      {/* Top Segmented Progress Bar */}
      <div className="absolute top-0 left-0 right-0 z-40 flex gap-1 p-1.5 bg-ink-950/60 backdrop-blur-xs">
        {websiteTourStops.map((stop, idx) => (
          <button
            key={stop.id}
            onClick={() => setCurrentIndex(idx)}
            className="h-1 flex-1 rounded-full overflow-hidden bg-ivory-200/20 transition-all duration-300 relative group"
            title={`Stop ${stop.number}: ${stop.title}`}
          >
            <div
              className={`h-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'bg-champagne-400 w-full'
                  : idx < currentIndex
                  ? 'bg-ivory-200/80 w-full'
                  : 'w-0'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Smooth Background Image Cross-fade Showcase */}
      {websiteTourStops.map((stop, idx) => (
        <div
          key={stop.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none ${
            idx === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={stop.image}
            alt={stop.title}
            className="h-full w-full object-cover animate-slow-zoom brightness-90"
          />
          {/* Multi-layered dark radial and linear vignettes */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-900/60 to-ink-950/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(26,24,22,0.4)_0%,_rgba(26,24,22,0.85)_100%)]" />
        </div>
      ))}

      {/* Header Bar */}
      <header className="relative z-30 flex items-center justify-between p-6 pt-8 lg:px-12 border-b border-ink-700/60 bg-ink-950/60 backdrop-blur-md">
        <button
          onClick={onClose}
          className="no-tap-highlight group flex items-center gap-2 border border-ivory-200/20 bg-ink-900/70 px-4 py-2 text-xs font-medium uppercase tracking-widest text-ivory-100 backdrop-blur-md transition-all duration-300 hover:border-champagne-400 hover:bg-champagne-500 hover:text-ink-900 shadow-xl rounded-full"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Exit Tour</span>
        </button>

        <div className="hidden sm:flex items-center gap-3 bg-ink-900/80 border border-ink-700/80 px-5 py-2 backdrop-blur-md rounded-full shadow-lg">
          <Compass className="h-4 w-4 text-champagne-400 animate-spin-slow" />
          <span className="font-serif text-sm font-light text-ivory-50 tracking-wider">
            FINCA LIBIA DIGITAL TOUR
          </span>
        </div>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`no-tap-highlight flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-widest backdrop-blur-md transition-all shadow-xl ${
            isPlaying
              ? 'border-champagne-400 bg-champagne-500 text-ink-900 font-semibold'
              : 'border-ivory-200/20 bg-ink-900/70 text-ivory-100 hover:border-champagne-400 hover:text-champagne-300'
          }`}
        >
          {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current" />}
          <span>{isPlaying ? 'Autoplay ON' : 'Autoplay OFF'}</span>
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

        {currentStop.details && (
          <div className="pt-2">
            <span className="inline-flex items-center gap-2 text-xs text-stone-300 font-sans tracking-wide bg-ink-900/70 border border-ink-700/80 px-4 py-1.5 rounded-full backdrop-blur-md shadow-md">
              <Sparkles className="h-3.5 w-3.5 text-champagne-400 shrink-0" />
              <span>{currentStop.details}</span>
            </span>
          </div>
        )}
      </div>

      {/* Bottom Interactive Thumbnail & Control Strip */}
      <footer className="relative z-30 border-t border-ink-700/80 bg-ink-950/90 backdrop-blur-xl p-6 lg:px-12 space-y-4">
        {/* Navigation Bar Controls */}
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <button
            onClick={handlePrev}
            className="no-tap-highlight inline-flex items-center gap-2 text-xs uppercase tracking-widest text-ivory-200 transition-colors hover:text-champagne-300"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous Stop</span>
          </button>

          <span className="font-mono text-xs text-stone-400 tracking-widest">
            {currentIndex + 1} / {websiteTourStops.length}
          </span>

          <button
            onClick={handleNext}
            className="no-tap-highlight inline-flex items-center gap-2 text-xs uppercase tracking-widest text-champagne-300 transition-colors hover:text-champagne-200"
          >
            <span>Next Stop</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Thumbnail Selector Strip */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none max-w-7xl mx-auto pt-2 border-t border-ink-800/60">
          {websiteTourStops.map((stop, idx) => (
            <button
              key={stop.id}
              onClick={() => setCurrentIndex(idx)}
              className={`group flex items-center gap-2 shrink-0 p-1.5 rounded-lg border transition-all duration-300 text-left ${
                idx === currentIndex
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

