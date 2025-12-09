import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import NotFound from '../../src/pages/NotFound'

describe('NotFound', () => {
  it('renders the 404 heading', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    )
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      '404 - Page Not Found'
    )
  })

  it('shows the not found message', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    )
    expect(
      screen.getByText("Hmm, the page you're looking for doesn't exist.")
    ).toBeInTheDocument()
  })

  it('displays the emblem image', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    )
    const img = screen.getByAltText('Mysterious Creature')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute(
      'src',
      '/images/creatures/creatures01/emblem1.jpeg'
    )
  })

  it('has a Go Home link that navigates to /', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    )
    const link = screen.getByRole('link', { name: 'Go Home' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
  })
})
