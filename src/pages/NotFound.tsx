import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <h1 className="mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="btn-primary">
        Go Home
      </Link>
    </div>
  )
}

export default NotFound
