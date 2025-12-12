import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react'
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

    it('has "Artomat" section with h2', () => {
      renderArt()
      const heading = screen.getByRole('heading', { level: 2, name: 'Artomat' })
      expect(heading).toBeInTheDocument()
    })

    it('has "Mysterious Creatures" h3 section', () => {
      renderArt()
      const heading = screen.getByRole('heading', {
        level: 3,
        name: 'Mysterious Creatures',
      })
      expect(heading).toBeInTheDocument()
    })

    it('has "Thousands of Circles" h2 section', () => {
      renderArt()
      const heading = screen.getByRole('heading', {
        level: 2,
        name: 'Thousands of Circles',
      })
      expect(heading).toBeInTheDocument()
    })

    it('has "Brooklyn Art Library Sketchbook Project" h2 section', () => {
      renderArt()
      const heading = screen.getByRole('heading', {
        level: 2,
        name: 'Brooklyn Art Library Sketchbook Project',
      })
      expect(heading).toBeInTheDocument()
    })

    it('has "Other people\'s art" h2 section', () => {
      renderArt()
      const heading = screen.getByRole('heading', {
        level: 2,
        name: "Other people's art",
      })
      expect(heading).toBeInTheDocument()
    })
  })

  describe("Other People's Art Section", () => {
    it('contains links to artists', () => {
      renderArt()
      // Check for the text labels within the artist links section
      expect(screen.getByText('Larry Barth')).toBeInTheDocument()
      expect(screen.getByText('Rosemary Mosco')).toBeInTheDocument()
      expect(screen.getByText('Birdstrips')).toBeInTheDocument()
      expect(screen.getByText('Chuck Draws Things')).toBeInTheDocument()
      expect(screen.getByText('False Knees')).toBeInTheDocument()
      expect(screen.getByText('Milky Way Opera')).toBeInTheDocument()
    })

    it('links have correct hrefs', () => {
      renderArt()
      const links = screen.getAllByRole('link')
      const larryBarthLink = links.find(
        (link) =>
          link.getAttribute('href') ===
          'https://wardfdn.org/artists/larry-barth/'
      )
      const birdstripsLink = links.find(
        (link) =>
          link.getAttribute('href') === 'https://www.instagram.com/birdstrips/'
      )
      expect(larryBarthLink).toBeInTheDocument()
      expect(birdstripsLink).toBeInTheDocument()
    })
  })

  describe('Navigation Menu', () => {
    it('renders navigation menu for jumping to sections', () => {
      renderArt()
      expect(
        screen.getByText('Jump to series (click emblem or label):')
      ).toBeInTheDocument()
    })

    it('displays creatures series labels', () => {
      renderArt()
      expect(screen.getByText('Creatures 8')).toBeInTheDocument()
      expect(screen.getByText('Creatures 1')).toBeInTheDocument()
    })

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
      const book1Emblem = screen.getByAltText('Thumbnail for sketchbook series 1')
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

  describe('External Links', () => {
    it('has link to Artomat website', () => {
      renderArt()
      const artomatLink = screen.getByRole('link', { name: 'Artomat' })
      expect(artomatLink).toHaveAttribute('href', 'https://www.artomat.org/')
    })

    it('has link to Artomat Instagram', () => {
      renderArt()
      const instaLink = screen.getByRole('link', {
        name: 'the Artomat Instagram',
      })
      expect(instaLink).toHaveAttribute(
        'href',
        'https://www.instagram.com/artomat/'
      )
    })

    it('has link to Brooklyn Art Library', () => {
      renderArt()
      const balLink = screen.getByRole('link', {
        name: 'Brooklyn Art Library Sketchbook Project,',
      })
      expect(balLink).toHaveAttribute('href', 'https://brooklynartlibrary.org/')
    })
  })

  describe('Creatures Series Display', () => {
    it('displays all 8 creatures series', () => {
      renderArt()
      for (let i = 1; i <= 8; i++) {
        expect(
          screen.getByRole('heading', {
            level: 4,
            name: new RegExp(`Mysterious Creatures Series ${i}`),
          })
        ).toBeInTheDocument()
      }
    })

    it('displays creatures series in reverse order (8 first)', () => {
      renderArt()
      const series8 = screen.getByRole('heading', {
        name: /Mysterious Creatures Series 8/,
      })
      const series1 = screen.getByRole('heading', {
        name: /Mysterious Creatures Series 1/,
      })

      const series8Position =
        series8.compareDocumentPosition(series1) &
        Node.DOCUMENT_POSITION_FOLLOWING
      expect(series8Position).toBeTruthy()
    })
  })

  describe('Sketchbook Section', () => {
    it('displays first sketchbook title', () => {
      renderArt()
      expect(
        screen.getByRole('heading', {
          level: 3,
          name: /Casual References to Other Dimensions/,
        })
      ).toBeInTheDocument()
    })

    it('displays second sketchbook title', () => {
      renderArt()
      expect(
        screen.getByRole('heading', {
          level: 3,
          name: /Your Guide to Drawing the Line/,
        })
      ).toBeInTheDocument()
    })

    it('both sketchbooks are expandable', () => {
      renderArt()
      screen.getByRole('heading', {
        level: 3,
        name: /Casual References to Other Dimensions/,
      })
      screen.getByRole('heading', {
        level: 3,
        name: /Your Guide to Drawing the Line/,
      })

      // Both books should have "click to expand" text below emblems since they start collapsed
      const expandTexts = screen.getAllByText(/click to expand/)
      expect(expandTexts.length).toBeGreaterThanOrEqual(2)
    })
  })

  describe('Section Toggle Links', () => {
    it('displays toggle links in creatures series', () => {
      renderArt()
      // Each of the 8 creatures series should have a toggle link
      const toggleButtons = screen.getAllByRole('button', { name: /click to/ })
      expect(toggleButtons.length).toBeGreaterThanOrEqual(8)
    })

    it('toggles creatures series when bottom link is clicked', () => {
      renderArt()
      // Find first creatures series toggle button at bottom of section
      const toggleButtons = screen.getAllByRole('button', { name: /click to expand/ })

      // Click to expand
      fireEvent.click(toggleButtons[0])

      // Should now show "click to hide" button
      expect(screen.getAllByRole('button', { name: /click to hide/ }).length).toBeGreaterThan(0)
    })
  })
})
