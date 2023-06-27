import { supabase } from "../../_database/supabaseClient"
import { Conference } from "../types/conference-interface"

async function getConferences(): Promise<Conference[]> {
  // @TODO needs to be filtered by date based on timezone
  // otherwise there's a chance that conferences disappear from
  // the list that are still happening.
  // Since deploying happens manually, this is ok for now.
  const currentDay = new Date().toISOString()
  const { data, error } = await supabase
    .from("conferences")
    .select("*")
    .gte("end_date", currentDay)
    .order("start_date", { ascending: true })

  if (error) {
    //@TODO proper error handling
    console.error(error)
    throw new Error("Something went wrong")
  }

  if (!data) {
    //@TODO proper error handling
    throw new Error("Conferences not found")
  }

  return data
}

// NOTE: EXPERIMENTAL
async function getConferencesSearchResult(
  searchTerm: string
): Promise<Conference[]> {
  // @TODO needs to be filtered by date based on timezone
  // CURRENT_DATE can be used in database
  // when creating index until then

  const { data, error } = await supabase.rpc("search_conferences", {
    conference_search_term: searchTerm,
  })

  if (error || !data) {
    console.error(error)
    throw new Error("Something went wrong")
  }

  return data
}

async function getConference(id: string): Promise<Conference> {
  // @TODO needs to be filtered by date based on timezone
  // otherwise there's a chance that conferences disappear from
  // the list that are still happening.
  // Since deploying happens manually, this is ok for now.
  const currentDay = new Date().toISOString()
  const { data, error } = await supabase
    .from("conferences")
    .select()
    .gte("end_date", currentDay)
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

export { getConferences, getConference, getConferencesSearchResult }
