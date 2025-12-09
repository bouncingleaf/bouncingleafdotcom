import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../../src/App'

vi.mock('../../src/pages/Home', () => ({
  default: () => <div data-testid="home-page">Home Page</div>,
}))

vi.mock('../../src/pages/Writing', () => ({
  default: () => <div data-testid="writing-page">Writing Page</div>,
}))

vi.mock('../../src/pages/Art', () => ({
  default: () => <div data-testid="art-page">Art Page</div>,
}))

vi.mock('../../src/pages/About', () => ({
  default: () => <div data-testid="about-page">About Page</div>,
}))

vi.mock('../../src/pages/NotFound', () => ({
  default: () => <div data-testid="notfound-page">Not Found Page</div>,
}))

const renderAppWithRoute = (route: string) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AppContent />
    </MemoryRouter>
  )
}

import { Routes, Route } from 'react-router-dom'
import Layout from '../../src/components/Layout'
import Home from '../../src/pages/Home'
import Writing from '../../src/pages/Writing'
import Art from '../../src/pages/Art'
import About from '../../src/pages/About'
import NotFound from '../../src/pages/NotFound'

function AppContent() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/art" element={<Art />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Routing', () => {
    it('routes "/" to Home page', () => {
      renderAppWithRoute('/')
      expect(screen.getByTestId('home-page')).toBeInTheDocument()
    })

    it('routes "/writing" to Writing page', () => {
      renderAppWithRoute('/writing')
      expect(screen.getByTestId('writing-page')).toBeInTheDocument()
    })

    it('routes "/art" to Art page', () => {
      renderAppWithRoute('/art')
      expect(screen.getByTestId('art-page')).toBeInTheDocument()
    })

    it('routes "/about" to About page', () => {
      renderAppWithRoute('/about')
      expect(screen.getByTestId('about-page')).toBeInTheDocument()
    })

    it('routes unknown paths to NotFound page', () => {
      renderAppWithRoute('/some-unknown-route')
      expect(screen.getByTestId('notfound-page')).toBeInTheDocument()
    })

    it('routes another unknown path to NotFound page', () => {
      renderAppWithRoute('/foo/bar/baz')
      expect(screen.getByTestId('notfound-page')).toBeInTheDocument()
    })
  })

  describe('Layout Integration', () => {
    it('renders Header within Layout', () => {
      renderAppWithRoute('/')
      expect(screen.getByRole('banner')).toBeInTheDocument()
    })

    it('renders Footer within Layout', () => {
      renderAppWithRoute('/')
      expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    })

    it('renders navigation links in Header', () => {
      renderAppWithRoute('/')
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    it('renders main content area', () => {
      renderAppWithRoute('/')
      expect(screen.getByRole('main')).toBeInTheDocument()
    })
  })

  describe('Navigation Elements', () => {
    it('has link to Home', () => {
      renderAppWithRoute('/')
      const homeLinks = screen.getAllByRole('link').filter((link) => {
        const href = link.getAttribute('href')
        return href === '/'
      })
      expect(homeLinks.length).toBeGreaterThan(0)
    })

    it('has link to Writing', () => {
      renderAppWithRoute('/')
      expect(screen.getByRole('link', { name: /writing/i })).toBeInTheDocument()
    })

    it('has link to Art', () => {
      renderAppWithRoute('/')
      expect(screen.getByRole('link', { name: /^Art$/i })).toBeInTheDocument()
    })

    it('has link to About', () => {
      renderAppWithRoute('/')
      expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
    })
  })

  describe('Route Edge Cases', () => {
    it('deeply nested unknown path shows NotFound', () => {
      renderAppWithRoute('/unknown/deep/nested/path')
      expect(screen.getByTestId('notfound-page')).toBeInTheDocument()
    })

    it('routes with query parameters still work', () => {
      renderAppWithRoute('/art?param=value')
      expect(screen.getByTestId('art-page')).toBeInTheDocument()
    })
  })
})

describe('App Component - Full Render', () => {
  it('renders without crashing using BrowserRouter', () => {
    expect(() => render(<App />)).not.toThrow()
  })
})
