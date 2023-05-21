import { useAuthUserContext } from "../auth-user/useAuthUserContext"
import { getProfile, Profile } from "../../../domain/profiles"
import { useQuery, UseQueryResult } from "@tanstack/react-query"

export default function useProfile(): UseQueryResult<Profile | null> {
  const { authUser, isLoading } = useAuthUserContext()

  return useQuery(["profile", authUser], () => getProfile(authUser), {
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retry: false,
    enabled: !isLoading,
  })
}
