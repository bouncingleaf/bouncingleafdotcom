import { Link } from 'react-router-dom'
import { useState } from 'react'
import OptimizedImage from './OptimizedImage'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-3">
            <OptimizedImage
              src="/images/logo.png"
              alt="Leaf's site logo"
              className="h-10 w-10 object-contain"
              loading="eager"
              size="thumbnail"
            />
            <span className="text-2xl font-semibold text-text-primary">
              Leaf's site
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 text-xl">
            <Link to="/writing" className="link no-underline">
              Writing
            </Link>
            <Link to="/art" className="link no-underline">
              Art
            </Link>
            <Link to="/zumba" className="link no-underline">
              Zumba
            </Link>
            <Link to="/about" className="link no-underline">
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
          <div className="md:hidden pb-4 text-xl">
            <Link
              to="/writing"
              className="block py-2 link no-underline"
              onClick={() => setIsMenuOpen(false)}
            >
              Writing
            </Link>
            <Link
              to="/art"
              className="block py-2 link no-underline"
              onClick={() => setIsMenuOpen(false)}
            >
              Art
            </Link>
            <Link
              to="/zumba"
              className="block py-2 link no-underline"
              onClick={() => setIsMenuOpen(false)}
            >
              Zumba
            </Link>
            <Link
              to="/about"
              className="block py-2 link no-underline"
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
