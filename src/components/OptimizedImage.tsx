import { toWebP, toWebPThumbnail, toWebPMedium } from '../utils/imageUtils'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
  width?: number
  height?: number
  style?: React.CSSProperties
  onClick?: () => void
  /**
   * Size hint for responsive images:
   * - 'thumbnail': Use 400px thumbnail for small images (emblems, navigation)
   * - 'medium': Use 800px medium for gallery grids
   * - 'full': Use full-size image for lightbox and large displays
   */
  size?: 'thumbnail' | 'medium' | 'full'
}

/**
 * Optimized image component that uses WebP format with responsive sizing
 * Falls back to original image if WebP is not available
 */
export default function OptimizedImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  width,
  height,
  style,
  onClick,
  size = 'full',
}: OptimizedImageProps) {
  // Skip optimization for WebP images only
  const isOptimizable = /\.(jpe?g|png)$/i.test(src)

  if (!isOptimizable) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        width={width}
        height={height}
        style={style}
        onClick={onClick}
      />
    )
  }

  // Use appropriate WebP size based on usage
  const webpSrc =
    size === 'thumbnail'
      ? toWebPThumbnail(src)
      : size === 'medium'
        ? toWebPMedium(src)
        : toWebP(src)

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        width={width}
        height={height}
        style={style}
        onClick={onClick}
      />
    </picture>
  )
}
