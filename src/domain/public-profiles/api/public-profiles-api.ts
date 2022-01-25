import { supabase } from "../../database/supabaseClient"
import { PublicProfile } from "../public-profiles-interfaces"
import { Profile } from "../../profiles"

const getPublicProfile = async (
  profileId: string | undefined
): Promise<Profile | null> => {
  if (!profileId) return null
  const { data: user, error } = await supabase
    .from("profiles")
    .select("name,username")
    .eq("id", profileId)
    .single()

  if (!user) {
    return null
  }

  if (error) {
    throw new Error(error.message)
  }

  return user
}

const getPublicProfiles = async (): Promise<PublicProfile[] | null> => {
  const { data: users, error } = await supabase
    .from("profiles")
    .select("name,username")

  if (error) {
    throw new Error(error.message)
  }
  return users
}

export { getPublicProfile, getPublicProfiles }
