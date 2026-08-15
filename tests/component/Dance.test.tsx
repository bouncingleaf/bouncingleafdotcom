import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import Dance from '../../src/pages/Dance'

// Dance.tsx renders all 179 real songs in both a desktop table and mobile
// card layout simultaneously (CSS-only visibility toggling), so each render
// here is comparatively heavy - bump the timeout above Vitest's 5s default.
const SLOW_TEST_TIMEOUT = 15000

describe('Dance Page', () => {
  it(
    'renders heading and total song count',
    () => {
      render(<Dance />)
      expect(
        screen.getByRole('heading', { level: 1, name: 'Dance Music' })
      ).toBeInTheDocument()
      expect(screen.getByText('179 songs')).toBeInTheDocument()
    },
    SLOW_TEST_TIMEOUT
  )

  it(
    'filters by genre and shows a filtered count with a clear button',
    () => {
      render(<Dance />)
      fireEvent.click(screen.getAllByRole('button', { name: /^Genre/ })[0])
      fireEvent.click(screen.getByRole('button', { name: 'folk' }))

      expect(screen.getByText('1 of 179 songs')).toBeInTheDocument()
      const clearButton = screen.getByRole('button', { name: 'Clear filters' })
      expect(clearButton).toBeInTheDocument()

      fireEvent.click(clearButton)
      expect(screen.getByText('179 songs')).toBeInTheDocument()
      expect(
        screen.queryByRole('button', { name: 'Clear filters' })
      ).not.toBeInTheDocument()
    },
    SLOW_TEST_TIMEOUT
  )

  it(
    'filters by language',
    () => {
      render(<Dance />)
      fireEvent.click(screen.getAllByRole('button', { name: /^Language/ })[0])
      fireEvent.click(screen.getByRole('button', { name: 'romanian' }))
      expect(screen.getByText('1 of 179 songs')).toBeInTheDocument()
    },
    SLOW_TEST_TIMEOUT
  )

  it(
    'filters by who',
    () => {
      render(<Dance />)
      fireEvent.click(screen.getAllByRole('button', { name: /^Who/ })[0])
      fireEvent.click(screen.getByRole('button', { name: 'Karen' }))
      expect(screen.getByText('5 of 179 songs')).toBeInTheDocument()
    },
    SLOW_TEST_TIMEOUT
  )

  it(
    'combines filters across categories with AND semantics',
    () => {
      render(<Dance />)
      fireEvent.click(screen.getAllByRole('button', { name: /^Genre/ })[0])
      fireEvent.click(screen.getByRole('button', { name: 'folk' }))
      fireEvent.click(screen.getAllByRole('button', { name: /^Who/ })[0])
      fireEvent.click(screen.getByRole('button', { name: 'Lisa' }))

      // The only "folk" song is danced to by Karen, not Lisa, so the
      // intersection of both filters should be empty.
      expect(screen.getByText('0 of 179 songs')).toBeInTheDocument()
    },
    SLOW_TEST_TIMEOUT
  )

  it(
    'toggles sort direction when clicking the active sort column',
    () => {
      render(<Dance />)
      const table = screen.getByRole('table')
      const titleSortBtn = within(table).getByRole('button', {
        name: /title/i,
      })
      expect(within(titleSortBtn).getByText('↑')).toBeInTheDocument()

      fireEvent.click(titleSortBtn)
      expect(within(titleSortBtn).getByText('↓')).toBeInTheDocument()
    },
    SLOW_TEST_TIMEOUT
  )

  it(
    'switches sort field to Artist and resets to ascending',
    () => {
      render(<Dance />)
      const table = screen.getByRole('table')
      const artistSortBtn = within(table).getByRole('button', {
        name: /artist/i,
      })
      const titleSortBtn = within(table).getByRole('button', {
        name: /title/i,
      })

      fireEvent.click(artistSortBtn)
      expect(within(artistSortBtn).getByText('↑')).toBeInTheDocument()
      expect(within(titleSortBtn).getByText('↕')).toBeInTheDocument()
    },
    SLOW_TEST_TIMEOUT
  )

  it(
    'expands a row with content to reveal lyrics and bpm, and collapses on second click',
    () => {
      render(<Dance />)
      const table = screen.getByRole('table')
      const titleCell = within(table).getByText(/Ready For It/)
      const row = titleCell.closest('tr')
      expect(row).not.toBeNull()

      expect(
        screen.queryByText(/I see how this is gonna go/)
      ).not.toBeInTheDocument()

      fireEvent.click(row!)
      expect(
        screen.getAllByText(/I see how this is gonna go/).length
      ).toBeGreaterThan(0)
      expect(screen.getAllByText('160').length).toBeGreaterThan(0)

      fireEvent.click(row!)
      expect(
        screen.queryByText(/I see how this is gonna go/)
      ).not.toBeInTheDocument()
    },
    SLOW_TEST_TIMEOUT
  )

  it(
    'does not expand a row with no lyrics, notes, or bpm',
    () => {
      render(<Dance />)
      const table = screen.getByRole('table')
      const titleCell = within(table).getByText('Remedy (feat. Shaggy) [Refix]')
      const row = titleCell.closest('tr')
      expect(row).not.toBeNull()
      const rowCountBefore = within(table).getAllByRole('row').length

      fireEvent.click(row!)
      expect(within(table).getAllByRole('row').length).toBe(rowCountBefore)
    },
    SLOW_TEST_TIMEOUT
  )

  it(
    'expands a mobile card and reflects state via aria-expanded',
    () => {
      render(<Dance />)
      const cardButton = screen.getByRole('button', { name: /Ready For It/i })
      expect(cardButton).toHaveAttribute('aria-expanded', 'false')

      fireEvent.click(cardButton)
      expect(cardButton).toHaveAttribute('aria-expanded', 'true')
      expect(
        screen.getAllByText(/I see how this is gonna go/).length
      ).toBeGreaterThan(0)
    },
    SLOW_TEST_TIMEOUT
  )

  it(
    'renders streaming links with safe target/rel attributes',
    () => {
      render(<Dance />)
      const table = screen.getByRole('table')
      const titleCell = within(table).getByText(/Ready For It/)
      const row = titleCell.closest('tr')
      expect(row).not.toBeNull()

      const spotifyLink = within(row!).getByRole('link', { name: 'Spotify' })
      expect(spotifyLink).toHaveAttribute(
        'href',
        'https://open.spotify.com/track/2yLa0QULdQr0qAIvVwN6B5'
      )
      expect(spotifyLink).toHaveAttribute('target', '_blank')
      expect(spotifyLink).toHaveAttribute('rel', 'noopener noreferrer')
    },
    SLOW_TEST_TIMEOUT
  )
})
