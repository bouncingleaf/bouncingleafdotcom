import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../../src/App'

const routes = [
  ['/', "Hi, I'm Leaf."],
  ['/writing', 'Writing'],
  ['/art', 'Art'],
  ['/about', 'About Leaf'],
  ['/zumba', 'Zumba'],
  ['/names', undefined],
  ['/resist', undefined],
  ['/random', undefined],
  ['/not-a-real-page', '404 - Page Not Found'],
] as const

describe('App', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    window.history.pushState({}, '', '/')
  })

  it.each(routes)('renders %s without console errors', async (path, title) => {
    const consoleError = vi.spyOn(console, 'error')
    window.history.pushState({}, '', path)

    render(<App />)

    const heading = await screen.findByRole('heading', { level: 1 })
    if (title) {
      expect(heading).toHaveTextContent(title)
    }
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(consoleError).not.toHaveBeenCalled()
  })
})
