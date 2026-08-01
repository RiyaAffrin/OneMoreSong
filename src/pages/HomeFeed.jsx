import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { genreColors } from '../genreColors'
import { syncLiveConcerts } from '../ticketmasterSync'

function HomeFeed() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [orderBy, setOrderBy] = useState('event_date')
  const [search, setSearch] = useState('')
  const [syncing, setSyncing] = useState(false)
  const [syncMessage, setSyncMessage] = useState('')

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    setLoading(true)
    const { data, error } = await supabase
      .from('posts')
      .select()

    if (error) console.error(error)
    else setPosts(data)
    setLoading(false)
  }

  async function handleSync() {
    setSyncing(true)
    setSyncMessage('')
    try {
      const result = await syncLiveConcerts('Seattle')
      setSyncMessage(result.message)
      fetchPosts()
    } catch (err) {
      console.error(err)
      setSyncMessage('Sync failed — check your API key or try again.')
    }
    setSyncing(false)
  }

  function sortPosts(list) {
    const sorted = [...list]
    if (orderBy === 'upvotes') {
      sorted.sort((a, b) => b.upvotes - a.upvotes)
    } else if (orderBy === 'created_at') {
      sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    } else {
      // event_date — soonest concert first; posts with no date go last
      sorted.sort((a, b) => {
        const dateA = a.event_date ? new Date(a.event_date) : null
        const dateB = b.event_date ? new Date(b.event_date) : null
        if (!dateA && !dateB) return 0
        if (!dateA) return 1
        if (!dateB) return -1
        return dateA - dateB
      })
    }
    return sorted
  }

  const filteredPosts = sortPosts(
    posts.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="page">
      <h1>🎤 OneMoreSong</h1>
      <span className="tagline">upcoming concerts near you</span>

      <div className="top-actions">
        <Link to="/new" className="add-concert-btn">+ Add a concert</Link>
        <button onClick={handleSync} disabled={syncing} className="sync-btn">
          {syncing ? 'Syncing...' : '🔄 Sync live concerts'}
        </button>
      </div>
      {syncMessage && <p className="sync-message">{syncMessage}</p>}

      <div className="controls">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 search concerts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
          <option value="event_date">Soonest concert</option>
          <option value="created_at">Newest first</option>
          <option value="upvotes">Most hyped</option>
        </select>
      </div>

      {loading && <p>Loading concerts...</p>}

      {!loading && filteredPosts.length === 0 && (
        <p>No concerts yet — add one or sync live data! 🎶</p>
      )}

      <div className="concert-grid">
        {filteredPosts.map((post) => {
          const colors = genreColors[post.genre] || genreColors.other
          return (
            <Link
              to={`/post/${post.id}`}
              key={post.id}
              className="post-card"
              style={{ '--card-accent': colors.accent, background: colors.soft }}
            >
              <span className="genre-tag" style={{ background: colors.accent }}>
                {post.genre}
              </span>
              <h3>{post.title}</h3>

              {post.event_date && (
                <div className="event-date">📅 {post.event_date}</div>
              )}
              {post.venue && <div className="post-venue">📍 {post.venue}</div>}

              <div className="post-card-footer">
                <span className="hype-count">{post.upvotes} hype votes</span>
                <span className="added-time">
                  added {new Date(post.created_at).toLocaleDateString()}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default HomeFeed