import { useEffect } from 'react'
import type { ImagePair } from '../types/gallery'
import OptimizedImage from './OptimizedImage'

interface PairedLightboxProps {
  pairs: ImagePair[]
  currentIndex: number
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
  altText?: string
}

function PairedLightbox({
  pairs,
  currentIndex,
  onClose,
  onPrevious,
  onNext,
  altText = 'Gallery image',
}: PairedLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrevious()
      if (e.key === 'ArrowRight') onNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onPrevious, onNext])

  const currentPair = pairs[currentIndex]
  const isPaired = currentPair.isPaired

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10"
        aria-label="Close lightbox"
      >
        &times;
      </button>

      {pairs.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onPrevious()
            }}
            className="absolute left-4 text-white text-6xl hover:text-gray-300 z-10"
            aria-label="Previous pair"
          >
            &#8249;
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            className="absolute right-4 text-white text-6xl hover:text-gray-300 z-10"
            aria-label="Next pair"
          >
            &#8250;
          </button>
        </>
      )}

      <div
        className="w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {isPaired ? (
          <div className="flex gap-4 items-center justify-center max-w-full max-h-full">
            <OptimizedImage
              src={currentPair.mainImage}
              alt={`${altText} - ${currentPair.id}`}
              className="max-h-[90vh] max-w-[45vw] object-contain"
              loading="eager"
              size="full"
            />
            <OptimizedImage
              src={currentPair.namesImage!}
              alt={`${altText} - ${currentPair.id} names`}
              className="max-h-[90vh] max-w-[45vw] object-contain"
              loading="eager"
              size="full"
            />
          </div>
        ) : (
          <OptimizedImage
            src={currentPair.mainImage}
            alt={`${altText} - ${currentPair.id}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            loading="eager"
            size="full"
          />
        )}
      </div>

      {pairs.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
          {currentIndex + 1} / {pairs.length}
        </div>
      )}
    </div>
  )
}

export default PairedLightbox
