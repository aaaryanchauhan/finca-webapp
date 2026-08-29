import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
  label?: string;
  dark?: boolean;
}

export function BackButton({ onClick, label = 'Back', dark = false }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`no-tap-highlight group inline-flex min-h-[40px] items-center gap-2 rounded-full border px-3.5 py-1.5 backdrop-blur-md transition-all duration-300 active:scale-95 ${
        dark
          ? 'border-ink-900/20 bg-ivory-100/80 text-ink-900 hover:bg-ivory-100'
          : 'border-white/20 bg-ink-950/60 text-ivory-100 shadow-lg hover:border-champagne-400/50 hover:bg-ink-900/80'
      }`}
    >
      <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={1.5} />
      <span className="text-[11px] font-medium uppercase tracking-widest-2">{label}</span>
    </button>
  );
}

