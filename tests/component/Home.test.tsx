import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Home from '../../src/pages/Home'

const renderHome = () =>
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  )

describe('Home', () => {
  it('renders the main heading', () => {
    renderHome()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      "Hi, I'm Leaf."
    )
  })

  it('renders four option cards in order', () => {
    renderHome()
    const links = screen.getAllByRole('link')
    expect(links.map((link) => link.textContent)).toEqual([
      'Writing',
      'Art',
      'Zumba',
      'About Leaf',
    ])
  })

  it.each([
    ['Writing', '/writing'],
    ['Art', '/art'],
    ['Zumba', '/zumba'],
    ['About Leaf', '/about'],
  ])('%s card links to %s', (name, href) => {
    renderHome()
    expect(screen.getByRole('link', { name })).toHaveAttribute('href', href)
  })

  it('each card has a photo', () => {
    renderHome()
    const images = document.querySelectorAll('img')
    expect(images).toHaveLength(4)
    expect(images[0]).toHaveAttribute('src', '/images/TBA_certificate.jpeg')
    expect(images[1]).toHaveAttribute(
      'src',
      '/images/creatures/creatures07/emblem07.jpeg'
    )
    expect(images[3]).toHaveAttribute('src', '/images/leafPortrait.jpg')
  })
})
