import { useState, useEffect } from 'react';
import { Check, Heart, Loader2, Star, Car, Phone } from 'lucide-react';
import { checkoutSteps, property } from '@/data/content';
import { supabase } from '@/lib/supabase';
import { Reveal } from '@/components/Reveal';
import { BackButton } from '@/components/BackButton';
import { Photo } from '@/components/Photo';

interface CheckoutViewProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export function CheckoutView({ onBack, onNavigate }: CheckoutViewProps) {
  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);
  const [showGuestbook, setShowGuestbook] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [showGuestbook, submitted]);

  const [form, setForm] = useState({
    best_meal: '',
    best_experience: '',
    discovered: '',
    must_do: '',
  });

  const toggleStep = (i: number) => {
    setCheckedSteps((prev) =>
      prev.includes(i) ? prev.filter((s) => s !== i) : [...prev, i]
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await supabase.from('guestbook_entries').insert({
        best_meal: form.best_meal || null,
        best_experience: form.best_experience || null,
        discovered: form.discovered || null,
        must_do: form.must_do || null,
      });
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => onNavigate('memories'), 2500);
    } catch {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => onNavigate('memories'), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-ink-900 pb-44 text-ivory-100">
      {/* Hero Header */}
      <section className="relative h-[48vh] w-full overflow-hidden">
        <Photo
          src="/photos/exterior/exterior_18.jpeg"
          alt="Finca Libia Checkout"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/40 via-ink-900/50 to-ink-900" />
        <div className="absolute top-6 left-6 z-10">
          <BackButton onClick={onBack} />
        </div>

        {/* Floating Checkout Time Pill */}
        <div className="absolute top-6 right-6 z-10">
          <span className="rounded-full border border-champagne-400/40 bg-ink-900/80 px-4 py-2 text-xs font-mono font-medium uppercase tracking-wider text-champagne-300 backdrop-blur-md shadow-lg">
            CHECK-OUT TIME: 12PM
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 pb-10 max-w-2xl mx-auto text-center">
          <Reveal>
            <h1 className="font-serif text-4xl sm:text-5xl font-light tracking-wide text-ivory-50 hero-text-shadow">
              CHECK-OUT
            </h1>
            <p className="mt-2 font-serif text-2xl sm:text-3xl font-light italic text-champagne-300">
              See you again!!
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="mx-auto max-w-2xl px-6 py-10 space-y-10">
        {/* Feedback / Review Banner */}
        <Reveal>
          <div className="rounded-2xl border border-champagne-400/30 bg-gradient-to-br from-ink-800/80 to-champagne-950/20 p-6 text-center backdrop-blur-md space-y-4">
            <div className="flex justify-center text-champagne-400">
              <Star className="h-6 w-6 fill-champagne-400/20" strokeWidth={1.5} />
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-ivory-100 font-serif italic">
              "We value your feedback—share your experience on our Airbnb page. Thank you for choosing us."
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setShowGuestbook(true)}
                className="no-tap-highlight inline-flex items-center gap-2 rounded-full bg-champagne-500/90 px-5 py-2.5 text-xs font-medium uppercase tracking-widest-2 text-ink-900 transition-all hover:bg-champagne-400"
              >
                <Heart className="h-4 w-4" strokeWidth={1.5} />
                <span>Share Feedback</span>
              </button>
            </div>
          </div>
        </Reveal>

        {/* DO NOT FORGET!! Checklist Box */}
        <Reveal delay={100}>
          <div className="rounded-2xl border border-ink-700 bg-ink-800/60 p-6 sm:p-8 backdrop-blur-md space-y-6">
            <div className="text-center pb-2 border-b border-ink-700">
              <p className="font-serif text-2xl font-light uppercase tracking-widest-2 text-champagne-400">
                DO NOT FORGET!!
              </p>
              <p className="mt-1 text-xs text-stone-400">
                Please review these items before leaving the property
              </p>
            </div>

            <div className="space-y-4">
              {checkoutSteps.map((step, i) => (
                <button
                  key={step.id}
                  onClick={() => toggleStep(i)}
                  className="no-tap-highlight group flex w-full items-start gap-3.5 text-left transition-colors"
                >
                  <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                    checkedSteps.includes(i)
                      ? 'border-champagne-400 bg-champagne-400 text-ink-900'
                      : 'border-stone-500 bg-ink-900/60 group-hover:border-champagne-400/60'
                  }`}>
                    {checkedSteps.includes(i) && (
                      <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                    )}
                  </span>
                  <span className={`text-sm leading-snug transition-colors ${
                    checkedSteps.includes(i) ? 'text-stone-500 line-through' : 'text-stone-200'
                  }`}>
                    {step.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Airport Pickup & Recommended Drivers */}
        <Reveal delay={150}>
          <div className="rounded-2xl border border-ink-700 bg-ink-800/60 p-6 backdrop-blur-md space-y-4">
            <div className="flex items-center gap-2 text-champagne-400">
              <Car className="h-5 w-5" strokeWidth={1.5} />
              <h3 className="font-serif text-xl font-light text-ivory-50">Private Airport Driver</h3>
            </div>
            <p className="text-xs text-stone-400">
              Need a ride to the airport? Tap to call our trusted drivers directly:
            </p>

            <div className="space-y-3 pt-1">
              {property.taxis.map((driver) => (
                <a
                  key={driver.name}
                  href={`tel:${driver.phone.replace(/[^0-9+]/g, '')}`}
                  className="no-tap-highlight flex items-center justify-between rounded-2xl border border-ink-700/80 bg-ink-900/90 p-5 transition-colors hover:border-champagne-400/50"
                >
                  <div>
                    <p className="font-serif text-xl font-light tracking-wide text-ivory-100">
                      Private Driver: {driver.name}
                    </p>
                    <p className="text-sm font-mono text-champagne-300/80 mt-1">{driver.phone}</p>
                  </div>
                  <Phone className="h-5 w-5 text-champagne-400 shrink-0" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Guestbook Form */}
        {showGuestbook && !submitted && (
          <Reveal>
            <div className="rounded-2xl border border-ink-700 bg-ink-800/80 p-6 sm:p-8 backdrop-blur-md space-y-6">
              <div>
                <p className="font-serif text-2xl font-light italic text-champagne-300">
                  Before you go…
                </p>
                <p className="mt-1 text-xs text-stone-400">
                  Share a note or memory for future guests at Finca Libia.
                </p>
              </div>

              {[
                { key: 'best_meal', label: 'Best meal' },
                { key: 'best_experience', label: 'Best experience' },
                { key: 'discovered', label: 'Something we discovered' },
                { key: 'must_do', label: 'One thing every guest should do' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-[11px] uppercase tracking-widest-2 text-champagne-400">{field.label}</label>
                  <input
                    type="text"
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    className="no-tap-highlight mt-1.5 w-full border-b border-ink-600 bg-transparent pb-2 font-serif text-base font-light italic text-ivory-100 placeholder:text-stone-600 focus:border-champagne-400 focus:outline-none transition-colors"
                    placeholder="Write your note..."
                  />
                </div>
              ))}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="no-tap-highlight w-full flex items-center justify-center gap-2 rounded-full bg-champagne-500 py-3 text-xs font-medium uppercase tracking-widest-2 text-ink-900 transition-colors hover:bg-champagne-400 disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} /> : null}
                <span>{loading ? 'Saving…' : 'Submit Feedback & Memories'}</span>
              </button>
            </div>
          </Reveal>
        )}

        {submitted && (
          <Reveal>
            <div className="rounded-2xl border border-champagne-400/40 bg-champagne-500/10 p-6 text-center">
              <p className="font-serif text-2xl font-light italic text-champagne-300">
                Thank you! See you again at Finca Libia.
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}
