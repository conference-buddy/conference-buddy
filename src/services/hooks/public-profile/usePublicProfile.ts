import { useQuery, UseQueryResult } from "@tanstack/react-query"
import {
  getPublicProfile,
  PublicProfile,
} from "../../../domain/public-profiles"

export default function usePublicProfile({
  username,
  enabled,
}: {
  username: string
  enabled: boolean
}): UseQueryResult<PublicProfile> {
  return useQuery(["profile", username], () => getPublicProfile(username), {
    refetchOnWindowFocus: false,
    retry: false,
    enabled,
  })
}
