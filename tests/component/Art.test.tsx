import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Art from '../../src/pages/Art'

const renderArt = () => {
  return render(
    <BrowserRouter>
      <Art />
    </BrowserRouter>
  )
}

describe('Art Page', () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = vi.fn()
  })

  describe('Page Structure', () => {
    it('renders h1 with "Art"', () => {
      renderArt()
      const heading = screen.getByRole('heading', { level: 1, name: 'Art' })
      expect(heading).toBeInTheDocument()
    })
  })

  describe('Navigation Menu', () => {
    it('scrolls to series when emblem is clicked', async () => {
      renderArt()
      const creatures8Label = screen.getByText('Creatures 8')
      expect(creatures8Label).toBeInTheDocument()

      fireEvent.click(creatures8Label)
      // Wait for requestAnimationFrame callbacks to complete
      await waitFor(() => {
        expect(Element.prototype.scrollIntoView).toHaveBeenCalled()
      })
    })
  })

  describe('Expandable Galleries', () => {
    it('circles gallery is expanded by default', () => {
      renderArt()
      const circlesSection = screen
        .getByRole('heading', { level: 2, name: 'Thousands of Circles' })
        .closest('section')
      expect(circlesSection).toBeInTheDocument()
      // Check that images are visible (gallery is expanded)
      const circleImages = screen.getAllByAltText(/circles\d/)
      expect(circleImages.length).toBeGreaterThan(0)
    })

    it('book1 gallery is collapsed by default', () => {
      renderArt()
      const sketchTitle = screen.getByRole('heading', {
        level: 3,
        name: /Casual References to Other Dimensions/,
      })
      expect(sketchTitle).toBeInTheDocument()
      // Check that book gallery images are not rendered (since collapsed)
      const book1Images = screen.queryAllByAltText(/book1-s/)
      expect(book1Images.length).toBe(0)
    })

    it('toggles circles gallery visibility when clicked', () => {
      renderArt()
      // Count images before hiding
      const imagesBefore = screen.getAllByAltText(/circles\d/)
      expect(imagesBefore.length).toBeGreaterThan(0)

      // Find the toggle button at bottom of circles section
      const circlesToggleButton = screen.getByRole('button', {
        name: /click to hide/,
      })

      // Click to hide the gallery
      fireEvent.click(circlesToggleButton)

      // Images should be gone now
      expect(screen.queryAllByAltText(/circles\d/).length).toBe(0)
    })

    it('toggles sketchbook gallery visibility when clicked', () => {
      renderArt()
      // Verify no images initially (book starts collapsed)
      expect(screen.queryAllByAltText(/book1-s/).length).toBe(0)

      // Find book1's emblem and click it to expand
      const book1Emblem = screen.getByAltText(
        'Thumbnail for sketchbook series 1'
      )
      fireEvent.click(book1Emblem)

      // Should now have images visible since we expanded it
      expect(screen.getAllByAltText(/book1-s/).length).toBeGreaterThan(0)
    })
  })

  describe('Lightbox Functionality', () => {
    it('opens lightbox when clicking artomat images', () => {
      renderArt()
      const artomatImages = screen.getAllByAltText(/IMG 62/)
      expect(artomatImages.length).toBeGreaterThan(0)

      fireEvent.click(artomatImages[0])

      expect(screen.getByLabelText('Close lightbox')).toBeInTheDocument()
    })

    it('opens lightbox when clicking circles images', () => {
      renderArt()
      const circlesImages = screen.getAllByAltText(/circles\d/)
      expect(circlesImages.length).toBeGreaterThan(0)

      fireEvent.click(circlesImages[0])
      expect(screen.getByLabelText('Close lightbox')).toBeInTheDocument()
    })

    it('closes lightbox when close button is clicked', () => {
      renderArt()
      const artomatImages = screen.getAllByAltText(/IMG 62/)
      fireEvent.click(artomatImages[0])

      const closeButton = screen.getByLabelText('Close lightbox')
      fireEvent.click(closeButton)

      expect(screen.queryByLabelText('Close lightbox')).not.toBeInTheDocument()
    })

    it('shows navigation buttons in lightbox', () => {
      renderArt()
      const artomatImages = screen.getAllByAltText(/IMG 62/)
      fireEvent.click(artomatImages[0])

      expect(screen.getByLabelText('Previous image')).toBeInTheDocument()
      expect(screen.getByLabelText('Next image')).toBeInTheDocument()
    })

    it('navigates to next image when next button is clicked', () => {
      renderArt()
      const artomatImages = screen.getAllByAltText(/IMG 62/)
      fireEvent.click(artomatImages[0])

      const nextButton = screen.getByLabelText('Next image')
      fireEvent.click(nextButton)

      expect(screen.getByText(/2 \//)).toBeInTheDocument()
    })

    it('navigates to previous image when previous button is clicked', () => {
      renderArt()
      const artomatImages = screen.getAllByAltText(/IMG 62/)
      fireEvent.click(artomatImages[0])

      const prevButton = screen.getByLabelText('Previous image')
      fireEvent.click(prevButton)

      expect(screen.getByText(/3 \//)).toBeInTheDocument()
    })
  })

  describe('Paired Lightbox for Creatures', () => {
    it('opens paired lightbox when clicking creature images', () => {
      renderArt()
      const creatureImages = screen.getAllByAltText(
        /Mysterious Creatures Series \d+ - \d/
      )
      expect(creatureImages.length).toBeGreaterThan(0)

      fireEvent.click(creatureImages[0])

      expect(screen.getByLabelText('Close lightbox')).toBeInTheDocument()
    })

    it('shows navigation buttons in paired lightbox', () => {
      renderArt()
      const creatureImages = screen.getAllByAltText(
        /Mysterious Creatures Series \d+ - \d/
      )
      fireEvent.click(creatureImages[0])

      expect(screen.getByLabelText('Previous pair')).toBeInTheDocument()
      expect(screen.getByLabelText('Next pair')).toBeInTheDocument()
    })

    it('closes paired lightbox when close button is clicked', () => {
      renderArt()
      const creatureImages = screen.getAllByAltText(
        /Mysterious Creatures Series \d+ - \d/
      )
      fireEvent.click(creatureImages[0])

      const closeButton = screen.getByLabelText('Close lightbox')
      fireEvent.click(closeButton)

      expect(screen.queryByLabelText('Close lightbox')).not.toBeInTheDocument()
    })

    it('navigates to next pair when next button is clicked', () => {
      renderArt()
      const creatureImages = screen.getAllByAltText(
        /Mysterious Creatures Series \d+ - \d/
      )
      fireEvent.click(creatureImages[0])

      const nextButton = screen.getByLabelText('Next pair')
      fireEvent.click(nextButton)

      expect(screen.getByText(/2 \//)).toBeInTheDocument()
    })
  })

  describe('Section Toggle Links', () => {
    it('toggles creatures series when bottom link is clicked', () => {
      renderArt()
      // Find first creatures series toggle button at bottom of section
      const toggleButtons = screen.getAllByRole('button', {
        name: /click to expand/,
      })

      // Click to expand
      fireEvent.click(toggleButtons[0])

      // Should now show "click to hide" button
      expect(
        screen.getAllByRole('button', { name: /click to hide/ }).length
      ).toBeGreaterThan(0)
    })
  })
})
