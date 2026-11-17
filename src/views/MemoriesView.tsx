import { useState, useEffect } from 'react';
import { Heart, Loader2, Check } from 'lucide-react';
import { seedMemories } from '@/data/content';
import { supabase } from '@/lib/supabase';
import { Reveal } from '@/components/Reveal';
import { BackButton } from '@/components/BackButton';
import type { GuestbookEntry } from '@/types';
import { Photo } from '@/components/Photo';

interface MemoriesViewProps {
  onBack: () => void;
}

export function MemoriesView({ onBack }: MemoriesViewProps) {
  const [guestbook, setGuestbook] = useState<GuestbookEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    best_meal: '',
    best_experience: '',
    discovered: '',
    must_do: '',
    quote: '',
    author_name: '',
  });

  useEffect(() => {
    loadGuestbook();
  }, []);

  const loadGuestbook = async () => {
    try {
      const { data } = await supabase
        .from('guestbook_entries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);
      if (data) setGuestbook(data as GuestbookEntry[]);
    } catch {
      // Offline fallback
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.from('guestbook_entries').insert({
        best_meal: form.best_meal || null,
        best_experience: form.best_experience || null,
        discovered: form.discovered || null,
        must_do: form.must_do || null,
        quote: form.quote || null,
        author_name: form.author_name || null,
      });
      setLoading(false);
      if (!error) {
        setSubmitted(true);
        setForm({ best_meal: '', best_experience: '', discovered: '', must_do: '', quote: '', author_name: '' });
        setTimeout(() => {
          setSubmitted(false);
          setShowForm(false);
        }, 2500);
        loadGuestbook();
      } else {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setShowForm(false);
        }, 2500);
      }
    } catch {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setShowForm(false);
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen bg-ink-900">
      <div className="px-6 pt-8 pb-4">
        <BackButton onClick={onBack} />
      </div>

      <div className="mx-auto max-w-3xl px-6 pb-44">
        {/* Hero */}
        <Reveal>
          <p className="text-xs uppercase tracking-widest-3 text-stone-500">Memories</p>
          <h1 className="mt-4 font-serif text-5xl font-light text-ivory-50 leading-tight">
            What previous guests loved.
          </h1>
        </Reveal>

        {/* Guest quotes with photography */}
        <div className="mt-16 space-y-20">
          {seedMemories.map((memory, i) => (
            <Reveal key={memory.id} delay={i * 80}>
              <div className="overflow-hidden rounded-2xl border border-ink-700/80 shadow-xl">
                <Photo
                  src={memory.image}
                  alt={memory.author}
                  className="w-full object-cover"
                  style={{ aspectRatio: '16/10' }}
                />
              </div>
              <div className="mt-6 border-l-2 border-champagne-500/30 pl-6">
                <p className="font-serif text-2xl font-light italic text-ivory-100 leading-relaxed">
                  "{memory.quote}"
                </p>
                <p className="mt-4 text-xs uppercase tracking-widest-2 text-stone-500">
                  {memory.author}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Guestbook entries from Supabase */}
        {guestbook.length > 0 && (
          <Reveal>
            <div className="mt-20">
              <p className="text-xs uppercase tracking-widest-3 text-stone-500">Guest recommendations</p>
              <div className="mt-8 space-y-12">
                {guestbook.map((entry) => (
                  <div key={entry.id} className="border-l border-ink-700 pl-6">
                    {entry.quote && (
                      <p className="font-serif text-xl font-light italic text-ivory-200">
                        "{entry.quote}"
                      </p>
                    )}
                    <div className="mt-4 space-y-2">
                      {entry.best_meal && (
                        <div>
                          <span className="text-xs uppercase tracking-widest-2 text-champagne-400/70">Best meal</span>
                          <p className="mt-1 text-sm text-stone-300">{entry.best_meal}</p>
                        </div>
                      )}
                      {entry.best_experience && (
                        <div>
                          <span className="text-xs uppercase tracking-widest-2 text-champagne-400/70">Best experience</span>
                          <p className="mt-1 text-sm text-stone-300">{entry.best_experience}</p>
                        </div>
                      )}
                      {entry.discovered && (
                        <div>
                          <span className="text-xs uppercase tracking-widest-2 text-champagne-400/70">Something we discovered</span>
                          <p className="mt-1 text-sm text-stone-300">{entry.discovered}</p>
                        </div>
                      )}
                      {entry.must_do && (
                        <div>
                          <span className="text-xs uppercase tracking-widest-2 text-champagne-400/70">One thing every guest should do</span>
                          <p className="mt-1 text-sm text-stone-300">{entry.must_do}</p>
                        </div>
                      )}
                    </div>
                    {entry.author_name && (
                      <p className="mt-4 text-xs uppercase tracking-widest-2 text-stone-600">
                        — {entry.author_name}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* Leave something for the next guest */}
        <Reveal>
          <div className="mt-20 border-t border-ink-700 pt-12">
            {!showForm && !submitted && (
              <>
                <p className="font-serif text-2xl font-light italic text-ivory-200">
                  Leave something for the next guest.
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="no-tap-highlight group mt-6 inline-flex items-center gap-2 text-champagne-400 transition-colors hover:text-champagne-300"
                >
                  <Heart className="h-4 w-4" strokeWidth={1.5} />
                  <span className="text-sm tracking-wide">Share your experience</span>
                </button>
              </>
            )}

            {showForm && !submitted && (
              <div className="space-y-8">
                <p className="font-serif text-2xl font-light italic text-ivory-200">
                  Before you go…
                </p>
                {[
                  { key: 'best_meal', label: 'Best meal' },
                  { key: 'best_experience', label: 'Best experience' },
                  { key: 'discovered', label: 'Something we discovered' },
                  { key: 'must_do', label: 'One thing every guest should do' },
                  { key: 'quote', label: 'A memory in a sentence' },
                  { key: 'author_name', label: 'Your name' },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="text-xs uppercase tracking-widest-2 text-stone-500">{field.label}</label>
                    <input
                      type="text"
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      className="no-tap-highlight mt-2 w-full border-b border-ink-600 bg-transparent pb-2 font-serif text-lg font-light italic text-ivory-100 placeholder:text-stone-700 focus:border-champagne-500/50 focus:outline-none transition-colors"
                    />
                  </div>
                ))}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="no-tap-highlight group inline-flex items-center gap-2 text-champagne-400 transition-colors hover:text-champagne-300 disabled:text-stone-700"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                  ) : null}
                  <span className="text-sm tracking-wide">{loading ? 'Saving…' : 'Share with future guests'}</span>
                </button>
              </div>
            )}

            {submitted && (
              <div className="animate-fade-up flex items-center gap-2 text-champagne-400">
                <Check className="h-5 w-5" strokeWidth={1.5} />
                <p className="font-serif text-xl font-light italic">Thank you. Your memories will live on here.</p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
