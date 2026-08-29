import { Wifi, Phone, ShieldAlert, Car, ShoppingBag, Flame, Home, Info, Heart, ArrowRight, Video } from 'lucide-react';
import { property } from '@/data/content';
import { Reveal } from '@/components/Reveal';
import { BackButton } from '@/components/BackButton';

interface HouseGuideViewProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export function HouseGuideView({ onBack, onNavigate }: HouseGuideViewProps) {
  return (
    <div className="min-h-screen bg-ink-900 pb-44 text-ivory-100">
      {/* Hero Header */}
      <section className="relative h-[45vh] w-full overflow-hidden">
        <img
          src={property.heroImage}
          alt="Finca Libia House Guide"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/40 via-ink-900/60 to-ink-900" />
        <div className="absolute top-6 left-6 z-10">
          <BackButton onClick={onBack} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 pb-10 max-w-2xl mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-widest-3 text-champagne-400 font-medium">Guestbook & Guide</p>
            <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-light text-ivory-50 hero-text-shadow">
              House Guide & Essentials
            </h1>
            <p className="mt-2 font-serif text-lg font-light italic text-ivory-200">
              Host: {property.hostName} · {property.hostPhone}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Guide Content */}
      <div className="mx-auto max-w-2xl px-6 py-12 space-y-12">
        {/* YouTube Video Instruction Guides */}
        <Reveal>
          <div className="rounded-2xl border border-champagne-400/30 bg-gradient-to-br from-ink-800/90 via-ink-800/60 to-red-950/20 p-6 backdrop-blur-md space-y-5">
            <div className="flex items-center gap-3 text-red-500">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600/20 text-red-400 border border-red-500/30">
                <Video className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div>
                <span className="text-[10px] font-medium uppercase tracking-widest-2 text-red-400">Official Channel</span>
                <h2 className="font-serif text-2xl font-light text-ivory-50">YouTube Video Guides</h2>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-stone-300">
              Watch step-by-step short video guides on operating all villa amenities—including fireplaces, sauna, tennis lights, steam room, barbecue, and balcony retractable roof.
            </p>

            <div className="relative overflow-hidden rounded-xl border border-ink-700 group cursor-pointer">
              <img
                src="/photos/youtube_guides.jpg"
                alt="Finca Libia YouTube Instruction Videos"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-900/40 to-transparent" />
              <a
                href={property.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-xl transition-transform group-hover:scale-110">
                  <ArrowRight className="h-6 w-6 ml-0.5" strokeWidth={2} />
                </div>
                <p className="mt-3 font-serif text-lg font-light text-ivory-50">Watch All Instruction Videos</p>
                <p className="text-xs text-stone-300 font-mono">youtube.com/@fincalibia</p>
              </a>
            </div>

            <div className="space-y-2">
              <p className="text-[11px] font-medium uppercase tracking-widest-2 text-stone-400">
                Detailed instruction videos:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300 max-h-80 overflow-y-auto pr-1 scrollbar-thin">
                {property.youtubeVideos.map((video) => (
                  <a
                    key={video.id}
                    href={property.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-tap-highlight flex items-center justify-between rounded-lg border border-ink-700/60 bg-ink-900/60 p-2.5 transition-colors hover:border-red-500/40 hover:text-ivory-100"
                  >
                    <span className="truncate pr-2">{video.title}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-red-400 shrink-0" strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* WiFi Networks */}
        <Reveal delay={50}>
          <div className="rounded-2xl border border-ink-700 bg-ink-800/60 p-6 backdrop-blur-md">
            <div className="flex items-center gap-3 text-champagne-400">
              <Wifi className="h-6 w-6" strokeWidth={1.5} />
              <h2 className="font-serif text-2xl font-light text-ivory-50">WiFi Credentials</h2>
            </div>
            <p className="mt-2 text-xs text-stone-400">
              Two high-speed fiber networks cover the main house and surrounding grounds.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-ink-700 bg-ink-900/80 p-4">
                <p className="text-[10px] uppercase tracking-widest-2 text-champagne-400">Main House WiFi</p>
                <p className="mt-1 font-mono text-base text-ivory-100">{property.wifi.inside.network}</p>
                <p className="mt-2 text-xs text-stone-400">Password: <span className="font-mono text-champagne-300">{property.wifi.inside.password}</span></p>
              </div>

              <div className="rounded-xl border border-ink-700 bg-ink-900/80 p-4">
                <p className="text-[10px] uppercase tracking-widest-2 text-champagne-400">Pool & Grounds WiFi</p>
                <p className="mt-1 font-mono text-base text-ivory-100">{property.wifi.grounds.network}</p>
                <p className="mt-2 text-xs text-stone-400">Password: <span className="font-mono text-champagne-300">{property.wifi.grounds.password}</span></p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Taxis & Airport Transfers */}
        <Reveal delay={100}>
          <div className="rounded-2xl border border-ink-700 bg-ink-800/60 p-6 backdrop-blur-md">
            <div className="flex items-center gap-3 text-champagne-400">
              <Car className="h-6 w-6" strokeWidth={1.5} />
              <h2 className="font-serif text-2xl font-light text-ivory-50">Taxis & Airport Pickup</h2>
            </div>
            <p className="mt-2 text-xs text-stone-400">
              Finca Libia is located just <span className="text-champagne-300 font-medium">{property.airportDistance}</span> and {property.cityDistance}.
            </p>

            <div className="mt-6 space-y-3">
              {property.taxis.map((t) => (
                <a
                  key={t.name}
                  href={`tel:${t.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center justify-between rounded-xl border border-ink-700 bg-ink-900/80 p-4 transition-colors hover:border-champagne-500/40"
                >
                  <div>
                    <p className="font-serif text-lg font-light text-ivory-100">Private Driver: {t.name}</p>
                    <p className="text-xs text-stone-400">{t.phone}</p>
                  </div>
                  <Phone className="h-4 w-4 text-champagne-400" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Corner Store Essentials Delivery */}
        <Reveal delay={150}>
          <div className="rounded-2xl border border-ink-700 bg-ink-800/60 p-6 backdrop-blur-md">
            <div className="flex items-center gap-3 text-champagne-400">
              <ShoppingBag className="h-6 w-6" strokeWidth={1.5} />
              <h2 className="font-serif text-2xl font-light text-ivory-50">Essentials Delivery via WhatsApp</h2>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-stone-300">
              The neighborhood corner store offers convenient delivery of essential items, snacks, drinks, and groceries directly to the villa entrance.
            </p>
            <a
              href={`https://wa.me/${property.essentialsDeliveryWhatsApp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-champagne-400/40 bg-champagne-500/10 px-5 py-2.5 text-xs uppercase tracking-widest-2 text-champagne-300 transition-colors hover:bg-champagne-500 hover:text-ink-900"
            >
              <span>Order via WhatsApp ({property.essentialsDeliveryWhatsApp})</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        {/* Amenities & Fireplace Tips */}
        <Reveal delay={200}>
          <div className="rounded-2xl border border-ink-700 bg-ink-800/60 p-6 backdrop-blur-md space-y-6">
            <div className="flex items-center gap-3 text-champagne-400">
              <Flame className="h-6 w-6" strokeWidth={1.5} />
              <h2 className="font-serif text-2xl font-light text-ivory-50">Fireplace & Living Essentials</h2>
            </div>

            <div className="space-y-4 text-xs text-stone-300 leading-relaxed border-t border-ink-700 pt-4">
              <div>
                <p className="font-serif text-lg text-ivory-100">Living Room Fireplace</p>
                <p className="mt-1">We highly recommend using the fireplace at night for a cozy atmosphere. Wood and fire starters are stored directly below the fireplace.</p>
              </div>

              <div>
                <p className="font-serif text-lg text-ivory-100">Kitchen & Pantry</p>
                <p className="mt-1">Please feel free to use anything in the pantry or fridge during your stay. If you need special ingredients or grocery restocking, just let the concierge know.</p>
              </div>

              <div>
                <p className="font-serif text-lg text-ivory-100">Complimentary On-Site Parking</p>
                <p className="mt-1">Spacious secure parking is available right on-site at the main estate entrance.</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* House Rules & Farm Animals */}
        <Reveal delay={250}>
          <div className="rounded-2xl border border-ink-700 bg-ink-800/60 p-6 backdrop-blur-md space-y-4">
            <div className="flex items-center gap-3 text-champagne-400">
              <Info className="h-6 w-6" strokeWidth={1.5} />
              <h2 className="font-serif text-2xl font-light text-ivory-50">Property Rules & Farm Animals</h2>
            </div>

            <ul className="space-y-2 text-xs text-stone-300 list-disc list-inside">
              {property.houseRules.map((rule, idx) => (
                <li key={idx}>{rule}</li>
              ))}
            </ul>

            <div className="mt-4 rounded-xl bg-ink-900/80 p-4 border border-ink-700 flex items-start gap-3">
              <Heart className="h-5 w-5 text-champagne-400 shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-xs text-stone-300 italic leading-relaxed">
                "Feel free to bring your pets! Just remember our friendly off-leash dogs (Bruno & Luna) and farm animals (Swiss-German cows & llamas) also roam the estate grounds."
              </p>
            </div>
          </div>
        </Reveal>

        {/* Emergency Contacts */}
        <Reveal delay={300}>
          <div className="rounded-2xl border border-rose-500/30 bg-ink-800/60 p-6 backdrop-blur-md space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <ShieldAlert className="h-6 w-6" strokeWidth={1.5} />
              <h2 className="font-serif text-2xl font-light text-ivory-50">Emergency Contacts</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-300">
              <a
                href={`tel:${property.emergencyContacts.hostDirect.replace(/[^0-9+]/g, '')}`}
                className="flex items-center justify-between rounded-xl border border-ink-700 bg-ink-900/80 p-3 transition-colors hover:border-rose-400/40"
              >
                <div>
                  <p className="text-stone-400">Host Direct</p>
                  <p className="font-mono text-sm text-ivory-100 mt-0.5">{property.emergencyContacts.hostDirect}</p>
                </div>
                <Phone className="h-4 w-4 text-rose-400 shrink-0" strokeWidth={1.5} />
              </a>

              <a
                href={`tel:${property.emergencyContacts.firehouse.replace(/[^0-9+]/g, '')}`}
                className="flex items-center justify-between rounded-xl border border-ink-700 bg-ink-900/80 p-3 transition-colors hover:border-rose-400/40"
              >
                <div>
                  <p className="text-stone-400 font-medium text-rose-300">Firehouse</p>
                  <p className="font-mono text-sm text-ivory-100 mt-0.5">{property.emergencyContacts.firehouse}</p>
                </div>
                <Phone className="h-4 w-4 text-rose-400 shrink-0" strokeWidth={1.5} />
              </a>

              <a
                href={`tel:${property.emergencyContacts.ambulance.replace(/[^0-9+]/g, '')}`}
                className="flex items-center justify-between rounded-xl border border-ink-700 bg-ink-900/80 p-3 transition-colors hover:border-rose-400/40"
              >
                <div>
                  <p className="text-stone-400 font-medium text-rose-300">Ambulance</p>
                  <p className="font-mono text-sm text-ivory-100 mt-0.5">{property.emergencyContacts.ambulance}</p>
                </div>
                <Phone className="h-4 w-4 text-rose-400 shrink-0" strokeWidth={1.5} />
              </a>

              <a
                href={`tel:${property.emergencyContacts.guarnePolice.replace(/[^0-9+]/g, '')}`}
                className="flex items-center justify-between rounded-xl border border-ink-700 bg-ink-900/80 p-3 transition-colors hover:border-rose-400/40"
              >
                <div>
                  <p className="text-stone-400">Police Guarne</p>
                  <p className="font-mono text-sm text-ivory-100 mt-0.5">{property.emergencyContacts.guarnePolice}</p>
                </div>
                <Phone className="h-4 w-4 text-rose-400 shrink-0" strokeWidth={1.5} />
              </a>

              <a
                href={`tel:${property.emergencyContacts.rionegroPolice.replace(/[^0-9+]/g, '')}`}
                className="flex items-center justify-between rounded-xl border border-ink-700 bg-ink-900/80 p-3 transition-colors hover:border-rose-400/40"
              >
                <div>
                  <p className="text-stone-400">Police Rionegro</p>
                  <p className="font-mono text-sm text-ivory-100 mt-0.5">{property.emergencyContacts.rionegroPolice}</p>
                </div>
                <Phone className="h-4 w-4 text-rose-400 shrink-0" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
