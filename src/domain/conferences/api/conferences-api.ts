import { supabase } from "../../_database/supabaseClient"
import { Conference } from "../types/conference-interface"

async function getConferences(): Promise<Conference[]> {
  const { data, error } = await supabase
    .from("conferences")
    .select("*")
    .order("start_date", { ascending: true })

  if (error) {
    //@TODO proper error handling
    console.error(error)
  }

  if (!data) {
    //@TODO proper error handling
    throw new Error("Conferences not found")
  }

  return data
}

export { getConferences }
