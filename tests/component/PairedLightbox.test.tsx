import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import PairedLightbox from '../../src/components/PairedLightbox'
import type { ImagePair } from '../../src/types/gallery'

describe('PairedLightbox', () => {
  const pairedPair: ImagePair = {
    id: 'pair-1',
    mainImage: '/main1.jpg',
    namesImage: '/names1.jpg',
    isPaired: true,
  }

  const unpairedPair: ImagePair = {
    id: 'single-1',
    mainImage: '/single1.jpg',
    namesImage: null,
    isPaired: false,
  }

  const defaultProps = {
    pairs: [pairedPair, unpairedPair, { ...pairedPair, id: 'pair-2' }],
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
      render(<PairedLightbox {...defaultProps} />)
      expect(
        screen.getByRole('button', { name: 'Close lightbox' })
      ).toBeInTheDocument()
    })

    it('renders main image with default alt text including id', () => {
      render(<PairedLightbox {...defaultProps} />)
      expect(
        screen.getByAltText('Gallery image - pair-1')
      ).toBeInTheDocument()
    })

    it('renders main image with custom alt text', () => {
      render(<PairedLightbox {...defaultProps} altText="Creature" />)
      expect(screen.getByAltText('Creature - pair-1')).toBeInTheDocument()
    })
  })

  describe('paired images display', () => {
    it('shows both images when isPaired is true', () => {
      render(<PairedLightbox {...defaultProps} />)
      expect(
        screen.getByAltText('Gallery image - pair-1')
      ).toBeInTheDocument()
      expect(
        screen.getByAltText('Gallery image - pair-1 names')
      ).toBeInTheDocument()
    })

    it('renders main image with correct source when paired', () => {
      render(<PairedLightbox {...defaultProps} />)
      const mainImg = screen.getByAltText('Gallery image - pair-1')
      expect(mainImg).toHaveAttribute('src', '/main1.jpg')
    })

    it('renders names image with correct source when paired', () => {
      render(<PairedLightbox {...defaultProps} />)
      const namesImg = screen.getByAltText('Gallery image - pair-1 names')
      expect(namesImg).toHaveAttribute('src', '/names1.jpg')
    })
  })

  describe('unpaired images display', () => {
    it('shows only main image when isPaired is false', () => {
      render(<PairedLightbox {...defaultProps} currentIndex={1} />)
      expect(
        screen.getByAltText('Gallery image - single-1')
      ).toBeInTheDocument()
      expect(
        screen.queryByAltText('Gallery image - single-1 names')
      ).not.toBeInTheDocument()
    })

    it('renders unpaired image with correct source', () => {
      render(<PairedLightbox {...defaultProps} currentIndex={1} />)
      const img = screen.getByAltText('Gallery image - single-1')
      expect(img).toHaveAttribute('src', '/single1.jpg')
    })
  })

  describe('navigation buttons with multiple pairs', () => {
    it('renders prev button when pairs.length > 1', () => {
      render(<PairedLightbox {...defaultProps} />)
      expect(
        screen.getByRole('button', { name: 'Previous pair' })
      ).toBeInTheDocument()
    })

    it('renders next button when pairs.length > 1', () => {
      render(<PairedLightbox {...defaultProps} />)
      expect(
        screen.getByRole('button', { name: 'Next pair' })
      ).toBeInTheDocument()
    })

    it('calls onPrevious when prev button is clicked', () => {
      render(<PairedLightbox {...defaultProps} />)
      fireEvent.click(screen.getByRole('button', { name: 'Previous pair' }))
      expect(defaultProps.onPrevious).toHaveBeenCalledTimes(1)
    })

    it('calls onNext when next button is clicked', () => {
      render(<PairedLightbox {...defaultProps} />)
      fireEvent.click(screen.getByRole('button', { name: 'Next pair' }))
      expect(defaultProps.onNext).toHaveBeenCalledTimes(1)
    })
  })

  describe('navigation buttons with single pair', () => {
    const singlePairProps = {
      ...defaultProps,
      pairs: [pairedPair],
    }

    it('does not render prev button when pairs.length is 1', () => {
      render(<PairedLightbox {...singlePairProps} />)
      expect(
        screen.queryByRole('button', { name: 'Previous pair' })
      ).not.toBeInTheDocument()
    })

    it('does not render next button when pairs.length is 1', () => {
      render(<PairedLightbox {...singlePairProps} />)
      expect(
        screen.queryByRole('button', { name: 'Next pair' })
      ).not.toBeInTheDocument()
    })
  })

  describe('pagination', () => {
    it('shows pagination when multiple pairs', () => {
      render(<PairedLightbox {...defaultProps} currentIndex={0} />)
      expect(screen.getByText('1 / 3')).toBeInTheDocument()
    })

    it('shows correct pagination for different indices', () => {
      render(<PairedLightbox {...defaultProps} currentIndex={2} />)
      expect(screen.getByText('3 / 3')).toBeInTheDocument()
    })

    it('does not show pagination for single pair', () => {
      render(<PairedLightbox {...defaultProps} pairs={[pairedPair]} />)
      expect(screen.queryByText(/\d+ \/ \d+/)).not.toBeInTheDocument()
    })
  })

  describe('keyboard navigation', () => {
    it('calls onClose when Escape is pressed', () => {
      render(<PairedLightbox {...defaultProps} />)
      fireEvent.keyDown(window, { key: 'Escape' })
      expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
    })

    it('calls onPrevious when ArrowLeft is pressed', () => {
      render(<PairedLightbox {...defaultProps} />)
      fireEvent.keyDown(window, { key: 'ArrowLeft' })
      expect(defaultProps.onPrevious).toHaveBeenCalledTimes(1)
    })

    it('calls onNext when ArrowRight is pressed', () => {
      render(<PairedLightbox {...defaultProps} />)
      fireEvent.keyDown(window, { key: 'ArrowRight' })
      expect(defaultProps.onNext).toHaveBeenCalledTimes(1)
    })

    it('does not respond to other keys', () => {
      render(<PairedLightbox {...defaultProps} />)
      fireEvent.keyDown(window, { key: 'Enter' })
      fireEvent.keyDown(window, { key: 'Space' })
      fireEvent.keyDown(window, { key: 'Tab' })
      expect(defaultProps.onClose).not.toHaveBeenCalled()
      expect(defaultProps.onPrevious).not.toHaveBeenCalled()
      expect(defaultProps.onNext).not.toHaveBeenCalled()
    })

    it('removes event listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
      const { unmount } = render(<PairedLightbox {...defaultProps} />)
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
      render(<PairedLightbox {...defaultProps} />)
      const backdrop = screen.getByAltText('Gallery image - pair-1').closest(
        'div[class*="fixed"]'
      )
      fireEvent.click(backdrop!)
      expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
    })

    it('does not call onClose when clicking the image area', () => {
      render(<PairedLightbox {...defaultProps} />)
      const imageContainer = screen
        .getByAltText('Gallery image - pair-1')
        .closest('div[class*="flex items-center justify-center"]')
      fireEvent.click(imageContainer!)
      expect(defaultProps.onClose).not.toHaveBeenCalled()
    })

    it('calls onClose when clicking close button', () => {
      render(<PairedLightbox {...defaultProps} />)
      fireEvent.click(screen.getByRole('button', { name: 'Close lightbox' }))
      expect(defaultProps.onClose).toHaveBeenCalled()
    })

    it('does not propagate click from prev button to backdrop', () => {
      render(<PairedLightbox {...defaultProps} />)
      fireEvent.click(screen.getByRole('button', { name: 'Previous pair' }))
      expect(defaultProps.onPrevious).toHaveBeenCalledTimes(1)
      expect(defaultProps.onClose).not.toHaveBeenCalled()
    })

    it('does not propagate click from next button to backdrop', () => {
      render(<PairedLightbox {...defaultProps} />)
      fireEvent.click(screen.getByRole('button', { name: 'Next pair' }))
      expect(defaultProps.onNext).toHaveBeenCalledTimes(1)
      expect(defaultProps.onClose).not.toHaveBeenCalled()
    })
  })

  describe('switching between paired and unpaired', () => {
    it('correctly displays paired view then unpaired view', () => {
      const { rerender } = render(<PairedLightbox {...defaultProps} />)
      expect(screen.getAllByRole('img')).toHaveLength(2)

      rerender(<PairedLightbox {...defaultProps} currentIndex={1} />)
      expect(screen.getAllByRole('img')).toHaveLength(1)
    })

    it('correctly displays unpaired view then paired view', () => {
      const { rerender } = render(
        <PairedLightbox {...defaultProps} currentIndex={1} />
      )
      expect(screen.getAllByRole('img')).toHaveLength(1)

      rerender(<PairedLightbox {...defaultProps} currentIndex={0} />)
      expect(screen.getAllByRole('img')).toHaveLength(2)
    })
  })
})
