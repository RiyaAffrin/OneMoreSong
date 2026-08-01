import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { genreColors } from '../genreColors'

function PostPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPost()
    fetchComments()
  }, [id])

  async function fetchPost() {
    setLoading(true)
    const { data, error } = await supabase
      .from('posts')
      .select()
      .eq('id', id)
      .single()

    if (error) console.error(error)
    else setPost(data)
    setLoading(false)
  }

  async function fetchComments() {
    const { data, error } = await supabase
      .from('comments')
      .select()
      .eq('post_id', id)
      .order('upvotes', { ascending: false })

    if (error) console.error(error)
    else setComments(data)
  }

  async function handleUpvote() {
    const { data, error } = await supabase
      .from('posts')
      .update({ upvotes: post.upvotes + 1 })
      .eq('id', id)
      .select()
      .single()

    if (error) console.error(error)
    else setPost(data)
  }

  async function handleAddComment(e) {
    e.preventDefault()
    if (!newComment.trim()) return

    const { error } = await supabase
      .from('comments')
      .insert({ post_id: id, body: newComment })

    if (error) {
      console.error(error)
    } else {
      setNewComment('')
      fetchComments()
    }
  }

  async function handleCommentUpvote(commentId, currentUpvotes) {
    const { error } = await supabase
      .from('comments')
      .update({ upvotes: currentUpvotes + 1 })
      .eq('id', commentId)

    if (error) console.error(error)
    else fetchComments()
  }

  async function handleDelete() {
    const confirmed = window.confirm('Delete this concert? This cannot be undone.')
    if (!confirmed) return

    const { error } = await supabase.from('posts').delete().eq('id', id)
    if (error) console.error(error)
    else navigate('/')
  }

  if (loading) return <div className="page"><p>Loading...</p></div>
  if (!post) return <div className="page"><p>Concert not found.</p></div>

  const colors = genreColors[post.genre] || genreColors.other

  return (
    <div className="page">
      <Link to="/" className="back-link">&larr; back to concerts</Link>

      <div className="post-title-row">
        <h1 className="post-title">{post.title}</h1>
        <span className="genre-tag" style={{ background: colors.accent }}>
          {post.genre}
        </span>
      </div>
      <div className="post-meta">
        <span>{new Date(post.created_at).toLocaleString()}</span>
        <span>{post.upvotes} hype votes</span>
      </div>

      {post.image_url && (
        <img className="post-image" src={post.image_url} alt={post.title} />
      )}

      {post.body && <p className="post-body">{post.body}</p>}

      <div className="post-actions">
        <button onClick={handleUpvote}>🎉 I'm hyped</button>
        <Link to={`/post/${id}/edit`} className="ghost-btn">Edit</Link>
        <button className="danger-btn" onClick={handleDelete}>Delete</button>
      </div>

      <div className="comments-section">
        <h3>Song requests ({comments.length})</h3>

        <form onSubmit={handleAddComment}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Request a song..."
          />
          <button type="submit">Request</button>
        </form>

        {comments.length === 0 && <p>No song requests yet — add the first one!</p>}

        {comments.map((c) => (
          <div className="comment" key={c.id}>
            <div className="comment-row">
              <p>{c.body}</p>
              <button
                className="comment-vote-btn"
                onClick={() => handleCommentUpvote(c.id, c.upvotes)}
              >
                ▲ {c.upvotes}
              </button>
            </div>
            <span className="comment-time">
              {new Date(c.created_at).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostPage