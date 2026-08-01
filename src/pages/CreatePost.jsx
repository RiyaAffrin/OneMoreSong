import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { genreList } from '../genreColors'

function CreatePost() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [genre, setGenre] = useState('pop')

  async function handleSubmit(e) {
    e.preventDefault()

    if (!title.trim()) {
      alert('Concert title is required')
      return
    }

    const { error } = await supabase
      .from('posts')
      .insert({ title, body, image_url: imageUrl, genre })

    if (error) {
      console.error(error)
      alert('Something went wrong adding the concert')
    } else {
      alert('Concert added!')
      setTitle('')
      setBody('')
      setImageUrl('')
      setGenre('pop')
    }
  }

  return (
    <div className="page">
      <h1>Add a concert 🎤</h1>
      <span className="tagline">who's playing near you?</span>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Concert title (required)</label>
          <input
            type="text"
            placeholder="e.g. Chappell Roan — Climate Pledge Arena"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Genre</label>
          <select value={genre} onChange={(e) => setGenre(e.target.value)}>
            {genreList.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Details (optional)</label>
          <textarea
            placeholder="Date, venue info, anything fans should know..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <div>
          <label>Poster image URL (optional)</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit">Add concert</button>
      </form>
    </div>
  )
}

export default CreatePost