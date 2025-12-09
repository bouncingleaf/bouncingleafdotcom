function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600">
        <p>&copy; {currentYear} Jessica Roy. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
