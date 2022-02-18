import { Conference } from "../types/conference-interface"
import { supabase } from "../../_database/supabaseClient"

const getConferences = async (): Promise<Conference[]> => {
  const { data: conferences, error } = await supabase.from("conferences")

  if (error) {
    throw new Error(error.message)
  }

  if (!conferences) {
    throw new Error("Conferences not found")
  }

  return conferences
}

const getConference = async (id: string): Promise<Conference> => {
  const { data: conference, error } = await supabase
    .from("conferences")
    .select()
    .eq("id", id)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  if (!conference) {
    throw new Error("Conference not found")
  }

  return conference
}

export { getConference, getConferences }
