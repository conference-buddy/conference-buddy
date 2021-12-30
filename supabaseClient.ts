import { createClient } from "@supabase/supabase-js"
import { fromEnv } from "./utils/fromEnv"

const { supabaseUrl, supabaseAnonKey } = fromEnv({
  supabaseUrl: "GATSBY_APP_SUPABASE_URL",
  supabaseAnonKey: "GATSBY_APP_SUPABASE_ANON_KEY",
})(process.env)

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export { supabase }
