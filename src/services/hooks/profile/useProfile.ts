import { useQuery, UseQueryResult } from "react-query"
import { supabase } from "../../database/supabaseClient"
import { Profile } from "../../../domain/profile/profile-interface"
import { User } from "@supabase/supabase-js"
import useAuthUserContext from "../auth-user/useAuthUserContext"

const getProfile = async (user: User | undefined): Promise<Profile | null> => {
  if (!user) {
    return null
  }

  const { data: dataSupabase, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", user.id)
    .single()

  if (!dataSupabase) {
    return null
  }

  if (error) {
    throw new Error(error.message)
  }

  return dataSupabase
}

export default function useProfile(): UseQueryResult<Profile | null> {
  const { user } = useAuthUserContext()

  return useQuery(["profile", user], () => getProfile(user), {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  })
}
