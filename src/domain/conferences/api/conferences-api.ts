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

async function getConference(id: string): Promise<Conference> {
  const { data, error } = await supabase
    .from("conferences")
    .select()
    .eq("id", id)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  if (!data) {
    throw new Error("Conference not found")
  }

  const response: Conference = data
  return response
}

export { getConferences, getConference }
