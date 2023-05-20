import { useQuery, UseQueryResult } from "@tanstack/react-query"
import {
  getPublicProfile,
  PublicProfile,
} from "../../../domain/public-profiles"

export default function usePublicProfile(
  profileId: string | undefined
): UseQueryResult<PublicProfile> {
  return useQuery(["profile", profileId], () => getPublicProfile(profileId), {
    refetchOnWindowFocus: false,
    retry: false,
    enabled: Boolean(profileId),
  })
}
