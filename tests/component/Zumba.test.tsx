import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Zumba from '../../src/pages/Zumba'

describe('Zumba', () => {
  it('renders the main heading', () => {
    render(<Zumba />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Zumba')
  })

  it('shows the instructor license announcement', () => {
    render(<Zumba />)
    expect(screen.getByText(/I got my/i, { exact: false }).textContent).toBe(
      'I got my Zumba instructor license in October of 2026!'
    )
  })

  it('links "Zumba instructor license" to the Zumba profile', () => {
    render(<Zumba />)
    const link = screen.getByRole('link', { name: 'Zumba instructor license' })
    expect(link).toHaveAttribute('href', 'https://zumba.com/p/leaf')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('shows the license image', () => {
    render(<Zumba />)
    const image = screen.getByAltText(/Zumba Basic 1 Instructor License/i)
    expect(image).toHaveAttribute('src', '/images/zumbaBasic1.jpg')
  })
})
