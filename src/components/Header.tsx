import { Link } from 'react-router-dom'
import { useState } from 'react'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="text-xl font-semibold text-text-primary"
            style={{
              fontFamily:
                "'Garamond', 'Minion Pro', 'Adobe Garamond Pro', 'Cormorant Garamond', Georgia, 'Times New Roman', serif",
            }}
          >
            Leaf's site
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link to="/writing" className="link">
              Writing
            </Link>
            <Link to="/art" className="link">
              Art
            </Link>
            <Link to="/about" className="link">
              About
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <Link
              to="/writing"
              className="block py-2 link"
              onClick={() => setIsMenuOpen(false)}
            >
              Writing
            </Link>
            <Link
              to="/art"
              className="block py-2 link"
              onClick={() => setIsMenuOpen(false)}
            >
              Art
            </Link>
            <Link
              to="/about"
              className="block py-2 link"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
