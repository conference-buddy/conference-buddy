import { useQuery, UseQueryResult } from "react-query"
import { supabase } from "../../../../domain/database/supabaseClient"
import { Profile } from "../../../../domain/profile/profile-interface"

const getPublicProfile = async (
  profileId: string | undefined
): Promise<Profile | null> => {
  if (!profileId) return null
  const { data: dataSupabase, error } = await supabase
    .from("profiles")
    .select("name,username")
    .eq("id", profileId)
    .single()

  if (!dataSupabase) {
    return null
  }

  if (error) {
    throw new Error(error.message)
  }

  return dataSupabase
}

export default function usePublicProfile(
  profileId: string | undefined
): UseQueryResult<Profile> {
  return useQuery(["profile", profileId], () => getPublicProfile(profileId), {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  })
}
