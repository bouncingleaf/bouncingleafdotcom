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
        screen.getByText('Jump to section (click emblem or label):')
      ).toBeInTheDocument()
    })

    it('displays creatures series labels', () => {
      renderArt()
      expect(screen.getByText('Creatures 8')).toBeInTheDocument()
      expect(screen.getByText('Creatures 1')).toBeInTheDocument()
    })

    it('displays circles and sketchbook labels', () => {
      renderArt()
      expect(screen.getByText('Circles')).toBeInTheDocument()
      expect(screen.getByText('Book 1')).toBeInTheDocument()
      expect(screen.getByText('Book 2')).toBeInTheDocument()
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
      expect(
        within(circlesSection!).getByText(/click to hide/)
      ).toBeInTheDocument()
    })

    it('book1 gallery is expanded by default', () => {
      renderArt()
      const sketchTitle = screen.getByRole('heading', {
        level: 3,
        name: /Casual References to Other Dimensions/,
      })
      expect(sketchTitle).toBeInTheDocument()
      expect(
        within(sketchTitle.parentElement!).getByText(/click to hide/)
      ).toBeInTheDocument()
    })

    it('toggles circles gallery visibility when clicked', () => {
      renderArt()
      const circlesSection = screen
        .getByRole('heading', { level: 2, name: 'Thousands of Circles' })
        .closest('section')
      const toggleText = within(circlesSection!).getByText(
        /Thousands of circles/
      )
      expect(toggleText).toBeInTheDocument()

      fireEvent.click(toggleText)
      expect(
        within(circlesSection!).getByText(/click to show/)
      ).toBeInTheDocument()
    })

    it('toggles sketchbook gallery visibility when clicked', () => {
      renderArt()
      const sketchTitle = screen.getByRole('heading', {
        level: 3,
        name: /Casual References to Other Dimensions/,
      })

      fireEvent.click(sketchTitle)

      const updatedSketchTitle = screen.getByRole('heading', {
        level: 3,
        name: /Casual References to Other Dimensions/,
      })
      expect(
        within(updatedSketchTitle.parentElement!).getByText(/click to show/)
      ).toBeInTheDocument()
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
            name: `Mysterious Creatures Series ${i}`,
          })
        ).toBeInTheDocument()
      }
    })

    it('displays creatures series in reverse order (8 first)', () => {
      renderArt()
      const series8 = screen.getByRole('heading', {
        name: 'Mysterious Creatures Series 8',
      })
      const series1 = screen.getByRole('heading', {
        name: 'Mysterious Creatures Series 1',
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
      const book1Title = screen.getByRole('heading', {
        level: 3,
        name: /Casual References to Other Dimensions/,
      })
      const book2Title = screen.getByRole('heading', {
        level: 3,
        name: /Your Guide to Drawing the Line/,
      })

      expect(
        within(book1Title.parentElement!).getByText(/click to/)
      ).toBeInTheDocument()
      expect(
        within(book2Title.parentElement!).getByText(/click to/)
      ).toBeInTheDocument()
    })
  })

  describe('Top of Page Links', () => {
    beforeEach(() => {
      window.scrollTo = vi.fn()
    })

    it('displays top of page links in creatures series', () => {
      renderArt()
      const topLinks = screen.getAllByText('↑ top of page')
      // 8 creatures series + artomat + circles + book1 + book2 = 12 total
      expect(topLinks.length).toBeGreaterThanOrEqual(8)
    })

    it('scrolls to top when top of page link is clicked', () => {
      renderArt()
      const topLinks = screen.getAllByText('↑ top of page')

      fireEvent.click(topLinks[0])

      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth',
      })
    })
  })
})
