import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '../../src/pages/Home'

describe('Home', () => {
  it('renders the main heading', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      "Hi, I'm Leaf."
    )
  })

  it('shows text about Mysterious Creatures', () => {
    render(<Home />)
    expect(screen.getByText(/Mysterious Creatures/i)).toBeInTheDocument()
  })

  it('renders 3 featured emblem images', () => {
    render(<Home />)
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(3)
    expect(images[0]).toHaveAttribute('alt', 'Mysterious Creatures Series 3')
    expect(images[1]).toHaveAttribute('alt', 'Mysterious Creatures Series 5')
    expect(images[2]).toHaveAttribute('alt', 'Mysterious Creatures Series 7')
  })

  it('featured images have correct src paths', () => {
    render(<Home />)
    const images = screen.getAllByRole('img')
    expect(images[0]).toHaveAttribute(
      'src',
      '/images/creatures/creatures03/emblem3.jpeg'
    )
    expect(images[1]).toHaveAttribute(
      'src',
      '/images/creatures/creatures05/emblem5.jpeg'
    )
    expect(images[2]).toHaveAttribute(
      'src',
      '/images/creatures/creatures07/emblem07.jpeg'
    )
  })
})
