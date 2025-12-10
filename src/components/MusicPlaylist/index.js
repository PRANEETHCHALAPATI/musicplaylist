import React, {useState, useMemo} from 'react'
import './index.css'

const MusicPlaylist = ({tracksList = []}) => {
  const [tracks, setTracks] = useState(tracksList)
  const [searchText, setSearchText] = useState('')

  const onSearchChange = e => setSearchText(e.target.value)

  const handleDelete = id => {
    setTracks(prev => prev.filter(t => t.id !== id))
  }

  const normalized = searchText.trim().toLowerCase()

  const filteredTracks = useMemo(() => {
    if (normalized === '') return tracks
    return tracks.filter(t => t.name.toLowerCase().includes(normalized))
  }, [tracks, normalized])

  const showNoSongs =
    (normalized !== '' && filteredTracks.length === 0) || tracks.length === 0

  return (
    <section className="mp-root" aria-label="music-playlist">
      {/* Component heading */}
      <div className="edsheeran">
        <h1>Ed Sheeran</h1>
        <p>Singer</p>
      </div>

      <h1 className="mp-main-heading">Songs Playlist</h1>

      {/* Search input */}
      <div className="mp-search-row">
        <input
          type="search"
          placeholder="Search"
          value={searchText}
          onChange={onSearchChange}
          className="mp-search"
          aria-label="search"
        />
      </div>

      {/* Playlist or No Songs Found */}
      <div className="mp-content">
        {showNoSongs ? (
          <p className="mp-no-songs-text">No Songs Found</p>
        ) : (
          <ul className="mp-list" aria-label="tracks list">
            {filteredTracks.map(track => (
              <li key={track.id} className="mp-item">
                <div className="mp-left">
                  <img src={track.imageUrl} alt="track" className="mp-image" />
                  <div className="mp-meta">
                    <p className="mp-name">{track.name}</p>
                    <p className="mp-genre">{track.genre}</p>
                  </div>
                </div>

                <div className="mp-right">
                  <p className="mp-duration">{track.duration}</p>
                  <button
                    type="button"
                    data-testid="delete"
                    className="mp-delete"
                    onClick={() => handleDelete(track.id)}
                    aria-label={`delete-${track.name}`}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default MusicPlaylist
