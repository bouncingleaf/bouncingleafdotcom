import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ErrorBoundary from '../../src/components/ErrorBoundary'

// Component that throws an error
const ThrowError = ({ shouldThrow = true }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

describe('ErrorBoundary', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Suppress console.error for these tests since we expect errors
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleErrorSpy.mockRestore()
  })

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    )

    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('renders default error UI when an error is caught', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    expect(screen.getByText('Oops!')).toBeInTheDocument()
    expect(
      screen.getByText('Something went wrong. Please try refreshing the page.')
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /refresh page/i })
    ).toBeInTheDocument()
  })

  it('renders custom fallback when provided', () => {
    const customFallback = <div>Custom error message</div>

    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError />
      </ErrorBoundary>
    )

    expect(screen.getByText('Custom error message')).toBeInTheDocument()
    expect(screen.queryByText('Oops!')).not.toBeInTheDocument()
  })

  it('logs error when componentDidCatch is called', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    // Verify console.error was called with error details
    expect(consoleErrorSpy).toHaveBeenCalled()
    const errorCalls = consoleErrorSpy.mock.calls.filter(
      (call) => call[0] === 'Error caught by boundary:'
    )
    expect(errorCalls.length).toBeGreaterThan(0)
  })

  it('refresh button reloads the page', async () => {
    const user = userEvent.setup()
    const reloadMock = vi.fn()
    Object.defineProperty(window, 'location', {
      value: { reload: reloadMock },
      writable: true,
    })

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    const refreshButton = screen.getByRole('button', { name: /refresh page/i })
    await user.click(refreshButton)

    expect(reloadMock).toHaveBeenCalledOnce()
  })

  it('maintains error state after error is caught', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    // Verify error UI is shown
    expect(screen.getByText('Oops!')).toBeInTheDocument()

    // Rerender with different props (but error boundary should stay in error state)
    rerender(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    )

    // Error UI should still be shown because error state persists
    expect(screen.getByText('Oops!')).toBeInTheDocument()
  })
})
