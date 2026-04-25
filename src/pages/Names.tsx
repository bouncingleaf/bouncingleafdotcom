import AllCreatures from './AllCreatures'

// For each series array, map each name to a list item
const all = AllCreatures.map((eachSeries) =>
  eachSeries.map((creature) => (
    <li key={creature.id} className="py-1 text-sm sm:text-base">
      {creature.id}. {creature.title}
    </li>
  ))
)
  // Then map each series to a title and an OL
  .map((each, index) => (
    <div
      key={index}
      className="border-t border-gray-200 pt-6 mt-6 first:border-t-0 first:mt-0 first:pt-0"
    >
      <h2 className="text-lg font-semibold mb-3 text-gray-700">
        Mysterious Creatures Series {index + 1}
      </h2>
      <ol className="list-none space-y-0.5 text-gray-600">{each}</ol>
    </div>
  ))

const Names = () => (
  <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 className="mb-8">Mysterious Creatures Names</h1>
    <div className="max-w-xl">{all}</div>
  </div>
)

export default Names
