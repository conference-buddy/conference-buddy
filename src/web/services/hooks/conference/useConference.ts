import { useQuery, UseQueryResult } from "react-query"
import { Conference } from "src/domain/conferences/types/conference-interface"
import { getConference } from "../../../../domain/conferences/api/conferences-api"

export default function useConferences(
  id: string
): UseQueryResult<Conference | unknown> {
  return useQuery("conference", () => getConference(id), {
    retry: false,
    refetchOnWindowFocus: false,
  })
}
