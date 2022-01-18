import { useQuery, UseQueryResult } from "react-query"
import { supabase } from "../../../../domain/database/supabaseClient"
import { Conference } from "src/domain/conference/conference-interface"

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

export default function useConferences(): UseQueryResult<
  Conference[] | unknown
> {
  return useQuery("conferences", () => getConferences())
}
