import { createClient } from "@supabase/supabase-js"
import { Database } from "./types"

const supabaseUrl: string = process.env.GATSBY_APP_SUPABASE_URL || "empty"
const supabaseKey: string = process.env.GATSBY_APP_SUPABASE_KEY || "empty"

const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export { supabase }
