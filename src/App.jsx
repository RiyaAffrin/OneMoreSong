import { useEffect } from 'react'
import { supabase } from './supabaseClient'

function App() {
  useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabase.from('posts').select()
      console.log('data:', data)
      console.log('error:', error)
    }
    testConnection()
  }, [])

  return <h1>Testing Supabase connection...</h1>
}

export default App