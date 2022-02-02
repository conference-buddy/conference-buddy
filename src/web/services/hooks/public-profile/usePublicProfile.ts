import { useQuery, UseQueryResult } from "react-query"
import { getPublicProfile } from "../../../../domain/public-profiles/api/public-profiles-api"
import { PublicProfile } from "../../../../domain/public-profiles"

export default function usePublicProfile(
  profileId: string | undefined
): UseQueryResult<PublicProfile> {
  return useQuery(["profile", profileId], () => getPublicProfile(profileId), {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  })
}
