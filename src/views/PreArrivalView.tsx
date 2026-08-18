import { ArrowRight, Plane, Clock, Home, Wifi, Video, Dog, MessageSquare, Phone, Check } from 'lucide-react';
import { property } from '@/data/content';
import { Reveal } from '@/components/Reveal';
import { BackButton } from '@/components/BackButton';

interface PreArrivalViewProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export function PreArrivalView({ onBack, onNavigate }: PreArrivalViewProps) {
  return (
    <div className="min-h-screen bg-ink-900 pb-44 text-ivory-100">
      {/* Hero */}
      <section className="relative h-[48vh] w-full overflow-hidden">
        <img
          src={property.heroImageAlt}
          alt="Finca Libia"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/40 via-ink-900/60 to-ink-900" />
        <div className="absolute top-6 left-6 z-10">
          <BackButton onClick={onBack} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 pb-10 max-w-2xl mx-auto text-center">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest-3 text-champagne-400">
              PRE-CHECK-IN
            </p>
            <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-light text-ivory-50 hero-text-shadow">
              You’re almost here.
            </h1>
            <p className="mt-3 font-serif text-lg font-light italic text-ivory-200">
              We’re excited to welcome you to Finca Libia.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="mx-auto max-w-2xl px-6 py-10 space-y-10">
        {/* Intro Banner */}
        <Reveal>
          <div className="rounded-2xl border border-ink-700 bg-ink-800/40 p-6 text-center backdrop-blur-md">
            <p className="text-sm sm:text-base leading-relaxed text-stone-300">
              Before you arrive, here are a few things to know so you can settle in smoothly and start enjoying your stay from the moment you arrive.
            </p>
          </div>
        </Reveal>

        {/* Section: Video & Facility Instructions */}
        <Reveal delay={50}>
          <div className="rounded-2xl border border-ink-700 bg-ink-800/60 p-6 sm:p-8 backdrop-blur-md space-y-5">
            <div className="flex items-center gap-3 text-champagne-400">
              <Video className="h-6 w-6" strokeWidth={1.5} />
              <h2 className="font-serif text-2xl font-light text-ivory-50">Learn How Everything Works</h2>
            </div>
            <p className="text-sm leading-relaxed text-stone-300">
              We’ve prepared simple video guides to help you use the property’s facilities. You’ll find instructions for things such as:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-stone-300">
              {[
                'Garage doors',
                'Steam bath',
                'Tennis court lights',
                'Music systems',
                'Fireplaces',
                'Other property amenities',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-lg bg-ink-900/60 p-2.5 border border-ink-700/60">
                  <Check className="h-3.5 w-3.5 text-champagne-400 shrink-0" strokeWidth={2} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('guide')}
                className="no-tap-highlight inline-flex items-center gap-2 rounded-full border border-champagne-400/40 bg-champagne-500/10 px-5 py-2.5 text-xs font-medium uppercase tracking-widest-2 text-champagne-300 transition-colors hover:bg-champagne-500 hover:text-ink-900"
              >
                <span>View Instruction Guide</span>
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </button>
              <a
                href={property.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="no-tap-highlight inline-flex items-center gap-2 rounded-full bg-red-600/90 px-5 py-2.5 text-xs font-medium uppercase tracking-widest-2 text-white transition-all hover:bg-red-500"
              >
                <Video className="h-4 w-4" strokeWidth={1.5} />
                <span>Watch on YouTube (@fincalibia)</span>
              </a>
            </div>
          </div>
        </Reveal>

        {/* Section 1: Getting Here */}
        <Reveal delay={100}>
          <div className="rounded-2xl border border-ink-700 bg-ink-800/60 p-6 sm:p-8 backdrop-blur-md space-y-6">
            <div className="flex items-center gap-3 text-champagne-400">
              <Plane className="h-6 w-6" strokeWidth={1.5} />
              <h2 className="font-serif text-2xl font-light text-ivory-50">Getting Here</h2>
            </div>
            <p className="text-sm leading-relaxed text-stone-300">
              Finca Libia is located approximately 6 minutes from the airport.
            </p>

            <div>
              <p className="text-xs uppercase tracking-widest-2 text-stone-400 font-medium mb-3">
                If you’re arriving by taxi, we can recommend trusted drivers:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.taxis.map((driver) => (
                  <a
                    key={driver.name}
                    href={`tel:${driver.phone.replace(/[^0-9+]/g, '')}`}
                    className="no-tap-highlight flex items-center justify-between rounded-xl border border-ink-700 bg-ink-900/80 p-4 transition-colors hover:border-champagne-400/50"
                  >
                    <div>
                      <p className="font-serif text-lg font-light text-ivory-100">{driver.name}</p>
                      <p className="text-xs font-mono text-champagne-300 mt-0.5">{driver.phone}</p>
                    </div>
                    <Phone className="h-4 w-4 text-champagne-400 shrink-0" strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Section 2: Check-in */}
        <Reveal delay={100}>
          <div className="rounded-2xl border border-ink-700 bg-ink-800/60 p-6 sm:p-8 backdrop-blur-md space-y-3">
            <div className="flex items-center gap-3 text-champagne-400">
              <Clock className="h-6 w-6" strokeWidth={1.5} />
              <h2 className="font-serif text-2xl font-light text-ivory-50">Check-in</h2>
            </div>
            <div>
              <p className="font-mono text-sm text-champagne-300">Check-in time: Flexible</p>
              <p className="mt-2 text-sm leading-relaxed text-stone-300">
                We’re happy to accommodate your arrival whenever possible. If you have any questions or need assistance getting to the property, we’re here to help.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Section 3: Before You Arrive */}
        <Reveal delay={150}>
          <div className="rounded-2xl border border-ink-700 bg-ink-800/60 p-6 sm:p-8 backdrop-blur-md space-y-5">
            <div className="flex items-center gap-3 text-champagne-400">
              <Home className="h-6 w-6" strokeWidth={1.5} />
              <h2 className="font-serif text-2xl font-light text-ivory-50">Before You Arrive</h2>
            </div>
            <div>
              <p className="font-serif text-xl font-light italic text-ivory-100">Get familiar with your stay</p>
              <p className="mt-2 text-sm leading-relaxed text-stone-300">
                Take a quick look around Finca Libia before you arrive. Discover the bedrooms, pool, outdoor spaces, wellness areas, entertainment spaces and farm animals.
              </p>
            </div>
            <button
              onClick={() => onNavigate('stay')}
              className="no-tap-highlight inline-flex items-center gap-2 rounded-full bg-champagne-500/90 px-6 py-3 text-xs font-medium uppercase tracking-widest-2 text-ink-900 shadow-md transition-all hover:bg-champagne-400 active:scale-95"
            >
              <span>Explore Your Stay</span>
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </Reveal>

        {/* Section 4: Connect when you arrive */}
        <Reveal delay={200}>
          <div className="rounded-2xl border border-ink-700 bg-ink-800/60 p-6 sm:p-8 backdrop-blur-md space-y-4">
            <div className="flex items-center gap-3 text-champagne-400">
              <Wifi className="h-6 w-6" strokeWidth={1.5} />
              <h2 className="font-serif text-2xl font-light text-ivory-50">Connect When You Arrive</h2>
            </div>
            <p className="text-xs text-stone-400">Your Wi-Fi details are ready for you:</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-ink-700 bg-ink-900/80 p-4">
                <p className="text-[10px] uppercase tracking-widest-2 text-champagne-400 font-medium">Network</p>
                <p className="mt-1 font-mono text-base text-ivory-100">{property.wifi.grounds.network}</p>
                <p className="mt-2 text-xs text-stone-400">Password: <span className="font-mono text-champagne-300">{property.wifi.grounds.password}</span></p>
              </div>

              <div className="rounded-xl border border-ink-700 bg-ink-900/80 p-4">
                <p className="text-[10px] uppercase tracking-widest-2 text-champagne-400 font-medium">Inside Villa Network</p>
                <p className="mt-1 font-mono text-base text-ivory-100">{property.wifi.inside.network}</p>
                <p className="mt-2 text-xs text-stone-400">Password: <span className="font-mono text-champagne-300">{property.wifi.inside.password}</span></p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Section 6: Pet Owners */}
        <Reveal delay={300}>
          <div className="rounded-2xl border border-ink-700 bg-ink-800/60 p-6 sm:p-8 backdrop-blur-md space-y-3">
            <div className="flex items-center gap-3 text-champagne-400">
              <Dog className="h-6 w-6" strokeWidth={1.5} />
              <h2 className="font-serif text-2xl font-light text-ivory-50">A Little Note for Pet Owners</h2>
            </div>
            <p className="font-serif text-lg font-light italic text-ivory-200">Finca Libia is pet-friendly.</p>
            <p className="text-sm leading-relaxed text-stone-300">
              You are welcome to bring your furry friends, but please remember that the property is also home to farm animals and friendly off-leash dogs.
            </p>
          </div>
        </Reveal>

        {/* Section 7: Need Anything */}
        <Reveal delay={350}>
          <div className="rounded-2xl border border-champagne-400/30 bg-gradient-to-br from-ink-800/80 to-champagne-950/20 p-6 sm:p-8 backdrop-blur-md space-y-5">
            <div className="flex items-center gap-3 text-champagne-400">
              <MessageSquare className="h-6 w-6" strokeWidth={1.5} />
              <h2 className="font-serif text-2xl font-light text-ivory-50">Need Anything Before You Arrive?</h2>
            </div>
            <p className="text-sm text-stone-300">We’re here to help.</p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-ink-700 bg-ink-900/80 p-4">
              <div>
                <p className="font-serif text-xl font-light text-ivory-100">{property.host.name}</p>
                <p className="text-xs text-stone-400">Host & Estate Curator</p>
                <p className="mt-1 font-mono text-sm text-champagne-300">{property.host.phone}</p>
              </div>
              <a
                href={`tel:${property.host.phone.replace(/[^0-9+]/g, '')}`}
                className="no-tap-highlight shrink-0 inline-flex items-center gap-2 rounded-full bg-champagne-500 px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-ink-900 transition-colors hover:bg-champagne-400"
              >
                <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
                <span>Contact Host</span>
              </a>
            </div>

            <p className="text-xs text-stone-400 italic">
              Don’t hesitate to reach out if you have any questions before your stay.
            </p>
          </div>
        </Reveal>

        {/* Closing Warm Farewell */}
        <Reveal delay={400}>
          <div className="text-center pt-8 space-y-2 border-t border-ink-700">
            <p className="font-serif text-2xl font-light text-champagne-300">See you soon.</p>
            <p className="font-serif text-3xl font-light italic text-ivory-50">Welcome to Finca Libia.</p>
            <p className="text-xs uppercase tracking-widest-3 text-stone-400 pt-2">
              Your home away from home is waiting for you.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
