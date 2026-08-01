export const genreColors = {
  pop:        { accent: '#e0759e', soft: '#ffe6f0' },
  country:    { accent: '#c9973b', soft: '#faf1dc' },
  punk:       { accent: '#d9435f', soft: '#fbe4e7' },
  indie:      { accent: '#7c9a72', soft: '#eef3ea' },
  rap:        { accent: '#c9a53b', soft: '#faf5df' },
  'hip hop':  { accent: '#9b5fc0', soft: '#f2e9f9' },
  rnb:        { accent: '#a85fa8', soft: '#f6e9f6' },
  reggaeton:  { accent: '#e0824a', soft: '#fcece0' },
  rock:       { accent: '#5c6e8f', soft: '#e8ebf2' },
  classical:  { accent: '#8a6d3b', soft: '#f5efe2' },
  other:      { accent: '#8fa8e0', soft: '#e9edfc' },
}

export const genreList = Object.keys(genreColors)

export function mapGenre(tmGenre) {
  if (!tmGenre) return 'other'
  const g = tmGenre.toLowerCase()
  if (g.includes('hip-hop') || g.includes('rap')) return 'hip hop'
  if (g.includes('country')) return 'country'
  if (g.includes('punk')) return 'punk'
  if (g.includes('indie') || g.includes('alternative')) return 'indie'
  if (g.includes('r&b') || g.includes('rnb')) return 'rnb'
  if (g.includes('reggaeton') || g.includes('latin')) return 'reggaeton'
  if (g.includes('rock')) return 'rock'
  if (g.includes('classical')) return 'classical'
  if (g.includes('pop')) return 'pop'
  return 'other'
}