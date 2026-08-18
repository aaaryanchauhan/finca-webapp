import { ArrowRight, Compass } from 'lucide-react';

interface DigitalTourBannerProps {
  onOpenDigitalTour: () => void;
}

export function DigitalTourBanner({ onOpenDigitalTour }: DigitalTourBannerProps) {
  return (
    <section className="bg-ink-900 px-6 py-10 lg:px-12 border-b border-ink-700/60">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl border border-champagne-400/35 bg-gradient-to-br from-ink-800/90 via-ink-800/70 to-champagne-950/25 p-7 sm:p-9 backdrop-blur-md shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 gold-border-glow">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-champagne-400 animate-pulse" />
              <Compass className="h-4 w-4 text-champagne-400" />
              <p className="text-[10px] uppercase tracking-widest-3 text-champagne-400 font-semibold">
                Interactive Estate Tour
              </p>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-ivory-50 hero-text-shadow">
              Take a Guided Digital Tour of Finca Libia
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 font-serif italic max-w-xl leading-relaxed">
              Experience all 18 curated estate stops, from the grand stone entrance and speakeasy bar to the 25m heated infinity pool and Finnish sauna.
            </p>
          </div>
          <button
            onClick={onOpenDigitalTour}
            className="no-tap-highlight group flex items-center gap-3 rounded-full bg-champagne-500 px-7 py-3.5 text-xs font-semibold uppercase tracking-widest-2 text-ink-900 transition-all duration-300 hover:bg-champagne-400 hover:shadow-xl hover:shadow-champagne-500/25 active:scale-95 shrink-0"
          >
            <span>Start 18-Stop Tour</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
