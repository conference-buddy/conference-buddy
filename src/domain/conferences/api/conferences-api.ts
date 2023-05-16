import { supabase } from "../../_database/supabaseClient"
import { Conference } from "../types/conference-interface"

async function getConferences(): Promise<Conference[] | unknown> {
  const { data: conferences, error } = await supabase
    .from("conferences")
    .select("*", { count: "exact" })

  if (error) {
    throw new Error(error.message)
  }

  if (!conferences) {
    throw new Error("Conferences not found")
  }

  return conferences
}

export { getConferences }
