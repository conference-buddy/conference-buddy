import { createClient } from "@supabase/supabase-js"

const supabaseUrl: string = process.env.GATSBY_APP_SUPABASE_URL || "empty"
const supabaseAnonKey: string =
  process.env.GATSBY_APP_SUPABASE_ANON_KEY || "empty"

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export { supabase }
