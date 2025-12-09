import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Writing from '../../src/pages/Writing'

const renderWriting = () => {
  return render(
    <BrowserRouter>
      <Writing />
    </BrowserRouter>
  )
}

describe('Writing', () => {
  it('renders the main heading', () => {
    renderWriting()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      "New: I'm writing a book."
    )
  })

  it('shows information about The Book Academy', () => {
    renderWriting()
    expect(
      screen.getByText(/The Book Academy/i)
    ).toBeInTheDocument()
  })

  it('mentions Luvvie Ajayi Jones', () => {
    renderWriting()
    expect(
      screen.getByText(/Luvvie Ajayi Jones/i)
    ).toBeInTheDocument()
  })

  it('has link to The Book Academy', () => {
    renderWriting()
    const link = screen.getByRole('link', { name: 'The Book Academy' })
    expect(link).toHaveAttribute('href', 'https://thebookacademy.org/')
  })

  it('has link to Luvvie Ajayi Jones', () => {
    renderWriting()
    const link = screen.getByRole('link', { name: 'Luvvie Ajayi Jones' })
    expect(link).toHaveAttribute('href', 'https://luvvie.org/')
  })

  it('has link to leafjessicaroy.com', () => {
    renderWriting()
    const link = screen.getByRole('link', { name: 'my new site' })
    expect(link).toHaveAttribute('href', 'https://www.leafjessicaroy.com/')
  })

  it('has link to newsletter', () => {
    renderWriting()
    const link = screen.getByRole('link', { name: 'my newsletter mailing list' })
    expect(link).toHaveAttribute('href', 'https://www.leafjessicaroy.com/connect/')
  })

  it('has link to Instagram', () => {
    renderWriting()
    const link = screen.getByRole('link', { name: 'Instagram' })
    expect(link).toHaveAttribute('href', 'https://www.instagram.com/leafjessicaroy/')
  })
})
