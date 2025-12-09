import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import About from '../../src/pages/About'

describe('About', () => {
  it('renders the main heading', () => {
    render(<About />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('About Leaf')
  })

  it('shows personal bio with art materials', () => {
    render(<About />)
    expect(
      screen.getByText(/Pigma Micron pens/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Uni Posca paint pens/i)
    ).toBeInTheDocument()
  })

  it('shows information about paper preferences', () => {
    render(<About />)
    expect(
      screen.getByText(/Bristol smooth/i)
    ).toBeInTheDocument()
  })

  it('shows personal interests', () => {
    render(<About />)
    expect(
      screen.getByText(/look at birds/i)
    ).toBeInTheDocument()
  })

  it('displays profile image', () => {
    render(<About />)
    const image = screen.getByAltText(/Leaf smiling.*glasses/i)
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/images/jmrGlasses.jpeg')
  })
})
