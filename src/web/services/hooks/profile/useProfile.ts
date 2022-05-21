import { useQuery, UseQueryResult } from "react-query"

import useAuthUserContext from "../auth-user/useAuthUserContext"
import { Profile, getProfile } from "../../../../domain/profiles"

export default function useProfile(): UseQueryResult<Profile | null> {
  const { authUser } = useAuthUserContext()

  return useQuery(["profile", authUser], () => getProfile(authUser), {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  })
}
