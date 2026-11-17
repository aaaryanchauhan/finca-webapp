import type { ImgHTMLAttributes } from 'react';
import { photoSrc, photoSrcSet } from '@/lib/photo';

type PhotoProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> & {
  src: string;
  /** How wide the photo is drawn, so the browser fetches the smaller file when it can. */
  sizes?: string;
};

/** An <img> that serves the right-sized WebP for local photos. */
export function Photo({ src, sizes = '100vw', alt = '', loading = 'lazy', decoding = 'async', ...rest }: PhotoProps) {
  const srcSet = photoSrcSet(src);
  return (
    <img
      src={photoSrc(src, 1200)}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      loading={loading}
      decoding={decoding}
      {...rest}
    />
  );
}
