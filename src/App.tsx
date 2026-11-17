import { useState, useEffect } from 'react';
import { Home, Map, BookOpen, Calendar, LogOut, Info } from 'lucide-react';
import { HomeView } from '@/views/HomeView';
import { StayView } from '@/views/StayView';
import { ExploreView } from '@/views/ExploreView';
import { ConciergeView } from '@/views/ConciergeView';
import { MemoriesView } from '@/views/MemoriesView';
import { ItineraryView } from '@/views/ItineraryView';
import { PreArrivalView } from '@/views/PreArrivalView';
import { CheckoutView } from '@/views/CheckoutView';
import { HouseGuideView } from '@/views/HouseGuideView';
import { property } from '@/data/content';
import { Download } from 'lucide-react';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { InstallAppModal } from '@/components/InstallAppModal';

type View = 'home' | 'stay' | 'explore' | 'concierge' | 'memories' | 'itinerary' | 'pre-arrival' | 'checkout' | 'guide';

const navItems: { id: View; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'stay', label: 'Stay', icon: Map },
  { id: 'explore', label: 'Explore', icon: BookOpen },
  { id: 'guide', label: 'Guide', icon: Info },
];

export default function App() {
  const [view, setView] = useState<View>('home');
  const [scrollY, setScrollY] = useState(0);
  const [openTourOnStay, setOpenTourOnStay] = useState(false);
  const { deferredPrompt, isIOS, isStandalone, promptInstall } = usePWAInstall();
  const [showInstallModal, setShowInstallModal] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const guestParam = params.get('guest');
    if (guestParam) {
      property.guestName = guestParam;
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [view]);

  const navigate = (v: string) => {
    // 'stay-tour' opens the Stay page straight into the photo tour.
    if (v === 'stay-tour') {
      setOpenTourOnStay(true);
      setView('stay');
    } else {
      setView(v as View);
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };
  const goHome = () => navigate('home');

  const showBottomNav = true;

  return (
    <div className="min-h-screen bg-ink-900 text-ivory-100">
      {/* Top bar: shown over the home hero, fades out as you scroll */}
      {view === 'home' && (
        <header
          className={`fixed left-0 right-0 top-0 z-40 px-5 pb-3 pt-[calc(env(safe-area-inset-top)+0.75rem)] ${
            scrollY > 160 ? 'pointer-events-none' : ''
          }`}
          style={{ opacity: Math.max(0, 1 - scrollY / 200) }}
        >
          <div className="hero-in flex items-center justify-between" style={{ ['--i' as string]: 0 }}>
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-champagne-400/50 font-serif text-xs tracking-widest text-champagne-300">
              FL
            </span>
            <span className="whitespace-nowrap font-serif text-sm font-medium tracking-widest-2 text-ivory-100 sm:text-base">
              FINCA LIBIA
            </span>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setView('pre-arrival')}
              className="no-tap-highlight flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 px-2.5 text-[11px] font-medium uppercase tracking-widest-2 text-ivory-100 transition-colors hover:text-champagne-300"
              aria-label="Pre-arrival"
              title="Pre-arrival"
            >
              <Calendar className="h-4 w-4 shrink-0 text-champagne-400" strokeWidth={1.5} />
              <span className="hidden whitespace-nowrap min-[520px]:inline">Pre-arrival</span>
            </button>
            <button
              onClick={() => setView('checkout')}
              className="no-tap-highlight flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 px-2.5 text-[11px] font-medium uppercase tracking-widest-2 text-ivory-100 transition-colors hover:text-champagne-300"
              aria-label="Checkout"
              title="Checkout"
            >
              <LogOut className="h-4 w-4 shrink-0 text-champagne-400" strokeWidth={1.5} />
              <span className="hidden whitespace-nowrap min-[520px]:inline">Checkout</span>
            </button>
          </div>
          </div>
        </header>
      )}

      {/* Views */}
      {view === 'home' && <HomeView onNavigate={navigate} />}
      {view === 'stay' && (
        <StayView onBack={goHome} autoOpenTour={openTourOnStay} onTourOpened={() => setOpenTourOnStay(false)} />
      )}
      {view === 'explore' && <ExploreView onBack={goHome} onNavigate={navigate} />}
      {view === 'concierge' && <ConciergeView onBack={goHome} />}
      {view === 'memories' && <MemoriesView onBack={goHome} />}
      {view === 'itinerary' && <ItineraryView onBack={goHome} />}
      {view === 'pre-arrival' && <PreArrivalView onBack={goHome} onNavigate={navigate} />}
      {view === 'checkout' && <CheckoutView onBack={goHome} onNavigate={navigate} />}
      {view === 'guide' && <HouseGuideView onBack={goHome} onNavigate={navigate} />}



      {/* Bottom Navigation Bar */}
      {showBottomNav && (
        <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-ink-700/80 bg-ink-900/95 backdrop-blur-xl pb-safe">
          <div className="mx-auto flex max-w-md items-center justify-around px-4 py-2 sm:px-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = view === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className="no-tap-highlight group flex min-h-[44px] min-w-[56px] flex-col items-center justify-center gap-1 transition-all duration-300 relative py-1 active:scale-95"
                >
                  <Icon
                    className={`h-5 w-5 transition-colors duration-300 ${
                      isActive ? 'text-champagne-300' : 'text-stone-500 group-hover:text-stone-400'
                    }`}
                    strokeWidth={1.5}
                  />
                  <span
                    className={`text-[10px] uppercase tracking-widest-2 transition-colors duration-300 ${
                      isActive ? 'text-champagne-300 font-medium' : 'text-stone-500 group-hover:text-stone-400'
                    }`}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 h-1 w-1 rounded-full bg-champagne-400 shadow-[0_0_8px_#c4b088]" />
                  )}
                </button>
              );
            })}
            
            {/* Install Button in Footer */}
            {!isStandalone && (isIOS || deferredPrompt) && (
              <button
                onClick={() => {
                  if (deferredPrompt) {
                    promptInstall();
                  } else {
                    setShowInstallModal(true);
                  }
                }}
                className="no-tap-highlight group flex min-h-[44px] min-w-[56px] flex-col items-center justify-center gap-1 transition-all duration-300 relative py-1 active:scale-95"
              >
                <Download
                  className="h-5 w-5 text-stone-500 group-hover:text-stone-400 transition-colors duration-300"
                  strokeWidth={1.5}
                />
                <span className="text-[10px] uppercase tracking-widest-2 text-stone-500 group-hover:text-stone-400 transition-colors duration-300">
                  Install
                </span>
              </button>
            )}
          </div>
        </nav>
      )}

      {showInstallModal && <InstallAppModal onClose={() => setShowInstallModal(false)} />}
    </div>
  );
}
