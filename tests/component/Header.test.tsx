import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Header from '../../src/components/Header'

const renderHeader = () => {
  return render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  )
}

describe('Header', () => {
  describe('Site title', () => {
    it('renders site title "Leaf\'s art portfolio"', () => {
      renderHeader()
      expect(screen.getByText("Leaf's art portfolio")).toBeInTheDocument()
    })

    it('site title links to home', () => {
      renderHeader()
      const titleLink = screen.getByText("Leaf's art portfolio")
      expect(titleLink).toHaveAttribute('href', '/')
    })
  })

  describe('Desktop navigation', () => {
    it('renders Writing link', () => {
      renderHeader()
      const writingLinks = screen.getAllByText('Writing')
      expect(writingLinks.length).toBeGreaterThan(0)
      expect(writingLinks[0]).toHaveAttribute('href', '/writing')
    })

    it('renders Art link', () => {
      renderHeader()
      const artLinks = screen.getAllByText('Art')
      expect(artLinks.length).toBeGreaterThan(0)
      expect(artLinks[0]).toHaveAttribute('href', '/art')
    })

    it('renders About link', () => {
      renderHeader()
      const aboutLinks = screen.getAllByText('About')
      expect(aboutLinks.length).toBeGreaterThan(0)
      expect(aboutLinks[0]).toHaveAttribute('href', '/about')
    })
  })

  describe('Mobile menu button', () => {
    it('renders mobile menu button with aria-label "Toggle menu"', () => {
      renderHeader()
      const menuButton = screen.getByLabelText('Toggle menu')
      expect(menuButton).toBeInTheDocument()
    })

    it('mobile menu button has aria-expanded="false" initially', () => {
      renderHeader()
      const menuButton = screen.getByLabelText('Toggle menu')
      expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    })

    it('mobile menu button toggles aria-expanded when clicked', () => {
      renderHeader()
      const menuButton = screen.getByLabelText('Toggle menu')

      fireEvent.click(menuButton)
      expect(menuButton).toHaveAttribute('aria-expanded', 'true')

      fireEvent.click(menuButton)
      expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    })
  })

  describe('Mobile navigation', () => {
    it('mobile navigation is hidden initially', () => {
      renderHeader()
      const allWritingLinks = screen.getAllByText('Writing')
      expect(allWritingLinks.length).toBe(1)
    })

    it('mobile navigation appears when menu button is clicked', () => {
      renderHeader()
      const menuButton = screen.getByLabelText('Toggle menu')

      fireEvent.click(menuButton)

      const writingLinks = screen.getAllByText('Writing')
      expect(writingLinks.length).toBe(2)
    })

    it('clicking mobile Writing link closes the menu', () => {
      renderHeader()
      const menuButton = screen.getByLabelText('Toggle menu')

      fireEvent.click(menuButton)
      const writingLinks = screen.getAllByText('Writing')
      fireEvent.click(writingLinks[1])

      expect(screen.getAllByText('Writing').length).toBe(1)
    })

    it('clicking mobile Art link closes the menu', () => {
      renderHeader()
      const menuButton = screen.getByLabelText('Toggle menu')

      fireEvent.click(menuButton)
      const artLinks = screen.getAllByText('Art')
      fireEvent.click(artLinks[1])

      expect(screen.getAllByText('Art').length).toBe(1)
    })

    it('clicking mobile About link closes the menu', () => {
      renderHeader()
      const menuButton = screen.getByLabelText('Toggle menu')

      fireEvent.click(menuButton)
      const aboutLinks = screen.getAllByText('About')
      fireEvent.click(aboutLinks[1])

      expect(screen.getAllByText('About').length).toBe(1)
    })
  })
})
