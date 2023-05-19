import { Conference } from "src/domain/conferences/types/conference-interface"
import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { getConference } from "../../../domain/conferences"

function useConference({
  id,
}: {
  id: Conference["id"]
}): UseQueryResult<Conference, unknown> {
  return useQuery(["conference"], () => getConference(id))
}

export { useConference }
