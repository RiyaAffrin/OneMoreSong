import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'

function EditPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPost()
  }, [id])

  async function fetchPost() {
    const { data, error } = await supabase
      .from('posts')
      .select()
      .eq('id', id)
      .single()

    if (error) {
      console.error(error)
    } else {
      setTitle(data.title)
      setBody(data.body || '')
      setImageUrl(data.image_url || '')
    }
    setLoading(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) {
      alert('Title is required')
      return
    }

    const { error } = await supabase
      .from('posts')
      .update({ title, body, image_url: imageUrl })
      .eq('id', id)

    if (error) {
      console.error(error)
      alert('Something went wrong saving changes')
    } else {
      navigate(`/post/${id}`)
    }
  }

  if (loading) return <div className="page"><p>Loading...</p></div>

  return (
    <div className="page">
      <Link to={`/post/${id}`} className="back-link">&larr; back to post</Link>
      <h1>Edit post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title (required)</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Body (optional)</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <div>
          <label>Image URL (optional)</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit">Save changes</button>
      </form>
    </div>
  )
}

export default EditPost