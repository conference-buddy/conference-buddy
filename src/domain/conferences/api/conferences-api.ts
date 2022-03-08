import { Conference } from "../types/conference-interface"
import { supabase } from "../../_database/supabaseClient"

async function getConferences(): Promise<Conference[]> {
  const { data: conferences, error } = await supabase.from("conferences")

  if (error) {
    throw new Error(error.message)
  }

  if (!conferences) {
    throw new Error("Conferences not found")
  }

  return conferences
}

async function getConference(id: string): Promise<Conference> {
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

async function createConference(newConference: Omit<Conference, "created_at">) {
  const { data: conference, error } = await supabase
    .from<Conference>("conference")
    .insert([
      {
        name: newConference.name,
        start_date: newConference.start_date,
        end_date: newConference.end_date,
        city: newConference.city,
        country: newConference.country,
        description: newConference.description,
        url: newConference.url,
      },
    ])

  if (error) {
    throw Error(error.message)
  }

  return conference
}

export { getConference, getConferences, createConference }
