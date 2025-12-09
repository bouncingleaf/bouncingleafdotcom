import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '../../src/components/Footer'

describe('Footer', () => {
  it('renders footer element', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('displays copyright with current year', () => {
    const currentYear = new Date().getFullYear()
    render(<Footer />)
    expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument()
  })

  it('displays "Jessica Roy. All rights reserved."', () => {
    render(<Footer />)
    expect(
      screen.getByText(/Jessica Roy\. All rights reserved\./)
    ).toBeInTheDocument()
  })

  it('displays full copyright text', () => {
    const currentYear = new Date().getFullYear()
    render(<Footer />)
    expect(
      screen.getByText(`© ${currentYear} Jessica Roy. All rights reserved.`)
    ).toBeInTheDocument()
  })

  describe('with mocked date', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('displays correct year when date is 2025', () => {
      vi.setSystemTime(new Date('2025-06-15'))
      render(<Footer />)
      expect(
        screen.getByText('© 2025 Jessica Roy. All rights reserved.')
      ).toBeInTheDocument()
    })

    it('displays correct year when date is 2030', () => {
      vi.setSystemTime(new Date('2030-06-15'))
      render(<Footer />)
      expect(
        screen.getByText('© 2030 Jessica Roy. All rights reserved.')
      ).toBeInTheDocument()
    })
  })
})
