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
  it('renders header, children in main, and footer', () => {
    renderLayout(<p>Test Content</p>)
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveTextContent('Test Content')
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('orders header, main, footer', () => {
    const { container } = renderLayout(<p>Main content</p>)
    const tags = Array.from((container.firstChild as HTMLElement).children).map(
      (el) => el.tagName
    )
    expect(tags.indexOf('HEADER')).toBeLessThan(tags.indexOf('MAIN'))
    expect(tags.indexOf('MAIN')).toBeLessThan(tags.indexOf('FOOTER'))
  })
})
