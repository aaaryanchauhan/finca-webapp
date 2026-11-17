/**
 * Every raster photo under /photos has two pre-generated WebP versions next to
 * it: `name.w640.webp` (phones, thumbnails) and `name.w1200.webp` (full size).
 * Anything else (remote URLs, .avif, .svg) is passed through untouched.
 */
const LOCAL_RASTER = /^\/photos\/.+\.(jpe?g|png)$/i;
const EXT = /\.(jpe?g|png)$/i;

export function isOptimisable(src: string): boolean {
  return LOCAL_RASTER.test(src);
}

export function photoSrc(src: string, width: 640 | 1200 = 1200): string {
  return isOptimisable(src) ? encodeURI(src.replace(EXT, `.w${width}.webp`)) : src;
}

export function photoSrcSet(src: string): string | undefined {
  if (!isOptimisable(src)) return undefined;
  return `${photoSrc(src, 640)} 640w, ${photoSrc(src, 1200)} 1200w`;
}
