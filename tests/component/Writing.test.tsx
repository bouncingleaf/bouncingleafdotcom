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
      'Writing'
    )
  })

  it('has link to Beyond Writing Code', () => {
    renderWriting()
    const link = screen.getByRole('link', { name: 'Beyond Writing Code' })
    expect(link).toHaveAttribute('href', 'https://www.beyondwritingcode.com/')
  })
})
