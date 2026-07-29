import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'

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
      .order('created_at', { ascending: true })

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

  async function handleDelete() {
    const confirmed = window.confirm('Delete this post? This cannot be undone.')
    if (!confirmed) return

    const { error } = await supabase.from('posts').delete().eq('id', id)
    if (error) {
      console.error(error)
    } else {
      navigate('/')
    }
  }

  if (loading) return <div className="page"><p>Loading...</p></div>
  if (!post) return <div className="page"><p>Post not found.</p></div>

  return (
    <div className="page">
      <Link to="/" className="back-link">&larr; back to feed</Link>

      <h1 className="post-title">{post.title}</h1>
      <div className="post-meta">
        <span>{new Date(post.created_at).toLocaleString()}</span>
        <span>{post.upvotes} upvotes</span>
      </div>

      {post.image_url && (
        <img className="post-image" src={post.image_url} alt={post.title} />
      )}

      {post.body && <p className="post-body">{post.body}</p>}

      <div className="post-actions">
        <button onClick={handleUpvote}>▲ Upvote</button>
        <Link to={`/post/${id}/edit`} className="ghost-btn">Edit</Link>
        <button className="danger-btn" onClick={handleDelete}>Delete</button>
      </div>

      <div className="comments-section">
        <h3>Comments ({comments.length})</h3>

        <form onSubmit={handleAddComment}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button type="submit">Comment</button>
        </form>

        {comments.length === 0 && <p>No comments yet.</p>}

        {comments.map((c) => (
          <div className="comment" key={c.id}>
            <p>{c.body}</p>
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