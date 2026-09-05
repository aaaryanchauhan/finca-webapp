import { Share, PlusSquare, X } from 'lucide-react';

interface InstallAppModalProps {
  onClose: () => void;
}

export function InstallAppModal({ onClose }: InstallAppModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink-950/80 p-4 sm:p-6 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm rounded-3xl border border-champagne-400/30 bg-ink-900 p-6 shadow-2xl animate-fade-up">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-stone-400 transition-colors hover:bg-ink-800 hover:text-ivory-100"
        >
          <X className="h-5 w-5" />
        </button>
        
        <h3 className="font-serif text-2xl font-light text-ivory-50">Install App</h3>
        <p className="mt-2 text-sm text-stone-300">
          Install Finca Libia on your home screen for quick access and a better full-screen experience.
        </p>

        <div className="mt-6 space-y-4 rounded-2xl bg-ink-950/50 p-5 border border-ink-800">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink-800 text-ivory-100 border border-ink-700">
              <Share className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-ivory-100">1. Tap Share</p>
              <p className="text-xs text-stone-400 mt-1">Tap the share button in your browser's toolbar.</p>
            </div>
          </div>
          
          <div className="h-px w-full bg-ink-800" />
          
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink-800 text-ivory-100 border border-ink-700">
              <PlusSquare className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-ivory-100">2. Add to Home Screen</p>
              <p className="text-xs text-stone-400 mt-1">Scroll down and select "Add to Home Screen".</p>
            </div>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-full bg-champagne-500 py-3.5 text-sm font-medium text-ink-900 transition-colors hover:bg-champagne-400"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
