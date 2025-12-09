import { Link } from 'react-router-dom'

function Writing() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="mb-6">I'm writing a book.</h1>
      <div className="prose max-w-none">
        <p>
          That's right: a book. Those of you who know me as an artist or a
          software developer (25+ years in tech) may not know that I was a
          writer first. Writing feels like coming home.
        </p>
        <p>
          I graduated from Cohort 3 of{' '}
          <Link to="https://thebookacademy.org/" className="link">
            The Book Academy
          </Link>
          , run and taught by four-time New York Times bestselling author,
          speaker, 20-year marketing veteran, and Professional Troublemaker{' '}
          <Link to="https://luvvie.org/" className="link">
            Luvvie Ajayi Jones
          </Link>
          .
        </p>
        <div className="flex justify-center my-8">
          <img
            src="/images/TBA_certificate.jpeg"
            alt="The Book Academy Certificate"
            className="max-w-full h-auto rounded shadow-lg"
          />
        </div>
        <p>
          I love getting a peek into the process of other artists. So I'll be
          posting about my writing journey as I go. Check out{' '}
          <Link to="https://www.beyondwritingcode.com/" className="link">
            Beyond Writing Code
          </Link>
          , sign up for my newsletter mailing list to get updates on the
          progress and perhaps some snippets, or follow me on{' '}
          <Link to="https://www.instagram.com/leafjessicaroy/" className="link">
            Instagram
          </Link>{' '}
          to get a peek into the book writing process as it unfolds.
        </p>
        <p>
          The Trump administration is causing a truly historic amount of damage
          to our country and our world. I wrote a{' '}
          <Link to="/resist" className="link">
            What Now page
          </Link>{' '}
          with some thoughts, ideas, and resources about it all.
        </p>
      </div>
    </div>
  )
}

export default Writing
