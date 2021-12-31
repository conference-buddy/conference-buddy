import { useQuery, UseQueryResult } from "react-query"
import { supabase } from "../../supabaseClient"
import { Conference } from "src/domain/conference/conference-interface"

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

export default function useConferences(
  id: string
): UseQueryResult<Conference | unknown> {
  return useQuery("conference", () => getConference(id), {
    retry: false,
    refetchOnWindowFocus: false,
  })
}
