import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cajgopuaxcgpoatnmepb.supabase.co'
const supabaseKey = 'sb_publishable_b6d0Eq_AKg8mlQx1Tx1lhw_5qN6ytmn'

export const supabase = createClient(supabaseUrl, supabaseKey)