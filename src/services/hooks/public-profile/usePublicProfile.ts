import { useQuery, UseQueryResult } from "@tanstack/react-query"
import {
  getPublicProfile,
  PublicProfile,
} from "../../../domain/public-profiles"

export default function usePublicProfile({
  username,
  profileId,
  enabled,
}: {
  username?: string
  profileId?: string
  enabled: boolean
}): UseQueryResult<PublicProfile> {
  return useQuery(
    ["profile", username, profileId],
    () => getPublicProfile({ username, profileId }),
    {
      refetchOnWindowFocus: false,
      retry: false,
      enabled,
    }
  )
}
