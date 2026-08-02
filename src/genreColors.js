export const genreColors = {
  pop:                { accent: '#e0759e', soft: '#ffe6f0' },
  rock:               { accent: '#5c6e8f', soft: '#e8ebf2' },
  'hip hop':          { accent: '#9b5fc0', soft: '#f2e9f9' },
  rap:                { accent: '#c9a53b', soft: '#faf5df' },
  rnb:                { accent: '#a85fa8', soft: '#f6e9f6' },
  country:            { accent: '#c9973b', soft: '#faf1dc' },
  punk:               { accent: '#d9435f', soft: '#fbe4e7' },
  indie:              { accent: '#7c9a72', soft: '#eef3ea' },
  alternative:        { accent: '#6b8f6b', soft: '#e6f0e6' },
  metal:              { accent: '#4a3b4f', soft: '#e5e0e6' },
  folk:               { accent: '#a67c4f', soft: '#f5ede2' },
  jazz:               { accent: '#5f4b8a', soft: '#ece7f5' },
  blues:              { accent: '#3f5f8a', soft: '#e2ebf5' },
  edm:                { accent: '#4fb8c9', soft: '#e3f6f9' },
  house:              { accent: '#3a9ba6', soft: '#dcf1f3' },
  techno:             { accent: '#2f7d94', soft: '#d8eef2' },
  reggae:             { accent: '#4f9b5f', soft: '#e3f5e6' },
  reggaeton:          { accent: '#e0824a', soft: '#fcece0' },
  'regional mexican': { accent: '#c14f4f', soft: '#fbe9e9' },
  banda:              { accent: '#b8863b', soft: '#faf1de' },
  norteño:            { accent: '#8a6a3b', soft: '#f4ede0' },
  mariachi:           { accent: '#a8433b', soft: '#f9e6e4' },
  salsa:              { accent: '#c67a2e', soft: '#fbeee0' },
  'latin pop':        { accent: '#d9668f', soft: '#fbe8ef' },
  classical:          { accent: '#8a6d3b', soft: '#f5efe2' },
  other:              { accent: '#8fa8e0', soft: '#e9edfc' },
}

export const genreList = Object.keys(genreColors)

export function mapGenre(tmGenre, tmSubGenre = '') {
  const genre = (tmGenre || '').toLowerCase()
  const sub = (tmSubGenre || '').toLowerCase()

  // Check the more specific subGenre first
  if (sub.includes('regional mexican')) return 'regional mexican'
  if (sub.includes('banda')) return 'banda'
  if (sub.includes('norten') || sub.includes('norteñ')) return 'norteño'
  if (sub.includes('mariachi')) return 'mariachi'
  if (sub.includes('salsa')) return 'salsa'
  if (sub.includes('reggaeton')) return 'reggaeton'
  if (sub.includes('latin pop') || sub.includes('pop latino')) return 'latin pop'
  if (sub.includes('house')) return 'house'
  if (sub.includes('techno')) return 'techno'
  if (sub.includes('metal')) return 'metal'
  if (sub.includes('jazz')) return 'jazz'
  if (sub.includes('blues')) return 'blues'
  if (sub.includes('folk')) return 'folk'
  if (sub.includes('reggae') && !sub.includes('reggaeton')) return 'reggae'
  if (sub.includes('alternative')) return 'alternative'

  if (genre.includes('hip-hop') || genre.includes('rap')) return 'hip hop'
  if (genre.includes('country')) return 'country'
  if (genre.includes('punk')) return 'punk'
  if (genre.includes('metal')) return 'metal'
  if (genre.includes('jazz')) return 'jazz'
  if (genre.includes('blues')) return 'blues'
  if (genre.includes('folk')) return 'folk'
  if (genre.includes('reggae') && !genre.includes('reggaeton')) return 'reggae'
  if (genre.includes('dance') || genre.includes('electronic') || genre.includes('edm')) return 'edm'
  if (genre.includes('alternative')) return 'alternative'
  if (genre.includes('indie')) return 'indie'
  if (genre.includes('r&b') || genre.includes('rnb')) return 'rnb'

  if (genre.includes('latin')) return 'latin pop'

  if (genre.includes('rock')) return 'rock'
  if (genre.includes('classical')) return 'classical'
  if (genre.includes('pop')) return 'pop'
  return 'other'
}