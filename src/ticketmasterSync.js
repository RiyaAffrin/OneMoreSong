import { supabase } from './supabaseClient'
import { mapGenre } from './genreColors'

const TICKETMASTER_KEY = 'hogeXjSQy9LnBN7h5FGoBdYFrzI6ZZR8'

export async function syncLiveConcerts(city = 'Seattle') {
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&city=${encodeURIComponent(city)}&apikey=${TICKETMASTER_KEY}&size=20`

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Ticketmaster request failed: ${res.status}`)
  }

  const data = await res.json()
  const events = data._embedded?.events || []

  if (events.length === 0) {
    return { added: 0, message: 'No events found for that city right now.' }
  }

  let addedCount = 0

  for (const event of events) {
    const artist = event._embedded?.attractions?.[0]?.name || event.name
    const venueName = event._embedded?.venues?.[0]?.name || ''
    const venueCity = event._embedded?.venues?.[0]?.city?.name || ''
    const dateStr = event.dates?.start?.localDate
      ? new Date(event.dates.start.localDate).toLocaleDateString('en-US', {
          month: 'long', day: 'numeric', year: 'numeric'
        })
      : ''
    const priceRange = event.priceRanges?.[0]
    const price = priceRange ? `$${priceRange.min}–$${priceRange.max}` : ''
    const genreRaw = event.classifications?.[0]?.genre?.name || ''
    const image = event.images?.find(img => img.width > 500)?.url || event.images?.[0]?.url || ''

    const { data: existing } = await supabase
      .from('posts')
      .select('id')
      .eq('ticket_link', event.url)
      .maybeSingle()

    if (existing) continue

    const { error } = await supabase.from('posts').insert({
      title: artist,
      venue: venueName ? `${venueName}, ${venueCity}` : venueCity,
      event_date: dateStr,
      genre: mapGenre(genreRaw),
      price,
      ticket_link: event.url,
      image_url: image,
      body: '',
      upvotes: 0,
    })

    if (!error) addedCount++
  }

  return { added: addedCount, message: `Added ${addedCount} new concert(s).` }
}