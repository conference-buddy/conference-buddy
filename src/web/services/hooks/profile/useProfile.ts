import { useQuery, UseQueryResult } from "react-query"
import { Profile } from "../../../../domain/profiles/profiles-interface"
import useAuthUserContext from "../auth-user/useAuthUserContext"
import { getProfile } from "../../../../domain/profiles/api/profile-api"

export default function useProfile(): UseQueryResult<Profile | null> {
  const { authUser } = useAuthUserContext()

  return useQuery(["profile", authUser], () => getProfile(authUser), {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  })
}
