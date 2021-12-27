import { useMutation } from "react-query"
import { supabase } from "../../supabaseClient"
import { Profile } from "../domain/profile/profile-interface"

const createProfile = async (profile: Profile) => {
  // Check if username exists
  const { data: userWithUsername } = await supabase
    .from("users")
    .select("*")
    .eq("username", profile.username)
    .single()

  if (userWithUsername) {
    throw new Error("User with username exists")
  }
}

// eslint-disable-next-line
export default function useCreateProfile(profile: Profile) {
  return useMutation(() => createProfile(profile), {
    onSuccess: async () => {
      const { data: insertData, error: insertError } = await supabase
        .from("users")
        .update({
          first_name: profile.first_name,
          last_name: profile.last_name,
          username: profile.username,
        })
        .match({ id: profile.id })

      if (insertError) {
        throw insertError
      }
      return insertData
    },
  })
}
