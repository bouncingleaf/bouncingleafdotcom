import { useEffect } from 'react'
import OptimizedImage from './OptimizedImage'

interface LightboxProps {
  images: string[]
  currentIndex: number
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
  altText?: string
}

function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrevious,
  onNext,
  altText = 'Gallery image',
}: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrevious()
      if (e.key === 'ArrowRight') onNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onPrevious, onNext])

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10"
        aria-label="Close lightbox"
      >
        &times;
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onPrevious()
            }}
            className="absolute left-4 text-white text-6xl hover:text-gray-300 z-10"
            aria-label="Previous image"
          >
            &#8249;
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            className="absolute right-4 text-white text-6xl hover:text-gray-300 z-10"
            aria-label="Next image"
          >
            &#8250;
          </button>
        </>
      )}

      <div
        className="max-w-7xl max-h-[90vh] p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <OptimizedImage
          src={images[currentIndex]}
          alt={`${altText} ${currentIndex + 1}`}
          className="max-w-full max-h-[90vh] object-contain"
          loading="eager"
          size="full"
        />
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  )
}

export default Lightbox
