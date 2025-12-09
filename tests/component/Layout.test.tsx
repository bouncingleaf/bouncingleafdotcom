import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Layout from '../../src/components/Layout'

const renderLayout = (children?: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <Layout>{children}</Layout>
    </BrowserRouter>
  )
}

describe('Layout', () => {
  describe('Component rendering', () => {
    it('renders Header component', () => {
      renderLayout()
      expect(screen.getByText("Leaf's art portfolio")).toBeInTheDocument()
    })

    it('renders Footer component', () => {
      renderLayout()
      expect(
        screen.getByText(/Jessica Roy\. All rights reserved\./)
      ).toBeInTheDocument()
    })

    it('renders children content', () => {
      renderLayout(<div data-testid="test-child">Test Content</div>)
      expect(screen.getByTestId('test-child')).toBeInTheDocument()
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('renders multiple children', () => {
      renderLayout(
        <>
          <p>First child</p>
          <p>Second child</p>
        </>
      )
      expect(screen.getByText('First child')).toBeInTheDocument()
      expect(screen.getByText('Second child')).toBeInTheDocument()
    })
  })

  describe('Layout structure', () => {
    it('has proper flex layout container', () => {
      const { container } = renderLayout()
      const layoutDiv = container.firstChild as HTMLElement
      expect(layoutDiv).toHaveClass('min-h-screen', 'flex', 'flex-col')
    })

    it('renders main element with flex-grow', () => {
      renderLayout(<p>Main content</p>)
      const main = screen.getByRole('main')
      expect(main).toBeInTheDocument()
      expect(main).toHaveClass('flex-grow')
    })

    it('renders header before main content', () => {
      const { container } = renderLayout(<p>Main content</p>)
      const layoutDiv = container.firstChild as HTMLElement
      const children = Array.from(layoutDiv.children)
      const headerIndex = children.findIndex((el) => el.tagName === 'HEADER')
      const mainIndex = children.findIndex((el) => el.tagName === 'MAIN')
      expect(headerIndex).toBeLessThan(mainIndex)
    })

    it('renders footer after main content', () => {
      const { container } = renderLayout(<p>Main content</p>)
      const layoutDiv = container.firstChild as HTMLElement
      const children = Array.from(layoutDiv.children)
      const mainIndex = children.findIndex((el) => el.tagName === 'MAIN')
      const footerIndex = children.findIndex((el) => el.tagName === 'FOOTER')
      expect(mainIndex).toBeLessThan(footerIndex)
    })
  })

  describe('Accessibility', () => {
    it('has header element', () => {
      renderLayout()
      expect(screen.getByRole('banner')).toBeInTheDocument()
    })

    it('has main element', () => {
      renderLayout()
      expect(screen.getByRole('main')).toBeInTheDocument()
    })

    it('has footer element', () => {
      renderLayout()
      expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    })
  })
})
