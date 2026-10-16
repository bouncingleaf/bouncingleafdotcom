import { Link } from 'react-router-dom'
import OptimizedImage from '../components/OptimizedImage'

const options = [
  {
    label: 'Art',
    to: '/art',
    image: '/images/creatures/creatures07/emblem07.jpeg',
  },
  {
    label: 'Writing',
    to: '/writing',
    image: '/images/TBA_certificate.jpeg',
  },
  {
    label: 'Zumba',
    to: '/zumba',
    image: '/images/zumba1.jpeg',
  },
  {
    label: 'About Leaf',
    to: '/about',
    image: '/images/leafPortrait.jpg',
    position: 'object-[50%_30%]',
  },
]

function Home() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-center mb-12">Hi, I'm Leaf.</h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 max-w-md sm:max-w-2xl lg:max-w-none mx-auto">
        {options.map(({ label, to, image, position }, index) => (
          <li key={to}>
            <Link
              to={to}
              className="group block rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-4"
            >
              <div className="aspect-square overflow-hidden rounded">
                <OptimizedImage
                  src={image}
                  alt=""
                  className={`w-full h-full object-cover ${position ?? ''} transition-transform duration-500 group-hover:scale-105 group-focus-visible:scale-105 motion-reduce:transition-none`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchpriority={index === 0 ? 'high' : undefined}
                  size="medium"
                />
              </div>
              <span
                className="mt-4 block text-center text-2xl text-text-primary"
                style={{
                  fontFamily:
                    "'Garamond', 'Minion Pro', 'Adobe Garamond Pro', 'Cormorant Garamond', Georgia, 'Times New Roman', serif",
                }}
              >
                {label}
              </span>
              <span
                aria-hidden="true"
                className="mx-auto mt-2 block h-0.5 w-8 bg-accent-secondary transition-all duration-300 group-hover:w-16 group-focus-visible:w-16 motion-reduce:transition-none"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
