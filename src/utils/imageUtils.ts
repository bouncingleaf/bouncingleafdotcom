/**
 * Convert image paths from JPEG to WebP format
 * Handles .jpeg, .jpg, .png extensions
 */
export function toWebP(path: string): string {
  return path.replace(/\.(jpe?g|png)$/i, '.webp')
}

/**
 * Get thumbnail version of an image (400px)
 */
export function toThumbnail(path: string): string {
  const ext = path.match(/\.(jpe?g|png|webp)$/i)?.[0] || '.webp'
  return path.replace(/\.(jpe?g|png|webp)$/i, `-thumb${ext}`)
}

/**
 * Get medium version of an image (800px)
 */
export function toMedium(path: string): string {
  const ext = path.match(/\.(jpe?g|png|webp)$/i)?.[0] || '.webp'
  return path.replace(/\.(jpe?g|png|webp)$/i, `-medium${ext}`)
}

/**
 * Get WebP thumbnail (400px)
 */
export function toWebPThumbnail(path: string): string {
  return toWebP(toThumbnail(path))
}

/**
 * Get WebP medium (800px)
 */
export function toWebPMedium(path: string): string {
  return toWebP(toMedium(path))
}
