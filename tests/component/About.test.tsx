import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import About from '../../src/pages/About'

describe('About', () => {
  it('renders the main heading', () => {
    render(<About />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'About Leaf'
    )
  })

  it('displays profile image', () => {
    render(<About />)
    const image = screen.getByAltText(/Leaf smiling.*glasses/i)
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/images/leafPortrait.jpg')
  })
})
