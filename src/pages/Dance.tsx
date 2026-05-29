import { useState, useMemo, Fragment, type ReactElement } from 'react'
import danceData from '../data/dance.json'

interface Song {
  artist: string
  album: string
  song: string
  genre: string[]
  who: string[]
  languages: string[]
  lyrics?: string
  notes?: string
  bpm?: number | string
  spotify?: string
  appleMusic?: string
  youtube?: string
}

type SortField = 'song' | 'artist'
type SortDir = 'asc' | 'desc'

const songs: Song[] = (danceData as Song[]).map((s) => ({
  ...s,
  song: s.song.trim(),
}))

const allGenres = Array.from(new Set(songs.flatMap((s) => s.genre))).sort(
  (a, b) => a.localeCompare(b)
)

const allLanguages = Array.from(
  new Set(songs.flatMap((s) => s.languages ?? []))
).sort((a, b) => a.localeCompare(b))

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <span className="text-gray-300 ml-1">↕</span>
  return (
    <span className="text-accent-primary ml-1">
      {dir === 'asc' ? '↑' : '↓'}
    </span>
  )
}

function SpotifyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5"
      fill="#1DB954"
      aria-hidden="true"
    >
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  )
}

function AppleMusicIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      <path
        fill="#FC3C44"
        d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 0 0-1.877-.726 10.496 10.496 0 0 0-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208A5.494 5.494 0 0 0 .05 4.822C.02 5.1 0 5.38 0 5.66v12.66c.008.26.02.52.046.78.065.735.22 1.45.49 2.136.76 1.943 2.227 3.09 4.282 3.43a10.4 10.4 0 0 0 1.72.165c.14.003.28.005.42.005h11.086c.25 0 .5-.01.75-.033.5-.04.994-.12 1.475-.27 1.682-.52 2.867-1.6 3.502-3.254.303-.79.43-1.612.466-2.45.004-.095.006-.19.006-.285V5.66c0-.093-.003-.186-.006-.277z"
      />
      <path
        fill="#fff"
        d="M15.9 7.27l-5.5 1.47v5.03c-.38-.13-.8-.2-1.22-.2-1.63 0-2.96 1.08-2.96 2.41s1.33 2.41 2.96 2.41 2.96-1.08 2.96-2.41V9.85l4.27-1.14V7.27z"
      />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5"
      fill="#FF0000"
      aria-hidden="true"
    >
      <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
    </svg>
  )
}

function Links({ song }: { song: Song }) {
  const links = [
    song.spotify && {
      icon: <SpotifyIcon />,
      label: 'Spotify',
      href: song.spotify,
    },
    song.appleMusic && {
      icon: <AppleMusicIcon />,
      label: 'Apple Music',
      href: song.appleMusic,
    },
    song.youtube && {
      icon: <YouTubeIcon />,
      label: 'YouTube',
      href: song.youtube,
    },
  ].filter(Boolean) as { icon: ReactElement; label: string; href: string }[]

  if (links.length === 0) return null

  return (
    <div className="flex gap-2">
      {links.map(({ icon, label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className="hover:opacity-70 transition-opacity"
        >
          {icon}
        </a>
      ))}
    </div>
  )
}

export default function Dance() {
  const [sortField, setSortField] = useState<SortField>('song')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [selectedGenres, setSelectedGenres] = useState<Set<string>>(new Set())
  const [selectedLanguages, setSelectedLanguages] = useState<Set<string>>(
    new Set()
  )
  const [selectedWho, setSelectedWho] = useState<Set<string>>(new Set())
  const [expandedRow, setExpandedRow] = useState<number | null>(null)

  const allWho = useMemo(
    () =>
      Array.from(
        new Set(songs.flatMap((s) => s.who).filter((w) => w !== ''))
      ).sort(),
    []
  )

  const displaySongs = useMemo(() => {
    let result = [...songs]
    if (selectedGenres.size > 0) {
      result = result.filter((s) => s.genre.some((g) => selectedGenres.has(g)))
    }
    if (selectedLanguages.size > 0) {
      result = result.filter((s) =>
        (s.languages ?? []).some((l) => selectedLanguages.has(l))
      )
    }
    if (selectedWho.size > 0) {
      result = result.filter((s) => s.who.some((w) => selectedWho.has(w)))
    }
    result.sort((a, b) => {
      const aVal = sortField === 'song' ? a.song : a.artist
      const bVal = sortField === 'song' ? b.song : b.artist
      const cmp = aVal.localeCompare(bVal)
      return sortDir === 'asc' ? cmp : -cmp
    })
    return result
  }, [sortField, sortDir, selectedGenres, selectedLanguages, selectedWho])

  const hasFilters =
    selectedGenres.size > 0 ||
    selectedLanguages.size > 0 ||
    selectedWho.size > 0

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDir('asc')
    }
  }

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) => {
      const next = new Set(prev)
      if (next.has(genre)) next.delete(genre)
      else next.add(genre)
      return next
    })
  }

  const toggleLanguage = (language: string) => {
    setSelectedLanguages((prev) => {
      const next = new Set(prev)
      if (next.has(language)) next.delete(language)
      else next.add(language)
      return next
    })
  }

  const toggleWho = (who: string) => {
    setSelectedWho((prev) => {
      const next = new Set(prev)
      if (next.has(who)) next.delete(who)
      else next.add(who)
      return next
    })
  }

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="mb-8">Dance Music</h1>

      <div className="space-y-4 mb-8">
        <p className="text-gray-600">
          I love Zumba music. By popular demand, meaning literally nobody asked
          for this, here's my playlist, with links to Spotify, Apple Music, and
          YouTube.
        </p>
        <p className="text-gray-600">
          When there are clean and explicit versions of a song, I link to the
          explicit ones. Oh no! Naughtiness!
        </p>
        <p className="text-gray-600">
          Of course I had to make this sortable and fiterable. By popular demand
          and all. Expand a song (little arrow next to the song title), to see
          sample lyrics and notes.
        </p>
        <p className="text-gray-600">
          Many thanks to the instructors (see "Who", below) for putting together
          such great playlists. I love dancing with you.
        </p>
      </div>
      {/* Filters */}
      <div className="mb-6 space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Genre
          </p>
          <div className="flex flex-wrap gap-2">
            {allGenres.map((genre) => (
              <button
                key={genre}
                onClick={() => toggleGenre(genre)}
                className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                  selectedGenres.has(genre)
                    ? 'bg-accent-primary text-white border-accent-primary'
                    : 'border-gray-300 text-gray-600 hover:border-accent-primary hover:text-accent-primary'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {allLanguages.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Language
            </p>
            <div className="flex flex-wrap gap-2">
              {allLanguages.map((language) => (
                <button
                  key={language}
                  onClick={() => toggleLanguage(language)}
                  className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                    selectedLanguages.has(language)
                      ? 'bg-accent-primary text-white border-accent-primary'
                      : 'border-gray-300 text-gray-600 hover:border-accent-primary hover:text-accent-primary'
                  }`}
                >
                  {language}
                </button>
              ))}
            </div>
          </div>
        )}

        {allWho.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Who
            </p>
            <div className="flex flex-wrap gap-2">
              {allWho.map((who) => (
                <button
                  key={who}
                  onClick={() => toggleWho(who)}
                  className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                    selectedWho.has(who)
                      ? 'bg-accent-primary text-white border-accent-primary'
                      : 'border-gray-300 text-gray-600 hover:border-accent-primary hover:text-accent-primary'
                  }`}
                >
                  {who}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>
            {hasFilters
              ? `${displaySongs.length} of ${songs.length}`
              : songs.length}{' '}
            songs
          </span>
          {hasFilters && (
            <button
              onClick={() => {
                setSelectedGenres(new Set())
                setSelectedLanguages(new Set())
                setSelectedWho(new Set())
              }}
              className="underline hover:text-gray-700"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Mobile sort controls */}
      <div className="md:hidden mb-4 text-sm text-gray-500">
        Sort:{' '}
        <button
          onClick={() => toggleSort('song')}
          className={`mr-3 ${sortField === 'song' ? 'text-accent-primary font-medium' : 'hover:text-gray-700'}`}
        >
          Title
          <SortIcon active={sortField === 'song'} dir={sortDir} />
        </button>
        <button
          onClick={() => toggleSort('artist')}
          className={
            sortField === 'artist'
              ? 'text-accent-primary font-medium'
              : 'hover:text-gray-700'
          }
        >
          Artist
          <SortIcon active={sortField === 'artist'} dir={sortDir} />
        </button>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="pb-3 pr-6 font-semibold">
                <button
                  onClick={() => toggleSort('song')}
                  className="flex items-center hover:text-accent-primary"
                >
                  Title
                  <SortIcon active={sortField === 'song'} dir={sortDir} />
                </button>
              </th>
              <th className="pb-3 pr-6 font-semibold">
                <button
                  onClick={() => toggleSort('artist')}
                  className="flex items-center hover:text-accent-primary"
                >
                  Artist
                  <SortIcon active={sortField === 'artist'} dir={sortDir} />
                </button>
              </th>
              <th className="pb-3 pr-6 font-semibold">Genre</th>
              <th className="pb-3 pr-6 font-semibold">Language</th>
              <th className="pb-3 pr-6 font-semibold">Who</th>
              <th className="pb-3 font-semibold">Links</th>
            </tr>
          </thead>
          <tbody>
            {displaySongs.map((song, i) => {
              const whoDisplay = song.who.filter((w) => w !== '').join(', ')
              const hasContent = !!(song.lyrics || song.notes || song.bpm)
              const isExpanded = expandedRow === i
              return (
                <Fragment key={i}>
                  <tr
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors${hasContent ? ' cursor-pointer' : ''}`}
                    onClick={
                      hasContent
                        ? () => setExpandedRow(isExpanded ? null : i)
                        : undefined
                    }
                  >
                    <td className="py-3 pr-6 font-medium">
                      <span className="flex items-center gap-1">
                        {song.song}
                        {hasContent && (
                          <span className="text-gray-300 text-xs">
                            {isExpanded ? '▲' : '▼'}
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="py-3 pr-6 text-gray-600">{song.artist}</td>
                    <td className="py-3 pr-6">
                      <div className="flex flex-wrap gap-1">
                        {song.genre.map((g) => (
                          <span
                            key={g}
                            className="px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-600"
                          >
                            {g}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 pr-6">
                      <div className="flex flex-wrap gap-1">
                        {(song.languages ?? []).map((l) => (
                          <span
                            key={l}
                            className="px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-600"
                          >
                            {l}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 pr-6 text-gray-600 text-sm">
                      {whoDisplay}
                    </td>
                    <td className="py-3">
                      <Links song={song} />
                    </td>
                  </tr>
                  {isExpanded && hasContent && (
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <td colSpan={6} className="pb-3 pt-1 pr-6">
                        <div className="space-y-1 text-sm">
                          {song.bpm && (
                            <p className="text-gray-500">
                              <span className="font-medium">{song.bpm}</span>{' '}
                              BPM
                            </p>
                          )}
                          {song.lyrics && (
                            <p className="italic text-gray-400">
                              {song.lyrics}
                            </p>
                          )}
                          {song.notes && (
                            <p className="text-gray-600">{song.notes}</p>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden border-t border-gray-200">
        {displaySongs.map((song, i) => {
          const whoDisplay = song.who.filter((w) => w !== '').join(', ')
          const isExpanded = expandedRow === i
          return (
            <div key={i} className="border-b border-gray-100">
              <button
                className="w-full text-left py-3 flex items-center justify-between gap-2"
                onClick={() => setExpandedRow(isExpanded ? null : i)}
                aria-expanded={isExpanded}
              >
                <div className="min-w-0">
                  <div className="font-medium truncate">{song.song}</div>
                  <div className="text-sm text-gray-500 truncate">
                    {song.artist}
                  </div>
                </div>
                <span className="text-gray-400 shrink-0 text-xs">
                  {isExpanded ? '▲' : '▼'}
                </span>
              </button>

              {isExpanded && (
                <div className="pb-4 space-y-2 text-sm">
                  <div className="flex flex-wrap gap-1">
                    {song.genre.map((g) => (
                      <span
                        key={g}
                        className="px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-600"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                  {(song.languages ?? []).length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {(song.languages ?? []).map((l) => (
                        <span
                          key={l}
                          className="px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-600"
                        >
                          {l}
                        </span>
                      ))}
                    </div>
                  )}
                  {whoDisplay && (
                    <div className="text-gray-600">
                      <span className="text-gray-400">Who: </span>
                      {whoDisplay}
                    </div>
                  )}
                  {song.bpm && (
                    <p className="text-gray-500">
                      <span className="font-medium">{song.bpm}</span> BPM
                    </p>
                  )}
                  {song.lyrics && (
                    <p className="italic text-gray-400">{song.lyrics}</p>
                  )}
                  {song.notes && <p className="text-gray-600">{song.notes}</p>}
                  <Links song={song} />
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="space-y-4 mt-8">
        <p className="text-gray-600">
          I had a few songs to add, so I asked Claude AI to research the details
          and add them to the JSON file that this table uses. Claude spent 10-15
          minutes looking everything up, and then told me it was writing the
          file next.
        </p>
        <p className="text-gray-600">
          Then nothing happened. Claude was "working," supposedly, but the file
          wasn't updating. After a few minutes I interrupted and asked what the
          delay was.
        </p>
        <p className="text-gray-600">
          Claude told me the delay was from the research (false), and that it
          was just about to add the songs (also false). I gave it another few
          minutes and then interrupted it again to insist that it tell me what
          the delay was.
        </p>
        <p className="text-gray-600">
          This time, Claude blamed ME. It had been just about to write the file,
          it said, when I interrupted it to ask what the delay was. That, it
          said, was why it hadn't finished writing the file yet. LOL.
        </p>
        <p className="text-gray-600">
          Then it stopped answering my questions. So I closed it. What a brat.
        </p>
      </div>
    </div>
  )
}
