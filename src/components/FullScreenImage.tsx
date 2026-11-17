import { Photo } from '@/components/Photo';

interface FullScreenImageProps {
  src: string;
  alt?: string;
  className?: string;
  overlay?: boolean;
  overlayOpacity?: string;
  scale?: boolean;
}

export function FullScreenImage({
  src,
  alt = '',
  className = '',
  overlay = true,
  overlayOpacity = 'bg-ink-900/40',
  scale = true,
}: FullScreenImageProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Photo
        src={src}
        alt={alt}
        className={`h-full w-full object-cover ${scale ? 'animate-scale-in' : ''}`}
        loading="eager"
      />
      {overlay && <div className={`absolute inset-0 ${overlayOpacity}`} />}
    </div>
  );
}
