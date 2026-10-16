import OptimizedImage from '../components/OptimizedImage'

function Zumba() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="mb-6">Zumba</h1>
      <div className="prose max-w-none">
        <p>
          I got my{' '}
          <a
            href="https://zumba.com/p/leaf"
            className="link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Zumba instructor license
          </a>{' '}
          in October of 2026!
        </p>
        <OptimizedImage
          src="/images/zumbaBasic1.jpg"
          alt="Zumba Basic 1 Instructor License for Leaf Roy, dated October 11, 2026"
          className="w-full md:w-[90%] h-auto rounded shadow-lg my-8"
        />
      </div>
    </div>
  )
}

export default Zumba
