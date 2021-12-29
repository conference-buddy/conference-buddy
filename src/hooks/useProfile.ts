import { useQuery, UseQueryResult } from "react-query"
import { supabase } from "../../supabaseClient"
import { User } from "@supabase/supabase-js"
import { Profile } from "../domain/profile/profile-interface"

const getProfile = async (
  userId: string | undefined
): Promise<Profile | null> => {
  if (!userId) {
    return Promise.resolve(null)
  }

  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", userId)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  if (!data) {
    throw new Error("User not found")
  }

  return data
}

export default function useProfile(
  user: User | null
): UseQueryResult<Profile | unknown> {
  return useQuery(["user", user], () => getProfile(user?.id))
}
