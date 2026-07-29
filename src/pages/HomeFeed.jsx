import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'

function HomeFeed() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [orderBy, setOrderBy] = useState('created_at')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchPosts()
  }, [orderBy])

  async function fetchPosts() {
    setLoading(true)
    const { data, error } = await supabase
      .from('posts')
      .select()
      .order(orderBy, { ascending: false })

    if (error) console.error(error)
    else setPosts(data)
    setLoading(false)
  }

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="page">
      <h1>bakehub 🍪</h1>
      <span className="tagline">fresh from the oven</span>

      <div className="controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
          <option value="created_at">Newest first</option>
          <option value="upvotes">Most upvoted</option>
        </select>
      </div>

      {loading && <p>Loading posts...</p>}

      {!loading && filteredPosts.length === 0 && (
        <p>No posts found — go create one!</p>
      )}

      {filteredPosts.map((post) => (
        <Link to={`/post/${post.id}`} key={post.id} className="post-card">
          <h3>{post.title}</h3>
          <div className="post-meta">
            <span>{new Date(post.created_at).toLocaleString()}</span>
            <span>{post.upvotes} upvotes</span>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default HomeFeed