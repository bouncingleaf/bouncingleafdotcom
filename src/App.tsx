import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Layout from './components/Layout'
import ErrorBoundary from './components/ErrorBoundary'

const Home = lazy(() => import('./pages/Home'))
const Writing = lazy(() => import('./pages/Writing'))
const Art = lazy(() => import('./pages/Art'))
const About = lazy(() => import('./pages/About'))
const Resist = lazy(() => import('./pages/Resist'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Suspense fallback={<div className="p-8 text-center">Loading…</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/writing" element={<Writing />} />
              <Route path="/art" element={<Art />} />
              <Route path="/about" element={<About />} />
              <Route path="/resist" element={<Resist />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </ErrorBoundary>
  )
}

export default App
