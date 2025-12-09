import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Lightbox from '../../src/components/Lightbox'

describe('Lightbox', () => {
  const defaultProps = {
    images: ['/image1.jpg', '/image2.jpg', '/image3.jpg'],
    currentIndex: 0,
    onClose: vi.fn(),
    onPrevious: vi.fn(),
    onNext: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('renders the close button with correct aria-label', () => {
      render(<Lightbox {...defaultProps} />)
      expect(
        screen.getByRole('button', { name: 'Close lightbox' })
      ).toBeInTheDocument()
    })

    it('renders the current image with default alt text', () => {
      render(<Lightbox {...defaultProps} />)
      expect(screen.getByAltText('Gallery image 1')).toBeInTheDocument()
    })

    it('renders the current image with custom alt text', () => {
      render(<Lightbox {...defaultProps} altText="Artwork" />)
      expect(screen.getByAltText('Artwork 1')).toBeInTheDocument()
    })

    it('renders correct alt text for different indices', () => {
      render(<Lightbox {...defaultProps} currentIndex={2} altText="Photo" />)
      expect(screen.getByAltText('Photo 3')).toBeInTheDocument()
    })

    it('renders the correct image source', () => {
      render(<Lightbox {...defaultProps} currentIndex={1} />)
      const img = screen.getByAltText('Gallery image 2')
      expect(img).toHaveAttribute('src', '/image2.jpg')
    })
  })

  describe('navigation buttons with multiple images', () => {
    it('renders prev button when images.length > 1', () => {
      render(<Lightbox {...defaultProps} />)
      expect(
        screen.getByRole('button', { name: 'Previous image' })
      ).toBeInTheDocument()
    })

    it('renders next button when images.length > 1', () => {
      render(<Lightbox {...defaultProps} />)
      expect(
        screen.getByRole('button', { name: 'Next image' })
      ).toBeInTheDocument()
    })

    it('calls onPrevious when prev button is clicked', () => {
      render(<Lightbox {...defaultProps} />)
      fireEvent.click(screen.getByRole('button', { name: 'Previous image' }))
      expect(defaultProps.onPrevious).toHaveBeenCalledTimes(1)
    })

    it('calls onNext when next button is clicked', () => {
      render(<Lightbox {...defaultProps} />)
      fireEvent.click(screen.getByRole('button', { name: 'Next image' }))
      expect(defaultProps.onNext).toHaveBeenCalledTimes(1)
    })
  })

  describe('navigation buttons with single image', () => {
    const singleImageProps = {
      ...defaultProps,
      images: ['/single.jpg'],
    }

    it('does not render prev button when images.length is 1', () => {
      render(<Lightbox {...singleImageProps} />)
      expect(
        screen.queryByRole('button', { name: 'Previous image' })
      ).not.toBeInTheDocument()
    })

    it('does not render next button when images.length is 1', () => {
      render(<Lightbox {...singleImageProps} />)
      expect(
        screen.queryByRole('button', { name: 'Next image' })
      ).not.toBeInTheDocument()
    })
  })

  describe('pagination', () => {
    it('shows pagination when multiple images', () => {
      render(<Lightbox {...defaultProps} currentIndex={0} />)
      expect(screen.getByText('1 / 3')).toBeInTheDocument()
    })

    it('shows correct pagination for different indices', () => {
      render(<Lightbox {...defaultProps} currentIndex={2} />)
      expect(screen.getByText('3 / 3')).toBeInTheDocument()
    })

    it('does not show pagination for single image', () => {
      render(<Lightbox {...defaultProps} images={['/single.jpg']} />)
      expect(screen.queryByText(/\d+ \/ \d+/)).not.toBeInTheDocument()
    })
  })

  describe('keyboard navigation', () => {
    it('calls onClose when Escape is pressed', () => {
      render(<Lightbox {...defaultProps} />)
      fireEvent.keyDown(window, { key: 'Escape' })
      expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
    })

    it('calls onPrevious when ArrowLeft is pressed', () => {
      render(<Lightbox {...defaultProps} />)
      fireEvent.keyDown(window, { key: 'ArrowLeft' })
      expect(defaultProps.onPrevious).toHaveBeenCalledTimes(1)
    })

    it('calls onNext when ArrowRight is pressed', () => {
      render(<Lightbox {...defaultProps} />)
      fireEvent.keyDown(window, { key: 'ArrowRight' })
      expect(defaultProps.onNext).toHaveBeenCalledTimes(1)
    })

    it('does not respond to other keys', () => {
      render(<Lightbox {...defaultProps} />)
      fireEvent.keyDown(window, { key: 'Enter' })
      fireEvent.keyDown(window, { key: 'Space' })
      fireEvent.keyDown(window, { key: 'Tab' })
      expect(defaultProps.onClose).not.toHaveBeenCalled()
      expect(defaultProps.onPrevious).not.toHaveBeenCalled()
      expect(defaultProps.onNext).not.toHaveBeenCalled()
    })

    it('removes event listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
      const { unmount } = render(<Lightbox {...defaultProps} />)
      unmount()
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'keydown',
        expect.any(Function)
      )
      removeEventListenerSpy.mockRestore()
    })
  })

  describe('click behavior', () => {
    it('calls onClose when clicking the backdrop', () => {
      render(<Lightbox {...defaultProps} />)
      const backdrop = screen
        .getByAltText('Gallery image 1')
        .closest('div')?.parentElement
      fireEvent.click(backdrop!)
      expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
    })

    it('does not call onClose when clicking the image area', () => {
      render(<Lightbox {...defaultProps} />)
      const imageContainer =
        screen.getByAltText('Gallery image 1').parentElement
      fireEvent.click(imageContainer!)
      expect(defaultProps.onClose).not.toHaveBeenCalled()
    })

    it('calls onClose when clicking close button', () => {
      render(<Lightbox {...defaultProps} />)
      fireEvent.click(screen.getByRole('button', { name: 'Close lightbox' }))
      expect(defaultProps.onClose).toHaveBeenCalled()
    })

    it('does not propagate click from prev button to backdrop', () => {
      render(<Lightbox {...defaultProps} />)
      fireEvent.click(screen.getByRole('button', { name: 'Previous image' }))
      expect(defaultProps.onPrevious).toHaveBeenCalledTimes(1)
      expect(defaultProps.onClose).not.toHaveBeenCalled()
    })

    it('does not propagate click from next button to backdrop', () => {
      render(<Lightbox {...defaultProps} />)
      fireEvent.click(screen.getByRole('button', { name: 'Next image' }))
      expect(defaultProps.onNext).toHaveBeenCalledTimes(1)
      expect(defaultProps.onClose).not.toHaveBeenCalled()
    })
  })
})
