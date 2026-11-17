import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { collageChapters } from '@/data/content';
import { BackButton } from '@/components/BackButton';
import { photoSrc, photoSrcSet } from '@/lib/photo';
import type { CollageItem, CollagePhoto } from '@/types';

interface EstateCollageProps {
  onClose: () => void;
  /** Chapter to scroll to on open. */
  startChapterId?: string;
}

type ItemVars = CSSProperties & Record<`--${string}`, string | number>;

function itemVars(item: CollageItem): ItemVars {
  return {
    '--dc': item.d.col,
    '--dr': item.d.row,
    '--span': item.m.span,
    ...(item.kind === 'photo' && item.m.ar ? { '--ar': item.m.ar } : {}),
  };
}

/** Tell the browser how wide each tile is drawn so it fetches the smaller WebP when it can. */
function tileSizes(item: CollagePhoto): string {
  const cols = Number(/span (\d+)/.exec(item.d.col)?.[1] ?? 6);
  const desktopPx = Math.round((cols / 12) * 1152);
  return `(max-width: 767px) ${item.m.span === 2 ? '100vw' : '50vw'}, ${desktopPx}px`;
}

const textSize = {
  md: 'text-3xl lg:text-4xl',
  lg: 'text-4xl sm:text-5xl lg:text-6xl',
  xl: 'text-6xl sm:text-7xl lg:text-[6rem]',
} as const;

export function EstateCollage({ onClose, startChapterId }: EstateCollageProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [activeName, setActiveName] = useState(collageChapters[0].name);
  const [lightbox, setLightbox] = useState<CollagePhoto | null>(null);

  // Page progress and the active chapter label.
  useEffect(() => {
    const scroller = scrollerRef.current;
    const root = rootRef.current;
    if (!scroller || !root) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = scroller.clientHeight;
      const max = scroller.scrollHeight - vh;
      root.style.setProperty('--sp', max > 0 ? String(scroller.scrollTop / max) : '0');

      let active = collageChapters[0].name;
      scroller.querySelectorAll<HTMLElement>('[data-chapter]').forEach((el) => {
        const top = el.getBoundingClientRect().top - scroller.getBoundingClientRect().top;
        if (top <= vh * 0.45) active = el.dataset.name ?? active;
      });
      setActiveName(active);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Reveal items as they enter the viewport.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    setReady(true);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { root: scroller, threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    scroller.querySelectorAll('.cl-item').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Jump to the requested chapter on open.
  useEffect(() => {
    if (!startChapterId || startChapterId === collageChapters[0].id) return;
    const el = scrollerRef.current?.querySelector<HTMLElement>(`[data-chapter-id="${startChapterId}"]`);
    if (el && scrollerRef.current) scrollerRef.current.scrollTop = el.offsetTop - 72;
  }, [startChapterId]);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (lightbox) closeLightbox();
      else onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, closeLightbox, onClose]);

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-label="Finca Libia, an estate collage"
      className={`cl-root fixed inset-0 z-50 bg-ink-900 text-ivory-100 ${ready ? 'cl-ready' : ''}`}
    >
      <div className="cl-progress" aria-hidden="true" />

      <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 pb-10 pt-6 sm:px-8 cl-header">
        <div className="pointer-events-auto">
          <BackButton onClick={onClose} label="Close" />
        </div>
        <p
          key={activeName}
          className="animate-fade-in font-serif text-lg font-light italic text-champagne-300 hero-text-shadow"
          aria-live="polite"
        >
          {activeName}
        </p>
      </header>

      <div ref={scrollerRef} className="cl-scroller h-full overflow-y-auto overflow-x-hidden">
        <div className="pt-24 sm:pt-28">
          {collageChapters.map((chapter, chapterIdx) => (
            <section
              key={chapter.id}
              data-chapter
              data-chapter-id={chapter.id}
              data-name={chapter.name}
              className="cl-chapter"
            >
              <div className="cl-grid">
                {chapter.items.map((item, i) => {
                  if (item.kind === 'text') {
                    return (
                      <div key={i} className="cl-item cl-text" style={itemVars(item)}>
                        <div className="cl-text-in">
                          <h2
                            className={`font-serif font-light leading-[1.04] tracking-tight text-ivory-50 text-balance ${
                              textSize[item.size ?? 'md']
                            }`}
                          >
                            {item.title}
                            {item.em && (
                              <>
                                {' '}
                                <em className="font-normal italic text-champagne-300">{item.em}</em>
                              </>
                            )}
                          </h2>
                          {item.body && (
                            <p className="mt-5 max-w-[34ch] font-serif text-lg font-light italic leading-relaxed text-ivory-200/85 sm:text-xl">
                              {item.body}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  }
                  return (
                    <figure key={i} className="cl-item cl-fig" style={itemVars(item)}>
                      <button
                        type="button"
                        className="cl-photo no-tap-highlight"
                        onClick={() => setLightbox(item)}
                        aria-label={`View larger: ${item.alt}`}
                      >
                        <img
                          src={photoSrc(item.src, 640)}
                          srcSet={photoSrcSet(item.src)}
                          sizes={tileSizes(item)}
                          alt={item.alt}
                          loading={chapterIdx === 0 ? 'eager' : 'lazy'}
                          decoding="async"
                          draggable={false}
                        />
                        {item.caption && (
                          <figcaption className="cl-cap">{item.caption}</figcaption>
                        )}
                      </button>
                    </figure>
                  );
                })}
              </div>
            </section>
          ))}

          <div className="flex justify-center px-6 pb-28 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="no-tap-highlight group flex items-center gap-2.5 rounded-full bg-champagne-500/90 px-7 py-3.5 text-xs font-medium uppercase tracking-widest-2 text-ink-900 transition-all duration-300 hover:bg-champagne-400 active:scale-95"
            >
              <span>Back to the estate</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex animate-fade-in flex-col items-center justify-center bg-ink-950/95 p-4 sm:p-10"
          role="dialog"
          aria-label={lightbox.alt}
          onClick={closeLightbox}
        >
          <button
            type="button"
            autoFocus
            onClick={closeLightbox}
            aria-label="Close photo"
            className="no-tap-highlight absolute right-4 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-ink-900/70 text-ivory-100 transition-colors hover:border-champagne-400/60 hover:text-champagne-300 sm:right-8"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <img
            src={photoSrc(lightbox.src, 1200)}
            alt={lightbox.alt}
            className="max-h-[78vh] w-auto max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {lightbox.caption && (
            <p className="mt-5 font-serif text-xl font-light italic text-ivory-200">{lightbox.caption}</p>
          )}
        </div>
      )}
    </div>
  );
}
