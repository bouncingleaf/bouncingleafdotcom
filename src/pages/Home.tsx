function Home() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="mb-4">Hi, I'm Leaf.</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Here you may find Mysterious Creatures to explore...
        </p>
      </div>

      {/* Featured artwork section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="aspect-square overflow-hidden rounded shadow-lg">
          <img
            src="/images/creatures/creatures03/emblem3.jpeg"
            alt="Mysterious Creatures Series 3"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="aspect-square overflow-hidden rounded shadow-lg">
          <img
            src="/images/creatures/creatures05/emblem5.jpeg"
            alt="Mysterious Creatures Series 5"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="aspect-square overflow-hidden rounded shadow-lg">
          <img
            src="/images/creatures/creatures07/emblem07.jpeg"
            alt="Mysterious Creatures Series 7"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default Home
