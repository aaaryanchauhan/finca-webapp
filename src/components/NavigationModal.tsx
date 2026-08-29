import { useState } from 'react';
import { Navigation, MapPin, Compass, ExternalLink, Car, X, Check, Clock } from 'lucide-react';

export interface NavigationTarget {
  name: string;
  category?: string;
  distance?: string;
  address?: string;
  description?: string;
  type?: 'off_estate' | 'on_estate';
  insiderTip?: string;
  mapUrl?: string;
}

interface NavigationModalProps {
  target: NavigationTarget | null;
  onClose: () => void;
  onRequestDriver?: (locationName: string) => void;
}

export function NavigationModal({ target, onClose, onRequestDriver }: NavigationModalProps) {
  const [driverRequested, setDriverRequested] = useState(false);

  if (!target) return null;

  const isOffEstate = target.type !== 'on_estate';
  const googleMapsUrl =
    target.mapUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      target.name + ' Medellín Colombia'
    )}`;
  const appleMapsUrl =
    target.mapUrl ||
    `https://maps.apple.com/?q=${encodeURIComponent(
      target.name + ' Medellín Colombia'
    )}`;

  const handleDriverRequest = () => {
    setDriverRequested(true);
    if (onRequestDriver) {
      onRequestDriver(target.name);
    }
    setTimeout(() => {
      setDriverRequested(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-ink-900/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl border border-ink-700/80 bg-ink-800 shadow-2xl">
        {/* Header bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink-700 bg-ink-800/95 px-5 sm:px-6 py-3.5 sm:py-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-champagne-400">
            <Compass className="h-5 w-5 animate-spin-slow" strokeWidth={1.5} />
            <span className="text-xs font-medium uppercase tracking-widest-2">
              {isOffEstate ? 'Estate Navigation Demo' : 'Estate Map Guidance'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="no-tap-highlight text-stone-400 hover:text-ivory-100 transition-colors"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Destination Header */}
          <div>
            <span className="text-xs uppercase tracking-widest-2 text-stone-500">
              {target.category || (isOffEstate ? 'Destination' : 'Estate Amenity')}
            </span>
            <h2 className="font-serif text-3xl font-light text-ivory-50 mt-1">{target.name}</h2>
            {target.distance && (
              <div className="mt-2 flex items-center gap-2 text-xs text-stone-400">
                <Clock className="h-3.5 w-3.5 text-champagne-400" strokeWidth={1.5} />
                <span>{target.distance}</span>
              </div>
            )}
          </div>

          {/* Interactive Map Visual Mockup */}
          <div className="relative h-44 w-full overflow-hidden rounded-md border border-ink-700 bg-ink-900 flex flex-col justify-between p-4">
            {/* Dark map Grid pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#322e29_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

            {/* Glowing route graphic */}
            <svg className="absolute inset-0 h-full w-full stroke-champagne-400/40" fill="none">
              <path
                d="M 40 120 C 100 120, 120 40, 240 50 C 300 60, 320 110, 420 80"
                strokeWidth="3"
                strokeDasharray="6 6"
                className="animate-pulse"
              />
            </svg>

            {/* Origin Pin */}
            <div className="relative z-10 flex items-center gap-2 bg-ink-900/80 backdrop-blur-sm self-start px-3 py-1.5 rounded-full border border-ink-700 text-xs">
              <div className="h-2 w-2 rounded-full bg-olive-400 animate-ping" />
              <span className="text-stone-300 font-serif text-xs">Origin: Finca Libia Estate</span>
            </div>

            {/* Destination Pin */}
            <div className="relative z-10 flex items-center gap-2 bg-champagne-500/20 backdrop-blur-sm self-end px-3 py-1.5 rounded-full border border-champagne-500/40 text-xs">
              <MapPin className="h-3.5 w-3.5 text-champagne-400" strokeWidth={1.5} />
              <span className="text-ivory-100 font-serif text-xs font-light">{target.name}</span>
            </div>
          </div>

          {/* Turn Guidance / Route description */}
          <div className="border-l-2 border-champagne-500/30 pl-4 py-1">
            <p className="font-serif text-base font-light italic text-ivory-200">
              {target.description ||
                (isOffEstate
                  ? `Recommended route via Vía Las Palmas. Estimated travel time is ${target.distance || '20-30 mins'}.`
                  : `Located at ${target.address || 'the estate grounds'}. Standard walking access from main villa terrace.`)}
            </p>
            {target.insiderTip && (
              <p className="mt-2 text-xs text-stone-400">
                <span className="text-champagne-400">Insider Tip:</span> {target.insiderTip}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            {isOffEstate ? (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-tap-highlight flex items-center justify-center gap-2 rounded border border-ink-600 bg-ink-700/50 py-3 text-xs uppercase tracking-widest-2 text-ivory-100 transition-colors hover:bg-ink-700 hover:border-champagne-400/40"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </a>
                  <a
                    href={appleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-tap-highlight flex items-center justify-center gap-2 rounded border border-ink-600 bg-ink-700/50 py-3 text-xs uppercase tracking-widest-2 text-ivory-100 transition-colors hover:bg-ink-700 hover:border-champagne-400/40"
                  >
                    <span>Apple Maps</span>
                    <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </a>
                </div>

                <button
                  onClick={handleDriverRequest}
                  disabled={driverRequested}
                  className="no-tap-highlight w-full flex items-center justify-center gap-2 rounded bg-champagne-500/90 py-3.5 text-xs uppercase tracking-widest-2 font-medium text-ink-900 transition-all hover:bg-champagne-400 hover:shadow-lg disabled:opacity-80"
                >
                  {driverRequested ? (
                    <>
                      <Check className="h-4 w-4" strokeWidth={2} />
                      <span>Chauffeur Requested!</span>
                    </>
                  ) : (
                    <>
                      <Car className="h-4 w-4" strokeWidth={1.5} />
                      <span>Request Chauffeur via Concierge</span>
                    </>
                  )}
                </button>
              </>
            ) : (
              <button
                onClick={onClose}
                className="no-tap-highlight w-full flex items-center justify-center gap-2 rounded bg-champagne-500/90 py-3.5 text-xs uppercase tracking-widest-2 font-medium text-ink-900 transition-colors hover:bg-champagne-400"
              >
                <Navigation className="h-4 w-4" strokeWidth={1.5} />
                <span>Return to Estate Guide</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
