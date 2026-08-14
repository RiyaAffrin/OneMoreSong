import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { genreList } from '../genreColors'
import { getUserId } from '../userId'

function CreatePost() {
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

  async function handleSubmit(e) {
    e.preventDefault()

    if (!title.trim()) {
      alert('Artist/concert title is required')
      return
    }

    const { error } = await supabase.from('posts').insert({
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
      creator_id: getUserId(),
    })

    if (error) {
      console.error(error)
      alert('Something went wrong adding the concert')
    } else {
      alert('Concert added!')
      setTitle('')
      setVenue('')
      setEventDate('')
      setEventTime('')
      setPrice('')
      setTicketLink('')
      setArtistLink('')
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
          <label>Artist / concert title (required)</label>
          <input
            type="text"
            placeholder="e.g. Chappell Roan"
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
            placeholder="e.g. Climate Pledge Arena, Seattle"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          />
        </div>
        <div>
          <label>Date (optional)</label>
          <input
            type="text"
            placeholder="e.g. August 25, 2026"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </div>
        <div>
          <label>Time (optional)</label>
          <input
            type="text"
            placeholder="e.g. 7:30 PM"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
          />
        </div>
        <div>
          <label>Price (optional)</label>
          <input
            type="text"
            placeholder="e.g. $95"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Ticket link (optional)</label>
          <input
            type="text"
            placeholder="https://..."
            value={ticketLink}
            onChange={(e) => setTicketLink(e.target.value)}
          />
        </div>
        <div>
          <label>Artist / festival website (optional)</label>
          <input
            type="text"
            placeholder="https://..."
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
        <button type="submit">Add concert</button>
      </form>
    </div>
  )
}

export default CreatePost