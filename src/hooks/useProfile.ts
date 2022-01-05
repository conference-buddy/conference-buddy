import { useQuery, UseQueryResult } from "react-query"
import { supabase } from "../../supabaseClient"
import { Profile } from "../domain/profile/profile-interface"
import { useAuthUser } from "./useAuthUser"

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

export default function useProfile(): UseQueryResult<Profile | unknown> {
  const user = useAuthUser()

  return useQuery(["user", user], () => getProfile(user?.id))
}
