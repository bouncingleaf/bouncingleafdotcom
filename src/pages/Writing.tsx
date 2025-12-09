import { Link } from 'react-router-dom'

function Writing() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="mb-6">New: I'm writing a book.</h1>
      <div className="prose max-w-none">
        <p>
          That's right: a book. Those of you who know me as an artist or a software developer (25+ years in tech) may not know that I was a writer first. Writing feels like coming home.
        </p>
        <p>
          I am in Cohort 3 of{' '}
          <Link to="https://thebookacademy.org/" className="link">
            The Book Academy
          </Link>
          , run and taught by four-time New York Times bestselling author, speaker, 20-year marketing veteran, and Professional Troublemaker{' '}
          <Link to="https://luvvie.org/" className="link">
            Luvvie Ajayi Jones
          </Link>
          .
        </p>
        <p>
          I love getting a peek into the process of other artists. So I'll be posting about my writing journey as I go. Check out{' '}
          <Link to="https://www.leafjessicaroy.com/" className="link">
            my new site
          </Link>
          , sign up for{' '}
          <Link to="https://www.leafjessicaroy.com/connect/" className="link">
            my newsletter mailing list
          </Link>{' '}
          to get updates on the progress and perhaps some snippets, or follow me on{' '}
          <Link to="https://www.instagram.com/leafjessicaroy/" className="link">
            Instagram
          </Link>{' '}
          to get a peek into the book writing process as it unfolds.
        </p>
      </div>
    </div>
  )
}

export default Writing
