import { useQuery, UseQueryResult } from "react-query"
import { Conference } from "src/domain/conferences/types/conference-interface"
import { getConferences } from "../../../../domain/conferences/api/conferences-api"

export default function useConferences(): UseQueryResult<
  Conference[] | unknown
> {
  return useQuery("conferences", () => getConferences())
}
