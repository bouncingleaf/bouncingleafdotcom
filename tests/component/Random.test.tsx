import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import Random from '../../src/pages/Random'

describe('Random Page', () => {
  it('renders the first dataset heading and default 5 generated items', () => {
    render(<Random />)
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Clickbait Headline Generator',
      })
    ).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(5)
  })

  it('resolves every template placeholder, leaving no {{VAR}} tokens', () => {
    render(<Random />)
    for (const item of screen.getAllByRole('listitem')) {
      expect(item.textContent).not.toMatch(/\{\{/)
    }
  })

  it('capitalizes the first letter of each generated item', () => {
    render(<Random />)
    for (const item of screen.getAllByRole('listitem')) {
      const text = item.textContent ?? ''
      expect(text.charAt(0)).toBe(text.charAt(0).toUpperCase())
    }
  })

  it('switches dataset and regenerates items when a different dataset is selected', () => {
    render(<Random />)
    fireEvent.change(screen.getByLabelText('Choose what to randomize'), {
      target: { value: '1' },
    })
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Robin Activity Generator',
      })
    ).toBeInTheDocument()
  })

  it('changes the number of generated items when the count is changed', () => {
    render(<Random />)
    fireEvent.change(screen.getByLabelText('Number of results'), {
      target: { value: '20' },
    })
    expect(screen.getAllByRole('listitem')).toHaveLength(20)
  })

  it('disables the Generate button during cooldown and re-enables it after', () => {
    vi.useFakeTimers()
    render(<Random />)
    const button = screen.getByRole('button', { name: 'Generate' })
    expect(button).not.toBeDisabled()

    fireEvent.click(button)
    expect(button).toBeDisabled()

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(button).not.toBeDisabled()
    vi.useRealTimers()
  })

  it('regenerates items when Generate is clicked', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    render(<Random />)
    const firstItems = screen
      .getAllByRole('listitem')
      .map((li) => li.textContent)

    vi.spyOn(Math, 'random').mockReturnValue(0.99)
    fireEvent.click(screen.getByRole('button', { name: 'Generate' }))
    const secondItems = screen
      .getAllByRole('listitem')
      .map((li) => li.textContent)

    expect(secondItems).not.toEqual(firstItems)
    vi.restoreAllMocks()
  })

  it('adds a noindex,nofollow robots meta tag on mount and removes it on unmount', () => {
    const { unmount } = render(<Random />)
    const meta = document.querySelector('meta[name="robots"]')
    expect(meta).not.toBeNull()
    expect(meta?.getAttribute('content')).toBe('noindex, nofollow')

    unmount()
    expect(document.querySelector('meta[name="robots"]')).toBeNull()
  })
})
