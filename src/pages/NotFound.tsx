import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <div className="flex flex-col items-center">
        <img
          src="/images/creatures/creatures01/emblem1.jpeg"
          alt="Mysterious Creature"
          className="w-64 h-64 object-contain mb-8"
        />
        <h1 className="mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          Hmm, the page you're looking for doesn't exist.
        </p>
        <Link to="/" className="btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
