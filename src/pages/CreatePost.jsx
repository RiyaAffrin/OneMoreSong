import { useState } from 'react'
import { supabase } from '../supabaseClient'

function CreatePost() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    if (!title.trim()) {
      alert('Title is required')
      return
    }

    const { error } = await supabase
      .from('posts')
      .insert({ title, body, image_url: imageUrl })

    if (error) {
      console.error(error)
      alert('Something went wrong creating the post')
    } else {
      alert('Post created!')
      setTitle('')
      setBody('')
      setImageUrl('')
    }
  }

  return (
    <div className="page">
      <h1>New Bake 🍪</h1>
      <span className="tagline">what did you make today?</span>
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
        <button type="submit">Create Post</button>
      </form>
    </div>
  )
}

export default CreatePost