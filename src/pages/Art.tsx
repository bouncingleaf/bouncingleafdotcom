import { useState } from 'react'
import { Link } from 'react-router-dom'
import galleryData from '../data/gallery.json'
import type { GalleryData } from '../types/gallery'
import Lightbox from '../components/Lightbox'
import PairedLightbox from '../components/PairedLightbox'

const gallery = galleryData as GalleryData

function Art() {
  // Track which non-creatures galleries are expanded
  const [expandedGalleries, setExpandedGalleries] = useState<Set<string>>(
    new Set(['circles', 'book1'])
  )

  // Lightbox state
  const [lightboxImages, setLightboxImages] = useState<string[] | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [pairedLightbox, setPairedLightbox] = useState<{
    pairs: typeof gallery.creatures[0]['pairs']
    index: number
    title: string
  } | null>(null)

  const toggleGallery = (id: string) => {
    setExpandedGalleries((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const scrollToSeries = (seriesId: string) => {
    const element = document.getElementById(seriesId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images)
    setLightboxIndex(index)
  }

  const openPairedLightbox = (
    pairs: typeof gallery.creatures[0]['pairs'],
    index: number,
    title: string
  ) => {
    setPairedLightbox({ pairs, index, title })
  }

  const closeLightbox = () => {
    setLightboxImages(null)
    setPairedLightbox(null)
  }

  const nextImage = () => {
    if (lightboxImages) {
      setLightboxIndex((prev) => (prev + 1) % lightboxImages.length)
    } else if (pairedLightbox) {
      setPairedLightbox((prev) =>
        prev
          ? {
              ...prev,
              index: (prev.index + 1) % prev.pairs.length,
            }
          : null
      )
    }
  }

  const previousImage = () => {
    if (lightboxImages) {
      setLightboxIndex(
        (prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length
      )
    } else if (pairedLightbox) {
      setPairedLightbox((prev) =>
        prev
          ? {
              ...prev,
              index: (prev.index - 1 + prev.pairs.length) % prev.pairs.length,
            }
          : null
      )
    }
  }

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="mb-8">Art</h1>

      {/* Navigation Menu */}
      <div className="mb-12 p-6 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-4">
          Jump to section (click emblem or label):
        </p>
        <div className="flex flex-wrap gap-6">
          {/* Creatures Series */}
          {gallery.creatures
            .slice()
            .reverse()
            .map((series, idx) => {
              const seriesNumber = gallery.creatures.length - idx
              return (
                <div
                  key={series.id}
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() => scrollToSeries(series.id)}
                >
                  {series.emblem && (
                    <img
                      src={series.emblem}
                      width={100}
                      height={100}
                      alt={`${series.title} emblem`}
                      className="rounded hover:opacity-80 transition-opacity mb-2"
                    />
                  )}
                  <span className="text-sm font-semibold group-hover:text-accent-primary transition-colors">
                    Creatures {seriesNumber}
                  </span>
                </div>
              )
            })}

          {/* Circles */}
          {gallery.circles.find((img) => img.id === 'circles_cover') && (
            <div
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => scrollToSeries('circles')}
            >
              <img
                src={gallery.circles.find((img) => img.id === 'circles_cover')!.path}
                width={100}
                height={100}
                alt="Circles emblem"
                className="rounded hover:opacity-80 transition-opacity mb-2 object-cover"
                style={{ width: '100px', height: '100px' }}
              />
              <span className="text-sm font-semibold group-hover:text-accent-primary transition-colors">
                Circles
              </span>
            </div>
          )}

          {/* Sketchbooks */}
          {gallery.sketchbook.map((book) => (
            <div
              key={book.id}
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => scrollToSeries(book.id)}
            >
              {book.emblem && (
                <img
                  src={book.emblem}
                  width={100}
                  height={100}
                  alt={`${book.title} emblem`}
                  className="rounded hover:opacity-80 transition-opacity mb-2"
                />
              )}
              <span className="text-sm font-semibold group-hover:text-accent-primary transition-colors">
                {book.id === 'book1' ? 'Book 1' : book.id === 'book2' ? 'Book 2' : book.id}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Artomat Section */}
      <section className="mb-16">
        <h2 className="mb-4">Artomat</h2>
        <div className="prose max-w-none mb-8">
          <p>
            In late 2023, I started making art for{' '}
            <Link to="https://www.artomat.org/" className="link">
              Artomat
            </Link>
            , which sells art from former cigarette vending machines that have
            been converted into art vending machines. How cool is that?! You can
            find more cool Artomat stuff on{' '}
            <Link to="https://www.instagram.com/artomat/" className="link">
              the Artomat Instagram
            </Link>
            .
          </p>
          <p>You can click on each of the pictures below to see more.</p>
        </div>

        <h3 className="mb-6">Mysterious Creatures</h3>

        {/* Creatures Series 8 to 1 */}
        {gallery.creatures
          .slice()
          .reverse()
          .map((series) => (
            <div key={series.id} id={series.id} className="mb-12 scroll-mt-4">
              <h4 className="text-xl font-semibold mb-4">{series.title}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {series.pairs.map((pair, idx) => (
                  <div
                    key={pair.id}
                    className={`cursor-pointer ${
                      pair.isPaired ? 'grid grid-cols-2 gap-2' : ''
                    }`}
                    onClick={() =>
                      openPairedLightbox(series.pairs, idx, series.title)
                    }
                  >
                    <img
                      src={pair.mainImage}
                      alt={`${series.title} - ${pair.id}`}
                      className="w-full rounded shadow-lg hover:shadow-xl transition-shadow"
                    />
                    {pair.isPaired && pair.namesImage && (
                      <img
                        src={pair.namesImage}
                        alt={`${series.title} - ${pair.id} names`}
                        className="w-full rounded shadow-lg hover:shadow-xl transition-shadow"
                      />
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={scrollToTop}
                className="text-sm text-gray-500 hover:text-accent-primary transition-colors"
              >
                ↑ top of page
              </button>
            </div>
          ))}

        {/* Artomat Prototypes */}
        <div className="mb-8">
          <h4 className="text-xl font-semibold mb-4">Artomat Prototypes</h4>
          <p className="mb-4">
            Here are my Artomat prototypes. These are watercolor and ink on 2"x3"
            watercolor paper (specifically{' '}
            <Link
              to="https://www.dickblick.com/products/strathmore-500-series-heavyweight-mixed-media-pads/"
              className="link"
            >
              Strathmore 500 Heavyweight Mixed Media paper
            </Link>
            , which is pretty glorious). The final product has the art mounted on
            a block to make it the appropriate size for the vending machine. The
            fourth creature is on a 2"x2" card, it's an example of the ID for my
            slot in the machine.
          </p>
          {gallery.artomat.find((img) => img.id === 'artomatEmblem') && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {gallery.artomat
                  .filter((img) => img.id !== 'artomatEmblem')
                  .map((img, idx) => (
                    <img
                      key={img.id}
                      src={img.path}
                      alt={img.title}
                      className="w-full rounded shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                      onClick={() =>
                        openLightbox(
                          gallery.artomat
                            .filter((i) => i.id !== 'artomatEmblem')
                            .map((i) => i.path),
                          idx
                        )
                      }
                    />
                  ))}
              </div>
              <button
                onClick={scrollToTop}
                className="text-sm text-gray-500 hover:text-accent-primary transition-colors"
              >
                ↑ top of page
              </button>
            </>
          )}
        </div>
      </section>

      {/* Thousands of Circles Section */}
      <section id="circles" className="mb-16 scroll-mt-4">
        <h2 className="mb-4">Thousands of Circles</h2>
        <div className="prose max-w-none mb-8">
          <p>
            One of the things I like best about drawing is just the act of putting
            ink on paper. In 2025, I started drawing circles on blank postcards.
          </p>
          <p>
            Each card has at least 100 circles on it, some of them have 200 or
            more. Sometimes they overlap, sometimes they have connections,
            sometimes there are other things going on.
          </p>
          <p>
            As of this writing (April 2025), I have made more than 90 of these
            cards, so if you are holding one, you're holding at least 100 of a set
            of over 9000 circles. Not impressive yet, perhaps, but I'm not done.
          </p>
          <p>
            What does it all mean? I don't know. Maybe I seek roundness and
            connection in a sharp-edged and disconnected world. Maybe they will
            eventually add up to some significant number, representing the number
            of people who... or the number of times that... I don't know. Maybe I
            just like circles.
          </p>
          <p>
            If you've received one of these postcards from me, you're welcome and
            encouraged to use circles in your art, your writing (ooo!), or as you
            go about your day-to-day life. Enjoy.
          </p>
        </div>
        {gallery.circles.find((img) => img.id === 'circles_cover') && (
          <>
            <p
              onClick={() => toggleGallery('circles')}
              className="cursor-pointer text-lg mb-2 hover:text-accent-primary"
            >
              Thousands of circles{' '}
              <span className="text-sm text-gray-500">
                (click to {expandedGalleries.has('circles') ? 'hide' : 'show'})
              </span>
            </p>
            <img
              src={gallery.circles.find((img) => img.id === 'circles_cover')!.path}
              width={200}
              alt="Thumbnail for Thousands of Circles"
              onClick={() => toggleGallery('circles')}
              className="cursor-pointer hover:opacity-80 transition-opacity rounded mb-4"
            />
            {expandedGalleries.has('circles') && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {gallery.circles
                  .filter((img) => img.id !== 'circles_cover')
                  .map((img, idx) => (
                    <img
                      key={img.id}
                      src={img.path}
                      alt={img.title}
                      className="w-full rounded shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                      onClick={() =>
                        openLightbox(
                          gallery.circles
                            .filter((i) => i.id !== 'circles_cover')
                            .map((i) => i.path),
                          idx
                        )
                      }
                    />
                  ))}
              </div>
            )}
            <button
              onClick={scrollToTop}
              className="text-sm text-gray-500 hover:text-accent-primary transition-colors"
            >
              ↑ top of page
            </button>
          </>
        )}
      </section>

      {/* Brooklyn Art Library Section */}
      <section className="mb-16">
        <h2 className="mb-4">Brooklyn Art Library Sketchbook Project</h2>
        <div className="prose max-w-none mb-8">
          <p>
            I've published two sketchbooks through the{' '}
            <Link to="https://brooklynartlibrary.org/" className="link">
              Brooklyn Art Library Sketchbook Project,
            </Link>{' '}
            which is closed, sadly. Fortunately, I grabbed digital copies of my
            books.
          </p>
        </div>

        <div id="book1" className="mb-8 scroll-mt-4">
          <h3
            onClick={() => toggleGallery('book1')}
            className="cursor-pointer hover:text-accent-primary mb-2"
          >
            "Casual References to Other Dimensions" (2020-2021){' '}
            <span className="text-sm text-gray-500">
              (click to {expandedGalleries.has('book1') ? 'hide' : 'show'})
            </span>
          </h3>
          <p className="mb-4">
            I'm especially proud of "Sing" (the one about the triangles), the
            empty speech balloon bird comic, the title of the book, the phrases "a
            little old for owl's sea ellicon" and "too heavy to fly / defiant,
            flies anyway," and the collage at the back. May you walk free of
            interference.
          </p>
          {gallery.sketchbook.find((book) => book.id === 'book1') && (
            <>
              <img
                src={
                  gallery.sketchbook.find((book) => book.id === 'book1')!.emblem!
                }
                width={200}
                alt="Thumbnail for sketchbook series 1"
                onClick={() => toggleGallery('book1')}
                className="cursor-pointer hover:opacity-80 transition-opacity rounded mb-4"
              />
              {expandedGalleries.has('book1') && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {gallery.sketchbook
                    .find((book) => book.id === 'book1')!
                    .images.map((img, idx) => (
                      <img
                        key={img.id}
                        src={img.path}
                        alt={img.title}
                        className="w-full rounded shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                        onClick={() =>
                          openLightbox(
                            gallery.sketchbook
                              .find((book) => book.id === 'book1')!
                              .images.map((i) => i.path),
                            idx
                          )
                        }
                      />
                    ))}
                </div>
              )}
              <button
                onClick={scrollToTop}
                className="text-sm text-gray-500 hover:text-accent-primary transition-colors"
              >
                ↑ top of page
              </button>
            </>
          )}
        </div>

        <div id="book2" className="mb-8 scroll-mt-4">
          <h3
            onClick={() => toggleGallery('book2')}
            className="cursor-pointer hover:text-accent-primary mb-2"
          >
            "Your Guide to Drawing the Line" (2021){' '}
            <span className="text-sm text-gray-500">
              (click to {expandedGalleries.has('book2') ? 'hide' : 'show'})
            </span>
          </h3>
          <div className="prose max-w-none mb-4">
            <p>100% of adults are into lines.</p>
            <p>
              I think of "banan" often. "Wary, Ready" is like this book's mascot.
              The notes about NodeJS were really fun (and Stephen Grider's "NodeJS:
              Advanced Concepts" class on Udemy is great). "Now" was assembled from
              a surprisingly small amount of source material. I didn't realize "is
              that so?" (one of my dad's favorite things to say) was upside down
              until I'd drawn half of it, haha.
            </p>
          </div>
          {gallery.sketchbook.find((book) => book.id === 'book2') && (
            <>
              <img
                src={
                  gallery.sketchbook.find((book) => book.id === 'book2')!.emblem!
                }
                width={200}
                alt="Thumbnail for sketchbook series 2"
                onClick={() => toggleGallery('book2')}
                className="cursor-pointer hover:opacity-80 transition-opacity rounded mb-4"
              />
              {expandedGalleries.has('book2') && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {gallery.sketchbook
                    .find((book) => book.id === 'book2')!
                    .images.map((img, idx) => (
                      <img
                        key={img.id}
                        src={img.path}
                        alt={img.title}
                        className="w-full rounded shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                        onClick={() =>
                          openLightbox(
                            gallery.sketchbook
                              .find((book) => book.id === 'book2')!
                              .images.map((i) => i.path),
                            idx
                          )
                        }
                      />
                    ))}
                </div>
              )}
              <button
                onClick={scrollToTop}
                className="text-sm text-gray-500 hover:text-accent-primary transition-colors"
              >
                ↑ top of page
              </button>
            </>
          )}
        </div>
      </section>

      {/* Notes about other artists */}
      <section className="mb-16">
        <h2 className="mb-4">Other people's art</h2>
        <div className="prose max-w-none">
          <p>Here are some artists whose work I enjoy:</p>
          <ul>
            <li>
              <Link
                to="https://wardfdn.org/artists/larry-barth/"
                className="link"
              >
                Larry Barth
              </Link>
            </li>
            <li>
              <Link
                to="https://rosemarymosco.com/comics/bird-and-moon"
                className="link"
              >
                Bird and Moon by Rosemary Mosco
              </Link>
            </li>
            <li>
              <Link to="https://www.instagram.com/birdstrips/" className="link">
                Birdstrips
              </Link>
            </li>
            <li>
              <Link
                to="https://www.instagram.com/chuckdrawsthings/"
                className="link"
              >
                Chuck Draws Things
              </Link>
            </li>
            <li>
              <Link to="https://www.falseknees.com/" className="link">
                False Knees by Joshua Barkman
              </Link>
            </li>
            <li>
              <Link to="https://www.milkywayopera.com/" className="link">
                Milky Way Opera by Jenny Johannesson
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Lightbox modals */}
      {lightboxImages && (
        <Lightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrevious={previousImage}
          onNext={nextImage}
        />
      )}
      {pairedLightbox && (
        <PairedLightbox
          pairs={pairedLightbox.pairs}
          currentIndex={pairedLightbox.index}
          onClose={closeLightbox}
          onPrevious={previousImage}
          onNext={nextImage}
          altText={pairedLightbox.title}
        />
      )}
    </div>
  )
}

export default Art
