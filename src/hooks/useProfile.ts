import { useQuery, UseQueryResult } from "react-query"
import { supabase } from "../../supabaseClient"
import { ProfilePrivate } from "../domain/profile/profile-interface"
import { useAuthUser } from "./useAuthUser"

const getProfile = async (
  userId: string | undefined
): Promise<ProfilePrivate | null> => {
  if (!userId) {
    return Promise.resolve(null)
  }

  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", userId)
    .single()

  if (!data) {
    console.log("User not found")
    return null
  }

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export default function useProfile(): UseQueryResult<ProfilePrivate | unknown> {
  const user = useAuthUser()

  return useQuery(["user", user], () => getProfile(user?.id), {
    refetchOnWindowFocus: false,
    retry: false,
  })
}
