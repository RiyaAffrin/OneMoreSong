import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { genreList } from '../genreColors'
import { getUserId } from '../userId'

function EditPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [venue, setVenue] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventTime, setEventTime] = useState('')
  const [price, setPrice] = useState('')
  const [ticketLink, setTicketLink] = useState('')
  const [artistLink, setArtistLink] = useState('')
  const [body, setBody] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [genre, setGenre] = useState('pop')
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
    } else if (data.creator_id && data.creator_id !== getUserId()) {
      alert("You can only edit concerts you created.")
      navigate(`/post/${id}`)
      return
    } else {
      setTitle(data.title)
      setVenue(data.venue || '')
      setEventDate(data.event_date || '')
      setEventTime(data.event_time || '')
      setPrice(data.price || '')
      setTicketLink(data.ticket_link || '')
      setArtistLink(data.artist_link || '')
      setBody(data.body || '')
      setImageUrl(data.image_url || '')
      setGenre(data.genre || 'pop')
    }
    setLoading(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) {
      alert('Artist/concert title is required')
      return
    }

    const { error } = await supabase
      .from('posts')
      .update({
        title,
        venue,
        event_date: eventDate,
        event_time: eventTime,
        price,
        ticket_link: ticketLink,
        artist_link: artistLink,
        body,
        image_url: imageUrl,
        genre,
      })
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
      <Link to={`/post/${id}`} className="back-link">&larr; back to concert</Link>
      <h1>Edit concert</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Artist / concert title (required)</label>
          <input
            type="text"
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
          <label>Venue (optional)</label>
          <input
            type="text"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          />
        </div>
        <div>
          <label>Date (optional)</label>
          <input
            type="text"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </div>
        <div>
          <label>Time (optional)</label>
          <input
            type="text"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
          />
        </div>
        <div>
          <label>Price (optional)</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Ticket link (optional)</label>
          <input
            type="text"
            value={ticketLink}
            onChange={(e) => setTicketLink(e.target.value)}
          />
        </div>
        <div>
          <label>Artist / festival website (optional)</label>
          <input
            type="text"
            value={artistLink}
            onChange={(e) => setArtistLink(e.target.value)}
          />
        </div>
        <div>
          <label>Details (optional)</label>
          <textarea
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
        <button type="submit">Save changes</button>
      </form>
    </div>
  )
}

export default EditPost