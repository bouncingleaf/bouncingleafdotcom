function Home() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="mb-4">Hi, I'm Leaf.</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Here you may find Mysterious Creatures to explore...
        </p>
      </div>

      {/* Featured artwork section - placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="aspect-square bg-gray-200 rounded flex items-center justify-center text-gray-400">
          Featured Image 1
        </div>
        <div className="aspect-square bg-gray-200 rounded flex items-center justify-center text-gray-400">
          Featured Image 2
        </div>
        <div className="aspect-square bg-gray-200 rounded flex items-center justify-center text-gray-400">
          Featured Image 3
        </div>
      </div>
    </div>
  )
}

export default Home
