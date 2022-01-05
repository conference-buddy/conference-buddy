import { useMutation } from "react-query"
import { supabase } from "../../supabaseClient"
import { Profile } from "../domain/profile/profile-interface"

export default function useUpdateProfile(profile: Profile) {
  return useMutation(async () => {
    const { data: insertData, error: insertError } = await supabase
      .from("profiles")
      .update({
        username: profile.username,
        name: profile.name,
        website: profile.website,
      })
      .match({ id: profile.id })

    if (insertError) {
      throw insertError
    }
    return insertData
  })
}
