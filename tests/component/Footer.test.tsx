import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '../../src/components/Footer'

describe('Footer', () => {
  it('displays copyright with current year', () => {
    const currentYear = new Date().getFullYear()
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toHaveTextContent(
      `© ${currentYear}`
    )
  })
})
