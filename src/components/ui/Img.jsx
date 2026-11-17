import { imageUrl } from '../../data/media';

const WIDTHS = [480, 800, 1200, 1600, 2200];

/**
 * Responsive, lazy-loaded image. Accepts an `image` object ({ src, alt }) from the
 * data layer, so swapping to CMS-hosted media needs no component changes.
 * Pass `h` to request a hard crop at a given aspect ratio.
 */
export default function Img({ image, src, alt, w = 1200, h, sizes = '100vw', priority = false, className = '', ...rest }) {
  const source = image?.src ?? src;
  const altText = alt ?? image?.alt ?? '';
  const ratio = h ? h / w : null;
  const responsive = source?.includes('images.unsplash.com');
  const srcSet = responsive
    ? WIDTHS.filter((x) => x <= Math.max(w * 1.9, 480))
        .map((x) => `${imageUrl(source, { w: x, h: ratio ? Math.round(x * ratio) : undefined })} ${x}w`)
        .join(', ')
    : undefined;

  return (
    <img
      src={imageUrl(source, { w, h })}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={altText}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      {...(priority ? { fetchpriority: 'high' } : {})}
      className={className}
      {...rest}
    />
  );
}
